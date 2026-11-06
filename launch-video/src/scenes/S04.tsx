import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Words, prog, E, F, useF, Cue} from './common';

// On the drop: "Introducing Marketing Dashboard". Words slide in from the left out of a blur, then keep gliding.
export const sfx: Cue[] = [{at: 0, s: 'impact', v: 0.8}, {at: 10, s: 'shimmer', v: 0.35}];
export const S04: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const flash = 1 - prog(f, 0, 16, E.snappy);
  const breathe = 1 + prog(f, 0, dur, E.glide) * 0.035;
  const white = {color: '#fff', textShadow: '0 2px 24px rgba(0,50,70,.3)'};
  return (
    <AbsoluteFill>
      <Ground kind="mesh" />
      <div style={{position: 'absolute', left: 0, width: 1920, top: 0, height: 1080, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: `scale(${breathe})`}}>
        <Words text="Introducing" at={4} size={58} drift={40} style={{fontFamily: F.display, fontWeight: 600, fontSize: 58, letterSpacing: '-0.02em', ...white, color: 'rgba(255,255,255,.88)', marginBottom: 6}} />
        <Words text="Marketing Dashboard" at={10} size={156} stagger={5} drift={40} style={{fontFamily: F.display, fontWeight: 750, fontSize: 156, letterSpacing: '-0.05em', lineHeight: 1.05, ...white}} />
      </div>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
    </AbsoluteFill>
  );
};
