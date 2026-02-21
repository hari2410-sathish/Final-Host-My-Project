import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";

export default function CoursesHome() {
  const categories = [
    {
      name: "DevOps",
      path: "/courses/devops",
      desc: "Master CI/CD, Containers, and Infrastructure as Code.",
      icon: <GitHubIcon sx={{ fontSize: 40, color: "#00eaff" }} />
    },
    {
      name: "AWS",
      path: "/courses/aws",
      desc: "Learn Cloud Computing with Amazon Web Services.",
      icon: <CloudIcon sx={{ fontSize: 40, color: "#ff9900" }} />
    },
    {
      name: "Operating Systems",
      path: "/courses/os",
      desc: "Deep dive into Linux, Windows, and Shell Scripting.",
      icon: <ComputerIcon sx={{ fontSize: 40, color: "#1ed86c" }} />
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "80vh", background: "linear-gradient(135deg, #021018 0%, #041225 100%)" }}>
      <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800, mb: 1, textAlign: "center" }}>
        Explore Our <span style={{ color: "#00eaff" }}>Courses</span>
      </Typography>
      <Typography sx={{ color: "#b0c4de", textAlign: "center", mb: 6, fontSize: "1.1rem" }}>
        Choose a domain to start your journey to mastery.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.name}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                background: "rgba(4, 16, 38, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0, 234, 255, 0.1)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 40px rgba(0, 234, 255, 0.15)",
                  border: "1px solid rgba(0, 234, 255, 0.3)",
                },
              }}
            >
              <Box sx={{ mb: 2, p: 2, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}>
                {c.icon}
              </Box>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                {c.name}
              </Typography>
              <Typography sx={{ color: "#b0c4de", mb: 3, flex: 1 }}>
                {c.desc}
              </Typography>
              <Button
                component={Link}
                to={c.path}
                variant="outlined"
                sx={{
                  borderColor: "#00eaff",
                  color: "#00eaff",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  borderRadius: "8px",
                  "&:hover": {
                    background: "rgba(0, 234, 255, 0.1)",
                    borderColor: "#00eaff",
                  },
                }}
              >
                Explore {c.name}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
