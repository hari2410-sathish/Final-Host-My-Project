import React from "react";
import { Box, Typography } from "@mui/material";
import TemplateSimple from "./TemplateSimple";

export default function ResumeSimple() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Simple Resume Template
      </Typography>

      <TemplateSimple />
    </Box>
  );
}
