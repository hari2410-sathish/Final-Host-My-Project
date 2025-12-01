import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useResume } from "../ResumeContext";

export default function AISummary() {
  const { setField } = useResume();
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    // Simulated AI text — replace with actual API if needed
    const fakeAI = `
A highly motivated and results-driven professional with a strong background in modern technologies and proven experience in delivering high-quality solutions. Demonstrates exceptional problem-solving skills, strong communication, and the ability to adapt quickly in fast-paced environments.
`;

    setTimeout(() => {
      setField("summary", fakeAI.trim());
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        onClick={generate}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={20} /> : "Generate AI Summary"}
      </Button>
    </Box>
  );
}
