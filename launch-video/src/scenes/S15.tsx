import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Float, prog, spr, S, E, C, F, useF, Cue} from './common';
import {MentionsScreen} from '../components/ui/Screens';

// Value: no mention missed. A notification lands, the feed makes room for it.
const NOTE = 46;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: NOTE, s: 'chime', v: 0.5}, {at: 58, s: 'swoosh_soft', v: 0.25}];
export const S15: React.FC = () => {
  const f = useF();
  const up = prog(f, 4, 24, E.snappy);
  const n = spr(f, NOTE, S.snap);
  return (
    <AbsoluteFill>
      <Ground kind="bokeh" />
      <Headline on="grad" a="Never miss" b="a press mention." size={100} style={{left: 110, top: 90}} at={2} />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateY(${(1 - up) * 180}px)`}}>
        <Float x={560} y={380} w={1300} h={780} tilt="perspective(2200px) rotateX(18deg) rotateZ(-2deg)" inner="scale(1.25) translate(-30px, -20px)"><MentionsScreen newIn={prog(f, 58, 20, E.snappy)} fresh={0.5 + 0.5 * Math.sin(Math.max(0, f - 70) / 5)} /></Float>
      </div>
      {f >= NOTE && (
        <div style={{position: 'absolute', left: 1290, top: 110, width: 520, display: 'flex', gap: 16, alignItems: 'center', background: '#fff', borderRadius: 22, padding: '18px 22px', fontFamily: F.text, boxShadow: '0 30px 70px -20px rgba(0,40,60,.5)', opacity: Math.min(1, n), transform: `translateX(${(1 - Math.min(1, n)) * 140}px)`}}>
          <div style={{width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#7fbc42,#00b9ef 45%,#70cbf3)', display: 'grid', placeItems: 'center', transform: `rotate(${Math.sin((f - NOTE) * 0.7) * 16 * Math.exp(-(f - NOTE) / 14)}deg)`}}><svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.7"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
          <div><div style={{fontSize: 20, fontWeight: 700, color: C.ink}}>New mention found</div><div style={{fontSize: 16, color: C.ink3, marginTop: 2}}>Construction trade press, just now</div></div>
        </div>
      )}
    </AbsoluteFill>
  );
};
