import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useRecipeContext } from "../contexts/RecipeContext";
import styles from "./search.module.css";

export default function Search({ onSearch, onQueryChange, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecipeContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.trim() !== "") {
      onQueryChange(debouncedQuery);
      if (onSearch) onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onQueryChange, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      addRecentSearch(query.trim());
      setShowSuggestions(false);
      if (onSearch) onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    addRecentSearch(suggestion);
    setShowSuggestions(false);
    if (onSearch) onSearch(suggestion);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for recipes..."
            aria-label="Search recipes"
          />
          <button type="submit" className={styles.searchButton} aria-label="Search">
            🔍
          </button>
        </div>

        {showSuggestions && recentSearches.length > 0 && (
          <div className={styles.suggestions}>
            <div className={styles.suggestionsHeader}>
              <span>Recent Searches</span>
              <button
                type="button"
                onClick={handleClearRecent}
                className={styles.clearButton}
                aria-label="Clear recent searches"
              >
                Clear
              </button>
            </div>
            <ul className={styles.suggestionsList}>
              {recentSearches.map((search, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(search)}
                    className={styles.suggestionItem}
                  >
                    {search}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
