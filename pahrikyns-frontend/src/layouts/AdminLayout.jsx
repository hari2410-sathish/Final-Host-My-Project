import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        bgcolor: "#020617",
        color: "white",
      }}
    >

      {/* REMOVE THE EMPTY FIXED HEADER 100% IMPORTANT */}

      <Box sx={{ display: "flex" }}>

        {/* SIDEBAR */}
        <Box
          sx={{
            width: "250px",
            minHeight: "100vh",
            borderRight: "1px solid #1e293b",
          }}
        >
          <AdminSidebar />
        </Box>

        {/* MAIN AREA */}
        <Box sx={{ flex: 1 }}>
          <AdminTopbar />
          <Box sx={{ p: 3 }}>
            <Outlet />
          </Box>
        </Box>

      </Box>

    </Box>
  );
}
