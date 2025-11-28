// src/components/admin/AdminSidebar.jsx
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Avatar,
  useTheme,
  styled,
  keyframes,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";

import { useAdminAuth } from "../../contexts/AdminAuthContext";

/**
 * Neon animated Admin Sidebar
 * - Paste to: src/components/admin/AdminSidebar.jsx
 * - Requires: @mui/material, @mui/icons-material
 */

/* Keyframes & styled helpers */
const glow = keyframes`
  0% { box-shadow: 0 0 0px rgba(0,235,255,0.08); transform: translateY(0); }
  50% { box-shadow: 0 0 18px rgba(0,235,255,0.16); transform: translateY(-2px); }
  100% { box-shadow: 0 0 0px rgba(0,235,255,0.08); transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0,200,255,0.22); }
  70% { box-shadow: 0 0 0 12px rgba(0,200,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,200,255,0); }
`;

const NeonButton = styled(ListItemButton)(({ theme, active }) => ({
  mb: 12,
  borderRadius: 12,
  px: 16,
  py: 12,
  textDecoration: "none",
  transition: "all 200ms ease",
  color: active ? theme.palette.primary.main : "rgba(255,255,255,0.9)",
  background: active ? "linear-gradient(180deg, rgba(0,30,40,0.28), rgba(0,10,12,0.16))" : "transparent",
  ...(active && {
    transform: "translateY(-2px)",
    animation: `${pulse} 2s infinite`,
  }),
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 22px rgba(0,200,255,0.08)",
    background: "linear-gradient(180deg, rgba(0,30,40,0.22), rgba(0,10,12,0.12))",
  },
}));

export default function AdminSidebar() {
  const theme = useTheme();
  const adminContext = useAdminAuth ? useAdminAuth() : { logout: () => {}, admin: null };
  const { logout, admin } = adminContext;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { title: "Courses", path: "/admin/courses", icon: <BookIcon /> },
    { title: "Add Course", path: "/admin/courses/add", icon: <AddBoxIcon /> },
    { title: "Students", path: "/admin/students", icon: <PeopleIcon /> },
    { title: "Analytics", path: "/admin/analytics", icon: <BarChartIcon /> },
    { title: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Box
      sx={{
        height: "100%",
        color: "white",
        px: collapsed ? 1 : 2,
        py: 2,
        borderRight: "1px solid rgba(255,255,255,0.03)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: collapsed ? "72px" : "260px",
        transition: "width 220ms cubic-bezier(.2,.9,.4,1)",
        overflow: "auto",
        background: "linear-gradient(180deg, rgba(2,6,12,0.6), rgba(2,6,12,0.5))",
      }}
    >
      {/* header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 44, height: 44, boxShadow: "0 6px 22px rgba(0,200,255,0.06)" }}>
          {admin?.email?.[0]?.toUpperCase() || "A"}
        </Avatar>

        {!collapsed && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Admin Panel
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {admin?.email || "admin@you.com"}
            </Typography>
          </Box>
        )}

        <IconButton
          onClick={() => setCollapsed((s) => !s)}
          size="small"
          sx={{
            ml: "auto",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.04)",
            bgcolor: "rgba(255,255,255,0.02)",
            transition: "transform 160ms ease",
            "&:hover": { transform: "rotate(8deg)" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.03)" }} />

      {/* menu */}
      <List sx={{ py: 0 }}>
        {menuItems.map((m) => {
          const active = isActive(m.path);
          return (
            <Tooltip key={m.path} title={collapsed ? m.title : ""} placement="right">
              <NeonButton
                component={NavLink}
                to={m.path}
                active={active ? 1 : 0}
                sx={{
                  mb: 1.25,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  "& .MuiListItemIcon-root": {
                    minWidth: 36,
                    color: active ? "primary.main" : "rgba(255,255,255,0.85)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 160ms ease",
                    ...(active && { filter: "drop-shadow(0 6px 20px rgba(0,200,255,0.12))" }),
                  },
                  "& .MuiListItemText-root": { opacity: collapsed ? 0 : 1 },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{m.icon}</ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={m.title}
                    primaryTypographyProps={{
                      fontWeight: active ? 800 : 700,
                      letterSpacing: "0.2px",
                    }}
                  />
                )}

                {/* neon glow accent when active */}
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: collapsed ? 8 : 12,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      boxShadow: "0 6px 18px rgba(0,200,255,0.24)",
                      animation: `${glow} 2.6s infinite`,
                    }}
                  />
                )}
              </NeonButton>
            </Tooltip>
          );
        })}
      </List>

      <Box sx={{ flex: 1 }} />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.03)" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: 1,
          p: 1,
        }}
      >
        {!collapsed && (
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
              Theme
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Neon Dark
            </Typography>
          </Box>
        )}

        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              try {
                logout();
              } catch (e) {
                console.error(e);
              }
            }}
            sx={{
              borderRadius: 2,
              px: collapsed ? 1.25 : 2,
              py: 1.25,
              color: "rgba(255,255,255,0.95)",
              bgcolor: "transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 800 }} />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
