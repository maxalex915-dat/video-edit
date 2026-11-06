import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Drift, prog, E, C, F, useF, Cue} from './common';
import {SiteHealthPanel} from '../components/ui/Panels';

// Value: $1,200 a year back. Cancel the SEMrush renewal; the in-house audit takes over.
const CLICK = 56;
export const sfx: Cue[] = [{at: 8, s: 'swoosh_soft', v: 0.3}, {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 4, s: 'cash', v: 0.55}, {at: 70, s: 'swoosh', v: 0.3}, {at: 104, s: 'success', v: 0.35}];
export const S13: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const card = prog(f, 6, 20, E.snappy);
  const strike = prog(f, CLICK + 2, 10, E.snappy);
  const sw = prog(f, 68, 22, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="grain" />
      <Drift dur={dur} push={0.03} origin="960px 600px">
        <div style={{position: 'absolute', left: 110, top: 520, width: 700, background: '#fff', borderRadius: 26, padding: 34, fontFamily: F.text, color: C.ink, boxShadow: '0 40px 80px -30px rgba(0,40,40,.5)', opacity: card, filter: `blur(${(1 - card) * 8}px)`, transform: `translateX(${(1 - card) * -120}px) rotate(-3deg)`}}>
          <div style={{fontSize: 16, color: C.ink3, fontFamily: F.mono, letterSpacing: '.12em'}}>{strike > 0.5 ? 'PLAN CANCELLED' : 'RENEWAL NOTICE'}</div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}><span style={{fontSize: 30, fontWeight: 700}}>SEMrush, yearly plan</span>
            <span style={{position: 'relative', fontSize: 38, fontWeight: 750, color: strike > 0.5 ? C.ink3 : C.ink}}>$1,200<span style={{position: 'absolute', left: -4, top: '52%', height: 4, width: `${strike * 108}%`, background: '#ab3527', borderRadius: 2}} /></span></div>
          <div style={{display: 'flex', gap: 12, marginTop: 24}}><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: C.inset, fontWeight: 650, fontSize: 19}}>Renew</span><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: f >= CLICK ? C.up : C.ink, color: '#fff', fontWeight: 650, fontSize: 19}}>{f >= CLICK ? '✓ Cancelled' : 'Cancel plan'}</span></div>
        </div>
        <Ripple x={640} y={784} at={CLICK} />
        <div style={{position: 'absolute', left: 1060, top: 330, opacity: sw, filter: `blur(${(1 - sw) * 8}px)`, transform: `translateX(${(1 - sw) * 120}px)`}}><SiteHealthPanel gauge={prog(f, 74, 34, E.snappy)} /></div>
        <Cursor path={[{f: 28, x: 900, y: 1000}, {f: 52, x: 628, y: 770}, {f: dur, x: 720, y: 840}]} clicks={[CLICK]} show={28} />
      </Drift>
      <Headline on="grad" a="Save $1,200 a year." b="No SEMrush subscription." size={80} style={{left: 110, top: 150}} at={2} />
    </AbsoluteFill>
  );
};
