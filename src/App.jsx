import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Navbar/Navbar";
import AddRecipe from "./Components/Add Recipe Form/AddRecipeForm";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/Signup Page/Signup";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import MyRecipes from "./Components/MyRecipes/MyRecipes";
import { useStore } from "./Services/store";

function App() {
  const { state } = useStore();
  const user = state.auth.user;

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
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
