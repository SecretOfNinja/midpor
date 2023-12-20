import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2>About Us Page</h2>
      {/* Add content for the About Us page */}
      <p>
        Welcome to our community! We are dedicated to providing assistance and support.
        If you have any questions or need help, feel free to reach out to us.
      </p>

      {/* Phone Number */}
      <div className="contact-info">
        <strong>Contact Phone:</strong> +972 (052) 377-9242
      </div>

      {/* Social Media Icons */}
      <div className="social-media">
        <strong>Connect with us on social media:</strong>
        <ul>
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </li>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us">
        <h3>Contact Us</h3>
        <p>
          If you have any inquiries or need assistance, please don't hesitate to contact us.
          You can reach us via email at <a href="mailto:info@example.com">info@example.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
