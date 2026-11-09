import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile} from 'remotion';
import {useF, Bare} from '../frame';
import {Ground} from '../components/kit/Gradients';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {C} from '../theme/tokens';
import {F} from '../theme/fonts';
import {PlatformIcon, Platform} from '../components/ui/Primitives';

// Visual devices taken from the second reference (Snowfire) and redrawn in the Archetype palette.
export const NIGHT_GRAD = 'linear-gradient(95deg, #a6e35f 0%, #3fd0ff 55%, #a8e4ff 100%)';
export const DAY_GRAD = 'linear-gradient(95deg, #7fbc42 0%, #00b9ef 55%, #45b8ee 100%)';
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const gradText = (dark: boolean): React.CSSProperties => ({backgroundImage: dark ? NIGHT_GRAD : DAY_GRAD, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'});

// Typed text with a caret. Parts: [text, accent?]. Plain inline spans, so spaces survive.
export const Typed: React.FC<{parts: [string, boolean?][]; at: number; size: number; dark: boolean; cps?: number; style?: React.CSSProperties; weight?: number; caretHold?: number}> = ({parts, at, size, dark, cps = 24, style, weight = 600, caretHold = 24}) => {
  const f = useF();
  const total = parts.reduce((m, [t]) => m + t.length, 0);
  let n = Math.max(0, Math.floor(((f - at) / 30) * cps));
  const doneAt = at + (total / cps) * 30;
  const caret = f >= at && f < doneAt + caretHold && Math.floor(f / 8) % 2 === 0;
  return (
    <div style={{fontFamily: F.display, fontWeight: weight, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.1, whiteSpace: 'pre-line', color: dark ? '#fff' : C.ink, ...style}}>
      {parts.map(([t, acc], i) => {
        const k = Math.min(t.length, n); n -= k;
        return <span key={i} style={acc ? gradText(dark) : {}}>{t.slice(0, k)}</span>;
      })}
      <span style={{display: 'inline-block', width: Math.max(3, size * 0.05), height: size * 0.9, marginLeft: 3, verticalAlign: '-0.1em', background: dark ? '#fff' : C.ink, opacity: caret ? 1 : 0}} />
    </div>
  );
};

// The loop logo with a soft glow behind it.
export const LoopGlow: React.FC<{s: number; glow?: number; style?: React.CSSProperties; white?: boolean}> = ({s, glow = 1, style, white}) => (
  <div style={{position: 'absolute', width: s, height: s, ...style}}>
    <div style={{position: 'absolute', inset: -s * 0.55, borderRadius: '50%', background: `radial-gradient(circle, rgba(0,185,239,${0.45 * glow}) 0%, rgba(127,188,66,${0.25 * glow}) 35%, transparent 68%)`}} />
    <Img src={staticFile('logo_loop.svg')} style={{position: 'absolute', inset: 0, width: s, height: s, objectFit: 'contain', filter: white ? 'brightness(0) invert(1)' : undefined}} />
  </div>
);

// App window: dark rail on the left with a cyan edge, light content, like the reference's product windows.
const RAIL = ['grid', 'chat', 'signal', 'star', 'share', 'box'];
export const AppWin: React.FC<{w: number; h: number; active?: number; children?: React.ReactNode; style?: React.CSSProperties; title?: string; dark?: boolean}> = ({w, h, active = 2, children, style, title, dark = true}) => (
  <div style={{position: 'absolute', width: w, height: h, borderRadius: 22, overflow: 'hidden', display: 'flex', background: 'linear-gradient(160deg, #ffffff 0%, #f6fbfd 55%, #e6f5fb 100%)',
    boxShadow: `0 0 0 1.5px rgba(120,220,255,.85), 0 0 40px -6px rgba(0,185,239,${dark ? 0.55 : 0.3}), 0 60px 140px -30px rgba(0,10,20,${dark ? 0.8 : 0.35})`, ...style}}>
    <div style={{width: 70, flex: 'none', background: '#0c1a1f', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, paddingTop: 22, borderRight: '2px solid #34c6f4'}}>
      <Img src={staticFile('logo_loop.svg')} style={{width: 34, height: 34, objectFit: 'contain', marginBottom: 10}} />
      {RAIL.map((r, i) => (
        <div key={r} style={{width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: i === active ? '#fff' : 'transparent'}}>
          <div style={{width: 18, height: 18, borderRadius: i % 2 ? 9 : 4, border: `2.5px solid ${i === active ? '#0c1a1f' : '#8aa0a6'}`}} />
        </div>
      ))}
    </div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>
      {title && <div style={{position: 'absolute', left: 30, top: 22, fontFamily: F.text, fontSize: 20, fontWeight: 700, color: C.ink, zIndex: 2}}>{title}</div>}
      {children}
    </div>
  </div>
);

// Hosts an older scene (its own ground and headline switched off) at a scale, cropped, inside a container.
export const Host: React.FC<{C: React.FC<{dur: number}>; dur: number; scale: number; x?: number; y?: number; from?: number}> = ({C: Comp, dur, scale, x = 0, y = 0, from = 0}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: '0 0'}}>
    <Bare.Provider value>
      <Sequence from={from} durationInFrames={dur} layout="none"><Comp dur={dur} /></Sequence>
    </Bare.Provider>
  </div>
);

// 3D sweep: the window swings in from a steep angle and settles at a gentle one, then keeps drifting.
export type Tilt = {ry0: number; rx0: number; rz0?: number; x0: number; y0: number; ry1: number; rx1: number; rz1?: number; s0?: number; s1?: number};
export const TiltIn: React.FC<{t: Tilt; at?: number; len?: number; dur: number; cx: number; cy: number; children: React.ReactNode; out?: boolean}> = ({t, at = 0, len = 34, dur, cx, cy, children, out = true}) => {
  const f = useF();
  const p = prog(f, at, len, E.snappy);
  const d = prog(f, at, dur - at, (x) => x);
  const o = out ? prog(f, dur - 10, 10, E.expoIn) : 0;
  const ry = lerp(p, t.ry0, t.ry1) - d * 3, rx = lerp(p, t.rx0, t.rx1), rz = lerp(p, t.rz0 ?? 0, t.rz1 ?? 0);
  const s = lerp(p, t.s0 ?? 0.9, t.s1 ?? 1) + d * 0.03;
  return (
    <div style={{position: 'absolute', inset: 0, perspective: 2400, perspectiveOrigin: `${cx}px ${cy}px`}}>
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${cx}px ${cy}px`, transform: `translate(${(1 - p) * t.x0}px, ${(1 - p) * t.y0 - o * 120}px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`, opacity: Math.min(1, p * 1.6) * (1 - o), filter: `blur(${(1 - p) * 8 + o * 10}px)`}}>{children}</div>
    </div>
  );
};

// Thin connector with a rounded corner, drawn on, ending in a small dot; label sits at the start.
export const Callout: React.FC<{d: string; at: number; len?: number; dark: boolean; label?: string; lx?: number; ly?: number; anchor?: 'start' | 'end'}> = ({d, at, len = 22, dark, label, lx = 0, ly = 0, anchor = 'start'}) => {
  const f = useF();
  const p = prog(f, at, len, E.inOut);
  const col = dark ? 'rgba(170,230,255,.75)' : 'rgba(0,120,150,.45)';
  return (
    <>
      <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', zIndex: 5}}>
        <path d={d} fill="none" stroke={col} strokeWidth={2} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} strokeLinecap="round" />
      </svg>
      {label && <div style={{position: 'absolute', left: lx, top: ly, transform: anchor === 'end' ? 'translateX(-100%)' : undefined, fontFamily: F.display, fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: dark ? '#e9f8ff' : C.ink, whiteSpace: 'nowrap', opacity: prog(f, at + len * 0.5, 12), zIndex: 6}}>{label}</div>}
    </>
  );
};

// Bundles of light lines that flow into a point (the reference's data streams into the answer).
export const Streams: React.FC<{x: number; y: number; side: 'left' | 'right'; at: number; dark?: boolean; reach?: number}> = ({x, y, side, at, dark = false, reach = 520}) => {
  const f = useF();
  const p = prog(f, at, 30, E.snappy);
  const dir = side === 'left' ? -1 : 1;
  const ex = x + dir * reach * p;
  return (
    <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <defs><linearGradient id={`st${side}`} x1={side === 'left' ? 0 : 1} x2={side === 'left' ? 1 : 0}><stop offset="0" stopColor={dark ? '#a6e35f' : '#7fbc42'} stopOpacity="0" /><stop offset=".5" stopColor="#00b9ef" stopOpacity=".8" /><stop offset="1" stopColor="#70cbf3" stopOpacity="1" /></linearGradient></defs>
      {[-70, -36, -12, 12, 36, 70].map((o, i) => {
        const mx = x + dir * reach * 0.35;
        return <path key={i} d={`M ${ex} ${y + o * 1.2} C ${mx + dir * 120} ${y + o * 1.2}, ${mx + dir * 40} ${y + o * 0.15}, ${x} ${y + o * 0.1}`} fill="none" stroke={`url(#st${side})`} strokeWidth={i % 2 ? 2 : 3} strokeDasharray="60 22" strokeDashoffset={-(f - at) * 4 * dir * -1} opacity={p} />;
      })}
    </svg>
  );
};

// A pill that holds a stack of round icons, which collapses and swaps for the product.
export const IconPill: React.FC<{ps: Platform[]; at: number; morph: number; label: string; x: number; y: number}> = ({ps, at, morph, label, x, y}) => {
  const f = useF();
  const p = spr(f, at, S.pop);
  const m = prog(f, morph, 18, E.inOut);
  const w = lerp(m, 140 + ps.length * 52, 420);
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y - 52, width: w, height: 104, borderRadius: 999, background: 'rgba(255,255,255,.92)', boxShadow: '0 0 0 1.5px rgba(120,220,255,.9), 0 30px 60px -24px rgba(0,120,170,.45)', transform: `scale(${Math.min(1.05, p)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, overflow: 'hidden'}}>
      <div style={{display: 'flex', opacity: 1 - m, width: (1 - m) * (ps.length * 52 + 30), overflow: 'hidden'}}>
        {ps.map((q, i) => <div key={q} style={{marginLeft: i ? -14 : 0, borderRadius: 99, boxShadow: '0 0 0 4px #fff', transform: `translateY(${(1 - prog(f, at + 4 + i * 2, 10, E.snappy)) * 30}px)`}}><PlatformIcon p={q} size={66} style={{borderRadius: 99}} /></div>)}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: m, transform: `scale(${0.8 + m * 0.2})`}}>
        <div style={{width: 70, height: 70, borderRadius: 99, background: '#0c1a1f', display: 'grid', placeItems: 'center'}}><Img src={staticFile('logo_loop.svg')} style={{width: 44, height: 44, objectFit: 'contain'}} /></div>
        <span style={{fontFamily: F.display, fontSize: 38, fontWeight: 650, letterSpacing: '-0.03em', color: C.ink, whiteSpace: 'nowrap'}}>{label}</span>
      </div>
    </div>
  );
};

// Ground switch for the new scenes.
export const Sky: React.FC<{dark: boolean; alt?: 0 | 1 | 2}> = ({dark, alt = 0}) => <Ground kind={dark ? 'night' : (['haze', 'haze2', 'haze3'] as const)[alt]} />;

// A scene's way out: a quick push forward and blur on the last frames.
export const Out: React.FC<{dur: number; children: React.ReactNode; k?: number}> = ({dur, children, k = 8}) => {
  const f = useF();
  const i = prog(f, 0, 12, E.snappy);
  const o = prog(f, dur - k, k, E.expoIn);
  return <AbsoluteFill style={{transform: `scale(${1 + (1 - i) * 0.04 + o * 0.06})`, filter: `blur(${(1 - i) * 8 + o * 10}px)`, opacity: Math.min(1, i * 2)}}>{children}</AbsoluteFill>;
};
export {cl, useF, prog, spr, S, E, lerp, C, F, PlatformIcon};
export type {Platform};
