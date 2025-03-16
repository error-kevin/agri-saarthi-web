import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
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
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {user ? ( // If user is logged in, show dashboard links
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/market">Market</Link></li>
              <li><Link to="/weather">Weather</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : ( // If no user, show Sign Up / Login button
             <div className="nav-buttons">
              <button className="signup-button" onClick={() => navigate("/auth")}>
                Sign Up / Login
              </button>
              </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
