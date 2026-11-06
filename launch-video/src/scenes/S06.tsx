import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, prog, E, useF, Cue} from './common';
import {MomentumPanel} from '../components/ui/Panels';

// Value: the bigger picture. Every channel on one timeline; one LinkedIn post ripples through the website, search and inquiries.
const BAND = 44, SPIKE = 54;
export const sfx: Cue[] = [{at: 6, s: 'swoosh_soft', v: 0.25}, {at: BAND, s: 'shimmer', v: 0.3}, ...[0, 1, 2, 3].map((i) => ({at: SPIKE + Math.round(i * 6.5), s: 'pop_hi', v: 0.3}))];
export const S06: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const zoom = prog(f, BAND, dur - BAND, E.inOut);
  const up = prog(f, 0, 22, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glass" />
      <Headline on="grad" a="See the bigger picture." b="Every channel, connected." size={76} align="center" style={{left: 0, width: 1920, top: 48}} at={2} />
      <div style={{position: 'absolute', left: 210, top: 300, opacity: up, transform: `translateY(${(1 - up) * 80}px) scale(${1 + zoom * 0.07})`, transformOrigin: '950px 700px'}}>
        <MomentumPanel draw={prog(f, 6, 36, E.snappy)} band={prog(f, BAND, 10)} spike={prog(f, SPIKE, 30)} />
      </div>
    </AbsoluteFill>
  );
};
