import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Mosque,
  MenuBook,
  EditNote,
  WbSunny,
  ArrowForward,
  Favorite,
  Comment,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Explore,
  CalendarToday,
  Menu,
  DarkMode,
  LightMode,
  Home,
} from "@mui/icons-material";
import { useThemeMode } from "../contexts/ThemeContext";

const IslamiBilgiPlatformu: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hijriDate = "Shawwal 15, 1446 AH";

  const prayerTimes = {
    fajr: "4:32 AM",
    dhuhr: "12:15 PM",
    asr: "3:45 PM",
    maghrib: "7:21 PM",
    isha: "8:52 PM",
  };

  const features = [
    {
      title: "Hadith Browser",
      description:
        "Search and explore authentic hadith collections categorized by topics and sources.",
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      path: "/hadith",
    },
    {
      title: "Reflections & Notes",
      description:
        "Save personal reflections, bookmarks, and share insights with the community.",
      icon: <EditNote sx={{ fontSize: 40 }} />,
      path: "/reflections",
    },
    {
      title: "Daily Knowledge",
      description: "Receive daily hadith selections and morning/evening duas.",
      icon: <WbSunny sx={{ fontSize: 40 }} />,
      path: "/hadith",
    },
  ];

  const communityReflections = [
    {
      author: "Ahmed S.",
      time: "3 days ago",
      content:
        "The concept of Divine Unity as explained in 'The Words' has completely transformed my understanding of tawheed. The metaphor of the sun and its reflections helped me grasp how Allah's names are manifested in creation.",
      source: "The Words, Tenth Word",
      likes: 24,
      comments: 5,
    },
    {
      author: "Fatima K.",
      time: "1 week ago",
      content:
        "I've been struggling with patience during difficult times, but the hadith about Allah loving those who show patience has been a constant reminder. The commentary helped me understand that patience isn't passive acceptance but active trust in Allah's wisdom.",
      source: "Sahih Bukhari, Book of Patience",
      likes: 42,
      comments: 8,
    },
    {
      author: "Omar H.",
      time: "2 days ago",
      content:
        "The Twenty-Third Flash on nature has completely changed how I view the natural world. I now see every leaf, flower, and creature as a letter from the Divine, pointing to the Creator rather than to themselves. This perspective brings such peace.",
      source: "The Flashes, Twenty-Third Flash",
      likes: 18,
      comments: 3,
    },
  ];

  const footerLinks = {
    resources: [
      "Risale-i Nur Collection",
      "Hadith Collections",
      "Qur'an Studies",
      "Islamic Articles",
      "Audio Lectures",
    ],
    community: [
      "Discussion Forums",
      "Study Circles",
      "Events Calendar",
      "Volunteer",
      "Donate",
    ],
    about: [
      "Our Mission",
      "Team",
      "Contact Us",
      "Privacy Policy",
      "Terms of Service",
    ],
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
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
            <Button component={Link} to="/" color="primary">
              Home
            </Button>
            <Button component={Link} to="/hadith" color="inherit">
              Hadith
            </Button>
            <Button component={Link} to="/reflections" color="inherit">
              Reflections
            </Button>
          </Box>
          <IconButton onClick={toggleMode} sx={{ ml: 2 }}>
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

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 8, md: 12 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(4, 120, 87, 0.9) 100%)",
            opacity: 0.1,
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Discover the Wisdom of Islamic Knowledge
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Explore Hadith collections and reflect on timeless wisdom in one
              place.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/hadith")}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                Start Exploring
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/reflections")}
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                My Reflections
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Main Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "primary.light",
                    color: "white",
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate(feature.path)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Community Reflections Preview */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h3" component="h2">
              Community Reflections
            </Typography>
            <Button endIcon={<ArrowForward />}>View All</Button>
          </Box>
          <Grid container spacing={3}>
            {communityReflections.map((reflection, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        {reflection.author[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {reflection.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reflection.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      "{reflection.content}"
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Chip
                          icon={<Favorite />}
                          label={reflection.likes}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<Comment />}
                          label={reflection.comments}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Typography variant="caption" color="primary">
                      From: {reflection.source}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Begin Your Journey of Knowledge
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of seekers exploring the depths of Islamic wisdom
              through Risale-i Nur, authentic Hadith, and meaningful reflection.
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              Create Free Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: "grey.100", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Mosque sx={{ color: "primary.main", fontSize: 28 }} />
                <Typography variant="h6">Nur Web</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                An Islamic knowledge platform combining Risale-i Nur, Hadith
                collections, and tools for reflection.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small">
                  <Facebook />
                </IconButton>
                <IconButton size="small">
                  <Twitter />
                </IconButton>
                <IconButton size="small">
                  <Instagram />
                </IconButton>
                <IconButton size="small">
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" gutterBottom>
                Resources
              </Typography>
              {footerLinks.resources.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="a"
                  href="#"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" gutterBottom>
                Community
              </Typography>
              {footerLinks.community.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="a"
                  href="#"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Typography variant="subtitle2" gutterBottom>
                About
              </Typography>
              {footerLinks.about.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="a"
                  href="#"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2025 Nur Web. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                |
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hijriDate}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Prayer Times Bar */}
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          p: 1.5,
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Prayer Times:
              </Typography>
              {Object.entries(prayerTimes).map(([name, time]) => (
                <Chip
                  key={name}
                  label={`${
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }: ${time}`}
                  size="small"
                  sx={{ bgcolor: "primary.light", color: "white" }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button size="small" startIcon={<Explore />}>
                Qibla
              </Button>
              <Button size="small" startIcon={<CalendarToday />}>
                {hijriDate}
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default IslamiBilgiPlatformu;
