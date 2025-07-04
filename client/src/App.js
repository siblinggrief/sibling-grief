import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";
import { AppThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import RequireAdmin from "./components/RequireAdmin";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ToShare from "./pages/ToShare";
import ToCare from "./pages/ToCare";
import ToPrepare from "./pages/ToPrepare";
import SelfCare from "./pages/SelfCare";
import TagPage from "./pages/TagPage";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Subscribe from "./pages/Subscribe";
import Unsubscribe from "./pages/Unsubscribe";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";

import "./styles/theme-variables.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('reactedPosts');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <AppThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <PostsProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/to-share" element={<ToShare />} />
                <Route path="/to-care" element={<ToCare />} />
                <Route path="/to-prepare" element={<ToPrepare />} />
                <Route path="/self-care" element={<SelfCare />} />
                <Route path="/tag/:tagName" element={<TagPage />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/unsubscribe" element={<Unsubscribe />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </PostsProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
};

export default App;
