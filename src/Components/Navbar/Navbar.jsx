import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";
import { BsBookmark, BsPerson, BsSearch } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../../assets/Images/Nav-logo.svg";
import "./Navbar.css";
import { useStore } from "../../Services/store";
import { logoutUser } from "../../Services/Actions/authActions";

const Header = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  return (
    <Navbar expand="lg" className="my-navbar">
      <Container className="custom-container">
        <div className="navbar-wrapper">
          {/* Left Section */}
          <div className="navbar-left">
            <Navbar.Brand>
              <Link to={"/"}>
                <img src={NavLogo} alt="Platea Logo" className="nav-logo" />
              </Link>
            </Navbar.Brand>

            <Nav className="nav-links">
              {["Home", "Recipes", "Cuisines", "Categories", "Blog", "Features"].map((item, idx) => (
                <NavDropdown
                  key={idx}
                  title={
                    <span className="nav-dropdown-title">
                      {item} <MdOutlineKeyboardArrowDown className="dropdown-icon" />
                    </span>
                  }
                  id={`${item.toLowerCase()}-dropdown`}
                  show={null}
                  className="nav-hover-dropdown"
                >
                  <NavDropdown.Item href="#">{item} 1</NavDropdown.Item>
                  <NavDropdown.Item href="#">{item} 2</NavDropdown.Item>
                </NavDropdown>
              ))}
            </Nav>
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <div className="nav-icons">
              <BsSearch className="nav-icon" />
              <BsBookmark className="nav-icon" />

              {/* User Dropdown - Hover Only */}
              <div className="user-dropdown-container">
                <BsPerson className="nav-icon user-icon" />
                <div className="user-dropdown-menu">
                  {state.auth.user ? (
                    <>
                      <div className="user-email">{state.auth.user.email}</div>
                      <button onClick={handleLogout} className="logout-btn">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-link">Sign In</Link>
                      <Link to="/signup" className="dropdown-link">Create Account</Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recipe Buttons */}
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
