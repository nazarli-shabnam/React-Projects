import React, { useState } from "react";
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

const MyReflectionsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Reflections");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReflection, setSelectedReflection] =
    useState<Reflection | null>(null);
  const [shareMenuAnchor, setShareMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDeleteClick = (reflection: Reflection) => {
    setSelectedReflection(reflection);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedReflection) {
      setReflections(reflections.filter((r) => r.id !== selectedReflection.id));
      setDeleteDialogOpen(false);
      setSelectedReflection(null);
    }
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareMenuAnchor(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareMenuAnchor(null);
  };

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h1">
              My Reflections
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Add New Reflection
            </Button>
          </Box>

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
        {reflections.length === 0 ? (
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
            {reflections.map((reflection) => (
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
                        <IconButton size="small">
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
                      {reflection.content.substring(0, 100)}...
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
                        <IconButton size="small" onClick={handleShareClick}>
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
                        <IconButton size="small">
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
        <MenuItem onClick={handleShareClose}>Share via Email</MenuItem>
        <MenuItem onClick={handleShareClose}>Share via Link</MenuItem>
        <MenuItem onClick={handleShareClose}>Share on Social Media</MenuItem>
      </Menu>
    </Box>
  );
};

export default MyReflectionsPage;
