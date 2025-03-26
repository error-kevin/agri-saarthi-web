import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";  // Import Firebase auth
import "./../styles/Home.css"; // Import CSS

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleButtonClick = (path) => {
    if (user) {
      navigate(path);  // Navigate to specified path if logged in
    } else {
      navigate("/auth");  // Navigate to authentication page if not logged in
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Agri-Saarthi</h1>
        <p>Smart Farming Made Easy with AI & Data</p>
        <button 
          className="signup-button" 
          onClick={() => handleButtonClick("/dashboard")}
        >
          {user ? "Get Started" : "Sign Up / Login"}
        </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature-card" onClick={() => handleButtonClick("/weather")}>
            <h3>🌤️ Weather & Soil Data</h3>
            <p>Get real-time weather & soil moisture data for your farm.</p>
          </div>

          <div className="feature-card" onClick={() => handleButtonClick("/pest-detection")}>
            <h3>🔍 AI Pest Detection</h3>
            <p>Upload images to detect pests and get treatment suggestions.</p>
          </div>

          <div className="feature-card" onClick={() => handleButtonClick("/market")}>
            <h3>📊 Market Prices</h3>
            <p>Get the latest crop prices and market trends.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
