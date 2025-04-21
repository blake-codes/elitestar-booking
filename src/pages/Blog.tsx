import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Container = styled.div`
  padding: 100px 20px 60px 20px;
  max-width: 1200px;
  margin: auto;
  margin-top: 30px;

  @media (max-width: 768px) {
    padding: 80px 16px 40px 16px;
  }
`;

const Title = styled.h1`
  color: #f5a623;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ArticleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const Article = styled.div`
  background: #1a1a2e;
  border-radius: 10px;
  overflow: hidden;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ArticleContent = styled.div`
  padding: 20px;
`;

const ArticleTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #fff;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.5;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMore = styled.a`
  display: inline-block;
  margin-top: 12px;
  color: #f5a623;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #ffc107;
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 80px;
`;

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = "81bdaa16f60cc3811867927a4707559d"; // Replace with your GNews API key
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=celebrity&lang=en&max=12&token=${apiKey}`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Title>Celebrity News</Title>

        {loading ? (
          <Loader>Loading celebrity news...</Loader>
        ) : (
          <ArticleList>
            {articles.length > 0 ? (
              articles.map((article: any, index: number) => (
                <Article key={index}>
                  <ArticleImage
                    src={article.image || "/fallback-news.jpg"}
                    alt={article.title}
                  />
                  <ArticleContent>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <Description>{article.description}</Description>
                    <ReadMore
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Article →
                    </ReadMore>
                  </ArticleContent>
                </Article>
              ))
            ) : (
              <Loader>No celebrity news found.</Loader>
            )}
          </ArticleList>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
