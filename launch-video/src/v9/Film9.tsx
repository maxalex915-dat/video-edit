import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
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
export const Film9: React.FC = () => (
  <AbsoluteFill style={{background: '#f3f6f6'}}>
    {BEATS9.map(([d, C, n], i) => {
      const dur = Math.round(d * 30);
      return (
        <Sequence key={i} name={n} from={STARTS9[i]} durationInFrames={dur + X}>
          <Fade len={dur + X} first={i === 0}><FrameOffset.Provider value={0}><C dur={dur} /></FrameOffset.Provider></Fade>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
