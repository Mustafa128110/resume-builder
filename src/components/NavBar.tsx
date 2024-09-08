import { useContext, useEffect, useState } from "react";
import { StoreCtx } from "../context/store";

export const NavBar = () => {
  const [navBarToggleStatus, setNavBarToggleStatus] = useState(false);
  const {
    resumeData: { about, skills, education, experience },
  } = useContext(StoreCtx);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 50;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition <= sectionTop + sectionHeight
        ) {
          document.querySelector(`a[href*=${id}]`)?.classList.add("active");
        } else {
          document.querySelector(`a[href*=${id}]`)?.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg navbar-dark fixed-top color-bg"
      id="sideNav"
    >
      <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-block d-lg-none">
          {about.firstName} {about.lastName}
        </span>
        <span className="d-none d-lg-block">
          <img
            className="img-fluid img-profile rounded-circle mx-auto mb-2"
            src={about.avatar}
            alt="avatar image"
          />
        </span>
      </a>

      <button
        onClick={() => setNavBarToggleStatus(!navBarToggleStatus)}
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${
          navBarToggleStatus ? "show" : ""
        }`}
        id="navbarResponsive"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#about">
              About
            </a>
          </li>
          {(experience.length || null) && (
            <li className="nav-item">
              <a className="nav-link" href="#experience">
                Experience
              </a>
            </li>
          )}
          {(education.length || null) && (
            <li className="nav-item">
              <a className="nav-link" href="#education">
                Education
              </a>
            </li>
          )}
          {(skills.length || null) && (
            <li className="nav-item">
              <a className="nav-link" href="#skills">
                Skills
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
