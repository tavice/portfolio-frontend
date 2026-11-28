import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
import TitleBlock from './components/TitleBlock';
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

export default function App() {
  const current = useCurrentSheet();
  useRouteAnchor();
  const sheet = SHEETS.find((s) => s.id === current) || SHEETS[0];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="mbar" aria-hidden="true">
        <a href="/#cover">Thomas Avice</a>
        <span>{sheet.no}</span>
      </div>
      <div className="set">
        <main id="main" className="sheet">
          <Home />
        </main>
        <TitleBlock current={current} />
      </div>
    </>
  );
}
