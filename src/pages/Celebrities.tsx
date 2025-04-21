import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

// 🔹 Professions Filter
const professions = ["All", "Actor", "Musician", "Athlete"];

// 🔹 Styled Components
const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 70px auto;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 90%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  display: block;
  margin: 0 auto 20px auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#f5a623" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#222")};
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: #f5a623;
    color: #fff;
  }
`;

const CelebritiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 10px;
`;

const CelebrityCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    border-radius: 10px;
    height: 220px;
    object-fit: cover;
  }

  h3 {
    margin-top: 10px;
    font-size: 1.1rem;
  }

  p {
    font-size: 0.9rem;
    color: #777;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    color: #f5a623;
    font-size: 0.9rem;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#f5a623" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#222")};
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: #f5a623;
    color: #fff;
  }
`;

// 🔹 Main Component
const Celebrities = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [celebritiesData, setCelebritiesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCelebrities = async () => {
      try {
        const response = await fetch(
          "https://bookcelebrity-server.onrender.com/api/celebs"
        );
        const data = await response.json();
        setCelebritiesData(data);
      } catch (error) {
        console.error("Error fetching celebrities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  // 🔹 Filter + Search
  const filteredCelebrities = celebritiesData.filter(
    (celebrity) =>
      celebrity.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || celebrity.profession === filter)
  );

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(filteredCelebrities.length / itemsPerPage);
  const paginatedCelebrities = filteredCelebrities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔹 Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  return (
    <>
      <Navbar />
      <PageContainer>
        <h1>Find Your Favorite Celebrity</h1>

        <SearchBar
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FiltersContainer>
          {professions.map((prof) => (
            <FilterButton
              key={prof}
              active={filter === prof}
              onClick={() => setFilter(prof)}
            >
              {prof}
            </FilterButton>
          ))}
        </FiltersContainer>

        {loading ? (
          <p>Loading celebrities...</p>
        ) : (
          <>
            <CelebritiesGrid>
              {paginatedCelebrities.length > 0 ? (
                paginatedCelebrities.map((celebrity) => (
                  <CelebrityCard key={celebrity._id}>
                    <img src={celebrity.profileImage} alt={celebrity.name} />
                    <h3>{celebrity.name}</h3>
                    <p>{celebrity.profession}</p>
                    <Link to={`/celebrities/${celebrity._id}`}>
                      View Profile
                    </Link>
                  </CelebrityCard>
                ))
              ) : (
                <p>No celebrities found.</p>
              )}
            </CelebritiesGrid>

            {totalPages > 1 && (
              <PaginationContainer>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PageButton
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
              </PaginationContainer>
            )}
          </>
        )}
      </PageContainer>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Celebrities;
