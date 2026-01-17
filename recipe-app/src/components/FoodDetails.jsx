import { useState, useEffect, useMemo } from "react";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
import { useRecipeContext } from "../contexts/RecipeContext";
import { RecipeDetailsSkeleton } from "./LoadingSkeleton";
import ItemList from "./ItemList";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const { recipe, similarRecipes, loading, error } = useRecipeDetails(foodId);
  const { addViewedRecipe, isFavorite, toggleFavorite } = useRecipeContext();
  const [servings, setServings] = useState(1);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Add to viewed recipes when recipe loads
  useEffect(() => {
    if (recipe) {
      addViewedRecipe(recipe);
      setServings(recipe.servings || 1);
    }
  }, [recipe, addViewedRecipe]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prev) => prev - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes((prev) => prev - 1);
          setTimerSeconds(59);
        } else {
          setIsTimerRunning(false);
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Timer finished!");
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  const scaledIngredients = useMemo(() => {
    if (!recipe || !recipe.extendedIngredients) return [];
    const scaleFactor = servings / (recipe.servings || 1);
    return recipe.extendedIngredients.map((ingredient) => ({
      ...ingredient,
      amount: (ingredient.amount * scaleFactor).toFixed(2),
    }));
  }, [recipe, servings]);

  const handleStartTimer = (minutes) => {
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  const formatTime = (minutes, seconds) => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (loading) {
    return <RecipeDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>⚠️ Error loading recipe</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.emptyContainer}>
        <p>Select a recipe to view details</p>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.recipeCard}>
        <div className={styles.recipeHeader}>
          <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          <button
            className={`${styles.favoriteButton} ${
              isFavorite(recipe.id) ? styles.favorited : ""
            }`}
            onClick={() => toggleFavorite(recipe)}
            aria-label={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(recipe.id) ? "❤️" : "🤍"}
          </button>
        </div>

        {recipe.image && (
          <img
            className={styles.recipeImage}
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
          />
        )}

        <div className={styles.recipeInfo}>
          <span className={styles.infoBadge}>
            <strong>⏰ {recipe.readyInMinutes} Minutes</strong>
          </span>
          <span className={styles.infoBadge}>
            <strong>👪 {recipe.servings} Servings</strong>
          </span>
          {recipe.vegetarian && (
            <span className={styles.infoBadge}>
              <strong>🍲 Vegetarian</strong>
            </span>
          )}
          {recipe.vegan && (
            <span className={styles.infoBadge}>
              <strong>🌱 Vegan</strong>
            </span>
          )}
          {recipe.glutenFree && (
            <span className={styles.infoBadge}>
              <strong>🌾 Gluten Free</strong>
            </span>
          )}
          {recipe.dairyFree && (
            <span className={styles.infoBadge}>
              <strong>🥛 Dairy Free</strong>
            </span>
          )}
        </div>

        {recipe.pricePerServing && (
          <div className={styles.priceInfo}>
            💲
            <span>
              <strong>${(recipe.pricePerServing / 100).toFixed(2)} Per serving</strong>
            </span>
          </div>
        )}

        {/* Nutrition Info */}
        {recipe.nutrition && (
          <div className={styles.nutritionSection}>
            <h3>Nutrition (per serving)</h3>
            <div className={styles.nutritionGrid}>
              {recipe.nutrition.nutrients
                .filter((nutrient) =>
                  ["Calories", "Protein", "Fat", "Carbohydrates", "Fiber", "Sugar"].includes(
                    nutrient.name
                  )
                )
                .map((nutrient) => (
                  <div key={nutrient.name} className={styles.nutritionItem}>
                    <span className={styles.nutritionLabel}>{nutrient.name}:</span>
                    <span className={styles.nutritionValue}>
                      {Math.round(nutrient.amount)} {nutrient.unit}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recipe Scaling */}
        <div className={styles.scalingSection}>
          <h3>Adjust Servings</h3>
          <div className={styles.scalingControls}>
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className={styles.scaleButton}
              aria-label="Decrease servings"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value > 0) {
                  setServings(value);
                } else if (e.target.value === "") {
                  setServings(1);
                }
              }}
              onBlur={(e) => {
                const value = parseInt(e.target.value, 10);
                if (isNaN(value) || value < 1) {
                  setServings(1);
                }
              }}
              className={styles.servingsInput}
            />
            <button
              onClick={() => setServings(servings + 1)}
              className={styles.scaleButton}
              aria-label="Increase servings"
            >
              +
            </button>
          </div>
        </div>

        {/* Cooking Timer */}
        <div className={styles.timerSection}>
          <h3>Cooking Timer</h3>
          <div className={styles.timerDisplay}>
            {formatTime(timerMinutes, timerSeconds)}
          </div>
          <div className={styles.timerControls}>
            <button
              onClick={() => handleStartTimer(5)}
              className={styles.timerButton}
            >
              5 min
            </button>
            <button
              onClick={() => handleStartTimer(10)}
              className={styles.timerButton}
            >
              10 min
            </button>
            <button
              onClick={() => handleStartTimer(15)}
              className={styles.timerButton}
            >
              15 min
            </button>
            <button
              onClick={() => handleStartTimer(recipe.readyInMinutes || 30)}
              className={styles.timerButton}
            >
              Recipe Time
            </button>
            {isTimerRunning ? (
              <button
                onClick={handleStopTimer}
                className={`${styles.timerButton} ${styles.stopButton}`}
              >
                Stop
              </button>
            ) : (
              <button
                onClick={handleResetTimer}
                className={`${styles.timerButton} ${styles.resetButton}`}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.ingredientsSection}>
        <h2>Ingredients ({servings} servings)</h2>
        <ItemList food={{ ...recipe, extendedIngredients: scaledIngredients }} isLoading={false} />
      </div>

      <div className={styles.instructionsSection}>
        <h2>Instructions</h2>
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          <ol className={styles.instructionsList}>
            {recipe.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index} className={styles.instructionStep}>
                <strong>Step {step.number}:</strong> {step.step}
                {step.equipment && step.equipment.length > 0 && (
                  <div className={styles.equipment}>
                    <strong>Equipment:</strong>{" "}
                    {step.equipment.map((eq) => eq.name).join(", ")}
                  </div>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.ingredients}>
            <ul>
              {recipe.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Similar Recipes */}
      {similarRecipes && similarRecipes.length > 0 && (
        <div className={styles.similarRecipes}>
          <h2>Similar Recipes</h2>
          <div className={styles.similarGrid}>
            {similarRecipes.slice(0, 3).map((similar) => (
              <div key={similar.id} className={styles.similarCard}>
                {similar.image && (
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className={styles.similarImage}
                  />
                )}
                <p className={styles.similarTitle}>{similar.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
