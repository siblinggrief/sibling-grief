import React from "react";
import { Button, Stack } from "@mui/material";

const ShareMenu = ({ postTitle, postUrl, onClose }) => {
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedUrl = encodeURIComponent(postUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
    onClose();
  };

  return (
    <Stack spacing={2} sx={{ p: 3, minWidth: 300 }}>
      <Button
        variant="contained"
        onClick={() =>
          window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank")
        }
      >
        WhatsApp
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
        }
      >
        Facebook
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank")
        }
      >
        X (Twitter)
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          window.open(`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`, "_self")
        }
      >
        Email
      </Button>
      <Button variant="contained" onClick={copyToClipboard}>
        Copy Link
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Stack>
  );
};

export default ShareMenu;
