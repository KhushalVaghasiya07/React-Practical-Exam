import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./RecipeDetail.css";

import { FaUtensils } from "react-icons/fa";
import { GiSaltShaker } from "react-icons/gi";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.log("No such recipe!");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div className="loading">Loading recipe...</div>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-flex">
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>

        <div className="recipe-info">
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="category-badge">{recipe.category}</p>


          <p className="description">{recipe.description}</p>

          <div className="ingredients-wrapper">
            <h3><GiSaltShaker /> Ingredients</h3>
            <div className="ingredient-chip-container">
              {recipe.ingredients?.split(",").map((ing, i) => (
                <span key={i} className="ingredient-chip">
                  {ing.trim()}
                </span>
              ))}
            </div>
          </div>


          <h3 className="instruction-heading"><FaUtensils /> Instructions</h3>
          <ol className="instructions-list">
            {recipe.instructions
              ?.split(/[\r\n]+|\. +/) // Handles newlines or ". "
              .filter(step => step.trim()) // Clean empty entries
              .map((step, i) => {
                // Remove leading numbers like "1.", "2 " etc
                const cleanStep = step.replace(/^\d+\.?\s*/, "");
                return (
                  <li key={i} className="instruction-step d-flex align-items-center">
                    <span className="step-number">{i + 1}</span>
                    <p>{cleanStep}</p>
                  </li>
                );
              })}
          </ol>



        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
