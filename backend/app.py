from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import ee  # Google Earth Engine
import os
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
from torchvision.models import ResNet18_Weights  # ✅ Updated weights import

app = Flask(__name__)
CORS(app)

# ---------------------------
# 🌤️ Weather API Configuration
# ---------------------------
API_KEY = "ac8af87849969a01808224987992c61a"  
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

# ---------------------------
# 📊 APEDA API Configuration
# ---------------------------
# APEDA_API = "https://apeda.gov.in/api/market-prices"

# ---------------------------
# 🌐 Mock Data
# ---------------------------
mock_data = [
    {"commodity": "Rice", "year": "2024", "price": "₹3,200 per quintal", "region": "Punjab"},
    {"commodity": "Wheat", "year": "2024", "price": "₹2,800 per quintal", "region": "Haryana"},
    {"commodity": "Maize", "year": "2024", "price": "₹2,100 per quintal", "region": "Madhya Pradesh"},
    {"commodity": "Sugarcane", "year": "2024", "price": "₹310 per quintal", "region": "Uttar Pradesh"},
    {"commodity": "Cotton", "year": "2024", "price": "₹6,500 per quintal", "region": "Maharashtra"}
]

# ---------------------------
# 🐞 Pest Detection Configuration
# ---------------------------

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load Pre-trained Model (Updated Syntax)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)  # ✅ Updated weights
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
SERVICE_ACCOUNT = 'earth-engine-service@agri-saarthi.iam.gserviceaccount.com'
KEY_FILE = '../backend/agri-saarthi-35d2338ce25d.json'

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
# 📊 APEDA API Endpoint (Real-time Market Prices)
# ---------------------------

# @app.route('/market-prices', methods=['GET'])
# def get_market_prices():
    # commodity = request.args.get('commodity', 'rice')
    # year = request.args.get('year', '2024')

    # params = {
    #     "commodity": commodity,
    #     "year": year
    # }

    # try:
    #     response = requests.get(APEDA_API, params=params)

    #     if response.status_code != 200:
    #         return jsonify({"error": "Failed to fetch market prices"}), response.status_code

    #     data = response.json()

    #     # Check if API returns empty or no records
    #     if not data or 'records' not in data or len(data['records']) == 0:
    #         return jsonify({"error": "No data available", "market_data": []}), 200

    #     market_data = []
    #     for record in data.get('records', []):
    #         market_data.append({
    #             "commodity": record.get("commodity", commodity),
    #             "year": record.get("year", year),
    #             "price": record.get("price", "N/A"),
    #             "region": record.get("region", "Unknown")
    #         })

    #     return jsonify(market_data)

    # except Exception as e:
    #     print(f"Error: {e}")
    #     return jsonify({"error": "Failed to fetch market data"}), 500

@app.route('/market-prices', methods=['GET'])
def get_market_data():
    commodity = request.args.get('commodity', 'rice')
    year = request.args.get('year', '2024')

    # Filter mock data based on query parameters
    filtered_data = [
        item for item in mock_data
        if (commodity in item["commodity"].lower() or commodity == '') and (year == item["year"] or year == '')
    ]

    if not filtered_data:
        return jsonify({"error": "No data available", "market_data": []}), 200

    return jsonify(filtered_data)

if __name__ == '__main__':
    app.run(debug=True)
