import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S, lerp} from '../motion';
import {Mist, Words, Drift, Pop} from '../look';
import {F, INK, C0, C1, C2} from '../brand';
import {MARK} from './logoMark';

// REVEAL (scene library 6), on the music's drop. "Introducing" blurs in (gradient) and out; the logo mark spins in
// beside the product name and a band of brand colour sweeps once through the name's letters. Nothing else.
const OUT = 28, MARK_AT = 34, SWEEP = [44, 74] as const;
export const Introducing: React.FC<{dur: number; name: string}> = ({dur, name}) => {
  const f = useF();
  const m = spr(f, MARK_AT, S.pop);
  const nameIn = prog(f, MARK_AT + 2, 18, E.snappy);
  const sw = prog(f, SWEEP[0], SWEEP[1] - SWEEP[0], E.inOut);
  const band = lerp(sw, -40, 140); // band centre, % across the name
  const size = 116, markW = 128;
  return (
    <AbsoluteFill>
      <Mist lift={0.2} />
      <Pop at={MARK_AT + 1} v={0.26} />
      <Drift dur={dur} z={0.05}>
        {f < OUT + 10 && (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Words parts={[['Introducing', true]]} at={2} size={110} out={OUT} />
          </div>
        )}
        {f >= MARK_AT - 1 && (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 34}}>
            <svg width={markW} height={markW} viewBox={`0 0 ${MARK.w} ${MARK.h}`} style={{transform: `rotate(${(1 - Math.min(1, m)) * -40}deg) scale(${Math.min(1.06, m)})`, opacity: Math.min(1, m * 1.5)}}>
              {MARK.paths.map((d, i) => <path key={i} d={d} fill={MARK.fills[i]} />)}
            </svg>
            <div style={{fontFamily: F.display, fontSize: size, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.12, whiteSpace: 'nowrap', opacity: nameIn, filter: `blur(${(1 - nameIn) * 14}px)`, transform: `translateX(${(1 - nameIn) * -size * 0.6}px)`,
              backgroundImage: `linear-gradient(100deg, ${INK} ${band - 40}%, ${C0} ${band - 18}%, ${C1} ${band}%, ${C2} ${band + 18}%, ${INK} ${band + 40}%)`, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'}}>
              {name}
            </div>
          </div>
        )}
      </Drift>
    </AbsoluteFill>
  );
};
