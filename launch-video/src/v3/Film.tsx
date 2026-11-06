import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import {FrameOffset} from '../frame';
import * as A from './A';
import * as B from './B';
import * as Cc from './C';
import * as D from './D';
import * as O from './Outro';
import * as P from './Pain';

type Cue = {at: number; s: string; v?: number};
// Beats in seconds, laid on the original music (drop at 9.2 s, as in the reference).
const BEATS: [number, number, React.FC<{dur: number}>, Cue[]][] = [
  [0, 3.4, P.P1, P.p1sfx], [3.4, 7.9, P.P2, P.p2sfx], [7.9, 9.2, A.B3, A.b3sfx], [9.2, 12.4, A.B4, A.b4sfx], [12.4, 15.6, A.B5, A.b5sfx],
  [15.6, 21.0, A.B6, A.b6sfx], [21.0, 24.0, P.P3, P.p3sfx], [24.0, 29.2, B.B7, B.b7sfx], [29.2, 33.0, B.B8, B.b8sfx], [33.0, 39.6, B.B9, B.b9sfx], [39.6, 44.6, B.B10, B.b10sfx],
  [44.6, 47.4, Cc.B11, Cc.b11sfx], [47.4, 49.4, Cc.B12, Cc.b12sfx], [49.4, 51.0, Cc.B13, Cc.b13sfx], [51.0, 54.6, Cc.B14, Cc.b14sfx], [54.6, 60.1, Cc.B15, Cc.b15sfx],
  [60.1, 64.0, Cc.B16, Cc.b16sfx], [64.0, 71.0, Cc.B17, Cc.b17sfx], [71.0, 74.4, Cc.B18, Cc.b18sfx], [74.4, 78.4, Cc.B19, Cc.b19sfx], [78.4, 80.6, D.B20, D.b20sfx],
  [80.6, 90.0, O.B21, O.b21sfx],
];
const fr = (s: number) => Math.round(s * 30);
export const FILM = BEATS.map(([a, b]) => ({from: fr(a), dur: fr(b) - fr(a)}));
export const Film: React.FC<{music?: boolean; sfx?: boolean}> = ({music = true, sfx = true}) => (
  <AbsoluteFill style={{background: '#fff'}}>
    {BEATS.map(([a, b, Comp], i) => (
      <Sequence key={i} name={`B${i + 1}`} from={fr(a)} durationInFrames={fr(b) - fr(a)} premountFor={30}>
        <FrameOffset.Provider value={0}><Comp dur={fr(b) - fr(a)} /></FrameOffset.Provider>
      </Sequence>
    ))}
    {music && <Html5Audio src={staticFile('music.m4a')} volume={0.6} />}
    {sfx && BEATS.flatMap(([a, , , cues], i) => cues.map((c, k) => (
      <Sequence key={`${i}-${k}`} from={fr(a) + c.at} durationInFrames={90} layout="none"><Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v ?? 0.4} /></Sequence>
    )))}
  </AbsoluteFill>
);
