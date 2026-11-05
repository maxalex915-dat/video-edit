// Colours taken from the dashboard's own tokens (marketing-dashboard-clone/src/styles/app.css).
// The film pushes them onto a dark teal canvas; the UI itself stays white, as in the product.
export const C = {
  // canvas: deepened from --teal #055e63 and --ink #10242a
  bg: '#f3f7f8',
  bg2: '#e9f1f2',
  bgLift: '#ffffff',
  // brand (app.css)
  teal: '#055e63',
  tealMid: '#0a8b84',
  green: '#7fbc42',
  cyan: '#00b9ef',
  cyanInk: '#00768f',
  sky: '#70cbf3',
  ink: '#10242a',
  ink2: '#41565d',
  ink3: '#5b7076',
  ink4: '#7d9095',
  sheet: '#ffffff',
  inset: '#f1f7f7',
  wash: '#e8f4f4',
  rule: 'rgba(5,94,99,.13)',
  up: '#3f7a26',
  down: '#ab3527',
  amber: '#8f5d18',
  // platform signature colours (app.css)
  li: '#0a66c2',
  fb: '#1877F2',
  ig: '#c13584',
  yt: '#d0021b',
  web: '#055e63',
  search: '#0a8b84',
  email: '#509cd5',
  white: '#ffffff',
  textOnDark: '#10242a',
  mutedOnDark: '#5b7076',
};

export const LOOP = `linear-gradient(135deg, ${C.green} 0%, ${C.cyan} 40%, ${C.sky} 100%)`;
export const LOOP_BAR = `linear-gradient(90deg, ${C.green} 0%, ${C.cyan} 40%, ${C.sky} 100%)`;
export const LOOP_DEEP = 'linear-gradient(135deg, #3f7a26 0%, #00647d 40%, #1f6d8a 100%)';

// app.css radius roles, scaled x2 for a 1080p frame that shows the UI larger than life
export const R = {card: 44, feature: 52, well: 24, item: 16, capsule: 999, icon: 16, bar: 8};

export const LIFT =
  '0 2px 4px rgba(5,60,63,.06), 0 16px 40px -10px rgba(5,60,63,.16), 0 40px 90px -30px rgba(5,60,63,.22)';
export const LIFT_SOFT = '0 2px 4px rgba(5,60,63,.06), 0 10px 28px -6px rgba(5,60,63,.14)';

export const W = 1920;
export const H = 1080;
export const FPS = 30;
