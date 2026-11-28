import { useState } from 'react';
import about from '../data/about.json';
import projects from '../data/projects.json';
import BuildingSection from '../components/BuildingSection';
import DrawingTitle from '../components/DrawingTitle';
import RfiForm from '../components/RfiForm';
import Legend from '../components/Legend';

// Projects with a screenshot get a detail on A-501; the rest live only in the schedule.
const detailed = projects.filter((p) => p.image);
const detailNo = (slug) => detailed.findIndex((p) => p.slug === slug) + 1;

function Detail({ project, wide }) {
  const { slug, name, website, github, image, summary, status } = project;
  return (
    <figure className={`detail${wide ? ' detail-wide' : ''}`} id={slug}>
      <a className="detail-frame" href={website} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
        <span className="detail-img">
          <img src={image} alt="" loading="lazy" />
        </span>
      </a>
      <figcaption>
        <DrawingTitle as="h3" no={detailNo(slug)} sheet="A-501" title={name.toUpperCase()} sub={summary}>
          <p className="detail-links">
            <a href={website} target="_blank" rel="noopener noreferrer">
              {status === 'Demo' ? 'Open the live demo' : 'Visit the site'}
            </a>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                Source code
              </a>
            )}
            {status === 'Demo' && <span className="muted">Runs on sample data</span>}
          </p>
        </DrawingTitle>
      </figcaption>
    </figure>
  );
}

function Cover() {
  const { lede, markups, mainInfo } = about;
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = hovered ?? selected;

  // Tapping a cloud selects it; on small screens the note is below the fold, so bring it into view.
  const select = (n) => {
    const next = selected === n ? null : n;
    setSelected(next);
    if (next && window.matchMedia('(max-width: 860px)').matches) {
      document.getElementById(`markup-note-${n}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  return (
    <section id="cover" data-sheet="cover" className="sec cover">
      <DrawingTitle as="h1" no="1" sheet="G-001" title="THOMAS AVICE" sub={lede}>
        <div className="actions">
          <a className="btn" href="#details">See the work</a>
          <a className="btn btn-ghost" href={mainInfo.resume}>Resume (PDF)</a>
          <a className="text-link" href="#rfi">Send me an RFI</a>
        </div>
      </DrawingTitle>

      <div className="drawing-wrap">
        <BuildingSection
          active={active}
          labels={markups.map((m) => m.label)}
          onHover={setHovered}
          onSelect={select}
        />
      </div>
      <p className="drawing-caption">
        Building section, two-story school. The red clouds are my markups. Select one to highlight its note.
      </p>
      <Legend />

      <ol className={`markup-notes${active ? ' has-active' : ''}`} aria-label="Markups">
        {markups.map((m, i) => (
          <li
            key={m.label}
            id={`markup-note-${i + 1}`}
            className={active === i + 1 ? 'is-active' : undefined}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}
          >
            {m.text}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  const { mainInfo, notes, toolbox, connect } = about;

  return (
    <>
      <Cover />

      <section id="details" data-sheet="details" className="sec">
        <h2 className="sr-only">Selected work</h2>
        <div className="details">
          {detailed.map((p, i) => (
            <Detail key={p.slug} project={p} wide={i === 0} />
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
                <th scope="col">Ref.</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => {
                const no = detailNo(p.slug);
                return (
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
                    <td className="ref">
                      {no > 0 && (
                        <a href={`#${p.slug}`} aria-label={`See detail ${no} on sheet A-501`}>
                          {no}/A-501
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
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
          <li>Tools on the job: {toolbox.construction.join(', ')}.</li>
          <li>Tools in code: {toolbox.software.join(', ')}.</li>
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
