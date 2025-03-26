import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // ✅ Import here
import { doc, setDoc } from "firebase/firestore";
import "./../styles/Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        navigator.geolocation.getCurrentPosition(async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            location,
          });

          // alert("User signed up and stored in Firestore!");
          navigate("/dashboard"); // Redirect to dashboard after signup
        }, (error) => {
          setError("Geolocation error: " + error.message);
        });

      } else {
        // Login Logic
        await signInWithEmailAndPassword(auth, email, password);
        // alert("User logged in successfully!");
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAuth}>
        {isSignUp && (
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p className="toggle-text" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Auth;
