// The ONLY file to edit per brand. Everything else reads these tokens.
// GRADIENT: the brand's colours in order (2 to 4). Every coloured area in the film is made of these plus white;
// never introduce another hue (a dark navy "for depth" was rejected: it read as a foreign colour).
export const BRAND = {
  name: 'Product Name',
  gradient: ['#7fbc42', '#00b9ef', '#70cbf3'], // first = warm end, middle = core, last = light end
  ink: '#10242a', // text on light grounds (near-black, tinted toward the brand)
  mist: '#f3f6f6', // the light ground
  mute: '#5b6f74', // secondary text
  dotTint: '#0b6d86', // the dot-grid texture on light grounds
  fontDisplay: "'Inter Display', 'Inter', sans-serif",
  fontText: "'Inter', sans-serif",
};
const [G0, G1, G2] = [BRAND.gradient[0], BRAND.gradient[1], BRAND.gradient[BRAND.gradient.length - 1]];
export const C0 = G0, C1 = G1, C2 = G2;
export const GRAD = `linear-gradient(95deg, ${G0} 0%, ${G1} 55%, ${G2} 100%)`; // text and pills in the brand colour
export const INK = BRAND.ink, MIST = BRAND.mist, MUTE = BRAND.mute;
export const F = {display: BRAND.fontDisplay, text: BRAND.fontText};
