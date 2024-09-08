import { useContext } from "react";
import { ResumeSection } from "./ResumeSection";
import { StoreCtx } from "../context/store";
import { Skill } from "./Skill";

export const SkillsSection = () => {
  const store = useContext(StoreCtx);

  return (
    <ResumeSection sectionName="skills">
      <h2 className="mb-5">Skills</h2>

      <ul className="fa-ul mb-0">
        {store.resumeData.skills.map((skill, idx) => {
          return <Skill key={idx} skill={skill} />;
        })}
      </ul>
    </ResumeSection>
  );
};
