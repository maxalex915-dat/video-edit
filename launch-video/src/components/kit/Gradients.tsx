import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// One palette only: the Archetype brand gradient (green #7fbc42, cyan #00b9ef, light blue #70cbf3) and white.
// Variety comes from pattern and texture, never from new colours or dark grounds (Dat, 5 Nov).
export type GradKind =
  | 'fluted' | 'mesh' | 'waves' | 'dots' | 'topo' | 'grain' | 'grid3d' | 'bokeh' | 'lines' | 'glass' | 'rings' // on the gradient
  | 'pearl' | 'sunrise' | 'liquid' | 'whitegrid' | 'whiterings'; // on white
const WHITE: GradKind[] = ['pearl', 'sunrise', 'liquid', 'whitegrid', 'whiterings'];
export const textOn = (k: GradKind): 'grad' | 'white' => (WHITE.includes(k) ? 'white' : 'grad');

const G = '#7fbc42', CY = '#00b9ef', SK = '#70cbf3';
const ramp = (deg: number) => `linear-gradient(${deg}deg, ${G} 0%, ${CY} 45%, ${SK} 100%)`;
const b = (x: number, y: number, w: number, h: number, c: string, stop = 70) => `radial-gradient(${w}px ${h}px at ${x}% ${y}%, ${c}, transparent ${stop}%)`;

const Grain: React.FC<{o: number; freq?: number}> = ({o, freq = 0.85}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: o, mixBlendMode: 'overlay'}}>
      <svg width="100%" height="100%"><filter id={`gn${freq}`}><feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={f % 9} /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter={`url(#gn${freq})`} /></svg>
    </AbsoluteFill>
  );
};

export const Ground: React.FC<{kind: GradKind; t?: number}> = ({kind, t: tt}) => {
  const f = useCurrentFrame();
  const t = (tt ?? f) / 30, s = Math.sin, c = Math.cos;
  const base = (deg: number) => <AbsoluteFill style={{background: ramp(deg + s(t * 0.3) * 6)}} />;
  const W = (o: number) => `rgba(255,255,255,${o})`;
  switch (kind) {
    case 'fluted': // reeded glass: vertical flutes refracting the ramp
      return (
        <AbsoluteFill>
          {base(120)}
          <AbsoluteFill style={{backgroundImage: `repeating-linear-gradient(90deg, ${W(0.22)} 0px, ${W(0)} 18px, rgba(0,60,80,.06) 34px, ${W(0.22)} 40px)`, backgroundPosition: `${t * 10}px 0`}} />
          <AbsoluteFill style={{background: b(30, 30, 1100, 800, W(0.25))}} />
          <Grain o={0.05} />
        </AbsoluteFill>
      );
    case 'mesh': // the three brand colours as moving blobs
      return (
        <AbsoluteFill style={{background: `${b(15 + s(t * .4) * 10, 25, 1100, 900, G)}, ${b(85, 20 + c(t * .3) * 10, 1100, 900, SK)}, ${b(55 + c(t * .35) * 10, 95, 1200, 800, CY)}, ${CY}`}}><Grain o={0.05} /></AbsoluteFill>
      );
    case 'waves': // flowing white contour waves
      return (
        <AbsoluteFill>
          {base(160)}
          <svg width="1920" height="1080" style={{position: 'absolute'}}>
            {Array.from({length: 22}).map((_, i) => {
              let d = '';
              for (let x = -20; x <= 1960; x += 40) {const y = 640 + i * 22 + s(x / 260 + t * 0.8 + i * 0.25) * (60 + i * 3) + c(x / 520 - t * 0.4) * 40; d += `${x === -20 ? 'M' : 'L'}${x},${y} `;}
              return <path key={i} d={d} fill="none" stroke={W(0.10 + (i % 4 === 0 ? 0.12 : 0))} strokeWidth="1.6" />;
            })}
          </svg>
          <Grain o={0.05} />
        </AbsoluteFill>
      );
    case 'dots': // halftone dots, growing toward one corner
      return (
        <AbsoluteFill>
          {base(110)}
          <svg width="1920" height="1080" style={{position: 'absolute'}}>
            {Array.from({length: 24 * 14}).map((_, k) => {const i = k % 24, j = Math.floor(k / 24); const x = i * 84 + 20, y = j * 84 + 20; const d = Math.hypot(x - 1920, y - 1080) / 2200; const r = Math.max(0, (1 - d) * 16 + s(t + i * 0.3 + j * 0.2) * 1.5); return <circle key={k} cx={x} cy={y} r={r} fill={W(0.28)} />;})}
          </svg>
        </AbsoluteFill>
      );
    case 'topo': // topographic contour rings
      return (
        <AbsoluteFill>
          {base(135)}
          <svg width="1920" height="1080" style={{position: 'absolute'}}>
            {Array.from({length: 18}).map((_, i) => {
              const r0 = 60 + i * 70; let d = '';
              for (let a = 0; a <= 64; a++) {const th = (a / 64) * Math.PI * 2; const r = r0 + s(th * 3 + i * 0.6 + t * 0.5) * 22 + c(th * 5 - t * 0.3) * 12; d += `${a ? 'L' : 'M'}${1500 + Math.cos(th) * r},${300 + Math.sin(th) * r * 0.8} `;}
              return <path key={i} d={d + 'Z'} fill="none" stroke={W(0.2)} strokeWidth="1.5" />;
            })}
          </svg>
          <Grain o={0.05} />
        </AbsoluteFill>
      );
    case 'grain': // heavy grain gradient, the risograph look
      return (
        <AbsoluteFill style={{background: `${b(20 + s(t * .4) * 8, 20, 1100, 900, G)}, ${b(90, 90, 1100, 900, SK)}, ${ramp(140)}`}}><Grain o={0.22} freq={0.95} /></AbsoluteFill>
      );
    case 'grid3d': // perspective grid floor, light horizon
      return (
        <AbsoluteFill style={{overflow: 'hidden'}}>
          {base(180)}
          <div style={{position: 'absolute', left: -600, right: -600, top: 560, height: 1400, transform: 'perspective(800px) rotateX(72deg)', transformOrigin: 'top', backgroundImage: `linear-gradient(${W(0.35)} 2px, transparent 2px), linear-gradient(90deg, ${W(0.35)} 2px, transparent 2px)`, backgroundSize: '120px 120px', backgroundPosition: `0 ${t * 60}px`, maskImage: 'linear-gradient(180deg, transparent, black 40%)'}} />
          <AbsoluteFill style={{background: b(50, 52, 1600, 260, W(0.45))}} />
        </AbsoluteFill>
      );
    case 'bokeh': // soft white light discs drifting
      return (
        <AbsoluteFill>
          {base(150)}
          {Array.from({length: 16}).map((_, i) => {const r = 40 + ((i * 37) % 120); return <div key={i} style={{position: 'absolute', left: ((i * 263) % 1920) + s(t * 0.3 + i) * 40, top: ((i * 151) % 1080) + c(t * 0.25 + i) * 30, width: r * 2, height: r * 2, borderRadius: '50%', background: W(0.08 + (i % 3) * 0.05), filter: `blur(${(i % 3) * 3}px)`, border: `1px solid ${W(0.25)}`}} />;})}
          <Grain o={0.04} />
        </AbsoluteFill>
      );
    case 'lines': // fine diagonal pinstripes with a moving light band
      return (
        <AbsoluteFill>
          {base(100)}
          <AbsoluteFill style={{backgroundImage: `repeating-linear-gradient(-35deg, ${W(0.14)} 0px, ${W(0.14)} 1.5px, transparent 1.5px, transparent 26px)`}} />
          <AbsoluteFill style={{background: `linear-gradient(115deg, transparent ${30 + s(t * 0.5) * 20}%, ${W(0.25)} ${42 + s(t * 0.5) * 20}%, transparent ${54 + s(t * 0.5) * 20}%)`}} />
        </AbsoluteFill>
      );
    case 'glass': // frosted glass ribbons floating over the ramp
      return (
        <AbsoluteFill style={{overflow: 'hidden'}}>
          {base(125)}
          {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: -300 + i * 500, top: -200 + i * 120, width: 900, height: 1500, borderRadius: 450, transform: `rotate(${35 + i * 8 + s(t * 0.3 + i) * 4}deg)`, background: `linear-gradient(90deg, ${W(0.22)}, ${W(0.04)})`, border: `1px solid ${W(0.35)}`, backdropFilter: 'blur(20px)'}} />)}
          <Grain o={0.05} />
        </AbsoluteFill>
      );
    case 'rings': // concentric rings pulsing out from the centre
      return (
        <AbsoluteFill style={{overflow: 'hidden'}}>
          {base(145)}
          {Array.from({length: 10}).map((_, i) => {const r = ((i * 150 + t * 70) % 1500) + 60; return <div key={i} style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `2px solid ${W(0.4 * (1 - r / 1560))}`}} />;})}
          <AbsoluteFill style={{background: b(50, 50, 900, 700, W(0.3))}} />
        </AbsoluteFill>
      );
    case 'pearl':
      return <AbsoluteFill style={{background: `${b(100, 0, 1200, 900, 'rgba(0,185,239,.45)')}, ${b(0, 100, 1100, 900, 'rgba(127,188,66,.42)')}, #fbfdfd`}}><Grain o={0.03} /></AbsoluteFill>;
    case 'sunrise':
      return <AbsoluteFill style={{background: `${b(50, 115 + s(t * .4) * 4, 1800, 950, 'rgba(0,185,239,.8)', 60)}, ${b(25, 110, 1100, 700, 'rgba(127,188,66,.75)', 60)}, ${b(80, 110, 900, 600, 'rgba(112,203,243,.8)', 60)}, #ffffff`}} />;
    case 'liquid':
      return (
        <AbsoluteFill style={{background: '#fbfdfd', overflow: 'hidden'}}>
          {[[82, 12, 760, G], [95, 70, 700, CY], [65, 108, 620, SK]].map(([x, y, r, col], i) => (
            <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: r as number, height: (r as number) * 0.85, marginLeft: -(r as number) / 2, marginTop: -(r as number) / 2, background: col as string, filter: 'blur(50px)', opacity: 0.85, borderRadius: `${45 + s(t + i) * 10}% ${55 + c(t * .8 + i) * 10}% ${50 + s(t * .6 + i) * 12}% ${48 + c(t + i) * 10}%`, transform: `rotate(${t * 10 + i * 40}deg)`}} />
          ))}
        </AbsoluteFill>
      );
    case 'whitegrid':
      return (
        <AbsoluteFill style={{background: '#ffffff'}}>
          <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(0,185,239,.35) 1.6px, transparent 1.8px)', backgroundSize: '30px 30px', backgroundPosition: `${t * 8}px 0`, maskImage: 'linear-gradient(180deg, transparent 20%, black 100%)'}} />
          <AbsoluteFill style={{background: `${b(85, 100, 1000, 600, 'rgba(127,188,66,.45)')}, ${b(15, 100, 1000, 600, 'rgba(0,185,239,.45)')}`}} />
        </AbsoluteFill>
      );
    case 'whiterings':
      return (
        <AbsoluteFill style={{background: '#ffffff', overflow: 'hidden'}}>
          <AbsoluteFill style={{background: `${b(100, 50, 1100, 1100, 'rgba(0,185,239,.4)')}, ${b(100, 100, 800, 700, 'rgba(127,188,66,.4)')}`}} />
          {Array.from({length: 9}).map((_, i) => {const r = ((i * 140 + t * 60) % 1260) + 80; return <div key={i} style={{position: 'absolute', left: 1920 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `2px solid rgba(0,185,239,${0.3 * (1 - r / 1340)})`}} />;})}
        </AbsoluteFill>
      );
  }
};
