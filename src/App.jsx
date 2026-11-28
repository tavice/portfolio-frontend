import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import TitleBlock from './components/TitleBlock';
import about from './data/about.json';
import { PAGE_META } from './pageMeta';
import { SHEETS, ROUTE_TO_SHEET } from './sheets';

// Which sheet is on screen: the last section whose top has passed 40% of the viewport.
function useCurrentSheet() {
  const [current, setCurrent] = useState(SHEETS[0].id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let id = SHEETS[0].id;
      document.querySelectorAll('[data-sheet]').forEach((el) => {
        if (el.getBoundingClientRect().top <= line) id = el.dataset.sheet;
      });
      setCurrent(id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return current;
}

// Old routes (/projects, /contact, /about) open the set at the matching sheet.
function useRouteAnchor() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    document.title = meta.title;
    const id = ROUTE_TO_SHEET[pathname];
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [pathname]);
}

// Phones: the title block sits at the bottom of the page, so the top bar
// carries the current sheet and a menu with the sheet index and contact.
function MobileBar({ sheet, current }) {
  const [open, setOpen] = useState(false);
  const { contact, mainInfo } = about;
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="mbar">
      <div className="mbar-row">
        <a href="/#cover" onClick={close}>Thomas Avice</a>
        <button type="button" className="mbar-btn" aria-expanded={open} aria-controls="mbar-menu" onClick={() => setOpen((o) => !o)}>
          <span className="mbar-sheet">{sheet.no}</span>
          {open ? 'Close' : 'Sheets'}
        </button>
      </div>
      {open && (
        <nav id="mbar-menu" className="mbar-menu" aria-label="Sheet index">
          <ol className="tb-index">
            {SHEETS.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} onClick={close} aria-current={s.id === current ? 'true' : undefined}>
                  <span className="tb-no">{s.no}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="mbar-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={mainInfo.resume}>Resume (PDF)</a>
          </p>
        </nav>
      )}
    </div>
  );
}

export default function App() {
  const current = useCurrentSheet();
  useRouteAnchor();
  const sheet = SHEETS.find((s) => s.id === current) || SHEETS[0];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MobileBar sheet={sheet} current={current} />
      <div className="set">
        <main id="main" className="sheet">
          <Home />
        </main>
        <TitleBlock current={current} />
      </div>
    </>
  );
}
