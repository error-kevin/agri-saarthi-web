from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import ee # earth engine

app = Flask(__name__)
CORS(app)

API_KEY = "ac8af87849969a01808224987992c61a"  
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

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

#Soil data 

# Initialize Earth Engine (ensure authentication is done)
PROJECT_ID = "agri-saarthi"  # Replace with your actual project ID

try:
    ee.Initialize(project=PROJECT_ID)
    print("Google Earth Engine Initialized Successfully!")
except Exception as e:
    print(f"Error initializing Earth Engine: {e}")

def get_soil_moisture(lat, lon):
    try:
        point = ee.Geometry.Point(lon, lat)
        soil_data = ee.ImageCollection('NASA/SMAP/SPL4SMGP/007') \
        .filterDate('2023-01-01', '2023-01-10') \
        .filterBounds(point) \
        .mean() \
        .reduceRegion(ee.Reducer.mean(), point, 1000) \
        .getInfo()
        
        # Extract relevant soil moisture values
        filtered_data = {
            "latitude": lat,
            "longitude": lon,
            "soil_moisture_surface": soil_data.get("sm_surface"),
            "soil_moisture_rootzone": soil_data.get("sm_rootzone"),
            "soil_moisture_profile": soil_data.get("sm_profile")
        }
        return filtered_data
        print(get_soil_moisture(22.7196, 75.8577))  # Test with Indore location

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

# ee.Initialize()

# # Load soil dataset
# soil = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v01")

# # Get soil texture at a specific location
# point = ee.Geometry.Point([75.85, 22.71])  # Example lat/lon
# soil_value = soil.sample(point, 30).first().getInfo()

# print(soil_value)


if __name__ == '__main__':
    app.run(debug=True)
