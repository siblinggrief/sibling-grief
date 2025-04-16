import React from "react";
import { Container, Typography, Box, useTheme } from "@mui/material";
import MisconceptionTruthBlock from "./Self-Care/MisconceptionTruthBlock";
import SelfCareTips from "./Self-Care/SelfCareTips";

const SelfCare = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom>
        Self-Care
      </Typography>

      <Typography variant="body1" paragraph>
        Grieving is an emotionally, mentally, and physically demanding process.
        Self-care during this period is not a luxury but a necessity, as it helps
        people regulate emotions, reduce stress, and navigate their loss in a healthy way.
        Without self-care, grief can lead to chronic stress, depression, and even physical health issues.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Common Misconceptions About Self-Care in Grief
      </Typography>

      <MisconceptionTruthBlock />

      <Typography variant="h6" gutterBottom>
        Here are some ways to get out your emotions:
      </Typography>

      <SelfCareTips />

      <Typography variant="body1" paragraph>
        My personal favorites are <strong>#1</strong> and <strong>#3</strong>. Getting my emotions onto paper
        is, in a way, therapeutic, and a quick walk outside always helps me think clearly.
      </Typography>
    </Container>
  );
};

export default SelfCare;
