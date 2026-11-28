// Per-route metadata, shared by the client (route changes) and the
// pre-render script (static HTML for crawlers and AI agents).
// The site is one page; the old routes open it at a section, so every
// route points its canonical at the home page.
export const SITE_URL = 'https://thomasavice.com';

const description =
  'Thomas Avice is a construction project manager in San Francisco who builds software and AI workflows for the jobsite: ten years running regulated Bay Area projects, plus tools for RFIs, submittals, cost tracking and Procore.';

export const PAGE_META = {
  '/': {
    title: 'Thomas Avice - Construction Project Manager & Software Builder',
    description,
    canonical: `${SITE_URL}/`,
  },
  '/about': {
    title: 'About Thomas Avice - Construction Project Manager',
    description,
    canonical: `${SITE_URL}/`,
  },
  '/projects': {
    title: 'Projects - Thomas Avice',
    description,
    canonical: `${SITE_URL}/`,
  },
  '/contact': {
    title: 'Contact - Thomas Avice',
    description,
    canonical: `${SITE_URL}/`,
  },
};
