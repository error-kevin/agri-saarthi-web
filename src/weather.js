import { useState, useEffect } from "react"
import axios from "axios";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`);
                setWeather(response.data);
            } catch (err) {
                setError("Could not fetch weather data. Please try again.");
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeather(latitude, longitude);
                    },
                    (err) => {
                        setError("Geolocation error: " + err.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            <h2>Weather Information</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && (
                <div>
                    <h3>{weather.city}</h3>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Condition: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};


export default Weather;
