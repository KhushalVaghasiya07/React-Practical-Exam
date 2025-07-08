import React, { useState } from "react";
import "./AddRecipeForm.css";
import { useStore } from "../../Services/store";
import { addRecipe } from "../../Services/Actions/recipeActions";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    instructions: "",
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  const { state, dispatch } = useStore();
  const user = state.auth.user;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredientsList([...ingredientsList, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("⚠️ Please login to submit a recipe.");
      return;
    }

    try {
      await addRecipe(
        { ...formData, ingredients: ingredientsList.join(", ") },
        user
      )(dispatch);

      alert("✅ Recipe submitted successfully!");

      // Reset all fields
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        instructions: "",
      });
      setIngredientsList([]);
      setIngredientInput("");

      navigate("/");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-banner">
        <h1>Add Recipe</h1>
        <p>
          Share your delicious ideas with the world. Upload your recipe and
          inspire fellow foodies!
        </p>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ Ingredients Section with Add/Remove */}
        <div className="form-group">
          <label>Ingredients</label>
          <div className="ingredient-input-group">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="e.g. 1 tsp salt"
            />
            <button type="button" onClick={handleAddIngredient}>
              Add
            </button>
          </div>
          <ul className="ingredient-list">
            {ingredientsList.map((item, i) => (
              <li key={i}>
                {item}
                <button type="button" onClick={() => handleRemoveIngredient(i)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <button className="submit-btn" type="submit">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
