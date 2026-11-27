// Per-route metadata, shared by the client (route changes) and the
// pre-render script (static HTML for crawlers and AI agents).
export const SITE_URL = 'https://thomasavice.com';

export const PAGE_META = {
  '/': {
    title: 'Thomas Avice - Construction Project Manager & Software Builder',
    description:
      'Construction project manager who builds software and AI workflows for the jobsite: ten years running regulated Bay Area projects, plus tools for RFIs, submittals, cost tracking and Procore.',
    canonical: `${SITE_URL}/`
  },
  '/about': {
    title: 'About Thomas Avice - Construction Project Manager & Software Builder',
    description:
      'Ten years running regulated Bay Area projects, plus tools and AI workflows for RFIs, submittals, cost tracking and Procore.',
    canonical: `${SITE_URL}/`
  },
  '/projects': {
    title: 'Projects - Thomas Avice',
    description:
      'Construction technology projects by Thomas Avice, including a job-status analytics dashboard and a job-cost dashboard demo.',
    canonical: `${SITE_URL}/projects`
  },
  '/contact': {
    title: 'Contact - Thomas Avice',
    description:
      'Get in touch with Thomas Avice about construction technology and AI for the built world.',
    canonical: `${SITE_URL}/contact`
  }
};
