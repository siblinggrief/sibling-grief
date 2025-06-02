import { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import API_URL from "../config";
import FilterButtons from '../components/FilterButtons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../components/DeleteDialog';

const Admin = () => {
  const { user, role } = useAuth();
  const { posts, fetchPosts, deletePost, updatePostStatus } = usePosts();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('all');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'info' | 'warning'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const handleStatusChange = async (postId, status) => {
    await updatePostStatus(postId, status);
    fetchPosts(); // Refresh list
  };

  const handleOpenDeleteDialog = (postId) => {
    setSelectedPostId(postId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedPostId(null);
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_URL}/api/posts/${selectedPostId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');

      deletePost(selectedPostId);
      
      showSnackbar('Post deleted successfully!', 'success');

      setOpenDeleteDialog(false);
      setSelectedPostId(null);
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting post:', error);
       showSnackbar('Failed to delete post.', 'error'); 
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setSelectedPostId(null);
    }
  };

  if (role !== 'admin') {
    return <Typography>You are not authorized to view this page.</Typography>;
  }

  return (
    <Box>
      {/* 👇 Embed FilterButtons and pass required props */}
      <FilterButtons filter={filter} setFilter={setFilter} />

      <Table>
        <TableHead>
          <TableRow>
            {['Title', 'Author', 'Created At', 'Status', 'Actions'].map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: 'action.hover',
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No posts found.
              </TableCell>
            </TableRow>
          ) : (
            filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.displayName || 'N/A'}</TableCell>
                <TableCell>{new Date(post.createdAt?._seconds * 1000).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={post.status || 'N/A'}
                    color={
                      post.status === 'approved'
                        ? 'success'
                        : post.status === 'rejected'
                        ? 'error'
                        : post.status === 'pending'
                        ? 'info'
                        : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>
                  {post.status === 'pending' ? (
                    <>
                      <Tooltip title="Approve">
                        <IconButton
                          onClick={() => handleStatusChange(post.id, 'approved')}
                          color="success"
                          size="small"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Reject">
                        <IconButton
                          onClick={() => handleStatusChange(post.id, 'rejected')}
                          color="error"
                          size="small"
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Post">
                        <IconButton
                          onClick={() => handleOpenDeleteDialog(post.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
       <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeletePost}
        isDeleting={isDeleting}
      />
    </Box>
  );
};

export default Admin;
