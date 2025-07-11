import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import { BsClock, BsHeartFill } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ searchQuery = "", selectedCategory = "" }) => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const fetchedRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error("❌ Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const toggleLike = (id) => {
    setLikedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const titleMatch = recipe.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = recipe.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryFilterMatch = selectedCategory
      ? recipe.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return (titleMatch || categoryMatch) && categoryFilterMatch;
  });

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="recipe-wrapper">
      {filteredRecipes.length === 0 ? (
        <p className="no-recipe-msg">No recipes found</p>
      ) : (
        <>
          {currentRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <div className="card-img-wrapper" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                <img src={recipe.imageUrl} alt={recipe.title} />
                <span className="rating-badge">⭐ {recipe.rating || "4.5"}</span>
                <div className="top-icons">
                  <div
                    className={`heart-icon ${likedRecipes[recipe.id] ? "liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(recipe.id);
                    }}
                  >
                    <BsHeartFill />
                  </div>
                </div>
              </div>

              <div className="card-content">
                <p className="category">{recipe.category}</p>
                <h5 className="title">{recipe.title}</h5>
                <div className="info-line">
                  <span><BsClock /> {recipe.cookTime || "45 min"}</span>
                  <span>{recipe.cuisineFlag || "🌎"} {recipe.cuisine || "Cuisine"}</span>
                  <span>🍴 Serves {recipe.servings || "2"}</span>
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default RecipeList;