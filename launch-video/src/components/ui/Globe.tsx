import React from 'react';
import {C} from '../../theme/tokens';

// The 22 Archetype offices (from competitive_intel/workspace/country-offices.json), approximate country centres.
export const OFFICES: [string, number, number][] = [
  ['France', 46.6, 2.2], ['Ivory Coast', 7.5, -5.5], ['Tunisia', 34, 9], ['Morocco', 31.8, -7.1], ['UAE', 24, 54], ['USA', 39, -98], ['Brazil', -14, -51], ['Mexico', 23, -102],
  ['Bangladesh', 23.7, 90.4], ['Cambodia', 12.6, 105], ['China', 35, 104], ['India', 21, 78], ['Indonesia', -2.5, 118], ['Laos', 19.9, 102.5], ['Kazakhstan', 48, 67], ['Malaysia', 4.2, 102],
  ['Myanmar', 21.9, 96], ['Mongolia', 46.9, 103.8], ['Philippines', 12.9, 121.8], ['Singapore', 1.35, 103.8], ['Thailand', 15.9, 101], ['Vietnam', 14, 108.3],
];
export const proj = (lat: number, lon: number, lat0: number, lon0: number, R: number) => {
  const r = Math.PI / 180, p = lat * r, l = (lon - lon0) * r, p0 = lat0 * r;
  return {x: R * Math.cos(p) * Math.sin(l), y: -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), vis: Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)};
};
// White-line globe for the gradient ground. `pins`: how many offices are lit (west to east); `arcs`: 0..1 drawn.
export const Globe: React.FC<{lon0: number; lat0?: number; R: number; arcs?: number; pins?: number; labels?: string[]; hl?: string}> = ({lon0, lat0 = 20, R, arcs = 1, pins = 22, labels = [], hl}) => {
  const path = (pts: {x: number; y: number; vis: number}[]) => {let d = '', pen = false; for (const p of pts) {if (p.vis > 0) {d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)} `; pen = true;} else pen = false;} return d;};
  const grat: string[] = [];
  for (let lat = -75; lat <= 75; lat += 15) grat.push(path(Array.from({length: 91}, (_, i) => proj(lat, -180 + i * 4, lat0, lon0, R))));
  for (let lon = -180; lon < 180; lon += 15) grat.push(path(Array.from({length: 44}, (_, i) => proj(-86 + i * 4, lon, lat0, lon0, R))));
  const vn = proj(14, 108.3, lat0, lon0, R);
  const order = [...OFFICES].sort((a, b) => a[2] - b[2]).map((o) => o[0]);
  return (
    <svg width={R * 2 + 600} height={R * 2 + 200} viewBox={`${-R - 300} ${-R - 100} ${R * 2 + 600} ${R * 2 + 200}`}>
      <defs><radialGradient id="glb" cx="38%" cy="32%"><stop offset="0" stopColor="#ffffff" stopOpacity=".9" /><stop offset="1" stopColor="#bfeafa" stopOpacity=".55" /></radialGradient></defs>
      <circle r={R} fill="url(#glb)" stroke="rgba(0,160,210,.55)" strokeWidth="2" />
      {grat.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(0,120,160,.18)" strokeWidth="1.2" />)}
      {OFFICES.map(([n, la, lo]) => {
        const p = proj(la, lo, lat0, lon0, R);
        const lit = order.indexOf(n) < pins;
        if (p.vis <= 0.02 || !lit) return null;
        const mx = (p.x + vn.x) / 2, my = (p.y + vn.y) / 2 - Math.hypot(p.x - vn.x, p.y - vn.y) * 0.3;
        const big = n === 'Vietnam' || n === hl;
        return (
          <g key={n}>
            {n !== 'Vietnam' && arcs > 0 && <path d={`M${p.x},${p.y} Q${mx},${my} ${vn.x},${vn.y}`} fill="none" stroke="#00b9ef" strokeWidth="2.2" strokeDasharray={`${arcs * 700} 3000`} opacity=".85" />}
            <circle cx={p.x} cy={p.y} r={big ? 10 : 6} fill={big ? C.teal : '#7fbc42'} stroke="#fff" strokeWidth="2.5" />
            {(labels.includes(n) || n === hl) && <text x={p.x + 14} y={p.y + 6} fontFamily="Inter" fontSize="19" fontWeight="650" fill="#10242a">{n}</text>}
          </g>
        );
      })}
    </svg>
  );
};
