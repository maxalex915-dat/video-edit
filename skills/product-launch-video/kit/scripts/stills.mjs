// Render review stills from one bundle (fast; no video encode).
//   node scripts/stills.mjs 30 100 450          -> out/f/<frame>.jpg at half size
//   SCALE=1 node scripts/stills.mjs 450          -> full size
//   COMP=Film (default) picks the composition.
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const frames = process.argv.slice(2).map(Number);
const scale = Number(process.env.SCALE || 0.5);
fs.mkdirSync('out/f', {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: process.env.COMP || 'Film', inputProps: {sfx: false}});
for (const frame of frames) {
  await renderStill({serveUrl, composition: comp, frame, output: `out/f/${scale === 1 ? 'full_' : ''}${frame}.jpg`, imageFormat: 'jpeg', jpegQuality: 82, scale, inputProps: {sfx: false}});
  process.stdout.write(frame + ' ');
}
