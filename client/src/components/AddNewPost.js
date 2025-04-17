import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import PostModal from "./PostModal";
import API_URL from "../config";
import { useAuth } from "../context/AuthContext";

const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const AddNewPost = ({ onPostAdded }) => {
  const { user: { displayName, photoURL } } = useAuth();

  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setAudioBlob(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

      mediaRecorder.onstop = () => {
        const audioFile = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(audioFile);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const uploadAudioToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    formData.append("resource_type", "raw");
    formData.append("folder", "Sibling Grief Audio Posts");

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Cloudinary upload failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading audio to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
  setFormError(""); // Clear old errors

  if (!title.trim()) {
    setFormError("Title is required.");
    return;
  }

  if (!description.trim() && !audioBlob) {
    setFormError("Please provide either a description or record audio.");
    return;
  }

  if (description.trim() && audioBlob) {
    setFormError("Please share either a description or an audio, not both.");
    return;
  }

  setIsSaving(true);

  let audioUrl = null;
  let audioDuration = null;

  if (audioBlob) {
    const audioData = await uploadAudioToCloudinary(audioBlob);
    if (audioData) {
      ({ secure_url: audioUrl, duration: audioDuration } = audioData);
    }
  }

  try {
    const payload = {
      title,
      topics: selectedTopics,
      displayName,
      photoURL,
    };

    if (description.trim()) {
      payload.description = description.trim();
    } else if (audioUrl) {
      payload.audioUrl = audioUrl;
      payload.audioDuration = audioDuration;
    }

    const response = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to add post");

    onPostAdded();
    handleClose();
  } catch (error) {
    console.error("Error adding post:", error);
    setFormError("Something went wrong. Please try again.");
  } finally {
    setIsSaving(false);
  }
};

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Add New Post
        </Button>
      </Box>

      {/* Reusable PostModal */}
      <PostModal
        open={open}
        onClose={handleClose}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        isSaving={isSaving}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        audioBlob={audioBlob}
        setAudioBlob={setAudioBlob}
        handleSubmit={handleSubmit}
        formError={formError}
        setFormError={setFormError}
      />
    </>
  );
};

export default AddNewPost;
