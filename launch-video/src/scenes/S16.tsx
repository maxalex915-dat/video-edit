import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, Cursor, Ripple, prog, spr, S, E, C, F, useF, Cue} from './common';
import {InquiriesScreen} from '../components/ui/Screens';

// Value: no lead lost. Open the status menu, mark the lead Won, the month's total ticks up.
const C1 = 58, C2 = 82;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: C1, s: 'click', v: 0.45}, {at: C1 + 2, s: 'pop_hi', v: 0.25}, {at: C2, s: 'click', v: 0.5}, {at: C2 + 4, s: 'success', v: 0.4}];
export const S16: React.FC = () => {
  const f = useF();
  const up = prog(f, 0, 24, E.snappy);
  const menu = f >= C1 && f < C2 + 6 ? spr(f, C1, S.snap) : 0;
  const won = f >= C2;
  return (
    <AbsoluteFill>
      <Ground kind="liquid" />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateX(${(1 - up) * 220}px)`}}>
        <Shot w={1600} h={1000} focus={[1000, 360]} at={[1300, 560]} scale={1.45} rx={10} ry={-14} dof={{rx: 640, ry: 380, blur: 4}} fade={{side: 'left', at: 820, soft: 200}}><InquiriesScreen hl={2} draw={prog(f, 10, 40, E.snappy)} won={won} total={won ? 24 : Math.round(23 * prog(f, 10, 40, E.snappy))} /></Shot>
      </div>
      {menu > 0 && (
        <div style={{position: 'absolute', left: 960, top: 512, width: 220, background: '#fff', borderRadius: 16, padding: 8, fontFamily: F.text, fontSize: 19, boxShadow: '0 24px 50px -16px rgba(5,60,63,.45)', zIndex: 5, opacity: Math.min(1, menu), transform: `translateY(${(1 - Math.min(1, menu)) * -12}px) scale(${0.95 + Math.min(1, menu) * 0.05})`, transformOrigin: 'top'}}>
          {['New', 'Quoted', 'Won', 'Lost'].map((x) => <div key={x} style={{padding: '10px 14px', borderRadius: 10, background: x === 'Won' && f >= 70 ? C.teal : 'none', color: x === 'Won' && f >= 70 ? '#fff' : C.ink, fontWeight: x === 'Won' ? 650 : 450}}>{x}</div>)}
        </div>
      )}
      <Ripple x={990} y={486} at={C1} />
      <Ripple x={1030} y={624} at={C2} />
      <Headline on="white" a="Every business lead," b="tracked. None lost." size={86} style={{left: 110, top: 400}} at={2} />
      <Cursor path={[{f: 30, x: 1300, y: 960}, {f: 54, x: 980, y: 474}, {f: 76, x: 1020, y: 612}]} clicks={[C1, C2]} show={30} />
    </AbsoluteFill>
  );
};
