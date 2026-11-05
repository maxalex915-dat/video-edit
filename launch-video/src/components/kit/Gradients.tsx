import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// A family of living gradient grounds, all from the brand palette
// (green #7fbc42, cyan #00b9ef, light blue #70cbf3, reality blue #509cd5, teal #055e63),
// in the styles trending on Pinterest: mesh, aurora, conic swirl, grainy duotone, spotlight,
// holographic pastel, liquid blobs, soft bands, sunrise, lime pop.
export type GradKind = 'mesh' | 'aurora' | 'conic' | 'sunrise' | 'duo' | 'holo' | 'spot' | 'bands' | 'liquid' | 'lime' | 'pearl' | 'blueprint' | 'deep';
export const DARK: GradKind[] = ['aurora', 'spot', 'duo', 'blueprint', 'deep'];
export const VIVID: GradKind[] = ['mesh', 'conic', 'bands', 'lime'];
// which text style a ground takes: 'grad' = white text, 'white' = ink + gradient text
export const textOn = (k: GradKind): 'grad' | 'white' => ([...DARK, ...VIVID] as GradKind[]).includes(k) ? 'grad' : 'white';

const G = '#7fbc42', CY = '#00b9ef', SK = '#70cbf3', RB = '#509cd5', T = '#055e63';
const b = (x: number, y: number, w: number, h: number, c: string, stop = 70) => `radial-gradient(${w}px ${h}px at ${x}% ${y}%, ${c}, transparent ${stop}%)`;

const GrainLayer: React.FC<{o: number}> = ({o}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: o, mixBlendMode: 'overlay'}}>
      <svg width="100%" height="100%"><filter id="gg"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 9} /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#gg)" /></svg>
    </AbsoluteFill>
  );
};

export const Ground: React.FC<{kind: GradKind; t?: number}> = ({kind, t: tt}) => {
  const f = useCurrentFrame();
  const t = (tt ?? f) / 30, s = Math.sin, c = Math.cos;
  let bg: React.ReactNode = null, grain = 0.06;
  switch (kind) {
    case 'mesh':
      bg = <AbsoluteFill style={{background: `${b(15 + s(t * .4) * 8, 20, 1100, 900, G)}, ${b(85, 15 + c(t * .3) * 8, 1000, 900, SK)}, ${b(70 + c(t * .35) * 8, 90, 1100, 800, RB)}, ${b(20, 95, 900, 700, CY)}, ${CY}`}} />;
      break;
    case 'aurora':
      bg = (
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #03161a, #052a2f 60%, #073a3c)'}}>
          {[G, CY, SK].map((col, i) => <div key={i} style={{position: 'absolute', left: -300, width: 2600, top: 120 + i * 190 + s(t * .6 + i * 2) * 70, height: 240, filter: 'blur(70px)', opacity: 0.75, transform: `rotate(${-14 + i * 9 + s(t * .3 + i) * 4}deg)`, background: `linear-gradient(90deg, transparent, ${col}, transparent 80%)`}} />)}
        </AbsoluteFill>
      );
      grain = 0.08;
      break;
    case 'conic':
      bg = (
        <AbsoluteFill style={{background: CY, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: -400, top: -800, width: 2720, height: 2720, filter: 'blur(60px)', transform: `rotate(${t * 8}deg)`, background: `conic-gradient(from 0deg, ${G}, #0a8b84, ${CY}, ${SK}, ${RB}, ${CY}, ${G})`}} />
          <AbsoluteFill style={{background: b(50, 45, 900, 700, 'rgba(255,255,255,.35)')}} />
        </AbsoluteFill>
      );
      break;
    case 'sunrise':
      bg = <AbsoluteFill style={{background: `${b(50, 115 + s(t * .4) * 4, 1700, 900, 'rgba(0,185,239,.75)', 60)}, ${b(30, 110, 1100, 700, 'rgba(127,188,66,.7)', 60)}, linear-gradient(180deg, #ffffff 30%, #eef8fb)`}} />;
      grain = 0.04;
      break;
    case 'duo':
      bg = <AbsoluteFill style={{background: `${b(85 + s(t * .3) * 6, 90, 1300, 1000, 'rgba(0,185,239,.95)')}, ${b(10, 0, 1000, 800, 'rgba(127,188,66,.55)')}, linear-gradient(145deg, ${T}, #0a7f8a 55%, ${CY})`}} />;
      grain = 0.14;
      break;
    case 'holo':
      bg = <AbsoluteFill style={{background: `${b(20 + s(t * .4) * 10, 25, 1000, 800, 'rgba(112,203,243,.65)')}, ${b(80, 30 + c(t * .3) * 10, 900, 800, 'rgba(200,236,190,.9)')}, ${b(60, 90, 1100, 700, 'rgba(206,222,255,.9)')}, ${b(10, 85, 800, 600, 'rgba(180,240,230,.8)')}, #f7fbff`}} />;
      grain = 0.05;
      break;
    case 'spot':
      bg = (
        <AbsoluteFill style={{background: '#031417'}}>
          <div style={{position: 'absolute', left: 960 - 900 + s(t * .4) * 120, top: -500, width: 1800, height: 1700, filter: 'blur(40px)', background: `conic-gradient(from 160deg at 50% 0%, transparent 0deg, rgba(0,185,239,.45) 20deg, rgba(112,203,243,.25) 30deg, rgba(127,188,66,.3) 40deg, transparent 60deg)`}} />
          <AbsoluteFill style={{background: b(50, 105, 1400, 600, 'rgba(0,185,239,.35)')}} />
        </AbsoluteFill>
      );
      grain = 0.1;
      break;
    case 'bands':
      bg = (
        <AbsoluteFill style={{background: G, overflow: 'hidden'}}>
          {[G, '#0a8b84', G, CY, G, '#0a8b84'].map((col, i) => <div key={i} style={{position: 'absolute', left: -800 + i * 520 + ((t * 40) % 520), top: -400, width: 520, height: 2000, transform: 'rotate(24deg)', background: col, filter: 'blur(70px)'}} />)}
        </AbsoluteFill>
      );
      break;
    case 'liquid':
      bg = (
        <AbsoluteFill style={{background: '#fbfdfd', overflow: 'hidden'}}>
          {[[78, 10, 760, G], [92, 70, 680, CY], [60, 105, 600, SK]].map(([x, y, r, col], i) => (
            <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: r as number, height: (r as number) * 0.85, marginLeft: -(r as number) / 2, marginTop: -(r as number) / 2, background: col as string, filter: 'blur(50px)', opacity: 0.85, borderRadius: `${45 + s(t + i) * 10}% ${55 + c(t * .8 + i) * 10}% ${50 + s(t * .6 + i) * 12}% ${48 + c(t + i) * 10}%`, transform: `rotate(${t * 10 + i * 40}deg)`}} />
          ))}
        </AbsoluteFill>
      );
      grain = 0.04;
      break;
    case 'lime':
      bg = <AbsoluteFill style={{background: `${b(25 + s(t * .4) * 8, 30, 1300, 1000, '#a6d65a')}, ${b(90, 90, 1100, 900, 'rgba(0,185,239,.95)')}, linear-gradient(135deg, ${G}, #3fb88a 50%, ${CY})`}} />;
      break;
    case 'blueprint':
      bg = (
        <AbsoluteFill style={{background: `${b(85, 10 + s(t * .3) * 6, 1200, 900, 'rgba(112,203,243,.85)')}, ${b(10, 100, 1000, 800, 'rgba(0,185,239,.55)')}, linear-gradient(150deg, #1d3a8a, #2f63b8 50%, #3f8fd6)`}}>
          <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)', backgroundSize: '64px 64px', backgroundPosition: `${t * 8}px ${t * 4}px`}} />
        </AbsoluteFill>
      );
      grain = 0.08;
      break;
    case 'deep':
      bg = <AbsoluteFill style={{background: `${b(90 + s(t * .3) * 5, 95, 1300, 1000, 'rgba(127,188,66,.95)')}, ${b(55, 120, 1100, 700, 'rgba(0,185,239,.7)')}, linear-gradient(160deg, #032a2d, #055e63 55%, #0a8b84)`}} />;
      grain = 0.1;
      break;
    case 'pearl':
      bg = <AbsoluteFill style={{background: `${b(100, 0, 1100, 800, 'rgba(0,185,239,.4)')}, ${b(0, 100, 1000, 800, 'rgba(127,188,66,.38)')}, #fbfdfd`}} />;
      grain = 0.03;
      break;
  }
  return <AbsoluteFill>{bg}<GrainLayer o={grain} /></AbsoluteFill>;
};
