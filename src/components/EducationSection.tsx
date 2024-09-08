import { useContext } from "react";
import { StoreCtx } from "../context/store";
import { Education } from "./Education";
import { ResumeSection } from "./ResumeSection";

export const EducationSection = () => {
  const store = useContext(StoreCtx);

  return (
    <ResumeSection sectionName="education">
      <h2 className="mb-5">Education</h2>

      {store.resumeData.education.map((edu, idx) => {
        return <Education key={idx} education={edu} />;
      })}
    </ResumeSection>
  );
};
