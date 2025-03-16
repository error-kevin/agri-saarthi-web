import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../styles/Home.css"; // Import CSS

const Home = () => {
  const navigate = useNavigate(); //  React Router navigation
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Agri-Saarthi</h1>
        <p>Smart Farming Made Easy with AI & Data</p>
        <button className="signup-button" onClick={() => navigate("/auth")}>
        Sign Up / Login
      </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-container">
          {/* Feature 1: Weather & Soil Data */}
          <div className="feature-card">
            <h3>🌤️ Weather & Soil Data</h3>
            <p>Get real-time weather & soil moisture data for your farm.</p>
          </div>

          {/* Feature 2: AI Pest Detection */}
          <div className="feature-card">
            <h3>🔍 AI Pest Detection</h3>
            <p>Upload images to detect pests and get treatment suggestions.</p>
          </div>

          {/* Feature 3: Market Prices */}
          <div className="feature-card">
            <h3>📊 Market Prices</h3>
            <p>Get the latest crop prices and market trends.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
