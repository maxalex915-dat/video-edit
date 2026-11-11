import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {FrameOffset, NoGround} from '../frame';
import {E} from '../theme/motion';
import * as V from './Scenes';
import * as A from './Audit';
import * as En from '../v4/End';
import {TrendsZoom} from './TrendsZoom';
import {Manual} from './Manual';
import {Consuming} from './Consuming';
import {Montage} from './Montage';
import {BrandFieldRaw, MistRaw} from './Look';

// v16 order: problem, introduction, the all-in-one dashboard and its features, then the site audit, then the close.
type G = {k: 'brand'; seed: number} | {k: 'mist'; lift: number} | {k: 'own'};
export const BEATS9: [number, React.FC<{dur: number}>, string, G][] = [
  [2.9, V.Stat, 'statistic', {k: 'brand', seed: 0}], [5.43, V.Platforms, '15 platforms', {k: 'mist', lift: 0.45}], [4.34, V.Fragmented, 'fragmented', {k: 'mist', lift: 0.55}],
  [5.6, Manual, 'sheets and slides', {k: 'mist', lift: 0.5}], [14.1, Consuming, 'consuming time', {k: 'mist', lift: 0.7}],
  [3.6, V.Intro, 'introducing', {k: 'mist', lift: 0.3}], [5.25, V.Home, 'home', {k: 'mist', lift: 1}],
  [5.0, TrendsZoom, 'trends', {k: 'mist', lift: 0.6}], [5.0, V.Report, 'ai report', {k: 'brand', seed: 3}], [3.09, V.Decide, 'action plan', {k: 'brand', seed: 2}],
  [3.66, A.AuditOpen, 'audit tool', {k: 'brand', seed: 5}], [4.2, A.Dials, 'dials', {k: 'mist', lift: 0.7}], [4.61, A.Issues, 'issues', {k: 'mist', lift: 0.5}],
  [5.1, A.Review, 'expert review', {k: 'brand', seed: 6}], [4.12, A.Cancel, 'saving', {k: 'mist', lift: 0.6}],
  [12.5, Montage, 'feature montage', {k: 'mist', lift: 0.55}], [8.5, En.End, 'bento and logo', {k: 'own'}],
];
type K = 'pushIn' | 'pullOut' | 'left' | 'right' | 'up' | 'down';
const KINDS: K[] = ['pushIn', 'left', 'up', 'pushIn', 'pullOut', 'pushIn', 'up', 'pushIn', 'left', 'up', 'right', 'pushIn', 'pushIn', 'up', 'left', 'down', 'right', 'pullOut'];
const P = 14; // frames each side of a cut
let acc = 0;
export const STARTS9 = BEATS9.map(([d]) => {const a = acc; acc += Math.round(d * 30); return a;});
export const TOTAL9 = acc;
const easeOut = (x: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
const easeIn = (x: number) => Math.pow(Math.max(0, Math.min(1, x)), 3);

// Foreground only: the ground is shared (below), so a move never shows a frame edge.
const Move: React.FC<{len: number; inK: K | null; outK: K | null; children: React.ReactNode}> = ({len, inK, outK, children}) => {
  const f = useCurrentFrame();
  const i = inK ? 1 - easeOut(f / (2 * P)) : 0; // 1 at the start of the arrival
  const o = outK ? easeIn((f - (len - 2 * P)) / (2 * P)) : 0;
  let tx = 0, ty = 0, sc = 1, bl = 0;
  const apply = (k: K, e: number, leaving: boolean) => {
    const d = leaving ? -1 : 1;
    if (k === 'pushIn') sc *= leaving ? 1 + e * 1.6 : 1 - e * 0.45;
    if (k === 'pullOut') sc *= leaving ? 1 - e * 0.55 : 1 + e * 1.1;
    if (k === 'left') tx += d * e * 1100;
    if (k === 'right') tx -= d * e * 1100;
    if (k === 'up') ty += d * e * 800;
    if (k === 'down') ty -= d * e * 800;
    bl += e * 26;
  };
  if (inK) apply(inK, i, false);
  if (outK) apply(outK, o, true);
  // the old scene clears before the new one arrives, so two lines of text never overlap
  const wi = inK ? Math.max(0, Math.min(1, f / (2 * P))) : 1, wo = outK ? Math.max(0, Math.min(1, (f - (len - 2 * P)) / (2 * P))) : 0;
  const op = Math.min(E.inOut(Math.max(0, Math.min(1, (wi - 0.4) / 0.6))), 1 - E.inOut(Math.max(0, Math.min(1, wo / 0.6))));
  return <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${sc})`, opacity: op, filter: bl > 0.4 ? `blur(${bl}px)` : undefined}}>{children}</AbsoluteFill>;
};
// The shared ground: each scene's ground blooms open over the previous one from where the camera is heading.
const ORIGIN: Record<K, string> = {pushIn: '50% 50%', pullOut: '50% 50%', left: '100% 50%', right: '0% 50%', up: '50% 100%', down: '50% 0%'};
const Ground: React.FC<{g: G; inK: K | null}> = ({g, inK}) => {
  const f = useCurrentFrame();
  const m = inK ? interpolate(f, [0, 2 * P], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut}) : 1;
  const r = 20 + m * 160;
  const mask = m >= 1 ? undefined : `radial-gradient(${r}% ${r}% at ${ORIGIN[inK ?? 'pushIn']}, #000 ${Math.max(0, r - 60)}%, transparent ${r}%)`;
  if (g.k === 'own') return null;
  return <AbsoluteFill style={{WebkitMaskImage: mask, maskImage: mask, opacity: inK ? Math.min(1, m * 1.4) : 1}}>{g.k === 'brand' ? <BrandFieldRaw seed={g.seed} /> : <MistRaw lift={g.lift} />}</AbsoluteFill>;
};
export const Film9: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <AbsoluteFill style={{background: '#f3f6f6'}}>
    {BEATS9.map(([d, , n, g], i) => {
      const dur = Math.round(d * 30), pre = i ? P : 0, post = i < BEATS9.length - 1 ? P : 0;
      return <Sequence key={`g${i}`} name={`ground ${n}`} from={STARTS9[i] - pre} durationInFrames={dur + pre + post}><Ground g={g} inK={i ? KINDS[i - 1] : null} /></Sequence>;
    })}
    {BEATS9.map(([d, C, n], i) => {
      const dur = Math.round(d * 30);
      const pre = i ? P : 0, post = i < BEATS9.length - 1 ? P : 0;
      const len = dur + pre + post;
      return (
        <Sequence key={i} name={n} from={STARTS9[i] - pre} durationInFrames={len}>
          <Move len={len} inK={i ? KINDS[i - 1] : null} outK={post ? KINDS[i] : null}>
            <NoGround.Provider value={i < BEATS9.length - 1}><FrameOffset.Provider value={pre}><C dur={dur} /></FrameOffset.Provider></NoGround.Provider>
          </Move>
        </Sequence>
      );
    })}
    {sfx && STARTS9.slice(1).map((a, i) => <Sequence key={`cut${i}`} from={a - 10} durationInFrames={30} layout="none"><Html5Audio src={staticFile(`sfx/mswoosh${i % 2}.wav`)} volume={0.14} /></Sequence>)}
    {sfx && En.endsfx.filter((c) => c.s === 'pop').map((c, k) => <Sequence key={`e${k}`} from={STARTS9[BEATS9.length - 1] + c.at} durationInFrames={20} layout="none"><Html5Audio src={staticFile(`sfx/mpop${k % 3}.wav`)} volume={0.22} /></Sequence>)}
  </AbsoluteFill>
);
