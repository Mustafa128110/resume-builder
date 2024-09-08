import { useContext } from "react";
import { ResumeSection } from "./ResumeSection";
import { StoreCtx } from "../context/store";
import { Experience } from "./Experience";

export const ExperienceSection = () => {
  const store = useContext(StoreCtx);

  return (
    <ResumeSection sectionName="experience">
      <h2 className="mb-5">Experience</h2>

      {store.resumeData.experience.map((exp, idx) => {
        return <Experience key={idx} experience={exp} />;
      })}
    </ResumeSection>
  );
};
