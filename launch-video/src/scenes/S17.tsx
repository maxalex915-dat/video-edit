import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Ground, Headline, Float, Cursor, prog, E, C, F, useF, Cue} from './common';
import {BoardScreen} from '../components/ui/Screens';

// Value: faster approvals. Grab a card in To do, carry it to Done, it flips to Approved.
const GRAB = 46, DROP = 92;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: GRAB, s: 'click', v: 0.45}, {at: GRAB + 4, s: 'swoosh_soft', v: 0.3}, {at: DROP, s: 'pop', v: 0.4}, {at: DROP + 3, s: 'success', v: 0.4}];
export const S17: React.FC = () => {
  const f = useF();
  const up = prog(f, 0, 24, E.snappy);
  const mv = interpolate(f, [GRAB, DROP], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const x = 1070 + mv * 520, y = 300 - Math.sin(mv * Math.PI) * 60;
  const carrying = f >= GRAB && f < DROP;
  return (
    <AbsoluteFill>
      <Ground kind="lines" />
      <Headline on="grad" a="Approvals move faster." b="Nothing stuck in inboxes." size={76} style={{left: 110, top: 400}} at={2} />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateX(${(1 - up) * 240}px)`}}>
        <Float x={1010} y={200} w={850} h={720} tilt="perspective(2200px) rotateY(-12deg) rotateX(6deg)" inner="scale(1.05)"><BoardScreen moved={f >= GRAB} /></Float>
      </div>
      {carrying && (
        <div style={{position: 'absolute', left: x, top: y, width: 330, transform: `rotate(${-4 * Math.sin(mv * Math.PI)}deg) scale(${1 + Math.sin(mv * Math.PI) * 0.08})`, background: '#fff', borderRadius: 16, padding: '16px 18px', fontFamily: F.text, boxShadow: `0 ${20 + Math.sin(mv * Math.PI) * 30}px ${40 + Math.sin(mv * Math.PI) * 40}px -16px rgba(0,50,70,.5)`, zIndex: 5}}>
          <div style={{fontSize: 18, fontWeight: 650, color: C.ink, marginBottom: 10}}>Site photos for case study</div>
          <span style={{fontSize: 14, fontWeight: 650, color: mv > 0.8 ? C.up : '#ab3527', background: mv > 0.8 ? 'rgba(63,122,38,.12)' : '#ab352718', borderRadius: 99, padding: '3px 11px'}}>{mv > 0.8 ? 'Approved' : 'Urgent'}</span>
        </div>
      )}
      <Cursor path={[{f: 20, x: 1500, y: 950}, {f: GRAB - 4, x: 1180, y: 330}, {f: GRAB, x: 1180, y: 330}, {f: DROP, x: 1700, y: 330}, {f: 132, x: 1720, y: 420}]} clicks={[GRAB, DROP]} show={20} />
    </AbsoluteFill>
  );
};
