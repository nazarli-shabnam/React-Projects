import { useState, useEffect, useCallback } from "react";
import { getRecipeInformation, getSimilarRecipes } from "../services/api";

export function useRecipeDetails(recipeId) {
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipeDetails = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const { data, error: apiError } = await getRecipeInformation(id);

    if (apiError) {
      setError(apiError);
      setRecipe(null);
      setLoading(false);
      return;
    }

    if (data) {
      setRecipe(data);
      
      // Fetch similar recipes
      const { data: similarData } = await getSimilarRecipes(id);
      if (similarData) {
        setSimilarRecipes(similarData);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecipeDetails(recipeId);
  }, [recipeId, fetchRecipeDetails]);

  return {
    recipe,
    similarRecipes,
    loading,
    error,
    refetch: () => fetchRecipeDetails(recipeId),
  };
}

