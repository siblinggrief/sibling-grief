// src/pages/Subscribe.js
import React, { useState, useEffect} from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Paper,
  CircularProgress,
  useTheme
} from "@mui/material";
import API_URL from "../config"; 
import { useAuth } from "../context/AuthContext"; 
import SubscribersList from "../components/SubscribersList";  

const Subscribe = () => {
  const theme = useTheme();
  const { user, role, fetchSubscribers } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success | error | unsubscribed
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubscribe = async () => {
  if (!isValidEmail(email)) {
    setEmailError(true);
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json(); // Always parse response

    if (!res.ok) {
      throw new Error(data.error || "Subscription failed");
    }

    setStatus("success");
    setMessage(data.message || "You're subscribed! We'll email weekly excerpts.");
    setEmail("");
    if (role === "admin" && user?.uid) {
      await fetchSubscribers(user.uid);
    }
  } catch (error) {
    setStatus("error");
    setMessage(error.message || "Subscription failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

 const handleUnsubscribe = async () => {
  if (!isValidEmail(email)) {
    setEmailError(true);
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(`${API_URL}/api/unsubscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Unsubscription failed");
    }

    setStatus("unsubscribed");
    setMessage(data.message || "You've been unsubscribed.");
    setEmail("");
    if (role === "admin" && user?.uid) {
      await fetchSubscribers(user.uid);
    }
  } catch (error) {
    setStatus("error");
    setMessage(error.message || "Unsubscription failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.custom.title }}>
          Subscribe to Weekly Highlights
        </Typography>
        <Typography variant="body1" mb={2}>
          Get a weekly email with newly shared posts from the community.
        </Typography>
        <TextField
          fullWidth
          type="email"
          label="Your Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
            
            if (newEmail === "") {
              setStatus("");
              setMessage("");
              setEmailError(false);
            } else {
              setEmailError(!isValidEmail(newEmail));
            }
          }}
          error={emailError}
          helperText={emailError ? "Please enter a valid email address" : ""}
          sx={{
            mb: 2,
            '& .MuiInputBase-input::placeholder': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.custom.grey
                  : theme.palette.custom.darkGrey,
              opacity: 1,
            },
            '& label': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.custom.grey
                  : theme.palette.custom.darkGrey,
            },
          }}
        />
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={handleSubscribe}
            disabled={!email || emailError}
            sx={{
              backgroundColor: theme.palette.custom.mediumGreen,
              color: theme.palette.custom.white,
              "&:hover": {
                backgroundColor: theme.palette.custom.darkGreen,
              },
            }}
          >
            Subscribe
          </Button>
          <Button
            variant="outlined"
            onClick={handleUnsubscribe}
            disabled={!email || emailError}
            sx={{
              borderColor: theme.palette.custom.mediumGreen,
              color: theme.palette.custom.lightGreen,
              "&:hover": {
                borderColor: theme.palette.custom.darkGreen,
                color: theme.palette.custom.grey,
              },
            }}
          >
            Unsubscribe
          </Button>
          {role === "admin" && (
            <>
              <Button
                variant="outlined"
                onClick={() => setShowSubscribers((prev) => !prev)}
                sx={{
                  borderColor: theme.palette.custom.mediumGreen,
                  color: theme.palette.custom.lightGreen,
                  "&:hover": {
                    borderColor: theme.palette.custom.darkGreen,
                    color: theme.palette.custom.grey,
                  },
                }}
              >
                {showSubscribers ? "Hide Subscribers" : "View All Subscribers"}
              </Button>
            </>
        )}
        </Box>

        <Box mt={2} mx={2}>
          {loading && <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>}
        </Box>

        <Box mt={2}>
        {showSubscribers && <SubscribersList />}
        </Box>

        {status && (
          <Alert
            severity={status === "error" ? "error" : "success"}
            sx={{ mt: 3 }}
          >
            {message}
          </Alert>
        )}

      </Paper>
    </Container>
  );
};

export default Subscribe;
