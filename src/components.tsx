import { Link } from "react-router-dom";
import type { LinkItem } from "./content";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
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
        const internalRoute = link.href.startsWith("/#/");
        if (internalRoute) {
          return (
            <Link className="link-chip" key={link.href} to={link.href.replace("/#", "")}>
              {link.label}
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
          </a>
        );
      })}
    </div>
  );
}

export function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="section-title">
      <span aria-hidden="true">{icon}</span>
      {children}
    </h2>
  );
}
