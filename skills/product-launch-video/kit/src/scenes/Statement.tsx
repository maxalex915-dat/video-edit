import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, lerp} from '../motion';
import {FluidField, Words, Drift} from '../look';

// OPENER on the fluid brand colour: one huge word (the statistic), which then shrinks up into a sentence.
// e.g. big = 'Millions', rest = 'of marketing teams'. White text only on the fluid field.
const Center: React.FC<{y?: number; children: React.ReactNode}> = ({y = 0, children}) => (
  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${y}px)`}}>{children}</div>
);
export const Statement: React.FC<{dur: number; big?: string; rest?: string; bigAt?: number; restAt?: number}> = ({dur, big = 'Millions', rest = 'of teams', bigAt = 12, restAt = 31}) => {
  const f = useF();
  const k = prog(f, restAt - 3, 14, E.inOut);
  return (
    <AbsoluteFill>
      <FluidField seed={0} />
      <Drift dur={dur} z={0.06}>
        <Center y={lerp(k, 0, -40)}><div style={{transform: `scale(${lerp(k, 1, 0.55)})`}}><Words parts={[[big]]} at={bigAt} size={230} color="#fff" /></div></Center>
        <Center y={70}><Words parts={[[rest]]} at={restAt} size={92} color="#fff" weight={500} stagger={7} /></Center>
      </Drift>
    </AbsoluteFill>
  );
};
