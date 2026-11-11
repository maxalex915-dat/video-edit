import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, lerp} from '../theme/motion';
import {Mist, Words, Pop, Swish, Dots, BRAND, INK, GR, CY, SKY, MIST} from './Look';

// A frame-by-frame copy of the third reference (16.0 s to 20.2 s); only the colours are ours.
// 1) The list of problems builds at the left with a thin arrow running in from the edge.
// 2) Cut to a field of empty pill outlines (they pop in from the bottom row up) with the dot low in the middle.
//    The dot rises slowly, sways a touch right then left, fades a little, while the pills dissolve from the top down.
// 3) The dot drops back to the middle, a glass square grows round it and becomes "Simpler" (large, in the brand
//    colour, then ink); the card widens into a panel with a frame round it: "Everything in one place".
const CUT = 234; // the field appears (scene frame); "Simpler" lands 61 frames later, as in the reference
const PH = 95, PITCH = 126, ROWS = 7, RY0 = 165; // pill height, row spacing, rows, first row centre
const PILLS: [number, number, number, number][] = []; // x, centre y, w, row
for (let r = 0; r < ROWS; r++) {
  let x = -140 + ((r * 173) % 210);
  for (let k = 0; x < 2000; k++) {
    const q = Math.abs(Math.sin(r * 12.9898 + k * 78.233) * 43758.5453) % 1;
    const w = q < 0.22 ? PH : q < 0.6 ? 243 : 482;
    // the reference leaves a clearing round the dot in the middle rows
    if (!(r >= 2 && r <= 5 && x < 1150 && x + w > 800)) PILLS.push([x, RY0 + r * PITCH, w, r]);
    x += w + 38;
  }
}
// dot path, measured from the reference (frame after the cut, x, y)
const KH = [0, 3, 5, 7, 9, 13, 19, 21, 23, 25, 27, 29, 31, 33, 35, 39, 43, 45, 47, 49, 51, 53, 55, 57, 60];
const KX = [960, 960, 960, 960, 960, 960, 960, 962, 966, 970, 975, 983, 990, 993, 993, 988, 965, 945, 928, 922, 925, 935, 945, 955, 960];
const KY = [765, 690, 650, 626, 615, 594, 550, 530, 507, 475, 443, 420, 395, 380, 368, 356, 350, 347, 356, 410, 470, 497, 518, 530, 540];
const Glow: React.FC<{h: number}> = ({h}) => {
  const up = prog(h, 0, 80, E.inOut), side = prog(h, 20, 70, E.inOut);
  const t = h / 30;
  return (
    <AbsoluteFill style={{background: MIST, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -200, right: -200, bottom: -200, height: lerp(up, 560, 1000), background: `linear-gradient(0deg, ${SKY} 0%, rgba(112,203,243,.55) 45%, rgba(112,203,243,0) 100%)`, filter: 'blur(70px)', opacity: lerp(up, 0.7, 0.95)}} />
      <div style={{position: 'absolute', left: '50%', bottom: 0, width: lerp(up, 1300, 2400), height: lerp(up, 700, 1400), transform: `translate(-50%, 50%) translateX(${Math.sin(t * 0.8) * 30}px)`, borderRadius: '50%', background: `radial-gradient(closest-side, ${CY} 0%, rgba(0,185,239,.6) 45%, rgba(0,185,239,0) 100%)`, filter: 'blur(80px)', opacity: lerp(up, 0.8, 1)}} />
      <div style={{position: 'absolute', left: -400, bottom: -300, width: 1200, height: 1000, borderRadius: '50%', background: `radial-gradient(closest-side, ${GR} 0%, rgba(127,188,66,0) 100%)`, filter: 'blur(60px)', opacity: side * 0.85}} />
      <div style={{position: 'absolute', right: -400, bottom: -300, width: 1200, height: 1000, borderRadius: '50%', background: `radial-gradient(closest-side, ${SKY} 0%, rgba(112,203,243,0) 100%)`, filter: 'blur(60px)', opacity: side * 0.9}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 420, background: `linear-gradient(180deg, ${MIST} 30%, rgba(243,246,246,0))`}} />
      <Dots color="#0b6d86" o={0.1} />
    </AbsoluteFill>
  );
};
export const Consuming: React.FC<{dur: number}> = () => {
  const f = useF();
  // part 1: the list builds with the voice ("different providers", "different logins", "costing hundreds of dollars")
  const LIST: [string, number][] = [['Different providers', 26], ['Different logins', 82], ['Costing hundreds of dollars', 120]];
  const p1 = f < CUT;
  const arrow = prog(f, 4, 22, E.inOut);
  const out1 = prog(f, CUT - 8, 8, E.expoIn);
  const h = f - CUT;
  const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const dx = interpolate(h, KH, KX, cl), dy = interpolate(h, KH, KY, cl);
  const dotO = 1 - 0.4 * prog(h, 27, 6) * (1 - prog(h, 41, 6));
  const dotGone = prog(h, 58, 4);
  // glass card: a square grows round the dot, becomes the "Simpler" card, then widens into the panel
  const cw = interpolate(h, [45, 51, 57, 61, 63, 65, 67, 82], [110, 290, 460, 714, 836, 870, 928, 1090], {...cl, easing: E.inOut});
  const ch = interpolate(h, [45, 51, 57, 61, 67, 82], [110, 200, 250, 477, 540, 590], {...cl, easing: E.inOut});
  const cardO = prog(h, 45, 6);
  const cx = interpolate(h, [45, 57, 61], [dx, 960, 960], cl), cy = interpolate(h, [45, 57, 61], [dy, 540, 540], cl);
  const frame = prog(h, 68, 16, E.inOut); // the outer frame
  const grid = prog(h, 70, 18, E.inOut); // panels inside the card
  const ink = prog(h, 64, 10);
  const lift = lerp(prog(h, 0, 90, E.inOut), 0.5, 0.95);
  return (
    <AbsoluteFill>
      <Mist lift={h < 0 ? 0.35 : lift} />
      {h >= 0 && <Glow h={h} />}
      <Swish at={CUT - 4} /><Pop at={CUT + 61} v={0.24} /><Swish at={CUT + 66} k={1} v={0.12} />
      {p1 && (
        <AbsoluteFill style={{opacity: 1 - out1, filter: `blur(${out1 * 14}px)`, transform: `translateY(${-prog(f, 0, CUT, (q) => q) * 30}px) scale(${1 + out1 * 0.08})`}}>
          {LIST.map(([t, at], k) => {
            // how many items came after this one (0 = the current line); eased as each new item arrives
            const after = LIST.slice(k + 1).reduce((m, [, a2]) => m + prog(f, a2 - 4, 12, E.inOut), 0);
            const on = prog(f, at - 2, 10, E.snappy);
            const size = lerp(Math.min(1, after), 100, 56);
            return (
              <div key={t} style={{position: 'absolute', left: 520, top: 572 - after * 190 - size * 0.62, opacity: on * (after > 0 ? lerp(Math.min(1, after), 1, 0.16) : 1)}}>
                {after < 0.05 ? <Words parts={[[t]]} at={at} size={100} align="left" stagger={4} quiet={false} />
                  : <div style={{fontFamily: F.display, fontSize: size, fontWeight: 600, letterSpacing: '-0.035em', color: INK, whiteSpace: 'nowrap'}}>{t}</div>}
              </div>
            );
          })}
          <svg width="520" height="20" style={{position: 'absolute', left: 0, top: 562}}><path d={`M0 10 L${490 * arrow} 10`} stroke="rgba(16,36,42,.35)" strokeWidth={2} /><path d={`M${490 * arrow - 8} 4 L${490 * arrow} 10 L${490 * arrow - 8} 16`} fill="none" stroke="rgba(16,36,42,.35)" strokeWidth={2} opacity={arrow} /></svg>
        </AbsoluteFill>
      )}
      {h >= 0 && h < 60 && (
        <AbsoluteFill style={{transform: `scale(${1.04 - prog(h, 0, 60, (q) => q) * 0.04})`, transformOrigin: '960px 560px'}}>
          {PILLS.map(([x, y, w, r], i) => {
            const jit = (i * 37) % 5;
            const pin = prog(h, (ROWS - 1 - r) * 1.6 + jit * 0.6, 6, E.snappy); // pop in, bottom row first
            const fade = prog(h, r < 4 ? 10 + r * 3 + jit : 30 + (r - 4) * 5 + jit * 1.4, 12, E.inOut); // dissolve, top row first
            const o = pin * (1 - fade);
            if (o <= 0.01) return null;
            return <div key={i} style={{position: 'absolute', left: x, top: y - PH / 2, width: w, height: PH, borderRadius: 99, border: '2px solid rgba(255,255,255,.85)', background: 'rgba(255,255,255,.06)', boxShadow: '0 0 0 1px rgba(16,36,42,.035)', opacity: o * 0.85, filter: fade > 0.05 ? `blur(${fade * 6}px)` : undefined, transform: `scale(${0.7 + pin * 0.3})`}} />;
          })}
        </AbsoluteFill>
      )}
      {h >= 45 && (
        <>
          {frame > 0 && <div style={{position: 'absolute', left: 960 - lerp(frame, 1090, 1490) / 2, top: 540 - lerp(frame, 590, 870) / 2, width: lerp(frame, 1090, 1490), height: lerp(frame, 590, 870), borderRadius: 64, border: '1.5px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', opacity: frame}} />}
          <div style={{position: 'absolute', left: cx - cw / 2, top: cy - ch / 2, width: cw, height: ch, borderRadius: lerp(prog(h, 45, 20), 26, 44), background: 'linear-gradient(170deg, rgba(255,255,255,.3), rgba(255,255,255,.06))', backdropFilter: 'blur(26px)', WebkitBackdropFilter: 'blur(26px)', border: '1.5px solid rgba(255,255,255,.75)', boxShadow: '0 30px 80px -40px rgba(0,90,120,.25)', opacity: cardO, overflow: 'hidden'}}>
            {grid > 0 && (
              <div style={{position: 'absolute', inset: 16, opacity: grid}}>
                {([[0, 0, 205, 1], [220, 0, 838, 0.2], [220, 98, 267, 0.46], [502, 98, 267, 0.46], [784, 98, 274, 0.46], [220, 383, 838, 0.33]] as const).map(([x, y, w, hh], i) => (
                  <div key={i} style={{position: 'absolute', left: `${(x / 1058) * 100}%`, top: `${(y / 558) * 100}%`, width: `${(w / 1058) * 100}%`, height: i === 0 ? '100%' : i === 1 ? 78 : i === 5 ? 173 : 268, borderRadius: 26, background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.45)'}} />
                ))}
              </div>
            )}
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 540 - 60}}>
            {h < 96 ? <Words parts={[['Simpler', ink < 0.5]]} at={CUT + 61} size={104} color={INK} quiet /> : <div style={{position: 'absolute', left: 500, top: 14}}><Words parts={[['Everything in one place']]} at={CUT + 96} size={88} stagger={6} align="left" /></div>}
          </div>
        </>
      )}
      {h >= 0 && dotGone < 1 && <div style={{position: 'absolute', left: dx - 53, top: dy - 53, width: 106, height: 106, borderRadius: 99, background: BRAND, boxShadow: '0 12px 34px -8px rgba(0,150,200,.5)', opacity: dotO * (1 - dotGone)}} />}
    </AbsoluteFill>
  );
};
