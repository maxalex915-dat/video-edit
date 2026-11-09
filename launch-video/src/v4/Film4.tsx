import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import {FrameOffset} from '../frame';
import * as D from '../v3/D';
import * as En from './End';
import * as In from '../v5/Intro';
import * as Hz from '../v5/Horizon';
import * as V from '../v6/Scenes';

type Cue = {at: number; s: string; v?: number};
// Two minutes on the original music (drop at 9.2 s; the middle repeats 14 bars; the track's own ending closes).
const BEATS: [number, number, React.FC<{dur: number}>, Cue[], string][] = [
  // problem
  [0, 3.6, In.I1, In.i1sfx, 'data everywhere'], [3.6, 7.4, In.I2, In.i2sfx, 'spreadsheet sprawl'], [7.4, 10.0, In.I3, In.i3sfx, 'separate logins'], [10.0, 12.3, In.I4, In.i4sfx, 'all disconnected'],
  // introduction
  [12.3, 15.4, V.Meet, V.meetSfx, 'meet'],
  // solution: everything in one place
  [15.4, 18.4, Hz.HorizonScene, Hz.hzsfx, 'one place'], [18.4, 22.8, V.Live, V.liveSfx, 'hub'], [22.8, 26.8, V.Home, V.homeSfx, 'home'], [26.8, 30.8, V.Connect, V.connSfx, 'connect'],
  // value
  [30.8, 37.0, V.Trends, V.trendsSfx, 'trends'], [37.0, 41.0, V.Decisions, V.decSfx, 'decisions'], [41.0, 48.0, V.AiReport, V.aiSfx, 'ai report'], [48.0, 55.0, V.Double, V.ddSfx, 'double down'],
  [55.0, 62.0, V.Keywords, V.kwSfx, 'keywords'], [62.0, 64.0, V.AuditIntro, V.sa1Sfx, 'audit intro'], [64.0, 68.4, V.Saving, V.sa2Sfx, 'semrush'], [68.4, 75.6, V.AuditDash, V.sa3Sfx, 'audit dashboard'], [75.6, 80.0, V.Features, V.sa4Sfx, 'audit features'],
  // quick jumps
  [80.0, 83.6, V.Competitors, V.compSfx, 'competitors'], [83.6, 87.2, V.Offices, V.offSfx, 'offices'], [87.2, 90.8, V.Share, V.shareSfx, 'share'], [90.8, 94.4, V.Press, V.prSfx, 'pr'], [94.4, 98.0, V.Inquiries, V.inqSfx, 'inquiries'], [98.0, 101.6, V.Approvals, V.apSfx, 'approvals'],
  // recap and close
  [101.6, 105.6, V.Recap, V.recapSfx, 'recap'], [105.6, 108.6, D.B20, D.b20sfx, 'contrast'], [108.6, 120.0, En.End, En.endsfx, 'bento and logo'],
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
    {music && <Html5Audio src={staticFile('music_ref2.m4a')} volume={0.75} />}
    {sfx && BEATS.flatMap(([a, , , cues], i) => cues.map((c, k) => (
      <Sequence key={`${i}-${k}`} from={fr(a) + c.at} durationInFrames={90} layout="none"><Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={(c.v ?? 0.4) * 0.55} /></Sequence>
    )))}
  </AbsoluteFill>
);
