import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog} from '../theme/motion';

// v9 look, after the third reference (Peko): colour as moving light. Three grounds:
// the bold field (one saturated brand colour, a drifting white bloom, a deep teal vignette sweeping a corner),
// the mist (cool off-white, colour breathing up from the bottom edge) and the light pillar that splits into ribbons.
export const CY = '#00b9ef', CYD = '#0090c4', GR = '#7fbc42', SKY = '#70cbf3', TEALD = '#043f45', INK = '#10242a', MIST = '#f3f6f6';
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
const Blob: React.FC<{x: number; y: number; w: number; h: number; color: string; blur: number; o?: number; r?: number}> = ({x, y, w, h, color, blur, o = 1, r = 0}) => (
  <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: '50%', background: color, filter: `blur(${blur}px)`, opacity: o, transform: `rotate(${r}deg)`}} />
);

// Bold field. corner: where the deep vignette sits (0 bottom-left, 1 right, 2 top-right); it sweeps in over the scene.
export const BoldField: React.FC<{corner?: 0 | 1 | 2; bloom?: number}> = ({corner = 0, bloom = 1}) => {
  const f = useF();
  const t = f / 30;
  const v = prog(f, 0, 50, E.inOut);
  const VC: [number, number][] = [[-8, 112], [112, 60], [105, -10]];
  const [vx, vy] = VC[corner];
  // the white U bloom
  const ux = 960 + s(t * 0.5) * 120, uy = 330 + c(t * 0.4) * 40;
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${CY} 0%, ${CYD} 100%)`, overflow: 'hidden'}}>
      <Blob x={1500 + s(t * 0.3) * 120} y={900} w={1100} h={700} color={GR} blur={160} o={0.55} />
      <svg width="1920" height="1080" style={{position: 'absolute', filter: 'blur(70px)', opacity: 0.85 * bloom}}>
        <path d={`M ${ux - 520} ${uy - 260} Q ${ux - 470} ${uy + 420} ${ux} ${uy + 430} Q ${ux + 470} ${uy + 420} ${ux + 520} ${uy - 260}`} fill="none" stroke="#fff" strokeWidth={230} strokeLinecap="round" />
      </svg>
      <Blob x={960 + c(t * 0.35) * 200} y={-60} w={900} h={360} color={CY} blur={80} o={0.9} />
      <AbsoluteFill style={{background: `radial-gradient(1100px 900px at ${vx + (corner === 0 ? -20 : 20) * (1 - v)}% ${vy}%, #021f24 0%, ${TEALD} 22%, rgba(4,63,69,.6) 42%, transparent 72%)`, opacity: 1}} />
      <Grain o={0.07} />
    </AbsoluteFill>
  );
};

// Mist: off-white, colour breathing up from the bottom. lift raises the glow (0 to 1).
export const Mist: React.FC<{lift?: number; tint?: 0 | 1 | 2}> = ({lift = 0.4, tint = 0}) => {
  const f = useF();
  const t = f / 30;
  const L = 240 * lift;
  const cols = [[CY, GR, SKY], [GR, CY, SKY], [SKY, CY, GR]][tint];
  return (
    <AbsoluteFill style={{background: MIST, overflow: 'hidden'}}>
      <Blob x={560 + s(t * 0.4) * 140} y={1180 - L + s(t * 0.7) * 30} w={1100} h={520 + L} color={cols[0]} blur={130} o={0.55} />
      <Blob x={1380 + c(t * 0.35) * 160} y={1200 - L + c(t * 0.6) * 30} w={1000} h={480 + L} color={cols[1]} blur={140} o={0.5} />
      <Blob x={960 + s(t * 0.25) * 260} y={1220 - L * 0.6} w={900} h={360} color={cols[2]} blur={110} o={0.6} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(243,246,246,.9) 0%, rgba(243,246,246,0) 55%)'}} />
      <Grain o={0.035} />
    </AbsoluteFill>
  );
};

// The light pillar that rises, then splits into three ribbons twisting upward.
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
        <linearGradient id="pl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={CY} stopOpacity=".9" /><stop offset=".6" stopColor={GR} stopOpacity=".55" /><stop offset="1" stopColor={SKY} stopOpacity="0" /></linearGradient>
        <filter id="pb"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {[0, 1, 2].map((k) => <path key={k} d={ribbon(k)} fill="none" stroke="url(#pl)" strokeWidth={split > 0.05 ? 34 : 46} strokeLinecap="round" opacity={k === 0 ? 0.8 : 0.55 * Math.min(1, split * 3)} filter="url(#pb)" />)}
    </svg>
  );
};

// Soft wipe-in: the phrase appears left to right through a blurred mask, the way the reference reveals text.
export const Reveal: React.FC<{at: number; dur?: number; out?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, dur = 16, out, children, style}) => {
  const f = useF();
  const p = prog(f, at, dur, E.inOut);
  const o = out === undefined ? 0 : prog(f, out, 10, E.inOut);
  const a = -30 + p * 160;
  return (
    <div style={{WebkitMaskImage: `linear-gradient(90deg, #000 ${a - 30}%, transparent ${a}%)`, maskImage: `linear-gradient(90deg, #000 ${a - 30}%, transparent ${a}%)`, filter: `blur(${(1 - p) * 4 + o * 10}px)`, opacity: 1 - o, ...style}}>{children}</div>
  );
};
export const Say: React.FC<{size: number; color?: string; grad?: boolean; weight?: number; children: React.ReactNode}> = ({size, color = INK, grad, weight = 600, children}) => (
  <span style={{fontFamily: F.display, fontSize: size, fontWeight: weight, letterSpacing: '-0.035em', lineHeight: 1.08, whiteSpace: 'pre', ...(grad ? {backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'} : {color})}}>{children}</span>
);
export const Center: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 0}) => (
  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${y}px)`}}>{children}</div>
);
// Card floating on light: a white halo around it.
export const glow = (k = 1): React.CSSProperties => ({boxShadow: `0 0 0 ${6 * k}px rgba(255,255,255,.35), 0 0 ${70 * k}px ${12 * k}px rgba(255,255,255,.55), 0 30px 60px -30px rgba(4,63,69,.45)`});
