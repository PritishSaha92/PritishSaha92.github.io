import { LinkRow, PageHeader, TagList } from "../components";
import { appliedProjects } from "../content";

function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Applied work">
        <p>Selected systems and competitions that reflect how I build, evaluate, and optimize complete pipelines.</p>
      </PageHeader>

      <div className="project-grid page-block">
        {appliedProjects.map((project) => (
          <article className="section-card project-card" key={project.title}>
            <h2>{project.title}</h2>
            <p className="project-meta">{project.meta}</p>
            <p>{project.description}</p>
            <TagList tags={project.tags} compact />
            <LinkRow links={project.links} />
          </article>
        ))}
      </div>
    </>
  );
}

export default ProjectsPage;
