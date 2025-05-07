import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Typography,
  useTheme,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Avatar,
  Button
} from "@mui/material";
import { ArrowBack, Mic } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import styles from "./PostModal.module.css";

const PostModal = ({
  open,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  selectedTopics,
  setSelectedTopics,
  isSaving,
  isRecording,
  startRecording,
  stopRecording,
  audioBlob,
  setAudioBlob,
  handleSubmit,
  formError,
  setFormError,
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;

  const [voiceOnly, setVoiceOnly] = useState(false);

  const handleVoiceToggle = (e) => {
    setFormError(""); // Clear any previous error message
    const isChecked = e.target.checked;
    setVoiceOnly(isChecked);
  
    if (isChecked) {
      setDescription(""); // Clear text when switching to voice
    } else {
      if (audioBlob) {
        URL.revokeObjectURL(audioBlob);
      }
      if (typeof setAudioBlob === "function") {
        setAudioBlob(null); // Clear audio when switching back to text
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#f5f5f5",
          color: "black",
        },
      }}
    >
      <DialogContent className={styles.modalPaper}>
        {/* Header */}
        <Box className={styles.header}>
          <IconButton onClick={onClose}>
            <ArrowBack />
          </IconButton>
          {photoURL && <Avatar src={photoURL} referrerPolicy="no-referrer"/>}
          <Typography variant="subtitle1">{displayName || "User"}</Typography>
        </Box>

        <Typography variant="h6" mt={2}>Share your story</Typography>

        {/* Title */}
        <Box className={styles.twoColumn}>
          <Typography className={styles.label}>Title:</Typography>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputBox}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                style: {
                  color: theme.palette.text.black, // Use black for typed text
                },
              },
              notchedOutline: {
                style: {
                  borderColor: theme.palette.text.black, // Default border
                },
              },
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = theme.palette.text.black;
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = ""; // Reset
            }}
          />
        </Box>

        {/* Topics */}
        <Box className={styles.twoColumn}>
          <Typography className={styles.label}>Select Topics:</Typography>
          <FormGroup row className={styles.checkboxGroup}>
            {["Memory", "Story", "Today", "Vent", "Achievement"].map((topic) => (
              <FormControlLabel
                key={topic}
                control={
                  <Checkbox
                    checked={selectedTopics.includes(topic)}
                    onChange={() =>
                      setSelectedTopics((prev) =>
                        prev.includes(topic)
                          ? prev.filter((t) => t !== topic)
                          : [...prev, topic]
                      )
                    }
                  />
                }
                label={topic}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Voice Only Toggle */}
        <Box className={styles.twoColumn}>
          <Typography className={styles.label}>Do you want to voice record instead of text?</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={voiceOnly}
                onChange={handleVoiceToggle}
              />
            }
            label="Yes"
          />
        </Box>

        {/* Description */}
        {!voiceOnly && (
          <Box className={styles.twoColumn}>
            <Typography className={styles.label}>What would you like to share?</Typography>
            <TextField
              multiline
              minRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              className={styles.inputBox}
              slotProps={{
                input: {
                  style: {
                    color: theme.palette.text.black, // Use black for typed text
                  },
                },
                notchedOutline: {
                  style: {
                    borderColor: theme.palette.text.black, // Default border
                  },
                },
              }}
              onFocus={(e) => {
                e.target.parentElement.style.borderColor = theme.palette.text.black;
              }}
              onBlur={(e) => {
                e.target.parentElement.style.borderColor = ""; // Reset
              }}
            />
          </Box>
        )}

        {/* Recording Section */}
        {voiceOnly && (
          <Box className={styles.twoColumn}>
            <Typography className={styles.label}>What would you like to share?</Typography>
            <Box>
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className={styles.recordButton}
                startIcon={<Mic />}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              {isRecording && (
                <Typography mt={1} variant="body2" color="secondary">
                  Recording in progress...
                </Typography>
              )}
              {audioBlob && (
                <Typography mt={1} variant="body2" color="success.main">
                  Audio recorded. Ready to upload.
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {formError && <div className={styles.error}>{formError.includes("log in") ? (
                        <>
                          Please <Link to="/login">log in</Link> to share a post.
                        </>
                      ) : (
                        formError
                      )}</div>}

        {/* Action Buttons */}
        <Box className={styles.actions}>
        <Button
            onClick={onClose}
            disabled={isSaving}
            className={styles.borderButton}
            sx={{
              color: theme.palette.text.black,
              backgroundColor: theme.palette.action.disabled, // Default light grey background
              "&:hover": {
                backgroundColor: theme.palette.grey[200], // Light grey background on hover
              },
              "&.Mui-disabled": {
                backgroundColor: theme.palette.grey[300], // Disabled state background color
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || isSaving || (voiceOnly && !audioBlob)}
            className={`${styles.borderButton} ${!title.trim() || isSaving || (voiceOnly && !audioBlob) ? styles.submitButtonDisabled : styles.submitButtonEnabled}`}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;