import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Shot, Cursor, Ripple, Tip, prog, E, useF, Cue, lerp} from './common';
import {HomeReplica} from '../components/ui/HomeReplica';

// Value: the full picture. Cards cascade in; the cursor switches to 12 months and everything re-counts.
const CLICK = 80;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, ...[6, 10, 14, 18, 22].map((at) => ({at, s: 'tick', v: 0.18})), {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 6, s: 'swoosh_soft', v: 0.25}];
export const S05: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, 0, 24, E.snappy);
  const cards = [0, 1, 2, 3, 4, 5].map((i) => prog(f, 6 + i * 4, 18, E.snappy));
  const after = f >= CLICK + 2;
  const draw = after ? prog(f, CLICK + 2, 30, E.snappy) : prog(f, 14, 40, E.snappy);
  const count = after ? 0.6 + 0.4 * prog(f, CLICK + 2, 26, E.snappy) : prog(f, 18, 30, E.snappy);
  const drift = prog(f, 0, dur, E.glide);
  return (
    <AbsoluteFill>
      <Ground kind="sunrise" />
      <Headline on="white" a="See the full picture." b="Every channel, one screen." size={88} align="center" style={{left: 0, width: 1920, top: 60}} at={2} />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - up) * 260}px)`}}>
        <Shot w={1600} h={1000} focus={[900, 200]} at={[960, 620]} scale={lerp(drift, 1.13, 1.17)} rx={26} dof={null} fade={{side: 'top', at: 300, soft: 70}}><HomeReplica cards={cards} draw={draw} count={count} range={after ? '12m' : '1m'} /></Shot>
      </div>
      <Ripple x={1690} y={462} at={CLICK} />
      <Tip x={1690} y={428} at={CLICK + 3} until={dur - 20}>Last 12 months</Tip>
      <Cursor path={[{f: 46, x: 1700, y: 900}, {f: 76, x: 1680, y: 452}]} clicks={[CLICK]} show={46} />
    </AbsoluteFill>
  );
};
