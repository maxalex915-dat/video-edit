import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Float, Cursor, Ripple, prog, spr, S, E, C, F, useF, Cue} from './common';
import {ReportPage} from '../components/ui/Screens';

// Value: ahead of competitors. The report swings in, the grid fills, the PDF downloads.
const CLICK = 92;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, ...[30, 36, 42, 48, 54, 60].map((at) => ({at, s: 'pop', v: 0.22})), {at: CLICK, s: 'click', v: 0.5}, {at: 112, s: 'success', v: 0.35}];
export const S12: React.FC = () => {
  const f = useF();
  const sw = prog(f, 4, 26, E.snappy);
  const btn = spr(f, 62, S.snap);
  const dl = prog(f, CLICK + 2, 18, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <div style={{position: 'absolute', inset: 0, opacity: sw}}>
        <Float x={1000} y={130} w={760} h={880} tilt={`perspective(2200px) rotateY(${-16 - (1 - sw) * 50}deg) rotateX(6deg) rotateZ(2deg)`} inner="scale(.9)" style={{boxShadow: '0 40px 100px -30px rgba(0,40,60,.35)'}}><ReportPage fill={prog(f, 28, 36)} /></Float>
      </div>
      <div style={{position: 'absolute', left: 1530, top: 100, overflow: 'hidden', background: C.teal, color: '#fff', borderRadius: 99, padding: '14px 26px', fontFamily: F.text, fontSize: 22, fontWeight: 700, boxShadow: '0 20px 40px -10px rgba(0,40,60,.4)', transform: `scale(${Math.min(1.05, btn)})`, opacity: Math.min(1, btn)}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${dl * 100}%`, background: C.up}} />
        <span style={{position: 'relative'}}>{dl >= 1 ? '✓ Saved' : '⬇ Download PDF'}</span>
      </div>
      <Ripple x={1640} y={128} at={CLICK} />
      <Headline on="white" a="Know competitor moves" b="before anyone asks." size={86} style={{left: 110, top: 400}} at={2} />
      <Cursor path={[{f: 64, x: 1500, y: 700}, {f: 88, x: 1628, y: 114}]} clicks={[CLICK]} show={64} />
    </AbsoluteFill>
  );
};
