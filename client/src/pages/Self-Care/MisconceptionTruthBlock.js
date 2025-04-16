import { Typography, Box, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MisconceptionTruthBlock = () => {
  const theme = useTheme();

  const truths = [
    {
      misconception: "If I focus on myself, I’m ignoring my loved one’s memory.",
      truth: "Self-care is about honoring yourself and the love you shared, not erasing memories.",
    },
    {
      misconception: "Grief should naturally resolve; self-care is unnecessary.",
      truth: "Without active self-care, grief can turn into prolonged grief disorder, which affects mental and physical health.",
    },
    {
      misconception: "Grieving is about suffering; if I take care of myself, I’m not grieving properly.",
      truth: "Self-care doesn’t lessen the grief—it strengthens your ability to carry it in a healthier way.",
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      {truths.map(({ misconception, truth }, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontStyle="italic"
            sx={{ ml: 3, mb: 1 }}
          >
            {`“${misconception}”`}
          </Typography>

          <Box
            sx={{
              backgroundColor: theme.palette.success.light,
              padding: 2,
              borderRadius: 1,
              borderLeft: `5px solid ${theme.palette.success.main}`,
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            <CheckCircleIcon
              sx={{ color: theme.palette.success.main, mt: "2px" }}
            />
            <Typography variant="body2">
              <strong>Truth:</strong> {truth}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MisconceptionTruthBlock;
