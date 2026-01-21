import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [viewedRecipes, setViewedRecipes] = useState([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("recipeApp_favorites");
      const savedRecentSearches = localStorage.getItem(
        "recipeApp_recentSearches"
      );
      const savedViewedRecipes = localStorage.getItem(
        "recipeApp_viewedRecipes"
      );

      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error("Failed to parse favorites", e);
          localStorage.removeItem("recipeApp_favorites");
        }
      }

      if (savedRecentSearches) {
        try {
          setRecentSearches(JSON.parse(savedRecentSearches));
        } catch (e) {
          console.error("Failed to parse recent searches", e);
          localStorage.removeItem("recipeApp_recentSearches");
        }
      }

      if (savedViewedRecipes) {
        try {
          setViewedRecipes(JSON.parse(savedViewedRecipes));
        } catch (e) {
          console.error("Failed to parse viewed recipes", e);
          localStorage.removeItem("recipeApp_viewedRecipes");
        }
      }
    } catch (e) {
      console.error("localStorage is not available or access denied", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (favorites.length > 0) {
        localStorage.setItem("recipeApp_favorites", JSON.stringify(favorites));
      } else {
        localStorage.removeItem("recipeApp_favorites");
      }
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.error("localStorage quota exceeded. Cannot save favorites.");
      } else {
        console.error("Failed to save favorites to localStorage", e);
      }
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (recentSearches.length > 0) {
        localStorage.setItem(
          "recipeApp_recentSearches",
          JSON.stringify(recentSearches.slice(0, 10))
        );
      } else {
        localStorage.removeItem("recipeApp_recentSearches");
      }
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.error(
          "localStorage quota exceeded. Cannot save recent searches."
        );
      } else {
        console.error("Failed to save recent searches to localStorage", e);
      }
    }
  }, [recentSearches]);

  useEffect(() => {
    try {
      if (viewedRecipes.length > 0) {
        localStorage.setItem(
          "recipeApp_viewedRecipes",
          JSON.stringify(viewedRecipes.slice(0, 20))
        );
      } else {
        localStorage.removeItem("recipeApp_viewedRecipes");
      }
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.error(
          "localStorage quota exceeded. Cannot save viewed recipes."
        );
      } else {
        console.error("Failed to save viewed recipes to localStorage", e);
      }
    }
  }, [viewedRecipes]);

  const addFavorite = useCallback((recipe) => {
    setFavorites((prev) => {
      if (prev.find((r) => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId) => {
    setFavorites((prev) => prev.filter((r) => r.id !== recipeId));
  }, []);

  const toggleFavorite = useCallback(
    (recipe) => {
      const isFavorite = favorites.find((r) => r.id === recipe.id);
      if (isFavorite) {
        removeFavorite(recipe.id);
      } else {
        addFavorite(recipe);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (recipeId) => {
      return favorites.some((r) => r.id === recipeId);
    },
    [favorites]
  );

  const addRecentSearch = useCallback((query) => {
    if (!query || query.trim() === "") return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== query);
      return [query, ...filtered].slice(0, 10);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("recipeApp_recentSearches");
    } catch (e) {
      console.error("Failed to clear recent searches from localStorage", e);
    }
  }, []);

  const addViewedRecipe = useCallback((recipe) => {
    setViewedRecipes((prev) => {
      const filtered = prev.filter((r) => r.id !== recipe.id);
      return [recipe, ...filtered].slice(0, 20);
    });
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        recentSearches,
        viewedRecipes,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        addRecentSearch,
        clearRecentSearches,
        addViewedRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within RecipeProvider");
  }
  return context;
}
