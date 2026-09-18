import type { LinkItem } from "./content";

export type ResearchProject = {
  id: string;
  shortTitle: string;
  status: string;
  organization: string;
  title: string;
  question: string;
  summary: string;
  bullets: string[];
  tags: string[];
  note?: { label: string; text: string };
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  caption?: string;
  links: LinkItem[];
};

export const researchFocus = [
  {
    title: "State, memory, and model internals",
    question: "What is worth remembering?",
    description:
      "I’m interested in what RL agents learn to remember, how they use that memory to make decisions, and whether it stays useful as tasks change.",
    tags: ["belief states", "representation analysis", "agent memory"],
    links: [
      { label: "MARS", to: "/research#predictive-state" },
      { label: "Mixture of Chapters", to: "/research#mixture-of-chapters" },
    ],
  },
  {
    title: "Reinforcement learning for reasoning",
    question: "When does a signal become useful credit?",
    description:
      "I study whether a model’s hidden states can provide useful learning signals beyond a right or wrong final answer.",
    tags: ["RL", "reasoning", "credit assignment"],
    links: [{ label: "LaViDA / bachelor’s thesis", to: "/research#lavida" }],
  },
  {
    title: "Learning to adapt from costly feedback",
    question: "When is it worth finding out more?",
    description:
      "I’m interested in how agents learn when to seek more information, especially when feedback is costly and the right action is uncertain.",
    tags: ["offline RL", "adaptive policies", "value of information"],
    links: [{ label: "Current master’s thesis", to: "/research#mtp" }],
  },
];

export const currentResearch = {
  id: "mtp",
  title: "Master’s thesis",
  status: "Early-stage work · IIT Kharagpur",
  description: "For my master’s thesis, I’m exploring how agents learn to adapt when feedback has a cost.",
};

export const researchProjects: ResearchProject[] = [
  {
    id: "lavida",
    shortTitle: "LaViDA",
    status: "Bachelor’s thesis · Paper in preparation",
    organization: "Complex Networks Research Group · IIT Kharagpur · Prof. Pawan Goyal",
    title: "LaViDA: learning signals for reasoning",
    question: "Can a model’s hidden states provide a useful signal for learning?",
    summary:
      "In my bachelor’s thesis, I studied representation-based learning signals for mathematical reasoning. I wanted to understand when information in a model’s hidden states can help it learn, beyond predicting whether an answer is correct.",
    bullets: [
      "I built a Qwen2.5-Math-7B training and evaluation pipeline using LoRA, TRL, and vLLM.",
      "I compared these signals with GRPO trained only on final-answer rewards, and examined why promising diagnostics did not always lead to better learning.",
    ],
    tags: ["reinforcement learning", "mathematical reasoning", "credit assignment"],
    note: {
      label: "Current status",
      text: "I’m preparing the paper and completing further evaluations.",
    },
    links: [{ label: "Earlier BTP presentation", href: "/data/BTP2_ppt.pdf" }],
  },
  {
    id: "predictive-state",
    shortTitle: "MARS",
    status: "MARS 4.0 · Ongoing research",
    organization: "Cambridge AI Safety Hub · Prof. Fernando Rosas",
    title: "Predictive state in sequence models",
    question: "What information about the environment does a model keep?",
    summary:
      "Through MARS, I study what sequence models learn about environments they can only partly observe. I use small environments where the correct beliefs can be calculated exactly, so there is a clear reference for what the model represents.",
    bullets: [
      "I built the environments and Bayesian filters used in these representation studies.",
      "In small, fully observed transformer prediction pilots, Bayesian beliefs were decoded at R² = 0.985–0.997, above shuffled and untrained controls.",
    ],
    tags: ["predictive state", "representation analysis", "memory"],
    image: "/images/research/mars-observation-regimes.png",
    imageWidth: 2501,
    imageHeight: 843,
    imageAlt: "Analytical belief manifolds under three observation regimes",
    caption: "Bayesian belief geometry under different observation conditions.",
    links: [
      {
        label: "Early MARS presentation",
        href: "https://drive.google.com/file/d/1e1NrSwDkh5JacG8v2lmQSzG7bedZAJMd/view?usp=sharing",
      },
    ],
  },
  {
    id: "mixture-of-chapters",
    shortTitle: "Mixture of Chapters",
    status: "ICLR 2026 NFAM Workshop · Co-author",
    organization: "Learned memory in transformers",
    title: "Mixture of Chapters: learned memory",
    question: "How can we use a large memory bank without reading every entry?",
    summary:
      "We add a memory bank that is learned during training and queried by transformer layers through cross-attention. The bank is divided into chapters, so each query only needs to access a small part of it.",
    bullets: [
      "The architecture scales to 262,208 learned memory tokens across 4,097 chapters, with sparse top-k routing.",
      "We compare with standard transformers using roughly matched estimates of training compute, and test knowledge retention after instruction fine-tuning.",
    ],
    tags: ["learned memory", "transformers", "sparse routing"],
    image: "/images/research/moc-architecture.jpg",
    imageWidth: 800,
    imageHeight: 561,
    imageAlt: "Mixture of Chapters architecture showing chapter routing and memory cross-attention",
    caption: "Sparse chapter routing connects transformer layers to a learned memory bank.",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2603.21096" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=uwnwGYICWe" },
      { label: "Code", href: "https://github.com/Tasmay-Tibrewal/Memory" },
    ],
  },
  {
    id: "grit",
    shortTitle: "GRIT",
    status: "arXiv preprint · First author",
    organization: "RAAPID INC · Prof. Amitava Das",
    title: "GRIT: geometry-aware fine-tuning",
    question: "How should a low-rank adapter use its limited capacity?",
    summary:
      "In GRIT, we use curvature information to guide low-rank updates during fine-tuning. The method combines rank-space K-FAC preconditioning, Fisher-guided reprojection, and dynamic rank allocation.",
    bullets: [
      "The method adjusts how much effective rank is used by each LoRA module.",
      "The preprint reports 66.19% on GSM8K with Llama-3.1-8B, compared with 63.38% for LoRA, using a 27.8% smaller effective active update footprint.",
    ],
    tags: ["PEFT", "optimization geometry", "efficient adaptation"],
    note: {
      label: "About the reported reduction",
      text: "This measures the effective active update size. The full tensors are still allocated during training, so it should not be read as an equivalent saving in GPU memory or inference time.",
    },
    image: "/images/research/grit-pipeline.png",
    imageWidth: 1127,
    imageHeight: 207,
    imageAlt:
      "GRIT pipeline from low-rank updates through K-FAC preconditioning and Fisher-guided reprojection",
    caption: "Curvature-aware updates and Fisher-guided allocation of effective rank.",
    links: [
      { label: "Preprint", href: "https://arxiv.org/abs/2601.00231" },
      {
        label: "RAAPID article",
        href: "https://www.raapidinc.com/labs/grit-geometry-aware-peft-kfac-fisher-rank-adaptation/",
      },
      {
        label: "Technical disclosure",
        href: "https://www.raapidinc.com/labs/geometric-reprojection-instruction-tuning-language-model/",
      },
    ],
  },
];
