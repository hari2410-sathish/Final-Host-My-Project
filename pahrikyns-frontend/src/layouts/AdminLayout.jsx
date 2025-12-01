// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import AdminSidebar from "../components/admin/AdminSidebar";
import { AdminTopbar } from "../components/admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
        bgcolor: "#020617",
        color: "white",
      }}
    >
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* TOP BAR */}
        <AdminTopbar />

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
