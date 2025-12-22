import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  InputAdornment,
  Pagination,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import {
  ArrowBack,
  Search,
  Bookmark,
  BookmarkBorder,
  Share,
  VolumeUp,
  FilterList,
  Mosque,
  ViewModule,
  ViewList,
  Clear,
  Menu,
  DarkMode,
  LightMode,
  Home,
  MenuBook,
  EditNote,
} from "@mui/icons-material";
import { useThemeMode } from "../contexts/ThemeContext";

const sampleHadiths = [
  {
    id: "bukhari-1",
    collection: "Sahih Bukhari",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are but by intentions.",
    narrator: "Umar ibn Al-Khattab",
    authenticity: "Sahih",
    topics: ["Intention", "Faith"],
    reference: "Bukhari 1",
  },
  {
    id: "muslim-9",
    collection: "Sahih Muslim",
    arabic: "الدين النصيحة",
    translation: "The religion is sincere advice.",
    narrator: "Tamim Al-Dari",
    authenticity: "Sahih",
    topics: ["Community", "Character"],
    reference: "Muslim 55",
  },
  {
    id: "tirmidhi-780",
    collection: "Jami at-Tirmidhi",
    arabic: "لَا تُصِيبُ الْمَرْأَةُ",
    translation:
      "Whoever believes in Allah and the Last Day should speak good or remain silent.",
    narrator: "Abu Hurairah",
    authenticity: "Hasan",
    topics: ["Speech", "Character"],
    reference: "Tirmidhi 2618",
  },
  {
    id: "nawawi-40",
    collection: "40 Hadith Nawawi",
    arabic: "مَنْ صَمَتَ نَجَا",
    translation: "Whoever remains silent is saved.",
    narrator: "Abu Hurairah",
    authenticity: "Hasan",
    topics: ["Speech", "Wisdom"],
    reference: "Nawawi 15",
  },
];

const HadithCollectionExplorer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, toggleMode } = useThemeMode();

  // Load preferences from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(`hadith_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const saveToStorage = useCallback(
    (key, value) => {
      try {
        localStorage.setItem(`hadith_${key}`, JSON.stringify(value));
      } catch (error) {
        // Only log in development
        if (import.meta.env.DEV) {
          console.warn("Failed to save to localStorage:", error);
        }
        // Show user-friendly error message
        showSnackbar(
          "Failed to save preferences. Please check your browser settings.",
          "error"
        );
      }
    },
    [showSnackbar]
  );

  const [activeCollection, setActiveCollection] = useState(() =>
    loadFromStorage("collection", "all")
  );
  const [activeCategory, setActiveCategory] = useState(() =>
    loadFromStorage("category", "all")
  );
  const [viewMode, setViewMode] = useState(() =>
    loadFromStorage("viewMode", "grid")
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState(() =>
    loadFromStorage("bookmarks", [])
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [authenticityFilter, setAuthenticityFilter] = useState(() =>
    loadFromStorage("authenticity", "all")
  );
  const [narratorFilter, setNarratorFilter] = useState(() =>
    loadFromStorage("narrator", "all")
  );
  const [fontSize, setFontSize] = useState(() =>
    loadFromStorage("fontSize", "medium")
  );
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedHadithForShare, setSelectedHadithForShare] = useState(null);
  const [shareNote, setShareNote] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hadiths = sampleHadiths;

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = useCallback((hadithId) => {
    setSelectedHadithForShare(hadithId);
    setShowShareDialog(true);
    setShareNote("");
  }, []);

  const handleShareAction = useCallback(
    async (platform) => {
      const hadith = hadiths.find((h) => h.id === selectedHadithForShare);
      if (!hadith) return;

      const shareText = `${hadith.translation}\n\n${
        shareNote ? `${shareNote}\n\n` : ""
      }${hadith.reference}`;
      const shareUrl = `https://nurweb.com/hadith/${hadith.id}`;

      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}&url=${encodeURIComponent(shareUrl)}`
          );
          break;
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `${shareText}\n${shareUrl}`
            )}`
          );
          break;
        case "email":
          window.open(
            `mailto:?subject=Shared Hadith&body=${encodeURIComponent(
              `${shareText}\n${shareUrl}`
            )}`
          );
          break;
        case "copy":
          try {
            await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            showSnackbar("Link copied to clipboard!", "success");
          } catch (error) {
            // Only log in development
            if (import.meta.env.DEV) {
              console.warn(
                "Clipboard API failed, falling back to prompt:",
                error
              );
            }
            // Fallback to prompt
            const fallbackText = `${shareText}\n${shareUrl}`;
            window.prompt("Copy hadith (Ctrl+C to copy)", fallbackText);
            showSnackbar("Please copy the text manually", "info");
          }
          break;
        default:
          break;
      }
      setShowShareDialog(false);
    },
    [hadiths, selectedHadithForShare, shareNote, showSnackbar]
  );

  const fontSizeMap = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
    xlarge: "1.25rem",
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Save preferences to localStorage
  useEffect(() => {
    saveToStorage("collection", activeCollection);
  }, [activeCollection]);

  useEffect(() => {
    saveToStorage("category", activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    saveToStorage("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    saveToStorage("authenticity", authenticityFilter);
  }, [authenticityFilter]);

  useEffect(() => {
    saveToStorage("narrator", narratorFilter);
  }, [narratorFilter]);

  useEffect(() => {
    saveToStorage("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    saveToStorage("bookmarks", bookmarkedHadiths);
  }, [bookmarkedHadiths]);

  const toggleBookmark = useCallback((id) => {
    setBookmarkedHadiths((prev) => {
      const isBookmarked = prev.includes(id);
      const newBookmarks = isBookmarked
        ? prev.filter((hadithId) => hadithId !== id)
        : [...prev, id];
      setSnackbar({
        open: true,
        message: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        severity: "success",
      });
      return newBookmarks;
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setActiveCollection("all");
    setActiveCategory("all");
    setAuthenticityFilter("all");
    setNarratorFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
    setSnackbar({
      open: true,
      message: "Filters reset",
      severity: "info",
    });
  }, []);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const filteredHadiths = useMemo(
    () =>
      hadiths.filter((hadith) => {
        const matchesSearch =
          debouncedSearchQuery === "" ||
          hadith.translation
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          hadith.arabic.includes(debouncedSearchQuery) ||
          hadith.narrator
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase());
        const matchesCollection =
          activeCollection === "all" || hadith.collection === activeCollection;
        const matchesCategory =
          activeCategory === "all" ||
          hadith.topics.some(
            (topic) => topic.toLowerCase() === activeCategory.toLowerCase()
          );
        const matchesAuthenticity =
          authenticityFilter === "all" ||
          hadith.authenticity === authenticityFilter;
        const matchesNarrator =
          narratorFilter === "all" || hadith.narrator === narratorFilter;
        return (
          matchesSearch &&
          matchesCollection &&
          matchesCategory &&
          matchesAuthenticity &&
          matchesNarrator
        );
      }),
    [
      hadiths,
      debouncedSearchQuery,
      activeCollection,
      activeCategory,
      authenticityFilter,
      narratorFilter,
    ]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearchQuery,
    activeCollection,
    activeCategory,
    authenticityFilter,
    narratorFilter,
  ]);

  const collections = useMemo(
    () => [...new Set(hadiths.map((hadith) => hadith.collection))],
    [hadiths]
  );
  const topics = useMemo(
    () => [...new Set(hadiths.flatMap((hadith) => hadith.topics))],
    [hadiths]
  );
  const narrators = useMemo(
    () => [...new Set(hadiths.map((hadith) => hadith.narrator))],
    [hadiths]
  );
  const authenticityRatings = useMemo(
    () => [...new Set(hadiths.map((hadith) => hadith.authenticity))],
    [hadiths]
  );

  const itemsPerPage = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredHadiths.length / itemsPerPage)
  );
  const paginatedHadiths = filteredHadiths.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navigation Bar */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "background.paper", color: "text.primary" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            aria-label="Open navigation menu"
          >
            <Menu />
          </IconButton>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
          >
            <Mosque sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Nur Web
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/hadith" color="primary">
              Hadith
            </Button>
            <Button component={Link} to="/reflections" color="inherit">
              Reflections
            </Button>
          </Box>
          <IconButton
            onClick={toggleMode}
            sx={{ ml: 2 }}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/hadith"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText primary="Hadith" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/reflections"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemIcon>
                  <EditNote />
                </ListItemIcon>
                <ListItemText primary="Reflections" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            to="/"
            sx={{ mb: 2 }}
          >
            Back to Home
          </Button>
          <Typography variant="h3" component="h1" gutterBottom>
            Hadith Browser
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Search and explore authentic hadith collections from trusted sources
          </Typography>

          {/* Filter + Search section */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              mb: 3,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)"
              }`,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search hadith by text, narrator, or keywords..."
                  aria-label="Search hadith"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Collection</InputLabel>
                  <Select
                    value={activeCollection}
                    onChange={(e) => setActiveCollection(e.target.value)}
                    label="Collection"
                  >
                    <MenuItem value="all">All Collections</MenuItem>
                    {collections.map((collection) => (
                      <MenuItem key={collection} value={collection}>
                        {collection}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {topics.map((topic) => (
                      <MenuItem key={topic} value={topic}>
                        {topic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  fullWidth
                  aria-label="Toggle advanced filters"
                  aria-expanded={showAdvancedFilters}
                >
                  Advanced
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleResetFilters}
                  fullWidth
                  color="error"
                  aria-label="Reset all filters"
                >
                  Reset
                </Button>
              </Grid>
            </Grid>

            {showAdvancedFilters && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Authenticity</InputLabel>
                    <Select
                      value={authenticityFilter}
                      onChange={(e) => setAuthenticityFilter(e.target.value)}
                      label="Authenticity"
                    >
                      <MenuItem value="all">All</MenuItem>
                      {authenticityRatings.map((rating) => (
                        <MenuItem key={rating} value={rating}>
                          {rating}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Narrator</InputLabel>
                    <Select
                      value={narratorFilter}
                      onChange={(e) => setNarratorFilter(e.target.value)}
                      label="Narrator"
                    >
                      <MenuItem value="all">All</MenuItem>
                      {narrators.map((narrator) => (
                        <MenuItem key={narrator} value={narrator}>
                          {narrator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>View Mode</InputLabel>
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={(e, newMode) => newMode && setViewMode(newMode)}
                      fullWidth
                      sx={{ height: "56px" }}
                    >
                      <ToggleButton value="grid">
                        <ViewModule sx={{ mr: 1 }} />
                        Grid
                      </ToggleButton>
                      <ToggleButton value="list">
                        <ViewList sx={{ mr: 1 }} />
                        List
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Font Size</InputLabel>
                    <Select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      label="Font Size"
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                      <MenuItem value="xlarge">Extra Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Box>

        {/* Hadith List */}
        {isLoading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={20}
                      sx={{ mt: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      height={80}
                      sx={{ mt: 2, borderRadius: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={60}
                      sx={{ mt: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ mt: 1 }}
                    />
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Skeleton variant="rectangular" width={60} height={24} />
                      <Skeleton variant="rectangular" width={60} height={24} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Skeleton variant="text" width="40%" height={20} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : paginatedHadiths.length === 0 ? (
          <Paper
            elevation={0}
            sx={{ p: 6, textAlign: "center" }}
            role="status"
            aria-live="polite"
          >
            <Search sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No hadiths match your filters
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search criteria or resetting the filters.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleResetFilters}
              aria-label="Reset all filters"
            >
              Reset All Filters
            </Button>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedHadiths.map((hadith) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === "grid" ? 6 : 12}
                  md={viewMode === "grid" ? 4 : 12}
                  key={hadith.id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #10B981, #34D399)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
                            : "0 20px 40px -10px rgba(16, 185, 129, 0.15)",
                        "&::before": {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            color="primary"
                            sx={{ textTransform: "uppercase", fontWeight: 600 }}
                          >
                            {hadith.collection}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {hadith.reference}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => toggleBookmark(hadith.id)}
                          color={
                            bookmarkedHadiths.includes(hadith.id)
                              ? "primary"
                              : "default"
                          }
                          aria-label={
                            bookmarkedHadiths.includes(hadith.id)
                              ? "Remove bookmark"
                              : "Add bookmark"
                          }
                        >
                          {bookmarkedHadiths.includes(hadith.id) ? (
                            <Bookmark />
                          ) : (
                            <BookmarkBorder />
                          )}
                        </IconButton>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          fontSize: fontSizeMap[fontSize],
                        }}
                      >
                        {hadith.translation}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontFamily: "serif",
                          direction: "rtl",
                          textAlign: "right",
                        }}
                      >
                        {hadith.arabic}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Narrated by {hadith.narrator}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {hadith.topics.map((topic) => (
                          <Chip
                            key={topic}
                            label={topic}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Authenticity: {hadith.authenticity}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            startIcon={<Share />}
                            onClick={() => handleShare(hadith.id)}
                            aria-label="Share hadith"
                          >
                            Share
                          </Button>
                          <IconButton size="small" aria-label="Play audio">
                            <VolumeUp />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Share Dialog */}
      <Dialog
        open={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Share Hadith</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a personal note (optional)"
            value={shareNote}
            onChange={(e) => setShareNote(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#1877F2", "&:hover": { bgcolor: "#166FE5" } }}
                onClick={() => handleShareAction("facebook")}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#1DA1F2", "&:hover": { bgcolor: "#1A91DA" } }}
                onClick={() => handleShareAction("twitter")}
              >
                Twitter
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleShareAction("whatsapp")}
              >
                WhatsApp
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#F59E0B", "&:hover": { bgcolor: "#D97706" } }}
                onClick={() => handleShareAction("email")}
              >
                Email
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => handleShareAction("copy")}
              >
                Copy Link
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowShareDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HadithCollectionExplorer;
