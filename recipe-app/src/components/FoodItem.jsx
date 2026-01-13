import { memo } from "react";
import { useRecipeContext } from "../contexts/RecipeContext";
import styles from "./fooditem.module.css";

const FoodItem = memo(function FoodItem({ food, setFoodId }) {
  const { isFavorite, toggleFavorite } = useRecipeContext();


  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.itemImage}
          src={food.image}
          alt={food.title}
          loading="lazy"
        />
        <button
          className={`${styles.favoriteButton} ${
            isFavorite(food.id) ? styles.favorited : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite(food.id) ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite(food.id) ? "❤️" : "🤍"}
        </button>
      </div>
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
        {food.readyInMinutes && (
          <p className={styles.itemTime}>⏰ {food.readyInMinutes} min</p>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleViewRecipe}
          className={styles.itemButton}
          aria-label={`View recipe for ${food.title}`}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
});

FoodItem.displayName = "FoodItem";

export default FoodItem;
