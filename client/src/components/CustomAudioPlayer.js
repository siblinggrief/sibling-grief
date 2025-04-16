import React, { useState, useRef } from 'react';
import { FaHeadphones } from 'react-icons/fa';
import { Typography, Box, IconButton } from '@mui/material';

const CustomAudioPlayer = ({ audioUrl, audioDuration }) => {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton onClick={handleToggleVisibility} sx={{ color: 'primary.main' }}>
          <FaHeadphones />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, cursor: 'pointer' }}
            onClick={handleToggleVisibility}
          >
            Listen to Audio
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {audioDuration}
          </Typography>
        </Box>
      </Box>

      {isVisible && (
        <Box sx={{ flex: 1 }}>
          <audio
            ref={audioRef}
            controls
            style={{ width: '100%' }}
          >
            <source src={audioUrl} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
    </Box>
  );
};

export default CustomAudioPlayer;
