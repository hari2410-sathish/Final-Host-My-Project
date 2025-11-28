import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";

export default function AdminOTPVerify() {
  const { sendOtp, verifyOtp } = useContext(AdminAuthContext);

  // Email comes from login stage
  const savedEmail = sessionStorage.getItem("admin_email");

  const [email, setEmail] = useState(savedEmail || "");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState("email");

  const navigate = useNavigate();

  // Don't allow empty email
  useEffect(() => {
    if (!savedEmail) {
      alert("Email missing! Please login again.");
      navigate("/admin/login");
    }
  }, []);

  // SEND OTP
  async function handleSend() {
    try {
      await sendOtp({ email, method });
      alert("OTP sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Sending OTP failed");
    }
  }

  // VERIFY OTP
  async function handleVerify() {
    try {
      const res = await verifyOtp({ email, otp });

      if (res.ok) {
        // everything correct → go to dashboard
        navigate("/admin/dashboard", { replace: true });  
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h6" mb={2}>
          Admin OTP Verification
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            disabled
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant={method === "email" ? "contained" : "outlined"}
              onClick={() => setMethod("email")}
            >
              Email
            </Button>

            <Button
              variant={method === "sms" ? "contained" : "outlined"}
              onClick={() => setMethod("sms")}
            >
              SMS
            </Button>

            <Button
              variant={method === "both" ? "contained" : "outlined"}
              onClick={() => setMethod("both")}
            >
              Both
            </Button>
          </Stack>

          <Button variant="outlined" onClick={handleSend}>
            Send OTP
          </Button>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button variant="contained" onClick={handleVerify}>
            Verify & Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
