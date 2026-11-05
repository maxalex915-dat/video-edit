import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, Cursor, Ripple, Tip, prog, E, useF, Cue} from './common';
import {ReportPage, SharePanel} from '../components/ui/Screens';

// Value: everyone informed. Pick 30 days, copy the link.
const C1 = 58, C2 = 88;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: 12, s: 'swoosh_soft', v: 0.25}, {at: C1, s: 'click', v: 0.45}, {at: C2, s: 'click', v: 0.5}, {at: C2 + 4, s: 'success', v: 0.35}];
export const S14: React.FC = () => {
  const f = useF();
  const a = prog(f, 0, 24, E.snappy), b = prog(f, 10, 24, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="sunrise" />
      <div style={{position: 'absolute', inset: 0, opacity: a, transform: `translateY(${(1 - a) * 200}px)`}}>
        <Shot w={900} h={1270} focus={[450, 500]} at={[1500, 600]} scale={0.85} rx={10} ry={-28} rz={3} dof={null} fade={{side: 'top', at: 300, soft: 120}}><ReportPage /></Shot>
      </div>
      <div style={{position: 'absolute', left: 760, top: 470, opacity: b, transform: `translateY(${(1 - b) * 120}px) perspective(2000px) rotateY(-10deg) rotateX(6deg) scale(1.3)`, transformOrigin: 'top left'}}><SharePanel days={f >= C1 ? 1 : 0} copied={f >= C2} /></div>
      <Ripple x={1524} y={660} at={C1} />
      <Ripple x={1700} y={754} at={C2} />
      <Tip x={1700} y={712} at={C2 + 3}>Link copied</Tip>
      <Headline on="white" a="One link." b="The whole team informed." size={88} style={{left: 110, top: 90}} at={2} />
      <Cursor path={[{f: 34, x: 1200, y: 980}, {f: 54, x: 1514, y: 648}, {f: 84, x: 1690, y: 742}]} clicks={[C1, C2]} show={34} />
    </AbsoluteFill>
  );
};
