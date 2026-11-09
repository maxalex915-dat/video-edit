import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {FrameOffset} from '../frame';
import * as V from './Scenes';
import * as En from '../v4/End';

// v9: scenes cut on the voice-over. The voice starts 0.45 s in; each scene starts 0.15 s before its line
// (line times from the ElevenLabs take, transcribed with word timings). Music and voice are mixed outside Remotion.
type Cue = {at: number; s: string; v?: number};
export const BEATS9: [number, React.FC<{dur: number}>, string, Cue[]][] = [
  [0, V.Stat, 'statistic', []], [2.1, V.Platforms, '7 platforms', [0, 3, 6, 9, 12, 15, 18].map((d) => ({at: 24 + d, s: 'pop_hi', v: 0.12}))],
  [5.0, V.Fragmented, 'fragmented', []], [10.14, V.Routine, 'by hand', [0, 6, 12, 18, 24, 30, 36].map((d) => ({at: 6 + d, s: 'tick', v: 0.1}))],
  [15.7, V.Outlines, 'consuming time', []], [18.6, V.Simpler, 'simpler', [{at: 50, s: 'shimmer', v: 0.18}]],
  [22.5, V.Intro, 'introducing', [{at: 30, s: 'pop', v: 0.2}]], [24.98, V.Home, 'home', []],
  [30.63, V.Decide, 'decisions', []], [33.85, V.Carousel, 'features', []],
  [39.18, V.Trends, 'trends', [{at: 70, s: 'pop_hi', v: 0.15}]], [43.08, V.Report, 'ai report', [{at: 40, s: 'shimmer', v: 0.18}]],
  [47.0, V.Saving, 'saving', [{at: 80, s: 'pop', v: 0.15}]], [52.36, V.AllInOne, 'all in one', []],
  [54.56, V.Tiles, 'tiles', [6, 36, 58, 72].map((at) => ({at, s: 'pop', v: 0.15}))], [58.91, En.End, 'bento and logo', En.endsfx],
];
export const TOTAL9 = Math.round(70.46 * 30);
const X = 8; // soft dissolve frames at each cut
const fr = (s: number) => Math.round(s * 30);
const Fade: React.FC<{len: number; first: boolean; last: boolean; children: React.ReactNode}> = ({len, first, last, children}) => {
  const f = useCurrentFrame();
  const i = first ? 1 : interpolate(f, [0, X], [0, 1], {extrapolateRight: 'clamp'});
  const o = last ? 1 : interpolate(f, [len - X, len], [1, 0], {extrapolateLeft: 'clamp'});
  const v = Math.min(i, o);
  return <AbsoluteFill style={{opacity: v, filter: v < 1 ? `blur(${(1 - v) * 12}px)` : undefined}}>{children}</AbsoluteFill>;
};
export const Film9: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <AbsoluteFill style={{background: '#f3f6f6'}}>
    {BEATS9.map(([a, C, n], i) => {
      const end = i < BEATS9.length - 1 ? fr(BEATS9[i + 1][0]) : TOTAL9;
      const dur = end - fr(a), last = i === BEATS9.length - 1;
      return (
        <Sequence key={i} name={n} from={fr(a)} durationInFrames={dur + (last ? 0 : X)}>
          <Fade len={dur + X} first={i === 0} last={last}><FrameOffset.Provider value={0}><C dur={dur} /></FrameOffset.Provider></Fade>
        </Sequence>
      );
    })}
    {sfx && BEATS9.slice(1).map(([a], i) => <Sequence key={`c${i}`} from={fr(a) - 6} durationInFrames={40} layout="none"><Html5Audio src={staticFile('sfx/swoosh_soft.wav')} volume={0.1} /></Sequence>)}
    {sfx && BEATS9.flatMap(([a, , , cues], i) => cues.map((c, k) => <Sequence key={`${i}-${k}`} from={fr(a) + c.at} durationInFrames={90} layout="none"><Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={(c.v ?? 0.3) * 0.6} /></Sequence>))}
  </AbsoluteFill>
);
