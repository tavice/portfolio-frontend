import { Link } from 'react-router-dom';
import about from '../data/about.json';
import projects from '../data/projects.json';
import SheetLabel from '../components/SheetLabel';
import ProjectIndex, { FeaturedProject } from '../components/ProjectIndex';
import { ArrowRight, ArrowUpRight, Download, Mail } from '../components/Icons';

export default function Home() {
  const { mainInfo, headline, headlineAccent, intro, titleBlock, problem, approach, background, toolbox, connect, contact } =
    about;
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured).slice(0, 4);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="hero-kicker mono rise">
              <span className="status-dot" aria-hidden="true" />
              {mainInfo.title}
            </p>
            <h1 className="h-display rise">
              {headline} <em>{headlineAccent}</em>
            </h1>
            <p className="lead rise">{intro}</p>
            <div className="hero-actions rise">
              <Link className="btn btn-primary" to="/projects">
                See the work <ArrowRight />
              </Link>
              <a className="btn btn-ghost" href={mainInfo.resume}>
                Resume <Download />
              </a>
            </div>
          </div>

          <aside className="title-block" aria-label="Summary">
            <div className="tb-head">
              <div>
                <span className="tb-k">Prepared by</span>
                <span className="tb-name">{mainInfo.name}</span>
              </div>
              <div>
                <span className="tb-k">Sheet</span>
                <span className="tb-sheet">A-001</span>
              </div>
            </div>
            <div className="tb-photo">
              <img src={mainInfo.headshot} alt={`Portrait of ${mainInfo.name}`} width="96" height="96" />
              <p>Project manager by trade. Software builder by habit.</p>
            </div>
            <dl className="tb-rows">
              {titleBlock.map((row) => (
                <div className="tb-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* ---------- Problem / approach ---------- */}
      <section className="sheet" id="approach">
        <div className="wrap">
          <SheetLabel no="A-101">The problem, and how I work on it</SheetLabel>
          <div className="split">
            <div className="reveal">
              <h2 className="h2">{problem.title}</h2>
              <p>{problem.body}</p>
              <ul className="chips" aria-label="Where the work lives">
                {problem.sources.map((s) => (
                  <li className="chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h2 className="h2">{approach.title}</h2>
              <p>{approach.body}</p>
            </div>
          </div>

          <ol className="flow reveal" aria-label="How the workflow runs">
            {approach.steps.map((step) => (
              <li key={step.name} className={step.name === 'Review' ? 'is-human' : undefined}>
                <span className="flow-n" />
                <h3>{step.name}</h3>
                <p>{step.detail}</p>
                {step.name === 'Review' && <span className="flow-tag">Human in the loop</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Work ---------- */}
      <section className="sheet" id="work">
        <div className="wrap">
          <SheetLabel no="A-201">Selected work</SheetLabel>
          <div className="work-head">
            <h2 className="h2">Things I have built for the jobsite, and a few for the web.</h2>
            <Link className="text-link" to="/projects">
              All projects <ArrowRight />
            </Link>
          </div>
          {featured && <FeaturedProject project={featured} />}
          <ProjectIndex projects={others} startAt={2} />
        </div>
      </section>

      {/* ---------- Background ---------- */}
      <section className="sheet" id="background">
        <div className="wrap bg-grid">
          <div className="reveal">
            <SheetLabel no="A-301">Background</SheetLabel>
            <h2 className="h2">A builder first. The code came from the job.</h2>
            <p className="lead" style={{ fontSize: '1.02rem' }}>
              I learned where projects break by running them. That is why the tools I write start
              from the RFI log and the cost report, not from a blank screen.
            </p>
          </div>
          <div className="reveal">
            <dl className="spec">
              {background.map((b) => (
                <div key={b.kind}>
                  <dt>{b.kind}</dt>
                  <dd>{b.value}</dd>
                </div>
              ))}
            </dl>
            <div className="toolbox">
              <div>
                <h3 className="mono">On the job</h3>
                <ul>
                  {toolbox.construction.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mono">In the code</h3>
                <ul>
                  {toolbox.software.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contact CTA ---------- */}
      <section className="sheet" id="contact" style={{ borderBottom: 0 }}>
        <div className="wrap">
          <SheetLabel no="A-401">Contact</SheetLabel>
          <h2 className="h-display contact-cta reveal">
            Building for the <em>built world?</em>
          </h2>
          <div className="contact-grid">
            <p className="lead reveal">{connect}</p>
            <ul className="direct reveal">
              <li>
                <a href={`mailto:${contact.email}`}>
                  <span className="mono">Email</span>
                  <span className="val">{contact.email}</span>
                  <Mail />
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="mono">LinkedIn</span>
                  <span className="val">in/thomasavice</span>
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <Link to="/contact">
                  <span className="mono">Message</span>
                  <span className="val">Send a note from the site</span>
                  <ArrowRight />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
