import React from "react";
import "./../styles/FeatureCards.css"; // Importing the same CSS

const FeatureCards = () => {
    return (
        <section className="features-container">
            <div className="feature-card">
                <span className="icon">🌤️</span>
                <h3>Accurate Weather Data</h3>
                <p>Get real-time weather information including temperature, humidity, and wind speed to make informed farming decisions.</p>
            </div>

            <div className="feature-card">
                <span className="icon">🌱</span>
                <h3>Soil Moisture Analysis</h3>
                <p>Track surface, root zone, and profile moisture levels to optimize irrigation and prevent overwatering or drought stress.</p>
            </div>

            <div className="feature-card">
                <span className="icon">📊</span>
                <h3>Data-Driven Insights</h3>
                <p>Leverage weather and soil data analytics to improve crop health, boost yield, and reduce resource wastage.</p>
            </div>
        </section>
    );
};

export default FeatureCards;
