import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "../components/Footer";

interface User {
  _id: string;
  name: string;
  profession: string;
  profileUrl: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCelebs = async () => {
      try {
        const response = await fetch(
          "https://bookcelebrity-server.onrender.com/api/celebs"
        );
        if (!response.ok) throw new Error("Failed to fetch celebs");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this celeb?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://bookcelebrity-server.onrender.com/api/celebs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete celeb");

      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("Celeb deleted successfully!");
    } catch (err) {
      alert("Error deleting celeb: " + (err as Error).message);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Header>Admin Dashboard</Header>

        <ActionBar>
          <SectionTitle>All Celebrities</SectionTitle>
          <AddCelebButton onClick={() => navigate("/add-celeb")}>
            + Add Celeb
          </AddCelebButton>
        </ActionBar>

        {loading && <Message>Loading celebs...</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>SN</Th>
                  <Th>Name</Th>
                  <Th>Profession</Th>

                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <Td>{index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.profession}</Td>

                    <Td>
                      <ViewButton
                        onClick={() => navigate(`/account/${user._id}`)}
                      >
                        View
                      </ViewButton>
                      <EditButton
                        onClick={() => navigate(`/edit-celeb/${user._id}`)}
                      >
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(user._id)}>
                        Delete
                      </DeleteButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AdminDashboard;

/* Styled Components */
const Container = styled.div`
  padding: 20px;
  background: white;
  min-height: 100vh;
  margin-top: 90px;
`;

const Header = styled.h1`
  color: #2c3e50;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const AddCelebButton = styled.button`
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #219150;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  margin-top: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #34495e;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ViewButton = styled.button`
  padding: 6px 12px;
  border: none;
  background: #3498db;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

const Message = styled.p`
  font-size: 18px;
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled(Message)`
  color: red;
`;

const EditButton = styled(ViewButton)`
  background: #f39c12;
  margin-left: 8px;

  &:hover {
    background: #e67e22;
  }
`;

const DeleteButton = styled(ViewButton)`
  background: #e74c3c;
  margin-left: 8px;

  &:hover {
    background: #c0392b;
  }
`;
