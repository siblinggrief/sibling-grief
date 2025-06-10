import { useState } from 'react';
import { Button, Box, useTheme, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";

const RequestAdmin = () => {
const theme = useTheme();
const { user, role } = useAuth();

const [loading, setLoading] = useState(false);
const [snackbar, setSnackbar] = useState({
open: false,
message: '',
severity: 'success', // success | error | warning | info
});

const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
};

const handleRequestAdmin = async () => {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/api/request-admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid: user.uid,
            email: user.email
        })
        });

        const data = await res.json();

        if (res.ok) {
            showSnackbar("Admin request sent!");
        } else {
            showSnackbar(data.message || "Failed to send request", 'error');
        }
    } catch (error) {
        console.error("Error sending admin request:", error);
        showSnackbar("Something went wrong", 'error');
    } finally {
        setLoading(false);
    }
    };


    return (
    <>
    {loading ? (
            <Box display="flex" justifyContent="center" mt={3}>
              <CircularProgress sx={{ color: theme.palette.custom.darkGreen }}/>
            </Box>) :
      (<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button 
          onClick={handleRequestAdmin}
          variant="contained"
          disabled={role === 'admin' || user?.adminRequestStatus === "pending"}
          sx={{
            backgroundColor: theme.palette.custom.darkGreen,      
            color: theme.palette.custom.white,                 
            "&:hover": {
              backgroundColor: theme.palette.custom.mediumGreen,   
            },
            textTransform: "none",
            fontWeight: 400,
            marginTop: 1,
          }}
          >
            Request to be an Admin
        </Button>
      </Box>)
  }
      <Snackbar
        open={snackbar.open}
        autoHideDuration={30000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: '80px' }}
    >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
        </Alert>
    </Snackbar>
    </>
    );
}

export default RequestAdmin;