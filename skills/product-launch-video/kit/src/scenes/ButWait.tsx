import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S} from '../motion';
import {FluidField as BrandField, Words, Pop, Swish} from '../look';

// "But wait, there's more." A short beat between the saving and the feature montage, on the fluid brand colour.
// "But wait," lands first; "there's more." follows larger, and the camera leans in on it.
// Retime with `second` = the frame the voice says the second phrase (measure it with scripts/vo_words.py).
export const ButWait: React.FC<{dur: number; first?: string; second?: string; at2?: number}> = ({dur, first = 'But wait,', second = "there's more.", at2 = 40}) => {
  const f = useF();
  const lean = prog(f, 0, dur, (q) => q);
  const up = prog(f, at2 - 6, 14, E.inOut);
  const big = spr(f, at2, S.pop);
  return (
    <AbsoluteFill>
      <BrandField seed={7} />
      <Swish at={at2 - 6} k={1} v={0.12} /><Pop at={at2 + 1} v={0.24} />
      <AbsoluteFill style={{transform: `scale(${1 + lean * 0.06})`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 400 - up * 90, transform: `scale(${1 - up * 0.35})`}}>
          <Words parts={[[first]]} at={2} size={150} color="#fff" stagger={5} />
        </div>
        {f >= at2 - 2 && (
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, transform: `scale(${0.9 + Math.min(1.04, big) * 0.1})`}}>
            <Words parts={[[second]]} at={at2} size={190} color="#fff" stagger={6} quiet />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
