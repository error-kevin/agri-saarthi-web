import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Import burger and close icons
import "../styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);  // State for burger menu
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
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

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Agri-Saarthi</Link>
      </div>

      {/* Burger Menu Icon */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Menu */}
      <nav className={menuOpen ? "open" : ""}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/market-prices" onClick={() => setMenuOpen(false)}>Market Prices</Link></li>
          <li><Link to="/pest-detection" onClick={() => setMenuOpen(false)}>Pest Detection</Link></li>
          <li><Link to="/weather" onClick={() => setMenuOpen(false)}>Weather</Link></li>

          {/* Show "Dashboard" only when user is logged in */}
          {user && (
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          )}
        </ul>

        {/* Show profile icon only when user is logged in */}
        {user ? (
          <div className="profile-menu">
            <FaUserCircle 
              className="profile-icon" 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
            />
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-buttons">
            <button className="signup-button" onClick={() => navigate("/auth")}>
              Sign Up / Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
