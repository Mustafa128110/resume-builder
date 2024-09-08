import { NavBar } from "./components/NavBar";
import { AboutSection } from "./components/AboutSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { useContext } from "react";
import { StoreCtx } from "./context/store";
import { CreateResumeActionBtn } from "./components/CreateResumeActionBtn";
import { EditResumeActionBtn } from "./components/EditResumeActionBtn";
import { ShareActionBtn } from "./components/ShareActionBtn";
import { DownloadActionBtn } from "./components/DOwnloadActionBtn";
import { usePDF } from "react-to-pdf";

function App() {
  const store = useContext(StoreCtx);
  const { toPDF, targetRef } = usePDF({
    filename: `${store.resumeData.about.firstName}-resume.pdf`,
  });

  return (
    <main>
      <NavBar />

      <div ref={targetRef} className="container-fluid p-0">
        {store.resumeData.about && (
          <>
            <AboutSection />
            <hr className="m-0" />
          </>
        )}

        {(store.resumeData.education.length || null) && (
          <>
            <ExperienceSection />
            <hr className="m-0" />
          </>
        )}

        {(store.resumeData.experience.length || null) && (
          <>
            <EducationSection />
            <hr className="m-0" />
          </>
        )}

        {(store.resumeData.skills.length || null) && (
          <>
            <SkillsSection />
          </>
        )}
      </div>

      <DownloadActionBtn toPDF={toPDF} />
      <ShareActionBtn />
      <EditResumeActionBtn />
      <CreateResumeActionBtn />
    </main>
  );
}

export default App;
