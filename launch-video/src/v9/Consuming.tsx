import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, lerp} from '../theme/motion';
import {Mist, Words, Pop, Swish, BRAND, INK} from './Look';

// Copied from the third reference (0:15 to 0:19.5): size, place and motion; only the colours are ours.
// 1) "Consuming time" at the left, a thin arrow running in from the edge, the earlier problems fading above.
// 2) The camera pulls back over a field of empty pill outlines, colour rising under them; a bright dot floats.
// 3) The pills melt away, the dot settles in the middle, a glass square forms round it and becomes "Simpler",
//    which opens into a larger frosted panel: "Everything in one place".
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ROWS = 9, RY0 = 300, RGAP = 92;
const PILLS: [number, number, number][] = []; // x, y, w
for (let r = 0; r < ROWS; r++) {
  let x = -60 + ((r * 97) % 140);
  for (let k = 0; x < 2000; k++) {
    const w = 90 + (Math.abs(Math.sin(r * 7.3 + k * 3.1)) * 330) | 0;
    PILLS.push([x, RY0 + r * RGAP, w]);
    x += w + 22 + ((k * 13) % 30);
  }
}
// the dot wanders far and lost, left, right, up and down, before it finds the middle
const DOT: [number, number, number][] = [[44, 960, 620], [54, 560, 500], [64, 1380, 780], [74, 700, 880], [84, 1520, 440], [94, 820, 390], [104, 1240, 720], [112, 960, 560]];
export const Consuming: React.FC<{dur: number}> = () => {
  const f = useF();
  // part 1: the list builds with the voice ("different providers", "different logins", "costing hundreds of dollars")
  const LIST: [string, number][] = [['Different providers', 45], ['Different logins', 82], ['Costing hundreds of dollars', 120]];
  const S = 164; // parts 2 and 3 start after the list (leaves a breath after the list's line)
  const g = f - S;
  const p1 = f < S + 10;
  const arrow = prog(f, 34, 12, E.snappy);
  const out1 = prog(f, S - 4, 10, E.expoIn);
  // part 2: the field
  const zoom = prog(g, 44, 40, E.inOut);
  const fs = lerp(zoom, 1.7, 1);
  const dx = interpolate(g, DOT.map((d) => d[0]), DOT.map((d) => d[1]), {...cl, easing: E.inOut});
  const dy = interpolate(g, DOT.map((d) => d[0]), DOT.map((d) => d[2]), {...cl, easing: E.inOut});
  const dotIn = prog(g, 44, 8, E.snappy), dotOut = prog(g, 132, 7, E.expoIn);
  // part 3: glass square, card ("simpler"), panel ("everything in one place")
  const sq = prog(g, 130, 8, E.snappy);
  const card = prog(g, 135, 10, E.snappy);
  const open = prog(g, 166, 26, E.inOut);
  const cw = lerp(card, 230, 640), ch = lerp(card, 150, 330);
  const W2 = lerp(open, cw, 1180), H2 = lerp(open, ch, 560);
  const ink = prog(g, 146, 16);
  return (
    <AbsoluteFill>
      <Mist lift={g < 44 ? 0.35 : lerp(prog(g, 44, 56, E.inOut), 0.45, 0.95)} />
      <Swish at={S + 44} />{[54, 64, 74, 84, 94, 104].map((t, i) => <Swish key={t} at={S + t - 6} k={i} v={0.06} />)}<Swish at={S + 104} k={1} v={0.16} /><Pop at={S + 130} v={0.24} /><Pop at={S + 136} k={1} v={0.2} /><Swish at={S + 166} />
      {p1 && (
        <AbsoluteFill style={{opacity: 1 - out1, filter: `blur(${out1 * 14}px)`, transform: `translateY(${-prog(f, 0, S, (q) => q) * 30}px) scale(${1 + out1 * 0.08})`}}>
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
      {g >= 42 && (
        <AbsoluteFill style={{transform: `scale(${fs})`, transformOrigin: '960px 560px', opacity: prog(g, 42, 8)}}>
          {PILLS.map(([x, y, w], i) => {
            const pcx = x + w / 2, pcy = y;
            const d0 = Math.hypot(pcx - 960, pcy - 560);
            const a = prog(g, 44 + d0 / 60, 10, E.snappy);
            // the dot in the field's own coordinates (the field is scaled about 960, 560)
            const fx = (dx - 960) / fs + 960, fy = (dy - 560) / fs + 560;
            const dd = Math.hypot(pcx - fx, pcy - fy);
            const room = g < 112 ? Math.max(0, Math.min(1, (dd - 70) / 190)) : 1; // 0 right next to the dot
            const ux = (pcx - fx) / (dd || 1), uy = (pcy - fy) / (dd || 1);
            // black hole: closest blocks first, they spiral into the dot
            const s = prog(g, 106 + Math.min(10, d0 / 100), 14, (q) => q * q * q);
            if (a <= 0.01 || s >= 0.999) return null;
            const ang = Math.atan2(pcy - fy, pcx - fx) + s * 2.2;
            const rr = Math.hypot(pcx - fx, pcy - fy) * (1 - s);
            const sx = fx + Math.cos(ang) * rr - pcx, sy = fy + Math.sin(ang) * rr - pcy;
            const push = (1 - room) * 46;
            return <div key={i} style={{position: 'absolute', left: x, top: y - 30, width: w, height: 60, borderRadius: 99, border: '2px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.14)', boxShadow: 'inset 0 0 16px rgba(255,255,255,.4)', opacity: a * (1 - s * 0.6), transform: `translate(${ux * push + sx}px, ${uy * push + sy}px) scale(${(0.9 + a * 0.1) * (0.2 + 0.8 * room) * (1 - s * 0.85)}) rotate(${s * 160}deg)`}} />;
          })}
        </AbsoluteFill>
      )}
      {g >= 44 && g < 140 && <div style={{position: 'absolute', left: dx - 45, top: dy - 45, width: 90, height: 90, borderRadius: 99, background: BRAND, boxShadow: '0 10px 30px -6px rgba(0,150,200,.55)', opacity: dotIn * (1 - dotOut), transform: `scale(${(0.6 + dotIn * 0.4) * (1 - dotOut * 0.5)})`}} />}
      {g >= 130 && (
        <>
          {open > 0 && <div style={{position: 'absolute', left: 960 - lerp(open, W2, 1320) / 2, top: 560 - lerp(open, H2, 660) / 2, width: lerp(open, W2, 1320), height: lerp(open, H2, 660), borderRadius: 40, border: '2px solid rgba(255,255,255,.9)', background: 'rgba(255,255,255,.12)', opacity: open}} />}
          <div style={{position: 'absolute', left: 960 - W2 / 2, top: 560 - H2 / 2, width: W2, height: H2, borderRadius: lerp(card, 22, 30), background: 'linear-gradient(160deg, rgba(255,255,255,.6), rgba(255,255,255,.25))', border: '2px solid rgba(255,255,255,.95)', boxShadow: '0 30px 70px -30px rgba(0,90,120,.35)', opacity: sq, transform: `scale(${0.85 + sq * 0.15})`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: '7%', right: '7%', bottom: '9%', height: '36%', display: 'flex', gap: 18, opacity: open}}>
              {[0, 1, 2].map((i) => <div key={i} style={{flex: 1, borderRadius: 18, background: 'rgba(255,255,255,.4)', border: '1.5px solid rgba(255,255,255,.9)', boxShadow: `inset 0 -50px 60px -24px ${['#7fbc42', '#00b9ef', '#70cbf3'][i]}66`}} />)}
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 560 - lerp(open, 0, 150) - 45}}>
            {g < 170 ? <Words parts={[['Simpler', ink < 0.5]]} at={S + 138} size={64} color={INK} out={S + 165} /> : <Words parts={[['Everything in one place']]} at={S + 172} size={68} />}
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
