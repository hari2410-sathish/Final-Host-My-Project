// TemplateMedium.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateMedium({ data, theme }) {
  if (!data) return null;
  const accent = theme === "blue" ? "#0ea5e9" : theme === "green" ? "#10b981" : theme === "dark" ? "#111827" : "#0ea5e9";

  return (
    <Box sx={{ width: 794, minHeight: 1123, bgcolor: "white", p: 4, mx: "auto", borderRadius: 2, boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>{data.name}</Typography>
          <Typography color="gray">{data.title}</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography>{data.email}</Typography>
          <Typography>{data.phone}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: accent }} />

      <Typography fontWeight={700}>Summary</Typography>
      <Typography mb={2}>{data.summary}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={700}>Skills</Typography>
      <Box component="ul" sx={{ pl: 3 }}>
        {data.skills.map((s, i) => <li key={i}>{s}</li>)}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={700}>Experience</Typography>
      {data.experience.map((exp, i) => (
        <Box key={i} sx={{ mb: 1 }}>
          <Typography fontWeight={700}>{exp.role} — {exp.company}</Typography>
          <Typography color="gray">{exp.year}</Typography>
          <Typography>{exp.details}</Typography>
        </Box>
      ))}
    </Box>
  );
}
