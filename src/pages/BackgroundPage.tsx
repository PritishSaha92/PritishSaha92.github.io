import { ArrowIcon, PageHeader, TagList } from "../components";
import { contactEmail, tools } from "../content";
import "../detail-pages.css";

const skillGroups = [
  { name: "Languages", names: ["Python", "C/C++", "SQL"] },
  {
    name: "Training & inference",
    names: [
      "PyTorch",
      "JAX",
      "Transformers",
      "PEFT/LoRA",
      "bitsandbytes",
      "TRL",
      "vLLM",
      "FlashAttention-2",
      "FSDP/DTensor",
      "WebDataset",
    ],
  },
  { name: "GPU & systems", names: ["CUDA", "Triton", "SLURM", "Docker", "Linux", "Git"] },
  { name: "Data & agents", names: ["PySpark", "Spark SQL", "Hadoop/HDFS", "GraphFrames", "LangGraph"] },
];

const contactLinks = [
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "Hugging Face", href: "https://huggingface.co/Pritish92" },
];

function BackgroundPage() {
  return (
    <>
      <PageHeader eyebrow="About me" title="A little more about me">
        <p>
          I’m a final-year dual-degree student at IIT Kharagpur. My research focuses on reinforcement
          learning, reasoning, and memory. I also enjoy building the training and evaluation systems behind
          the experiments.
        </p>
      </PageHeader>

      <section className="dp-about-section" aria-labelledby="education-title">
        <h2 className="dp-section-label" id="education-title">
          Education
        </h2>
        <div className="dp-about-content">
          <p className="dp-small-label">Expected May 2027</p>
          <h3 className="dp-education-title">Indian Institute of Technology, Kharagpur</h3>
          <div className="dp-degrees">
            <p>
              <span>B.Tech.</span> Manufacturing Science and Engineering
            </p>
            <p>
              <span>M.Tech.</span> Industrial and Systems Engineering
            </p>
          </div>
          <p className="dp-muted">
            Coursework and self-study include operations research, probability and statistics, linear algebra,
            Stanford CS229 and CS230, LLM agents, and generative AI safety.
          </p>
        </div>
      </section>

      <section className="dp-about-section" aria-labelledby="interests-title">
        <h2 className="dp-section-label" id="interests-title">
          What interests me
        </h2>
        <div className="dp-about-content">
          <p className="dp-interest-statement">What does a model need to remember to make a good decision?</p>
          <p>
            This question comes up in different forms across my work: learning to reason, representing a
            partially observed environment, and retaining knowledge during fine-tuning. I’m also interested in
            when an agent should seek more information.
          </p>
        </div>
      </section>

      <section className="dp-about-section" aria-labelledby="toolkit-title">
        <h2 className="dp-section-label" id="toolkit-title">
          Tools I work with
        </h2>
        <div className="dp-skills">
          {skillGroups.map((group) => (
            <div className="dp-skill-group" key={group.name}>
              <h3>{group.name}</h3>
              <TagList tags={group.names.filter((name) => tools.includes(name))} compact />
            </div>
          ))}
        </div>
      </section>

      <section className="dp-about-section" id="systems" tabIndex={-1} aria-labelledby="systems-title">
        <h2 className="dp-section-label" id="systems-title">
          What I’m learning now
        </h2>
        <div className="dp-about-content">
          <p>
            I’m spending more time with CUDA, Triton, and RL training systems: checking correctness, profiling
            code, and understanding where the time goes.
          </p>
        </div>
      </section>

      <section className="dp-about-section dp-about-personal" aria-labelledby="outside-title">
        <h2 className="dp-section-label" id="outside-title">
          Outside the lab
        </h2>
        <div className="dp-personal-content">
          <div className="dp-about-content">
            <p>
              Outside research, I enjoy Codeforces, football, water polo, and karate. I’ve also volunteered
              with NSS.
            </p>
            <p className="dp-small-label dp-elsewhere-label">Elsewhere</p>
            <div className="dp-elsewhere-links">
              {contactLinks.map((link) => (
                <a
                  className="text-link"
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
            <p className="dp-reference-note">References available on request.</p>
          </div>
          <figure className="dp-personal-photo">
            <img
              src="/images/research/pritish-saha-informal.jpg"
              alt="Pritish beside a river, wearing a life jacket and holding a rafting paddle"
              width="1671"
              height="1507"
              loading="lazy"
            />
            <figcaption>A day away from the desk.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

export default BackgroundPage;
