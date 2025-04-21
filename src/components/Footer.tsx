import styled from "styled-components";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const FooterStyled = styled.footer`
  background: #121212;
  color: #fff;
  padding: 60px 20px;
  font-size: 0.95rem;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
      text-align: center;
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #f5a623;
  }

  .footer-links a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #f5a623;
    }
  }

  .social-icons {
    display: flex;
    gap: 14px;
    font-size: 1.5rem;
    margin-top: 10px;

    a {
      color: #ccc;
      transition: color 0.3s;

      &:hover {
        color: #f5a623;
      }
    }
  }

  .membership-logos {
    display: flex;
    gap: 15px;
    margin-top: 15px;

    img {
      width: 100px;
      filter: grayscale(80%);
      transition: filter 0.3s, transform 0.2s;

      &:hover {
        filter: grayscale(0%);
        transform: scale(1.05);
      }
    }
  }

  .footer-bottom {
    text-align: center;
    margin-top: 40px;
    font-size: 0.85rem;
    opacity: 0.7;
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-column">
          <h3 className="footer-title">About Us</h3>
          <p>
            We connect you with top celebrities for bookings, events, and
            collaborations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-column footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/contact">Contact Us</a>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Membership Logos */}
        <div className="footer-column">
          <h3 className="footer-title">Our Partners</h3>
          <div className="membership-logos">
            <img src="/assets/images/netflix.png" alt="netflix logo" />
            <img src="/assets/images/airbnb.svg" alt="airbnb" />
            <img src="/assets/images/spotify.svg" alt="spotify logo" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="footer-bottom">
        © {new Date().getFullYear()} EliteStarBookings. All Rights Reserved.
      </p>
    </FooterStyled>
  );
};

export default Footer;
