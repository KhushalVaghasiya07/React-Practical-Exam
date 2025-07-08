import React, { useEffect, useState } from "react";
import "./AddRecipeForm.css";
import { useStore } from "../../Services/store";
import { addRecipe } from "../../Services/Actions/recipeActions";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AddRecipe = () => {
  // Correctly get the param
  const { id } = useParams();  // Use `id` if your route is "/edit-recipe/:id"
  const isEditMode = Boolean(id);

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

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!isEditMode) return;

      try {
        const recipeRef = doc(db, "recipes", id);
        const docSnap = await getDoc(recipeRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            category: data.category || "",
            instructions: data.instructions || "",
          });
          setIngredientsList(
            data.ingredients
              ? data.ingredients.split(",").map(item => item.trim())
              : []
          );
        } else {
          alert("❌ Recipe not found!");
          navigate("/my-recipes");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id, isEditMode, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredientsList([...ingredientsList, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = index => {
    setIngredientsList(list => list.filter((_, i) => i !== index));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) return alert("⚠️ Please log in.");

    const finalData = {
      ...formData,
      ingredients: ingredientsList.join(", "),
    };

    try {
      if (isEditMode) {
        await updateDoc(doc(db, "recipes", id), finalData);
        alert("✅ Recipe updated!");
      } else {
        await addRecipe(finalData, user)(dispatch);
        alert("✅ Recipe added!");
      }
      navigate("/my-recipes");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-banner">
        <h1>{isEditMode ? "Edit Recipe" : "Add Recipe"}</h1>
        <p>
          {isEditMode
            ? "Update your recipe details!"
            : "Share your delicious ideas with the world!"}
        </p>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
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
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <div className="ingredient-input-group">
            <input
              value={ingredientInput}
              onChange={e => setIngredientInput(e.target.value)}
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
          />
        </div>

        <button className="submit-btn" type="submit">
          {isEditMode ? "Update Recipe" : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
