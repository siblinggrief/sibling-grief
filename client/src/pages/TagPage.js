// src/pages/TagPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const TagPage = () => {
  const { tagName } = useParams();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Posts tagged with: {tagName}
      </Typography>
      {/* Your logic to fetch posts by tag */}
    </div>
  );
};

export default TagPage;