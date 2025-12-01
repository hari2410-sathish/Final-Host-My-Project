import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BadgeIcon from "@mui/icons-material/Badge";
import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  { icon: <DashboardIcon />, label: "Dashboard", path: "/dashboard" },
  { icon: <SchoolIcon />, label: "My Courses", path: "/my-courses" },
  { icon: <TimelineIcon />, label: "Progress", path: "/progress" },
  { icon: <PersonIcon />, label: "Profile", path: "/profile" },
  { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
];

export default function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(0,255,255,0.15)",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* LOGO */}
      <Typography
        sx={{
          fontSize: 22,
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        PAHRIKYNS
      </Typography>

      {/* MENU */}
      {menu.map((item, i) => {
        const active = location.pathname === item.path;

        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, x: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(item.path)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.4,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",
                color: active ? "#fff" : "#cbd5e1",
                background: active
                  ? "linear-gradient(90deg,#00eaff44,#7b3fe444)"
                  : "transparent",
                "&:hover": {
                  background: "linear-gradient(90deg,#00eaff22,#7b3fe422)",
                  color: "#fff",
                },
              }}
            >
              {item.icon}
              <Typography>{item.label}</Typography>
            </Box>
          </motion.div>
        );
      })}

      {/* LOGOUT BUTTON */}
      <motion.div
        whileHover={{ scale: 1.05, x: 10 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.4,
            mt: 3,
            borderRadius: 2,
            cursor: "pointer",
            color: "#ff7777",
            "&:hover": {
              background: "rgba(255,80,80,0.12)",
            },
          }}
        >
          <LogoutIcon />
          <Typography>Logout</Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
