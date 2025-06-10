import { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import FilterButtons from '../components/FilterButtons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminRequests = () => {
    const { user, role, adminRequests, fetchAdminRequests, updateAdminRequestsStatus } = useAuth();
    const [filter, setFilter] = useState('all');
    const [loading, setIsLoading] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleStatusChange = async (postId, status) => {
        setIsLoading(true);
        await updateAdminRequestsStatus(user?.uid, postId, status);
        if (role === "admin" && user?.uid) {
          await fetchAdminRequests(user.uid); // Refresh list
        }
        setIsLoading(false);
    };

    const filteredRequests = adminRequests.filter((request) => {
        if (filter === 'all') return true;
        return request.status === filter;
    });

  if (role !== 'admin') {
    return <Typography>You are not authorized to view this page.</Typography>;
  }

    return (
        <>
        <FilterButtons filter={filter} setFilter={setFilter} />
        {loading &&
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>
        </Box>}
            {isMobile ? (
            // Mobile: Card view
            <Box>
              {filteredRequests?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No requests found.
                        </TableCell>
                      </TableRow>
                    ) : 
              filteredRequests?.map((req) => (
                <Box
                  key={req.id}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    padding: 2,
                    marginBottom: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6">{req.email}</Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    Requested on{' '}
                    {new Date(req.timestamp).toLocaleString()}
                  </Typography>

                  <Box sx={{ marginTop: 2 }}>
                    <Chip
                      label={req.status || 'N/A'}
                      color={
                        req.status === 'approved'
                          ? 'success'
                          : req.status === 'rejected'
                          ? 'error'
                          : req.status === 'pending'
                          ? 'info'
                          : 'warning'
                      }
                      size="small"
                    />
                  </Box>

                    <Box sx={{ marginTop: 1, display: 'flex', gap: 1 }}>
                      {req.status === 'pending' && (
                      <>
                        <Tooltip title="Approve">
                          <IconButton onClick={() => handleStatusChange(req.id, 'approved')} color="success" size="small">
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Reject">
                          <IconButton onClick={() => handleStatusChange(req.id, 'rejected')} color="error" size="small">
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                      )}
                    </Box>

                </Box>
              ))}
            </Box>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ marginTop: 2 }}>
                  <TableHead>
                  <TableRow>
                    {['Requested By', 'Requested On', 'Status', 'Actions'].map((header) => (
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
                    {filteredRequests?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No requests found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests?.map((req) => (
                        <TableRow key={req.id} className='post-row'>
                          <TableCell sx={{ width: '40%' }}>{req.email}</TableCell>
                          <TableCell sx={{ width: '25%' }}>{new Date(req.timestamp).toLocaleString()}</TableCell>
                          <TableCell sx={{ width: '15%' }}>
                            <Chip
                              label={req.status || 'N/A'}
                              color={
                                req.status === 'approved'
                                  ? 'success'
                                  : req.status === 'rejected'
                                  ? 'error'
                                  : req.status === 'pending'
                                  ? 'info'
                                  : 'warning'
                              }
                            />
                          </TableCell>
                          <TableCell sx={{ width: '25%' }}>
                            {req.status === 'pending' ? (
                              <>
                                <Tooltip title="Approve">
                                  <IconButton
                                    onClick={() => handleStatusChange(req.id, 'approved')}
                                    color="success"
                                    size="small"
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Reject">
                                  <IconButton
                                    onClick={() => handleStatusChange(req.id, 'rejected')}
                                    color="error"
                                    size="small"
                                  >
                                    <CancelIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                              ) : '-' }
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}
        </>
    );
}

export default AdminRequests;