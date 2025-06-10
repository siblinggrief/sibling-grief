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
  const [adminRequests, setAdminRequests] = useState([]);

  const updateAdminRequestsStatus = async (uid, reqId, status) => {
    try {
      const response = await fetch(`${API_URL}/api/${reqId}/update-admin-status?uid=${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update request status");

      // Optional: Update local state optimistically
      setAdminRequests((prev) =>
        prev.map((request) =>
          request.id === reqId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };
  
  const fetchAdminRequests = async (uid) => {
    try {
      const res = await fetch(`${API_URL}/api/request-admin?uid=${uid}`);
      const data = await res.json();

      if (res.ok) {
        setAdminRequests(data || []);
      } else {
        console.error("Failed to fetch admin requests:", data.error);
      }
    } catch (err) {
      console.error("Error fetching admin requests:", err);
    }
  };

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

          // Fetch subscribers and admin requests if the user is an admin
         if (userRole === "admin") {
            await fetchSubscribers(uid);
            await fetchAdminRequests(uid);
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
        setAdminRequests([]);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, authLoading, subscribers, setSubscribers, fetchSubscribers, adminRequests, setAdminRequests, fetchAdminRequests, updateAdminRequestsStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
