import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FrameOffset} from '../frame';
import {E} from '../theme/motion';
import * as V from './Scenes';
import * as A from './Audit';
import * as En from '../v4/End';

// v9 film: the animation keeps its own timing; the voice-over is placed on it afterwards (outside Remotion).
export const BEATS9: [number, React.FC<{dur: number}>, string, number[]][] = [
  // [seconds, scene, name, frames where a muffled pop marks something appearing]
  [2.6, V.Stat, 'statistic', [4, 34]], [4.4, V.Platforms, '7 platforms', [2, 30, 36, 42, 48]], [3.4, V.Fragmented, 'fragmented', [6, 46]], [4.6, V.Routine, 'by hand', [6, 18, 30, 42, 96]],
  [3.0, V.Outlines, 'consuming time', [20]], [3.4, V.Simpler, 'simpler', [4, 46]], [3.6, V.Intro, 'introducing', [2, 36]], [4.4, V.Home, 'home', [4, 44, 56, 72]],
  // site audit, the second key feature
  [3.4, A.AuditOpen, 'audit tool', [2, 18]], [4.2, A.Dials, 'dials', [2, 7, 50]], [4.0, A.Issues, 'issues', [6, 10, 14, 24, 44]], [4.6, A.Review, 'expert review', [2, 8, 92]], [3.6, A.Cancel, 'saving', [2, 40, 52]],
  [2.6, V.Decide, 'decisions', [2, 30]], [4.4, V.Carousel, 'features', [10, 26, 42, 58, 74, 90, 106, 122]], [5.0, V.Trends, 'trends', [2, 70]], [5.0, V.Report, 'ai report', [6, 40]],
  [4.0, V.AllInOne, 'all in one', [2, 30, 60, 90]], [3.6, V.Tiles, 'tiles', [4, 8, 12, 16]], [11.4, En.End, 'bento and logo', []],
];
// camera moves between scenes, mixed: push in, pan, pull out, rise...
type K = 'pushIn' | 'pullOut' | 'left' | 'right' | 'up' | 'down';
const KINDS: K[] = ['pushIn', 'left', 'up', 'pullOut', 'right', 'pushIn', 'pushIn', 'up', 'pushIn', 'left', 'down', 'right', 'pullOut', 'up', 'left', 'pushIn', 'right', 'down', 'pullOut', 'pushIn'];
const P = 8; // frames each side of a cut
let acc = 0;
export const STARTS9 = BEATS9.map(([d]) => {const a = acc; acc += Math.round(d * 30); return a;});
export const TOTAL9 = acc;
const ease = (x: number) => E.inOut(Math.max(0, Math.min(1, x)));
const Move: React.FC<{len: number; inK: K | null; outK: K | null; children: React.ReactNode}> = ({len, inK, outK, children}) => {
  const f = useCurrentFrame();
  const i = inK ? 1 - ease(f / (2 * P)) : 0; // 1 at the start of the arrival, 0 once settled
  const o = outK ? ease((f - (len - 2 * P)) / (2 * P)) : 0;
  let tx = 0, ty = 0, sc = 1, op = 1, bl = 0;
  const apply = (k: K, e: number, leaving: boolean) => {
    const d = leaving ? -1 : 1;
    if (k === 'pushIn') {sc *= leaving ? 1 + e * 1.3 : 1 - e * 0.4; op *= 1 - e * (leaving ? 1 : 0.6); bl += e * 16;}
    if (k === 'pullOut') {sc *= leaving ? 1 - e * 0.45 : 1 + e * 0.9; op *= 1 - e * (leaving ? 1 : 0.6); bl += e * 16;}
    if (k === 'left') {tx += d * e * 1500; bl += e * 22; op *= 1 - e * 0.35;}
    if (k === 'right') {tx -= d * e * 1500; bl += e * 22; op *= 1 - e * 0.35;}
    if (k === 'up') {ty += d * e * 1000; bl += e * 18; op *= 1 - e * 0.35;}
    if (k === 'down') {ty -= d * e * 1000; bl += e * 18; op *= 1 - e * 0.35;}
  };
  if (inK) apply(inK, i, false);
  if (outK) apply(outK, o, true);
  return <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${sc})`, opacity: op, filter: bl > 0.4 ? `blur(${bl}px)` : undefined}}>{children}</AbsoluteFill>;
};
export const Film9: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <AbsoluteFill style={{background: '#f3f6f6'}}>
    {BEATS9.map(([d, C, n], i) => {
      const dur = Math.round(d * 30);
      const pre = i ? P : 0, post = i < BEATS9.length - 1 ? P : 0;
      const len = dur + pre + post;
      return (
        <Sequence key={i} name={n} from={STARTS9[i] - pre} durationInFrames={len}>
          <Move len={len} inK={i ? KINDS[i - 1] : null} outK={post ? KINDS[i] : null}><FrameOffset.Provider value={pre}><C dur={dur} /></FrameOffset.Provider></Move>
        </Sequence>
      );
    })}
    {sfx && BEATS9.flatMap(([, , , pops], i) => pops.map((at, k) => <Sequence key={`${i}-${k}`} from={STARTS9[i] + at} durationInFrames={20} layout="none"><Html5Audio src={staticFile(`sfx/mpop${(i + k) % 3}.wav`)} volume={0.32} /></Sequence>))}
    {sfx && En.endsfx.filter((c) => c.s === 'pop').map((c, k) => <Sequence key={`e${k}`} from={STARTS9[BEATS9.length - 1] + c.at} durationInFrames={20} layout="none"><Html5Audio src={staticFile(`sfx/mpop${k % 3}.wav`)} volume={0.22} /></Sequence>)}
  </AbsoluteFill>
);
