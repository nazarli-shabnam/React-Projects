import { useEffect } from "react";
import { useState } from "react";
export default function FoodDetails({foodId}){
    const [food,setFood]= useState({})
    const URL= `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY="e9f14b6dedc54e7d9d1d92380399152b"
useEffect(()=>{
    async function fetchFood(){
       const res= await fetch(`${URL}?apiKey=${API_KEY}`)
      const data= await res.json()
      console.log(data)
      setFood(data)
    }
    fetchFood()
},[foodId])
    return <div>Food Detail {foodId}
    {food.title}
    <img src={food.image} alt={food.title} />
    </div>
}