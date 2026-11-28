import { useEffect, useState } from 'react';
import about from '../data/about.json';
import { SHEETS } from '../sheets';

// Blueline (blue lines on white) or blueprint (white lines on blue).
function usePrint() {
  const [print, setPrint] = useState(null);
  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setPrint(saved || (dark ? 'dark' : 'light'));
  }, []);
  const choose = (value) => {
    document.documentElement.dataset.theme = value;
    setPrint(value);
    try {
      localStorage.setItem('theme', value);
    } catch {
      /* storage blocked: the choice just won't persist */
    }
  };
  return [print, choose];
}

export default function TitleBlock({ current }) {
  const { mainInfo, contact } = about;
  const [print, choose] = usePrint();
  const sheet = SHEETS.find((s) => s.id === current) || SHEETS[0];

  return (
    <aside className="tb" aria-label="Title block">
      <div className="tb-cell tb-firm">
        <p className="tb-name">{mainInfo.name}</p>
        <p>{mainInfo.title}</p>
        <p className="muted">{mainInfo.location}</p>
      </div>

      <div className="tb-cell tb-photo">
        <img src={mainInfo.headshot} alt={`Portrait of ${mainInfo.name}`} width="604" height="654" />
      </div>

      <div className="tb-cell">
        <p className="tb-k">Contact</p>
        <ul className="tb-list">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href={mainInfo.resume}>Resume (PDF)</a>
          </li>
        </ul>
      </div>

      <nav className="tb-cell" aria-label="Sheet index">
        <p className="tb-k">Sheet index</p>
        <ol className="tb-index">
          {SHEETS.map((s) => (
            <li key={s.id}>
              <a href={`/#${s.id}`} aria-current={s.id === sheet.id ? 'true' : undefined}>
                <span className="tb-no">{s.no}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="tb-cell">
        <p className="tb-k" id="print-label">Print</p>
        <div className="print" role="group" aria-labelledby="print-label">
          <button type="button" aria-pressed={print === 'light'} onClick={() => choose('light')}>
            Blueline
          </button>
          <button type="button" aria-pressed={print === 'dark'} onClick={() => choose('dark')}>
            Blueprint
          </button>
        </div>
      </div>

      <div className="tb-cell tb-sheet" aria-live="polite">
        <p className="tb-k">Sheet</p>
        <p className="tb-sheet-no">{sheet.no}</p>
        <p className="muted">{sheet.title}</p>
      </div>
    </aside>
  );
}
