import { useState } from "react";
import { RecipeProvider } from "./contexts/RecipeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Search from "./components/Search";
import Filters from "./components/Filters";
import FoodList from "./components/FoodList";
import Pagination from "./components/Pagination";
import Nav from "./components/Nav";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";
import { useRecipes } from "./hooks/useRecipes";
import "./App.css";

function AppContent() {
  const [foodId, setFoodId] = useState(null);
  const {
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
  } = useRecipes("pizza");

  const currentPage = Math.floor(pagination.offset / pagination.number) + 1;
  const totalPages = Math.ceil(pagination.totalResults / pagination.number);

  return (
    <div>
      <Nav />
      <ErrorBoundary>
        <Search onQueryChange={updateQuery} />
        <Container>
          <InnerContainer>
            <Filters
              filters={filters}
              onFilterChange={updateFilters}
              onReset={resetFilters}
            />
            {error && (
              <div style={{ padding: "20px", background: "#ffebee", borderRadius: "8px", marginBottom: "20px" }}>
                <strong>Error:</strong> {error}
              </div>
            )}
            <FoodList
              foodData={recipes}
              setFoodId={setFoodId}
              loading={loading}
            />
            {!loading && recipes.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
                totalResults={pagination.totalResults}
                resultsPerPage={pagination.number}
              />
            )}
          </InnerContainer>
          <InnerContainer>
            <ErrorBoundary>
              <FoodDetails foodId={foodId} />
            </ErrorBoundary>
          </InnerContainer>
        </Container>
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <RecipeProvider>
      <AppContent />
    </RecipeProvider>
  );
}

export default App;
