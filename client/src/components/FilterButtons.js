import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

const FilterButtons = ({ filter, setFilter }) => {
  const theme = useTheme();
  const darkGreen = theme.palette.custom.darkGreen;
  const mediumGreen = theme.palette.custom.mediumGreen;
  const isDarkMode = theme.palette.mode === 'dark';

  const buttons = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" }
  ];

  return (
    <Box mb={2} display="flex" flexWrap="wrap" gap={2}>
      {buttons.map(({ label, value }) => {
        const isActive = filter === value;
        return (
          <Button
            key={value}
            variant={isActive ? "contained" : "outlined"}
            onClick={() => setFilter(value)}
            sx={{
              backgroundColor: isActive ? darkGreen : "transparent",
              color: isActive
                ? "#ffffff"
                : isDarkMode
                ? theme.palette.custom.white
                : darkGreen,
              borderColor: darkGreen,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: isActive
                  ? mediumGreen
                  : `${mediumGreen}1A`, // 10% opacity
              },
            }}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
};

export default FilterButtons;
