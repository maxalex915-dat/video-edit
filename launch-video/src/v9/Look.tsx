import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog} from '../theme/motion';

// v9 look, after the third reference (Peko), with ONE colour profile: the Archetype brand gradient
// (green #7fbc42, cyan #00b9ef, light blue #70cbf3, in that order). Every coloured area is that gradient;
// it moves (angle and position drift) the way the reference's colour breathes.
export const CY = '#00b9ef', GR = '#7fbc42', SKY = '#70cbf3', INK = '#10242a', MIST = '#f3f6f6';
export const BRAND = `linear-gradient(95deg, ${GR} 0%, ${CY} 55%, ${SKY} 100%)`;
const s = Math.sin, c = Math.cos;

const Grain: React.FC<{o: number}> = ({o}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: o, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%"><filter id="g9"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 7} /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#g9)" /></svg>
    </AbsoluteFill>
  );
};

// Brand field: the whole frame is the brand gradient, drifting and turning slowly. A second, offset copy of the same
// gradient breathes over it, so the colour moves like the reference's bold screens without any other colour.
export const BrandField: React.FC<{seed?: number}> = ({seed = 0}) => {
  const f = useF();
  const t = f / 30 + seed * 3;
  const a = 125 + s(t * 0.25) * 18;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: '-12%', background: `linear-gradient(${a}deg, ${GR} 0%, ${CY} 45%, ${SKY} 100%)`, transform: `translate(${s(t * 0.3) * 6}%, ${c(t * 0.22) * 5}%)`}} />
      <div style={{position: 'absolute', inset: '-12%', background: `linear-gradient(${a + 70}deg, ${GR} 0%, ${CY} 45%, ${SKY} 100%)`, opacity: 0.45 + s(t * 0.4) * 0.2, filter: 'blur(60px)', WebkitMaskImage: `radial-gradient(45% 55% at ${50 + s(t * 0.35) * 18}% ${50 + c(t * 0.3) * 14}%, #000 0%, transparent 70%)`, maskImage: `radial-gradient(45% 55% at ${50 + s(t * 0.35) * 18}% ${50 + c(t * 0.3) * 14}%, #000 0%, transparent 70%)`}} />
      <Grain o={0.1} />
    </AbsoluteFill>
  );
};

// Mist: off-white, and the brand gradient rising softly from the bottom edge. lift raises it (0 to 1).
export const Mist: React.FC<{lift?: number}> = ({lift = 0.4}) => {
  const f = useF();
  const t = f / 30;
  const h = 34 + lift * 30 + s(t * 0.6) * 3;
  const a = 100 + s(t * 0.2) * 12;
  return (
    <AbsoluteFill style={{background: MIST, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: '-20%', right: '-20%', bottom: '-12%', height: `${h + 12}%`, background: `linear-gradient(${a}deg, ${GR} 0%, ${CY} 50%, ${SKY} 100%)`, transform: `translateX(${s(t * 0.25) * 6}%)`, filter: 'blur(90px)', opacity: 0.7, WebkitMaskImage: 'linear-gradient(0deg, #000 25%, transparent 100%)', maskImage: 'linear-gradient(0deg, #000 25%, transparent 100%)'}} />
      <Grain o={0.035} />
    </AbsoluteFill>
  );
};

// The light pillar in the brand gradient (green at the foot, cyan, light blue at the top), splitting into ribbons.
export const Pillar: React.FC<{rise: number; split: number}> = ({rise, split}) => {
  const f = useF();
  const t = f / 30;
  const top = 1080 - 980 * rise;
  const ribbon = (k: number) => {
    let d = '';
    for (let y = 1080; y >= top; y -= 20) {
      const u = (1080 - y) / 980;
      const x = 960 + s(u * 7 + k * 2.09 + t * 1.4) * 70 * split * Math.min(1, u * 3);
      d += `${y === 1080 ? 'M' : 'L'}${x},${y} `;
    }
    return d;
  };
  return (
    <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <linearGradient id="pl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={GR} stopOpacity=".95" /><stop offset=".5" stopColor={CY} stopOpacity=".7" /><stop offset="1" stopColor={SKY} stopOpacity="0" /></linearGradient>
        <filter id="pb"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {[0, 1, 2].map((k) => <path key={k} d={ribbon(k)} fill="none" stroke="url(#pl)" strokeWidth={split > 0.05 ? 34 : 46} strokeLinecap="round" opacity={k === 0 ? 0.85 : 0.6 * Math.min(1, split * 3)} filter="url(#pb)" />)}
    </svg>
  );
};

// Text, word by word: each word slides in from the left out of a blur (the earlier versions' reveal).
// parts: [text, gradient?]. out: frame where the whole line blurs away.
export type Part = [string, boolean?];
export const Words: React.FC<{parts: Part[]; at: number; size: number; color?: string; weight?: number; out?: number; stagger?: number; align?: 'center' | 'left'; style?: React.CSSProperties}> = ({parts, at, size, color = INK, weight = 600, out, stagger = 3, align = 'center', style}) => {
  const f = useF();
  const o = out === undefined ? 0 : prog(f, out, 9, E.expoIn);
  let k = 0;
  const lines = parts.flatMap(([t, g]) => t.split('\n').map((ln, j) => ({ln, g, br: j > 0})));
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: size * 0.26, fontFamily: F.display, fontSize: size, fontWeight: weight, letterSpacing: '-0.035em', lineHeight: 1.12, opacity: 1 - o, filter: o > 0 ? `blur(${o * 14}px)` : undefined, transform: `translateY(${-o * 20}px)`, ...style}}>
      {lines.map(({ln, g, br}, li) => (
        <React.Fragment key={li}>
          {br && <div style={{flexBasis: '100%', height: 0}} />}
          {ln.split(' ').filter(Boolean).map((w) => {
            const p = prog(f, at + k++ * stagger, 18, E.snappy);
            const look: React.CSSProperties = g ? {backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'} : {color};
            return <span key={k} style={{display: 'inline-block', opacity: p, filter: `blur(${(1 - p) * 14}px)`, transform: `translateX(${(1 - p) * -size * 0.6}px)`, ...look}}>{w}</span>;
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
export const Center: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 0}) => (
  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${y}px)`}}>{children}</div>
);
// Card floating on light: a white halo around it.
export const glow = (k = 1): React.CSSProperties => ({boxShadow: `0 0 0 ${6 * k}px rgba(255,255,255,.35), 0 0 ${70 * k}px ${12 * k}px rgba(255,255,255,.5), 0 30px 60px -30px rgba(0,90,120,.35)`});
// The camera never stops: a slow push and drift through every scene.
export const Drift: React.FC<{dur: number; children: React.ReactNode; z?: number; x?: number}> = ({dur, children, z = 0.05, x = 0}) => {
  const f = useF();
  const p = prog(f, 0, dur, (q) => q);
  return <AbsoluteFill style={{transform: `scale(${1 + p * z}) translateX(${p * x}px)`}}>{children}</AbsoluteFill>;
};
