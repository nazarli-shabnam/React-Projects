import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, Button } from "@mui/material";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import MyReflectionsPage from "./components/My-Reflections-Page";
import HadithCollectionExplorer from "./components/Hadith-Collection-Explorer";
import IslamiBilgiPlatformu from "./components/İslami-Bilgi-Platformu";
import AccountRegistrationPage from "./components/Account-Registration-Page";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
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
          >
            Create Free Account
          </Button>
          <Routes>
            <Route path="/" element={<IslamiBilgiPlatformu />} />
            <Route path="/reflections" element={<MyReflectionsPage />} />
            <Route path="/hadith" element={<HadithCollectionExplorer />} />
            <Route path="/register" element={<AccountRegistrationPage />} />
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
