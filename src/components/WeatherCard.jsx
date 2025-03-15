import React from "react";
import "./../styles/Weather.css";


const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return <p className="loading">Loading...</p>;

    return (
        <div className="weather-card">
            <h3>{weatherData.city}</h3>
            <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
            <p><strong>Condition:</strong> {weatherData.description}</p>
            <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</p>
        </div>
    );
};

export default WeatherCard;
