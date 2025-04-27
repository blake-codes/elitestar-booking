import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  margin-top: 70px;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  display: block;
  margin: 1rem auto;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border 0.3s ease;

  &:hover {
    border-color: #f5a623;
  }
`;

const ProfileLink = styled.a`
  display: block;
  text-align: center;
  margin: 1rem auto;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BioContainer = styled.div`
  margin-top: 2rem;
  line-height: 1.6;
  text-align: justify;
`;

const BookingForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 0.9rem;
  font-size: 1.1rem;
  background: #f5a623;
  color: #222 !important;
  border: 2px solid #f5a623;
  box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.3);
  border-radius: 6px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background: #222;
    color: #f5a623 !important;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: #656565;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const eventTypes = [
  "Birthday Shoutout",
  "Event Hosting",
  "Brand Endorsement",
  "Meet and Greet",
  "TV or Film Cameo",
  "Podcast Guest Spot",
  "Custom Video Message",
  "Virtual Meet & Greet",
  "Social Media Promotion",
  "Motivational Message",
];

const CelebrityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [celebrity, setCelebrity] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCelebrity = async () => {
      try {
        const res = await axios.get(
          `https://bookcelebrity-server.onrender.com/api/celebs/${id}`
        );
        setCelebrity(res.data);
        setSelectedImage(res.data.profileImage || res.data.bioImages?.[0]);
      } catch (error) {
        console.error("Failed to fetch celebrity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrity();
  }, [id]);

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventType(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const date = formData.get("date") as string;
    const reason = selectedEventType;
    const message = formData.get("message") as string;

    try {
      await axios.post(
        "https://bookcelebrity-server.onrender.com/api/celebs/book",
        {
          celebId: id,
          name,
          email,
          date,
          reason,
          message,
        }
      );

      toast.success("Booking request sent successfully!");
      form.reset();
      window.scrollTo(0, 0);
      setSelectedEventType("");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <h2>Loading...</h2>
      </PageContainer>
    );
  }

  if (!celebrity) {
    return (
      <PageContainer>
        <h2>Celebrity Not Found</h2>
      </PageContainer>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <PageContainer>
        <h1>{celebrity.name}</h1>
        <h3>{celebrity.profession}</h3>

        <ProfileImage src={selectedImage} alt={celebrity.name} />

        <ImageContainer>
          {[celebrity.profileImage, ...(celebrity.bioImages || [])].map(
            (img: string, index: number) => (
              <Image
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                onClick={() => setSelectedImage(img)}
              />
            )
          )}
        </ImageContainer>

        {celebrity.profileUrl && (
          <ProfileLink
            href={celebrity.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Profile
          </ProfileLink>
        )}

        <BioContainer>
          <p>{celebrity.bio}</p>
        </BioContainer>

        <BookingForm onSubmit={handleSubmit}>
          <h3>Book {celebrity.name}</h3>
          <label htmlFor="name">Name</label>
          <Input name="name" type="text" placeholder="Your Name" required />
          <label htmlFor="email">Email</label>
          <Input name="email" type="email" placeholder="Your Email" required />
          <label htmlFor="date">Booking Date</label>
          <Input name="date" type="date" required />
          <SelectWrapper>
            <label htmlFor="reason">Reason for Booking</label>
            <StyledSelect
              name="reason"
              value={selectedEventType}
              onChange={handleEventTypeChange}
              required
            >
              <option value="">Select reason for booking</option>
              {eventTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
          <label htmlFor="message">Message</label>
          <TextArea name="message" rows={4} placeholder="Message (optional)" />
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Booking Request"}
          </SubmitButton>
        </BookingForm>

        <BackButton to="/celebrities">← Back to Celebrities</BackButton>
      </PageContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default CelebrityDetails;
