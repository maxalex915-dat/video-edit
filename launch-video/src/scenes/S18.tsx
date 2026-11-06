import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Drift, prog, spr, S, E, C, F, useF, Cue} from './common';
import {RequestsPanel, RequestsChart} from '../components/ui/Panels';

// Value: no lead lost. Open the status menu on a lead, mark it Won; the month's total ticks up.
const C1 = 56, C2 = 80;
const PILL = {x: 1560, y: 492};
export const sfx: Cue[] = [{at: C1, s: 'click', v: 0.45}, {at: C1 + 2, s: 'pop_hi', v: 0.25}, {at: C2, s: 'click', v: 0.5}, {at: C2 + 4, s: 'success', v: 0.4}];
export const S18: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 20, E.snappy), b = prog(f, 8, 20, E.snappy);
  const menu = f >= C1 && f < C2 + 6 ? spr(f, C1, S.snap) : 0;
  const won = f >= C2;
  return (
    <AbsoluteFill>
      <Ground kind="liquid" />
      <Drift dur={dur} push={0.04} origin="1300px 520px">
        <div style={{position: 'absolute', left: 880, top: 190, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 100}px)`}}><RequestsPanel won={won} rowsIn={prog(f, 4, 26)} /></div>
        <div style={{position: 'absolute', left: 1430, top: 640, opacity: b, filter: `blur(${(1 - b) * 8}px)`, transform: `translateX(${(1 - b) * 100}px)`}}><RequestsChart draw={prog(f, 10, 40, E.snappy)} total={won ? 24 : Math.round(23 * prog(f, 10, 40, E.snappy))} w={480} /></div>
        {menu > 0 && (
          <div style={{position: 'absolute', left: PILL.x - 60, top: PILL.y + 26, width: 200, background: '#fff', borderRadius: 16, padding: 8, fontFamily: F.text, fontSize: 19, boxShadow: '0 24px 50px -16px rgba(5,60,63,.45)', zIndex: 5, opacity: Math.min(1, menu), transform: `translateY(${(1 - Math.min(1, menu)) * -12}px)`}}>
            {['New', 'Quoted', 'Won', 'Lost'].map((x) => <div key={x} style={{padding: '10px 14px', borderRadius: 10, background: x === 'Won' && f >= 70 ? C.teal : 'none', color: x === 'Won' && f >= 70 ? '#fff' : C.ink, fontWeight: x === 'Won' ? 650 : 450}}>{x}</div>)}
          </div>
        )}
        <Ripple x={PILL.x} y={PILL.y} at={C1} />
        <Ripple x={PILL.x} y={PILL.y + 26 + 8 + 2 * 43 + 22} at={C2} />
        <Cursor path={[{f: 30, x: 1300, y: 1000}, {f: 52, x: PILL.x - 8, y: PILL.y - 10}, {f: 76, x: PILL.x - 4, y: PILL.y + 26 + 8 + 2 * 43 + 10}]} clicks={[C1, C2]} show={30} />
      </Drift>
      <Headline on="white" a="Every business lead," b="tracked. None lost." size={74} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
