import React, { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { Link } from 'react-router-dom'; 
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Dialog,
  Typography,
  IconButton,
  Stack,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DeleteDialog from "./DeleteDialog";
import ShareMenu from "./ShareMenu";
import API_URL from "../config";
import "firebase/compat/firestore";
import CustomAudioPlayer from "./CustomAudioPlayer";
import { Timestamp } from "firebase/firestore";

const EMOJIS = ['❤️', '🤗', '😢', '🌈', '🕊️'];

const Post = ({ post, onPostDeleted }) => {
  const { displayName, photoURL } = post;
  const theme = useTheme();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [showShareMenu, setShowShareMenu] = useState(false);

  const { updateEmojiCount } = usePosts();

  const { _seconds, _nanoseconds } = post.createdAt;
  const timestamp = new Timestamp(_seconds, _nanoseconds);
  const createdDate = timestamp.toDate();

  const handleEmojiClick = (emoji) => {
    updateEmojiCount(post.id, emoji);
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
    setShowShareMenu(true);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper, // correct use of theme
          color: theme.palette.text.primary,               // font color adjusts per theme
          border: `1px solid ${theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0'}`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 2px 6px rgba(255, 255, 255, 0.08)'
            : '0 2px 4px rgba(0, 0, 0, 0.08)',
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
            <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
              {createdDate?.toLocaleString() || "Unknown date"}
            </Typography>
            <Box>
              <IconButton onClick={handleShare}>
                <ShareIcon />
              </IconButton>

            <Dialog open={showShareMenu} onClose={() => setShowShareMenu(false)}>
              <ShareMenu
                postTitle={post.title}
                postUrl={window.location.href}
                onClose={() => setShowShareMenu(false)}
              />
            </Dialog>

              {user?.displayName === post?.displayName && (
                <IconButton onClick={() => setOpenDialog(true)} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
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
            {EMOJIS.map((emoji) => (
              <span
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                style={{ cursor: 'pointer' }}
              >
                {emoji} {post.counts?.[emoji] || 0}
              </span>
            ))}
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
                  component={Link}
                  to={`/tag/${topic}`}
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
