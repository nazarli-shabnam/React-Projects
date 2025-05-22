import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
function App() {
  const [foodData, setFoodData]=useState([])
  const [food.Id,setFoodId]=useState()
  return <div>
    <Nav/>
    <Search foodData={foodData} setFoodData={setFoodData}/>
    <Container>
      <InnerContainer>
   <FoodList setFoodId={setFoodId} foodData={foodData}/>
      </InnerContainer>
      <InnerContainer>
<FoodDetail foodId={foodId}/>   
   </InnerContainer>
    </Container>
  </div>;
}

export default App;
