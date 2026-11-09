import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {FrameOffset} from '../frame';
import * as V from './Scenes';
import * as En from '../v4/End';

// v9 draft order (storyboard): problem, introduction, solution, value, all in one, close.
export const BEATS9: [number, React.FC<{dur: number}>, string][] = [
  [2.6, V.Stat, 'statistic'], [4.4, V.Platforms, '7 platforms'], [3.4, V.Fragmented, 'fragmented'], [4.6, V.Routine, 'by hand'],
  [3.0, V.Outlines, 'consuming time'], [3.4, V.Simpler, 'simpler'], [3.6, V.Intro, 'introducing'], [4.4, V.Home, 'home'],
  [2.6, V.Decide, 'decisions'], [4.4, V.Carousel, 'features'], [5.0, V.Trends, 'trends'], [5.0, V.Report, 'ai report'],
  [4.6, V.Saving, 'saving'], [4.0, V.AllInOne, 'all in one'], [3.6, V.Tiles, 'tiles'], [11.4, En.End, 'bento and logo'],
];
const X = 8; // soft dissolve frames at each cut
const Fade: React.FC<{len: number; first: boolean; children: React.ReactNode}> = ({len, first, children}) => {
  const f = useCurrentFrame();
  const i = first ? 1 : interpolate(f, [0, X], [0, 1], {extrapolateRight: 'clamp'});
  const o = interpolate(f, [len - X, len], [1, 0], {extrapolateLeft: 'clamp'});
  return <AbsoluteFill style={{opacity: Math.min(i, o), filter: i < 1 || o < 1 ? `blur(${(1 - Math.min(i, o)) * 12}px)` : undefined}}>{children}</AbsoluteFill>;
};
let acc = 0;
export const STARTS9 = BEATS9.map(([d]) => {const a = acc; acc += Math.round(d * 30); return a;});
export const TOTAL9 = acc;
type Cue = {at: number; s: string; v?: number};
// sound effects only; voice and music are mixed outside Remotion
const CUES: Record<string, Cue[]> = {
  '7 platforms': [0, 3, 6, 9, 12, 15, 18].map((d) => ({at: 30 + d, s: 'pop_hi', v: 0.12})),
  'by hand': [0, 6, 12, 18, 24, 30, 36].map((d) => ({at: 6 + d, s: 'tick', v: 0.1})),
  simpler: [{at: 40, s: 'shimmer', v: 0.18}], introducing: [{at: 36, s: 'pop', v: 0.2}],
  trends: [{at: 70, s: 'pop_hi', v: 0.15}], 'ai report': [{at: 40, s: 'shimmer', v: 0.18}], saving: [{at: 40, s: 'pop', v: 0.15}],
  tiles: [4, 8, 12, 16].map((at) => ({at, s: 'pop', v: 0.15})), 'bento and logo': En.endsfx,
};
export const Film9: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <AbsoluteFill style={{background: '#f3f6f6'}}>
    {BEATS9.map(([d, C, n], i) => {
      const dur = Math.round(d * 30);
      return (
        <Sequence key={i} name={n} from={STARTS9[i]} durationInFrames={dur + X}>
          <Fade len={dur + X} first={i === 0}><FrameOffset.Provider value={0}><C dur={dur} /></FrameOffset.Provider></Fade>
        </Sequence>
      );
    })}
    {sfx && STARTS9.slice(1).map((a, i) => <Sequence key={`c${i}`} from={a - 6} durationInFrames={40} layout="none"><Html5Audio src={staticFile('sfx/swoosh_soft.wav')} volume={0.1} /></Sequence>)}
    {sfx && BEATS9.flatMap(([, , n], i) => (CUES[n] ?? []).map((c, k) => <Sequence key={`${i}-${k}`} from={STARTS9[i] + c.at} durationInFrames={90} layout="none"><Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={(c.v ?? 0.3) * 0.6} /></Sequence>))}
  </AbsoluteFill>
);
