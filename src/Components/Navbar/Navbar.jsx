import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { BsBookmark, BsPerson } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/Images/Nav-logo.svg";
import "./Navbar.css";
import { useStore } from "../../Services/store";
import { logoutUser } from "../../Services/Actions/authActions";

const Header = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  const handleClick = () => {
    setShowUserDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar expand="lg" className="my-navbar">
      <Container className="custom-container">
        <div className="navbar-wrapper">
          <div className="navbar-center-group">
            <Navbar.Brand as={Link} to="/">
              <img src={NavLogo} alt="Platea Logo" className="nav-logo" />
            </Navbar.Brand>

            <Nav className="nav-links">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/allRecipes">Recipes</Link>
              <Link className="nav-link" to="/cuisines/indian">Cuisines</Link>
              <Link className="nav-link" to="/categories/snacks">Categories</Link>
              <Link className="nav-link" to="/blog">Blog</Link>
              <Link className="nav-link" to="/features/bookmarks">Features</Link>
            </Nav>
          </div>

          <div className="navbar-right">
            <div className="nav-icons">
              <BsBookmark className="nav-icon" />
              <div className="user-dropdown-container" ref={dropdownRef}>
                <BsPerson className="nav-icon user-icon" onClick={handleClick} />
                {showUserDropdown && (
                  <div className="user-dropdown-menu">
                    {state.auth.user ? (
                      <>
                        <div className="user-email">{state.auth.user.email}</div>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="dropdown-link">Sign In</Link>
                        <Link to="/signup" className="dropdown-link">Create Account</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="recipe-buttons">
              <Button as={Link} to="/add-recipe" variant="light" className="add-recipe-btn">
                Add Recipe
              </Button>
              <Button as={Link} to="/my-recipes" variant="outline-secondary" className="my-recipes-btn">
                My Recipes
              </Button>
            </div>
          </div>
        </div>

      </Container>
    </Navbar>
  );
};

export default Header;
