import { ArrowIcon, LinkRow, PageHeader } from "../components";
import { publications } from "../content";
import "../detail-pages.css";

function PublicationsPage() {
  return (
    <>
      <PageHeader eyebrow="Publications" title="Papers & preprints">
        <p>My papers on learned memory and efficient fine-tuning, with links to the available code.</p>
      </PageHeader>

      <section className="dp-publication-list" aria-label="Publication list">
        {publications.map((publication) => (
          <article className="dp-publication-entry" key={publication.title}>
            <div className="dp-publication-year">{publication.year}</div>
            <div>
              <div className="dp-publication-labels">
                <span className="dp-status">
                  {publication.venue.includes("preprint") ? "Preprint" : "Workshop paper"}
                </span>
                <span>{publication.role}</span>
              </div>
              <h2>{publication.title}</h2>
              <p className="dp-publication-venue">{publication.venue}</p>
              <p className="dp-publication-description">{publication.description}</p>
              <LinkRow links={publication.links} />
            </div>
          </article>
        ))}
      </section>

      <div className="dp-page-end">
        <p>You can also find my papers on Google Scholar.</p>
        <a
          className="text-link"
          href="https://scholar.google.com/citations?user=gmXhzpMAAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
        >
          Google Scholar <ArrowIcon />
        </a>
      </div>
    </>
  );
}

export default PublicationsPage;
