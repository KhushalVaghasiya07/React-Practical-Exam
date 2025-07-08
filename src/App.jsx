import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Navbar/Navbar";
import AddRecipe from "./Components/Add Recipe Form/AddRecipeForm";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/Signup Page/Signup";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import MyRecipes from "./Components/MyRecipes/MyRecipes";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/edit-recipe/:id" element={<AddRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
