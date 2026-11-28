import { Link } from 'react-router-dom';
import about from '../data/about.json';
import projects from '../data/projects.json';
import ProjectTable from '../components/ProjectTable';

function Shot({ project, size }) {
  return (
    <figure className={`shot ${size}`}>
      <a href={project.website} target="_blank" rel="noopener noreferrer">
        <div className="shot-img">
          <img src={project.image} alt={`Screenshot of ${project.name}`} loading="lazy" />
        </div>
        <figcaption>
          <span className="name">{project.name}</span>
          <span className="muted">
            {project.category}, {project.status.toLowerCase()} ↗
          </span>
          <span className="summary">{project.summary}</span>
        </figcaption>
      </a>
    </figure>
  );
}

export default function Home() {
  const { mainInfo, intro, facts, about: paragraphs, toolbox, connect, contact } = about;
  const [lead, ...pair] = projects.filter((p) => p.image);

  return (
    <>
      <section className="intro wrap">
        <div className="grid">
          <h1>{intro}</h1>
        </div>
      </section>

      <div className="wrap">
        <dl className="facts grid">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="section wrap" id="work">
        <div className="section-head">
          <h2>Selected work</h2>
          <Link to="/projects">All projects</Link>
        </div>
        <div className="grid shots">
          <Shot project={lead} size="wide" />
          {pair.slice(0, 2).map((p) => (
            <Shot key={p.slug} project={p} size="half" />
          ))}
        </div>
        <ProjectTable projects={projects} />
      </section>

      <section className="section wrap" id="about">
        <div className="section-head">
          <h2>About</h2>
          <a href={mainInfo.resume}>Resume (PDF)</a>
        </div>
        <div className="grid">
          <figure className="about-photo">
            <img src={mainInfo.headshot} alt={`Portrait of ${mainInfo.name}`} width="604" height="654" loading="lazy" />
            <figcaption className="small muted">{mainInfo.location}</figcaption>
          </figure>
          <div className="about-text">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="grid tools">
              <div>
                <h3>On the job</h3>
                <p>{toolbox.construction.join(', ')}</p>
              </div>
              <div>
                <h3>In code</h3>
                <p>{toolbox.software.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" id="contact">
        <div className="section-head">
          <h2>Contact</h2>
        </div>
        <div className="grid">
          <p className="contact-big">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p className="contact-note">{connect}</p>
          <div className="contact-links">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <Link to="/contact">Contact form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
