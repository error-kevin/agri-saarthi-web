import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./Weather.css"; // Importing CSS

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
                );
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
        <div className="weather-container">
            <h2>Weather Information</h2>
            {error && <p className="error-message">{error}</p>}
            {weather && <WeatherCard weatherData={weather} />}
        </div>
    );
};

export default Weather;
