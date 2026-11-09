import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Bare, NoGround} from '../../frame';

// One palette only: the Archetype brand gradient (green #7fbc42, cyan #00b9ef, light blue #70cbf3) and white.
// Variety comes from pattern and texture, never from new colours or dark grounds (Dat, 5 Nov).
export type GradKind =
  | 'silk' | 'fluted' | 'mesh' | 'waves' | 'dots' | 'topo' | 'grain' | 'grid3d' | 'bokeh' | 'lines' | 'glass' | 'rings' // on the gradient
  | 'pearl' | 'sunrise' | 'liquid' | 'whitegrid' | 'whiterings' | 'glow' | 'field' | 'ai' | 'haze' | 'haze2' | 'haze3' | 'night' | 'horizon'; // on white (field is the brand field)
const WHITE: GradKind[] = ['pearl', 'sunrise', 'liquid', 'whitegrid', 'whiterings', 'glow', 'ai'];
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

// v6 look (second reference): every ground becomes either a light grainy haze or a deep night lit by brand aurora.
const REMAP: Partial<Record<GradKind, GradKind>> = {
  glow: 'haze', pearl: 'haze2', sunrise: 'haze3', liquid: 'haze2', whitegrid: 'haze', whiterings: 'haze3',
  field: 'haze2', dots: 'haze', topo: 'haze3', grain: 'haze', grid3d: 'haze2', bokeh: 'haze3', lines: 'haze', waves: 'haze2', mesh: 'haze3', silk: 'haze', fluted: 'haze2', glass: 'haze3', rings: 'haze', night: 'haze2', horizon: 'haze',
};
// four-point sparkles that twinkle, placed deterministically
export const Sparkles: React.FC<{t: number; n: number; dark: boolean}> = ({t, n, dark}) => (
  <AbsoluteFill>
    {Array.from({length: n}).map((_, i) => {
      const tw = Math.max(0, Math.sin(t * 1.4 + i * 2.1));
      const x = (i * 337 + 140) % 1820 + 50, y = (i * 211 + 90) % 980 + 40, sz = 10 + (i % 3) * 7;
      return (
        <svg key={i} width={sz * 2} height={sz * 2} viewBox="-1 -1 2 2" style={{position: 'absolute', left: x, top: y, opacity: tw * (dark ? 0.9 : 0.55), transform: `rotate(${(i % 2) * 45}deg) scale(${0.6 + tw * 0.5})`}}>
          <path d="M0,-1 Q0.08,-0.08 1,0 Q0.08,0.08 0,1 Q-0.08,0.08 -1,0 Q-0.08,-0.08 0,-1Z" fill={dark ? (i % 2 ? '#a8e4ff' : '#c6f0a0') : (i % 2 ? '#00b9ef' : '#7fbc42')} />
        </svg>
      );
    })}
  </AbsoluteFill>
);
export const Ground: React.FC<{kind: GradKind; t?: number; behind?: React.ReactNode}> = (p) => (React.useContext(Bare) || React.useContext(NoGround) ? null : <Ground0 {...p} />);
export const GroundRaw: React.FC<{kind: GradKind; t?: number; behind?: React.ReactNode}> = (p) => <Ground0 {...p} />;
const Ground0: React.FC<{kind: GradKind; t?: number; behind?: React.ReactNode}> = ({kind: k0, t: tt, behind}) => {
  const kind = REMAP[k0] ?? k0;
  const f = useCurrentFrame();
  const t = (tt ?? f) / 30, s = Math.sin, c = Math.cos;
  const base = (deg: number) => <AbsoluteFill style={{background: ramp(deg + s(t * 0.3) * 6)}} />;
  const W = (o: number) => `rgba(255,255,255,${o})`;
  switch (kind) {
    case 'silk': { // satin ribbons of light folding slowly over the ramp
      const rib = (i: number) => {
        const y0 = 260 + i * 210, a = 140 + i * 30, ph = t * (0.35 + i * 0.07) + i * 1.7;
        let top = '', bot = '';
        for (let x = -100; x <= 2020; x += 60) {
          const y = y0 + Math.sin(x / 420 + ph) * a + Math.cos(x / 900 - ph * 0.6) * 60;
          const th = 70 + Math.sin(x / 300 + ph * 1.3) * 55;
          top += `${x === -100 ? 'M' : 'L'}${x},${y - th} `; bot = `L${x},${y + th} ` + bot;
        }
        return top + bot.replace(/^L/, 'L') + 'Z';
      };
      return (
        <AbsoluteFill style={{overflow: 'hidden'}}>
          {base(125)}
          <svg width="1920" height="1080" style={{position: 'absolute', filter: 'blur(26px)'}}>
            <defs>{[0, 1, 2].map((i) => <linearGradient key={i} id={`rb${i}`} x1="0" x2="1" y1="0" y2="0.3"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".45" stopColor="#fff" stopOpacity={0.42 - i * 0.08} /><stop offset="1" stopColor="#fff" stopOpacity="0.05" /></linearGradient>)}</defs>
            {[0, 1, 2].map((i) => <path key={i} d={rib(i)} fill={`url(#rb${i})`} />)}
          </svg>
          <AbsoluteFill style={{background: `radial-gradient(1200px 700px at 50% 0%, ${W(0.25)}, transparent 70%)`}} />
          <Grain o={0.035} />
        </AbsoluteFill>
      );
    }
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
    case 'glow': // the reference's ground: white, with brand light breathing in from the edges
      return (
        <AbsoluteFill style={{background: '#ffffff'}}>
          <AbsoluteFill style={{background: `${b(108 + s(t * .3) * 4, 105, 900, 700, 'rgba(0,185,239,.55)', 65)}, ${b(-6, 110 + c(t * .25) * 4, 800, 600, 'rgba(127,188,66,.45)', 65)}, ${b(104, -8, 700, 500, 'rgba(112,203,243,.45)', 65)}`}} />
          <svg width="1920" height="1080" style={{position: 'absolute', opacity: 0.35}}><circle cx={300 + s(t * .2) * 40} cy={-200} r={900} fill="none" stroke="rgba(0,150,200,.18)" strokeWidth="1.2" /><circle cx={1900} cy={1300 + c(t * .2) * 40} r={1000} fill="none" stroke="rgba(0,150,200,.15)" strokeWidth="1.2" /></svg>
        </AbsoluteFill>
      );
    case 'ai': // AI moment: soft orbs of the brand ramp drifting and breathing, a few sparkles
      return (
        <AbsoluteFill style={{background: '#f8fcfd', overflow: 'hidden'}}>
          {[[22, 30, 620, G, 0], [78, 26, 560, CY, 1.7], [62, 82, 680, SK, 3.1], [12, 86, 480, CY, 4.4], [90, 70, 420, G, 5.2]].map(([x, y, r, col, ph], i) => (
            <div key={i} style={{position: 'absolute', left: `${(x as number) + s(t * 0.5 + (ph as number)) * 7}%`, top: `${(y as number) + c(t * 0.42 + (ph as number)) * 7}%`, width: r as number, height: r as number, marginLeft: -(r as number) / 2, marginTop: -(r as number) / 2, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${col} 45%, transparent 72%)`, filter: 'blur(30px)', opacity: 0.55 + s(t * 0.9 + (ph as number)) * 0.15, transform: `scale(${1 + s(t * 0.7 + (ph as number)) * 0.08})`}} />
          ))}
          {Array.from({length: 14}).map((_, i) => {const tw = (s(t * 2 + i * 1.3) + 1) / 2; return <div key={`s${i}`} style={{position: 'absolute', left: (i * 277) % 1920, top: (i * 163 + 80) % 1080, width: 6, height: 6, borderRadius: 9, background: '#fff', boxShadow: '0 0 12px 4px rgba(0,185,239,.6)', opacity: tw * 0.8}} />;})}
        </AbsoluteFill>
      );
    case 'field': // full brand field, light at the top, saturated below (the reference's reveal ground)
      return (
        <AbsoluteFill style={{background: `linear-gradient(180deg, #4fc2ef 0%, #12b4ec 40%, #00a9e6 70%, #2f9fdc 100%)`}}>
          <AbsoluteFill style={{background: `${b(18 + s(t * .4) * 8, 85, 1100, 700, 'rgba(127,188,66,.75)', 70)}, ${b(85, 0, 900, 500, 'rgba(255,255,255,.35)', 70)}, ${b(60 + c(t * .3) * 10, 110, 1200, 600, 'rgba(0,140,220,.6)', 70)}`}} />
        </AbsoluteFill>
      );
    case 'haze': case 'haze2': case 'haze3': { // light: white, grainy, pastel brand haze breathing at the edges, a slow sheen
      const v = kind === 'haze' ? 0 : kind === 'haze2' ? 1 : 2;
      const sweep = ((t * 0.06 + v * 0.3) % 1.4) - 0.2;
      return (
        <AbsoluteFill style={{background: '#fdfeff', overflow: 'hidden'}}>
          <AbsoluteFill style={{background: `${b([88, 12, 80][v] + s(t * .25) * 5, [-5, 105, 110][v], 1100, 750, 'rgba(0,185,239,.30)', 65)}, ${b([5, 95, 10][v], [100, 0, 105][v] + c(t * .2) * 5, 1000, 700, 'rgba(127,188,66,.22)', 65)}, ${b(50 + s(t * .18) * 15, 50, 1300, 800, 'rgba(112,203,243,.16)', 70)}`}} />
          <AbsoluteFill style={{background: `linear-gradient(115deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,.55) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
          <Sparkles t={t} n={6} dark={false} />
          <Grain o={0.05} freq={0.9} />
        </AbsoluteFill>
      );
    }
    case 'night': case 'horizon': { // dark: deep teal night, aurora of the brand colours drifting, a green light streak, sparkles
      return (
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #021015 0%, #04212a 55%, #062f3a 100%)', overflow: 'hidden'}}>
          <AbsoluteFill style={{background: `${b(-5 + s(t * .3) * 6, 15, 900, 900, 'rgba(0,185,239,.55)', 65)}, ${b(105 + c(t * .25) * 5, 30, 900, 1000, 'rgba(112,203,243,.4)', 65)}, ${b(55 + s(t * .2) * 10, 115, 1400, 600, 'rgba(10,139,132,.55)', 65)}`}} />
          <div style={{position: 'absolute', left: `${30 + s(t * .22) * 10}%`, top: '-20%', width: 260, height: 1500, background: 'linear-gradient(180deg, transparent, rgba(127,188,66,.55), rgba(0,185,239,.25), transparent)', filter: 'blur(50px)', transform: `rotate(${32 + s(t * .3) * 6}deg)`}} />
          {kind === 'horizon' && <>
            {behind}
            <div style={{position: 'absolute', left: -480, top: 620, width: 2880, height: 2880, borderRadius: '50%', background: 'radial-gradient(circle at 50% 4%, #0a3a44 0%, #021015 25%)', boxShadow: '0 -30px 120px 10px rgba(0,185,239,.55), 0 -6px 30px 2px rgba(127,188,66,.6), inset 0 6px 14px rgba(112,203,243,.9)'}} />
          </>}
          <Sparkles t={t} n={10} dark />
          <Grain o={0.1} freq={0.9} />
        </AbsoluteFill>
      );
    }
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
