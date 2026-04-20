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
        Agriculture is the heart of our community, yet small farmers face unprecedented risks from climate change and market volatility. Our project, AgriSaarthi, is a social-tech initiative that provides hands-on digital skilling and real-time expert mentorship. We believe that by putting AI and smart sensors in the hands of every farmer, we can ensure food security and economic stability for all.
      </p>

      <h2>Our Mission</h2>
      <p>
        To empower the global farming community by transforming traditional practices into smart, sustainable systems, ensuring that no farmer is left behind in the digital revolution.
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
