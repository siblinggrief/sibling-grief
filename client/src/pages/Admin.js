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
  Tooltip
} from '@mui/material';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext';
import FilterButtons from '../components/FilterButtons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Admin = () => {
  const { user, role } = useAuth();
  const { posts, fetchPosts, updatePostStatus } = usePosts();
  const [filter, setFilter] = useState('all');

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
                    </>
                  ) : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Admin;
