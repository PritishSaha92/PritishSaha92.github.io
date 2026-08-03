import { LinkRow, PageHeader } from "../components";
import { experiences } from "../content";

function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Research and experience">
        <p>Research roles first, followed by selected applied work at scale.</p>
      </PageHeader>

      <section className="section-card page-block experience-list" aria-label="Experience timeline">
        {experiences.map((experience) => (
          <article className="experience-item" key={`${experience.period}-${experience.place}`}>
            <div className="experience-period">{experience.period}</div>
            <div>
              <h2>{experience.title}</h2>
              <p className="experience-place">{experience.place}</p>
              <p>{experience.description}</p>
              {experience.bullets && (
                <ul className="list-clean compact-list">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {experience.links && <LinkRow links={experience.links} />}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default ExperiencePage;
