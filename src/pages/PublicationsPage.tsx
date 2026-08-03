import { LinkRow, PageHeader } from "../components";
import { publications } from "../content";

function PublicationsPage() {
  return (
    <>
      <PageHeader eyebrow="Publications" title="Papers and preprints">
        <p>A short record of the work that is currently public.</p>
      </PageHeader>

      <section className="section-card page-block publication-list" aria-label="Publication list">
        {publications.map((publication) => (
          <article className="publication-item" key={publication.title}>
            <div className="publication-year">{publication.year}</div>
            <div>
              <h2>{publication.title}</h2>
              <p className="publication-meta">
                <strong>{publication.venue}</strong> · {publication.role}
              </p>
              <p>{publication.description}</p>
              <LinkRow links={publication.links} />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default PublicationsPage;
