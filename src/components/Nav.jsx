import { NavLink, Link } from 'react-router-dom';
import { Contrast } from './Icons';

const LINKS = [
  { to: '/', no: '00', label: 'Home', end: true },
  { to: '/projects', no: '01', label: 'Work' },
  { to: '/contact', no: '02', label: 'Contact' },
];

// Flips between light and dark. The inline script in index.html applies the
// saved choice before first paint, so there is no flash.
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage blocked: the choice just won't persist */
  }
}

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" aria-label="Thomas Avice, home">
          <span className="brand-mark">TA</span>
          <span className="brand-name">Thomas Avice</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  <span>{l.no}</span>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Switch light or dark theme"
                title="Switch theme"
              >
                <Contrast />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
