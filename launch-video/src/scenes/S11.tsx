import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Float, Cursor, Ripple, prog, E, C, F, useF, Cue} from './common';
import {SiteHealthScreen} from '../components/ui/Screens';

// Value: $1,200 a year back. Cancel the SEMrush renewal, the in-house audit takes over.
const CLICK = 58;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: 10, s: 'swoosh_soft', v: 0.3}, {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 4, s: 'cash', v: 0.55}, {at: 70, s: 'whoosh_long', v: 0.3}, {at: 104, s: 'success', v: 0.35}];
export const S11: React.FC = () => {
  const f = useF();
  const card = prog(f, 8, 22, E.snappy);
  const strike = prog(f, CLICK + 2, 10, E.snappy);
  const swing = prog(f, 68, 26, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="grain" />
      <Headline on="grad" a="Save $1,200 a year." b="No SEMrush subscription." size={80} style={{left: 110, top: 150}} at={2} />
      <div style={{position: 'absolute', left: 110, top: 520, width: 700, background: '#fff', borderRadius: 26, padding: 34, fontFamily: F.text, color: C.ink, boxShadow: '0 40px 80px -30px rgba(0,40,40,.5)', opacity: card, transform: `translateX(${(1 - card) * -300}px) rotate(${-3 * card}deg) scale(${1 - strike * 0.02})`}}>
        <div style={{fontSize: 16, color: C.ink3, fontFamily: F.mono, letterSpacing: '.12em'}}>{strike > 0.5 ? 'PLAN CANCELLED' : 'RENEWAL NOTICE'}</div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}><span style={{fontSize: 30, fontWeight: 700}}>SEMrush, yearly plan</span>
          <span style={{position: 'relative', fontSize: 38, fontWeight: 750, color: strike > 0.5 ? C.ink3 : C.ink}}>$1,200<span style={{position: 'absolute', left: -4, top: '52%', height: 4, width: `${strike * 108}%`, background: '#ab3527', borderRadius: 2}} /></span></div>
        <div style={{display: 'flex', gap: 12, marginTop: 24}}><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: C.inset, fontWeight: 650, fontSize: 19}}>Renew</span><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: f >= CLICK ? C.up : C.ink, color: '#fff', fontWeight: 650, fontSize: 19}}>{f >= CLICK ? '✓ Cancelled' : 'Cancel plan'}</span></div>
      </div>
      <Ripple x={640} y={784} at={CLICK} />
      <div style={{position: 'absolute', inset: 0, opacity: swing, transform: `translateX(${(1 - swing) * 300}px)`}}>
        <Float x={1080} y={330} w={740} h={660} tilt={`perspective(2200px) rotateY(${-12 - (1 - swing) * 40}deg) rotateX(4deg)`} inner="scale(1.05) translate(-10px, -40px)"><SiteHealthScreen gauge={prog(f, 78, 34, E.snappy)} done={Math.floor(prog(f, 90, 30) * 4)} /></Float>
      </div>
      <Cursor path={[{f: 30, x: 900, y: 1000}, {f: 54, x: 628, y: 770}, {f: 100, x: 700, y: 820}]} clicks={[CLICK]} show={30} />
    </AbsoluteFill>
  );
};
