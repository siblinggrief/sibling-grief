// components/SortDropdown.js
import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SortDropdown = ({ sortOption, setSortOption }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
        <InputLabel
          id="sort-label"
          sx={{
            marginLeft: '-10px',
            color: theme.palette.mode === "dark" ? theme.palette.custom.white : theme.palette.custom.darkGreen,
          }}
        >
          Sort By
        </InputLabel>
        <Select
          labelId="sort-label"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Sort By"
           sx={{
              backgroundColor: theme.palette.custom.darkGreen,
              color: theme.palette.custom.white,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.custom.darkGreen,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.custom.darkGreen,
              },
               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '0px',
              },
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '4px',
              marginTop: '10px',
            }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="mostReactions">Most Reactions</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
