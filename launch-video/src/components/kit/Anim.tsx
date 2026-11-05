import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {E, prog, spr, S} from '../../theme/motion';

export const GRAD_TEXT = 'linear-gradient(95deg, #7fbc42 0%, #00b9ef 55%, #45b8ee 100%)';
export type On = 'white' | 'grad';
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Headline: each line slides up from behind a mask (no blur, no fade), lines staggered.
export const Headline: React.FC<{a: string; b?: string; on: On; size?: number; style?: React.CSSProperties; align?: 'left' | 'center'; at?: number; out?: number}> = ({a, b, on, size = 96, style, align = 'left', at = 0, out}) => {
  const f = useCurrentFrame();
  const line = (txt: string, i: number, css: React.CSSProperties) => {
    const p = prog(f, at + i * 5, 18, E.snappy);
    const q = out === undefined ? 0 : prog(f, out + i * 2, 8, E.expoIn);
    return (
      <div style={{overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em'}}>
        <div style={{transform: `translateY(${(1 - p) * 110 - q * 110}%)`, ...css}}>{txt}</div>
      </div>
    );
  };
  const white = {color: '#fff', textShadow: '0 2px 18px rgba(0,50,70,.3)'};
  return (
    <div style={{position: 'absolute', fontFamily: F.display, fontWeight: 700, fontSize: size, lineHeight: 1.03, letterSpacing: '-0.04em', textAlign: align, ...style}}>
      {line(a, 0, on === 'grad' ? white : {color: C.ink})}
      {b && line(b, 1, on === 'grad' ? {...white, color: 'rgba(255,255,255,.93)'} : {backgroundImage: GRAD_TEXT, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.06em'})}
    </div>
  );
};

// Entrance for any block: rise + scale + opacity, exponential settle
export const rise = (f: number, at: number, dur = 18, dist = 60) => {
  const p = prog(f, at, dur, E.snappy);
  return {opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * dist}px) scale(${0.96 + p * 0.04})`};
};

// Cursor moving along gentle arcs between waypoints; presses on clicks.
export type Way = {f: number; x: number; y: number};
export const cursorPos = (f: number, path: Way[]) => {
  if (f <= path[0].f) return {x: path[0].x, y: path[0].y};
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    if (f <= b.f) {
      const p = interpolate(f, [a.f, b.f], [0, 1], {...cl, easing: E.inOut});
      const bow = Math.hypot(b.x - a.x, b.y - a.y) * 0.18;
      const nx = -(b.y - a.y), ny = b.x - a.x, nl = Math.hypot(nx, ny) || 1;
      const arc = Math.sin(p * Math.PI) * bow;
      return {x: a.x + (b.x - a.x) * p + (nx / nl) * arc, y: a.y + (b.y - a.y) * p + (ny / nl) * arc};
    }
  }
  const l = path[path.length - 1];
  return {x: l.x, y: l.y};
};
export const Cursor: React.FC<{path: Way[]; clicks?: number[]; show?: number; s?: number}> = ({path, clicks = [], show = 0, s = 1.5}) => {
  const f = useCurrentFrame();
  const {x, y} = cursorPos(f, path);
  const press = clicks.reduce((m, c) => Math.max(m, f >= c && f < c + 6 ? 1 - Math.abs(f - c - 2) / 4 : 0), 0);
  const o = prog(f, show, 8);
  return (
    <svg style={{position: 'absolute', left: x, top: y, opacity: o, transform: `scale(${s * (1 - press * 0.15)})`, transformOrigin: 'top left', filter: 'drop-shadow(0 4px 6px rgba(5,40,44,.3))', zIndex: 30}} width="22" height="28" viewBox="0 0 20 24">
      <path d="M2 1.5v18l5-4.6 3.2 7.2 3-1.3-3.1-7h6.6z" fill="#10242a" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
};
export const Ripple: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const f = useCurrentFrame();
  if (f < at || f > at + 22) return null;
  const p = prog(f, at, 20, E.snappy);
  const r = 12 + p * 48;
  return <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `3px solid ${C.cyan}`, background: 'rgba(0,185,239,.12)', opacity: 1 - p, zIndex: 29}} />;
};
export const Tip: React.FC<{x: number; y: number; at: number; children: React.ReactNode; until?: number}> = ({x, y, at, children, until}) => {
  const f = useCurrentFrame();
  const p = spr(f, at, S.snap);
  const q = until === undefined ? 0 : prog(f, until, 8, E.expoIn);
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: Math.min(1, p) * (1 - q), transform: `translate(-50%, -100%) translateY(${(1 - p) * 10}px) scale(${0.9 + p * 0.1})`, background: C.ink, color: '#fff', borderRadius: 12, padding: '10px 16px', fontFamily: F.text, fontSize: 19, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 14px 30px -10px rgba(0,30,40,.5)', zIndex: 31}}>
      {children}
      <div style={{position: 'absolute', left: '50%', bottom: -7, marginLeft: -7, width: 14, height: 14, background: C.ink, transform: 'rotate(45deg)'}} />
    </div>
  );
};
// typed text: returns the visible part of a string between two frames
export const typed = (f: number, text: string, at: number, cps = 14) => text.slice(0, Math.max(0, Math.floor(((f - at) / 30) * cps)));
export const countTo = (f: number, to: number, at: number, dur = 24) => Math.round(to * prog(f, at, dur, E.snappy));

// Scene wrapper: momentum in (scale + blur settle) and a quick push out on the last frames.
export const SceneIn: React.FC<{dur: number; children: React.ReactNode; push?: number}> = ({dur, children, push = 1}) => {
  const f = useCurrentFrame();
  const i = prog(f, 0, 10, E.snappy);
  const o = prog(f, dur - 5, 5, E.expoIn);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + (1 - i) * 0.05 * push + o * 0.04 * push})`, filter: `blur(${(1 - i) * 10 + o * 8}px)`}}>{children}</div>
  );
};
