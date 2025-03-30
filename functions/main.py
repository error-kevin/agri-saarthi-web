from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
from google.cloud import storage
import functions_framework

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
# ✅ Load Pre-trained Model (ResNet18)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT) # use weights instead of pretrained.
model = model.to(device)
model.eval()

BUCKET_NAME = "agri-saarthi-pest-images"  

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

    # Upload to Cloud Storage
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blob = bucket.blob(file.filename)
    blob.upload_from_filename(file_path)

    # Preprocess and predict (using Cloud Storage URL)
    cloud_storage_url = f"gs://{BUCKET_NAME}/{file.filename}"
    img_tensor = preprocess_image(cloud_storage_url)
    with torch.no_grad():
        outputs = model(img_tensor)
        _, predicted = torch.max(outputs, 1)

    # Map the class index to a human-readable label
    labels = {0: "Healthy Plant", 1: "Pest Detected", 2: "Disease Detected"}
    prediction = labels.get(predicted.item(), "Unknown")

    # Delete from Cloud Storage
    blob.delete()
    os.remove(file_path) #remove local file.

    return jsonify({'prediction': prediction})

# ---------------------------
# 📊 APEDA API Endpoint (Real-time Market Prices)
# ---------------------------

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

@functions_framework.http
def flask_app(request):
    return app(request.environ, lambda *args: args)