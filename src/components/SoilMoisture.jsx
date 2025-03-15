import React, { useState, useEffect } from "react";
import "./../styles/SoilMoisture.css"; // Import the CSS file

const SoilMoisture = () => {
  const [soilData, setSoilData] = useState(null);
  const latitude = 22.7196;
  const longitude = 75.8577;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/soil-moisture?lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => setSoilData(data.soil_moisture))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="soil-moisture-container">
      <h2>Soil Moisture Data</h2>
      {soilData ? (
        <div className="soil-moisture-box">
          <p><strong>Surface Moisture:</strong> {soilData.soil_moisture_surface.toFixed(3)}</p>
          <p><strong>Root Zone Moisture:</strong> {soilData.soil_moisture_rootzone.toFixed(3)}</p>
          <p><strong>Profile Moisture:</strong> {soilData.soil_moisture_profile.toFixed(3)}</p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default SoilMoisture;
