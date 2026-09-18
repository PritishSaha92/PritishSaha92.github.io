import { Link } from "react-router-dom";
import { ArrowIcon, LinkRow, PageHeader } from "../components";
import { experiences } from "../content";
import "../detail-pages.css";

function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Research groups & internships">
        <p>
          I’ve worked with research groups and industry teams on model representations, fine-tuning, clinical
          NLP, and fraud detection.
        </p>
      </PageHeader>

      <section className="dp-experience-list" aria-label="Research and industry experience">
        {experiences.map((experience) => (
          <article
            className="dp-experience-entry"
            id={experience.place.includes("Axis Bank") ? "axis-bank" : undefined}
            tabIndex={-1}
            key={`${experience.period}-${experience.place}`}
          >
            <div className="dp-experience-period">{experience.period}</div>
            <div className="dp-experience-body">
              <h2>{experience.title}</h2>
              <p className="dp-experience-place">{experience.place}</p>
              <p>{experience.description}</p>
              {experience.bullets && (
                <ul className="dp-findings">
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

      <div className="dp-page-end">
        <p>For the full list, see my CV.</p>
        <Link className="text-link" to="/cv">
          View my CV <ArrowIcon direction="right" />
        </Link>
      </div>
    </>
  );
}

export default ExperiencePage;
