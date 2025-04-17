import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const sections = [
  {
    title: "Offer Emotional Support",
    points: [
      "Let them know you’re there: Sometimes just saying, “I’m here if you need to talk,” can be reassuring.",
      "Give them space: Parents might grieve differently than you do. Be patient and understanding.",
      "Show love in simple ways: A hug, a kind word, or sitting together in silence can provide comfort.",
    ],
  },
  {
    title: "Help with Everyday Tasks",
    points: [
      "Take on small household responsibilities: Doing chores, preparing meals, or helping with younger siblings can ease their burden.",
      "Run small errands: If possible, offer to help with groceries or organizing things at home.",
      "Keep routines as normal as possible: Maintaining a sense of structure can be helpful for everyone.",
    ],
  },
  {
    title: "Communicate Openly and Honestly",
    points: [
      "Share your feelings: It’s okay to let your parents know if you’re struggling too.",
      "Ask how they are doing: A simple “How are you holding up?” can mean a lot.",
      "Set boundaries: If you need space to process your grief, let them know kindly.",
    ],
  },
  {
    title: "Encourage Self-Care",
    points: [
      "Remind them to rest and eat properly.",
      "Suggest taking a walk together or doing an activity they enjoy.",
      "If needed, encourage professional support, like therapy or counseling.",
    ],
  },
  {
    title: "Find Ways to Remember Together",
    points: [
      "Share happy memories of your sibling.",
      "Light a candle, plant a tree, or create a small memorial as a family.",
      "Participate in traditions or create new ways to honor your sibling’s memory.",
    ],
  },
];

const ToCare = () => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 3, py: 4, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
          color: theme.palette.success.main,
        }}
      >
        Helping Care Through Grief
      </Typography>

      <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
        This page is about helping to take care of your family through grief. However, I would like to start off with this – <strong>you are not obligated to take care of anyone else.</strong>
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
        During a time where my world was falling apart, countless people – grown adults – were telling me I, a fourteen year old, had to keep myself together to support my parents. Somehow, I did. Yet, for months afterwards, I could hear the sounds of their sobs echoing in my ears, wherever I went. Sometimes, I still do. I was not ready to hold all of my pain and shoulder some of theirs as well. Hence, from my own experience, I would like to emphasize that, no matter what others may say, you are not obligated to take care of anyone else before you take care of yourself. I can promise you that the few hours you take to decompress and let yourself breathe does not mean you are failing anybody.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
        At the same time, it’s incredibly difficult to watch your family and feel like you aren’t doing enough to help them. It can also give a new sense of purpose; you may feel more empowered in your own healing by knowing that you could support the people you love. If, and only if, you are comfortable and ready to support others, please go ahead.
      </Typography>

      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            mb: 3,
            px: 2,
            py: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: theme.palette.success.main,
              fontWeight: 600,
            }}
          >
            {index + 1}. {section.title}
          </Typography>
          <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
            {section.points.map((point, idx) => (
              <li key={idx} style={{ marginBottom: "0.6rem", lineHeight: 1.5 }}>
                {point}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default ToCare;
