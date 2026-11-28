import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import SheetLabel from '../components/SheetLabel';
import { FeaturedProject } from '../components/ProjectIndex';
import { ArrowRight, ArrowUpRight } from '../components/Icons';

function ProjectCard({ project }) {
  const isPrivate = !project.website && !project.github;
  return (
    <article className="card reveal">
      {project.image ? (
        <div className="card-shot">
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
        </div>
      ) : (
        <div className="card-shot placeholder">
          <span className="mono">{isPrivate ? 'Private · runs on real jobs' : 'No preview'}</span>
        </div>
      )}
      <div className="card-body">
        <span className="mono" style={{ color: 'var(--ink-3)' }}>
          {project.kind}
        </span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="tags">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {!isPrivate && (
          <div className="actions">
            {project.website && (
              <a className="text-link" href={project.website} target="_blank" rel="noopener noreferrer">
                Live <ArrowUpRight />
              </a>
            )}
            {project.github && (
              <a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer">
                Code <ArrowUpRight />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const construction = projects.filter((p) => !p.featured && p.kind !== 'Web');
  const web = projects.filter((p) => p.kind === 'Web');

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <SheetLabel no="A-200">Work</SheetLabel>
          <h1 className="h-display">
            Tools for the <em>jobsite.</em>
          </h1>
          <p className="lead">
            Most of what I build runs on real projects and stays private. What is public runs on
            fictional sample data, so you can click through everything.
          </p>
        </div>
      </header>

      <section className="sheet" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {featured && <FeaturedProject project={featured} />}

          <div style={{ marginTop: 72 }}>
            <SheetLabel no="A-201">Construction tech</SheetLabel>
            <div className="cards">
              {construction.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 72 }}>
            <SheetLabel no="A-202">Web</SheetLabel>
            <div className="cards">
              {web.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>

          <div className="work-head" style={{ marginTop: 72, marginBottom: 0 }}>
            <h2 className="h2" style={{ margin: 0 }}>
              Want to see the private work?
            </h2>
            <Link className="btn btn-primary" to="/contact">
              Get in touch <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
