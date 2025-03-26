import React, { useState } from "react";
import "../styles/PestDetection.css"; 

const PestDetection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult("Pest Detected: Aphids 🐛. Suggested Treatment: Neem Oil Spray.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pest-detection-container">
      <header className="pest-header">
        <h1>Pest & Disease Detection</h1>
        <p>
          Upload an image of your crop to detect potential pests or diseases 
          using AI-powered analysis. Get accurate treatment suggestions instantly.
        </p>
      </header>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-btn" disabled={loading}>
          {loading ? "Detecting..." : "Upload & Detect"}
        </button>
      </div>

      {result && (
        <div className="result-section">
          <h3>Detection Result:</h3>
          <p>{result}</p>
        </div>
      )}

      <section className="info-section">
        <div className="info-card">
          <h2>🌿 Why Use AI Pest Detection?</h2>
          <p>AI-powered pest detection helps farmers identify crop diseases early, preventing yield loss and reducing pesticide usage.</p>
        </div>
        
        <div className="info-card">
          <h2>🛠️ How It Works?</h2>
          <ul>
            <li>Upload a clear image of the affected crop.</li>
            <li>AI model analyzes the image and detects pests/diseases.</li>
            <li>Receive treatment suggestions instantly.</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>✅ Supported Crops & Pests</h2>
          <p>Our model detects common pests like aphids, beetles, and fungal diseases for crops such as wheat, rice, and vegetables.</p>
        </div>
      </section>
    </div>
  );
};

export default PestDetection;
