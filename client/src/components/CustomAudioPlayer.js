import React, { useState, useRef } from 'react';
import { FaHeadphones } from 'react-icons/fa';
import { Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';

const CustomAudioPlayer = ({ audioUrl, audioDuration }) => {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shouldApplyFullWidth = !isMobile;


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
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton onClick={handleToggleVisibility} sx={{ color:  theme.palette.mode === "dark" ? theme.palette.custom.lightGreen : theme.palette.custom.darkGreen }}>
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
            {isVisible ? `Hide Audio` : `Listen to Audio`}
          </Typography>
          <Typography variant="caption" sx={{ color:  theme.palette.mode === "dark" ? theme.palette.custom.lightGreen : theme.palette.custom.darkGreen }}>
            {audioDuration} {`s`}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          height: 'auto', // Set this to the height of the audio controls
        }}
      >
        <audio
          ref={audioRef}
          controls
          style={{
            height: '40px', // Match this to the container's height
            display: isVisible ? 'block' : 'none',         
          }}
        >
          <source src={audioUrl} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      </Box>
    </Box>
  );
};

export default CustomAudioPlayer;
