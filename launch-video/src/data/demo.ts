// DEMO DATA. Every figure in the film comes from this file. None of it is real Archetype data.
// See DATA_NOTES.md.
export const KPI = {impressions: 58420, engagements: 2318, followers: 21946, followersNet: 312};
export const PLATFORMS = [
  {p: 'li', label: 'Impressions', value: 14210, delta: '18.4%', up: true, sub: '14,612 followers'},
  {p: 'fb', label: 'Views', value: 13980, delta: '12.1%', up: true, sub: '4,630 followers'},
  {p: 'ig', label: 'Reach', value: 1120, delta: '64.0%', up: true, sub: '1,910 followers'},
  {p: 'yt', label: 'Views', value: 2640, delta: '8.2%', up: false, sub: '1,180 followers'},
  {p: 'web', label: 'Sessions', value: 7930, delta: '21.5%', up: true, sub: 'Website'},
  {p: 'search', label: 'Impressions', value: 29870, delta: '9.7%', up: true, sub: 'Google Search'},
] as const;
// 30-day series, hand-shaped
export const SERIES = {
  hero: [12, 14, 13, 15, 14, 30, 58, 26, 18, 16, 17, 15, 16, 19, 17, 16, 18, 17, 16, 20, 18, 17, 19, 18, 17, 16, 18, 17, 15, 14],
  a: [5, 7, 6, 9, 7, 8, 11, 9, 8, 10, 9, 12, 10, 9, 11, 13, 11, 10, 12, 14, 12, 11, 13, 12, 14, 13, 15, 14, 13, 16],
  b: [9, 8, 10, 9, 13, 10, 9, 11, 10, 9, 12, 10, 11, 14, 11, 10, 12, 11, 13, 12, 11, 10, 13, 12, 14, 13, 12, 15, 13, 14],
  c: [4, 5, 4, 6, 5, 4, 7, 6, 5, 8, 6, 5, 7, 6, 9, 7, 6, 8, 7, 10, 8, 7, 9, 8, 11, 9, 8, 12, 10, 13],
  trend: [30, 34, 31, 36, 33, 38, 35, 40, 37, 42, 39, 44, 41, 47, 45, 52],
};
export const BARS = [42, 58, 36, 61, 49, 94, 55]; // posts per channel, index 5 is "best"
export const INSIGHT = {
  sentence: 'LinkedIn reach doubled after Tuesday’s project post.',
  stats: [
    {v: '2.1x', l: 'LinkedIn reach'},
    {v: '+38%', l: 'Website visits'},
    {v: '-12%', l: 'Email opens'},
  ],
};
export const SITE = {health: 72, geo: 58, errors: 214, warnings: 1032, notices: 610, pages: 1240};
export const FIXES = ['Missing page titles', 'Broken internal links', 'Slow mobile pages', 'Images without alt text'];
export const RIVALS = [
  {i: 'NK', lvl: 0, col: 0}, {i: 'TR', lvl: 1, col: 1}, {i: 'BV', lvl: 2, col: 0}, {i: 'LM', lvl: 3, col: 1}, {i: 'QH', lvl: 3, col: 1},
];
export const REQUESTS = [
  {n: 'Office fit-out, 2,400 m2', s: 'new'},
  {n: 'Factory design and build', s: 'new'},
  {n: 'Hotel renovation study', s: 'won'},
  {n: 'Warehouse expansion', s: 'new'},
];
export const REQ_MONTHS = [8, 11, 9, 14, 12, 16, 13, 18, 15, 21, 19, 24];
export const PORTFOLIO = [
  {v: 46, c: '#7fbd42'}, {v: 34, c: '#509cd5'}, {v: 20, c: '#055e63'},
];
