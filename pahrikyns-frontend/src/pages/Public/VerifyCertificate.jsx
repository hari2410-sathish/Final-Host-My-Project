import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useParams } from "react-router-dom";

// Stub — replace backend later
async function fetchCertData(id) {
  const demo = {
    CERT1001: {
      id: "CERT1001",
      studentName: "Hari Sathish",
      course: "DevOps Mastery",
      date: "2025-02-14",
      score: 94,
      status: "active",
    },
  };
  return demo[id] || null;
}

export default function VerifyCertificate() {
  const { certId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCertData(certId).then(setData);
  }, [certId]);

  if (!data)
    return (
      <Box sx={{ p: 4, color: "white" }}>
        Certificate not found or invalid.
      </Box>
    );

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Certificate Verification
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <b>ID:</b> {data.id}
        </Typography>

        <Typography>
          <b>Student:</b> {data.studentName}
        </Typography>

        <Typography>
          <b>Course:</b> {data.course}
        </Typography>

        <Typography>
          <b>Date:</b> {data.date}
        </Typography>

        <Typography>
          <b>Status:</b> {data.status}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => window.print()}
            sx={{ fontWeight: 700 }}
          >
            Print / Save as PDF
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
