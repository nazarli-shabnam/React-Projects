import { useEffect } from "react";
import { useState } from "react";
export default function FoodDetails({ foodId }) {
    const [isLoading, setIsLoading] = useState(true);
  const [food, setFood] = useState({});
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "e9f14b6dedc54e7d9d1d92380399152b";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
   return (
    <div>
      <div>
        <h1>{food.title}</h1>

        <img src={food.image} alt={food.title} />

        <div>
          <span>
            <strong>⏰ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            {food.servings} <strong>👪 Servings</strong>
          </span>
          <span>
            {food.vegetarian ? "🍲 Vegetarian" : "🍖 Not Vegetarian"}
          </span>
          <span>
            {food.vegan ? "🌱 Vegan" : "🍖 Not Vegan"}
          </span>
        </div>

        <div>
          💲<span>{(food.pricePerServing / 100).toFixed(2)} Per serving</span>
        </div>
      </div>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Ingredients</h2>
            <ul>
              {food.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}