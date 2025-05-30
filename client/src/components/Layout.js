import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: "flex", bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }} className={styles.container}>
        {!isMobile && <Sidebar />}
        <Box className={styles.content} sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
