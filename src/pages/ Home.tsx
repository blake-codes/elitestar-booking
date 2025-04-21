import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import ChatBot from "../components/ChatBot";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🔹 Styled Components
const HomeContainer = styled.div`
  background: #f8f9fa;
  color: #222;
  min-height: 100vh;
  text-align: center;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #f5a623;
  color: #222 !important;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  border: 2px solid #f5a623;
  box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);
  animation: ${slideUp} 1.4s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background: #222;
    color: #f5a623 !important;
  }
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
  background: url("/assets/images/celeb_hero.jpg") center/cover no-repeat;
  height: 500px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  h1,
  p,
  ${CTAButton} {
    position: relative;
    z-index: 2;
    color: white;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #f5a623;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
    animation: ${fadeIn} 1s ease-in-out;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    max-width: 600px;
    line-height: 1.5;
    animation: ${fadeIn} 1.2s ease-in-out;
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    color: #222;
    margin-bottom: 20px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  padding: 0 10px;
`;

const StarCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  width: 250px;
  max-width: 90vw;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 220px;
    border-radius: 12px;
    object-fit: cover;
  }

  h3 {
    color: #222;
    margin-top: 12px;
    font-size: 1.2rem;
    line-height: 1.3;
  }

  p {
    background: #f5a623;
    display: inline-block;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: bold;
    color: #222;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    img {
      height: 200px;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 180px;
    }
  }
`;

const TestimonialCard = styled.div`
  background: linear-gradient(135deg, #fff7cc, #fff3a3);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0px 6px 15px rgba(255, 215, 0, 0.25);
  animation: ${fadeIn} 1.2s ease-in-out;

  p {
    font-style: italic;
    color: #444;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  h4 {
    margin-top: 15px;
    color: #222;
    font-weight: bold;
    font-size: 1rem;
  }
`;

type Star = {
  id: number;
  name: string;
  profession: string;
  profileImage: string;
};
// 🔹 Main Component
const Home = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    fetch("https://bookcelebrity-server.onrender.com/api/celebs")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setStars(selected);
      })
      .catch((error) => console.error("Error fetching stars:", error));
  }, []);

  return (
    <>
      <Navbar />

      <HomeContainer>
        <HeroSection>
          <h1>Your #1 Celebrity Agency</h1>
          <p>
            Exclusive access to your favorite celebrities for bookings,
            endorsements, and more.
          </p>
          <CTAButton to="/celebrities">Book Now</CTAButton>
        </HeroSection>

        {/* 🔹 Meet the Stars Section */}
        <Section>
          <h2>Meet the Stars</h2>
          <StarsContainer>
            {stars.length > 0 ? (
              stars.map((star) => (
                <StarCard key={star.id}>
                  <img src={star.profileImage} alt={star.name} />
                  <h3>{star.name}</h3>
                  <p>{star.profession}</p>
                </StarCard>
              ))
            ) : (
              <p>Loading stars...</p>
            )}
          </StarsContainer>
        </Section>

        {/* 🔹 Success Stories Section */}
        <Section>
          <h2>Success Stories</h2>
          <TestimonialCard>
            <p>"Booking through this platform was a game-changer!"</p>
            <h4>— Alex Johnson</h4>
          </TestimonialCard>
          <TestimonialCard>
            <p>"I got to work with my dream celebrity effortlessly!"</p>
            <h4>— Sarah Williams</h4>
          </TestimonialCard>
          <TestimonialCard>
            <p>"Highly professional service, I recommend it to everyone!"</p>
            <h4>— Michael Brown</h4>
          </TestimonialCard>
        </Section>

        {/* 🔹 Exclusive Celebrity Events Section */}
        <Section>
          <h2>Exclusive Celebrity Events</h2>
          <p>Join us at our exclusive celebrity events for VIP experiences.</p>
          <CTAButton to="/">View Events</CTAButton>
        </Section>
      </HomeContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Home;
