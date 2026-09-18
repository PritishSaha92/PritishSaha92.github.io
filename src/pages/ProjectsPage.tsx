import { ArrowIcon, LinkRow, PageHeader, TagList } from "../components";
import { appliedProjects } from "../content";
import "../detail-pages.css";

function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Selected projects" title="Applied machine learning">
        <p>
          Team projects and competition work in natural-language analytics, remote sensing, ranking, and
          multimodal prediction.
        </p>
      </PageHeader>

      <div className="dp-project-list">
        {appliedProjects.map((project, index) => (
          <article className="dp-project-entry" key={project.title}>
            <span className="dp-number" aria-hidden="true">
              0{index + 1}
            </span>
            <div className="dp-project-heading">
              <h2>{project.title}</h2>
              <p className="dp-project-meta">{project.meta}</p>
            </div>
            <div className="dp-project-body">
              <p>{project.description}</p>
              <TagList tags={project.tags} compact />
              <LinkRow links={project.links} />
            </div>
          </article>
        ))}
      </div>

      <div className="dp-page-end">
        <p>More code and experiments live on GitHub.</p>
        <a className="text-link" href="https://github.com/PritishSaha92" target="_blank" rel="noreferrer">
          Visit GitHub <ArrowIcon />
        </a>
      </div>
    </>
  );
}

export default ProjectsPage;
