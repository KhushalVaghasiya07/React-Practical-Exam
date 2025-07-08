import React from "react";
import "./Footer.css";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube, BsArrowUp } from "react-icons/bs";
import Navlogo from "../../assets/Images/Nav-logo.svg"
import { Container } from "react-bootstrap";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container fluid>
      <footer className="custom-footer-dark">
        <div className="footer-container-dark">
          <div className="footer-section">
            <img src={Navlogo} alt="" />
            <p>Discover world cuisines, easy recipes & food inspiration.</p>
          </div>

          <div className="footer-section">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Recipes</a></li>
              <li><a href="#">Cuisines</a></li>
              <li><a href="#">Journal</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Join Our Newsletter</h4>
            <p>Get the latest recipes and tips straight to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social-icons-dark">
              <a href="#"><BsFacebook /></a>
              <a href="#"><BsInstagram /></a>
              <a href="#"><BsTwitter /></a>
              <a href="#"><BsYoutube /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-dark">
          <p>© {new Date().getFullYear()} Platea. All rights reserved.</p>
          <div className="scroll-top" onClick={scrollToTop}>
            <BsArrowUp />
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
