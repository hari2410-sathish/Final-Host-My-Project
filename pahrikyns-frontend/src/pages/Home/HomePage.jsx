import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Card,
  CardContent,
  Avatar,
  AvatarGroup
} from "@mui/material";
import { motion } from "framer-motion"; // Optional: For smoother animations if available, or stick to CSS/JS
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';

import infosys from "../../assets/logos/infosys.png";
import tcs from "../../assets/logos/tcs.png";
import wipro from "../../assets/logos/wipro.png";
import accenture from "../../assets/logos/accenture.png";
import amazon from "../../assets/logos/amazon.png";
import zoho from "../../assets/logos/zoho.png";

// Simple Intersection Observer hook used by some sections
const useScrollAnimation = () => {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisible((s) => ({ ...s, [e.target.id || e.target.dataset.key]: true }));
      });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return visible;
};

const AnimatedStat = ({ value, label, size = 48 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (!end) return;
    const step = Math.max(1, Math.floor(end / 60));
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [value]);

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1, fontSize: { xs: 36, md: size } }}>
        {count}+
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, opacity: 0.7, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

const Feature = ({ icon, title, desc }) => (
  <Card sx={{
    height: '100%',
    bgcolor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.03)",
    borderRadius: 3,
    transition: 'transform 0.2s',
    '&:hover': { transform: 'translateY(-5px)', bgcolor: "rgba(255,255,255,0.05)" }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{icon}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{title}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.65 }}>{desc}</Typography>
    </CardContent>
  </Card>
);

const CourseCard = ({ title, desc, link, tag }) => (
  <Card sx={{
    height: '100%',
    bgcolor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.03)",
    borderRadius: 3,
    position: 'relative',
    transition: 'all 0.2s',
    '&:hover': { transform: 'translateY(-5px)', borderColor: 'rgba(0,234,255,0.3)' }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ position: "absolute", right: 12, top: 12, fontSize: 11, fontWeight: 800, bgcolor: "rgba(0,234,255,0.08)", color: '#00eaff', py: 0.5, px: 1.5, borderRadius: 2 }}>
        {tag}
      </Box>
      <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>{title}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.65, my: 1.5, minHeight: 40 }}>{desc}</Typography>
      <Button
        component={Link}
        to={link}
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: "#00eaff",
          fontWeight: 700,
          p: 0,
          '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
        }}
      >
        View
      </Button>
    </CardContent>
  </Card>
);

export default function HomePage() {
  const canvasRef = useRef(null);
  const visible = useScrollAnimation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Replaces manual resize listener
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode, setDarkMode] = useState(true);

  // Minimal particle canvas preserved
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: isMobile ? 30 : 60 }).map(() => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 0.6, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, a: Math.random() * 0.5 + 0.1 }));

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.beginPath(); ctx.globalAlpha = p.a; ctx.fillStyle = "#00eaff"; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [isMobile]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", bgcolor: darkMode ? "#060714" : "#fafafa", color: darkMode ? "#fff" : "#111", overflowX: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }} />

      {/* Theme toggle - middle right */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          right: 18,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 220,
          width: 56,
          height: 56,
          bgcolor: darkMode ? "rgba(10,12,20,0.8)" : "#fff",
          border: "2px solid rgba(255,255,255,0.06)",
          color: darkMode ? '#fff' : '#000',
          '&:hover': { bgcolor: darkMode ? "rgba(10,12,20,0.9)" : "#f5f5f5" }
        }}
        aria-label="toggle-theme"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {/* HERO */}
      <Box id="hero" data-scroll-animate sx={{ position: "relative", zIndex: 10, pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 12 }, px: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            {/* LEFT: Title, subtitle, CTA, stats */}
            <Grid item xs={12} lg={6} sx={{ position: "relative", zIndex: 2 }}>
              <Box sx={{ display: "inline-block", py: 1, px: 2, borderRadius: 999, bgcolor: "rgba(0,234,255,0.08)", color: "#00eaff", fontWeight: 800, mb: 3, fontSize: 13 }}>
                PAHRIKYNS • PRO
              </Box>

              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' }, lineHeight: 1.02, fontWeight: 900 }}>
                Learn the skills that get you hired
              </Typography>

              {/* Gradient accent bar */}
              <Box sx={{ width: 120, height: 8, borderRadius: 8, mt: 3, background: "linear-gradient(90deg,#00eaff,#7b3fe4)", boxShadow: "0 8px 30px rgba(123,63,228,0.18)" }} />

              <Typography variant="body1" sx={{ maxWidth: 640, mt: 3, color: darkMode ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.7)", fontSize: { xs: 16, md: 18 } }}>
                Hands-on courses, real projects, and mentor support — everything you need to switch into a high-paying DevOps role.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button
                  component={Link}
                  to="/courses"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                    color: "#000",
                    fontWeight: 900,
                    boxShadow: "0 12px 40px rgba(0,234,255,0.28)",
                    '&:hover': { background: "linear-gradient(90deg,#00d1e5,#6a35c9)" }
                  }}
                >
                  Start Learning Free
                </Button>
                <Button
                  component={Link}
                  to="/courses/aws"
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    borderColor: "rgba(255,255,255,0.1)",
                    color: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
                    fontWeight: 800,
                    '&:hover': { borderColor: "rgba(255,255,255,0.3)", bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  Explore Tracks
                </Button>
              </Stack>

              {/* Social Proof */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4 }}>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 12, borderColor: darkMode ? "#060714" : "#fff" } }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
                <Box>
                  <Stack direction="row" spacing={0.5} sx={{ color: "#fbbf24", mb: 0.5 }}>
                    {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} sx={{ fontSize: 16 }} />)}
                  </Stack>
                  <Typography variant="caption" sx={{ color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", fontWeight: 600 }}>
                    Join <Box component="span" sx={{ color: darkMode ? "#fff" : "#000", fontWeight: 800 }}>5,000+ top engineers</Box>
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={4} sx={{ mt: 6, alignItems: "flex-end" }}>
                <AnimatedStat value={"5000"} label="Students" />
                <AnimatedStat value={"350"} label="Projects" />
                <AnimatedStat value={"95"} label="Placement" />
              </Stack>
            </Grid>

            {/* RIGHT: Artwork / promotional artwork */}
            {isDesktop && (
              <Grid item xs={12} lg={6} sx={{ position: 'relative' }}>
                <Box sx={{ position: "relative", height: 520 }}>
                  <Box sx={{
                    position: "absolute", right: 0, top: 0, width: "100%", height: "100%", borderRadius: 6, overflow: "hidden",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
                    background: "linear-gradient(135deg,#667eea 0%,#764ba2 35%,#f093fb 70%,#00f2fe 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.95)", fontSize: 110 }}>🎨</Typography>
                  </Box>
                </Box>


                {/* Floating promo card removed */}
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" id="features" data-scroll-animate sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>Why PAHRIKYNS?</Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.65 }}>Project-based curriculum, mentors & hiring support.</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Feature icon="📘" title="Structured Paths" desc="From beginner to job-ready with a clear map." />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Feature icon="🧪" title="Hands-on Labs" desc="Real infra, real projects, no simulators." />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Feature icon="🤝" title="Mentorship" desc="Weekly mentor sessions and code reviews." />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Feature icon="💼" title="Placement Help" desc="Resume + mock interviews + referrals." />
          </Grid>
        </Grid>
      </Container>

      {/* Logos */}
      <Box sx={{ py: 4, borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1, display: 'block', mb: 3 }}>
            Trusted by teams at
          </Typography>
          <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ opacity: 0.7 }}>
            {[infosys, tcs, wipro, accenture, amazon, zoho].map((l, i) => (
              <Box component="img" key={i} src={l} alt="logo" sx={{ height: { xs: 24, md: 36 }, filter: "grayscale(100%)", opacity: 0.8, transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }} />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Courses */}
      <Container maxWidth="lg" id="courses" data-scroll-animate sx={{ py: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Popular Tracks</Typography>
            <Typography variant="body2" sx={{ opacity: 0.65 }}>Choose a career path.</Typography>
          </Box>
          <Button component={Link} to="/courses" endIcon={<ArrowForwardIcon />} sx={{ color: "#00eaff", fontWeight: 800 }}>
            View All
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <CourseCard title="AWS DevOps Master" desc="EC2, S3, VPC, IAM & CI/CD" link="/courses/aws" tag="BEST" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CourseCard title="Linux & Scripting" desc="Command line, bash & automation" link="/courses/linux" tag="CORE" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CourseCard title="Kubernetes" desc="Deploy microservices on K8s" link="/courses/kubernetes" tag="PRO" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CourseCard title="CI/CD" desc="Jenkins, GitHub Actions" link="/courses/ci" tag="PRACTICAL" />
          </Grid>
        </Grid>
      </Container>

      {/* Call to action */}
      <Box id="cta" sx={{ py: 10, textAlign: "center", position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>Ready to switch careers?</Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.65, mb: 4 }}>Start with free lessons and see the learning path.</Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              px: 6,
              borderRadius: 999,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#000",
              fontWeight: 900,
              fontSize: '1.1rem',
              boxShadow: "0 10px 40px rgba(123,63,228,0.4)"
            }}
          >
            Join Now
          </Button>
        </Box>
      </Box>

    </Box>
  );
}
