import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/About.css";
import member1 from '../assets/member-1.jpg';
import member2 from '../assets/member-2.jpg';
import member3 from '../assets/member-3.jpg';
import bmcLogo from '../assets/bmc-logo.png'; // Buy Me a Coffee Logo

const teamMembers = [
  {
    name: "Keshav Joshi",
    role: "AI Developer & FullStack Developer",
    image: member1,
    github: "https://github.com/error-kevin",
    linkedin: "https://www.linkedin.com/in/keshav-joshi07",
    twitter: "https://x.com/error_keshav",
    buymeacoffee: "https://buymeacoffee.com/error.keshav",
  },
  {
    name: "Khushi Raghuwanshi",
    role: "Frontend Developer",
    image: member2,
    github: "https://github.com/KhushiRaghuwanshi20",
    linkedin: "https://www.linkedin.com/in/khushi-raghuwanshi-494ba5330",
    twitter: "https://x.com/Khushi_2095",
    buymeacoffee: "https://buymeacoffee.com/khushiraghuwanshi_20",
  },
  {
    name: "Urvashi Sharma",
    role: "Backend Developer",
    image: member3,
    github: "https://github.com/Urvashi-146",
    linkedin: "https://www.linkedin.com/in/urvashi-sharma0104",
    twitter: "https://x.com/Urvashi_146",
    buymeacoffee: "https://buymeacoffee.com/urvashi_146",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>
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
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img 
              src={member.image} 
              srcSet={`${member.image} 2x`}  // Loads higher resolution if available
              alt={member.name} 
              onError={(e) => e.target.src = member.image} // Prevents broken images
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="social-links">
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Buy Me a Coffee Section */}
      <h2>Support Us ☕</h2>
      <div className="buymeacoffee-container">
        {teamMembers.map((member, index) => (
          member.buymeacoffee && (
            <a 
              key={index} 
              href={member.buymeacoffee} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bmc-link"
            >
              <img src={bmcLogo} alt="Buy Me a Coffee" className="bmc-logo" />
              Support {member.name}
            </a>
          )
        ))}
      </div>
    </div>
  );
};

export default About;
