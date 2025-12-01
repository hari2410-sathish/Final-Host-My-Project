// TemplatePro.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplatePro({ data, theme }) {
  if (!data) return null;
  const accent = theme === "blue" ? "#0ea5e9" : theme === "green" ? "#10b981" : theme === "dark" ? "#111827" : "#0ea5e9";

  return (
    <Box sx={{ width: 794, minHeight: 1123, bgcolor: "white", p: 5, mx: "auto", borderRadius: 2 }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ width: "65%" }}>
          <Typography variant="h4" fontWeight={900}>{data.name}</Typography>
          <Typography color="gray">{data.title}</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>{data.email}</Typography>
          <Typography>{data.phone}</Typography>
          <Typography>{data.location}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: accent }} />

      <Typography fontWeight={800}>Profile</Typography>
      <Typography mb={2}>{data.summary}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={800}>Experience</Typography>
      {data.experience.map((exp, i) => (
        <Box key={i} sx={{ mb: 1 }}>
          <Typography fontWeight={700}>{exp.role}</Typography>
          <Typography color="gray">{exp.company} • {exp.year}</Typography>
          <Typography>{exp.details}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={800}>Education</Typography>
      {data.education.map((edu, i) => (
        <Box key={i}>
          <Typography fontWeight={700}>{edu.degree}</Typography>
          <Typography color="gray">{edu.institute} • {edu.year}</Typography>
        </Box>
      ))}
    </Box>
  );
}
