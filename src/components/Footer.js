import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { SiPaytm, SiPhonepe, SiGooglepay, SiAmazonpay } from 'react-icons/si';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      {/* Main Footer Content */}
      <div className="footer-main">
        {/* Company Info */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p className="company-desc">Your trusted platform for online betting and gaming entertainment.</p>
          <div className="social-icons">
            <a href="/" className="social-icon"><FaFacebookF /></a>
            <a href="/" className="social-icon"><FaTwitter /></a>
            <a href="/" className="social-icon"><FaInstagram /></a>
            <a href="/" className="social-icon"><FaTelegram /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p><FiMail /> support@puntexch247.com</p>
            <div className="payment-methods">
              <SiPaytm title="Paytm" />
              <SiPhonepe title="PhonePe" />
              <SiGooglepay title="Google Pay" />
              <SiAmazonpay title="Amazon Pay" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 Puntexch247</p>
        <p className="disclaimer">Please bet responsibly. Terms & Conditions apply.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
