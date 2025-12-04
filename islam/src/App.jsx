import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, Button } from "@mui/material";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import MyReflectionsPage from "./components/My-Reflections-Page";
import HadithCollectionExplorer from "./components/Hadith-Collection-Explorer";
import IslamiBilgiPlatformu from "./components/İslami-Bilgi-Platformu";
import AccountRegistrationPage from "./components/Account-Registration-Page";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <CssBaseline />
        <Router>
          <div className="app">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
              aria-label="Create free account"
            >
              Create Free Account
            </Button>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <IslamiBilgiPlatformu />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/reflections"
                element={
                  <ErrorBoundary>
                    <MyReflectionsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/hadith"
                element={
                  <ErrorBoundary>
                    <HadithCollectionExplorer />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/register"
                element={
                  <ErrorBoundary>
                    <AccountRegistrationPage />
                  </ErrorBoundary>
                }
              />
            </Routes>
            <ScrollToTop />
          </div>
        </Router>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;
