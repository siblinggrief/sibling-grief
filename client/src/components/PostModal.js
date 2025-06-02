import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  TextField,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
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
  recordingStatus,
  setRecordingStatus,
  startRecording,
  stopRecording,
  audioBlob,
  setAudioBlob,
  handleSubmit,
  formError,
  setFormError,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;

  const [voiceOnly, setVoiceOnly] = useState(false);
  const [isStartingRecording, setIsStartingRecording] = useState(false);

  const handleStartRecording = async () => {
    setRecordingStatus("starting");
    setIsStartingRecording(true);
    try {
      await startRecording(); // assume it's async
    } finally {
      setRecordingStatus("recording");
      setIsStartingRecording(false);
    }
  };

  const handleVoiceToggle = (e) => {
    setFormError(""); // Clear any previous error message
    if(!user) setFormError("Please log in to share a post.");
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

  // Reset all necessary states when the modal is closed
  useEffect(() => {
    if (!open) {
      setVoiceOnly(false);
      setDescription("");
      setSelectedTopics([]);
      setAudioBlob(null); // Reset audioBlob when modal is closed
      setFormError(""); // Clear any form errors
    }
  }, [open, setDescription, setSelectedTopics, setAudioBlob, setFormError]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
    >
      <DialogContent className={styles.modalPaper}
        sx={{
            backgroundColor: theme.palette.mode === "dark" 
              ? theme.palette.grey[900] 
              : theme.palette.background.default,
            color: theme.palette.text.primary,
          }}>
        {/* Header */}
        <Box className={styles.header}>
          <IconButton onClick={onClose}>
            <ArrowBack />
          </IconButton>
          {photoURL && <Avatar src={photoURL} referrerPolicy="no-referrer" />}
          <Typography variant="subtitle1">{displayName || ""}</Typography>
        </Box>

        <Typography variant="h6" mt={2}>Share your story</Typography>

        {/* Title */}
        <Box className={isMobile ? styles.singleColumn : styles.twoColumn}>
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
                  color: theme.palette.text.black,
                },
              },
              notchedOutline: {
                style: {
                  borderColor: theme.palette.text.black,
                },
              },
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = theme.palette.text.black;
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = "";
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
                    sx={{
                    color: theme.palette.mode === "dark" ? theme.palette.custom.white : undefined,
                    '&.Mui-checked': {
                      color: theme.palette.mode === "dark" ? theme.palette.custom.lightGreen : theme.palette.custom.darkGreen,
                    },
                  }}
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
                sx={{
                    color: theme.palette.mode === "dark" ? theme.palette.custom.white : undefined,
                    '&.Mui-checked': {
                      color: theme.palette.mode === "dark" ? theme.palette.custom.lightGreen : theme.palette.custom.darkGreen,
                    },
                }}
              />
            }
            label="Yes"
          />
        </Box>

        {/* Description */}
        {!voiceOnly && (
          <Box className={isMobile ? styles.singleColumn : styles.twoColumn}>
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
                    color: theme.palette.text.black,
                  },
                },
                notchedOutline: {
                  style: {
                    borderColor: theme.palette.text.black,
                  },
                },
              }}
              onFocus={(e) => {
                e.target.parentElement.style.borderColor = theme.palette.text.black;
              }}
              onBlur={(e) => {
                e.target.parentElement.style.borderColor = "";
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
                onClick={
                  recordingStatus === "recording" ? stopRecording : handleStartRecording
                }
                className={styles.recordButton}
                startIcon={
                  isStartingRecording ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <Mic />
                  )
                }
                disabled={!user || recordingStatus === "completed" || isStartingRecording}
              >
                {isStartingRecording
                  ? "Starting..."
                  : recordingStatus === "recording"
                  ? "Stop Recording"
                  : recordingStatus === "completed"
                  ? "Recording Complete"
                  : "Start Recording"}
              </Button>

              {recordingStatus === "recording" && (
                <Typography mt={1} variant="body2" color="secondary">
                  Recording in progress...
                </Typography>
              )}
              {recordingStatus === "completed" && (
                <Typography mt={1} variant="body2" color="success.main">
                  Audio recorded. Ready to upload.
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Form Error */}
        {formError && (
          <div className={styles.error}>
            {formError.includes("log in") ? (
              <>
                Please <Link to="/login">log in</Link> to share a post.
              </>
            ) : (
              formError
            )}
          </div>
        )}

        {/* Action Buttons */}
        <Box className={styles.actions}>
          <Button
            onClick={onClose}
            disabled={isSaving}
            className={styles.borderButton}
            sx={{
              color: theme.palette.custom.darkGreen,
              backgroundColor: theme.palette.custom.white,
              "&:hover": {
                backgroundColor: theme.palette.grey[200],
              },
              "&.Mui-disabled": {
                backgroundColor: theme.palette.grey[300],
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!user || !title.trim() || isSaving || (voiceOnly && !audioBlob)}
            sx={{
              backgroundColor: theme.palette.custom.darkGreen,
              color: theme.palette.custom.white,          
              "&:hover": {
                backgroundColor: theme.palette.custom.mediumGreen,
              },
              "&.Mui-disabled": {
                backgroundColor: theme.palette.grey[300],
                color: theme.palette.custom.darkGrey,
              },
            }}
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
