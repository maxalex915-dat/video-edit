import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Tip, Drift, prog, E, useF, Cue} from './common';
import {CityPanel, SessionsPanel} from '../components/ui/Panels';

// Value: know where visitors come from. Sessions chart behind, city list in front; hover the top city.
const HOVER = 60;
export const sfx: Cue[] = [{at: HOVER, s: 'pop_hi', v: 0.3}];
export const S08: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const a = prog(f, 0, 20, E.snappy), b = prog(f, 6, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="liquid" />
      <Drift dur={dur} push={0.05} origin="1300px 500px">
        <div style={{position: 'absolute', left: 920, top: 120, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 80}px)`}}><SessionsPanel draw={prog(f, 4, 40, E.snappy)} count={prog(f, 4, 30, E.snappy)} /></div>
        <div style={{position: 'absolute', left: 1240, top: 440, opacity: b, filter: `blur(${(1 - b) * 8}px)`, transform: `translateX(${(1 - b) * 80}px)`}}><CityPanel grow={prog(f, 10, 40, E.snappy)} lit={f >= HOVER} /></div>
        <Tip x={1360} y={540} at={HOVER + 2}>1,196 visitors, +18%</Tip>
        <Cursor path={[{f: 34, x: 1600, y: 1000}, {f: HOVER, x: 1350, y: 568}, {f: dur, x: 1360, y: 574}]} show={34} />
      </Drift>
      <Headline on="white" a="Know where" b="visitors come from." size={80} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
