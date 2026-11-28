import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { PAGE_META } from './pageMeta';

// Renders one route to an HTML string. Styles are plain CSS, which Vite
// already links from dist/index.html, so nothing else needs injecting.
export function render(url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, styles: '' };
}
