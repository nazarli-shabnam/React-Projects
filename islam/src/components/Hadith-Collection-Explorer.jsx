import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "@mui/icons-material";

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
  const navigate = useNavigate();

  const [activeCollection, setActiveCollection] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authenticityFilter, setAuthenticityFilter] = useState("all");
  const [narratorFilter, setNarratorFilter] = useState("all");
  const [fontSize, setFontSize] = useState("medium");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedHadithForShare, setSelectedHadithForShare] = useState(null);
  const [shareNote, setShareNote] = useState("");

  const hadiths = sampleHadiths;

  const handleShare = (hadithId) => {
    setSelectedHadithForShare(hadithId);
    setShowShareDialog(true);
    setShareNote("");
  };

  const handleShareAction = async (platform) => {
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
        } catch {
          console.warn("Clipboard API failed, falling back to prompt");
          window.prompt("Copy hadith", `${shareText}\n${shareUrl}`);
        }
        break;
      default:
        break;
    }
    setShowShareDialog(false);
  };

  const fontSizeMap = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
    xlarge: "1.25rem",
  };

  const toggleBookmark = (id) => {
    setBookmarkedHadiths((prev) =>
      prev.includes(id)
        ? prev.filter((hadithId) => hadithId !== id)
        : [...prev, id]
    );
  };

  const filteredHadiths = useMemo(
    () =>
      hadiths.filter((hadith) => {
        const matchesSearch =
          searchQuery === "" ||
          hadith.translation
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          hadith.arabic.includes(searchQuery) ||
          hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase());
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
      searchQuery,
      activeCollection,
      activeCategory,
      authenticityFilter,
      narratorFilter,
    ]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
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
        </Toolbar>
      </AppBar>

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
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search hadith by text, narrator, or keywords..."
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

              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  fullWidth
                >
                  Advanced Filters
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
        {paginatedHadiths.length === 0 ? (
          <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hadiths match your filters yet.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try relaxing the search criteria.
            </Typography>
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
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
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
                          >
                            Share
                          </Button>
                          <IconButton size="small">
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
    </Box>
  );
};

export default HadithCollectionExplorer;
