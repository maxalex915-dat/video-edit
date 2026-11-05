import React from 'react';
import {AbsoluteFill} from 'remotion';
import {prog, E, useF, Cue, lerp} from './common';
import {BentoAnim, ORDER, land} from '../components/ui/BentoAnim';

// Close: Dat's bento, full screen. Every tile flies in and comes alive; slow pull-back; hold to the music's end.
export const sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.45}, ...ORDER.map((i) => ({at: land(i) + 6, s: 'pop', v: 0.18})), {at: 70, s: 'shimmer', v: 0.35}, {at: 150, s: 'success', v: 0.25}];
export const S18: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const pull = prog(f, 0, 150, E.inOut);
  const breathe = 1 + Math.sin(f / 60) * 0.004;
  const fadeOut = prog(f, dur - 18, 18, E.glide);
  return (
    <AbsoluteFill style={{background: '#eef1f3'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 2000, height: 1125, transform: `scale(${0.96 * lerp(pull, 1.12, 1) * breathe})`, transformOrigin: '0 0', marginLeft: lerp(pull, -112, 0), marginTop: lerp(pull, -60, 0)}}>
        <BentoAnim f={f} />
      </div>
      <AbsoluteFill style={{background: '#fff', opacity: fadeOut * 0}} />
    </AbsoluteFill>
  );
};
