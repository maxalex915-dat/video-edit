import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, prog, spr, S, E, F, Cue} from '../v3/util';

// "See all your marketing in one view": text typed along the glowing planet horizon (second reference, 0:47).
// The eye of the second reference (0:47): it rises behind the planet and looks around.
const Eye: React.FC<{f: number}> = ({f}) => {
  const up = spr(f, 2, S.soft);
  const R = 420, cy = 600 + (1 - Math.min(1, up)) * 520;
  const look = (a: number, b: number, at: number) => prog(f, at, 10, E.snappy) * (b - a);
  const px = -170 + look(-170, 160, 40) + look(160, -20, 64), py = -150 + look(-150, -110, 40) + look(-110, -210, 64);
  return (
    <div style={{position: 'absolute', left: 960 - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', background: 'linear-gradient(160deg, #f2fbff, #bfeefc 60%, #8fd8f2)', boxShadow: '0 0 80px rgba(0,185,239,.35)'}}>
      <div style={{position: 'absolute', inset: 40, borderRadius: '50%', background: 'radial-gradient(circle at 50% 30%, #0d2a33 0%, #061418 70%)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: R - 40 + px - 128, top: R - 40 + py - 128, width: 256, height: 256, borderRadius: '50%', background: '#eaf8fd'}} />
      </div>
    </div>
  );
};
const TXT = 'All platform analytics. In one place. Automated.';
export const hzsfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...Array.from({length: 12}).map((_, i) => ({at: 6 + i * 3, s: `key${i % 4}`, v: 0.14}))];
export const HorizonScene: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const n = Math.max(0, Math.floor(((f - 6) / 30) * 24));
  const rise = prog(f, 0, 30, E.snappy);
  const up = prog(f, dur - 16, 16, E.inOut);
  return (
    <AbsoluteFill style={{background: '#021015'}}>
      <AbsoluteFill style={{transform: `translateY(${(1 - rise) * 120 + up * -260}px) scale(${1 + up * 0.15})`}}>
        <Ground kind="horizon" behind={<Eye f={f} />} />
        <svg width="1920" height="1080" style={{position: 'absolute'}}>
          <defs>
            <path id="arc" d="M 200 900 Q 960 690 1720 900" />
            <linearGradient id="hzg" x1="0" x2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="0.45" stopColor="#c6f0a0" /><stop offset="1" stopColor="#7fd8ff" /></linearGradient>
          </defs>
          <text fontFamily="Inter Display" fontWeight="600" fontSize="62" letterSpacing="-1.2" fill="url(#hzg)" style={{filter: 'drop-shadow(0 2px 14px rgba(0,185,239,.45))'}}>
            <textPath href="#arc" startOffset="50%" textAnchor="middle">{TXT.slice(0, n)}{f >= 6 && Math.floor(f / 8) % 2 === 0 && n < TXT.length + 10 ? '|' : ''}</textPath>
          </text>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: up * 0}} />
      <span style={{display: 'none', fontFamily: F.text}} />
    </AbsoluteFill>
  );
};
