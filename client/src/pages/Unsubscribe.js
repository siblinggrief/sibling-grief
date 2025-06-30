import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import API_URL from "../config";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      setStatus("invalid");
      return;
    }

    fetch(`${API_URL}/api/unsubscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.ok ? setStatus("success") : setStatus("error"))
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return <CircularProgress />;
  }

  return (
    <Box mt={5} textAlign="center">
      {status === "success" && (
        <Typography variant="h6">You’ve been unsubscribed. We’re sorry to see you go.</Typography>
      )}
      {status === "error" && (
        <Typography variant="h6">Something went wrong while unsubscribing.</Typography>
      )}
      {status === "invalid" && (
        <Typography variant="h6">Invalid unsubscribe link.</Typography>
      )}
    </Box>
  );
};

export default Unsubscribe;
