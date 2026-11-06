import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Tip, Drift, prog, E, useF, Cue} from './common';
import {FunnelPanel, OpensPanel} from '../components/ui/Panels';

// Value: emails that land. The funnel fills; hover Opened to see how many people read it.
const HOVER = 62;
export const sfx: Cue[] = [{at: 10, s: 'swoosh_soft', v: 0.2}, {at: HOVER, s: 'pop_hi', v: 0.3}];
export const S11: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 20, E.snappy), b = prog(f, 8, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="topo" />
      <Drift dur={dur} push={0.05} origin="1350px 520px">
        <div style={{position: 'absolute', left: 940, top: 140, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 80}px)`}}><FunnelPanel fill={prog(f, 6, 44, E.snappy)} hover={f >= HOVER} /></div>
        <div style={{position: 'absolute', left: 1300, top: 640, opacity: b, filter: `blur(${(1 - b) * 8}px)`, transform: `translateX(${(1 - b) * 80}px)`}}><OpensPanel draw={prog(f, 10, 40, E.snappy)} w={540} /></div>
        <Tip x={1240} y={420} at={HOVER + 2}>{`${Math.round(1317 * prog(f, HOVER + 2, 16, E.snappy)).toLocaleString('en-US')} people opened it`}</Tip>
        <Cursor path={[{f: 36, x: 1500, y: 1000}, {f: HOVER, x: 1230, y: 452}]} show={36} />
      </Drift>
      <Headline on="grad" a="Know which emails" b="get opened." size={88} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
