// PLACEHOLDER Shiftly mark (no logo file supplied yet): three staggered shift bars in the brand colours.
// Replace with:  python3 scripts/logo_pieces.py public/logo_mark.svg > src/scenes/logoMark.ts
const pill = (x: number, y: number, w: number, h: number) => {
  const r = h / 2;
  return `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
};
export const MARK = {
  w: 1000, h: 1000,
  paths: [pill(120, 140, 600, 220), pill(280, 390, 600, 220), pill(120, 640, 480, 220)],
  fills: ['#ff7a59', '#f24e8c', '#7b5cff'],
};
