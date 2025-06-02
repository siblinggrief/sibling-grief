import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import API_URL from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [authLoading, setAuthLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);

   const fetchSubscribers = async (uid) => {
    try {
      const res = await fetch(`${API_URL}/api/subscribers?uid=${uid}`);
      const data = await res.json();
      if (res.ok) {
        setSubscribers([...data] || []);
      } else {
        console.error("Failed to fetch subscribers:", data.error);
      }
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    }
  };

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

         if (userRole === "admin") {
            await fetchSubscribers(uid);
          }
        } catch (error) {
          console.error("Failed to fetch role or subscribers:", error);
          setUser({ displayName, photoURL, uid, email });
          setRole("user");
        }
      } else {
        setUser(null);
        setRole("guest");
        setSubscribers([]);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, authLoading, subscribers, setSubscribers, fetchSubscribers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
