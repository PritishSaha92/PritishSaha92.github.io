import { Link } from "react-router-dom";
import type { LinkItem } from "./content";

export function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "right" | "down" }) {
  return (
    <svg
      className={`arrow-icon arrow-${direction}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="page-lead">{children}</div>
    </header>
  );
}

export function TagList({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  return (
    <div className={`tag-group${compact ? " compact-tags" : ""}`}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export function LinkRow({ links }: { links: LinkItem[] }) {
  return (
    <div className="link-row">
      {links.map((link) => {
        if (link.href.startsWith("/#/")) {
          return (
            <Link className="link-chip" key={link.href} to={link.href.replace("/#", "")}>
              {link.label}
              <ArrowIcon direction="right" />
            </Link>
          );
        }
        const opensNewTab = link.href.startsWith("http") || link.href.startsWith("/data/");
        return (
          <a
            className="link-chip"
            key={link.href}
            href={link.href}
            target={opensNewTab ? "_blank" : undefined}
            rel={opensNewTab ? "noreferrer" : undefined}
          >
            {link.label}
            <ArrowIcon />
            {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        );
      })}
    </div>
  );
}

export function SectionTitle({ children }: { icon?: string; children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}
