import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import ToggleButton from '@mui/icons-material/ToggleOff';
import { useTheme } from '@mui/material/styles';

const Toggle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const theme = useTheme();

  // Function to open modal with custom message
  const showModal = (message) => {
    setModalText(message);
    setOpenModal(true);
  };

  // Handler for the ToggleButton click
  const handleToggleClick = () => {
    showModal('This feature is still being developed.');
  };

  return (
    <div>
      {/* IconButton with enlarged ToggleButton */}
      <IconButton onClick={handleToggleClick}>
        <ToggleButton sx={{ fontSize: 40, color: 'white' }} /> {/* Make icon bigger and white */}
      </IconButton>

      {/* Modal dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Coming Soon</DialogTitle>
        <DialogContent>
          <Typography>{modalText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary" sx={{ color: theme.palette.text.secondary }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Toggle;
