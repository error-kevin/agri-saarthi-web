from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import ee  # Google Earth Engine
import os
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models

app = Flask(__name__)
CORS(app)

# Weather API Configuration
API_KEY = "ac8af87849969a01808224987992c61a"  
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

# Upload directory for pest detection
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load Pre-trained Model (ResNet18)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet18(pretrained=True)
model = model.to(device)
model.eval()

# ---------------------------
# 🌤️ Weather Data Endpoint
# ---------------------------
@app.route('/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()

    if response.status_code != 200:
        return jsonify({"error": data.get("message", "Failed to fetch weather")}), response.status_code

    weather_info = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"]
    }

    return jsonify(weather_info)

# ---------------------------
# 🌱 Soil Moisture Data Endpoint
# ---------------------------
PROJECT_ID = "agri-saarthi"  # Replace with your actual project ID

try:
    ee.Initialize(project=PROJECT_ID)
    print("Google Earth Engine Initialized Successfully!")
except Exception as e:
    print(f"Error initializing Earth Engine: {e}")

def get_soil_moisture(lat, lon):
    """ Fetch soil moisture data """
    try:
        point = ee.Geometry.Point(lon, lat)
        soil_data = ee.ImageCollection('NASA/SMAP/SPL4SMGP/007') \
            .filterDate('2023-01-01', '2023-01-10') \
            .filterBounds(point) \
            .mean() \
            .reduceRegion(ee.Reducer.mean(), point, 1000) \
            .getInfo()

        filtered_data = {
            "latitude": lat,
            "longitude": lon,
            "soil_moisture_surface": soil_data.get("sm_surface"),
            "soil_moisture_rootzone": soil_data.get("sm_rootzone"),
            "soil_moisture_profile": soil_data.get("sm_profile")
        }
        return filtered_data

    except Exception as e:
        return str(e)

@app.route('/soil-moisture', methods=['GET'])
def soil_moisture_api():
    lat = request.args.get('lat', type=float)
    lon = request.args.get('lon', type=float)
    
    if lat is None or lon is None:
        return jsonify({'error': 'Missing latitude or longitude'}), 400

    moisture = get_soil_moisture(lat, lon)
    return jsonify({'latitude': lat, 'longitude': lon, 'soil_moisture': moisture})

# ---------------------------
# 🐞 Pest/Disease Detection Endpoint (PyTorch)
# ---------------------------
def preprocess_image(image_path):
    """ Preprocess image for PyTorch model inference """
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    img = Image.open(image_path).convert("RGB")
    img_tensor = transform(img).unsqueeze(0).to(device)
    return img_tensor

@app.route('/pest-detection', methods=['POST'])
def pest_detection():
    """ Handle pest detection image upload """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Preprocess and predict
    img_tensor = preprocess_image(file_path)
    with torch.no_grad():
        outputs = model(img_tensor)
        _, predicted = torch.max(outputs, 1)

    # Map the class index to a human-readable label
    labels = {0: "Healthy Plant", 1: "Pest Detected", 2: "Disease Detected"}
    prediction = labels.get(predicted.item(), "Unknown")

    # Remove the uploaded image after prediction
    os.remove(file_path)

    return jsonify({'prediction': prediction})


# ---------------------------
# ✅ Run the Flask Server
# ---------------------------
if __name__ == '__main__':
    app.run(debug=True)
