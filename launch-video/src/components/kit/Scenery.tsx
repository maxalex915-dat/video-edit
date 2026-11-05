import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../../theme/tokens';

// One living background per scene. Every variant moves on its own clock, so no frame is ever still.
export type SceneryKind = 'paper' | 'mint' | 'sky' | 'loop' | 'deep' | 'rings' | 'beams' | 'dots' | 'aurora' | 'stage';

const blob = (x: number, y: number, r: number, col: string) => `radial-gradient(${r}px ${r}px at ${x}% ${y}%, ${col}, transparent 70%)`;

export const Scenery: React.FC<{kind: SceneryKind; t?: number}> = ({kind, t: tt}) => {
  const f = useCurrentFrame();
  const t = (tt ?? f) / 30;
  const s = Math.sin, c = Math.cos;
  switch (kind) {
    case 'paper':
      return (
        <AbsoluteFill style={{background: '#fbfdfd'}}>
          <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(5,94,99,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,94,99,.06) 1px, transparent 1px)', backgroundSize: '60px 60px', backgroundPosition: `${t * 12}px ${t * 8}px`}} />
          <AbsoluteFill style={{background: `${blob(80 + s(t * .4) * 8, 20, 700, 'rgba(0,185,239,.12)')}, ${blob(15, 85 + c(t * .3) * 6, 600, 'rgba(127,188,66,.12)')}`}} />
        </AbsoluteFill>
      );
    case 'mint':
      return <AbsoluteFill style={{background: `${blob(20 + s(t * .5) * 10, 30, 900, 'rgba(127,188,66,.45)')}, ${blob(85, 75 + c(t * .4) * 10, 900, 'rgba(0,185,239,.25)')}, linear-gradient(160deg, #f4fbec, #e6f6f2)`}} />;
    case 'sky':
      return <AbsoluteFill style={{background: `${blob(75 + c(t * .4) * 10, 25, 1000, 'rgba(112,203,243,.6)')}, ${blob(10, 90, 800, 'rgba(0,185,239,.25)')}, linear-gradient(200deg, #eaf7fd, #f7fcff)`}} />;
    case 'loop':
      return (
        <AbsoluteFill style={{background: `linear-gradient(${135 + s(t * .6) * 12}deg, ${C.green} 0%, ${C.cyan} 45%, ${C.sky} 100%)`}}>
          <AbsoluteFill style={{background: `${blob(30 + s(t) * 15, 30, 900, 'rgba(255,255,255,.35)')}, ${blob(75, 80 + c(t * .8) * 10, 700, 'rgba(5,94,99,.25)')}`}} />
        </AbsoluteFill>
      );
    case 'deep':
      return (
        <AbsoluteFill style={{background: 'linear-gradient(135deg, #3f7a26 0%, #00647d 45%, #1f6d8a 100%)'}}>
          <AbsoluteFill style={{background: `${blob(20 + s(t * .5) * 15, 20, 900, 'rgba(127,188,66,.45)')}, ${blob(80, 80 + c(t * .6) * 12, 900, 'rgba(0,185,239,.45)')}`}} />
          <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,.14) 1.5px, transparent 1.6px)', backgroundSize: '36px 36px', backgroundPosition: `0 ${t * 20}px`, maskImage: 'linear-gradient(180deg, black, transparent)'}} />
        </AbsoluteFill>
      );
    case 'rings':
      return (
        <AbsoluteFill style={{background: '#f8fcfd'}}>
          {Array.from({length: 9}).map((_, i) => {
            const r = ((i * 160 + t * 90) % 1440) + 80;
            return <div key={i} style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `2px solid rgba(0,185,239,${0.28 * (1 - r / 1520)})`}} />;
          })}
          <AbsoluteFill style={{background: blob(50, 50, 700, 'rgba(112,203,243,.25)')}} />
        </AbsoluteFill>
      );
    case 'beams':
      return (
        <AbsoluteFill style={{background: 'linear-gradient(180deg, #f2fafb, #ffffff)', overflow: 'hidden'}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{position: 'absolute', left: -600 + i * 520 + ((t * 120) % 520), top: -400, width: 180, height: 2000, transform: 'rotate(28deg)', background: `linear-gradient(90deg, transparent, ${i % 2 ? 'rgba(127,188,66,.16)' : 'rgba(0,185,239,.16)'}, transparent)`}} />
          ))}
        </AbsoluteFill>
      );
    case 'dots':
      return (
        <AbsoluteFill style={{background: '#fafcfc'}}>
          <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(5,94,99,.18) 2px, transparent 2.2px)', backgroundSize: '40px 40px', backgroundPosition: `${t * -16}px 0`, maskImage: `radial-gradient(900px 600px at ${50 + s(t * .5) * 20}% 50%, black, transparent)`}} />
          <AbsoluteFill style={{background: blob(50 + s(t * .5) * 20, 50, 800, 'rgba(0,185,239,.14)')}} />
        </AbsoluteFill>
      );
    case 'aurora':
      return (
        <AbsoluteFill style={{background: '#f6fbfb', overflow: 'hidden'}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{position: 'absolute', left: -200, width: 2400, top: 200 + i * 220 + s(t * .7 + i) * 60, height: 260, filter: 'blur(60px)', transform: `rotate(${-8 + i * 6}deg)`, background: `linear-gradient(90deg, transparent, ${[C.green, C.cyan, C.sky][i]}55, transparent)`}} />
          ))}
        </AbsoluteFill>
      );
    case 'stage':
      return (
        <AbsoluteFill style={{background: 'radial-gradient(1400px 900px at 50% 30%, #ffffff, #e4eff1)'}}>
          <div style={{position: 'absolute', left: -400, right: -400, top: 620, height: 1400, transform: 'perspective(900px) rotateX(70deg)', transformOrigin: 'top', backgroundImage: 'linear-gradient(rgba(5,94,99,.14) 2px, transparent 2px), linear-gradient(90deg, rgba(5,94,99,.14) 2px, transparent 2px)', backgroundSize: '120px 120px', backgroundPosition: `0 ${t * 60}px`, maskImage: 'linear-gradient(180deg, black, transparent 70%)'}} />
        </AbsoluteFill>
      );
  }
};
