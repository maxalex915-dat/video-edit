import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Drift, prog, spr, S, E, C, F, useF, Cue} from './common';
import {ReportPage} from '../components/ui/Screens';

// Value: ahead of competitors. The whole report page arrives, the grid fills, the PDF downloads.
const CLICK = 90;
export const sfx: Cue[] = [...[28, 34, 40, 46, 52, 58].map((at) => ({at, s: 'pop', v: 0.22})), {at: CLICK, s: 'click', v: 0.5}, {at: 110, s: 'success', v: 0.35}];
export const S14: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 22, E.snappy);
  const btn = spr(f, 60, S.snap);
  const dl = prog(f, CLICK + 2, 18, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <Drift dur={dur} push={0.04} origin="1400px 540px">
        <div style={{position: 'absolute', left: 1120, top: 120, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 100}px) rotate(2deg) scale(.68)`, transformOrigin: '0 0', borderRadius: 8, boxShadow: '0 60px 120px -40px rgba(5,60,63,.4)'}}><ReportPage fill={prog(f, 26, 36)} /></div>
        <div style={{position: 'absolute', left: 1500, top: 60, overflow: 'hidden', background: C.teal, color: '#fff', borderRadius: 99, padding: '14px 26px', fontFamily: F.text, fontSize: 22, fontWeight: 700, boxShadow: '0 20px 40px -10px rgba(0,40,60,.4)', transform: `scale(${Math.min(1.05, btn)})`, opacity: Math.min(1, btn)}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${dl * 100}%`, background: C.up}} />
          <span style={{position: 'relative'}}>{dl >= 1 ? '✓ Saved' : '⬇ Download PDF'}</span>
        </div>
        <Ripple x={1610} y={88} at={CLICK} />
        <Cursor path={[{f: 60, x: 1400, y: 700}, {f: 86, x: 1598, y: 74}]} clicks={[CLICK]} show={60} />
      </Drift>
      <Headline on="white" a="Know competitor moves" b="before anyone asks." size={82} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
