import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

export { PAGE_META } from './pageMeta';

// Renders one route to an HTML string plus the styled-components CSS it needs.
export function render(url) {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>
      )
    );
    const styles = sheet.getStyleTags();
    return { html, styles };
  } finally {
    sheet.seal();
  }
}
