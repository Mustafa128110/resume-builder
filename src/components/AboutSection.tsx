import { useContext } from "react";
import { ResumeSection } from "./ResumeSection";
import { StoreCtx } from "../context/store";

export const AboutSection = () => {
  const { resumeData } = useContext(StoreCtx);

  return (
    <ResumeSection sectionName="about">
      <h1 className="mb-0">
        {resumeData.about.firstName}{" "}
        <span className="text color-primary">{resumeData.about.lastName}</span>
      </h1>
      <div className="subheading mb-5">
        {resumeData.about.streetName} · {resumeData.about.city} ·{" "}
        {resumeData.about.country} · {resumeData.about.postalCode} ·{" "}
        {resumeData.about.phoneNumber} ·
        <a className="color-primary" href="mailto:name@email.com">
          {resumeData.about.email}
        </a>
      </div>

      <p className="lead mb-5">{resumeData.about.intro}</p>

      <div className="social-icons">
        {resumeData.about.linkedInLink && (
          <a
            target="_blank"
            className="social-icon"
            href={resumeData.about.linkedInLink}
          >
            <i className="fab fa-linkedin-in" />
          </a>
        )}

        {resumeData.about.gitHubLink && (
          <a
            className="social-icon"
            target="_blank"
            href={resumeData.about.gitHubLink}
          >
            <i className="fab fa-github" />
          </a>
        )}

        {resumeData.about.XLink && (
          <a
            target="_blank"
            className="social-icon"
            href={resumeData.about.XLink}
          >
            <i className="fab fa-twitter" />
          </a>
        )}
      </div>
    </ResumeSection>
  );
};
