import React from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemText, Badge } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { markAllRead, fetchNotifications } from "../../api/notifications"; // create or reuse

export default function NotificationPanel({ open, onClose }) {
  const [items, setItems] = React.useState([]);
  const { user } = useAuth();

  React.useEffect(() => {
    if (open) load();
  }, [open]);

  const load = async () => {
    try {
      const res = await fetchNotifications(); // should return array
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead();
      setItems((s) => s.map(i => ({...i, read: true})));
    } catch (e) {}
  };

  return (
    <>
      <IconButton onClick={() => onClose(false)} sx={{ color: "#00eaff" }}>
        <Badge badgeContent={items.filter(i=>!i.read).length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 160 }}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: 380,
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            height: "100%",
            p: 2,
            background: "rgba(10,15,36,0.9)",
            backdropFilter: "blur(12px)",
            borderLeft: "1px solid rgba(0,255,255,0.12)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontWeight: 800 }}>Notifications</Typography>
            <Box>
              <Typography component="span" sx={{ mr: 1, color: "#94a3b8" }}>{user?.name}</Typography>
              <IconButton onClick={() => onClose(false)} sx={{ color: "#cbd5e1" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ mb: 1, display: "flex", gap: 1 }}>
            <Typography sx={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }} onClick={handleMarkAll}>
              Mark all read
            </Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: 13 }}>•</Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }} onClick={load}>
              Refresh
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {items.length === 0 && (
                <Typography sx={{ color: "#94a3b8", mt: 4, textAlign: "center" }}>
                  No notifications yet
                </Typography>
              )}

              {items.map((n) => (
                <ListItem
                  key={n.id}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    background: n.read ? "transparent" : "linear-gradient(90deg,#00eaff11,#7b3fe411)",
                    "&:hover": { transform: "translateX(4px)" },
                    transition: "all .18s ease",
                  }}
                >
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 700 }}>{n.title}</Typography>}
                    secondary={<Typography sx={{ fontSize: 13, color: "#cbd5e1" }}>{n.body}</Typography>}
                  />
                  <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
              Tip: click an item to open the related page (implement navigation in list item)
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
