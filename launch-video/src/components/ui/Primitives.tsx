import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, LIFT, R} from '../../theme/tokens';
import {F} from '../../theme/fonts';

export type Platform = 'li' | 'fb' | 'ig' | 'yt' | 'web' | 'search' | 'email';
export const PLATFORM_NAME: Record<Platform, string> = {
  li: 'LinkedIn', fb: 'Facebook', ig: 'Instagram', yt: 'YouTube', web: 'Website', search: 'Search', email: 'Email',
};

// Platform tile in the dashboard's style: colour square, simple white glyph.
export const PlatformIcon: React.FC<{p: Platform; size?: number; style?: React.CSSProperties}> = ({p, size = 64, style}) => {
  const bg =
    p === 'ig' ? 'linear-gradient(135deg,#f77737 0%,#e1306c 45%,#833ab4 100%)' : ({li: C.li, fb: C.fb, yt: C.yt, web: C.web, search: C.search, email: C.email} as Record<string, string>)[p];
  const s = {fill: 'none', stroke: '#fff', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
  const glyph: Record<Platform, React.ReactNode> = {
    li: <text x="12" y="17.5" textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize="13" fill="#fff">in</text>,
    fb: <text x="12.6" y="19" textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize="17" fill="#fff">f</text>,
    ig: <g {...s}><rect x="5" y="5" width="14" height="14" rx="4.2" /><circle cx="12" cy="12" r="3.3" /><circle cx="16.3" cy="7.7" r=".6" fill="#fff" /></g>,
    yt: <path d="M10 8.6v6.8l5.8-3.4z" fill="#fff" />,
    web: <g {...s}><circle cx="12" cy="12" r="7" /><path d="M5 12h14M12 5c2.2 2.2 2.2 11.8 0 14M12 5c-2.2 2.2-2.2 11.8 0 14" /></g>,
    search: <g {...s}><circle cx="11" cy="11" r="5" /><path d="m15 15 4 4" /></g>,
    email: <g {...s}><rect x="4.5" y="6.5" width="15" height="11" rx="1.8" /><path d="m5.5 8 6.5 5 6.5-5" /></g>,
  };
  return (
    <div style={{width: size, height: size, borderRadius: size * 0.26, background: bg, display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px -6px rgba(0,0,0,.35)', flex: 'none', ...style}}>
      <svg viewBox="0 0 24 24" width={size * 0.72} height={size * 0.72}>{glyph[p]}</svg>
    </div>
  );
};

export const Card: React.FC<{style?: React.CSSProperties; children?: React.ReactNode; radius?: number}> = ({style, children, radius = R.card}) => (
  <div style={{background: C.sheet, borderRadius: radius, boxShadow: LIFT, position: 'relative', overflow: 'hidden', fontFamily: F.text, color: C.ink, ...style}}>{children}</div>
);

// Frosted glass on the dark canvas
export const Glass: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div
    style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,.12), rgba(255,255,255,.04))',
      border: '1px solid rgba(180,235,240,.18)', borderRadius: R.card, backdropFilter: 'blur(24px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18), 0 30px 80px -30px rgba(0,0,0,.6)', color: C.textOnDark, fontFamily: F.text, ...style,
    }}
  >
    {children}
  </div>
);

export const Mark: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 64, style}) => (
  <Img src={staticFile('mark.png')} style={{width: size, height: size, ...style}} />
);

export const Chip: React.FC<{children: React.ReactNode; color: string; bg: string; size?: number; style?: React.CSSProperties}> = ({children, color, bg, size = 22, style}) => (
  <span style={{display: 'inline-flex', alignItems: 'center', gap: 6, padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 999, background: bg, color, fontSize: size, fontWeight: 650, fontFamily: F.text, whiteSpace: 'nowrap', ...style}}>{children}</span>
);

export const Delta: React.FC<{v: string; up?: boolean; size?: number}> = ({v, up = true, size = 20}) => (
  <Chip size={size} color={up ? C.up : C.down} bg={up ? 'rgba(63,122,38,.12)' : 'rgba(171,53,39,.1)'}>{up ? '▲' : '▼'} {v}</Chip>
);

// Path helper for a series in a box
export const linePath = (data: number[], w: number, h: number, pad = 4) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => [pad + (i / (data.length - 1)) * (w - pad * 2), pad + (1 - (d - min) / (max - min || 1)) * (h - pad * 2)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return {d, pts};
};

// Sparkline: stroke drawn to `draw` (0..1), soft area under it.
export const Spark: React.FC<{data: number[]; w: number; h: number; color?: string; draw?: number; area?: boolean; width?: number; id: string; dot?: boolean}> = ({
  data, w, h, color = C.cyan, draw = 1, area = true, width = 3, id, dot = true,
}) => {
  const {d, pts} = linePath(data, w, h, 6);
  const last = pts[Math.max(0, Math.min(pts.length - 1, Math.round(draw * (pts.length - 1))))];
  return (
    <svg width={w} height={h} style={{overflow: 'visible', display: 'block'}}>
      <defs>
        <linearGradient id={`a${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`c${id}`}><rect x="0" y="-20" width={w * draw} height={h + 40} /></clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        {area && <path d={`${d} L${w - 6},${h} L6,${h} Z`} fill={`url(#a${id})`} />}
        <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
      </g>
      {dot && draw > 0.02 && <circle cx={last[0]} cy={last[1]} r={width * 2} fill="#fff" stroke={color} strokeWidth={width} />}
    </svg>
  );
};
