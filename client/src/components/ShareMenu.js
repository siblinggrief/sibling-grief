import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ShareMenu = ({ postTitle, postUrl, onClose }) => {
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedUrl = encodeURIComponent(postUrl);

  const theme = useTheme();

  const buttonStyle = {
      backgroundColor: theme.palette.custom.darkGreen,      
      color: theme.palette.custom.white,                 
      "&:hover": {
        backgroundColor: theme.palette.custom.mediumGreen,   
      },
      textTransform: "none",
      fontWeight: 400,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
    onClose();
  };

  return (
    <Stack spacing={2} sx={{ p: 3, minWidth: 300 }}>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() =>
          window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank")
        }
      >
        WhatsApp
      </Button>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() =>
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
        }
      >
        Facebook
      </Button>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() =>
          window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank")
        }
      >
        X (Twitter)
      </Button>
      <Button
        variant="contained"
        sx={buttonStyle}
        onClick={() =>
          window.open(`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`, "_self")
        }
      >
        Email
      </Button>
      <Button variant="contained" sx={buttonStyle} onClick={copyToClipboard}>
        Copy Link
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Stack>
  );
};

export default ShareMenu;
