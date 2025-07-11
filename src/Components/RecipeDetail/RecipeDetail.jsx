import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./RecipeDetail.css";
import {
  FaUtensils,
  FaClock,
  FaUserFriends,
  FaHeart,
  FaShareAlt,
  FaRegClock,
  FaChartLine,
  FaLeaf,
  FaFire
} from "react-icons/fa";
import {
  GiSaltShaker,
  GiCook,
  GiMeal,
  GiSpoon,
  GiKnifeFork
} from "react-icons/gi";
import { IoMdTime, IoMdStar, IoMdStarOutline } from "react-icons/io";
import { BiDish } from "react-icons/bi";
import { RiRestaurantLine } from "react-icons/ri";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchRecipe();
  }, [id]);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  if (!recipe) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      {/* Image Only Section */}
      <div className="recipe-image-container">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-image"
          onError={(e) => {
            e.target.src = '/default-recipe.jpg';
            e.target.className = 'recipe-image default-image';
          }}
        />
        <div className="image-tags">
          <span className="recipe-category">{recipe.category}</span>
          {recipe.cuisine && <span className="recipe-cuisine">{recipe.cuisine}</span>}
        </div>
      </div>

      {/* Content Below Image */}
      <div className="recipe-content-below">
        {/* Title and Actions */}
        <div className="recipe-header">
          <h1 className="recipe-title">{recipe.title}</h1>

          <div className="recipe-actions">
            <button
              className={`save-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              <FaHeart className="action-icon" />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="share-btn">
              <FaShareAlt className="action-icon" />
              Share
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="recipe-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star-icon"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              >
                {star <= (hoverRating || rating) ? (
                  <IoMdStar className="filled" />
                ) : (
                  <IoMdStarOutline className="outline" />
                )}
              </span>
            ))}
          </div>
          <span className="rating-text">{rating}.0 ({Math.floor(Math.random() * 100) + 20} reviews)</span>
        </div>

        {/* Description */}
        <p className="recipe-description">{recipe.description}</p>

        {/* Meta Information */}
        <div className="recipe-meta">
          <div className="meta-item">
            <FaRegClock className="meta-icon" />
            <div>
              <span className="meta-label">Prep Time</span>
              <span className="meta-value">{recipe.prepTime || '25 mins'}</span>
            </div>
          </div>
          <div className="meta-item">
            <GiKnifeFork className="meta-icon" />
            <div>
              <span className="meta-label">Cook Time</span>
              <span className="meta-value">{recipe.cookTime || '35 mins'}</span>
            </div>
          </div>
          <div className="meta-item">
            <FaUserFriends className="meta-icon" />
            <div>
              <span className="meta-label">Servings</span>
              <span className="meta-value">{recipe.serves || '4'}</span>
            </div>
          </div>
          <div className="meta-item">
            <GiCook className="meta-icon" />
            <div>
              <span className="meta-label">Difficulty</span>
              <span className="meta-value">{recipe.difficulty || 'Medium'}</span>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="recipe-content-columns">
          {/* Ingredients Column */}
          <section className="ingredients-column">
            <div className="section-header">
              <GiSaltShaker className="section-icon" />
              <h2>Ingredients</h2>
              <span className="serving-size">{recipe.serves || '4'} servings</span>
            </div>
            <ul className="ingredients-list">
              {recipe.ingredients?.split(",").map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-checkbox"></span>
                  <span className="ingredient-text">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>

            {/* Nutrition Facts */}
            <div className="nutrition-section">
              <div className="section-header">
                <FaChartLine className="section-icon" />
                <h2>Nutrition Facts</h2>
              </div>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <FaFire className="nutrition-icon" />
                  <span className="nutrition-value">320</span>
                  <span className="nutrition-label">Calories</span>
                </div>
                <div className="nutrition-item">
                  <GiSpoon className="nutrition-icon" />
                  <span className="nutrition-value">12g</span>
                  <span className="nutrition-label">Fat</span>
                </div>
                <div className="nutrition-item">
                  <FaLeaf className="nutrition-icon" />
                  <span className="nutrition-value">24g</span>
                  <span className="nutrition-label">Carbs</span>
                </div>
                <div className="nutrition-item">
                  <GiMeal className="nutrition-icon" />
                  <span className="nutrition-value">18g</span>
                  <span className="nutrition-label">Protein</span>
                </div>
              </div>
            </div>
          </section>

          {/* Instructions Column */}
          <section className="instructions-column">
            <div className="section-header">
              <FaUtensils className="section-icon" />
              <h2>Instructions</h2>
              <span className="total-time">
                <IoMdTime className="time-icon" />
                Total: {recipe.totalTime || '60 mins'}
              </span>
            </div>
            <div className="steps-container">
              {recipe.instructions
                ?.split(/[\r\n]+|\. +/)
                .filter(step => step.trim())
                .map((step, index) => {
                  const cleanStep = step.replace(/^\d+\.?\s*/, "");
                  return (
                    <div key={index} className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-text">
                        <p>{cleanStep}</p>
                        {index % 2 === 0 && index !== 0 && (
                          <div className="step-tip">
                            <span className="tip-label">Chef's Tip:</span>
                            {["Use fresh ingredients for best results",
                              "Don't overcook the vegetables",
                              "Let it rest for 5 minutes before serving"][Math.floor(Math.random() * 3)]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Additional Info */}
            {recipe.notes && (
              <div className="notes-section">
                <div className="section-header">
                  <BiDish className="section-icon" />
                  <h2>Chef's Notes</h2>
                </div>
                <div className="notes-content">
                  <p className="notes-text">{recipe.notes}</p>
                  <div className="chef-signature">
                    <img src="/chef-icon.png" alt="Chef" className="chef-icon" />
                    <span className="chef-name">Chef {recipe.author || 'Anonymous'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags Section */}
            <div className="tags-section">
              <h3 className="tags-title">Recipe Tags</h3>
              <div className="tags-container">
                <span className="recipe-tag">Dinner</span>
                <span className="recipe-tag">Healthy</span>
                <span className="recipe-tag">Quick Meal</span>
                <span className="recipe-tag">Family Friendly</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;