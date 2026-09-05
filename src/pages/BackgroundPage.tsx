import { PageHeader, SectionTitle, TagList } from "../components";
import { tools } from "../content";

function BackgroundPage() {
  return (
    <>
      <PageHeader eyebrow="Background" title="Background and tools">
        <p>The academic context and systems toolkit behind my research.</p>
      </PageHeader>

      <div className="background-grid page-block">
        <section className="section-card">
          <SectionTitle icon="◇">Education</SectionTitle>
          <h2 className="education-title">Indian Institute of Technology, Kharagpur</h2>
          <p>
            B.Tech. (Hons.) in Manufacturing Science and Engineering and M.Tech. in Industrial Engineering and
            Management. Expected May 2027.
          </p>
          <p className="muted-text">
            Coursework and self-study include operations research, probability and statistics, linear algebra,
            Stanford CS229 and CS230, LLM agents, and generative AI safety.
          </p>
          <div className="soft-panel research-note">
            <strong>Research interests</strong>
            <p>
              I am interested in what agents need to represent or retain, what adaptively collected data can tell
              us, and what remains reliable as objectives or policies change.
            </p>
          </div>
        </section>

        <section className="section-card">
          <SectionTitle icon="⌁">Tools</SectionTitle>
          <TagList tags={tools} />
        </section>
      </div>

      <section className="section-card contact-card page-block">
        <div>
          <SectionTitle icon="✉">Get in touch</SectionTitle>
          <p>
            I’m always happy to talk about research and am open to collaborations or research-focused roles beginning
            in 2027. If our interests overlap, please feel free to reach out.
          </p>
          <p className="muted-text">
            References available on request. Outside research: Codeforces, football and water polo, karate, and NSS
            volunteering.
          </p>
        </div>
        <div className="contact-links">
          <a href="mailto:pritish.saha@kgpian.iitkgp.ac.in">IIT KGP email</a>
          <a href="mailto:pritish171@gmail.com">Gmail</a>
          <a href="https://www.linkedin.com/in/pritish-saha-436a1922a/">LinkedIn</a>
          <a href="https://github.com/PritishSaha92">GitHub</a>
          <a href="https://huggingface.co/Pritish92">Hugging Face</a>
        </div>
      </section>
    </>
  );
}

export default BackgroundPage;
