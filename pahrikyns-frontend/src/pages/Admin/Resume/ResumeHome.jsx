import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const templates = [
  { id: "simple", name: "Simple Template" },
  { id: "medium", name: "Medium Template" },
  { id: "pro", name: "Pro Template" },
  { id: "master", name: "Master Template" },
  { id: "ultra", name: "Ultra Pro Template" }
];

export default function ResumeHome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Choose a Resume Template
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {templates.map((t) => (
          <Paper
            key={t.id}
            sx={{
              p: 3,
              width: 240,
              textAlign: "center",
              bgcolor: "#0f172a",
              color: "white",
              border: "1px solid #1e293b",
              borderRadius: 2
            }}
          >
            <Typography fontWeight={700}>{t.name}</Typography>

            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/admin/resume/builder/${t.id}`)}
            >
              Use Template
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
