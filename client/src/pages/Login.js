import React, { useState } from "react";
import {
  Button, Typography, Box, Stack, Dialog, DialogTitle, DialogContent,
  DialogActions
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const darkGreen = theme.palette.custom.darkGreen;
  const mediumGreen = theme.palette.custom.mediumGreen;
  const lightText = theme.palette.grey[100];
  const borderColor = isDarkMode ? lightText : darkGreen;
  const textColor = isDarkMode ? lightText : darkGreen;
  const hoverBorder = mediumGreen;
  const hoverBg = isDarkMode ? `${mediumGreen}1A` : `${mediumGreen}10`;

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result?.user?.emailVerified) {
        navigate("/to-share");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const showModal = (text) => {
    setModalText(text);
    setOpenModal(true);
  };

  const getButtonStyle = () => ({
    color: textColor,
    borderColor,
    fontWeight: 600,
    '&:hover': {
      borderColor: hoverBorder,
      backgroundColor: hoverBg,
    },
  });

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" mb={5} gutterBottom>
        Welcome to Firefly Lives
      </Typography>

      <Stack spacing={2} mt={4} maxWidth="300px" margin="auto">
        <Button
          variant="outlined"
          startIcon={<FcGoogle size={24} />}
          onClick={handleGoogleLogin}
          sx={getButtonStyle()}
        >
          Login with Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaFacebook size={20} color="#4267B2" />}
          onClick={() => showModal("Facebook login is not set up yet.")}
          sx={getButtonStyle()}
        >
          Login with Facebook
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaApple size={20} />}
          onClick={() => showModal("Apple login is not set up yet.")}
          sx={getButtonStyle()}
        >
          Login with Apple
        </Button>
      </Stack>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Coming Soon</DialogTitle>
        <DialogContent>
          <Typography>{modalText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{ color: textColor }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
