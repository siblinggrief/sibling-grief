import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, useTheme, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const PostModal = ({ open, onClose, title, setTitle, description, setDescription, selectedTopics, setSelectedTopics, isSaving, isRecording, startRecording, stopRecording, audioBlob, handleSubmit }) => {
  const theme = useTheme(); // Access the theme

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: theme.palette.background.default, // Use theme background
          color: theme.palette.text.primary, // Use theme text color
        },
      }}
    >
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Post Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            input: { color: theme.palette.text.primary }, // Use theme text color
          }}
        />

        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Select Topic:
          </Typography>
          <FormGroup row>
            {["Memory", "Story", "Today", "Vent", "Achievement"].map((topic) => (
              <FormControlLabel
                key={topic}
                control={
                  <Checkbox
                    checked={selectedTopics.includes(topic)}
                    onChange={() => {
                      setSelectedTopics((prev) =>
                        prev.includes(topic)
                          ? prev.filter((t) => t !== topic)
                          : [...prev, topic]
                      );
                    }}
                  />
                }
                label={topic}
              />
            ))}
          </FormGroup>
        </Box>

        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Recording Button */}
        <Box mt={2} textAlign="center">
          {isRecording ? (
            <Button onClick={stopRecording} variant="contained" color="secondary">
              Stop Recording
            </Button>
          ) : (
            <Button onClick={startRecording} variant="contained" color="primary">
              Start Recording
            </Button>
          )}
        </Box>

        {audioBlob && (
          <Box mt={2} textAlign="center" sx={{ color: theme.palette.success.main }}>
            Audio recorded. Ready to upload.
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isSaving} sx={{ color: theme.palette.error.light }}>
          Cancel
        </Button>
        <Button
          variant="darkContained"
          onClick={handleSubmit}
          disabled={!title.trim() || isSaving || audioBlob === null}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
