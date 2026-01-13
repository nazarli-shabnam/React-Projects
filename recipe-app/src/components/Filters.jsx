import { useState } from "react";
import styles from "./Filters.module.css";

const CUISINES = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const DIETS = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Whole30",
];

const MEAL_TYPES = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];

const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "healthiness", label: "Healthiness" },
  { value: "price", label: "Price" },
  { value: "time", label: "Time" },
  { value: "random", label: "Random" },
];

export default function Filters({ filters, onFilterChange, onReset }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle filters"
          aria-expanded={isOpen}
        >
          🔽 Filters {isOpen ? "▲" : "▼"}
        </button>
        {Object.values(filters).some(Boolean) && (
          <button
            className={styles.resetButton}
            onClick={onReset}
            aria-label="Reset filters"
          >
            Reset
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.filtersContent}>
          <div className={styles.filterGroup}>
            <label htmlFor="cuisine">Cuisine</label>
            <select
              id="cuisine"
              value={filters.cuisine}
              onChange={(e) => onFilterChange({ cuisine: e.target.value })}
              className={styles.select}
            >
              <option value="">All Cuisines</option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="diet">Diet</label>
            <select
              id="diet"
              value={filters.diet}
              onChange={(e) => onFilterChange({ diet: e.target.value })}
              className={styles.select}
            >
              <option value="">All Diets</option>
              {DIETS.map((diet) => (
                <option key={diet} value={diet.toLowerCase().replace(" ", "-")}>
                  {diet}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="type">Meal Type</label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => onFilterChange({ type: e.target.value })}
              className={styles.select}
            >
              <option value="">All Types</option>
              {MEAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="maxReadyTime">Max Ready Time (minutes)</label>
            <input
              id="maxReadyTime"
              type="number"
              min="0"
              max="300"
              value={filters.maxReadyTime}
              onChange={(e) =>
                onFilterChange({ maxReadyTime: e.target.value || "" })
              }
              className={styles.numberInput}
              placeholder="Any"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className={styles.select}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

