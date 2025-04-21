import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Booking {
  _id: string;
  celebId: {
    name: string;
  };
  name: string;
  email: string;
  date: string;
  reason: string;
  message: string;
  createdAt: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "https://bookcelebrity-server.onrender.com/api/celebs/bookings"
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const truncate = (text: string, length = 20) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  // Inside your component:
  const handleDelete = async (bookingId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://bookcelebrity-server.onrender.com/api/celebs/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete booking");
      toast.success("Booking deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container>
        <Title>All Bookings</Title>
        {loading && <Message>Loading bookings...</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && bookings.length === 0 && (
          <Message>No bookings found.</Message>
        )}
        {!loading && !error && bookings.length > 0 && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>#</Th>
                  <Th>Booked By</Th>
                  <Th>Email</Th>
                  <Th>Celebrity</Th>
                  <Th>Date</Th>
                  <Th>Reason</Th>
                  <Th>Message</Th>
                  <Th>Created At</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <Td>{index + 1}</Td>
                    <Td>{booking.name}</Td>
                    <Td>{booking.email}</Td>
                    <Td>{booking.celebId.name}</Td>
                    <Td>{new Date(booking.date).toLocaleDateString()}</Td>
                    <Td>{booking.reason}</Td>
                    <Td>
                      {truncate(booking.message)}
                      {booking.message.length > 20 && (
                        <ViewButton
                          onClick={() => setSelectedMessage(booking.message)}
                        >
                          View
                        </ViewButton>
                      )}
                    </Td>
                    <Td>{new Date(booking.createdAt).toLocaleString()}</Td>
                    <Td>
                      <DeleteButton onClick={() => handleDelete(booking._id)}>
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

      {selectedMessage && (
        <ModalOverlay onClick={() => setSelectedMessage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Full Message</ModalHeader>
            <ModalBody>{selectedMessage}</ModalBody>
            <CloseButton onClick={() => setSelectedMessage(null)}>
              Close
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Bookings;

const Container = styled.div`
  padding: 20px;
  background: white;
  min-height: 100vh;
  margin-top: 90px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  vertical-align: top;
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
`;

const ErrorMessage = styled(Message)`
  color: red;
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;

  &:hover {
    color: #1d6fa5;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  border-radius: 8px;
  position: relative;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`;

const ModalBody = styled.p`
  white-space: pre-wrap;
  color: #333;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background: #34495e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #2c3e50;
  }
`;
const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #c0392b;
  }
`;
