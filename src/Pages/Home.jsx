import { useState } from "react";
import Cuisines from  "../Components/Cuisines/Cuisines";
import HeroSection from "../Components/HeroSection/HeroSection";
import Journal from "../Components/Journal/Journal";
import RecipeList from "../Components/RecipeList/RecipeList";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCategorySelect={(category) => setSelectedCategory(category)}
      />
      <RecipeList searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <Cuisines />
      <Journal />
    </>
  );
}

export default Home;
