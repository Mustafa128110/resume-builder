import React from "react";

interface ResumeSectionProps {
  children: React.ReactNode;
  sectionName: string;
}

export const ResumeSection = ({
  children,
  sectionName,
}: ResumeSectionProps) => {
  return (
    <section className="resume-section" id={sectionName}>
      <div className="resume-section-content">{children}</div>
    </section>
  );
};
