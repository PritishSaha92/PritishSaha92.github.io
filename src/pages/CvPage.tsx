import { PageHeader } from "../components";

function CvPage() {
  return (
    <>
      <PageHeader eyebrow="Curriculum vitae" title="CV">
        <p>Research, publications, education, and selected technical work.</p>
      </PageHeader>

      <section className="section-card page-block cv-card">
        <div className="cv-actions">
          <a className="link-chip primary-chip" href="/data/Pritish_CV.pdf" target="_blank" rel="noreferrer">
            Open PDF
          </a>
          <a className="link-chip" href="/data/Pritish_CV.pdf" download>
            Download
          </a>
        </div>
        <iframe className="cv-frame" src="/data/Pritish_CV.pdf" title="Pritish Saha CV" />
      </section>
    </>
  );
}

export default CvPage;
