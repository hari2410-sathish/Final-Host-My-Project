// src/layouts/UserDashboard.jsx
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/dashboard/LeftSidebar";
import TopBar from "../components/dashboard/TopBar";

export default function UserDashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0a0f24, #000)",
      }}
    >
      {/* SIDEBAR */}
      <LeftSidebar />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
        }}
      >
        {/* TOP BAR */}
        <TopBar />

        {/* PAGE CONTENT */}
        <Outlet />
      </Box>
    </Box>
  );
}
