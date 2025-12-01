import React from "react";
import { Box, Button, Avatar } from "@mui/material";
import { useResume } from "../ResumeContext";

export default function PhotoUpload() {
  const { resume, uploadPhoto } = useResume();

  return (
    <Box sx={{ mb: 3 }}>
      <Avatar
        src={resume.photo}
        sx={{ width: 120, height: 120, mb: 2, mx: "auto" }}
      />

      <label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => uploadPhoto(e.target.files[0])}
        />
        <Button variant="contained" component="span" fullWidth>
          Upload Photo
        </Button>
      </label>
    </Box>
  );
}
