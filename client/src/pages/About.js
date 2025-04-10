import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
      Sibling Grief Support is a gentle space created for those navigating the loss of a sibling. Here, you can share memories, express emotions, or simply be heard — through both voice and text posts. Whether you choose to speak or write, every story matters.
      <br /><br />
      You can browse posts, offer support through upvotes, or share your own reflections. This is a space for connection, remembrance, and healing — at your own pace, in your own words. You're not alone here.
      </Typography>
    </Container>
  );
};

export default About;
