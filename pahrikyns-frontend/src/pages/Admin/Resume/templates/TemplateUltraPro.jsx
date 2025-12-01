import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function TemplateUltraPro({ data, theme }) {
  if (!data) return null;

  const accent =
    theme === "blue"
      ? "#0284c7"
      : theme === "green"
      ? "#059669"
      : theme === "dark"
      ? "#0f172a"
      : "#2563eb";

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        bgcolor: "white",
        p: 4,
        mx: "auto",
        borderRadius: 2,
        boxShadow: "0 0 12px rgba(0,0,0,0.12)",
        display: "flex",
        gap: 3,
      }}
    >
      {/* LEFT COLUMN */}
      <Box sx={{ width: "32%" }}>
        <Box sx={{ borderLeft: `5px solid ${accent}`, pl: 2, mb: 3 }}>
          <Typography variant="h4" fontWeight={900}>
            {data.name}
          </Typography>
          <Typography color="gray">{data.title}</Typography>
        </Box>

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: accent, mb: 1 }}
        >
          Contact
        </Typography>
        <Typography>{data.email}</Typography>
        <Typography>{data.phone}</Typography>
        <Typography mb={3}>{data.location}</Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: accent, mb: 1 }}
        >
          Skills
        </Typography>
        <Box sx={{ pl: 2 }}>
          {data.skills.map((s, i) => (
            <Typography key={i}>• {s}</Typography>
          ))}
        </Box>
      </Box>

      {/* RIGHT COLUMN */}
      <Box sx={{ flex: 1 }}>
        {/* Summary */}
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{ color: accent, mb: 1 }}
        >
          Professional Summary
        </Typography>
        <Typography mb={3}>{data.summary}</Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Experience */}
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{ color: accent, mb: 1 }}
        >
          Experience
        </Typography>

        {data.experience.map((exp, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Typography fontWeight={700}>{exp.role}</Typography>
            <Typography color="gray">
              {exp.company} — {exp.year}
            </Typography>
            <Typography>{exp.details}</Typography>
          </Box>
        ))}

        <Divider sx={{ mb: 3 }} />

        {/* Education */}
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{ color: accent, mb: 1 }}
        >
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
