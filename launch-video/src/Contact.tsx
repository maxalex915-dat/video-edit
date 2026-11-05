import React from 'react';
import {AbsoluteFill, Freeze} from 'remotion';
import {Launch} from './Launch';
import {TIMING} from './timeline';

// Review sheet: frozen frames of the film, two per scene (or a custom list), no audio.
export const Contact: React.FC<{frames?: number[]; cols?: number}> = ({frames, cols = 6}) => {
  const list = frames ?? TIMING.flatMap((t) => [t.from + 32, t.from + Math.min(t.dur - 20, 100)]);
  const w = 1920 / 4, h = 1080 / 4;
  return (
    <AbsoluteFill style={{background: '#222'}}>
      {list.map((fr, i) => (
        <div key={i} style={{position: 'absolute', left: (i % cols) * (w + 8), top: Math.floor(i / cols) * (h + 8), width: w, height: h, overflow: 'hidden'}}>
          <div style={{width: 1920, height: 1080, transform: 'scale(.25)', transformOrigin: '0 0', position: 'relative'}}><Freeze frame={fr}><Launch music={false} sfx={false} /></Freeze></div>
          <div style={{position: 'absolute', left: 4, top: 2, color: '#fff', font: '12px monospace', background: 'rgba(0,0,0,.5)'}}>{fr}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
