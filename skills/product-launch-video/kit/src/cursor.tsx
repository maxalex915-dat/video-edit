import React from 'react';
import {interpolate} from 'remotion';
import {useF} from './frame';
import {E, prog} from './motion';
import {F} from './brand';

// Cursors move like a person: unhurried, a slight arc on each move, a short rest on what they point at.
// Use E.soft (sine) for the speed curve; E.inOut is too fast in the middle and was rejected as "too fast".
export type Way = {f: number; x: number; y: number};
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const cursorPos = (f: number, path: Way[], ease: (t: number) => number = E.soft) => {
  if (f <= path[0].f) return {x: path[0].x, y: path[0].y};
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i];
    if (f <= b.f) {
      const p = interpolate(f, [a.f, b.f], [0, 1], {...cl, easing: ease});
      const bow = Math.hypot(b.x - a.x, b.y - a.y) * 0.12;
      const nx = -(b.y - a.y), ny = b.x - a.x, nl = Math.hypot(nx, ny) || 1;
      const arc = Math.sin(p * Math.PI) * bow;
      return {x: a.x + (b.x - a.x) * p + (nx / nl) * arc, y: a.y + (b.y - a.y) * p + (ny / nl) * arc};
    }
  }
  const l = path[path.length - 1];
  return {x: l.x, y: l.y};
};
const press = (f: number, clicks: number[]) => clicks.reduce((m, c) => Math.max(m, f >= c && f < c + 6 ? 1 - Math.abs(f - c - 2) / 4 : 0), 0);

// The standard arrow cursor (dark with a white edge). Put it inside the same transformed layer as the UI it
// touches, so a click lands on the button even when the layout is tilted in 3D.
export const Cursor: React.FC<{path: Way[]; clicks?: number[]; show?: number; s?: number}> = ({path, clicks = [], show = 0, s = 1.4}) => {
  const f = useF();
  const {x, y} = cursorPos(f, path);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: prog(f, show, 8), zIndex: 30, transform: `scale(${s * (1 - press(f, clicks) * 0.15)})`, transformOrigin: '0 0'}}>
      <svg width="34" height="40" viewBox="0 0 34 40" style={{position: 'absolute', left: -3, top: -3, overflow: 'visible', filter: 'drop-shadow(0 6px 8px rgba(5,40,44,.3))'}}>
        <path d="M3 3 L3 33 L11 25 L17 37 L23 34 L17 22 L28 22 Z" fill="#1a1a1a" stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
// A teammate's cursor (collaboration): the arrow in their colour with a name tag. Every teammate must DO something
// visible (drag a card, click, type); a cursor that only wanders reads as a bug.
export const Teammate: React.FC<{name: string; color: string; path: Way[]; clicks?: number[]; show?: number}> = ({name, color, path, clicks = [], show = 0}) => {
  const f = useF();
  const {x, y} = cursorPos(f, path);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: prog(f, show, 8), zIndex: 30, transform: `scale(${1 - press(f, clicks) * 0.12})`, transformOrigin: '0 0'}}>
      <svg width="34" height="40" viewBox="0 0 34 40" style={{position: 'absolute', left: -3, top: -3, overflow: 'visible', filter: 'drop-shadow(0 6px 8px rgba(5,40,44,.3))'}}>
        <path d="M3 3 L3 33 L11 25 L17 37 L23 34 L17 22 L28 22 Z" fill={color} stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
      </svg>
      <span style={{position: 'absolute', left: 26, top: 30, fontFamily: F.text, fontSize: 20, fontWeight: 700, color: '#fff', background: color, borderRadius: 99, padding: '5px 14px', whiteSpace: 'nowrap', boxShadow: '0 8px 18px -8px rgba(5,40,44,.4)', border: '2px solid #fff'}}>{name}</span>
    </div>
  );
};
// A ring that spreads from a click.
export const Ripple: React.FC<{x: number; y: number; at: number; color?: string}> = ({x, y, at, color = '#00b9ef'}) => {
  const f = useF();
  if (f < at || f > at + 22) return null;
  const p = prog(f, at, 20, E.snappy), r = 12 + p * 48;
  return <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `3px solid ${color}`, background: `${color}1f`, opacity: 1 - p, zIndex: 29}} />;
};
