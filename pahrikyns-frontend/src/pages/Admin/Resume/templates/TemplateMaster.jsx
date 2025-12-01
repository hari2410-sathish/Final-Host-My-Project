import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateMaster({ data, theme }) {
  if (!data) return null;

  const accent =
    theme === "blue"
      ? "#0ea5e9"
      : theme === "green"
      ? "#10b981"
      : theme === "dark"
      ? "#111827"
      : "#3b82f6";

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        display: "flex",
        bgcolor: "white",
        borderRadius: 2,
        mx: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
          width: "28%",
          bgcolor: accent,
          color: "white",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={900}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1">{data.title}</Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <Box>
          <Typography fontWeight={700} mb={1}>
            Contact
          </Typography>
          <Typography>{data.email}</Typography>
          <Typography>{data.phone}</Typography>
          <Typography>{data.location}</Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <Box>
          <Typography fontWeight={700} mb={1}>
            Skills
          </Typography>
          {data.skills.map((s, i) => (
            <Typography key={i}>• {s}</Typography>
          ))}
        </Box>
      </Box>

      {/* RIGHT MAIN CONTENT */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography fontWeight={900} variant="h6" sx={{ color: accent }}>
          Profile Summary
        </Typography>
        <Typography mb={3}>{data.summary}</Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography fontWeight={900} variant="h6" sx={{ color: accent }}>
          Professional Experience
        </Typography>

        {data.experience.map((exp, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Typography fontWeight={700}>
              {exp.role} — {exp.company}
            </Typography>
            <Typography variant="caption" color="gray">
              {exp.year}
            </Typography>
            <Typography>{exp.details}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight={900} variant="h6" sx={{ color: accent }}>
          Education
        </Typography>

        {data.education.map((edu, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography fontWeight={700}>{edu.degree}</Typography>
            <Typography>
              {edu.institute} —{" "}
              <span style={{ color: "gray" }}>{edu.year}</span>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
