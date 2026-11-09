import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, prog, E, Cue} from './util';

// B20 78.4 to 80.6: the contrast line, like the reference's "They close tickets / We eliminate them".
export const b20sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}, {at: 32, s: 'swoosh', v: 0.35}];
export const B20: React.FC = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Ground kind={f < 32 ? 'glow' : 'field'} />
      {f < 32 && <div style={{opacity: 1 - prog(f, 26, 6)}}><Line w={words('Others juggle spreadsheets.')} at={0} stagger={5} size={84} /></div>}
      {f >= 32 && <Line w={[['We'], ['connect'], ['everything.']]} at={32} stagger={5} size={96} />}
    </AbsoluteFill>
  );
};
