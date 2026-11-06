import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import {FrameOffset} from '../frame';
import * as O from './Open';
import * as A from '../v3/A';
import * as M from './Mid';
import * as M2 from './Mid2';
import * as SA from './Audit';
import * as Cc from '../v3/C';
import * as D from '../v3/D';
import * as En from './End';
import * as S15 from '../scenes/S15';
import * as S16 from '../scenes/S16';
import * as S17 from '../scenes/S17';
import * as S18 from '../scenes/S18';
import * as S19 from '../scenes/S19';

type Cue = {at: number; s: string; v?: number};
// Two minutes on the original music (drop at 9.2 s; the middle repeats 14 bars; the track's own ending closes).
const BEATS: [number, number, React.FC<{dur: number}>, Cue[], string][] = [
  [0, 3.4, O.P1, O.p1sfx, 'logins'], [3.4, 7.9, O.P2, O.p2sfx, 'spreadsheets'], [7.9, 9.2, A.B3, A.b3sfx, 'stop'], [9.2, 12.4, A.B4, A.b4sfx, 'meet'],
  [12.4, 15.6, M.M1, M.m1sfx, 'all in one place'], [15.6, 21.0, A.B6, A.b6sfx, 'home'], [21.0, 28.6, M.M2, M.m2sfx, 'trends'], [28.6, 35.0, M.M3, M.m3sfx, 'live'],
  [35.0, 39.0, M.M4, M.m4sfx, 'decisions'], [39.0, 46.0, M2.A1, M2.a1sfx, 'ai report'], [46.0, 53.0, M2.A2, M2.a2sfx, 'double down'], [53.0, 61.0, M2.A3, M2.a3sfx, 'keywords'],
  [61.0, 63.0, SA.SA1, SA.sa1sfx, 'audit intro'], [63.0, 67.4, SA.SA2, SA.sa2sfx, 'semrush'], [67.4, 74.6, SA.SA3, SA.sa3sfx, 'audit dashboard'], [74.6, 79.0, SA.SA4, SA.sa4sfx, 'audit features'],
  [79.0, 83.6, Cc.B18, Cc.b18sfx, 'competitors'], [83.6, 88.0, S15.S15 as React.FC<{dur: number}>, S15.sfx, 'offices'], [88.0, 92.4, S16.S16, S16.sfx, 'share'], [92.4, 96.8, S17.S17, S17.sfx, 'pr'],
  [96.8, 101.2, S18.S18, S18.sfx, 'inquiries'], [101.2, 105.6, S19.S19, S19.sfx, 'approvals'], [105.6, 108.6, D.B20, D.b20sfx, 'contrast'], [108.6, 120.0, En.End, En.endsfx, 'bento and logo'],
];
const fr = (s: number) => Math.round(s * 30);
export const BEATS4 = BEATS.map(([a, b, , , n]) => ({from: fr(a), dur: fr(b) - fr(a), n}));
export const Film4: React.FC<{music?: boolean; sfx?: boolean}> = ({music = true, sfx = true}) => (
  <AbsoluteFill style={{background: '#fff'}}>
    {BEATS.map(([a, b, Comp], i) => (
      <Sequence key={i} name={BEATS[i][4]} from={fr(a)} durationInFrames={fr(b) - fr(a)} premountFor={30}>
        <FrameOffset.Provider value={0}><Comp dur={fr(b) - fr(a)} /></FrameOffset.Provider>
      </Sequence>
    ))}
    {music && <Html5Audio src={staticFile('music.m4a')} volume={0.6} />}
    {sfx && BEATS.flatMap(([a, , , cues], i) => cues.map((c, k) => (
      <Sequence key={`${i}-${k}`} from={fr(a) + c.at} durationInFrames={90} layout="none"><Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v ?? 0.4} /></Sequence>
    )))}
  </AbsoluteFill>
);
