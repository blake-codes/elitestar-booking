import styled from "styled-components";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import ChatBot from "../components/ChatBot";
import { useEffect } from "react";

// Styled Components
const Container = styled.div`
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

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 15px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 800px;
  width: 100%;
`;

const Step = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StepNumber = styled.div`
  background: #f5a623;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const StepText = styled.div`
  flex: 1;

  p {
    font-size: 1.1rem;
    color: #555;
    margin-top: 5px;

    @media (max-width: 768px) {
      font-size: 1rem;
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
  margin-top: 30px;
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

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <Title>How It Works</Title>
        <Subtitle>Booking a Celebrity Made Simple</Subtitle>
        <StepContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepText>
              <strong>Submit Your Request</strong>
              <p>
                Tell us about your event, preferred celebrity, budget, and any
                specific requirements.
              </p>
            </StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepText>
              <strong>Get Personalized Options</strong>
              <p>
                We provide you with a curated list of celebrity options that
                match your event needs.
              </p>
            </StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepText>
              <strong>Confirm Booking</strong>
              <p>
                Once you choose a celebrity, we handle all the contracts,
                logistics, and scheduling.
              </p>
            </StepText>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <StepText>
              <strong>Event Execution</strong>
              <p>
                Your chosen celebrity arrives on time, ensuring a smooth and
                successful event.
              </p>
            </StepText>
          </Step>
        </StepContainer>
        <CTAButton to="/celebrities">Start Your Booking</CTAButton>
      </Container>
      <ChatBot />
      <Footer />
    </>
  );
};

export default HowItWorks;
