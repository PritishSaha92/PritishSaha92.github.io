export type LinkItem = {
  label: string;
  href: string;
};

export { researchFocus, researchProjects, currentResearch } from "./research-content";
export type { ResearchProject } from "./research-content";

export const contactEmail = "pritish171@gmail.com";

export const profileLinks: LinkItem[] = [
  { label: "CV", href: "/#/cv" },
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pritish-saha-436a1922a/" },
  { label: "GitHub", href: "https://github.com/PritishSaha92" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=gmXhzpMAAAAJ&hl=en" },
];

export const interests = [
  "Reinforcement learning",
  "Reasoning",
  "Predictive state",
  "Agent memory",
  "Model internals",
  "Efficient learning & adaptation",
];

export const updates = [
  {
    date: "Jul 2026",
    dateTime: "2026-07",
    text: "I finished my internships at RAAPID INC and Axis Bank, where I worked on fine-tuning, clinical NLP, and transaction graphs.",
  },
  {
    date: "Mar 2026",
    dateTime: "2026-03",
    text: "Our paper, Mixture of Chapters, was accepted at the ICLR 2026 NFAM Workshop.",
  },
  { date: "Jan 2026", dateTime: "2026-01", text: "Our GRIT preprint is on arXiv. I’m the first author." },
];

export const publications = [
  {
    year: "2026",
    title: "Mixture of Chapters: Scaling Learnt Memory in Transformers",
    venue: "ICLR 2026 NFAM Workshop",
    role: "Co-author",
    description:
      "We use sparse chapter routing to let transformers query a much larger learned memory bank, and study how well they retain knowledge after instruction fine-tuning.",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2603.21096" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=uwnwGYICWe" },
      { label: "Code", href: "https://github.com/Tasmay-Tibrewal/Memory" },
    ],
  },
  {
    year: "2026",
    title:
      "GRIT: Geometry-Aware PEFT with K-FAC Preconditioning, Fisher-Guided Reprojection, and Dynamic Rank Adaptation",
    venue: "arXiv preprint",
    role: "First author",
    description:
      "GRIT uses curvature information to guide low-rank updates and allocate adapter capacity during fine-tuning.",
    links: [
      { label: "Preprint", href: "https://arxiv.org/abs/2601.00231" },
      {
        label: "RAAPID article",
        href: "https://www.raapidinc.com/labs/grit-geometry-aware-peft-kfac-fisher-rank-adaptation/",
      },
    ],
  },
];

export const experiences = [
  {
    period: "Dec 2025–Present",
    title: "MARS 4.0 Fellow",
    place: "Cambridge AI Safety Hub · Prof. Fernando Rosas · Hybrid",
    description:
      "I study how transformers represent predictive state, using environments where the correct Bayesian beliefs can be computed exactly.",
  },
  {
    period: "Jul 2025–May 2026",
    title: "Research Intern",
    place: "Complex Networks Research Group (CNeRG), IIT Kharagpur · Prof. Pawan Goyal",
    description:
      "I built and evaluated LaViDA to test whether hidden-state information can help mathematical-reasoning models learn with GRPO.",
  },
  {
    period: "Mar 2025–Jul 2026",
    title: "Research Intern",
    place: "RAAPID INC · Prof. Amitava Das · Remote",
    description:
      "I developed GRIT for parameter-efficient fine-tuning. I also worked on clinical named-entity recognition, rebuilding the evaluation pipeline and adding checks for malformed outputs and incorrect text spans.",
    links: [
      {
        label: "Research",
        href: "https://www.raapidinc.com/labs/grit-geometry-aware-peft-kfac-fisher-rank-adaptation/",
      },
      {
        label: "Technical disclosure",
        href: "https://www.raapidinc.com/labs/geometric-reprojection-instruction-tuning-language-model/",
      },
    ],
  },
  {
    period: "May–Jul 2026",
    title: "Data Science Intern",
    place: "Axis Bank, Business Intelligence Unit · Mumbai",
    description:
      "I built a transaction-graph pipeline to help analysts review suspected loan fraud, working with 224.8M accounts and 1.31B transfers. I evaluated it on monthly cohorts; without fraud-confirmation dates, those results don’t establish how it would perform in live use.",
    bullets: [
      "Reduced the graph to roughly one-twentieth of its size while retaining about 80% applicant coverage.",
      "The top 1% of the review queue achieved 5.49× mean lift across three monthly cohorts.",
    ],
    links: [
      {
        label: "Final presentation",
        href: "https://drive.google.com/file/d/1sOSdI06d-h-Mi6OKhAklsaRF8sPu17tN/view?usp=sharing",
      },
    ],
  },
];

export const appliedProjects = [
  {
    title: "GenAI analytics dashboard",
    meta: "3rd Place · General Championship Data Analytics, IIT Kharagpur",
    description:
      "I led Patel Hall’s team in building a dashboard for asking questions about data in plain language. It generates and repairs SQL and helps identify useful business metrics. We evaluated it on synthetic data.",
    tags: ["LangGraph", "FastAPI", "analytics"],
    links: [
      {
        label: "Presentation",
        href: "https://drive.google.com/file/d/1VRiHxlmjm4wJ9ezu4tE9BwB5iGUvbngH/view?usp=sharing",
      },
    ],
  },
  {
    title: "DRISHTI: multimodal remote sensing",
    meta: "4th Place · ISRO GeoNLI · Inter IIT Tech Meet 14.0",
    description:
      "I worked with the team on DRISHTI, a competition prototype for answering questions about RGB, SAR, and infrared imagery. It combines vision-language models with SAM3-based grounding for tasks such as captioning, counting, and estimating area.",
    tags: ["vision-language models", "remote sensing", "multimodal"],
    links: [
      {
        label: "Report",
        href: "https://drive.google.com/file/d/1wV529gO1rOvvg5_gR5nNmlEWt_f33v0g/view?usp=sharing",
      },
    ],
  },
  {
    title: "Amazon ML Challenge 2025",
    meta: "Multimodal price prediction",
    description:
      "I designed a product-pricing pipeline that combines a vision-language model with boosted trees using image and text features. The design also covers model stacking and how to handle missing images.",
    tags: ["multimodal", "LightGBM", "model design"],
    links: [{ label: "Code", href: "https://github.com/PritishSaha92/Amazon-ML-25" }],
  },
  {
    title: "American Express Campus Challenge",
    meta: "National Finalist · Decision Science Track",
    description:
      "My team built an offer-ranking system using customer history, boosted trees, and a residual Transformer. We used point-in-time joins and kept customers separate between training and validation to limit leakage.",
    tags: ["ranking", "temporal ML", "ensembles"],
    links: [{ label: "Code", href: "https://github.com/PritishSaha92/AmEX-Spacebar-Sketchers-2025" }],
  },
];

export const tools = [
  "Python",
  "C/C++",
  "SQL",
  "PyTorch",
  "JAX",
  "FSDP/DTensor",
  "CUDA",
  "Triton",
  "Transformers",
  "PEFT/LoRA",
  "bitsandbytes",
  "TRL",
  "vLLM",
  "FlashAttention-2",
  "PySpark",
  "Spark SQL",
  "Hadoop/HDFS",
  "GraphFrames",
  "SLURM",
  "Docker",
  "Linux",
  "Git",
  "WebDataset",
  "LangGraph",
];
