// Render many review stills from one bundle: node scripts/stills.mjs 30 100 450 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: process.env.COMP || 'Film', inputProps: {music: false, sfx: false}});
for (const frame of frames) {
  await renderStill({serveUrl, composition: comp, frame, output: `out/f/full_${frame}.jpg`, imageFormat: 'jpeg', jpegQuality: 80, scale: 1, inputProps: {music: false, sfx: false}});
  process.stdout.write(frame + ' ');
}
