import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, prog, E, F, useF, Cue} from './common';
import {LoginField} from '../components/ui/Screens';
import {Platform} from '../components/ui/Primitives';

// Problem: seven platforms, seven logins. Cards land one per half-beat, a sign-in fails.
const PS: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
const IN = (i: number) => 10 + i * 8;
const CLICK = 92;
export const sfx: Cue[] = [...PS.map((_, i) => ({at: IN(i), s: 'pop_hi', v: 0.22})), {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 4, s: 'tick', v: 0.3}];
export const S01: React.FC = () => {
  const f = useF();
  const err = f >= CLICK + 3;
  const shake = err ? Math.sin((f - CLICK) * 1.6) * 14 * Math.exp(-(f - CLICK) / 8) : 0;
  return (
    <AbsoluteFill>
      <Ground kind="fluted" />
      <Headline on="grad" a="Seven platforms." b="Seven logins. Every week." size={96} align="center" style={{left: 0, width: 1920, top: 90}} at={2} />
      <div style={{position: 'absolute', left: 0, top: 480, width: 1920, height: 600, perspective: 1800}}>
        {PS.map((p, i) => {
          const k = i - 3, z = -Math.abs(k) * 160, q = prog(f, IN(i), 16, E.snappy);
          return (
            <div key={p} style={{position: 'absolute', left: 810 + k * 300, top: 40 + Math.abs(k) * 22, opacity: Math.min(1, q * 1.5) * (1 - Math.abs(k) * 0.06), filter: `blur(${Math.abs(k) * 0.9}px)`,
              transform: `translateZ(${z}px) translateY(${(1 - q) * 160}px) rotateY(${-k * 9}deg) rotateX(${(1 - q) * 30}deg) scale(1.35) translateX(${k === 0 ? shake : 0}px)`}}>
              <LoginField p={p} error={k === 0 && err} />
            </div>
          );
        })}
      </div>
      <Ripple x={892} y={688} at={CLICK} />
      <Cursor path={[{f: 60, x: 1400, y: 1010}, {f: 88, x: 880, y: 674}]} clicks={[CLICK]} show={60} />
      {err && <div style={{position: 'absolute', left: 795, top: 760, background: '#ab3527', color: '#fff', borderRadius: 99, padding: '8px 18px', fontFamily: F.text, fontSize: 18, fontWeight: 650, opacity: prog(f, CLICK + 3, 6), transform: `translateY(${(1 - prog(f, CLICK + 3, 10, E.snappy)) * -10}px)`}}>Wrong password. Try again.</div>}
    </AbsoluteFill>
  );
};
