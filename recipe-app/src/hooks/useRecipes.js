import { useState, useEffect, useCallback } from "react";
import { searchRecipes } from "../services/api";

export function useRecipes(initialQuery = "pizza") {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    cuisine: "",
    diet: "",
    type: "",
    maxReadyTime: "",
    sort: "",
  });
  const [pagination, setPagination] = useState({
    offset: 0,
    number: 10,
    totalResults: 0,
  });

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await searchRecipes({
      query,
      ...filters,
      offset: pagination.offset,
      number: pagination.number,
    });

    if (apiError) {
      setError(apiError);
      setRecipes([]);
      setLoading(false);
      return;
    }

    if (data) {
      setRecipes(data.results || []);
      setPagination((prev) => ({
        ...prev,
        totalResults: data.totalResults || 0,
      }));
    }

    setLoading(false);
  }, [query, filters, pagination.offset, pagination.number]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const updateQuery = useCallback((newQuery) => {
    setQuery(newQuery);
    setPagination((prev) => ({ ...prev, offset: 0 }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, offset: 0 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      cuisine: "",
      diet: "",
      type: "",
      maxReadyTime: "",
      sort: "",
    });
    setPagination((prev) => ({ ...prev, offset: 0 }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + prev.number,
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(0, prev.offset - prev.number),
    }));
  }, []);

  const goToPage = useCallback((page) => {
    setPagination((prev) => ({
      ...prev,
      offset: (page - 1) * prev.number,
    }));
  }, []);

  return {
    recipes,
    loading,
    error,
    query,
    filters,
    pagination,
    updateQuery,
    updateFilters,
    resetFilters,
    nextPage,
    prevPage,
    goToPage,
    refetch: fetchRecipes,
  };
}

