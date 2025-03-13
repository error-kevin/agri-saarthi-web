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


# ee.Initialize()

# # Load soil dataset
# soil = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v01")

# # Get soil texture at a specific location
# point = ee.Geometry.Point([75.85, 22.71])  # Example lat/lon
# soil_value = soil.sample(point, 30).first().getInfo()

# print(soil_value)


if __name__ == '__main__':
    app.run(debug=True)
