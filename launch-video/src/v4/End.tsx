import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {prog, spr, S, E, useF, Cue, lerp} from '../v3/util';
import {BentoAnim, ORDER, land} from './BentoV4';
import {LOOP_PATHS} from '../v9/loopPaths';

// Close: the bento builds in random order while the camera pulls back (corners blurred, a gust of wind),
// the centre card lands last. Hold. The centre card fills the screen; that colour is the loop, seen up close;
// the loop pulls back to its normal size and "archetype group" forms around it.
const LAST = land(7) + 26;          // all cards in
const HOLD = LAST + 96;             // about 3 s of hold
const EXPAND = 22, CROSS = 8, SHRINK = 30;
const T1 = HOLD + EXPAND, T2 = T1 + CROSS, T3 = T2 + SHRINK;
const LS = 900 / 2960, LX = 510, LY = 281;
const LOOP_K = 835.02 / 2417.45;
const LOOP_W = 2403 * LOOP_K * LS, LOOP_H = 2496 * LOOP_K * LS;
const LOOP_X = LX + (2132.15 + 9.25 * LOOP_K) * LS, LOOP_Y = LY + (-0.22 + 1.09 * LOOP_K) * LS;
const OX = 0.6095, OY = 0.1066; // a point inside the thickest part of the ribbon
export const endsfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.5}, {at: 30, s: 'swoosh_soft', v: 0.3}, ...ORDER.map((i) => ({at: land(i) + 4, s: 'pop', v: 0.16})), {at: LAST - 6, s: 'shimmer', v: 0.35},
  {at: HOLD - 2, s: 'whoosh_long', v: 0.4}, {at: T2, s: 'swoosh', v: 0.45}, {at: T3 - 4, s: 'pop', v: 0.4}, {at: T3 + 4, s: 'shimmer', v: 0.4}];
const HERO = {x: 643 * 0.96, y: 404 * 0.96, w: 712 * 0.96, h: 381 * 0.96};
export const End: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const pull = prog(f, 0, LAST, E.inOut);
  const z = lerp(pull, 1.7, 1) * (1 + Math.sin(f / 60) * 0.003);
  const speed = Math.sin(Math.min(1, f / LAST) * Math.PI); // fastest mid pull
  const ex = prog(f, HOLD, EXPAND, E.inOut);
  const r = {x: lerp(ex, HERO.x, 0), y: lerp(ex, HERO.y, 0), w: lerp(ex, HERO.w, 1920), h: lerp(ex, HERO.h, 1080)};
  // the loop: huge (its ribbon fills the frame), then back to its real size
  const sh = prog(f, T2, SHRINK, E.inOut);
  const scale = Math.pow(60, 1 - sh);
  const ox = LOOP_X + OX * LOOP_W, oy = LOOP_Y + OY * LOOP_H;
  const loopVis = f >= T1;
  // loop transform in screen space: viewBox units -> pixels, scaled about the ribbon point (OX, OY), drifting to place
  const k0 = LOOP_W / 2403;
  const gs = k0 * scale;
  const ax = LOOP_X + OX * LOOP_W, ay = LOOP_Y + OY * LOOP_H; // anchor in screen space at rest
  const sx = ax + (960 - ax) * (1 - sh), sy = ay + (540 - ay) * (1 - sh); // where the anchor sits now
  const gx = sx - OX * 2403 * gs, gy = sy - OY * 2496 * gs;
  const real = prog(f, T3 - 6, 10);
  const wa = prog(f, T3 + 2, 20, E.snappy), wg = prog(f, T3 + 8, 20, E.snappy);
  const end = prog(f, T3, dur - T3, E.glide);
  const mask = `radial-gradient(70% 70% at 50% 50%, transparent 55%, black 100%)`;
  return (
    <AbsoluteFill style={{background: '#eef1f3'}}>
      {f < T1 + 1 && (
        <AbsoluteFill>
          <div style={{position: 'absolute', left: 0, top: 0, width: 2000, height: 1125, transform: `translate(${(1920 - 2000 * 0.96 * z) / 2}px, ${(1080 - 1125 * 0.96 * z) / 2}px) scale(${0.96 * z})`, transformOrigin: '0 0'}}><BentoAnim f={f} /></div>
          {/* perspective blur in the corners while the camera moves */}
          <AbsoluteFill style={{backdropFilter: `blur(${4 + speed * 10}px)`, WebkitBackdropFilter: `blur(${4 + speed * 10}px)`, maskImage: mask, WebkitMaskImage: mask, opacity: f < LAST ? 1 : 1 - prog(f, LAST, 20)}} />
          {/* wind: thin streaks rushing outward during the pull-back */}
          {speed > 0.05 && f < LAST && Array.from({length: 26}).map((_, i) => {
            const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.2;
            const t = ((f * 1.6 + i * 9) % 40) / 40;
            const d0 = 300 + t * 900;
            return <div key={i} style={{position: 'absolute', left: 960 + Math.cos(a) * d0, top: 540 + Math.sin(a) * d0, width: 140 + speed * 160, height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)', transform: `rotate(${(a * 180) / Math.PI}deg)`, transformOrigin: 'left center', opacity: speed * Math.sin(t * Math.PI) * 0.8}} />;
          })}
        </AbsoluteFill>
      )}
      {f >= T1 && <AbsoluteFill style={{background: '#fff'}} />}
      {f >= HOLD && f < T1 + 1 && (
        <div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: lerp(ex, 27, 0), overflow: 'hidden', background: 'linear-gradient(135deg, #7fbc42 0%, #00b9ef 45%, #70cbf3 100%)'}}>
          <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}><filter id="cardN"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 5} /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#cardN)" /></svg>
        </div>
      )}
      {loopVis && (
        <AbsoluteFill style={{transform: `scale(${1 + end * 0.03})`, transformOrigin: '960px 540px'}}>
          {/* the loop as a vector cut-out of the same screen-wide gradient as the card, so the colour cannot jump */}
          <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, opacity: 1 - real}}>
            <defs>
              <linearGradient id="endG" gradientUnits="userSpaceOnUse" x1="210" y1="-210" x2="1710" y2="1290"><stop offset="0" stopColor="#7fbc42" /><stop offset=".45" stopColor="#00b9ef" /><stop offset="1" stopColor="#70cbf3" /></linearGradient>
              <clipPath id="endLoop">{LOOP_PATHS.map((d, i) => <path key={i} d={d} transform={`translate(${gx}, ${gy}) scale(${gs})`} />)}</clipPath>
              <filter id="endN"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 5} /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope="0.06" /></feComponentTransfer></filter>
            </defs>
            <g clipPath="url(#endLoop)"><rect width="1920" height="1080" fill="url(#endG)" /><rect width="1920" height="1080" filter="url(#endN)" /></g>
          </svg>
          {real > 0 && <Img src={staticFile('logo_loop.svg')} style={{position: 'absolute', left: LOOP_X, top: LOOP_Y, width: LOOP_W, height: LOOP_H, opacity: real}} />}
          <Img src={staticFile('logo_word_a.svg')} style={{position: 'absolute', left: LX, top: LY, width: 900, opacity: wa, filter: `blur(${(1 - wa) * 12}px)`, transform: `translateX(${(1 - wa) * -60}px)`}} />
          <Img src={staticFile('logo_word_g.svg')} style={{position: 'absolute', left: LX, top: LY, width: 900, opacity: wg, filter: `blur(${(1 - wg) * 12}px)`, transform: `translateX(${(1 - wg) * -60}px)`}} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
export {spr, S, interpolate};
