import { Box, Typography, CircularProgress, List, ListItem, useTheme } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const SubscribersList = () => {
  const { subscribers, authLoading } = useAuth();
  const theme = useTheme();

  if (authLoading) return <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>;

  return (
    <Box mt={3}>
      <Typography variant="h6">All Subscribers ({subscribers.length})</Typography>
      {subscribers.length === 0 ? (
        <Typography>No subscribers found.</Typography>
      ) : (
        <List>
          {subscribers.map((sub) => (
            <ListItem key={sub.email}>{sub.email}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SubscribersList;
