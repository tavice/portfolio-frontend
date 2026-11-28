import { ArrowUpRight } from './Icons';

// Compact list of projects, laid out like a drawing index.
export default function ProjectIndex({ projects, startAt = 1 }) {
  return (
    <ol className="index">
      {projects.map((p, i) => (
        <li className="index-row reveal" key={p.slug}>
          <span className="index-no">{String(startAt + i).padStart(2, '0')}</span>
          <span className="index-name">
            {p.name}
            <span className="index-kind">{p.kind}</span>
          </span>
          <span className="index-desc">{p.summary}</span>
          <span className="index-links">
            {p.website && (
              <a href={p.website} target="_blank" rel="noopener noreferrer">
                Live
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            )}
            {!p.website && !p.github && <span className="private">Private</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function FeaturedProject({ project }) {
  return (
    <article className="feature reveal">
      <a
        className="feature-shot"
        href={project.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${project.name} demo`}
      >
        <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" width="1074" height="539" />
        <span className="badge badge-accent">Live demo</span>
      </a>
      <div className="feature-body">
        <span className="mono" style={{ color: 'var(--ink-3)' }}>
          Featured · {project.kind}
        </span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="tags">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="actions">
          <a className="btn btn-primary" href={project.website} target="_blank" rel="noopener noreferrer">
            Open demo <ArrowUpRight />
          </a>
          {project.github && (
            <a className="btn btn-ghost" href={project.github} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
