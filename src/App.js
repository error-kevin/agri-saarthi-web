import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";
import Weather from "./components/weather";
import Auth from "./components/auth";
import WeatherCard from "./components/WeatherCard";
import SoilMoisture from "./components/SoilMoisture";
import Home from "./components/Home";
import Header from "./components/Header";


api.get("/api/hello")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));


function App() {
  const [message, setMessage] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/hello") // No need to specify localhost:5000 if using a proxy
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching data!", error);
      });
  }, []);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather');
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
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
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h2>About AgriSaarthi</h2>} />
        <Route path="/contact" element={<h2>Contact Us</h2>} />
      </Routes>
    </Router>
      {/* <h1>Agri-Saarthi</h1> */}
      {/* <Auth /> */}
      <Weather />
      <SoilMoisture />
      <p>{message}</p>
      {/* {error && <p>Error: {error}</p>} */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
