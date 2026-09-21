import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, type Project } from "./content";
import Icon from "./components/Icon";
import AbstractComposition from "./components/AbstractComposition";
import ProjectScreenshot from "./components/ProjectScreenshot";
import ProfileLinks from "./components/ProfileLinks";
import usePageMotion from "./hooks/usePageMotion";

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner container">
        <a
          href="#home"
          className="wordmark"
          aria-label="Dipesh Biswa, home"
          onClick={() => setOpen(false)}
        >
          Dipesh Biswa
        </a>
        <button
          ref={toggle}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {["Projects", "About", "Experience", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <ProfileLinks />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-enter">SOFTWARE ENGINEERING / PORTFOLIO</p>
        <h1 id="hero-title" className="hero-enter">
          Dipesh Biswa
        </h1>
        <p className="hero-role hero-enter">
          Software Engineering student
          <br />
          <span>at Rochester Institute of Technology.</span>
        </p>
        <p className="hero-description hero-enter">{profile.introduction}</p>
        <div className="hero-actions hero-enter">
          <a href="#projects" className="button button-dark">
            Explore My Projects <Icon name="arrow" size={17} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            GitHub <Icon name="diagonal" size={16} />
          </a>
        </div>
        <p className="hero-availability hero-enter">
          Seeking software engineering internship opportunities.
        </p>
      </div>
      <div className="hero-geometry" aria-hidden="true">
        <div className="hero-scene">
          <AbstractComposition />
        </div>
      </div>
      <div className="hero-baseline">
        <span>Based in Rochester, NY</span>
        <a href="#education">
          A little about my background <Icon name="arrow" size={14} />
        </a>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section
      className="education-section"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="container education-inner reveal">
        <div className="education-heading">
          <p className="eyebrow">EDUCATION</p>
          <h2 id="education-title">
            Learning the
            <br /> foundations.
          </h2>
        </div>
        <div className="education-details">
          <p className="education-school">{profile.school}</p>
          <h3>{profile.education}</h3>
          <dl className="education-facts">
            <div>
              <dt>Expected graduation</dt>
              <dd>{profile.graduation}</dd>
            </div>
            <div>
              <dt>GPA</dt>
              <dd>{profile.gpa}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function ProjectLink({
  project,
  onDetails,
}: {
  project: Project;
  onDetails: (project: Project) => void;
}) {
  return (
    <button
      className="text-link project-details-link"
      type="button"
      onClick={() => onDetails(project)}
    >
      View project details <Icon name="diagonal" size={16} />
    </button>
  );
}

function ProjectIndex({ project }: { project: Project }) {
  return (
    <p className="project-index">
      <span>{project.number}</span>
      {project.category}
    </p>
  );
}

function Projects({ onDetails }: { onDetails: (project: Project) => void }) {
  return (
    <section
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="projects-heading reveal">
          <div>
            <p className="eyebrow">A FEW THINGS I’VE MADE</p>
            <h2 id="projects-title">Selected projects</h2>
          </div>
          <p>
            Three different problems.
            <br />A closer look at how I approached them.
          </p>
        </div>
        <article
          className="project-row plant-project"
          aria-labelledby="plant-title"
        >
          <div className="project-copy reveal">
            <ProjectIndex project={projects[0]} />
            <h3 id="plant-title">
              IoT Houseplant
              <br />
              Health Monitor
            </h3>
            <p className="project-description">{projects[0].description}</p>
            <p className="project-focus">{projects[0].focus}</p>
            <div className="project-tech">Java / Spring Boot / PostgreSQL</div>
            <ProjectLink project={projects[0]} onDetails={onDetails} />
          </div>
          <div className="project-art telemetry-art reveal">
            <ProjectScreenshot project={projects[0]} />
          </div>
          <div className="project-footnote reveal">
            <span>THE DATA PATH</span>
            <p>
              ESP32 <b>→</b> Spring Boot REST API <b>→</b> PostgreSQL <b>→</b>{" "}
              Claude-powered analysis
            </p>
          </div>
        </article>
        <article
          className="project-row finance-project"
          aria-labelledby="finance-title"
        >
          <div className="project-copy reveal">
            <ProjectIndex project={projects[1]} />
            <h3 id="finance-title">
              Personal
              <br />
              Finance Tracker
            </h3>
            <p className="project-description">{projects[1].description}</p>
            <p className="project-focus">{projects[1].focus}</p>
            <div className="project-tech">React / Spring Boot / Plaid API</div>
            <ProjectLink project={projects[1]} onDetails={onDetails} />
          </div>
          <div className="project-art finance-art reveal">
            <ProjectScreenshot project={projects[1]} />
          </div>
        </article>
        <article
          className="project-row auth-project"
          aria-labelledby="auth-title"
        >
          <div className="project-copy reveal">
            <ProjectIndex project={projects[2]} />
            <h3 id="auth-title">Secure Auth Service</h3>
            <p className="project-description">{projects[2].description}</p>
            <p className="project-focus">{projects[2].focus}</p>
            <div className="project-tech">
              Spring Security / JWT / React / BCrypt
            </div>
            <ProjectLink project={projects[2]} onDetails={onDetails} />
          </div>
          <div className="project-art auth-art reveal">
            <ProjectScreenshot project={projects[2]} />
          </div>
        </article>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-intro">
          <div className="reveal">
            <p className="eyebrow">ABOUT ME</p>
            <h2 id="about-title">
              I like knowing
              <br />
              how things fit.
            </h2>
          </div>
          <div className="about-text reveal">
            <p>
              I’m drawn to the work between an interface and the systems behind
              it: deciding what an API should accept, how data should be stored,
              and what happens when a request fails.
            </p>
            <p>
              My projects have given me room to explore those questions with
              Java, React, and PostgreSQL. I’m looking for an internship where I
              can contribute to a team and learn from the way other engineers
              work.
            </p>
          </div>
        </div>
        <div className="skills-section reveal">
          <h3>What I work with</h3>
          <dl className="skills-list">
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <div className="experience-heading reveal">
          <p className="eyebrow">EXPERIENCE</p>
          <h2 id="experience-title">Work beyond the classroom.</h2>
        </div>
        <div className="experience-entry reveal">
          <div className="experience-date">
            <span>April — August 2025</span>
            <span>Rochester, NY</span>
          </div>
          <div className="experience-role">
            <h3>AOI Operator</h3>
            <p>
              YOH <span>· Contractor at L3Harris Technologies</span>
            </p>
            <p className="experience-context">
              This work taught me to look closely, document what I found, and
              work through discrepancies with a team.
            </p>
            <ul>
              <li>
                Operated and optimized automated optical inspection systems to
                detect PCB assembly defects.
              </li>
              <li>
                Collaborated with engineers and technicians to resolve
                inspection discrepancies.
              </li>
              <li>
                Documented inspection results and maintained records in company
                databases.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <p className="eyebrow reveal">GET IN TOUCH</p>
        <div className="contact-main reveal">
          <h2 id="contact-title">Let’s talk.</h2>
          <div>
            <p>
              I’m looking for a software engineering internship.
              <br />
              If you think I could be a good fit for your team, I’d love to hear
              from you.
            </p>
            <a
              className="text-link contact-email-cta"
              href={`mailto:${profile.email}`}
              aria-label="Email Dipesh Biswa"
            >
              Send me a note <Icon name="diagonal" size={17} />
            </a>
          </div>
        </div>
        <div className="contact-links reveal">
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon name="diagonal" size={16} />
          </a>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Icon name="diagonal" size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Icon name="diagonal" size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  usePageMotion();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Education />
        <Projects onDetails={setSelectedProject} />
        <About />
        <Experience />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>© 2026 Dipesh Biswa</span>
          <span>Software Engineering · Rochester, NY</span>
          <a href="#home">
            Back to top <Icon name="arrow" size={14} />
          </a>
        </div>
      </footer>
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const dismiss = () => {
    if (closeTimer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setClosing(false);
      onClose();
    }, 200);
  };
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;
    const previousFocus = document.activeElement as HTMLElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project]);
  return (
    <dialog
      ref={dialogRef}
      className={`project-dialog${closing ? " is-closing" : ""}`}
      aria-labelledby="case-study-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable =
          event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            dismiss();
        }
      }}
    >
      {project && (
        <>
          <div className="dialog-top">
            <span>PROJECT NOTES / {project.number}</span>
            <button
              type="button"
              className="close-dialog"
              aria-label="Close project details"
              onClick={dismiss}
            >
              <Icon name="close" size={23} />
            </button>
          </div>
          <div className="dialog-content">
            <p className="eyebrow">{project.category}</p>
            <h2 id="case-study-title">{project.name}</h2>
            <div className="dialog-meta">
              <span>{project.dates}</span>
            </div>
            <p className="dialog-lead">{project.description}</p>
            <section>
              <h3>The problem</h3>
              <p>{project.problem}</p>
            </section>
            <section>
              <h3>How it works</h3>
              <p>{project.experience}</p>
            </section>
            <section>
              <h3>My contributions</h3>
              <ul>
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Technologies & architecture</h3>
              <div className="tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <p>{project.architecture}</p>
            </section>
            <p className="dialog-preview-note">{project.previewNote}</p>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              Visit my GitHub profile <Icon name="diagonal" size={17} />
            </a>
          </div>
        </>
      )}
    </dialog>
  );
}
