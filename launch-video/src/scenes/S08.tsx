import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, Cursor, Ripple, Tip, prog, E, useF, Cue, lerp} from './common';
import {HomeReplica} from '../components/ui/HomeReplica';

// Value: do what works. Hover across the platform cards, click the best, camera dives in.
const CLICK = 84;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: 44, s: 'tick', v: 0.2}, {at: 58, s: 'tick', v: 0.2}, {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 4, s: 'whoosh_long', v: 0.25}];
export const S08: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, 0, 22, E.snappy);
  const dive = prog(f, CLICK + 2, 34, E.inOut);
  const lift = f >= CLICK ? 2 : f >= 70 ? 2 : f >= 56 ? 1 : f >= 42 ? 0 : -1;
  return (
    <AbsoluteFill>
      <Ground kind="whiterings" />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateY(${(1 - up) * 120}px)`}}>
        <Shot w={1600} h={1000} focus={[lerp(dive, 1180, 1330), lerp(dive, 640, 600)]} at={[1280, 680]} scale={lerp(dive, 1.55, 2.3)} rx={lerp(dive, 18, 8)} ry={-10} rz={-2} dof={{rx: lerp(dive, 270, 300), ry: 170, blur: 5}} fade={{side: 'left', at: 780, soft: 200}}><HomeReplica lift={lift} draw={prog(f, 6, 40, E.snappy)} /></Shot>
      </div>
      <Headline on="white" a="See what works." b="Then do more of it." size={96} style={{left: 110, top: 380}} at={2} />
      <Ripple x={1360} y={600} at={CLICK} />
      <Tip x={1360} y={555} at={CLICK + 3} until={CLICK + 26}>Best this month, +64%</Tip>
      <Cursor path={[{f: 34, x: 1000, y: 980}, {f: 44, x: 1080, y: 560}, {f: 58, x: 1220, y: 580}, {f: 72, x: 1348, y: 586}, {f: dur, x: 1360, y: 600}]} clicks={[CLICK]} show={34} />
    </AbsoluteFill>
  );
};
