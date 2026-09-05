import { type MouseEvent, useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import BackgroundPage from "./pages/BackgroundPage";
import CvPage from "./pages/CvPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import PublicationsPage from "./pages/PublicationsPage";
import ResearchPage from "./pages/ResearchPage";

const navigation = [
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/background", label: "Background" },
  { to: "/cv", label: "CV" },
];

const pageTitles: Record<string, string> = {
  "/": "Pritish Saha",
  "/research": "Research · Pritish Saha",
  "/publications": "Publications · Pritish Saha",
  "/experience": "Experience · Pritish Saha",
  "/projects": "Projects · Pritish Saha",
  "/background": "Background · Pritish Saha",
  "/cv": "CV · Pritish Saha",
};

function focusMainContent(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.getElementById("main-content")?.focus();
}

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = pageTitles[location.pathname] ?? "Pritish Saha";
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={focusMainContent}>
        Skip to content
      </a>

      <header className="site-navbar">
        <div className="container nav-inner">
          <NavLink className="site-brand" to="/" aria-label="Pritish Saha home">
            Pritish Saha
          </NavLink>

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>Menu</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>

          <nav
            id="site-navigation"
            className={`site-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="site-main" tabIndex={-1}>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/background" element={<BackgroundPage />} />
            <Route path="/cv" element={<CvPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-name">Pritish Saha</div>
            <div className="footer-meta">Final-year student · Indian Institute of Technology, Kharagpur</div>
          </div>
          <div className="footer-links">
            <a href="mailto:pritish.saha@kgpian.iitkgp.ac.in">Email</a>
            <NavLink to="/cv">CV</NavLink>
            <a href="https://scholar.google.com/citations?user=gmXhzpMAAAAJ&hl=en">Scholar</a>
            <a href="https://github.com/PritishSaha92/PritishSaha92.github.io">Source</a>
          </div>
        </div>
        <div className="container footer-bottom">Last updated September 2026.</div>
      </footer>
    </div>
  );
}

export default App;
