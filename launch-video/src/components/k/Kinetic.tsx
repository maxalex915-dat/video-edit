import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../../frame';
import {C} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {E, prog} from '../../theme/motion';

// Kinetic type, modelled on the reference film: centred, medium weight, one accent word in the brand ramp.
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ACCENT: React.CSSProperties = {backgroundImage: 'linear-gradient(95deg, #6cb434 0%, #00aee6 60%, #3fb3ea 100%)', WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'};
export type Tone = 'ink' | 'white';
export const TYPE = (size = 72, tone: Tone = 'ink'): React.CSSProperties => ({fontFamily: F.display, fontWeight: 500, fontSize: size, letterSpacing: '-0.025em', lineHeight: 1.1, color: tone === 'ink' ? C.ink : '#fff', whiteSpace: 'nowrap', textShadow: tone === 'white' ? '0 2px 20px rgba(0,60,80,.25)' : 'none'});

// A word list: [text, accent?]. Words arrive spaced out and gather, blurring into focus, about 0.3 s apart.
export type W = [string, boolean?];
export const words = (s: string): W[] => s.split(' ').map((w) => (w.startsWith('*') ? [w.slice(1), true] : [w]));
export const Line: React.FC<{w: W[]; at: number; size?: number; tone?: Tone; gap?: number; stagger?: number; gather?: number; style?: React.CSSProperties; out?: number; spreadOut?: number; keep?: number}> = ({w, at, size = 72, tone = 'ink', stagger = 7, gather = 1, style, out, spreadOut, keep = -1}) => {
  const f = useF();
  const n = w.length;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
      <div style={{display: 'flex', alignItems: 'baseline', ...TYPE(size, tone)}}>
        {w.map(([t, acc], i) => {
          const p = prog(f, at + i * stagger, 22, E.snappy);
          const g = gather * (1 - prog(f, at + i * stagger, 30, E.snappy)) * size * 0.9;
          // spread exit: words drift apart and fall away left to right, the kept word stays
          const sp = spreadOut === undefined ? 0 : prog(f, spreadOut, 26, E.inOut);
          const gone = spreadOut === undefined || i === keep ? 0 : prog(f, spreadOut + 6 + i * 4, 10, E.expoIn);
          const dir = i - (keep >= 0 ? keep : (n - 1) / 2);
          const o = out === undefined ? 0 : prog(f, out, 12, E.expoIn);
          return (
            <span key={i} style={{display: 'inline-block', marginLeft: i ? size * 0.26 + g + sp * size * 0.5 * Math.abs(dir) : 0, opacity: p * (1 - gone) * (1 - o), filter: `blur(${(1 - p) * 16 + gone * 10 + o * 12}px)`, transform: `translateX(${dir * sp * size * 0.4}px)`, ...(acc ? ACCENT : {})}}>{t}</span>
          );
        })}
      </div>
    </div>
  );
};

// Typewriter with caret, selection and retyping. ops: [frame, 'type'|'select'|'delete', text or count]
export type Op = [number, 'type', string] | [number, 'select', number] | [number, 'delete'];
export const Typewriter: React.FC<{ops: Op[]; size?: number; tone?: Tone; cps?: number; style?: React.CSSProperties; accentFrom?: number}> = ({ops, size = 72, tone = 'ink', cps = 18, style, accentFrom}) => {
  const f = useF();
  let txt = '', sel = 0;
  for (const op of ops) {
    if (f < op[0]) break;
    if (op[1] === 'type') {const n = Math.min(op[2].length, Math.floor(((f - op[0]) / 30) * cps) + 1); txt += op[2].slice(0, n); sel = 0;}
    if (op[1] === 'select') sel = Math.min(op[2], Math.floor((f - op[0]) / 1.2) + 1);
    if (op[1] === 'delete') {txt = txt.slice(0, txt.length - sel); sel = 0;}
  }
  const caretOn = Math.floor(f / 9) % 2 === 0;
  const a = txt.slice(0, txt.length - sel), b = txt.slice(txt.length - sel);
  const ac = accentFrom !== undefined && a.length > accentFrom;
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
      <div style={{...TYPE(size, tone), display: 'flex', alignItems: 'center'}}>
        <span style={{whiteSpace: 'pre'}}>{ac ? <>{a.slice(0, accentFrom)}<span style={ACCENT}>{a.slice(accentFrom)}</span></> : a}</span>
        {sel > 0 && <span style={{whiteSpace: 'pre', background: '#00a6dc', color: '#fff', padding: '0 4px'}}>{b}</span>}
        <span style={{display: 'inline-block', width: Math.max(3, size * 0.05), height: size * 1.05, marginLeft: 3, background: tone === 'ink' ? C.ink : '#fff', opacity: caretOn || sel ? 1 : 0}} />
      </div>
    </div>
  );
};

// One huge word that holds and creeps, then shrinks fast to its normal size (8 frames, measured).
export const BigWord: React.FC<{text: string; at: number; shrinkAt: number; big?: number; small?: number; tone?: Tone; accent?: boolean; style?: React.CSSProperties; x?: number}> = ({text, at, shrinkAt, big = 360, small = 96, tone = 'ink', accent, style, x = 0}) => {
  const f = useF();
  const inn = prog(f, at, 14, E.snappy);
  const creep = interpolate(f, [at, shrinkAt], [1.06, 1], {...cl});
  const s = interpolate(f, [shrinkAt, shrinkAt + 8], [1, small / big], {...cl, easing: E.inOut});
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
      <div style={{...TYPE(big, tone), fontWeight: 600, letterSpacing: '-0.045em', transform: `translateX(${x}px) scale(${creep * s})`, transformOrigin: 'center', opacity: inn, filter: `blur(${(1 - inn) * 30 + (f >= shrinkAt && f < shrinkAt + 8 ? 4 : 0)}px)`, ...(accent ? ACCENT : {})}}>{text}</div>
    </div>
  );
};

// Brackets close in on a phrase until only [ ] is left.
export const Brackets: React.FC<{text: string; at: number; closeAt: number; size?: number; tone?: Tone}> = ({text, at, closeAt, size = 84, tone = 'ink'}) => {
  const f = useF();
  const p = prog(f, at, 20, E.snappy);
  const c = prog(f, closeAt, 18, E.inOut);
  const w = text.length * size * 0.52;
  const br = (side: 1 | -1) => <span style={{position: 'absolute', top: '50%', left: '50%', transform: `translate(${-50 + side * 50}%, -52%) translateX(${side * ((w / 2) * (1 - c) + size * 0.32 + (1 - p) * 120)}px)`, ...TYPE(size * 1.5, tone), fontWeight: 300, ...(tone === 'ink' ? ACCENT : {})}}>{side < 0 ? '[' : ']'}</span>;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{...TYPE(size, tone), ...(tone === 'ink' ? ACCENT : {fontWeight: 650}), opacity: p * (1 - c), filter: `blur(${(1 - p) * 14}px)`, clipPath: `inset(0 ${c * 50}% 0 ${c * 50}%)`}}>{text}</div>
      </div>
      {br(-1)}{br(1)}
    </AbsoluteFill>
  );
};

// Camera dives into a point (a letter's counter) until it fills the frame.
export const ZoomThrough: React.FC<{at: number; dur?: number; ox: number; oy: number; children: React.ReactNode; max?: number}> = ({at, dur = 9, ox, oy, children, max = 70}) => {
  const f = useF();
  const p = prog(f, at, dur, E.expoIn);
  const s = Math.pow(max, p);
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: `${ox}px ${oy}px`, filter: p > 0.05 ? `blur(${p * 6}px)` : undefined}}>{children}</AbsoluteFill>;
};

// The product on a stage: 3D perspective, rises from below (exponential, measured), edges dissolve into light, endless drift.
export const Stage: React.FC<{at?: number; rx?: number; ry?: number; rz?: number; x?: number; y?: number; scale?: number; drift?: number; children: React.ReactNode; dissolve?: boolean; w: number; h: number; flat?: number}> = ({at = 0, rx = 22, ry = -16, rz = 4, x = 960, y = 560, scale = 1, drift = 1, children, dissolve = true, w, h, flat = 0}) => {
  const f = useF();
  const r = prog(f, at, 22, E.snappy);
  const d = Math.max(0, f - at) * drift;
  const k = 1 - flat;
  const m = dissolve ? 'radial-gradient(75% 80% at 50% 45%, black 55%, transparent 100%)' : undefined;
  return (
    <AbsoluteFill style={{perspective: 2400}}>
      <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, opacity: Math.min(1, r * 1.5),
        transform: `translateY(${(1 - r) * 700 - d * 0.6}px) translateX(${-d * 0.4}px) rotateX(${rx * k}deg) rotateY(${ry * k}deg) rotateZ(${rz * k}deg) scale(${scale * (1 + d * 0.0006)})`,
        maskImage: m, WebkitMaskImage: m}}>{children}</div>
    </AbsoluteFill>
  );
};

// Brand-colour wedge that sweeps across from a corner.
export const Wipe: React.FC<{at: number; dur?: number}> = ({at, dur = 16}) => {
  const f = useF();
  const p = prog(f, at, dur, E.inOut);
  if (p <= 0 || p >= 1) return null;
  const x = interpolate(p, [0, 1], [2400, -2600]);
  return <div style={{position: 'absolute', left: x, top: -600, width: 2400, height: 2400, transform: 'rotate(28deg)', background: 'linear-gradient(90deg, #7fbc42, #00b9ef 50%, #70cbf3)', boxShadow: '0 0 120px rgba(0,185,239,.5)'}} />;
};
