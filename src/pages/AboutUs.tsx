import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useEffect } from "react";
import ChatBot from "../components/ChatBot";

// Styled Components
const AboutContainer = styled.div`
  background: #f8f9fa;
  color: #222;
  min-height: 100vh;
  padding: 50px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    padding: 40px 10%;
  }

  @media (max-width: 480px) {
    padding: 30px 5%;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  color: #f5a623;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Content = styled.p`
  font-size: 1.2rem;
  max-width: 900px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const List = styled.ul`
  text-align: left;
  margin: 20px auto;
  max-width: 700px;
  padding-left: 20px;

  li {
    font-size: 1.1rem;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #f5a623;
  color: #222;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  border: 2px solid #f5a623;
  box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);

  &:hover {
    background: #222;
    color: #f5a623;
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <AboutContainer>
        <Title>About EliteStar Bookings</Title>
        <Content>
          <strong>EliteStar Bookings</strong> is a premier celebrity booking
          agency dedicated to helping brands, businesses, and events connect
          with top-tier celebrity talent. With over 20 years of expertise, we
          have built a trusted reputation for delivering high-profile bookings
          that enhance marketing, branding, and entertainment experiences.
        </Content>
        <Content>
          A celebrity presence can transform any event, attracting attention,
          increasing engagement, and boosting credibility. Whether you are
          hosting a corporate event, product launch, gala, or private gathering,
          the right celebrity can amplify your brand’s message and create an
          unforgettable experience.
        </Content>
        <Content>Our extensive network includes:</Content>
        <List>
          <li>✔ Actors & Actresses</li>
          <li>✔ Musicians & DJs</li>
          <li>✔ Comedians & Reality TV Stars</li>
          <li>✔ Celebrity Chefs & Event Hosts</li>
          <li>✔ Athletes & Fitness Professionals</li>
          <li>✔ Keynote Speakers & Brand Ambassadors</li>
        </List>
        <Content>
          Whether you need a celebrity for an endorsement, speaking engagement,
          product launch, TV commercial, or social media collaboration, we
          handle every detail, ensuring a smooth and successful booking process.
        </Content>
        <Content>
          <strong>EliteStar Bookings</strong> provides exclusive access to some
          of the most recognizable names in entertainment. Contact us today to
          discuss celebrity availability, booking fees, and event planning.
        </Content>
        <CTAButton to="/contact">Contact Us</CTAButton>
      </AboutContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default About;
