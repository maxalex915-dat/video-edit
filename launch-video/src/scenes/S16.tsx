import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Tip, Drift, prog, E, useF, Cue} from './common';
import {ReportPage, SharePanel} from '../components/ui/Screens';

// Value: everyone informed. Pick 30 days, copy the link.
const C1 = 42, C2 = 68;
export const sfx: Cue[] = [{at: 8, s: 'swoosh_soft', v: 0.25}, {at: C1, s: 'click', v: 0.45}, {at: C2, s: 'click', v: 0.5}, {at: C2 + 4, s: 'success', v: 0.35}];
export const S16: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 20, E.snappy), b = prog(f, 6, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="sunrise" />
      <Drift dur={dur} push={0.04} origin="1400px 640px">
        <div style={{position: 'absolute', left: 1290, top: 110, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 100}px) rotate(3deg) scale(.6)`, transformOrigin: '0 0', borderRadius: 8, boxShadow: '0 50px 100px -40px rgba(5,60,63,.4)'}}><ReportPage /></div>
        <div style={{position: 'absolute', left: 760, top: 470, opacity: b, filter: `blur(${(1 - b) * 8}px)`, transform: `translateX(${(1 - b) * 100}px) perspective(2000px) rotateY(-10deg) rotateX(6deg) scale(1.3)`, transformOrigin: 'top left'}}><SharePanel days={f >= C1 ? 1 : 0} copied={f >= C2} /></div>
        <Ripple x={1524} y={660} at={C1} />
        <Ripple x={1700} y={754} at={C2} />
        <Tip x={1700} y={712} at={C2 + 3}>Link copied</Tip>
        <Cursor path={[{f: 22, x: 1200, y: 1000}, {f: 38, x: 1514, y: 648}, {f: 64, x: 1690, y: 742}]} clicks={[C1, C2]} show={22} />
      </Drift>
      <Headline on="white" a="One link." b="The whole team informed." size={88} style={{left: 110, top: 90}} at={2} />
    </AbsoluteFill>
  );
};
