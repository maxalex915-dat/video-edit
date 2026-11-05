import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, prog, E, C, F, useF, Cue, lerp} from './common';
import {Spreadsheet} from '../components/ui/Screens';

// Problem: copy and paste, faster and faster, then everything is crushed into one point for the drop.
const PASTES = [24, 40, 52, 62, 70, 77, 83, 88, 92, 96, 99, 102];
export const sfx: Cue[] = [
  ...PASTES.map((at, i) => ({at, s: `key${i % 4}`, v: 0.35})),
  ...PASTES.map((at, i) => ({at: at + 3, s: `key${(i + 2) % 4}`, v: 0.25})),
  {at: 79, s: 'riser', v: 0.55},
  {at: 108, s: 'whoosh_long', v: 0.35},
];
export const S02: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const n = PASTES.filter((p) => f >= p).length;
  const crush = prog(f, 108, dur - 108, E.expoIn);
  const drift = prog(f, 0, dur, E.glide);
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <div style={{position: 'absolute', inset: 0, transform: `translate(${crush * -380}px, ${crush * 40}px) scale(${1 - crush * 0.96}) rotate(${crush * 25}deg)`, transformOrigin: '1300px 520px', filter: `blur(${crush * 6}px)`, opacity: 1 - prog(f, dur - 6, 6)}}>
        <Shot w={1400} h={700} focus={[600, 230 + Math.min(n, 9) * 8]} at={[1320, 500]} scale={lerp(drift, 1.75, 2.0)} rx={14} ry={lerp(drift, -20, -14)} rz={-3} dof={{rx: 380, ry: 200, blur: 5}} fade={{side: 'left', at: 760, soft: 220}}><Spreadsheet hl={[3 + (n % 10), 3 + (n % 3)]} /></Shot>
        <div style={{position: 'absolute', left: 1330, top: 410, background: C.ink, color: '#fff', borderRadius: 10, padding: '8px 14px', fontFamily: F.mono, fontSize: 18, opacity: f > 20 ? 1 : 0}}>{n % 2 ? 'Ctrl + V' : 'Ctrl + C'}</div>
      </div>
      <Headline on="white" a="Hours lost to" b="copy and paste." size={96} style={{left: 110, top: 400}} at={2} out={100} />
      <div style={{position: 'absolute', left: 1300 - 380 - 30, top: 520 - 30, width: 60, height: 60, borderRadius: '50%', background: '#fff', boxShadow: `0 0 ${60 * crush}px ${30 * crush}px rgba(0,185,239,.8)`, opacity: crush, transform: `scale(${crush})`}} />
    </AbsoluteFill>
  );
};
