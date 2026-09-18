import { type MouseEvent, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowIcon } from "./components";
import { contactEmail } from "./content";
import BackgroundPage from "./pages/BackgroundPage";
import CvPage from "./pages/CvPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import PublicationsPage from "./pages/PublicationsPage";
import ResearchPage from "./pages/ResearchPage";

const navigation = [
  { to: "/research", label: "Research" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/background", label: "About" },
];
const pageTitles: Record<string, string> = {
  "/": "Pritish Saha — Machine learning & research",
  "/research": "Research · Pritish Saha",
  "/publications": "Publications · Pritish Saha",
  "/experience": "Experience · Pritish Saha",
  "/projects": "Projects · Pritish Saha",
  "/background": "About · Pritish Saha",
  "/cv": "CV · Pritish Saha",
};
function focusMainContent(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document.getElementById("main-content")?.focus();
}

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    document.title = pageTitles[location.pathname] ?? "Page not found · Pritish Saha";
    let cancelled = false;
    const pathChanged = previousPath.current !== location.pathname;
    const anchor = location.hash.slice(1);
    const positionPage = () => {
      if (cancelled) return;
      const target = anchor ? document.getElementById(anchor) : null;
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        target.focus({ preventScroll: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
        if (pathChanged) document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    };
    if (anchor) void document.fonts.ready.then(positionPage);
    else positionPage();
    previousPath.current = location.pathname;
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={focusMainContent}>
        Skip to content
      </a>
      <header className="site-navbar" ref={headerRef}>
        <div className="container nav-inner">
          <NavLink className="site-brand" to="/" aria-label="Pritish Saha home">
            Pritish Saha
          </NavLink>
          <button
            ref={menuRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className={`menu-lines${menuOpen ? " is-open" : ""}`} aria-hidden="true" />
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
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink className="nav-cv" to="/cv" onClick={() => setMenuOpen(false)}>
              View CV <ArrowIcon />
            </NavLink>
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
            <Route
              path="*"
              element={
                <div className="not-found">
                  <p className="eyebrow">404 · A little off track</p>
                  <h1>This page isn’t here.</h1>
                  <p>You can find my work, experience, and contact details on the homepage.</p>
                  <Link className="button" to="/">
                    Back to home <ArrowIcon direction="right" />
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="contact-section">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Get in touch</h2>
              <p>
                I’m looking for full-time roles in machine learning research and engineering
                <br className="desktop-break" /> after I graduate in May 2027.
              </p>
              <a className="contact-email" href={`mailto:${contactEmail}`}>
                {contactEmail} <ArrowIcon />
              </a>
            </div>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/pritish-saha-436a1922a/" target="_blank" rel="noreferrer">
                LinkedIn <ArrowIcon />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="https://github.com/PritishSaha92" target="_blank" rel="noreferrer">
                GitHub <ArrowIcon />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="https://scholar.google.com/citations?user=gmXhzpMAAAAJ&hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar <ArrowIcon />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link to="/publications">
                Publications <ArrowIcon direction="right" />
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Pritish Saha</span>
            <span>Kharagpur, India</span>
            <a
              href="https://github.com/PritishSaha92/PritishSaha92.github.io"
              target="_blank"
              rel="noreferrer"
            >
              View source <ArrowIcon />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
