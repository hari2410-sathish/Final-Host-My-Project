import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateSimple({ data }) {
  if (!data) return null;

  return (
    <Box
      sx={{
        width: "794px",
        minHeight: "1123px",
        bgcolor: "white",
        mx: "auto",
        p: 4,
        borderRadius: "6px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        {data.name}
      </Typography>
      <Typography color="gray">{data.title}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>Email: {data.email}</Typography>
      <Typography>Phone: {data.phone}</Typography>
      <Typography>Location: {data.location}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* SUMMARY */}
      <Typography fontWeight={700} mb={1}>Summary</Typography>
      <Typography mb={2}>{data.summary}</Typography>

      <Divider sx={{ my: 2 }} />

      {/* SKILLS */}
      <Typography fontWeight={700} mb={1}>Skills</Typography>
      <ul>
        {data.skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <Divider sx={{ my: 2 }} />

      {/* EXPERIENCE */}
      <Typography fontWeight={700} mb={1}>Experience</Typography>

      {data.experience.map((exp, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography fontWeight={700}>{exp.role}</Typography>
          <Typography>{exp.company}</Typography>
          <Typography color="gray">{exp.year}</Typography>
          <Typography>{exp.details}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* EDUCATION */}
      <Typography fontWeight={700} mb={1}>Education</Typography>

      {data.education.map((edu, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography fontWeight={700}>{edu.degree}</Typography>
          <Typography>{edu.institute}</Typography>
          <Typography color="gray">{edu.year}</Typography>
        </Box>
      ))}
    </Box>
  );
}
