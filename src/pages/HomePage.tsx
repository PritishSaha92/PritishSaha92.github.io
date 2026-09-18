import { Link } from "react-router-dom";
import { ArrowIcon, TagList } from "../components";
import { researchFocus, updates } from "../content";

const selectedWork = [
  {
    number: "01",
    category: "Bachelor’s thesis · Paper in preparation",
    title: "Learning signals for mathematical reasoning",
    name: "LaViDA",
    description:
      "For my bachelor’s thesis, I studied whether a model’s hidden states can help it learn to solve maths problems, beyond rewarding correct final answers.",
    result: "Thesis completed; paper in preparation.",
    route: "/research#lavida",
    tags: ["RL for reasoning", "Credit assignment"],
    image: undefined,
    alt: undefined,
  },
  {
    number: "02",
    category: "MARS 4.0 · Ongoing research",
    title: "How models represent what they observe",
    name: "Predictive-state representations",
    description:
      "Through MARS, I study what sequence models learn about environments they can only partly observe, using exact Bayesian beliefs as a reference.",
    result: "Completed work includes analytical environments and transformer prediction pilots.",
    image: "/images/research/mars-observation-regimes.png",
    alt: "Exact belief geometry under different observation regimes",
    route: "/research#predictive-state",
    tags: ["Belief states", "Memory reuse"],
  },
  {
    number: "03",
    category: "Co-author · ICLR 2026 NFAM Workshop",
    title: "Scaling learned memory in transformers",
    name: "Mixture of Chapters",
    description:
      "We add a learned memory bank to transformers and divide it into chapters. A query accesses only a few chapters, allowing us to use a much larger bank.",
    result: "262K learned memory tokens, accessed through sparse routing.",
    image: "/images/research/moc-architecture.jpg",
    alt: "Mixture of Chapters architecture with memory cross-attention",
    route: "/research#mixture-of-chapters",
    tags: ["Learned memory", "Transformers"],
  },
  {
    number: "04",
    category: "First author · arXiv preprint",
    title: "Geometry-aware fine-tuning",
    name: "GRIT",
    description:
      "I developed GRIT to use curvature information when adapting language models. It guides low-rank updates and adjusts the effective rank of each adapter.",
    result: "Rank-space K-FAC, Fisher-guided reprojection, and dynamic rank allocation.",
    image: "/images/research/grit-pipeline.png",
    alt: "GRIT pipeline with curvature-aware preconditioning and reprojection",
    route: "/research#grit",
    tags: ["PEFT", "Optimization geometry"],
  },
];

function exploreResearch() {
  const section = document.getElementById("research-focus");
  section?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
  section?.focus({ preventScroll: true });
}

function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="profile-name">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" /> Reinforcement learning · Memory · Reasoning
          </p>
          <h1 id="profile-name">
            Hi, I’m <em>Pritish</em>
          </h1>
          <p className="hero-intro">
            I study how models learn,
            <br />
            reason, and remember.
          </p>
          <p className="hero-bio">
            I’m a final-year dual-degree student at IIT Kharagpur, working on reinforcement learning and model
            memory. I’m interested in what models learn beyond getting an answer right, and how they use that
            information to make decisions.
          </p>
          <div className="hero-actions">
            <button className="button" onClick={exploreResearch}>
              Explore my research <ArrowIcon direction="down" />
            </button>
            <Link className="text-link" to="/cv">
              View my CV <ArrowIcon />
            </Link>
          </div>
          <p className="hero-availability">
            <span className="status-dot" /> Graduating May 2027 · Open to full-time roles
          </p>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img
              src="/images/research/pritish-saha-formal.jpg"
              alt="Pritish Saha in a dark blazer, outdoors"
              width="1299"
              height="1514"
            />
          </div>
          <figcaption>
            <span>IIT Kharagpur · Class of 2027</span>
          </figcaption>
        </figure>
      </section>

      <div className="affiliations" aria-label="Research and internship experience">
        <span className="affiliation-label">Research & industry experience</span>
        <div className="affiliation-names">
          <span>IIT Kharagpur</span>
          <span>RAAPID INC</span>
          <span>Axis Bank</span>
          <span className="cambridge-name">Cambridge AI Safety Hub</span>
        </div>
      </div>

      <section
        id="research-focus"
        className="home-section research-focus"
        aria-labelledby="focus-heading"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">The questions I keep coming back to</p>
            <h2 id="focus-heading">Research focus</h2>
          </div>
        </div>
        <div className="focus-grid">
          {researchFocus.map((focus, index) => (
            <article className="focus-item" key={focus.title}>
              <span className="focus-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{focus.title}</h3>
              <p className="focus-question">{focus.question}</p>
              <p className="focus-description">{focus.description}</p>
              <TagList tags={focus.tags} compact />
              <div className="focus-links">
                {focus.links.map((link) => (
                  <Link className="text-link" to={link.to} key={link.to}>
                    {link.label}
                    <ArrowIcon direction="right" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="selected-work"
        className="home-section selected-work"
        aria-labelledby="work-heading"
        tabIndex={-1}
      >
        <div className="section-heading">
          <div>
            <h2 id="work-heading">Selected research</h2>
          </div>
          <Link className="text-link" to="/research">
            Research in detail <ArrowIcon direction="right" />
          </Link>
        </div>
        <div className="work-list">
          {selectedWork.map((work) => (
            <article className="work-item" key={work.number}>
              <span className="work-number" aria-hidden="true">
                {work.number}
              </span>
              <div className="work-copy">
                <p className="work-category">{work.category}</p>
                <h3>
                  <Link to={work.route}>
                    {work.title}
                    <ArrowIcon />
                  </Link>
                </h3>
                <p className="work-name">{work.name}</p>
                <p className="work-description">{work.description}</p>
                <p className="work-result">{work.result}</p>
                <TagList tags={work.tags} compact />
              </div>
              <Link
                to={work.route}
                className={`work-visual work-visual-${work.number}`}
                aria-label={`Read about ${work.name}`}
                tabIndex={-1}
              >
                {work.image ? (
                  <img src={work.image} alt={work.alt} loading="lazy" width="560" height="320" />
                ) : (
                  <div
                    className="credit-diagram"
                    aria-label="Research question: how a representation signal becomes credit and then a policy update"
                  >
                    <span>Representation signal</span>
                    <span className="credit-arrow" aria-hidden="true">
                      ↓
                    </span>
                    <span>Useful credit</span>
                    <span className="credit-arrow" aria-hidden="true">
                      ↓
                    </span>
                    <span>Policy update</span>
                  </div>
                )}
                <span className="work-visual-caption">
                  {work.name}
                  <ArrowIcon />
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="work-more">
          <p>I’ve also worked on transaction graphs, remote sensing, and analytics tools.</p>
          <Link className="text-link" to="/projects">
            Explore my projects <ArrowIcon direction="right" />
          </Link>
        </div>
      </section>

      <section className="home-section notes-section" aria-labelledby="notes-heading">
        <div className="section-heading">
          <div>
            <h2 id="notes-heading">Recent updates</h2>
          </div>
          <Link className="text-link" to="/experience">
            My experience <ArrowIcon direction="right" />
          </Link>
        </div>
        <div className="updates-list">
          {updates.slice(0, 4).map((update) => (
            <div className="update-item" key={update.text}>
              <time dateTime={update.dateTime}>{update.date}</time>
              <p>{update.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default HomePage;
