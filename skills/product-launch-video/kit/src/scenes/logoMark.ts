// The logo mark as vector pieces: generate with  python3 scripts/logo_pieces.py public/logo_mark.svg > src/scenes/logoMark.ts
// (one path + its fill per piece, in the SVG's own viewBox units). Placeholder below: a simple ring.
export const MARK = {
  w: 1000, h: 1000,
  paths: ['M500 60 A440 440 0 1 1 499 60 Z M500 260 A240 240 0 1 0 501 260 Z'],
  fills: ['#00b9ef'],
};
