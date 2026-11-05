import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, prog, spr, S, E, F, useF, Cue} from './common';
import {Mark} from '../components/ui/Primitives';

// Reveal on the drop: flash, shockwave, the mark pops, the name rises.
export const sfx: Cue[] = [{at: 0, s: 'impact', v: 0.8}, {at: 4, s: 'pop', v: 0.4}, {at: 14, s: 'shimmer', v: 0.35}];
export const S03: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const flash = 1 - prog(f, 0, 14, E.snappy);
  const m = spr(f, 4, S.pop);
  const push = prog(f, 40, dur - 40, E.glide);
  return (
    <AbsoluteFill>
      <Ground kind="mesh" />
      {[0, 6, 12].map((d) => {const p = prog(f, d, 40, E.snappy); return <div key={d} style={{position: 'absolute', left: 960 - p * 1200, top: 320 - p * 1200, width: p * 2400, height: p * 2400, borderRadius: '50%', border: `${6 - d / 3}px solid rgba(255,255,255,${0.7 * (1 - p)})`}} />;})}
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + push * 0.06})`}}>
        <div style={{position: 'absolute', left: 960 - 90, top: 230, width: 180, height: 180, borderRadius: 52, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -20px rgba(0,60,80,.45)', transform: `scale(${m}) rotate(${(1 - Math.min(1, m)) * -20}deg)`}}><Mark size={120} /></div>
        <div style={{position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 490, fontFamily: F.mono, fontSize: 22, letterSpacing: `${0.2 + prog(f, 10, 30, E.snappy) * 0.3}em`, color: '#fff', opacity: prog(f, 10, 12)}}>ARCHETYPE</div>
        <Headline on="grad" a="Marketing Dashboard" size={140} align="center" style={{left: 0, width: 1920, top: 545}} at={14} />
        <div style={{position: 'absolute', left: 0, width: 1920, top: 735, textAlign: 'center', fontFamily: F.text, fontSize: 36, color: '#fff', textShadow: '0 1px 10px rgba(0,60,80,.3)', opacity: prog(f, 30, 14), transform: `translateY(${(1 - prog(f, 30, 18, E.snappy)) * 20}px)`}}>All of our marketing, in one place.</div>
      </div>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
};
