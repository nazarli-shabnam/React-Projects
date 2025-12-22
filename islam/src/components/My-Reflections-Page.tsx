import React, { useMemo, useState, useEffect, useCallback } from "react";
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
  useTheme,
  useMediaQuery,
  Paper,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  EditNote as EditNoteIcon,
} from "@mui/icons-material";

interface Reflection {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  source?: string;
  isPublic: boolean;
  isFavorite: boolean;
}

const categories = [
  "All Reflections",
  "Books",
  "Hadith",
  "Qur'an",
  "Personal Thoughts",
  "Favorites",
];

const initialReflections: Reflection[] = [
  {
    id: "1",
    title: "Mercy in Surah Rahman",
    content:
      "Reflecting on the repeated verse in Surah Rahman reminds me that every blessing demands gratitude and careful stewardship.",
    date: "2025-05-15",
    category: "Qur'an",
    source: "Surah 55",
    isPublic: true,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Patience in Sahih Muslim",
    content:
      "The hadith about how amazing the affair of a believer is has helped me embrace patience during recent challenges at work.",
    date: "2025-05-10",
    category: "Hadith",
    source: "Muslim 2999",
    isPublic: false,
    isFavorite: false,
  },
];

const MyReflectionsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Load preferences from localStorage
  const loadFromStorage = useCallback((key: string, defaultValue: unknown) => {
    try {
      const item = localStorage.getItem(`reflections_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, []);

  const [reflections, setReflections] = useState<Reflection[]>(() =>
    loadFromStorage("reflections", initialReflections)
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    loadFromStorage("category", "All Reflections")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReflection, setSelectedReflection] =
    useState<Reflection | null>(null);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [newReflection, setNewReflection] = useState({
    title: "",
    content: "",
    category: "Personal Thoughts",
    source: "",
    isPublic: true,
  });
  const [sharingStatus, setSharingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const showSnackbar = useCallback(
    (
      message: string,
      severity: "success" | "error" | "warning" | "info" = "success"
    ) => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const saveToStorage = useCallback(
    (key: string, value: unknown) => {
      try {
        localStorage.setItem(`reflections_${key}`, JSON.stringify(value));
      } catch (error) {
        // Only log in development
        if (import.meta.env.DEV) {
          console.warn("Failed to save to localStorage:", error);
        }
        // Show user-friendly error message
        showSnackbar(
          "Failed to save data. Please check your browser settings.",
          "error"
        );
      }
    },
    [showSnackbar]
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Save reflections to localStorage
  useEffect(() => {
    saveToStorage("reflections", reflections);
  }, [reflections, saveToStorage]);

  // Save category preference to localStorage
  useEffect(() => {
    saveToStorage("category", selectedCategory);
  }, [selectedCategory, saveToStorage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDeleteClick = (reflection: Reflection) => {
    setSelectedReflection(reflection);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedReflection) {
      setReflections((prev) =>
        prev.filter((r) => r.id !== selectedReflection.id)
      );
      setDeleteDialogOpen(false);
      setSelectedReflection(null);
      showSnackbar("Reflection deleted successfully", "info");
    }
  };

  const handleShareClick = (
    event: React.MouseEvent<HTMLElement>,
    reflection: Reflection
  ) => {
    setSelectedReflection(reflection);
    setShareMenuAnchor(event.currentTarget);
    setSharingStatus(null);
  };

  const handleShareClose = () => {
    setShareMenuAnchor(null);
    setSharingStatus(null);
  };

  const handleToggleFavorite = useCallback(
    (reflectionId: string) => {
      setReflections((prev) => {
        const updated = prev.map((reflection) =>
          reflection.id === reflectionId
            ? { ...reflection, isFavorite: !reflection.isFavorite }
            : reflection
        );
        const reflection = prev.find((r) => r.id === reflectionId);
        if (reflection) {
          showSnackbar(
            reflection.isFavorite
              ? "Removed from favorites"
              : "Added to favorites",
            "success"
          );
        }
        return updated;
      });
    },
    [showSnackbar]
  );

  const handleTogglePrivacy = useCallback(
    (reflectionId: string) => {
      setReflections((prev) => {
        const updated = prev.map((reflection) =>
          reflection.id === reflectionId
            ? { ...reflection, isPublic: !reflection.isPublic }
            : reflection
        );
        const reflection = prev.find((r) => r.id === reflectionId);
        if (reflection) {
          showSnackbar(
            reflection.isPublic ? "Made private" : "Made public",
            "info"
          );
        }
        return updated;
      });
    },
    [showSnackbar]
  );

  const filteredReflections = useMemo(() => {
    let filtered = reflections;

    if (selectedCategory === "Favorites") {
      filtered = filtered.filter((reflection) => reflection.isFavorite);
    } else if (selectedCategory !== "All Reflections") {
      filtered = filtered.filter(
        (reflection) => reflection.category === selectedCategory
      );
    }

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (reflection) =>
          reflection.title.toLowerCase().includes(query) ||
          reflection.content.toLowerCase().includes(query) ||
          reflection.source?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [reflections, selectedCategory, debouncedSearchQuery]);

  const handleCreateReflection = () => {
    // Validation
    const title = newReflection.title.trim();
    const content = newReflection.content.trim();
    const source = newReflection.source?.trim() || "";

    if (!title || !content) {
      showSnackbar("Please fill in both title and content", "warning");
      return;
    }

    // Max length validation
    const MAX_TITLE_LENGTH = 200;
    const MAX_CONTENT_LENGTH = 5000;
    const MAX_SOURCE_LENGTH = 500;

    if (title.length > MAX_TITLE_LENGTH) {
      showSnackbar(
        `Title must be less than ${MAX_TITLE_LENGTH} characters`,
        "warning"
      );
      return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      showSnackbar(
        `Content must be less than ${MAX_CONTENT_LENGTH} characters`,
        "warning"
      );
      return;
    }

    if (source.length > MAX_SOURCE_LENGTH) {
      showSnackbar(
        `Source must be less than ${MAX_SOURCE_LENGTH} characters`,
        "warning"
      );
      return;
    }

    // Sanitize input (basic XSS prevention)
    const sanitizeInput = (input: string) => {
      return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    };

    const reflection: Reflection = {
      id: Date.now().toString(),
      title: sanitizeInput(title),
      content: sanitizeInput(content),
      date: new Date().toISOString().split("T")[0],
      category: newReflection.category,
      source: source ? sanitizeInput(source) : undefined,
      isPublic: newReflection.isPublic,
      isFavorite: false,
    };

    setReflections((prev) => [reflection, ...prev]);
    setNewReflection({
      title: "",
      content: "",
      category: newReflection.category,
      source: "",
      isPublic: newReflection.isPublic,
    });
    showSnackbar("Reflection created successfully!", "success");
  };

  const handleShareOption = async (option: string) => {
    if (!selectedReflection) return;

    const baseMessage = `${selectedReflection.title}\n\n${
      selectedReflection.content
    }\n\nSource: ${selectedReflection.source ?? "Personal notes"}`;
    try {
      if (option === "copy") {
        await navigator.clipboard.writeText(baseMessage);
        setSharingStatus("Copied to clipboard");
        showSnackbar("Copied to clipboard!", "success");
      } else if (navigator.share && option === "native") {
        await navigator.share({
          title: selectedReflection.title,
          text: baseMessage,
        });
        setSharingStatus("Shared successfully");
        showSnackbar("Shared successfully!", "success");
      } else {
        setSharingStatus("Sharing is not supported in this browser");
        showSnackbar("Sharing is not supported in this browser", "warning");
      }
    } catch {
      setSharingStatus("Failed to share");
      showSnackbar("Failed to share", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navigation Bar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          p: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Reflections
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            My Reflections
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* @ts-expect-error - MUI v7 Grid item prop type issue */}
            <Grid item xs={12} md={4}>
              <TextField
                id="reflection-title"
                label="Title"
                fullWidth
                aria-label="Reflection title"
                value={newReflection.title}
                onChange={(event) =>
                  setNewReflection((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                inputProps={{ maxLength: 200 }}
                helperText={`${newReflection.title.length}/200 characters`}
              />
            </Grid>
            {/* @ts-expect-error - MUI Grid item prop type issue with MUI v7 */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Category"
                fullWidth
                select
                value={newReflection.category}
                onChange={(event) =>
                  setNewReflection((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
                SelectProps={{ native: true }}
              >
                {categories
                  .filter((category) => category !== "All Reflections")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </TextField>
            </Grid>
            {/* @ts-expect-error - MUI Grid item prop type issue with MUI v7 */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Source (optional)"
                fullWidth
                value={newReflection.source}
                onChange={(event) =>
                  setNewReflection((prev) => ({
                    ...prev,
                    source: event.target.value,
                  }))
                }
              />
            </Grid>
            {/* @ts-expect-error - MUI Grid item prop type issue with MUI v7 */}
            <Grid item xs={12}>
              <TextField
                label="Reflection"
                fullWidth
                multiline
                minRows={2}
                value={newReflection.content}
                onChange={(event) =>
                  setNewReflection((prev) => ({
                    ...prev,
                    content: event.target.value,
                  }))
                }
              />
            </Grid>
            {/* @ts-expect-error - MUI Grid item prop type issue with MUI v7 */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
              <Button
                variant={newReflection.isPublic ? "contained" : "outlined"}
                color="primary"
                startIcon={
                  newReflection.isPublic ? <PublicIcon /> : <LockIcon />
                }
                onClick={() =>
                  setNewReflection((prev) => ({
                    ...prev,
                    isPublic: !prev.isPublic,
                  }))
                }
              >
                {newReflection.isPublic
                  ? "Public Reflection"
                  : "Private Reflection"}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateReflection}
                disabled={!newReflection.title || !newReflection.content}
                sx={{
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Add New Reflection
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search reflections..."
              aria-label="Search reflections"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              aria-label="Filters"
            >
              Filters
            </Button>
          </Box>
        </Box>

        {/* Categories */}
        <Box
          sx={{
            mb: 4,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "primary.main",
              borderRadius: "3px",
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryChange(category)}
                color={selectedCategory === category ? "primary" : "default"}
                sx={{
                  minWidth: "120px",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Reflection List */}
        {isLoading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              // @ts-expect-error - MUI Grid item prop type issue with MUI v7
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
                      height={100}
                      sx={{ mt: 2, borderRadius: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredReflections.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
            role="status"
            aria-live="polite"
          >
            {searchQuery || selectedCategory !== "All Reflections" ? (
              <>
                <SearchIcon
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No reflections match your search
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Try adjusting your search criteria or selecting a different
                  category.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Reflections");
                  }}
                  aria-label="Clear filters"
                >
                  Clear Filters
                </Button>
              </>
            ) : (
              <>
                <EditNoteIcon
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Start Your First Reflection
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Capture your thoughts, insights, and learnings from Islamic
                  texts and personal experiences.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    document.getElementById("reflection-title")?.focus();
                  }}
                  aria-label="Create new reflection"
                >
                  Create New Reflection
                </Button>
              </>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredReflections.map((reflection) => (
              // @ts-expect-error - MUI Grid item prop type issue with MUI v7
              <Grid item xs={12} sm={6} md={4} key={reflection.id}>
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
                        mb: 2,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {reflection.date}
                      </Typography>
                      <Tooltip
                        title={reflection.isPublic ? "Public" : "Private"}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleTogglePrivacy(reflection.id)}
                        >
                          {reflection.isPublic ? <PublicIcon /> : <LockIcon />}
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      {reflection.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {reflection.content.length > 100
                        ? `${reflection.content.substring(0, 100)}...`
                        : reflection.content}
                    </Typography>

                    {reflection.source && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1 }}
                      >
                        Source: {reflection.source}
                      </Typography>
                    )}

                    <Chip
                      label={reflection.category}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          aria-label="Edit reflection"
                          onClick={() => {
                            showSnackbar("Edit feature coming soon!", "info");
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          aria-label="Delete reflection"
                          onClick={() => handleDeleteClick(reflection)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          size="small"
                          aria-label="Share reflection"
                          onClick={(event) =>
                            handleShareClick(event, reflection)
                          }
                        >
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          reflection.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <IconButton
                          size="small"
                          aria-label={
                            reflection.isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          onClick={() => handleToggleFavorite(reflection.id)}
                        >
                          {reflection.isFavorite ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Reflection</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this reflection? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Menu */}
      <Menu
        anchorEl={shareMenuAnchor}
        open={Boolean(shareMenuAnchor)}
        onClose={handleShareClose}
      >
        <MenuItem
          onClick={() => {
            handleShareOption("native");
          }}
        >
          Share via native dialog
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleShareOption("copy");
          }}
        >
          Copy to clipboard
        </MenuItem>
        <MenuItem onClick={handleShareClose}>Close</MenuItem>
        {sharingStatus && (
          <Typography variant="caption" sx={{ px: 2, pb: 1 }}>
            {sharingStatus}
          </Typography>
        )}
      </Menu>

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

export default MyReflectionsPage;
