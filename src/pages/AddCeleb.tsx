import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const professions = [
  "Actor/Actress",
  "Musician",
  "Athlete",
  "Influencer",
  "Comedian",
  "TV Host",
  "Reality Star",
  "Model",
  "YouTuber",
  "TikTok Creator",
  "Podcaster",
  "Esports Player",
  "Dancer",
  "Fashion Designer",
  "Fitness Coach",
  "Author",
];

const MAX_IMAGE_SIZE_MB = 5;

const uploadToCloudinary = async (file: File): Promise<string> => {
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    throw new Error("Image size should not exceed 5MB");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    formData
  );

  return response.data.secure_url;
};

const AddCeleb: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    bio: "",
    profileImage: "",
    bioImages: [] as string[],
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bioFiles, setBioFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!profileFile) {
        setError("Profile image is required");
        setLoading(false);
        return;
      }

      const profileImageUrl = await uploadToCloudinary(profileFile);
      let bioImageUrls: string[] = [];

      if (bioFiles) {
        const filesArray = Array.from(bioFiles).slice(0, 5);
        const uploads = filesArray.map((file) => uploadToCloudinary(file));
        bioImageUrls = await Promise.all(uploads);
      }

      const finalPayload = {
        ...formData,
        profileImage: profileImageUrl,
        bioImages: bioImageUrls,
      };

      // Replace with your actual endpoint
      await axios.post(
        "https://bookcelebrity-server.onrender.com/api/celebs",
        finalPayload
      );
      toast.success("Celeb added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/accounts");
    } catch (err: any) {
      setError(err.message || "Failed to add celebrity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>Add a New Celebrity</Header>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {" "}
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />{" "}
          </FormGroup>

          <FormGroup>
            {" "}
            <Label>Profession</Label>
            <Select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            >
              <option value="">Select profession</option>
              {professions.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            {" "}
            <Label>Bio</Label>
            <TextArea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              required
            />{" "}
          </FormGroup>

          <FormGroup>
            {" "}
            <Label>Profile Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              required
            />{" "}
          </FormGroup>

          <FormGroup>
            {" "}
            <Label>Bio Images (Max 5)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setBioFiles(e.target.files)}
            />{" "}
          </FormGroup>

          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Celebrity"}
          </Button>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AddCeleb;

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 100px auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 500;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
