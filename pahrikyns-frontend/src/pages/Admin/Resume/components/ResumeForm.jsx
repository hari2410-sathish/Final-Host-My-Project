import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { useResume } from "../ResumeContext";
import PhotoUpload from "./PhotoUpload";
import ThemeSwatches from "./ThemeSwatches";
import AISummary from "./AISummary";
import DragList from "./DragList";


export default function ResumeForm() {
  const {
    resume,
    setField,
    addSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation
  } = useResume();

  const [skillInput, setSkillInput] = useState("");

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Personal Details
      </Typography>

      <TextField
        fullWidth
        label="Name"
        sx={{ mb: 2 }}
        value={resume.name}
        onChange={(e) => setField("name", e.target.value)}
      />

      <TextField
        fullWidth
        label="Title"
        sx={{ mb: 2 }}
        value={resume.title}
        onChange={(e) => setField("title", e.target.value)}
      />

      <TextField
        fullWidth
        label="Email"
        sx={{ mb: 2 }}
        value={resume.email}
        onChange={(e) => setField("email", e.target.value)}
      />

      <TextField
        fullWidth
        label="Phone"
        sx={{ mb: 2 }}
        value={resume.phone}
        onChange={(e) => setField("phone", e.target.value)}
      />

      <TextField
        fullWidth
        label="Location"
        sx={{ mb: 2 }}
        value={resume.location}
        onChange={(e) => setField("location", e.target.value)}
      />

      <Divider sx={{ my: 3 }} />

      {/* SUMMARY */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Summary
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
        value={resume.summary}
        onChange={(e) => setField("summary", e.target.value)}
      />

      <Divider sx={{ my: 3 }} />

      {/* SKILLS */}
      <Typography variant="h6" fontWeight={700} mb={1}>
        Skills
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="Add Skill"
          size="small"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (skillInput.trim()) {
              addSkill(skillInput.trim());
              setSkillInput("");
            }
          }}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {resume.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => removeSkill(index)}
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* EXPERIENCE */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Experience
      </Typography>

      {resume.experience.map((exp, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            mb: 2,
            border: "1px solid #1e293b",
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            label="Role"
            sx={{ mb: 2 }}
            value={exp.role}
            onChange={(e) =>
              updateExperience(index, "role", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Company"
            sx={{ mb: 2 }}
            value={exp.company}
            onChange={(e) =>
              updateExperience(index, "company", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Year"
            sx={{ mb: 2 }}
            value={exp.year}
            onChange={(e) =>
              updateExperience(index, "year", e.target.value)
            }
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Details"
            value={exp.details}
            onChange={(e) =>
              updateExperience(index, "details", e.target.value)
            }
          />

          <Button
            color="error"
            sx={{ mt: 1 }}
            onClick={() => removeExperience(index)}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="outlined" onClick={addExperience}>
        + Add Experience
      </Button>

      <Divider sx={{ my: 3 }} />

      {/* EDUCATION */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Education
      </Typography>

      {resume.education.map((edu, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            mb: 2,
            border: "1px solid #1e293b",
            borderRadius: 2
          }}
        >
          <TextField
            fullWidth
            label="Degree"
            sx={{ mb: 2 }}
            value={edu.degree}
            onChange={(e) =>
              updateEducation(index, "degree", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Institute"
            sx={{ mb: 2 }}
            value={edu.institute}
            onChange={(e) =>
              updateEducation(index, "institute", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Year"
            sx={{ mb: 2 }}
            value={edu.year}
            onChange={(e) =>
              updateEducation(index, "year", e.target.value)
            }
          />

          <Button
            color="error"
            sx={{ mt: 1 }}
            onClick={() => removeEducation(index)}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="outlined" onClick={addEducation}>
        + Add Education
      </Button>
    </Box>
  );
}
