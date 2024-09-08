import { NavBar } from "./components/NavBar";
import { AboutSection } from "./components/AboutSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { useContext } from "react";
import { StoreCtx } from "./context/store";
import { CreateResumeActionBtn } from "./components/CreateResumeActionBtn";
import { EditResumeActionBtn } from "./components/EditResumeActionBtn";
import { ShareButton } from "./components/ShareButton";

function App() {
  const store = useContext(StoreCtx);

  return (
    <main>
      <NavBar />

      <div className="container-fluid p-0">
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

      <ShareButton />
      <EditResumeActionBtn />
      <CreateResumeActionBtn />
    </main>
  );
}

export default App;
