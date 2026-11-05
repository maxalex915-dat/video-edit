import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Float, Cursor, Tip, prog, E, useF, Cue} from './common';
import {EmailScreen} from '../components/ui/Screens';

// Value: emails that land. The funnel fills, hover on Opened shows how many.
const HOVER = 80;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, {at: 20, s: 'swoosh_soft', v: 0.2}, {at: HOVER, s: 'pop_hi', v: 0.3}];
export const S09: React.FC = () => {
  const f = useF();
  const up = prog(f, 0, 24, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="topo" />
      <div style={{position: 'absolute', inset: 0, opacity: up, transform: `translateX(${(1 - up) * 240}px) rotate(${(1 - up) * 4}deg)`}}>
        <Float x={980} y={170} w={830} h={740} tilt="perspective(2200px) rotateY(-14deg) rotateX(4deg)" inner="scale(1.7) translate(-890px, -175px)"><EmailScreen fill={prog(f, 16, 50, E.snappy)} draw={prog(f, 12, 50, E.snappy)} /></Float>
      </div>
      <Headline on="grad" a="Know which emails" b="get opened." size={88} style={{left: 110, top: 380}} at={2} />
      <Tip x={1390} y={490} at={HOVER + 2}>{`${Math.round(1317 * prog(f, HOVER + 2, 18, E.snappy)).toLocaleString('en-US')} people opened it`}</Tip>
      <Cursor path={[{f: 52, x: 1600, y: 900}, {f: HOVER, x: 1380, y: 520}]} show={52} />
    </AbsoluteFill>
  );
};
