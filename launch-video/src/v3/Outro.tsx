import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {prog, spr, S, E, useF, Cue, lerp, C} from '../scenes/common';
import {BentoAnim, ORDER, land} from '../components/ui/BentoAnim';

// Close: Dat's bento, full screen, every tile alive (about 3 s of hold), then the centre gradient tile
// takes over the screen, shrinks into the loop, and the Archetype Group logo forms on white.
const HOLD_END = 168, EXPAND = 24, SOLID = 8, SHRINK = 22;
const T1 = HOLD_END + EXPAND, T2 = T1 + SOLID, T3 = T2 + SHRINK;
// final lockup (the official SVG), 900 px wide, centred
const LS = 900 / 2960, LX = 510, LY = 281;
const MARK = {x: LX + 2132.15 * LS, y: LY, w: (2967.17 - 2132.15) * LS, h: 861.5 * LS};
const LOOP_K = 835.02 / 2417.45; // loop svg units -> logo units
export const b21sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.45}, ...ORDER.map((i) => ({at: land(i) + 6, s: 'pop', v: 0.18})), {at: 70, s: 'shimmer', v: 0.3},
  {at: HOLD_END - 2, s: 'whoosh_long', v: 0.4}, {at: T2 - 2, s: 'swoosh', v: 0.45}, {at: T3 - 2, s: 'pop', v: 0.45}, {at: T3 + 6, s: 'shimmer', v: 0.4}];
const HERO = {x: 643 * 0.96, y: 404 * 0.96, w: 712 * 0.96, h: 381 * 0.96};
export const B21: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const pull = prog(f, 0, 150, E.inOut);
  const z = lerp(pull, 1.12, 1) * (1 + Math.sin(f / 60) * 0.004);
  const ex = prog(f, HOLD_END, EXPAND, E.inOut);
  const sh = prog(f, T2, SHRINK, E.inOut);
  // the gradient rectangle: hero tile -> full screen -> the loop's box
  const full = {x: 0, y: 0, w: 1920, h: 1080};
  const r1 = {x: lerp(ex, HERO.x, full.x), y: lerp(ex, HERO.y, full.y), w: lerp(ex, HERO.w, full.w), h: lerp(ex, HERO.h, full.h)};
  const rect = f < T2 ? r1 : {x: lerp(sh, 0, MARK.x), y: lerp(sh, 0, MARK.y), w: lerp(sh, 1920, MARK.w), h: lerp(sh, 1080, MARK.h)};
  const radius = f < T2 ? lerp(ex, 27, 0) : lerp(sh, 0, 120);
  const rectOpacity = 1 - prog(f, T3 - 8, 10);
  const loopIn = spr(f, T3 - 8, S.snap);
  const word = (at: number) => prog(f, at, 20, E.snappy);
  const wa = word(T3 + 4), wg = word(T3 + 10);
  const end = prog(f, T3, dur - T3, E.glide);
  return (
    <AbsoluteFill style={{background: '#eef1f3'}}>
      {f < T1 + 2 && (
        <div style={{position: 'absolute', left: 0, top: 0, width: 2000, height: 1125, transform: `translate(${(1920 - 2000 * 0.96 * z) / 2}px, ${(1080 - 1125 * 0.96 * z) / 2}px) scale(${0.96 * z * (1 - ex * 0.06)})`, transformOrigin: '0 0', filter: `blur(${ex * 6}px)`}}>
          <BentoAnim f={f} />
        </div>
      )}
      {f >= T1 && <AbsoluteFill style={{background: '#fff'}} />}
      {f >= HOLD_END && (
        <div style={{position: 'absolute', left: rect.x, top: rect.y, width: rect.w, height: rect.h, borderRadius: radius, overflow: 'hidden', opacity: rectOpacity,
          background: `linear-gradient(${135 + Math.sin(f / 20) * 10}deg, #7fbc42 0%, #00b9ef 45%, #70cbf3 100%)`}}>
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(60% 60% at ${50 + Math.sin(f / 15) * 20}% 40%, rgba(255,255,255,.35), transparent 70%)`}} />
        </div>
      )}
      {f >= T3 - 8 && (
        <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + end * 0.03})`, transformOrigin: '960px 540px'}}>
          <Img src={staticFile('logo_loop.svg')} style={{position: 'absolute', left: LX + (2132.15 + 9.25 * LOOP_K) * LS, top: LY + (-0.22 + 1.09 * LOOP_K) * LS, width: 2403 * LOOP_K * LS, height: 2496 * LOOP_K * LS, opacity: Math.min(1, loopIn), transform: `scale(${0.85 + Math.min(1.05, loopIn) * 0.15})`}} />
          <Img src={staticFile('logo_word_a.svg')} style={{position: 'absolute', left: LX, top: LY, width: 900, opacity: wa, filter: `blur(${(1 - wa) * 12}px)`, transform: `translateX(${(1 - wa) * -60}px)`}} />
          <Img src={staticFile('logo_word_g.svg')} style={{position: 'absolute', left: LX, top: LY, width: 900, opacity: wg, filter: `blur(${(1 - wg) * 12}px)`, transform: `translateX(${(1 - wg) * -60}px)`}} />
        </div>
      )}
    </AbsoluteFill>
  );
};
export {C, interpolate};
