import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Float, Cursor, Ripple, prog, spr, S, E, C, F, useF, Cue, typed} from './common';
import {SearchScreen} from '../components/ui/Screens';

// Value: client intent. Click the search box, type "factory", the table filters live.
const CLICK = 30, TYPE = 36, WORD = 'factory';
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: CLICK, s: 'click', v: 0.45}, ...WORD.split('').map((_, i) => ({at: TYPE + Math.round(i * 30 / 11), s: `key${i % 4}`, v: 0.45})), {at: 66, s: 'swoosh_soft', v: 0.2}];
export const S07: React.FC = () => {
  const f = useF();
  const q = typed(f, WORD, TYPE, 11);
  const up = prog(f, 4, 22, E.snappy);
  const pill = spr(f, 18, S.snap);
  return (
    <AbsoluteFill>
      <Ground kind="dots" />
      <Headline on="grad" a="Find what clients" b="search for." size={100} style={{left: 110, top: 100}} at={2} />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateY(${(1 - up) * 160}px)`}}>
        <Float x={600} y={380} w={1240} h={760} tilt="perspective(2200px) rotateX(14deg) rotateY(-10deg)" inner="scale(1.3) translate(-640px, -60px)"><SearchScreen hl={q.length >= 7 ? 1 : -1} query={q} rows={prog(f, 6, 30)} /></Float>
      </div>
      <div style={{position: 'absolute', left: 700, top: 330, width: 620, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 99, padding: '18px 26px', fontFamily: F.text, fontSize: 28, color: C.ink, boxShadow: `0 20px 50px -15px rgba(0,40,60,.5), 0 0 0 ${f >= CLICK ? 4 : 0}px rgba(0,185,239,.35)`, zIndex: 5, opacity: Math.min(1, pill), transform: `scale(${0.9 + Math.min(1, pill) * 0.1})`}}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 5 5" /></svg>
        {q || <span style={{color: C.ink4}}>Search top queries</span>}{f >= CLICK && Math.floor(f / 8) % 2 === 0 && <span style={{width: 3, height: 32, background: C.cyan}} />}
      </div>
      <Ripple x={920} y={366} at={CLICK} />
      <Cursor path={[{f: 10, x: 1300, y: 760}, {f: 27, x: 910, y: 352}, {f: 60, x: 1000, y: 420}]} clicks={[CLICK]} show={10} />
    </AbsoluteFill>
  );
};
