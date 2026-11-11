// The ONLY file to edit per brand (the demo is a made-up product, Shiftly; replace every value). Everything else reads these tokens.
// GRADIENT: the brand's colours in order (2 to 4). Every coloured area in the film is made of these plus white;
// never introduce another hue (a dark navy "for depth" was rejected: it read as a foreign colour).
export const BRAND = {
  name: 'Shiftly',
  gradient: ['#ff7a59', '#f24e8c', '#7b5cff'], // coral > pink > violet (client order)
  ink: '#24142c', // text on light grounds (near-black, tinted toward the violet end)
  mist: '#f7f3f6', // the light ground, a warm off-white
  mute: '#6e5f73', // secondary text
  dotTint: '#7a3d78', // the dot-grid texture on light grounds
  inkRGB: '36,20,44', // = ink, for translucent lines and hairlines
  shadeRGB: '110,40,120', // soft brand-tinted shadows under cards (was a hard-coded teal in the kit)
  fontDisplay: "'Inter Display', 'Inter', sans-serif",
  fontText: "'Inter', sans-serif",
};
const [G0, G1, G2] = [BRAND.gradient[0], BRAND.gradient[1], BRAND.gradient[BRAND.gradient.length - 1]];
export const C0 = G0, C1 = G1, C2 = G2;
// Roles: gradient[0] = warm end (bottom-left washes, blobs), gradient[1] = core (fluid field base, dial arcs),
// last = far end (light or deep; top-right washes). Every stop is used in GRAD.
const stops = BRAND.gradient.map((c, i) => `${c} ${Math.round((i / (BRAND.gradient.length - 1)) * 100)}%`).join(', ');
export const GRAD = `linear-gradient(95deg, ${stops})`; // text and pills in the brand colour
export const INK = BRAND.ink, MIST = BRAND.mist, MUTE = BRAND.mute;
export const F = {display: BRAND.fontDisplay, text: BRAND.fontText};
export const inkA = (a: number) => `rgba(${BRAND.inkRGB},${a})`;
export const shadeA = (a: number) => `rgba(${BRAND.shadeRGB},${a})`;
