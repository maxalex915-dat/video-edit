import React from 'react';
import {F} from '../theme/fonts';
import {GR, CY, SKY, INK} from './Look';

// A large score dial: a 270-degree arc in the brand gradient that sweeps to the score while the number counts up.
export const Dial: React.FC<{v: number; p: number; size: number; label: string; id: string}> = ({v, p, size, label, id}) => {
  const r = size / 2 - 34, cx = size / 2, cy = size / 2;
  const a0 = 135, span = 270;
  const pt = (deg: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
  const arc = (from: number, to: number) => {
    const [x0, y0] = pt(from), [x1, y1] = pt(to);
    return `M ${x0} ${y0} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1} ${y1}`;
  };
  const end = a0 + span * (v / 100) * p;
  const [hx, hy] = pt(end);
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} style={{position: 'absolute', overflow: 'visible'}}>
        <defs>
          <linearGradient id={`dg${id}`} x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={GR} /><stop offset=".55" stopColor={CY} /><stop offset="1" stopColor={SKY} /></linearGradient>
          <filter id={`dgl${id}`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>
        {/* glass track with ticks */}
        <path d={arc(a0, a0 + span)} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={46} strokeLinecap="round" />
        <path d={arc(a0, a0 + span)} fill="none" stroke="rgba(16,36,42,.06)" strokeWidth={46} strokeLinecap="round" />
        {Array.from({length: 28}).map((_, i) => {
          const d = a0 + (span * i) / 27, [x0, y0] = pt(d);
          const k = (r - 44) / r;
          return <line key={i} x1={x0} y1={y0} x2={cx + (x0 - cx) * k} y2={cy + (y0 - cy) * k} stroke="rgba(16,36,42,.14)" strokeWidth={i % 9 === 0 ? 3 : 1.5} transform={`translate(${(cx - x0) * 0.12}, ${(cy - y0) * 0.12})`} />;
        })}
        {p > 0.005 && <>
          <path d={arc(a0, end)} fill="none" stroke={`url(#dg${id})`} strokeWidth={46} strokeLinecap="round" filter={`url(#dgl${id})`} opacity={0.55} />
          <path d={arc(a0, end)} fill="none" stroke={`url(#dg${id})`} strokeWidth={46} strokeLinecap="round" />
          <circle cx={hx} cy={hy} r={15} fill="#fff" />
        </>}
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, color: INK}}>
        <div style={{fontSize: size * 0.3, fontWeight: 650, letterSpacing: '-0.05em', lineHeight: 1, fontVariantNumeric: 'tabular-nums'}}>{Math.round(v * p)}</div>
        <div style={{fontSize: size * 0.055, fontWeight: 600, color: '#5b6f74', marginTop: size * 0.03, letterSpacing: '-0.01em'}}>{label}</div>
      </div>
    </div>
  );
};
