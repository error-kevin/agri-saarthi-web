import React, { useEffect, useState } from "react";
import { auth } from "../firebase";  
import "../styles/Profile.css";       
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";  // Import large profile icon

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/auth"); // Redirect to login if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h2>👤 Profile</h2>

          {/* Show Profile Pic or Large Profile Icon */}
          {user.photoURL ? (
            <img
              src={user.photoURL} 
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <FaUserCircle className="profile-icon-large" />
          )}

          <div className="profile-info">
            <p><strong>Name:</strong> {user.displayName || "Anonymous User"}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
