import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import PostModal from "./PostModal";
import API_URL from "../config";

const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const AddNewPost = ({ onPostAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    if (!title.trim()) return;

    setIsSaving(true);
    let audioData = audioBlob ? await uploadAudioToCloudinary(audioBlob) : null;

    let audioUrl = null;
    let audioDuration = null;

    if (audioData) {
      ({ secure_url: audioUrl, duration: audioDuration } = audioData);
    }

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, audioUrl, audioDuration }),
      });

      if (!response.ok) throw new Error("Failed to add post");

      onPostAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding post:", error);
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
        isSaving={isSaving}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        audioBlob={audioBlob}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddNewPost;
