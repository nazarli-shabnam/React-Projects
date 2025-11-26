import React, { useMemo, useState } from "react";
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

  const [reflections, setReflections] =
    useState<Reflection[]>(initialReflections);
  const [selectedCategory, setSelectedCategory] = useState("All Reflections");
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleToggleFavorite = (reflectionId: string) => {
    setReflections((prev) =>
      prev.map((reflection) =>
        reflection.id === reflectionId
          ? { ...reflection, isFavorite: !reflection.isFavorite }
          : reflection
      )
    );
  };

  const handleTogglePrivacy = (reflectionId: string) => {
    setReflections((prev) =>
      prev.map((reflection) =>
        reflection.id === reflectionId
          ? { ...reflection, isPublic: !reflection.isPublic }
          : reflection
      )
    );
  };

  const filteredReflections = useMemo(() => {
    let filtered = reflections;

    if (selectedCategory === "Favorites") {
      filtered = filtered.filter((reflection) => reflection.isFavorite);
    } else if (selectedCategory !== "All Reflections") {
      filtered = filtered.filter(
        (reflection) => reflection.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (reflection) =>
          reflection.title.toLowerCase().includes(query) ||
          reflection.content.toLowerCase().includes(query) ||
          reflection.source?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [reflections, selectedCategory, searchQuery]);

  const handleCreateReflection = () => {
    if (!newReflection.title.trim() || !newReflection.content.trim()) {
      return;
    }

    const reflection: Reflection = {
      id: Date.now().toString(),
      title: newReflection.title.trim(),
      content: newReflection.content.trim(),
      date: new Date().toISOString().split("T")[0],
      category: newReflection.category,
      source: newReflection.source?.trim() || undefined,
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
      } else if (navigator.share && option === "native") {
        await navigator.share({
          title: selectedReflection.title,
          text: baseMessage,
        });
        setSharingStatus("Shared successfully");
      } else {
        setSharingStatus("Sharing is not supported in this browser");
      }
    } catch {
      setSharingStatus("Failed to share");
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
            <Grid item xs={12} md={4}>
              <TextField
                label="Title"
                fullWidth
                value={newReflection.title}
                onChange={(event) =>
                  setNewReflection((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
              />
            </Grid>
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
            <Button variant="outlined" startIcon={<FilterListIcon />}>
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
        {filteredReflections.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Start Your First Reflection
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
              Create New Reflection
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredReflections.map((reflection) => (
              <Grid item xs={12} sm={6} md={4} key={reflection.id}>
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
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(reflection)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          size="small"
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
    </Box>
  );
};

export default MyReflectionsPage;
