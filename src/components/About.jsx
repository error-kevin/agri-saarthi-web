import React from "react";
import "./About.css";
import myPhoto from "./assets/myphoto.png";
const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Project</h1>
      <p>
        We are a passionate team participating in the Google Solution Challenge, aiming to
        create an AI-powered agricultural advisory system for small and marginal farmers.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our goal is to empower farmers with AI-driven insights to improve their productivity
        and decision-making.
      </p>

      <h2>Meet the Team</h2>
      <div className="team">
        <div className="team-member">
          <img src={myPhoto} alt="Member 1" />
          <h3>Member 1</h3>
          <p>Role: AI Developer</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/100" alt="Member 2" />
          <h3>Member 2</h3>
          <p>Role: Frontend Developer</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/100" alt="Member 3" />
          <h3>Member 3</h3>
          <p>Role: Backend Developer</p>
        </div>
      </div>
    </div>
  );
};

export default About;
