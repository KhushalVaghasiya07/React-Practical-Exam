import Cuisines from "../../Components/Cuisines/Cuisines"
import HeroSection from "../../Components/HeroSection/HeroSection"
import Journal from "../../Components/Journal/Journal"
import RecipeList from "../../Components/RecipeList/RecipeList"




function Home() {

  return (
    <>
      <HeroSection />
      <RecipeList />
      <Cuisines />
      <Journal />
    </>
  )
}

export default Home;
