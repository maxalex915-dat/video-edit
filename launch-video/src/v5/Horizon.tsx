import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, prog, spr, S, E, Cue} from '../v3/util';

// "All platform analytics. In one place. Automated.": the eye of the second reference (0:47) rises behind a light planet
// and looks around while the line types along the planet's curve. Light version: no dark grounds (Dat, 9 Nov).
const LOOP = 'linear-gradient(135deg, #7fbc42 0%, #00b9ef 45%, #70cbf3 100%)';
const Eye: React.FC<{f: number}> = ({f}) => {
  const up = spr(f, 2, S.soft);
  const R = 420, cy = 600 + (1 - Math.min(1, up)) * 520;
  const look = (a: number, b: number, at: number) => prog(f, at, 10, E.snappy) * (b - a);
  const px = -170 + look(-170, 160, 40) + look(160, -20, 64), py = -150 + look(-150, -110, 40) + look(-110, -210, 64);
  return (
    <div style={{position: 'absolute', left: 960 - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', background: LOOP, boxShadow: '0 0 90px rgba(0,185,239,.35)'}}>
      <div style={{position: 'absolute', inset: 38, borderRadius: '50%', background: 'radial-gradient(circle at 50% 30%, #ffffff 0%, #eaf8fe 60%, #d3f0fb 100%)', boxShadow: 'inset 0 10px 40px rgba(0,120,160,.18)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: R - 38 + px - 128, top: R - 38 + py - 128, width: 256, height: 256, borderRadius: '50%', background: LOOP, boxShadow: '0 20px 50px -10px rgba(0,140,190,.5)'}} />
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
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateY(${(1 - rise) * 120 + up * -260}px) scale(${1 + up * 0.15})`}}>
        <Eye f={f} />
        <div style={{position: 'absolute', left: -480, top: 620, width: 2880, height: 2880, borderRadius: '50%', background: 'radial-gradient(circle at 50% 3%, #ffffff 0%, #f1fafe 18%, #dff3fb 40%)', boxShadow: '0 -20px 90px 6px rgba(0,185,239,.35), 0 -4px 24px 2px rgba(127,188,66,.35)', border: '2px solid rgba(255,255,255,.95)'}} />
        <svg width="1920" height="1080" style={{position: 'absolute'}}>
          <defs>
            <path id="arc" d="M 200 900 Q 960 690 1720 900" />
            <linearGradient id="hzg" x1="0" x2="1"><stop offset="0" stopColor="#10242a" /><stop offset="0.38" stopColor="#10242a" /><stop offset="0.55" stopColor="#5aa832" /><stop offset="1" stopColor="#00a6d9" /></linearGradient>
          </defs>
          <text fontFamily="Inter Display" fontWeight="600" fontSize="62" letterSpacing="-1.2" fill="url(#hzg)">
            <textPath href="#arc" startOffset="50%" textAnchor="middle">{TXT.slice(0, n)}{f >= 6 && Math.floor(f / 8) % 2 === 0 && n < TXT.length + 10 ? '|' : ''}</textPath>
          </text>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
