// The site is one drawing set. Sheet numbers follow the US National CAD
// Standard: G = general, A = architectural; 5xx = details, 6xx = schedules.
export const SHEETS = [
  { id: 'cover', no: 'G-001', title: 'Cover' },
  { id: 'details', no: 'A-501', title: 'Details' },
  { id: 'schedule', no: 'A-601', title: 'Project schedule' },
  { id: 'notes', no: 'G-002', title: 'General notes' },
  { id: 'rfi', no: 'RFI', title: 'Request for information' },
];

// Old URLs still work: each route opens the set at the matching sheet.
export const ROUTE_TO_SHEET = {
  '/about': 'notes',
  '/projects': 'details',
  '/contact': 'rfi',
};
