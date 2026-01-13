import { memo } from "react";
import FoodItem from "./FoodItem";
import { RecipeCardSkeleton } from "./LoadingSkeleton";
import styles from "./FoodList.module.css";

const FoodList = memo(function FoodList({ foodData, setFoodId, loading }) {
  if (loading) {
    return (
      <div className={styles.foodList}>
        {[...Array(6)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!foodData || foodData.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <h2>🔍 No recipes found</h2>
          <p>Try adjusting your search or filters to find more recipes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.foodList}>
      {foodData.map((food) => (
        <FoodItem setFoodId={setFoodId} key={food.id} food={food} />
      ))}
    </div>
  );
});

FoodList.displayName = "FoodList";

export default FoodList;
