export type LinkItem = {
  label: string;
  href: string;
};

export type ResearchProject = {
  organization: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
  result?: { label: string; value: string }[];
  links: LinkItem[];
};

export const profileLinks: LinkItem[] = [
  { label: "CV", href: "/#/cv" },
  { label: "Email", href: "mailto:pritish.saha@kgpian.iitkgp.ac.in" },
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
  "Efficient adaptation",
];

export const researchFocus = [
  {
    title: "State, memory, and model internals",
    description:
      "How models encode predictive state, what memory retains, and whether compact representations remain useful as policies change.",
    tags: ["belief states", "representation analysis", "agent memory"],
  },
  {
    title: "Reinforcement learning for reasoning",
    description:
      "How latent signals can provide credit beyond outcome rewards, and why predictivity alone may not be enough to change a policy.",
    tags: ["RL", "reasoning", "credit assignment"],
  },
  {
    title: "Reliable evaluation under policy change",
    description:
      "What conclusions remain trustworthy when the policy collecting or using the data changes over time.",
    tags: ["policy evaluation", "adaptive data", "reliability"],
  },
];

export const updates = [
  { date: "Jul 2026", text: "Completed a research internship at RAAPID INC on geometry-aware PEFT and clinical NLP." },
  { date: "May 2026", text: "Completed the main LaViDA evaluation for my bachelor thesis at IIT Kharagpur." },
  { date: "Mar 2026", text: "Mixture of Chapters accepted at the ICLR 2026 NFAM Workshop." },
  { date: "Jan 2026", text: "Released the first-author GRIT arXiv preprint." },
  { date: "Dec 2025", text: "Joined MARS 4.0 at the Cambridge AI Safety Hub." },
];

export const metrics = [
  {
    value: "+4.70pp",
    text: "seed-0 Oracle-augmented nearest-MSE arm over GRPO (MATH-500, n=8)",
  },
  { value: "R² ≈ 0.99", text: "Bayesian belief decoded from both observed streams in a passive transformer pilot" },
  { value: "262K", text: "learned memory tokens with chapter routing" },
  { value: "32%", text: "smaller exported GRIT adapter at <0.04pp accuracy loss" },
];

export const researchProjects: ResearchProject[] = [
  {
    organization: "Complex Networks Research Group (CNeRG) · IIT Kharagpur",
    title: "LaViDA: representation-level credit for mathematical reasoning",
    summary:
      "LaViDA studies whether latent representations can provide useful credit beyond exact-match rewards in GRPO. The broader question is how a predictive signal becomes a training signal that changes the model's policy.",
    bullets: [
      "Built Qwen2.5-Math-7B GRPO training with LoRA-r64, vLLM, and FlashAttention on a single H100, using 8,963 self traces and 3,354 filtered Oracle traces.",
      "In a seed-0 comparison, the Oracle-augmented nearest-MSE arm improved n=8 mean correctness by +4.70pp over GRPO. Because its reference data and training route also differed, I treat this as an arm-level comparison rather than evidence for the objective alone.",
      "An oracle-conditioned audit distinguished successful from unsuccessful rollouts, but the latent signal barely changed normalized credit and provided no learning signal when every sampled answer was wrong.",
    ],
    tags: ["reinforcement learning", "reasoning", "credit assignment"],
    result: [
      { label: "GRPO", value: "74.88%" },
      { label: "Nearest-MSE", value: "79.57%" },
    ],
    links: [{ label: "BTP slides", href: "/data/BTP2_ppt.pdf" }],
  },
  {
    organization: "MARS 4.0 · Cambridge AI Safety Hub · Prof. Fernando Rosas",
    title: "Predictive-state geometry in transformers and RL agents",
    summary:
      "Using analytically tractable transducer worlds, I study how models represent Bayesian predictive state and what changes when those representations are adapted for decision-making through reinforcement learning.",
    bullets: [
      "Built hierarchical-HMM and ε-transducer environments with exact Bayesian filters and predictive geometry.",
      "In a passive transformer pilot, decoded the observation-appropriate Bayesian belief well above shuffled and untrained controls, with predictive loss at the entropy-rate floor.",
      "Now extending this framework to recurrent control, asking what predictive structure RL preserves and what task-relevant information it makes easier for the policy to access and use.",
    ],
    tags: ["predictive state", "partially observable RL", "representation analysis"],
    image: "/images/research/mars-observation-regimes.png",
    imageAlt: "Analytical belief manifolds under three observation regimes",
    caption: "Analytical belief geometry under fully observed and coarse-grained regimes.",
    links: [
      {
        label: "Week-one MARS presentation",
        href: "https://drive.google.com/file/d/1e1NrSwDkh5JacG8v2lmQSzG7bedZAJMd/view?usp=sharing",
      },
    ],
  },
  {
    organization: "RAAPID INC · Prof. Amitava Das · arXiv preprint",
    title: "GRIT: geometry-aware PEFT",
    summary:
      "GRIT treats adapter updates as a geometric object using rank-space K-FAC, Fisher-guided reprojection, dynamic rank adaptation, and guarded high-rank-to-low-rank compression.",
    bullets: [
      "Authored fused Triton kernels for covariance fusion, GPU-side Cholesky inversion, and batched preconditioning.",
      "Built asynchronous CUDA streams that overlap K-FAC inversions and eigensolves with training across 60+ LoRA modules.",
      "Matched LoRA/QLoRA with 25–80% lower effective rank; exported a 32% smaller adapter at <0.04pp accuracy loss.",
    ],
    tags: ["PEFT", "optimization", "GPU systems"],
    image: "/images/research/grit-pipeline.png",
    imageAlt: "GRIT pipeline from LoRA update through K-FAC and Fisher reprojection",
    caption: "Rank-space curvature, preconditioning, and Fisher-guided reprojection.",
    links: [{ label: "Preprint", href: "https://arxiv.org/abs/2601.00231" }],
  },
  {
    organization: "ICLR 2026 NFAM Workshop",
    title: "Mixture of Chapters: learned memory in transformers",
    summary:
      "Mixture of Chapters adds a learned memory bank that transformer layers query through cross-attention, with sparse chapter routing to scale beyond dense memory access.",
    bullets: [
      "Scales to 262,208 learned memory tokens with 4,097 chapters and sparse top-k routing.",
      "Outperforms iso-FLOP vanilla transformer baselines during pretraining.",
      "Retains information better under heavy instruction fine-tuning.",
    ],
    tags: ["learned memory", "transformers", "efficient systems"],
    image: "/images/research/moc-architecture.jpg",
    imageAlt: "Mixture of Chapters architecture",
    caption: "Chapter-routed memory cross-attention.",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2603.21096" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=uwnwGYICWe" },
      { label: "Code", href: "https://github.com/Tasmay-Tibrewal/Memory" },
    ],
  },
];

export const publications = [
  {
    year: "2026",
    title: "Mixture of Chapters: Scaling Learnt Memory in Transformers",
    venue: "ICLR 2026 NFAM Workshop",
    role: "Co-author",
    description:
      "Sparse learned memory banks, chapter routing, 262K latent memory tokens, and improved retention during instruction fine-tuning.",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2603.21096" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=uwnwGYICWe" },
      { label: "Code", href: "https://github.com/Tasmay-Tibrewal/Memory" },
    ],
  },
  {
    year: "2026",
    title: "GRIT: Geometry-Aware PEFT with K-FAC Preconditioning, Fisher-Guided Reprojection, and Dynamic Rank Adaptation",
    venue: "arXiv preprint",
    role: "Sole first author",
    description:
      "Rank-space natural gradients for LoRA, Fisher-spectrum rank allocation, guarded compaction, and Triton/CUDA acceleration.",
    links: [{ label: "Preprint", href: "https://arxiv.org/abs/2601.00231" }],
  },
];

export const experiences = [
  {
    period: "Dec 2025–Present",
    title: "MARS 4.0 Fellow",
    place: "Cambridge AI Safety Hub · Prof. Fernando Rosas · Hybrid",
    description:
      "Studying predictive-state geometry in transformer world models and whether those representations remain reusable under reinforcement learning.",
  },
  {
    period: "Jul 2025–May 2026",
    title: "Research Intern",
    place: "Complex Networks Research Group (CNeRG), IIT Kharagpur · Prof. Pawan Goyal",
    description:
      "Built and evaluated LaViDA, studying when latent representation signals translate into useful credit for GRPO-trained mathematical reasoning models.",
  },
  {
    period: "Mar 2025–Jul 2026",
    title: "Research Intern",
    place: "RAAPID INC · Prof. Amitava Das · Remote",
    description:
      "Architected GRIT and its Triton/CUDA stack, then rebuilt clinical NER evaluation and deterministic QC to 0.640 exact micro-F1 with zero subword fragments across 5,035 rows.",
  },
  {
    period: "May–Jul 2026",
    title: "Data Science Intern",
    place: "Axis Bank, Business Intelligence Unit · Mumbai",
    description:
      "Built a temporally valid graph pipeline over 224.8M accounts and 1.31B transfers for explainable loan-fraud review.",
    bullets: [
      "Pruned the graph roughly 20× while retaining about 80% applicant coverage.",
      "The closest one-hop band reached roughly 81× the portfolio fraud rate.",
      "A separate scorecard indicated a feature ceiling rather than a model ceiling.",
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
    meta: "Runner-up · General Championship Data Analytics, IIT Kharagpur",
    description:
      "Captained a full-stack NLQ analytics dashboard for Frammer AI with LangGraph, self-healing SQL, KPI analysis, and synthetic star-schema evaluation.",
    tags: ["LangGraph", "FastAPI", "analytics"],
    links: [
      {
        label: "Presentation",
        href: "https://drive.google.com/file/d/1VRiHxlmjm4wJ9ezu4tE9BwB5iGUvbngH/view?usp=sharing",
      },
    ],
  },
  {
    title: "Amazon ML Challenge 2025",
    meta: "40.8 SMAPE",
    description:
      "Stacked Qwen2.5-VL-3B SFT with LightGBM over CLIP and text features using WebDataset, 4-bit QLoRA, Pseudo-Huber loss, and monotonic constraints.",
    tags: ["multimodal", "LightGBM", "QLoRA"],
    links: [{ label: "Code", href: "https://github.com/PritishSaha92/Amazon-ML-25" }],
  },
  {
    title: "American Express Campus Challenge",
    meta: "National Finalist · Decision Science Track",
    description:
      "Built a three-stage GBDT-Transformer ranking ensemble with 3K+ temporally valid features and a listwise Transformer trained on GBDT residuals.",
    tags: ["ranking", "temporal ML", "ensembles"],
    links: [
      { label: "Code", href: "https://github.com/PritishSaha92/AmEX-Spacebar-Sketchers-2025" },
    ],
  },
];

export const tools = [
  "Python",
  "C/C++",
  "PyTorch",
  "JAX",
  "FSDP/DTensor",
  "CUDA",
  "Triton",
  "Transformers",
  "PEFT/LoRA",
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
  "WebDataset",
  "LangGraph",
];
