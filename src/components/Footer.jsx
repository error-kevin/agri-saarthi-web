import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>🌍 About Us</h3>
          <p>Agri-Saarthi is your AI-powered assistant for smarter farming.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>📩 Contact Us</h3>
          <p>Email: <a href="mailto:support@agrisaarthi.com">support@agrisaarthi.com</a></p>
          <p>Phone: +91 98765 43210</p>
        </div>

        {/* Terms & FAQs */}
        <div className="footer-section">
          <h3>📜 Terms & Privacy</h3>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faqs">FAQs</Link>
        </div>

        {/* Social Links */}
        {/* <div className="footer-section">
          <h3>🔗 Follow Us</h3>
          <div className="social-links">
            <a href="https://github.com/creator1" target="_blank" rel="noopener noreferrer">GitHub (Creator 1)</a>
            <a href="https://github.com/creator2" target="_blank" rel="noopener noreferrer">GitHub (Creator 2)</a>
            <a href="https://github.com/creator3" target="_blank" rel="noopener noreferrer">GitHub (Creator 2)</a>
          </div>
        </div> */}
      </div>
      
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Agri-Saarthi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
