import { Modal, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoginPromptModal = ({ open, onClose, onLogin }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-prompt-title"
      aria-describedby="login-prompt-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.background.paper,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 300,
          textAlign: "center",
        }}
      >
        <h2 id="login-prompt-title">Login Required</h2>
        <p id="login-prompt-description">Please log in to share a post.</p>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.custom.darkGreen,
            color: theme.palette.custom.white,
            "&:hover": {
              backgroundColor: theme.palette.custom.mediumGreen,
            },
            textTransform: "none",
          }}
          onClick={onLogin}
        >
          Go to Login
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginPromptModal;
