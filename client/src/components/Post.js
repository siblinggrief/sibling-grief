import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import EmojiSelector from "./EmojiSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { useAuth } from "../context/AuthContext";
import DeleteDialog from "./DeleteDialog";
import API_URL from "../config";
import "firebase/compat/firestore";
import CustomAudioPlayer from "./CustomAudioPlayer"; // Adjust the path if necessary
import { Timestamp } from "firebase/firestore";

const Post = ({ post, onPostDeleted }) => {
  const { user: { displayName, photoURL } } = useAuth();
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [counts, setCounts] = useState(post.counts || {});
  const [customEmojis, setCustomEmojis] = useState(post.customEmojis || []);
  const [showPicker, setShowPicker] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { _seconds, _nanoseconds } = post.createdAt;
  const timestamp = new Timestamp(_seconds, _nanoseconds);
  const createdDate = timestamp.toDate();

  const handleEmojiSelect = (emoji) => {
    setShowPicker(false);
    setCustomEmojis((prev) => [...prev, emoji]);
    updateFirestore(emoji);
  };

  const handleEmojiClick = (emoji) => {
    updateFirestore(emoji);
  };

  const updateFirestore = async (emoji) => {
    const emojiKey = emoji; // Assuming emoji is a string like '❤️'
    const updatedCounts = { ...counts, [emojiKey]: (counts[emojiKey] || 0) + 1 };
    setCounts(updatedCounts);

    try {
      await fetch(`${API_URL}/api/posts/${post.id}/updateEmoji`, {
        method: "POST",
        body: JSON.stringify({ emoji: emojiKey }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      onPostDeleted(post.id);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Firefly Lives",
        text: post.title,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.text.black,
          borderRadius: 3,
          maxWidth: "100%",
          margin: "20px auto",
          padding: 2,
          overflow: "visible",
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                src={photoURL || ""}
                alt={displayName || "Anonymous"}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {displayName || "Anonymous"}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: theme.palette.background.paper }}>
              {createdDate?.toLocaleString() || "Unknown date"}
            </Typography>
            <Box>
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={() => setOpenDialog(true)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>

          <Typography variant="h5" sx={{ marginTop: 1 }}>
            {post.title}
          </Typography>

          {post.description && (
            <>
              {!isExpanded ? (
                <Typography
                  onClick={() => setIsExpanded((prev) => !prev)}
                  variant="body2"
                  sx={{
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {post.description}
                </Typography>
              ) : (
                <Typography
                  onClick={() => setIsExpanded((prev) => !prev)}
                  variant="body2"
                  sx={{
                    mt: 1,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {post.description}
                </Typography>
              )}
            </>
          )}

          {post.audioUrl && post.audioUrl.startsWith('http') && (
            <CustomAudioPlayer audioUrl={post.audioUrl} audioDuration={post.audioDuration}/>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 2, flexWrap: "wrap", gap: 1 }}
          >

            <Box sx={{ position: 'relative' }}>
              {/* Emoji Picker */}
              {showPicker && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    zIndex: 10,
                  }}
                >
                  <EmojiSelector onEmojiSelect={handleEmojiSelect} />
                </Box>
              )}

              {/* Emoji Display Box */}
              <Box
                sx={{
                  backgroundColor: theme.palette.action.disabled,
                  borderRadius: '9999px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                {Object.entries(counts).map(([emoji, count]) => (
                  <span key={emoji} onClick={() => handleEmojiClick(emoji)} style={{ cursor: 'pointer' }}>
                    {emoji} {count}
                  </span>
                ))}
          
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 200, cursor: 'pointer' }}
                  onClick={() => setShowPicker((prev) => !prev)}
                >
                  Choose own emoji
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: theme.palette.action.disabled,
                borderRadius: "9999px",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {`Topics:`}
              </Typography>

              {post.topics?.map((topic, index) => (
                <Chip
                  key={index}
                  label={topic}
                  variant="outlined"
                  component="a"
                  href={`/tag/${topic}`}
                  sx={{
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                />
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeletePost}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default Post;
