import React from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Badge,
  InputBase,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../contexts/AuthContext";

export default function TopBar() {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "User";

  const today = new Date();
  const greeting =
    today.getHours() < 12
      ? "Good Morning"
      : today.getHours() < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,255,255,0.15)",
      }}
    >
      {/* LEFT: GREETING + DATE */}
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {greeting}, {firstName}! 👋
        </Typography>

        <Typography sx={{ fontSize: 13, color: "#cbd5e1" }}>
          {today.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      {/* MIDDLE: SEARCH BAR */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          p: 1,
          px: 2,
          borderRadius: 2,
          width: 300,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <SearchIcon sx={{ color: "#7b3fe4", mr: 1 }} />
        <InputBase
          placeholder="Search courses, lessons..."
          sx={{ color: "#e2e8f0", width: "100%" }}
        />
      </Box>

      {/* RIGHT: NOTIFICATION + PROFILE */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton sx={{ color: "#00eaff" }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: "#7b3fe4",
              width: 40,
              height: 40,
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0) || "U"}
          </Avatar>

          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {user?.name || "User"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
