import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard-container">

      {/* Header Section */}
      <h1>Welcome, {user?.displayName || "Farmer"}! 🌱</h1>
      <p>Manage your agricultural insights here.</p>

      {/* Insights Section */}
      <div className="insights-container">
        <div className="insight-card">
          <h3>🌤️ Weather Data</h3>
          <p>View real-time weather updates for your farm location.</p>
          <button onClick={() => navigate("/weather")}>View Weather</button>
        </div>

        <div className="insight-card">
          <h3>📊 Market Prices</h3>
          <p>Track the latest crop prices and trends.</p>
          <button onClick={() => navigate("/market-prices")}>Check Prices</button>
        </div>

        <div className="insight-card">
          <h3>🔍 Pest Detection</h3>
          <p>Detect pests by uploading images and get treatment suggestions.</p>
          <button onClick={() => navigate("/pest-detection")}>Detect Pests</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>📈 Yield Growth</h3>
          <p>15% increase over last season</p>
        </div>

        <div className="stat-card">
          <h3>🚜 Active Farms</h3>
          <p>24 farms monitored</p>
        </div>

        <div className="stat-card">
          <h3>🌿 Pests Detected</h3>
          <p>5 cases reported</p>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
