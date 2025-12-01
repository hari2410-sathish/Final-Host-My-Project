import { Box, Typography, Paper } from "@mui/material";

export default function ResumeMaster() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Master Resume Template
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "#0b0f17", border: "1px solid #1d2635" }}>
        <Typography variant="body1" color="white">
          Master Resume Template Editor (Admin Side)
        </Typography>
      </Paper>
    </Box>
  );
}
