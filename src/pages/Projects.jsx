import projects from '../data/projects.json';

function Entry({ project, no }) {
  const { name, category, status, website, github, image, description, tech } = project;
  return (
    <article className="entry grid" id={project.slug}>
      <div className="entry-meta">
        <h2>
          <span className="muted">{String(no).padStart(2, '0')}</span>&ensp;{name}
        </h2>
        <dl>
          <div>
            <dt>Type</dt>
            <dd>{category}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{status}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{tech.join(', ')}</dd>
          </div>
          {(website || github) && (
            <div>
              <dt>Links</dt>
              <dd>
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {status === 'Demo' ? 'Demo' : 'Site'} ↗
                  </a>
                )}
                {website && github && ', '}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    Code ↗
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>
      <div className="entry-body">
        {image && (
          <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`}>
            <div className="shot-img">
              <img src={image} alt={`Screenshot of ${name}`} loading="lazy" />
            </div>
          </a>
        )}
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <>
      <section className="page-title wrap">
        <div className="grid">
          <h1>Work</h1>
          <p>
            Most of what I build runs on real projects and stays private. The public demos use
            fictional sample data, so everything in them can be clicked.
          </p>
        </div>
      </section>
      <div className="wrap">
        {projects.map((p, i) => (
          <Entry key={p.slug} project={p} no={i + 1} />
        ))}
      </div>
    </>
  );
}
