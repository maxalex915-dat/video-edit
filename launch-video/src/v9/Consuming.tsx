import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, lerp} from '../theme/motion';
import {Mist, Words, Pop, Swish, BRAND, INK} from './Look';

// Copied from the third reference (0:15 to 0:19.5): size, place and motion; only the colours are ours.
// 1) "Consuming time" at the left, a thin arrow running in from the edge, the earlier problems fading above.
// 2) The camera pulls back over a field of empty pill outlines, colour rising under them; a bright dot floats.
// 3) The pills melt away, the dot settles in the middle, a glass square forms round it and becomes "Simpler",
//    which opens into a larger frosted panel: "Everything in one place".
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
// The dot wanders slowly across the field on one smooth curve (right, down, left, back) and settles in the middle.
const BH = 183; // black hole starts
const WP: [number, number][] = [[960, 580], [960, 580], [1420, 450], [1000, 810], [500, 600], [700, 380], [960, 560], [960, 560]];
const dotAt = (g: number): [number, number] => {
  const u = E.inOut(prog(g, 44, BH - 44 - 6, (q) => q)) * (WP.length - 3);
  const i = Math.min(WP.length - 4, Math.floor(u)), t = u - i;
  const [p0, p1, p2, p3] = [WP[i], WP[i + 1], WP[i + 2], WP[i + 3]];
  const cr = (k: 0 | 1) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t * t * t);
  return [cr(0), cr(1)];
};
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
  const [dx, dy] = dotAt(g);
  // black hole: each block's pull starts by its distance from the middle (closest first)
  const pullAt = (d0: number) => BH + Math.min(18, d0 / 70);
  const PULL = 26;
  const swallowed = PILLS.reduce((m, [x, y, w]) => m + prog(g, pullAt(Math.hypot(x + w / 2 - 960, y - 560)) + PULL - 4, 4), 0) / PILLS.length;
  const grow = E.inOut(Math.min(1, swallowed)); // the card in the middle grows as the blocks fall in
  const dotIn = prog(g, 44, 8, E.snappy), dotOut = prog(g, BH + 34, 8, E.expoIn);
  // part 3: glass square, card ("simpler"), panel ("everything in one place")
  const sq = Math.min(1, grow * 3);
  const card = prog(g, BH + 40, 12, E.snappy);
  const open = prog(g, BH + 80, 26, E.inOut);
  const cw = lerp(card, lerp(grow, 96, 240), 640), ch = lerp(card, lerp(grow, 96, 156), 330);
  const W2 = lerp(open, cw, 1180), H2 = lerp(open, ch, 560);
  const ink = prog(g, BH + 56, 16);
  return (
    <AbsoluteFill>
      <Mist lift={g < 44 ? 0.35 : lerp(prog(g, 44, 56, E.inOut), 0.45, 0.95)} />
      <Swish at={S + 44} />{[74, 112, 150].map((t, i) => <Swish key={t} at={S + t} k={i} v={0.05} />)}<Swish at={S + BH - 6} k={1} v={0.18} />{[8, 14, 20, 26, 32].map((t, i) => <Pop key={t} at={S + BH + t} k={i} v={0.08 + i * 0.03} />)}<Pop at={S + BH + 40} k={1} v={0.22} /><Swish at={S + BH + 80} />
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
            // like a stone through sand: blocks in the dot's row slide left or right out of its way, same shape
            const row = Math.max(0, 1 - Math.abs(pcy - fy) / 95);
            const gapX = Math.abs(pcx - fx) - w / 2; // edge distance along the row
            const near = Math.max(0, 1 - Math.max(0, gapX) / 420);
            const part = Math.sign(pcx - fx || 1) * 120 * row * row * (3 - 2 * row) * near * near * (1 - prog(g, BH - 20, 20));
            // black hole: pulled in on a tightening spiral, faster and faster, stretched along the way, swallowed
            const s = prog(g, pullAt(d0), PULL, (q) => q * q * (0.4 + 0.6 * q));
            if (a <= 0.01 || s >= 0.999) return null;
            const ang0 = Math.atan2(pcy - 560, pcx - 960);
            const r0 = Math.hypot(pcx - 960, pcy - 560);
            const ang = ang0 + Math.pow(s, 1.4) * 5.2; // a full turn and more: a vortex
            const rr = r0 * (1 - s);
            const ox = 960 + Math.cos(ang) * rr - pcx, oy = 560 + Math.sin(ang) * rr - pcy;
            const tilt = (ang - ang0) * 57.3 * 0.6; // turns gently with the spin, keeps its shape // turns to run along the spiral
            return <div key={i} style={{position: 'absolute', left: x, top: y - 30, width: w, height: 60, borderRadius: 99, border: '2px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.14)', boxShadow: 'inset 0 0 16px rgba(255,255,255,.4)', opacity: a * (1 - Math.pow(s, 4)), transform: `translate(${part + ox}px, ${oy}px) rotate(${s > 0 ? tilt : 0}deg) scale(${(0.9 + a * 0.1) * (1 - s * 0.88)})`}} />;
          })}
        </AbsoluteFill>
      )}
      {g >= 44 && g < BH + 44 && <div style={{position: 'absolute', left: dx - 45, top: dy - 45, width: 90, height: 90, borderRadius: 99, background: BRAND, boxShadow: '0 10px 30px -6px rgba(0,150,200,.55)', opacity: dotIn * (1 - dotOut), transform: `scale(${(0.6 + dotIn * 0.4) * (1 - dotOut * 0.5)})`}} />}
      {g >= BH && (
        <>
          {open > 0 && <div style={{position: 'absolute', left: 960 - lerp(open, W2, 1320) / 2, top: 560 - lerp(open, H2, 660) / 2, width: lerp(open, W2, 1320), height: lerp(open, H2, 660), borderRadius: 40, border: '2px solid rgba(255,255,255,.9)', background: 'rgba(255,255,255,.12)', opacity: open}} />}
          <div style={{position: 'absolute', left: 960 - W2 / 2, top: 560 - H2 / 2, width: W2, height: H2, borderRadius: lerp(card, 22, 30), background: 'linear-gradient(160deg, rgba(255,255,255,.6), rgba(255,255,255,.25))', border: '2px solid rgba(255,255,255,.95)', boxShadow: '0 30px 70px -30px rgba(0,90,120,.35)', opacity: sq, transform: `scale(${0.85 + sq * 0.15})`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: '7%', right: '7%', bottom: '9%', height: '36%', display: 'flex', gap: 18, opacity: open}}>
              {[0, 1, 2].map((i) => <div key={i} style={{flex: 1, borderRadius: 18, background: 'rgba(255,255,255,.4)', border: '1.5px solid rgba(255,255,255,.9)', boxShadow: `inset 0 -50px 60px -24px ${['#7fbc42', '#00b9ef', '#70cbf3'][i]}66`}} />)}
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 560 - lerp(open, 0, 150) - 45}}>
            {g < BH + 84 ? <Words parts={[['Simpler', ink < 0.5]]} at={S + BH + 46} size={64} color={INK} out={S + BH + 78} /> : <Words parts={[['Everything in one place']]} at={S + BH + 88} size={68} />}
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
