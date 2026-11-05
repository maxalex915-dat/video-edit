import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, Cursor, Tip, prog, E, useF, Cue, lerp} from './common';
import {WebsiteScreen} from '../components/ui/Screens';

// Value: know where visitors come from. City bars grow, the cursor hovers the top city.
const HOVER = 78;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: HOVER, s: 'pop_hi', v: 0.3}];
export const S06: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, 0, 22, E.snappy);
  const drift = prog(f, 0, dur, E.glide);
  return (
    <AbsoluteFill>
      <Ground kind="liquid" />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateX(${(1 - up) * 200}px)`}}>
        <Shot w={1600} h={1000} focus={[1180, 300]} at={[1340, 520]} scale={lerp(drift, 1.85, 2.05)} rx={10} ry={lerp(drift, -18, -12)} dof={{rx: 380, ry: 140, blur: 5}} fade={{side: 'left', at: 860, soft: 200}}><WebsiteScreen hl={0} grow={prog(f, 12, 46, E.snappy)} draw={prog(f, 8, 50, E.snappy)} lit={f >= HOVER ? 1 : 0} /></Shot>
      </div>
      <Headline on="white" a="Know where" b="visitors come from." size={88} style={{left: 110, top: 400}} at={2} />
      <Tip x={1470} y={470} at={HOVER + 2}>1,196 visitors, +18%</Tip>
      <Cursor path={[{f: 48, x: 1750, y: 860}, {f: HOVER, x: 1460, y: 500}, {f: dur, x: 1480, y: 510}]} show={48} />
    </AbsoluteFill>
  );
};
