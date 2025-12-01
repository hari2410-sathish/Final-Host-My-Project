import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../ResumeContext";

const swatches = [
  { id: "default", color: "#3b82f6" },
  { id: "blue", color: "#0ea5e9" },
  { id: "green", color: "#10b981" },
  { id: "dark", color: "#111827" },
];

export default function ThemeSwatches() {
  const { resume, setField } = useResume();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {swatches.map((s) => (
        <Box
          key={s.id}
          onClick={() => setField("theme", s.id)}
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: s.color,
            cursor: "pointer",
            outline: resume.theme === s.id ? "3px solid #fff" : "2px solid #666",
          }}
        />
      ))}
    </Box>
  );
}
