import about from '../data/about.json';
import projects from '../data/projects.json';
import BuildingSection from '../components/BuildingSection';
import DrawingTitle from '../components/DrawingTitle';
import RfiForm from '../components/RfiForm';

function Detail({ project, no, wide }) {
  const { name, website, github, image, summary, status } = project;
  return (
    <figure className={`detail${wide ? ' detail-wide' : ''}`}>
      <a className="detail-frame" href={website} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
        <span className="detail-img">
          <img src={image} alt="" loading="lazy" />
        </span>
      </a>
      <figcaption>
        <DrawingTitle as="h3" no={no} sheet="A-501" title={name.toUpperCase()} sub={summary} />
        <p className="detail-links">
          <a href={website} target="_blank" rel="noopener noreferrer">
            {status === 'Demo' ? `Open the ${name} demo` : `Visit ${name}`}
          </a>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              Source code
            </a>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const { mainInfo, lede, markups, notes, toolbox, connect } = about;
  const shown = projects.filter((p) => p.image);

  return (
    <>
      <section id="cover" data-sheet="cover" className="sec cover">
        <DrawingTitle as="h1" no="1" sheet="G-001" title="THOMAS AVICE" sub={lede} />

        <div className="drawing-wrap">
          <BuildingSection />
          <p className="drawing-caption">
            Building section, two-story school. Red clouds are my markups.
          </p>
        </div>

        <ol className="markup-notes" aria-label="Markups">
          {markups.map((m) => (
            <li key={m.slice(0, 20)}>{m}</li>
          ))}
        </ol>
      </section>

      <section id="details" data-sheet="details" className="sec">
        <h2 className="sr-only">Selected work</h2>
        <div className="details">
          {shown.map((p, i) => (
            <Detail key={p.slug} project={p} no={i + 1} wide={i === 0} />
          ))}
        </div>
      </section>

      <section id="schedule" data-sheet="schedule" className="sec">
        <DrawingTitle no="1" sheet="A-601" title="PROJECT SCHEDULE" sub="Everything I've built, including the work that stays private." />
        <div className="table-scroll">
          <table className="schedule">
            <thead>
              <tr>
                <th scope="col">Mark</th>
                <th scope="col">Project</th>
                <th scope="col" className="hide-sm">Type</th>
                <th scope="col" className="hide-sm">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.slug}>
                  <td>P-{i + 1}</td>
                  <th scope="row">{p.name}</th>
                  <td className="hide-sm">{p.category}</td>
                  <td className="hide-sm">{p.summary}</td>
                  <td>
                    {p.website ? (
                      <a href={p.website} target="_blank" rel="noopener noreferrer">
                        {p.status}
                      </a>
                    ) : (
                      p.status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="notes" data-sheet="notes" className="sec">
        <DrawingTitle no="1" sheet="G-002" title="GENERAL NOTES" />
        <ol className="gen-notes">
          {notes.map((n) => (
            <li key={n.slice(0, 20)}>{n}</li>
          ))}
          <li>
            Tools on the job: {toolbox.construction.join(', ')}.
          </li>
          <li>
            Tools in code: {toolbox.software.join(', ')}.
          </li>
        </ol>
      </section>

      <section id="rfi" data-sheet="rfi" className="sec">
        <DrawingTitle no="1" sheet="RFI" title="REQUEST FOR INFORMATION" sub={connect} />
        <RfiForm />
      </section>

      <footer className="foot">
        <p>
          © {new Date().getFullYear()} {mainInfo.name}. Demo projects use fictional data.
        </p>
      </footer>
    </>
  );
}
