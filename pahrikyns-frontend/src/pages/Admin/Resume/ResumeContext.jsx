// src/pages/Admin/Resume/ResumeContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import * as ResumeAPI from "../../../api/resume"; // adjust if needed

const ResumeContext = createContext();
export const useResume = () => useContext(ResumeContext);

const LOCAL_KEY = "resume_builder_draft_v3";

export function ResumeProvider({ children }) {
  // -----------------------------
  // INITIAL STATE
  // -----------------------------
  const [resume, setResume] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
      name: "Your Name",
      title: "Your Title",
      email: "youremail@gmail.com",
      phone: "9876543210",
      location: "India",
      summary: "",
      skills: [],
      experience: [],
      education: [],
      template: "simple",
      theme: "default",
      font: "Inter",
      photo: null,
      showSummary: true,
      showSkills: true,
      showExperience: true,
      showEducation: true,
    }
  );

  const [serverId, setServerId] = useState(null);

  // -----------------------------
  // BASIC FIELD SET
  // -----------------------------
  const setField = (field, value) =>
    setResume((p) => ({ ...p, [field]: value }));

  const setTemplate = (template) =>
    setResume((p) => ({ ...p, template }));

  const setTheme = (theme) =>
    setResume((p) => ({ ...p, theme }));

  // -----------------------------
  // PHOTO UPLOAD
  // -----------------------------
  const uploadPhoto = (file) => {
    const reader = new FileReader();
    reader.onload = () =>
      setResume((p) => ({ ...p, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  // -----------------------------
  // SECTION TOGGLE
  // -----------------------------
  const toggleSection = (section) =>
    setResume((p) => ({ ...p, [section]: !p[section] }));

  // -----------------------------
  // ARRAY REORDERING
  // -----------------------------
  const reorder = (arr, start, end) => {
    const clone = [...arr];
    const [moved] = clone.splice(start, 1);
    clone.splice(end, 0, moved);
    return clone;
  };

  const reorderSkills = (s, e) =>
    setResume((p) => ({ ...p, skills: reorder(p.skills, s, e) }));

  const reorderExperience = (s, e) =>
    setResume((p) => ({
      ...p,
      experience: reorder(p.experience, s, e),
    }));

  const reorderEducation = (s, e) =>
    setResume((p) => ({
      ...p,
      education: reorder(p.education, s, e),
    }));

  // -----------------------------
  // AUTO-SAVE TO LOCAL
  // -----------------------------
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(resume));
    }, 300);

    return () => clearTimeout(t);
  }, [resume]);

  // -----------------------------
  // SAVE TO LOCAL (manual)
  // -----------------------------
  const saveToLocal = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(resume));
    alert("Saved locally!");
  };

  const loadFromLocal = () => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved) {
      setResume(saved);
      alert("Loaded draft!");
    }
  };

  const resetResume = () => {
    if (!window.confirm("Reset everything?")) return;
    localStorage.removeItem(LOCAL_KEY);
    setResume({
      name: "Your Name",
      title: "Your Title",
      email: "youremail@gmail.com",
      phone: "9876543210",
      location: "India",
      summary: "",
      skills: [],
      experience: [],
      education: [],
      template: "simple",
      theme: "default",
      font: "Inter",
      photo: null,
      showSummary: true,
      showSkills: true,
      showExperience: true,
      showEducation: true,
    });
  };

  // -----------------------------
  // EXPORT JSON
  // -----------------------------
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // -----------------------------
  // IMPORT JSON
  // -----------------------------
  const importJSON = async (file) => {
    try {
      const txt = await file.text();
      const parsed = JSON.parse(txt);

      if (!parsed.name) return false;

      setResume(parsed);
      return true;
    } catch {
      return false;
    }
  };

  // =============================
  // CLOUD SAVE + UPDATE
  // =============================
  const saveToServer = async (id = null) => {
    try {
      if (id) {
        const res = await ResumeAPI.updateResume(id, resume);
        return res.data?.updated || id;
      } else {
        const res = await ResumeAPI.createResume(resume);
        return res.data?.id || null;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // =============================
  // PUBLISH PUBLIC URL
  // =============================
  const publish = async (id) => {
    const res = await ResumeAPI.publishResume(id);
    return res.data;
  };

  // =============================
  // EXPORT DOCX (SERVER)
  // =============================
  const exportDocxServer = async (id) => {
    const res = await ResumeAPI.exportDocx(id);

    const blob = new Blob([res.data], {
      type: res.headers["content-type"],
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${(resume.name || "resume").replace(/\s+/g, "_")}.docx`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // =============================
  // LIST RESUMES
  // =============================
  const listMyResumes = async () => {
    const res = await ResumeAPI.listResumes();
    return res.data;
  };

  // -----------------------------
  // RETURN PROVIDER
  // -----------------------------
  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,

        // fields
        setField,
        setTemplate,
        setTheme,
        uploadPhoto,

        // reorder
        reorderSkills,
        reorderExperience,
        reorderEducation,

        // visibility
        toggleSection,

        // local
        saveToLocal,
        loadFromLocal,
        resetResume,

        // JSON
        exportJSON,
        importJSON,

        // cloud
        saveToServer,
        publish,
        exportDocxServer,
        listMyResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
