import React from "react";
import { Container } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaUtensils } from "react-icons/fa";
import "./HeroSection.css";

const categories = [
  "APPETIZERS", "BBQ & GRILLING", "BREADS", "BREAKFASTS",
  "DESSERTS", "DRINKS", "GLUTEN-FREE", "HEALTHY",
  "INSTANT POT", "MEAT", "PASTA", "SALADS",
  "SEAFOOD", "SIDE DISHES", "SNACKS",
];

const HeroSection = ({ searchQuery, setSearchQuery, onCategorySelect }) => {
  return (
    <section className="hero-section">
      <Container className="hero-container">
        <h1 className="hero-title">Platea Recipes</h1>
        <p className="hero-subtext">
          Explore and share daily cooking ideas with our recipes...
        </p>

        <div className="search-bar">
          <FaUtensils className="search-icon-left" />
          <input
            type="text"
            placeholder="Find what do you want to cook today"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <BsSearch />
          </button>
        </div>

        <div className="category-list">
          {categories.map((item, index) => (
            <span
              key={index}
              className="category-pill"
              onClick={() => {
                setSearchQuery(""); // Optional: clear text search
                onCategorySelect(item); // Trigger category selection
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
};


export default HeroSection;
