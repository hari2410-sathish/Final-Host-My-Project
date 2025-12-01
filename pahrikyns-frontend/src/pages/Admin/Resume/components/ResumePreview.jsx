// src/pages/Admin/Resume/components/ResumePreview.jsx
import React from "react";
import { useResume } from "../ResumeContext";

import TemplateSimple from "../templates/TemplateSimple.jsx";
import TemplateMedium from "../templates/TemplateMedium.jsx";
import TemplatePro from "../templates/TemplatePro.jsx";
import TemplateMaster from "../templates/TemplateMaster.jsx";
import TemplateUltra from "../templates/TemplateUltraPro.jsx";

export default function ResumePreview() {
  const { resume } = useResume();
  const { template = "simple", theme } = resume;

  const props = { data: resume, theme };

  const renderTemplate = () => {
    switch (template) {
      case "simple": return <TemplateSimple {...props} />;
      case "medium": return <TemplateMedium {...props} />;
      case "pro": return <TemplatePro {...props} />;
      case "master": return <TemplateMaster {...props} />;
      case "ultra": return <TemplateUltra {...props} />;
      default: return <TemplateSimple {...props} />;
    }
  };

  return (
    <div
      style={{
        background: "rgba(10, 12, 20, 0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        padding: "20px",
        color: "#eaeaea",
        minHeight: "100%",
        width: "100%",
      }}
    >
      {renderTemplate()}
    </div>
  );
}
