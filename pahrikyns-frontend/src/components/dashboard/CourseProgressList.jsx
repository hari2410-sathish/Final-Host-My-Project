import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function CourseProgressList() {
  const demoCourses = [
    { title: "AWS Basics", progress: 40 },
    { title: "Docker Mastery", progress: 70 },
    { title: "Linux Shell Scripting", progress: 25 },
  ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,255,255,0.15)",
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 2, color: "#e2e8f0" }}>
        Continue Learning
      </Typography>

      {demoCourses.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: "#94a3b8", mb: 1 }}>{c.title}</Typography>
            <LinearProgress
              variant="determinate"
              value={c.progress}
              sx={{
                height: 8,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                },
              }}
            />
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
