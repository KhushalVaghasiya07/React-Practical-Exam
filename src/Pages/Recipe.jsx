import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 16;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "recipes"));
        const all = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(all);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchAllRecipes();
  }, []);

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="all-recipes-page">
      <div className="hero">
        <h2 className="hero-subtitle">Recipes for Every Taste</h2>
        <h1 className="hero-title">Recipes</h1>
        <p className="hero-desc">
          Browse a wide variety of recipes designed for every taste and skill level. From comforting
          classics to creative culinary delights, find the perfect dish to inspire your next meal!
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="recipe-grid">
        {currentRecipes.map((recipe) => (
          <div
            className="recipe-card"
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <div className="recipe-img-wrapper">
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img" />
            </div>
            <div className="recipe-content">
              <p className="recipe-category">{recipe.category}</p>
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-time">⏱ {recipe.cookTime || "45 min"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;