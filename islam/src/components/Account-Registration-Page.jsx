import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  LinearProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff, Mosque } from "@mui/icons-material";

const AccountRegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formValues, setFormValues] = useState({ fullName: "", email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculatePasswordStrength = (pass) => {
    let strength = 0;

    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "error";
      case 1:
        return "error";
      case 2:
        return "warning";
      case 3:
        return "info";
      case 4:
        return "success";
      default:
        return "error";
    }
  };

  const getPasswordStrengthLabel = () => {
    return (
      ["Very weak", "Weak", "Fair", "Good", "Strong"][passwordStrength] ||
      "Very weak"
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    calculatePasswordStrength(newPassword);
    setFormErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setFormErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  const handleFieldChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSuccess(false);
    const validationErrors = validateForm();
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 600);
    }
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
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Mosque sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6">Nur Web</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={0} sx={{ minHeight: "calc(100vh - 64px)" }}>
          {/* Left Side - Background Image (hidden on mobile) */}
          <Grid
            item
            xs={false}
            lg={6}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "relative",
              backgroundImage:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(4, 120, 87, 0.2) 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255, 255, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Mosque sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Welcome to Nur Web
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join our community of knowledge seekers and explore the wisdom
                  of Islamic teachings.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Registration Form */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 2, sm: 4 },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Create Your Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join our community of knowledge seekers
                </Typography>
              </Box>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} noValidate>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    id="fullName"
                    placeholder="Your full name"
                    value={formValues.fullName}
                    onChange={handleFieldChange("fullName")}
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                    required
                  />

                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    id="email"
                    placeholder="your.email@example.com"
                    value={formValues.email}
                    onChange={handleFieldChange("email")}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                  />

                  <Box>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      id="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                      error={!!formErrors.password}
                      helperText={formErrors.password}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {password && (
                      <Box sx={{ mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(passwordStrength / 4) * 100}
                          color={getPasswordStrengthColor()}
                          sx={{ height: 6, borderRadius: 1 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.5, display: "block" }}
                        >
                          {getPasswordStrengthLabel()}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    id="confirmPassword"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </Button>

                  {isSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Welcome aboard! Check your inbox to verify your email.
                    </Alert>
                  )}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 2 }}
                  >
                    Already have an account?{" "}
                    <Button
                      component={Link}
                      to="/"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      Sign in
                    </Button>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountRegistrationPage;
