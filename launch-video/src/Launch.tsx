import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import {TIMING, Cue} from './timeline';
import {SceneIn} from './components/kit/Anim';
import * as S1 from './scenes/S01'; import * as S2 from './scenes/S02'; import * as S3 from './scenes/S03'; import * as S4 from './scenes/S04';
import * as S5 from './scenes/S05'; import * as S6 from './scenes/S06'; import * as S7 from './scenes/S07'; import * as S8 from './scenes/S08';
import * as S9 from './scenes/S09'; import * as S10 from './scenes/S10'; import * as S11 from './scenes/S11'; import * as S12 from './scenes/S12';
import * as S13 from './scenes/S13'; import * as S14 from './scenes/S14'; import * as S15 from './scenes/S15'; import * as S16 from './scenes/S16';
import * as S17 from './scenes/S17'; import * as S18 from './scenes/S18';

const MODS: {C: React.FC<{dur: number}>; sfx: Cue[]; push?: number}[] = [
  {C: S1.S01, sfx: S1.sfx}, {C: S2.S02, sfx: S2.sfx, push: 0}, {C: S3.S03, sfx: S3.sfx, push: 0}, {C: S4.S04, sfx: S4.sfx}, {C: S5.S05, sfx: S5.sfx}, {C: S6.S06, sfx: S6.sfx},
  {C: S7.S07, sfx: S7.sfx}, {C: S8.S08, sfx: S8.sfx}, {C: S9.S09, sfx: S9.sfx}, {C: S10.S10, sfx: S10.sfx}, {C: S11.S11, sfx: S11.sfx}, {C: S12.S12, sfx: S12.sfx},
  {C: S13.S13, sfx: S13.sfx}, {C: S14.S14, sfx: S14.sfx}, {C: S15.S15, sfx: S15.sfx}, {C: S16.S16, sfx: S16.sfx}, {C: S17.S17, sfx: S17.sfx}, {C: S18.S18, sfx: S18.sfx, push: 0},
];

export const Launch: React.FC<{music?: boolean; sfx?: boolean}> = ({music = true, sfx = true}) => (
  <AbsoluteFill style={{background: '#fff'}}>
    {TIMING.map((t, i) => {
      const M = MODS[i];
      return (
        <Sequence key={t.id} name={t.id} from={t.from} durationInFrames={t.dur} premountFor={30}>
          <SceneIn dur={t.dur} push={M.push ?? 1}><M.C dur={t.dur} /></SceneIn>
        </Sequence>
      );
    })}
    {music && <Html5Audio src={staticFile('music.m4a')} volume={0.6} />}
    {sfx && TIMING.flatMap((t, i) => MODS[i].sfx.map((c, k) => (
      <Sequence key={`${t.id}-${k}`} from={t.from + c.at} durationInFrames={90} layout="none">
        <Html5Audio src={staticFile(`sfx/${c.s}.wav`)} volume={c.v ?? 0.4} />
      </Sequence>
    )))}
  </AbsoluteFill>
);
