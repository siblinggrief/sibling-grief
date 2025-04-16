import React from "react";
import { Typography, Container, Box } from "@mui/material";

const About = () => {
  return (
    <>
      {/* Quote Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `url('https://griefsibling.wordpress.com/wp-content/uploads/2025/02/background.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 20px",
          color: "white",
          textAlign: "center",
          position: "relative",
          marginBottom: 4,
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay for readability
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
          <Typography variant="h6" sx={{ fontStyle: "italic" }}>
            “Grief, I’ve learned, is really just love. It’s all the love you want to give, but cannot.
            All that unspent love gathers up in the corners of your eyes, the lump in your throat,
            and in that hollow part of your chest. Grief is just love with no place to go.”
          </Typography>
          <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
            – Jamie Anderson
          </Typography>
        </Box>
      </Box>

      {/* Main About Content */}
      <Container>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Hello.

          I’m Mathura, a high school student. Whenever I used to introduce myself, I used to add in who I lived with without a second thought – my mom, my dad, my grandma, and my brother.
          <br /> <br />
          When I lost him, a huge part of my identity was lost as well. This person – who I grew up with, who I took care of, who I had laughed and cried with, who I knew just as intrinsically as I knew myself – was simply gone. Throughout my life, I had walked with my arm around his shoulders, pulling him close and ambling along. I didn’t realize how much I leaned on him until I didn’t have his support anymore.
          <br /> <br />
          And this grief, I’ve found, is unique. I do not relate to the way my parents grieve him. I do not relate to the way his friends grieve him. I don’t quite fit the way that people expect me to grieve him either – so many adults have come and told me to hug them and cry, and I just couldn’t do it. I don’t like talking about it to friends either, considering they haven’t experienced anything like this.
          <br /> <br />
          Even the Internet tends to give the same, familiar “be kind to yourself,” “rest well,” or “spend time with family,” answers. If you try to go deeper, search for sibling grief resources, there isn’t much; most of it is focused on parent-child grief and other types. Siblings tend to be the forgotten mourners.
          <br /> <br />
          And when everyone thinks that you should be experiencing grief in one way and you aren’t, it’s easy to start thinking that you’re the one who’s somehow wrong. It’s very isolating.
          <br /> <br />
          This is why I wanted to create Firefly. It came from a desire to share my story the way I saw it, with other people who can understand. Firefly is a space where grieving siblings can find understanding, support, and hope.
          <br /> <br />
          Whether you’ve just experienced your loss or are further along in your grief journey, know that you aren’t walking this path alone. Your story matters, your grief matters, and there’s a community here ready to stand with you.
        </Typography>
      </Container>
    </>
  );
};

export default About;
