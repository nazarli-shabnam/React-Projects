import { useEffect } from "react";
import { useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";
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
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeTitle}>{food.title}</h1>

        <img className={styles.recipeImage} src={food.image} alt={food.title} />

        <div className={styles.recipeInfo}>
          <span>
            <strong>⏰ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            {food.servings} <strong>👪 Servings</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🍲 Vegetarian" : "🍖 Not Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🌱 Vegan" : "🍖 Not Vegan"}</strong>{" "}
          </span>
        </div>

        <div>
          💲
          <span>
            <strong>
              {(food.pricePerServing / 100).toFixed(2)} Per serving
            </strong>
          </span>
        </div>
      </div>
      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />

      <h2>Instructions</h2>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="ingredients">
            <ul>
              {food.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
