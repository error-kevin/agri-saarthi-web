import React, { useState, useEffect } from "react";
import "../styles/Market.css";
import { FaSearch, FaChartLine, FaRupeeSign, FaChartPie } from "react-icons/fa"; 

const sampleData = [
  { commodity: "Rice", year: "2024", price: "₹45/kg", location: "Delhi" },
  { commodity: "Wheat", year: "2024", price: "₹38/kg", location: "Mumbai" },
  { commodity: "Corn", year: "2024", price: "₹30/kg", location: "Pune" },
];

const Market = () => {
  const [commodity, setCommodity] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  // Load Rice data by default on initial render
  useEffect(() => {
    const defaultData = sampleData.filter((item) => item.commodity === "Rice");
    setData(defaultData);
  }, []);

  const handleSearch = () => {
    const result = sampleData.filter(
      (item) =>
        item.commodity.toLowerCase() === commodity.toLowerCase() &&
        item.year === year
    );

    if (result.length > 0) {
      setData(result);
      setError(false);
    } else {
      setData([]);
      setError(true);
    }
  };

  return (
    <div className="market-page">   {/* Add a wrapper with a unique class */}
      <div className="market-container">
        {/* Market Search Section */}
        <div className="header-container">
          <FaSearch className="icon" />
          <h1>Indian Market Prices <span>IN</span></h1>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter commodity..."
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter year..."
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error ? (
          <p className="error-msg">Failed to load market data.</p>
        ) : data.length === 0 ? (
          <p className="no-data">No market data available.</p>
        ) : (
          <div className="market-results">
            {data.map((item, index) => (
              <div key={index} className="result-card">
                <h3>{item.commodity}</h3>
                <p>Year: {item.year}</p>
                <p>Price: {item.price}</p>
                <p>Location: {item.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Market Features Section */}
        <section className="features-section">
          <div className="features-container">
            <div className="feature-card">
              <FaChartLine className="feature-icon trends-icon" />
              <h3>Real-Time Market Trends</h3>
              <p>Stay updated with the latest commodity price movements and market insights.</p>
            </div>

            <div className="feature-card">
              <FaRupeeSign className="feature-icon price-icon" />
              <h3>Price Comparison</h3>
              <p>Compare commodity prices across different regions and identify profitable markets.</p>
            </div>

            <div className="feature-card">
              <FaChartPie className="feature-icon insights-icon" />
              <h3>Data-Driven Insights</h3>
              <p>Analyze historical price data to make informed trading and farming decisions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Market;
