import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import VoteIconButton from "./VoteIconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import API_URL from "../config";

const Post = ({ post, onPostDeleted }) => {
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2, borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      color: theme.palette.text.secondary,
                    },
                  }}
            >
              {post.title}
            </Typography>

            {/* Delete Button */}
            <IconButton onClick={() => setOpenDialog(true)} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>

          {post.description && (
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
              {post.description}
            </Typography>
          )}

          {/* Display Audio Player if audioUrl exists */}
          {post.audioUrl && post.audioUrl.startsWith("http") && (
            <audio controls style={{ width: "100%", marginTop: 10 }}>
              <source src={post.audioUrl} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Vote & Comment Buttons */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
            <VoteIconButton icon={ArrowUpwardIcon} color={theme.palette.primary.main} />
            <Typography>{post.upVotesCount}</Typography>

            <VoteIconButton icon={ArrowDownwardIcon} color={theme.palette.secondary.main} />
            <Typography>{post.downVotesCount}</Typography>

            <VoteIconButton icon={ChatBubbleOutlineIcon} />
          </Stack>
        </CardContent>
      </Card>

      {/* Reusable DeleteDialog */}
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
