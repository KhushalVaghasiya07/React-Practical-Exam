import React, { useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import RecipeList from "../../Components/RecipeList/RecipeList";
import Cuisines from "../../Components/Cuisines/Cuisines";
import Journal from "../../Components/Journal/Journal";

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
