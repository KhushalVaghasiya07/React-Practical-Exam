import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddRecipe from "./Components/Add Recipe Form/AddRecipeForm";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/LoginPage/Login";
import MyRecipes from "./Components/MyRecipes/MyRecipes";
import Header from "./Components/Navbar/Navbar";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import Signup from "./Components/Signup Page/Signup";
import Home from "../src/Pages/Home";
import { useStore } from "./Services/store";
import AllRecipes from "./Pages/Recipe";

function App() {
  const { state } = useStore();
  const { user, loading } = state.auth;

  if (loading && !user) {
    return (
      <div className="app-loader">
        <div className="spinner" />
        <p>Loading your kitchen...</p>
      </div>
    );
  }


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allRecipes" element={<AllRecipes />} />

        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add-recipe"
          element={user ? <AddRecipe /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-recipe/:id"
          element={user ? <AddRecipe /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-recipes"
          element={user ? <MyRecipes /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
