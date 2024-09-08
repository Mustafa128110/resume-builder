import { NavBar } from "./components/NavBar";
import { AboutSection } from "./components/AboutSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";

function App() {
  return (
    <main>
      <NavBar />

      <div className="container-fluid p-0">
        <AboutSection />
        <hr className="m-0" />

        <ExperienceSection />
        <hr className="m-0" />

        <EducationSection />
        <hr className="m-0" />

        <SkillsSection />
        <hr className="m-0" />
      </div>
    </main>
  );
}

export default App;
