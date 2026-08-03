import { LinkRow, SectionTitle, TagList } from "../components";
import { interests, metrics, profileLinks, researchFocus, updates } from "../content";

function HomePage() {
  return (
    <>
      <section className="hero-card" aria-labelledby="profile-name">
        <div className="hero-grid">
          <div className="avatar-wrap">
            <img className="hero-avatar" src="/images/research/pritish-saha-informal.jpg" alt="Pritish Saha" />
          </div>

          <div className="hero-content">
            <h1 id="profile-name" className="hero-name">Pritish Saha</h1>
            <p className="hero-role">Final-year student · AI research</p>
            <p className="hero-affiliation">Indian Institute of Technology, Kharagpur</p>

            <div className="hero-bio">
              <p>
                Most of my work asks what a model has actually learned when it succeeds, what its data can really
                tell us, and how both hold up when the policy changes.
              </p>
              <p>
                I work across reinforcement learning, reasoning, predictive representations, agent memory, model
                internals, and efficient adaptation. I enjoy combining careful experiments with the systems work
                needed to make ideas run at scale.
              </p>
            </div>

            <TagList tags={interests} />
            <LinkRow links={profileLinks} />
          </div>
        </div>

        <div className="hero-subgrid">
          <div className="info-card">
            <div className="info-label">Current focus</div>
            <strong>Reasoning, predictive state, and learning under policy change</strong>
          </div>
          <div className="info-card">
            <div className="info-label">Approach</div>
            <strong>Theory, careful experiments, and systems</strong>
          </div>
          <div className="info-card">
            <div className="info-label">Contact</div>
            <a href="mailto:pritish.saha@kgpian.iitkgp.ac.in">pritish.saha@kgpian.iitkgp.ac.in</a>
          </div>
        </div>
      </section>

      <div className="home-grid page-block">
        <section className="section-card">
          <SectionTitle icon="◎">Research focus</SectionTitle>
          <div className="stack-list">
            {researchFocus.map((item) => (
              <article className="soft-panel" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <TagList tags={item.tags} compact />
              </article>
            ))}
          </div>
        </section>

        <section className="section-card">
          <SectionTitle icon="◷">Recent updates</SectionTitle>
          <div className="timeline-list">
            {updates.map((item) => (
              <div className="update-item" key={item.date}>
                <time>{item.date}</time>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section-card page-block">
        <SectionTitle icon="↗">Selected results</SectionTitle>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <div className="metric" key={metric.value}>
              <strong>{metric.value}</strong>
              <span>{metric.text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
