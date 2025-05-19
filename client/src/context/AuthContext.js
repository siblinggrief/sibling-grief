import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import API_URL from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { displayName, photoURL, uid, email } = currentUser;
        try {
          const res = await fetch(`${API_URL}/api/user-role?uid=${uid}`);
          const data = await res.json();
          const userRole = data?.role || "user";
          setUser({ displayName, photoURL, uid, email });
          setRole(userRole);
        } catch (error) {
          console.error("Failed to fetch role:", error);
          setUser({ displayName, photoURL, uid, email });
          setRole("user");
        }
      } else {
        setUser(null);
        setRole("guest");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
