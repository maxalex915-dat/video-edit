import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S} from '../theme/motion';
import {BrandField, Words, Pop, Swish} from './Look';

// "But wait, there's more." A short beat between the saving and the feature montage, on the fluid brand colour.
// "But wait," lands first; "there's more." follows larger, and the camera leans in on it.
export const More: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const lean = prog(f, 0, dur, (q) => q);
  const up = prog(f, 20, 14, E.inOut);
  const big = spr(f, 22, S.pop);
  return (
    <AbsoluteFill>
      <BrandField seed={7} />
      <Swish at={18} k={1} v={0.12} /><Pop at={24} v={0.24} />
      <AbsoluteFill style={{transform: `scale(${1 + lean * 0.06})`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 400 - up * 90, transform: `scale(${1 - up * 0.35})`}}>
          <Words parts={[['But wait,']]} at={2} size={150} color="#fff" stagger={5} />
        </div>
        {f >= 20 && (
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, transform: `scale(${0.9 + Math.min(1.04, big) * 0.1})`}}>
            <Words parts={[["there's more."]]} at={22} size={190} color="#fff" stagger={6} quiet />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
