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
        <h1>AgriSaarthi: Cultivating a Sustainable Future</h1>
        <p>A comprehensive ecosystem under the Agri-Tech Hub mission to digitize and democratize farming support.</p>
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
            <p>Get real-time updates to plan daily agricultural tasks and avoid climate risks.</p>
          </div>

          <div className="feature-card" onClick={() => handleButtonClick("/pest-detection")}>
            <h3>🔍 AI Pest Detection</h3>
            <p>Upload images to identify pests and build proactive protection strategies.</p>
          </div>

          <div className="feature-card" onClick={() => handleButtonClick("/market-prices")}>
            <h3>📊 Market Prices</h3>
            <p>Access live Mandi rates to make smarter decisions about when and where to sell.</p>
          </div>
        </div>
      </section>
      <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      padding: '0 20px 20px', // Prevents button from touching screen edges on mobile
      boxSizing: 'border-box'
      }}>
      
      <button 
          className="signup-button" 
          onClick={() => window.open("https://drive.google.com/file/d/11jJzVJlVK2kLapSwBeAZQorNb5njEspV/view?usp=sharing", "_blank")}
          style={{ 
          minWidth: '200px',      
          maxWidth: '100%',       
          width: 'auto',          
          padding: '12px 24px',   
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
          cursor: 'pointer'
        }}
        >
          {user ? "Watch Platform Demo" : "Watch Live Demo Video"}
        </button>
        </div>
    </div>
  );
};

export default Home;
