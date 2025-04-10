import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import theme from "./styles/theme";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // Show nothing or loader while checking

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Container>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected Route */}
                {user ? (
                  <Route path="/" element={<Home />} />
                ) : (
                  <Route path="/" element={<Navigate to="/login" />} />
                )}

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
          </Layout>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
