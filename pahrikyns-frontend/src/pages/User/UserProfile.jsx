import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 26,
          fontWeight: 700,
          mb: 3,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        My Profile
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 600,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(0,255,255,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#7b3fe4",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </Box>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          value={form.name}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={form.email}
          sx={inputStyle}
        />

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            fontWeight: 700,
          }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}

const inputStyle = {
  mb: 2,
  input: { color: "white" },
  label: { color: "#cbd5e1" },
  fieldset: { borderColor: "rgba(255,255,255,0.2)" },
};
