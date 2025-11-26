import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Button } from "@mui/material";
import { 
  ArrowBack, Add, Edit, Delete, Share, Bookmark, BookmarkBorder, 
  Search, FilterList, Public, Lock 
} from "@mui/icons-material";

import MyReflectionsPage from "./components/My-Reflections-Page";
import HadithCollectionExplorer from "./components/Hadith-Collection-Explorer";
import IslamiBilgiPlatformu from "./components/İslami-Bilgi-Platformu";
import AccountRegistrationPage from "./components/Account-Registration-Page";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    secondary: {
      main: "#047857",
      light: "#059669",
      dark: "#065F46",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
