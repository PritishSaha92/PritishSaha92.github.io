import { Link } from "react-router-dom";
import { ArrowIcon, LinkRow, PageHeader, TagList } from "../components";
import { currentResearch, researchProjects } from "../content";
import "../detail-pages.css";

function ResearchPage() {
  return (
    <>
      <PageHeader eyebrow="Research" title="Learning, reasoning, and memory">
        <p>
          I work on reinforcement learning, model representations, and memory. These projects look at how
          models learn from feedback, what they retain, and how they use that information.
        </p>
      </PageHeader>

      <nav className="dp-research-nav" aria-label="Research on this page">
        <p className="dp-small-label">Explore the work</p>
        <ul>
          {researchProjects.map((project, index) => (
            <li key={project.id}>
              <Link to={`/research#${project.id}`}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {project.shortTitle}
              </Link>
            </li>
          ))}
          <li>
            <Link to={`/research#${currentResearch.id}`}>
              Current thesis <ArrowIcon direction="down" />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="dp-research-list">
        {researchProjects.map((project, index) => (
          <article
            className="dp-research-entry"
            id={project.id}
            tabIndex={-1}
            aria-labelledby={`${project.id}-title`}
            key={project.id}
          >
            <div className="dp-research-heading">
              <div className="dp-research-meta">
                <span className="dp-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="dp-research-status">{project.status}</p>
              </div>
              <h2 id={`${project.id}-title`}>{project.title}</h2>
              <p className="dp-organization">{project.organization}</p>
              <TagList tags={project.tags} compact />
            </div>

            <div className="dp-research-body">
              <p className="dp-research-question">{project.question}</p>
              <p className="dp-summary">{project.summary}</p>
              <ul className="dp-findings">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {project.note && (
                <div className="dp-research-note">
                  <p className="dp-small-label">{project.note.label}</p>
                  <p>{project.note.text}</p>
                </div>
              )}

              {project.image && (
                <figure className="dp-research-figure">
                  <a
                    href={project.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View full-size figure: ${project.imageAlt} (opens in a new tab)`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>{project.caption}</figcaption>
                </figure>
              )}

              {project.links.length > 0 && <LinkRow links={project.links} />}
            </div>
          </article>
        ))}
      </div>

      <section
        className="dp-about-section"
        id={currentResearch.id}
        tabIndex={-1}
        aria-labelledby="current-thesis-title"
      >
        <h2 className="dp-section-label" id="current-thesis-title">
          {currentResearch.title}
        </h2>
        <div className="dp-about-content">
          <p className="dp-small-label">{currentResearch.status}</p>
          <p>{currentResearch.description}</p>
        </div>
      </section>

      <div className="dp-page-end">
        <p>Papers and code from this work.</p>
        <Link className="text-link" to="/publications">
          View publications <ArrowIcon direction="right" />
        </Link>
      </div>
    </>
  );
}

export default ResearchPage;
