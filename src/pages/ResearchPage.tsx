import { LinkRow, PageHeader, TagList } from "../components";
import { researchProjects } from "../content";

function ResearchPage() {
  return (
    <>
      <PageHeader eyebrow="Research" title="Selected research">
        <p>
          Across these projects, I keep asking what information a model preserves, what data from a changing
          policy can tell us, and when we have enough to make a reliable decision.
        </p>
      </PageHeader>

      <div className="research-grid page-block">
        {researchProjects.map((project) => (
          <article className="research-card" key={project.title}>
            <p className="item-kicker">{project.organization}</p>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <TagList tags={project.tags} compact />
            <ul className="list-clean">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            {project.result && (
              <div className="mini-result" aria-label={`${project.title} selected result`}>
                {project.result.map((result) => (
                  <span key={result.label}>
                    {result.label} <b>{result.value}</b>
                  </span>
                ))}
              </div>
            )}

            {project.image && (
              <figure className="research-figure">
                <img src={project.image} alt={project.imageAlt} />
                <figcaption>{project.caption}</figcaption>
              </figure>
            )}

            <LinkRow links={project.links} />
          </article>
        ))}
      </div>
    </>
  );
}

export default ResearchPage;
