// context/PostsContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import API_URL from "../config";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchPosts = async () => {
    if (hasFetched) return; // Prevent refetching
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
      setHasFetched(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmojiCount = async (postId, emoji) => {
    setPosts((prevPosts) =>
      prevPosts?.map((post) =>
        post.id === postId
          ? {
              ...post,
              counts: {
                ...(post.counts || {}),
                [emoji]: ((post.counts?.[emoji] || 0) + 1),
              },
            }
          : post
      )
    );
     // Persist to backend
      try {
        const response = await fetch(`${API_URL}/api/posts/${postId}/updateEmoji`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emoji }),
        });

        if (!response.ok) {
          throw new Error("Failed to update emoji count in DB");
        }
      } catch (error) {
        console.error("Error updating emoji count in backend:", error);
      }
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, deletePost, loading, setHasFetched, updateEmojiCount }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
