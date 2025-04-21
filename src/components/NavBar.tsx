import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaStar,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaLock,
  FaUserCog,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";
import axios from "axios";

interface NavProps {
  $isOpen: boolean;
  $isDropdownOpen: boolean;
}

const NavBar = styled.nav<NavProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 70px;
  background: #1a1a2e;
  color: #ffffff;
  height: 90px;
  box-shadow: 0 2px 5px rgba(0, 0, 0.1, 0.1);
  position: fixed;
  width: 100%; /* Adjusted to leave space on both sides */
  box-sizing: border-box;
  z-index: 100;

  @media (max-width: 1100px) {
    margin: 0 0;
    width: 100%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    padding: 15px 20px;
  }

  .hamburger {
    display: none;
    cursor: pointer;
    color: #f5a623;
    margin-left: 10px;

    @media (max-width: 1100px) {
      display: block;
    }
  }

  ul {
    display: flex;
    gap: 35px;
    list-style: none;

    @media (max-width: 1100px) {
      display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
      flex-direction: column;
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      background-color: #1a1a2e;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
  }

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #f5a623;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #ffffff;
      font-size: medium;
      font-weight: 300;
      gap: 8px;

      &:hover {
        color: #f5a623;
      }
    }
  }

  .dropdown {
    position: absolute;
    background: #1a1a2e;
    top: 60px;
    right: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: ${({ $isDropdownOpen }) => ($isDropdownOpen ? "block" : "none")};
    z-index: 1001;
  }

  .dropdown li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #1a1a2e;
    }
  }
`;
const LogoContainer = styled(Link)`
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  margin-right: 20px;
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.div`
  img {
    height: 40px;
    width: 60px;
    object-fit: contain;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-family: "Poppins", sans-serif; /* Modern and stylish font */
  font-weight: bold;
  color: #f5a623;
  font-size: 1.2rem;
  letter-spacing: 1px;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
  }
`;
const LoginContainer = styled.div`
  color: #ffffff;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #28a745;
  font-size: 0.9rem;
  margin-right: 20px;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;
const SignUpContainer = styled.div`
  background-color: #f5a623;
  color: #1a1a2e;
  display: flex;
  padding: 10px 20px;
  border: 1px solid #f5a623;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    background-color: #1a1a2e;
    color: #f5a623;
  }

  @media (max-width: 1100px) {
    font-size: 0.7rem;
    margin-right: 0;
    right: 0;
  }
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;
const ButtonText = styled.div`
  margin-left: 7px;
`;
const AdminDropdown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  font-weight: 300;
  gap: 8px;

  &:hover {
    color: #f5a623;
  }
`;
const LinkWithoutUnderline = styled(Link)`
  text-decoration: none; /* Removes the underline from the link */
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, username, logout } = useAuth();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(
          "https://bookcelebrity-server.onrender.com/api/auth/healthcheck"
        );
        console.log("Healthcheck successful:", response.data);
      } catch (error) {
        console.error("Healthcheck failed:", error);
      }
    };

    checkHealth();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <NavBar $isOpen={isOpen} $isDropdownOpen={isDropdownOpen}>
        <LogoContainer to="/">
          <Logo>
            <img src="/assets/images/celeb-logo.png" alt="Logo" />
          </Logo>
          <LogoText>
            EliteStar
            <span>Bookings</span>
          </LogoText>
        </LogoContainer>

        <ul>
          {isOpen && isAuthenticated && username !== "admin" && (
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}
          {isOpen && isAuthenticated && username === "admin" && (
            <li>
              <Link to="/accounts" onClick={() => setIsOpen(false)}>
                Accounts
              </Link>
            </li>
          )}
          {isOpen && isAuthenticated && username === "admin" && (
            <li>
              <Link to="/bookings" onClick={() => setIsOpen(false)}>
                Bookings
              </Link>
            </li>
          )}
          {isOpen && isAuthenticated && username === "admin" && (
            <li>
              <Link to="/messages" onClick={() => setIsOpen(false)}>
                Messages
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/about-us" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
          )}

          {isOpen && (
            <li>
              <Link to="/celebrities" onClick={() => setIsOpen(false)}>
                Celebrities
              </Link>
            </li>
          )}

          {isOpen && (
            <li>
              <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
            </li>
          )}
          {isOpen && (
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
            </li>
          )}

          {isOpen && (
            <li>
              <Link to="/celebrities" onClick={() => setIsOpen(false)}>
                <FaStar /> Book a Celebrity
              </Link>
            </li>
          )}
          {isOpen && !isAuthenticated && (
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <FaLock /> Login
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/about-us" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/celebrities" onClick={() => setIsOpen(false)}>
                Celebrities
              </Link>
            </li>
          )}
          {!isOpen && (
            <li>
              <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
                How It Works
              </Link>
            </li>
          )}

          {!isOpen && (
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
            </li>
          )}

          {/* Styled admin dropdown */}

          {isOpen && isAuthenticated && (
            <li>
              <Link to="/settings">
                <FaUserCog /> Settings
              </Link>
            </li>
          )}

          {isOpen && isAuthenticated && (
            <li style={{ marginBottom: "40px" }}>
              <Link to="/" onClick={logout}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          )}
        </ul>
        <IconsContainer>
          {!isAuthenticated && (
            <LinkWithoutUnderline
              to="/celebrities"
              onClick={() => setIsDropdownOpen(false)}
            >
              {" "}
              <SignUpContainer>
                <FaStar /> <ButtonText>BOOK A CELEBRITY</ButtonText>
              </SignUpContainer>
            </LinkWithoutUnderline>
          )}
          {!isAuthenticated && (
            <LinkWithoutUnderline
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
            >
              {" "}
              <LoginContainer>
                <FaLock />
                <ButtonText>LOGIN</ButtonText>
              </LoginContainer>
            </LinkWithoutUnderline>
          )}

          {!isOpen && isAuthenticated && (
            <li onClick={toggleDropdown}>
              <AdminDropdown>
                <FaUser /> {username} <FaChevronDown />
              </AdminDropdown>
              <ul className="dropdown">
                {username !== "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {username === "admin" && (
                  <li>
                    <Link
                      to="/accounts"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Accounts
                    </Link>
                  </li>
                )}
                {username === "admin" && (
                  <li>
                    <Link
                      to="/bookings"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Bookings
                    </Link>
                  </li>
                )}
                {username === "admin" && (
                  <li>
                    <Link
                      to="/messages"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Messages
                    </Link>
                  </li>
                )}

                <li>
                  <Link to="/" onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </Link>
                </li>
              </ul>
            </li>
          )}

          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </IconsContainer>
      </NavBar>
    </>
  );
};

export default Navbar;
