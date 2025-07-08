import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Services/store";
import { GiChefToque } from "react-icons/gi";
import { BiDish } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";

const MyRecipes = () => {
  const { state } = useStore();
  const user = state.auth.user;
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const allRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const myRecipes = allRecipes.filter((r) => r.userId === user?.uid);
        setRecipes(myRecipes);
      } catch (error) {
        console.error("Failed to fetch user recipes:", error);
      }
    };

    if (user) fetchUserRecipes();
  }, [user]);

  const handleEdit = (e, recipeId) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleDelete = async (e, recipeId) => {
    e.stopPropagation();
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "recipes", recipeId));
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div
      className="recipe-wrapper"
      style={{
        maxWidth: "1320px",
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        fontFamily: "'Fira Sans', sans-serif",
        padding: "20px",
      }}
    >
      {recipes.length === 0 ? (
        <p
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            fontSize: "20px",
            color: "#666",
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <BiDish size={24} /> You haven’t added any recipes yet
        </p>
      ) : (
        <>
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              fontSize: "18px",
              color: "#444",
              marginBottom: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <GiChefToque size={22} />
            Recipes added by{" "}
            <span style={{ color: "#e53935" }}>{user?.email}</span>
          </div>

          {currentRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector(".hover-actions").style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".hover-actions").style.opacity = 0;
              }}
            >
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <div style={{ padding: "16px", textAlign: "left", flexGrow: 1 }}>
                <p
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#e53935",
                    backgroundColor: "#ffebee",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {recipe.category}
                </p>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "10px 0 12px",
                    color: "#222",
                    lineHeight: "1.4",
                  }}
                >
                  {recipe.title}
                </h5>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    fontSize: "14px",
                    color: "#444",
                    alignItems: "center",
                  }}
                >
                  <span>⏱ {recipe.cookTime || "45 min"}</span>
                </div>
              </div>

              {/* Hover Action Buttons */}
              <div
                className="hover-actions"
                style={{
                  opacity: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 16px 16px",
                  borderTop: "1px solid #eee",
                  gap: "10px",
                  transition: "opacity 0.3s ease",
                }}
              >
                <button
                  onClick={(e) => handleEdit(e, recipe.id)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    color: "#e53935",
                    border: "2px solid #e53935",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#e53935";
                    e.target.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#e53935";
                  }}
                >
                  <BsPencil /> Edit
                </button>

                <button
                  onClick={(e) => handleDelete(e, recipe.id)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    color: "#c62828",
                    border: "2px solid #c62828",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#c62828";
                    e.target.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#c62828";
                  }}
                >
                  <BsTrash /> Delete
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "40px",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: "8px 16px",
                  border: "2px solid #e04848",
                  backgroundColor: currentPage === i + 1 ? "#e04848" : "transparent",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                  fontWeight: "600",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecipes;
