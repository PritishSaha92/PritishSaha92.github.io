export const siteUrl = "https://pritishsaha92.github.io";

export const pages = [
  {
    path: "/",
    title: "Pritish Saha — Machine learning & research",
    description:
      "Pritish Saha, final-year dual-degree student at IIT Kharagpur. Research in reinforcement learning, reasoning, and memory. Graduating May 2027.",
  },
  {
    path: "/research/",
    title: "Research · Pritish Saha",
    description:
      "Research on reinforcement learning, mathematical reasoning, model representations, and memory: LaViDA, MARS, Mixture of Chapters, GRIT, and my current thesis.",
  },
  {
    path: "/projects/",
    title: "Projects · Pritish Saha",
    description:
      "Selected projects by Pritish Saha in transaction graphs, remote sensing, machine learning, and analytics.",
  },
  {
    path: "/experience/",
    title: "Experience · Pritish Saha",
    description:
      "Pritish Saha’s research and industry experience at IIT Kharagpur, Cambridge AI Safety Hub, RAAPID INC, and Axis Bank.",
  },
  {
    path: "/background/",
    title: "About · Pritish Saha",
    description:
      "About Pritish Saha: education at IIT Kharagpur, research interests, technical skills, and contact details. Graduating May 2027.",
  },
  {
    path: "/publications/",
    title: "Publications · Pritish Saha",
    description:
      "Papers and preprints by Pritish Saha, including Mixture of Chapters and GRIT, with links to the original publications and code.",
  },
  {
    path: "/cv/",
    title: "CV · Pritish Saha",
    description:
      "View or download Pritish Saha’s CV: education, research, publications, and technical experience.",
  },
];

export const notFoundPage = {
  title: "Page not found · Pritish Saha",
  description: "This page could not be found. Explore Pritish Saha’s research, projects, and experience from the homepage.",
};

export function findPage(pathname: string) {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  return pages.find((page) => page.path === path);
}

export function updatePageMetadata(pathname: string) {
  const page = findPage(pathname);
  const metadata = page ?? notFoundPage;
  document.title = metadata.title;
  const values: Record<string, string> = {
    'meta[name="description"]': metadata.description,
    'meta[property="og:title"]': metadata.title,
    'meta[property="og:description"]': metadata.description,
    'meta[property="og:url"]': page ? `${siteUrl}${page.path}` : "",
    'meta[name="robots"]': page ? "index, follow" : "noindex, follow",
  };
  for (const [selector, value] of Object.entries(values)) {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
  }
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (page) {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${siteUrl}${page.path}`;
  } else {
    canonical?.remove();
  }
}
