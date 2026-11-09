import React from 'react';
import {interpolate} from 'remotion';
import {useF as useCurrentFrame, Bare} from '../../frame';
import {C} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {E, prog, spr, S} from '../../theme/motion';

export const GRAD_TEXT = 'linear-gradient(95deg, #7fbc42 0%, #00b9ef 55%, #45b8ee 100%)';
export type On = 'white' | 'grad';
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Headline: each word slides in from the left out of a blur, staggered, then the whole line keeps gliding.
const RAMP: [number, [number, number, number]][] = [[0, [127, 188, 66]], [0.55, [0, 185, 239]], [1, [69, 184, 238]]];
const rampAt = (t: number) => {
  for (let i = 1; i < RAMP.length; i++) if (t <= RAMP[i][0]) {
    const [a, ca] = RAMP[i - 1], [b, cb] = RAMP[i]; const k = (t - a) / (b - a);
    return `rgb(${ca.map((v, j) => Math.round(v + (cb[j] - v) * k)).join(',')})`;
  }
  return 'rgb(69,184,238)';
};
export const Words: React.FC<{text: string; at: number; style: React.CSSProperties; grad?: boolean; stagger?: number; size: number; drift?: number}> = ({text, at, style, grad, stagger = 3, size, drift = 26}) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  const total = text.length;
  let pos = 0;
  const glide = interpolate(f, [at, at + 220], [0, drift], {...cl, easing: E.glide});
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: `0 ${size * 0.25}px`, transform: `translateX(${glide}px)`, ...style}}>
      {words.map((w, i) => {
        const p = prog(f, at + i * stagger, 20, E.snappy);
        const t0 = pos / total, t1 = (pos + w.length) / total;
        pos += w.length + 1;
        const g = grad ? {backgroundImage: `linear-gradient(90deg, ${rampAt(t0)}, ${rampAt(t1)})`, WebkitBackgroundClip: 'text' as const, color: 'transparent', paddingBottom: '0.08em'} : {};
        return (
          <span key={i} style={{display: 'inline-block', opacity: p, filter: `blur(${(1 - p) * 14}px)`, transform: `translateX(${(1 - p) * -size * 0.7}px)`, ...g}}>{w}</span>
        );
      })}
    </div>
  );
};
type HP = {a: string; b?: string; on: On; size?: number; style?: React.CSSProperties; align?: 'left' | 'center'; at?: number; out?: number};
export const Headline: React.FC<HP> = (p) => (React.useContext(Bare) ? null : <Headline0 {...p} />);
const Headline0: React.FC<HP> = ({a, b, on, size = 96, style, align = 'left', at = 0}) => {
  // v6: typed with a caret, second line in the brand ramp
  const f = useCurrentFrame();
  const shown = Math.max(0, Math.floor(((f - at) / 30) * 24));
  const la = a.slice(0, shown), lb = b ? b.slice(0, Math.max(0, shown - a.length)) : '';
  const done = shown >= a.length + (b ? b.length : 0);
  const caret = (!done || f - at - ((a.length + (b?.length ?? 0)) / 24) * 30 < 22) && Math.floor(f / 8) % 2 === 0;
  const white = {color: '#fff', textShadow: '0 2px 18px rgba(0,30,40,.35)'};
  const night = {backgroundImage: 'linear-gradient(95deg, #a6e35f 0%, #3fd0ff 55%, #a8e4ff 100%)', WebkitBackgroundClip: 'text' as const, color: 'transparent', paddingBottom: '0.06em'};
  const Caret = () => <span style={{display: 'inline-block', width: Math.max(3, size * 0.045), height: size * 0.95, marginLeft: 4, verticalAlign: 'middle', background: on === 'grad' ? '#fff' : C.ink, opacity: caret ? 1 : 0}} />;
  return (
    <div style={{position: 'absolute', fontFamily: F.display, fontWeight: 600, fontSize: size, lineHeight: 1.05, letterSpacing: '-0.035em', textAlign: align, ...style}}>
      <div style={on === 'grad' ? white : {color: C.ink}}>{la}{(!b || shown <= a.length) && f >= at && <Caret />}</div>
      {b && <div style={{minHeight: size * 1.05}}><span style={on === 'grad' ? night : {backgroundImage: GRAD_TEXT, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.06em'}}>{lb}</span>{shown > a.length && <Caret />}</div>}
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
// Paper-plane cursor (rounded black triangle, white outline) that turns to face where it flies.
const heading = (f: number, path: Way[]) => {
  for (let k = 2; k < 24; k++) {
    const a = cursorPos(f - k, path), b = cursorPos(f + 2, path);
    const dx = b.x - a.x, dy = b.y - a.y;
    if (Math.hypot(dx, dy) > 3) return Math.atan2(dy, dx);
  }
  return -Math.PI * 0.75; // at rest it points up-left, like a normal cursor
};
export const Cursor: React.FC<{path: Way[]; clicks?: number[]; show?: number; s?: number}> = ({path, clicks = [], show = 0, s = 1.4}) => {
  const f = useCurrentFrame();
  const {x, y} = cursorPos(f, path);
  // smooth the heading over a few frames so turns bank like a plane
  let sx = 0, sy = 0;
  for (let k = -3; k <= 3; k++) {const h = heading(f + k, path); sx += Math.cos(h); sy += Math.sin(h);}
  const ang = (Math.atan2(sy, sx) * 180) / Math.PI;
  const press = clicks.reduce((m, c) => Math.max(m, f >= c && f < c + 6 ? 1 - Math.abs(f - c - 2) / 4 : 0), 0);
  const o = prog(f, show, 8);
  // the tip of the triangle sits at (0,0) and points along +x before rotation
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0, opacity: o, zIndex: 30, transform: `rotate(${ang}deg) scale(${s * (1 - press * 0.15)})`}}>
      <svg width="44" height="44" viewBox="-40 -22 44 44" style={{position: 'absolute', left: -40, top: -22, overflow: 'visible', filter: 'drop-shadow(0 6px 8px rgba(5,40,44,.3))'}}>
        <path d="M0,0 L-30,-14 Q-34,-16 -33,-11 L-27,0 L-33,11 Q-34,16 -30,14 Z" fill="#1a1a1a" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    </div>
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
