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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import API_URL from "../config";
import FilterButtons from '../components/FilterButtons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../components/DeleteDialog';
import CustomAudioPlayer from '../components/CustomAudioPlayer';

const Admin = () => {
  const { user, role } = useAuth();
  const { posts, fetchPosts, deletePost, updatePostStatus } = usePosts();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState({});

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

  const toggleDescription = (postId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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
      <FilterButtons filter={filter} setFilter={setFilter} />

      {isMobile ? (
      // Mobile: Card view
      <Box>
        {filteredPosts.map((post) => (
          <Box
            key={post.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              backgroundColor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              By {post.displayName || 'N/A'} on{' '}
              {new Date(post.createdAt?._seconds * 1000).toLocaleString()}
            </Typography>

            <Typography
              variant="body2"
              sx={{ marginTop: 1, whiteSpace: 'pre-wrap' }}
              onClick={() => toggleDescription(post.id)}
            >
              {expandedRows[post.id]
                ? post.description
                : post.description?.length > 100
                ? `${post.description.slice(0, 100)}...`
                : post.description || '—'}
              {post.description?.length > 100 && (
                <Typography
                  variant="caption"
                  sx={{ color: 'primary.main', display: 'block', cursor: 'pointer' }}
                >
                  {expandedRows[post.id] ? 'Show less' : 'Show more'}
                </Typography>
              )}
            </Typography>

            {post.audioUrl && post.audioUrl.startsWith('http') && (
              <Box sx={{ marginTop: 2 }}>
                <CustomAudioPlayer audioUrl={post.audioUrl} audioDuration={post.audioDuration} />
              </Box>
            )}

            <Box sx={{ marginTop: 2 }}>
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
                size="small"
              />
            </Box>

            {post.status === 'pending' && (
              <Box sx={{ marginTop: 1, display: 'flex', gap: 1 }}>
                <Tooltip title="Approve">
                  <IconButton onClick={() => handleStatusChange(post.id, 'approved')} color="success" size="small">
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reject">
                  <IconButton onClick={() => handleStatusChange(post.id, 'rejected')} color="error" size="small">
                    <CancelIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete Post">
                  <IconButton onClick={() => handleOpenDeleteDialog(post.id)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 925, marginTop: 2 }}>
            <TableHead>
            <TableRow>
              {['Title', 'Author', 'Description', 'Audio', 'Created At', 'Status', 'Actions'].map((header) => (
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
                  <TableRow key={post.id} className='post-row'>
                    <TableCell sx={{ width: '10%' }}>{post.title}</TableCell>
                    <TableCell sx={{ width: '5%' }}>{post.displayName || 'N/A'}</TableCell>
                    <TableCell
                      sx={{
                        width: '15%',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        cursor: 'pointer',
                        position: 'relative',
                        paddingRight: '1rem',
                      }}
                      onClick={() => toggleDescription(post.id)}
                    >
                      <Typography variant="body2" component="span">
                        {expandedRows[post.id]
                          ? post.description
                          : post.description?.length > 100
                            ? `${post.description.slice(0, 100)}...`
                            : post.description || '—'}
                      </Typography>

                      {post.description?.length > 100 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'primary.main',
                            position: 'absolute',
                            bottom: 0,
                            right: 4,
                          }}
                        >
                          {expandedRows[post.id] ? 'Show less' : 'Show more'}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell sx={{ width: '25%' }}>
                      {post.audioUrl && post.audioUrl.startsWith('http') ? 
                      <CustomAudioPlayer audioUrl={post.audioUrl} audioDuration={post.audioDuration}/> : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell sx={{ width: '15%' }}>{new Date(post.createdAt?._seconds * 1000).toLocaleString()}</TableCell>
                    <TableCell sx={{ width: '5%' }}>
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
                    <TableCell sx={{ width: '25%' }}>
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
        </Box>
      )}

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
