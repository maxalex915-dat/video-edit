import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {GroundRaw} from '../components/kit/Gradients';
import {E} from '../theme/motion';

// v8: every cut has a transition, and one light ground runs under the whole film, so the scenes read as one space.
export type TxKind = 'push' | 'pushV' | 'zoom' | 'circle' | 'shapes' | 'pill';
export const P = 10; // frames on each side of a cut
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = (x: number) => E.inOut(Math.max(0, Math.min(1, x)));
const LOOP = 'linear-gradient(135deg, #7fbc42 0%, #00b9ef 45%, #70cbf3 100%)';

// Scene wrapper: how a scene arrives (kind of the cut before it) and leaves (kind of the cut after it).
export const Tx: React.FC<{len: number; inK: TxKind | null; outK: TxKind | null; inD?: number; outD?: number; children: React.ReactNode}> = ({len, inK, outK, inD = 1, outD = 1, children}) => {
  const f = useCurrentFrame();
  const i = inK ? ease(f / (2 * P)) : 1;
  const o = outK ? ease((f - (len - 2 * P)) / (2 * P)) : 0;
  let tx = 0, ty = 0, sc = 1, op = 1, bl = 0;
  const side = (k: TxKind | null, e: number, sign: number, d: number) => {
    if (!k) return;
    if (k === 'push') {tx += sign * d * 1200 * e; bl += e * 10;}
    else if (k === 'pushV') {ty += sign * d * 800 * e; bl += e * 10;}
    else if (k === 'zoom') {sc *= sign < 0 ? 1 + e * 0.7 : 1 - e * 0.25; op *= 1 - e; bl += e * 12;}
    else {sc *= sign < 0 ? 1 + e * 0.08 : 1 - e * 0.06; op *= 1 - e; bl += e * 6;}
  };
  side(inK, 1 - i, 1, inD);
  side(outK, o, -1, outD);
  return <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${sc})`, opacity: op, filter: bl > 0.3 ? `blur(${bl}px)` : undefined}}>{children}</AbsoluteFill>;
};

// Overlay shapes that carry the cut. f is relative to the cut (0 = cut).
export const TxOverlay: React.FC<{k: TxKind}> = ({k}) => {
  const g = useCurrentFrame() - P;
  if (k === 'circle') { // a brand circle swells over the cut, then shrinks away to the opposite corner
    const r = g < 0 ? interpolate(g, [-P, 0], [0, 1250], {...cl, easing: E.expoIn}) : interpolate(g, [0, P], [1250, 0], {...cl, easing: E.snappy});
    const cx = g < 0 ? 960 : interpolate(g, [0, P], [960, 1700], cl), cy = g < 0 ? 540 : interpolate(g, [0, P], [540, 140], cl);
    return <div style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', background: LOOP, boxShadow: '0 0 0 18px rgba(255,255,255,.55)'}} />;
  }
  if (k === 'pill') { // a pill grows into the whole frame, its corners straighten, then it shrinks back and flies up
    const e = g < 0 ? interpolate(g, [-P, 0], [0, 1], {...cl, easing: E.expoIn}) : interpolate(g, [0, P], [1, 0], {...cl, easing: E.snappy});
    const w = 220 + e * 1800, h = 90 + e * 1010, y = g > 0 ? interpolate(g, [0, P], [0, -420], cl) : 0;
    return <div style={{position: 'absolute', left: 960 - w / 2, top: 540 - h / 2 + y, width: w, height: h, borderRadius: Math.max(0, 45 * (1 - e) + 8), background: LOOP, opacity: Math.min(1, (g + P) / 3)}} />;
  }
  if (k === 'shapes') { // gradient and glass shapes fly through on a diagonal
    const S: [number, number, number, number, boolean][] = [[0, 900, 300, 0, true], [-3, 700, 160, 260, false], [2, 1100, 420, -200, true], [-1, 520, 200, 420, false], [3, 820, 260, -420, true]];
    return (
      <AbsoluteFill>
        {S.map(([d, size, , off, grad], i) => {
          const p = interpolate(g, [-P + d, P + d], [0, 1], cl);
          const x = interpolate(p, [0, 1], [2300, -size - 300]) + off * 0.5, y = interpolate(p, [0, 1], [1300, -size - 200]) + off;
          return <div key={i} style={{position: 'absolute', left: x, top: y, width: size, height: i % 2 ? size * 0.42 : size, borderRadius: 999, background: grad ? LOOP : 'rgba(255,255,255,.55)', backdropFilter: grad ? undefined : 'blur(18px)', border: grad ? undefined : '2px solid rgba(255,255,255,.95)', boxShadow: '0 40px 80px -30px rgba(0,120,170,.4)', transform: `rotate(${-30 + i * 9}deg)`}} />;
        })}
      </AbsoluteFill>
    );
  }
  return null;
};

// The shared ground; the camera drifts with each push so the space carries on between scenes.
export const Sky: React.FC<{cuts: {at: number; k: TxKind; d: number}[]}> = ({cuts}) => {
  const f = useCurrentFrame();
  let x = 0, y = 0;
  for (const c of cuts) {
    const e = ease((f - (c.at - P)) / (2 * P));
    if (c.k === 'push') x -= c.d * 640 * e;
    if (c.k === 'pushV') y -= c.d * 360 * e;
  }
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#fbfeff'}}>
      <div style={{position: 'absolute', left: x, top: y, width: 2560, height: 1440}}><GroundRaw kind="haze" /></div>
    </AbsoluteFill>
  );
};
