import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/About.css";

const teamMembers = [
  {
    name: "Keshav Joshi",
    role: "AI Developer & FullStack Developer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
    github: "https://github.com/member1",
    linkedin: "https://linkedin.com/in/member1",
    twitter: "https://twitter.com/member1",
  },
  {
    name: "Khushi Raghuwanshi",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
    github: "https://github.com/member2",
    linkedin: "https://linkedin.com/in/member2",
    twitter: "https://twitter.com/member2",
  },
  {
    name: "Urvashi Sharma",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
    github: "https://github.com/member3",
    linkedin: "https://linkedin.com/in/member3",
    twitter: "https://twitter.com/member3",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <h1>About </h1>
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
            <img src={member.image} alt={member.name} />
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
    </div>
  );
};

export default About;
