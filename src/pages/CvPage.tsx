import { ArrowIcon, PageHeader } from "../components";
import "../detail-pages.css";

function CvPage() {
  return (
    <>
      <PageHeader eyebrow="Pritish Saha" title="Curriculum vitae">
        <p>My education, research, publications, and technical experience.</p>
      </PageHeader>

      <section className="dp-cv-section" aria-label="Pritish Saha’s curriculum vitae">
        <div className="dp-cv-toolbar">
          <div>
            <p className="dp-cv-name">Pritish Saha</p>
            <p className="dp-cv-file">Curriculum vitae · PDF</p>
          </div>
          <div className="dp-cv-actions">
            <a className="text-link" href="/data/Pritish_CV.pdf" target="_blank" rel="noreferrer">
              Open in new tab <ArrowIcon />
            </a>
            <a className="button button-primary" href="/data/Pritish_CV.pdf" download="Pritish_Saha_CV.pdf">
              Download CV <ArrowIcon direction="down" />
            </a>
          </div>
        </div>
        <iframe className="dp-cv-frame" src="/data/Pritish_CV.pdf" title="Pritish Saha CV — PDF preview" />
        <p className="dp-cv-fallback">
          Preview not displaying?{" "}
          <a href="/data/Pritish_CV.pdf" target="_blank" rel="noreferrer">
            Open the PDF directly.
          </a>
        </p>
      </section>
    </>
  );
}

export default CvPage;
