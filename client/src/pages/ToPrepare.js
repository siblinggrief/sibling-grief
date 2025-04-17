import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const questions = [
  {
    question: "How are you holding up?",
    answers: [
      "I’m taking things one day at a time, but I appreciate you checking in.",
      "Some days are harder than others, but it means a lot that you asked.",
    ],
  },
  {
    question: "Is there anything I can do for you?",
    answers: [
      "Thank you for offering. Having someone to just listen really helps right now.",
      "I’m not sure what I need yet, but it’s comforting to know I can reach out if something comes up.",
    ],
  },
  {
    question: "Do you want to talk about what happened?",
    answers: [
      "I’m not quite ready yet, but I appreciate you being here when I am.",
      "I’d like to share a bit, but please be patient if I get emotional.",
    ],
  },
  {
    question: "Why are you still upset? It happened a while ago.",
    answers: [
      "Grief can stick around for a long time, but I’m working through it as best I can.",
      "I’m dealing with it at my own pace. Thank you for understanding.",
    ],
  },
  {
    question: "Are you okay to come to this family event?",
    answers: [
      "I’d like to be there, but I might need a quiet space if it gets overwhelming.",
      "I appreciate the invitation. I’ll do my best to come, but I might not stay the entire time.",
    ],
  },
  {
    question: "Why don’t you seem like yourself lately?",
    answers: [
      "I’m still adjusting to the loss and it’s affecting my mood. I’m grateful for your patience.",
      "I’m working through a lot of emotions, and it’ll take some time to feel like myself again.",
    ],
  },
  {
    question: "Do you want to go out and have fun with us?",
    answers: [
      "I’d love to, but I’m not sure how I’ll feel. Let’s see how the day goes.",
      "Thank you for inviting me. I’m going to try—getting out might help me take my mind off things.",
    ],
  },
  {
    question: "How can I support you during this tough time?",
    answers: [
      "Just being there and listening when I need to talk is really supportive.",
      "It helps when people offer gentle encouragement without pushing me too hard.",
    ],
  },
  {
    question: "It must be tough; do you ever feel like it’s getting easier?",
    answers: [
      "Every day is different. Sometimes it feels more manageable, and other days are still hard.",
      "I have moments where it’s less painful, but I’m still learning to cope.",
    ],
  },
  {
    question: "Are you seeing a counselor or getting help?",
    answers: [
      "Yes, I’m talking to someone, and it’s been helpful so far.",
      "Not yet, but I’m considering it. Thanks for your concern.",
    ],
  },
];

const ToPrepare = () => {
  const theme = useTheme();

  return (
    <Box sx={{ px: 3, py: 4, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", color: theme.palette.success.main }}
      >
        Navigating Grief: Responses to Common Questions
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
        When you’re going through grief, you never know when or where it’s going to hit you. You may be in a line in a grocery store and remember how they used to play with your sibling in such lines in the past. When your friend talks about some favorite movie or TV series or a toy or a video game, it could trigger a wave of emotions about your sibling.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
        And sometimes? People just tend to be overbearing. They want to help in any way they can, but sometimes it’s just too much. There is one more thing I’d like to mention; these people ask these questions because they care. I have not met a single person who was asking just out of formality. You are not a burden to them – if you want to talk to someone in person, please do. Firefly is a space for you to talk about grief, but a warm hug can mean so much.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
        I, personally, wasn’t ready to share much about my brother or how I was doing for months, so here are some tough questions people asked me, and some easy ways to respond:
      </Typography>

      {questions.map((item, index) => (
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
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.success.main,
              mb: 1,
            }}
          >
            {item.question}
          </Typography>
          <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
            {item.answers.map((answer, idx) => (
              <li key={idx} style={{ marginBottom: "0.6rem", lineHeight: 1.5 }}>
                {answer}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default ToPrepare;
