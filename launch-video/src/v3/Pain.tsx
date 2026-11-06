import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, Typewriter, ZoomThrough, Cursor, Ripple, prog, spr, S, E, C, F, Cue} from './util';
import {LoginField} from '../components/ui/Screens';
import {Platform} from '../components/ui/Primitives';
import {S02} from '../scenes/S02';
import {S03} from '../scenes/S03';

const TOP: React.CSSProperties = {top: 40, bottom: 'auto', height: 200};

// P1 0.0 to 3.4: seven sign-in cards rise in 3D; switch account, then the password fails.
const PS: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
const OPEN = 40, PICK = 58, SIGN = 76;
export const p1sfx: Cue[] = [...PS.map((_, i) => ({at: 8 + i * 4, s: 'pop_hi', v: 0.18})), ...Array.from({length: 12}).map((_, i) => ({at: 4 + i * 3, s: `key${i % 4}`, v: 0.18})), {at: OPEN, s: 'click', v: 0.4}, {at: PICK, s: 'click', v: 0.4}, {at: SIGN, s: 'click', v: 0.5}, {at: SIGN + 4, s: 'tick', v: 0.3}];
export const P1: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const err = f >= SIGN + 3;
  const shake = err ? Math.sin((f - SIGN) * 1.6) * 14 * Math.exp(-(f - SIGN) / 8) : 0;
  const menu = f >= OPEN && f < PICK + 4 ? spr(f, OPEN, S.snap) : 0;
  const drift = f * 0.35;
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Typewriter ops={[[4, 'type', 'Seven platforms. Seven logins.']]} size={64} cps={24} style={TOP} />
      <div style={{position: 'absolute', left: 0, top: 380, width: 1920, height: 700, perspective: 1800, transform: `translateY(${-drift}px)`}}>
        {PS.map((p, i) => {
          const k = i - 3, z = -Math.abs(k) * 170, q = prog(f, 6 + i * 4, 22, E.snappy);
          return (
            <div key={p} style={{position: 'absolute', left: 810 + k * 300, top: 70 + Math.abs(k) * 24, opacity: Math.min(1, q * 1.5), filter: `blur(${Math.abs(k) * 0.9}px)`,
              transform: `translateZ(${z}px) translateY(${(1 - q) * 500}px) rotateY(${-k * 10}deg) rotateX(${(1 - q) * 25}deg) scale(1.35) translateX(${k === 0 ? shake : 0}px)`}}>
              <LoginField p={p} error={k === 0 && err} />
            </div>
          );
        })}
        {menu > 0 && (
          <div style={{position: 'absolute', left: 1010, top: 150, width: 330, background: '#fff', borderRadius: 16, padding: 10, fontFamily: F.text, boxShadow: '0 30px 60px -18px rgba(5,60,63,.45)', border: `1px solid ${C.rule}`, opacity: Math.min(1, menu), transform: `translateY(${(1 - Math.min(1, menu)) * -12}px)`, zIndex: 5}}>
            <div style={{fontSize: 14, color: C.ink3, padding: '6px 10px'}}>Switch account</div>
            {['Archetype Group', 'archetype industry', 'archetype reality'].map((a, i) => (
              <div key={a} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, fontSize: 18, background: i === 1 && f >= PICK - 6 ? C.wash : 'none', color: C.ink}}>
                <span style={{width: 28, height: 28, borderRadius: 99, background: ['#055e63', '#7fbd42', '#509cd5'][i], color: '#fff', fontSize: 12, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{['AG', 'AI', 'AR'][i]}</span>{a}
              </div>
            ))}
          </div>
        )}
        <Ripple x={1040} y={150} at={OPEN} />
        <Ripple x={1120} y={252} at={PICK} />
        <Ripple x={892} y={258} at={SIGN} />
        <Cursor path={[{f: 20, x: 1400, y: 640}, {f: OPEN - 3, x: 1030, y: 140}, {f: PICK - 3, x: 1110, y: 242}, {f: SIGN - 3, x: 880, y: 246}]} clicks={[OPEN, PICK, SIGN]} show={20} />
        {err && <div style={{position: 'absolute', left: 790, top: 520, background: '#ab3527', color: '#fff', borderRadius: 99, padding: '9px 20px', fontFamily: F.text, fontSize: 20, fontWeight: 650, opacity: prog(f, SIGN + 3, 6)}}>Wrong password. Try again.</div>}
      </div>
    </AbsoluteFill>
  );
};

// P2 3.4 to 7.9: spreadsheet windows pile up; switch tab, copy, paste... a paste lands in the wrong cell. Dive into it.
export const p2sfx: Cue[] = [...Array.from({length: 10}).map((_, i) => ({at: 2 + i * 3, s: `key${i % 4}`, v: 0.18})), {at: 4, s: 'pop_hi', v: 0.2}, {at: 10, s: 'pop_hi', v: 0.2}, {at: 16, s: 'pop_hi', v: 0.2}, {at: 122, s: 'whoosh_long', v: 0.45}];
export const P2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <ZoomThrough at={dur - 13} dur={13} ox={712} oy={582} max={80}>
        <Ground kind="glow" />
        <AbsoluteFill style={{transform: 'translate(-360px, 150px) scale(.88)'}}><S02 dur={dur} bare /></AbsoluteFill>
        <Typewriter ops={[[2, 'type', 'Copy. Switch tab. Paste. Again.']]} size={60} cps={22} style={TOP} />
      </ZoomThrough>
    </AbsoluteFill>
  );
};

// P3 (21.0 to 24.0): each tool shows its own slice; the links between them break.
export const p3sfx: Cue[] = [{at: 2, s: 'swoosh_soft', v: 0.2}, {at: 66, s: 'tick', v: 0.3}];
export const P3: React.FC<{dur: number}> = ({dur}) => (
  <AbsoluteFill>
    <Ground kind="pearl" />
    <AbsoluteFill style={{transform: 'translate(-300px, 100px) scale(1.02)'}}><S03 dur={200} bare /></AbsoluteFill>
    <Line w={words('Each tool shows only *its *slice.')} at={2} stagger={5} size={64} style={TOP} />
  </AbsoluteFill>
);
