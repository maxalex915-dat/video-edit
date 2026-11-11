// Load the brand fonts from public/fonts (otf/woff2). Without this, renders silently fall back to system fonts.
import {continueRender, delayRender, staticFile} from 'remotion';
const faces: [string, string, string][] = [
  ['Inter Display', 'InterDisplay-SemiBold.otf', '600'], ['Inter Display', 'InterDisplay-Bold.otf', '700'],
  ['Inter', 'Inter-Regular.otf', '400'], ['Inter', 'Inter-Medium.otf', '500'], ['Inter', 'Inter-SemiBold.otf', '600'], ['Inter', 'Inter-Bold.otf', '700'],
];
const h = delayRender('fonts');
Promise.all(faces.map(([fam, file, w]) => new FontFace(fam, `url(${staticFile(`fonts/${file}`)})`, {weight: w}).load().then((ff) => document.fonts.add(ff)))).then(() => continueRender(h)).catch(() => continueRender(h));
