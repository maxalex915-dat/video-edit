import {continueRender, delayRender, staticFile} from 'remotion';

export const F = {
  display: "'Inter Display', 'Inter', sans-serif",
  text: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const faces: [string, string, string][] = [
  ['Inter Display', 'InterDisplay-Medium.otf', '500'],
  ['Inter Display', 'InterDisplay-SemiBold.otf', '600'],
  ['Inter Display', 'InterDisplay-Bold.otf', '700'],
  ['Inter Display', 'InterDisplay-ExtraBold.otf', '800'],
  ['Inter', 'Inter-Regular.otf', '400'],
  ['Inter', 'Inter-Medium.otf', '500'],
  ['Inter', 'Inter-SemiBold.otf', '600'],
  ['Inter', 'Inter-Bold.otf', '700'],
  ['JetBrains Mono', 'jetbrains-mono-latin-400-normal.woff2', '400'],
  ['JetBrains Mono', 'jetbrains-mono-latin-500-normal.woff2', '500'],
  ['JetBrains Mono', 'jetbrains-mono-latin-600-normal.woff2', '600'],
];

let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const h = delayRender('fonts');
  Promise.all(
    faces.map(([fam, file, weight]) => {
      const f = new FontFace(fam, `url(${staticFile('fonts/' + file)})`, {weight});
      return f.load().then((ff) => document.fonts.add(ff));
    }),
  ).then(() => continueRender(h), () => continueRender(h));
};
