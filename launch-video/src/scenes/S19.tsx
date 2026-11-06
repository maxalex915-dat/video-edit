import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Ground, Headline, Cursor, Drift, prog, E, useF, Cue} from './common';
import {BoardPanel, TaskCard} from '../components/ui/Panels';

// Value: faster approvals. Grab a card in To do, carry it to Done, it flips to Approved.
const GRAB = 44, DROP = 90;
const BX = 860, BY = 200, BW = 1000;
const colX = (c: number) => BX + 28 + c * ((BW - 56 - 32) / 3 + 16) + 14;
const CW = (BW - 56 - 32) / 3 - 28;
const cardY = BY + 28 + 70 + 14 + 32;
export const sfx: Cue[] = [{at: GRAB, s: 'click', v: 0.45}, {at: GRAB + 4, s: 'swoosh_soft', v: 0.3}, {at: DROP, s: 'pop', v: 0.4}, {at: DROP + 3, s: 'success', v: 0.4}];
export const S19: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 20, E.snappy);
  const mv = interpolate(f, [GRAB, DROP], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const arc = Math.sin(mv * Math.PI);
  const x = colX(0) + (colX(2) - colX(0)) * mv, y = cardY - arc * 70;
  const carrying = f >= GRAB && f < DROP;
  return (
    <AbsoluteFill>
      <Ground kind="lines" />
      <Drift dur={dur} push={0.04} origin="1300px 500px">
        <div style={{position: 'absolute', left: BX, top: BY, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 100}px)`}}><BoardPanel moved={f >= GRAB} landed={f >= DROP} w={BW} /></div>
        {carrying && <div style={{position: 'absolute', left: x, top: y, width: CW, zIndex: 5, transform: `rotate(${-4 * arc}deg) scale(${1 + arc * 0.06})`, boxShadow: `0 ${20 + arc * 30}px ${40 + arc * 40}px -16px rgba(0,50,70,.45)`, borderRadius: 16}}><TaskCard t="Site photos for case study" tag={mv > 0.8 ? 'Approved' : 'Urgent'} tc={mv > 0.8 ? '#3f7a26' : '#ab3527'} who="QA" /></div>}
        <Cursor path={[{f: 18, x: 1300, y: 1000}, {f: GRAB - 4, x: colX(0) + 120, y: cardY + 30}, {f: GRAB, x: colX(0) + 120, y: cardY + 30}, {f: DROP, x: colX(2) + 120, y: cardY + 30}, {f: dur, x: colX(2) + 160, y: cardY + 140}]} clicks={[GRAB, DROP]} show={18} />
      </Drift>
      <Headline on="grad" a="Approvals move faster." b="Nothing stuck in inboxes." size={62} style={{left: 110, top: 400, width: 680}} at={2} />
    </AbsoluteFill>
  );
};
