import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, lerp} from '../theme/motion';
import {PlatformIcon, Platform} from '../components/ui/Primitives';
import {Cursor} from '../components/kit/Anim';
import {Mist, Words, glow, Pop, Swish, GR, CY, SKY, INK} from './Look';

// Trends: a 3D close-up rides the LinkedIn line as it draws up the spike, then pulls back to show every
// other channel spiking on the same day; the cursor hovers the peak and names the post behind it.
const N = 60, PEAK = 40;
const series = (seed: number, amp: number, base: number) => Array.from({length: N}).map((_, i) => {
  const n = Math.sin(i * 0.9 + seed) * 0.5 + Math.sin(i * 0.37 + seed * 2) * 0.8 + Math.sin(i * 2.3 + seed * 3) * 0.25;
  const spike = amp * Math.exp(-((i - PEAK - seed * 0.15) ** 2) / (2 * 1.6 ** 2));
  return base + n * 0.6 + spike;
});
const ROWS: [Platform, string, number, string][] = [['li', 'LinkedIn clicks', 9, '+3.1x'], ['web', 'Website sessions', 4.2, '+64%'], ['search', 'Search clicks', 3.2, '+38%'], ['email', 'Business inquiries', 2.6, '+3']];
const X0 = 210, W = 1500, RH = 190, Y0 = 210, GAPY = 26, PLOT_X = 300; // plot starts PLOT_X into the row
const pw = W - PLOT_X - 40;
const px = (i: number) => X0 + PLOT_X + (i / (N - 1)) * pw;
export const TrendsZoom: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const t = f / 30;
  const draw = prog(f, 0, 50, (q) => q); // the LinkedIn line draws to the spike and past it
  const pull = prog(f, 52, 26, E.inOut); // camera pulls back
  const others = prog(f, 62, 24, E.snappy);
  const band = prog(f, 78, 14, E.snappy);
  const data = ROWS.map(([, , amp], k) => series(k + 1, amp, 3));
  const ry = (k: number) => Y0 + k * (RH + GAPY);
  const yOf = (k: number, v: number) => ry(k) + RH - 26 - (v / 13) * (RH - 52);
  // the draw head on the LinkedIn row (content coordinates)
  const headI = Math.min(N - 1, draw * (N - 1));
  const hi = Math.floor(headI), hf = headI - hi;
  const hv = data[0][hi] + ((data[0][Math.min(N - 1, hi + 1)] ?? data[0][hi]) - data[0][hi]) * hf;
  const hx = lerp(hf, px(hi), px(Math.min(N - 1, hi + 1))), hy = yOf(0, hv);
  // camera: close on the head, then back to the whole stack
  const s = lerp(pull, 2.7, 1);
  const tx = lerp(pull, hx - 120, 960), ty = lerp(pull, hy + 40, 560);
  const path = (k: number, upto: number) => data[k].slice(0, Math.max(2, Math.ceil(upto * (N - 1)) + 1)).map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)},${yOf(k, v).toFixed(1)}`).join(' ');
  const turn = prog(f, 0, dur, (q) => q);
  const peakX = px(PEAK);
  return (
    <AbsoluteFill>
      <Mist lift={0.6} />
      <Swish at={0} /><Swish at={52} k={1} />{[0, 1, 2, 3].map((k) => <Pop key={k} at={64 + k * 5} k={k} v={0.14} />)}<Pop at={104} v={0.22} />
      <div style={{position: 'absolute', inset: 0, perspective: 2200}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: '960px 540px', transform: `rotateX(${lerp(turn, 18, 10)}deg) rotateY(${lerp(turn, -12, -5)}deg)`}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${960 - tx * s}px, ${540 - ty * s}px) scale(${s})`}}>
            {ROWS.map(([p, label, , delta], k) => {
              const vis = k === 0 ? 1 : others;
              return (
                <div key={label} style={{position: 'absolute', left: X0, top: ry(k), width: W, height: RH, borderRadius: 24, background: 'rgba(255,255,255,.92)', ...glow(0.7), opacity: vis, transform: `translateY(${(1 - vis) * 60}px)`, fontFamily: F.text}}>
                  <div style={{position: 'absolute', left: 28, top: 30, display: 'flex', alignItems: 'center', gap: 14}}><PlatformIcon p={p} size={42} /><div><div style={{fontSize: 22, fontWeight: 700, color: INK}}>{label}</div><div style={{fontSize: 15, color: '#6b7f84'}}>1 to 31 October</div></div></div>
                  <div style={{position: 'absolute', left: 28, bottom: 28, fontFamily: F.display, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', backgroundImage: `linear-gradient(95deg, ${GR}, ${CY} 55%, ${SKY})`, WebkitBackgroundClip: 'text', color: 'transparent', opacity: k === 0 ? prog(f, 46, 10) : band}}>{delta}</div>
                </div>
              );
            })}
            <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
              <defs><linearGradient id="tz" x1="0" x2="1"><stop offset="0" stopColor={GR} /><stop offset=".55" stopColor={CY} /><stop offset="1" stopColor={SKY} /></linearGradient></defs>
              <rect x={peakX - 30} y={ry(0) + 10} width={60} height={(RH + GAPY) * 3 + RH - 20} rx={14} fill="rgba(0,185,239,.12)" stroke="rgba(0,185,239,.35)" opacity={band} />
              {ROWS.map((_, k) => <path key={k} d={path(k, k === 0 ? draw : others)} fill="none" stroke={k === 0 ? 'url(#tz)' : 'rgba(0,150,200,.75)'} strokeWidth={k === 0 ? 4.5 : 3} strokeLinejoin="round" strokeLinecap="round" opacity={k === 0 ? 1 : others} />)}
              {draw < 1 && <circle cx={hx} cy={hy} r={9} fill="#fff" stroke={CY} strokeWidth={4} />}
              {ROWS.map((_, k) => <circle key={k} cx={peakX} cy={yOf(k, data[k][PEAK])} r={8} fill="#fff" stroke={CY} strokeWidth={4} opacity={k === 0 ? prog(f, 44, 6) : band} />)}
            </svg>
            {/* hover: the post behind the spike */}
            <div style={{position: 'absolute', left: peakX + 26, top: yOf(0, data[0][PEAK]) - 20, transform: `translateY(-100%) scale(${0.9 + prog(f, 104, 10, E.snappy) * 0.1})`, transformOrigin: 'left bottom', opacity: prog(f, 104, 8), background: INK, color: '#fff', borderRadius: 16, padding: '14px 20px', fontFamily: F.text, fontSize: 21, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 18px 40px -14px rgba(16,36,42,.5)', zIndex: 5}}>
              LinkedIn post: “Factory handover in Long An”<div style={{fontSize: 16, fontWeight: 500, opacity: 0.75, marginTop: 4}}>18 Oct · every channel rose the same day</div>
            </div>
            <Cursor path={[{f: 84, x: 1500, y: 980}, {f: 104, x: peakX + 6, y: yOf(0, data[0][PEAK]) + 8}, {f: dur, x: peakX + 12, y: yOf(0, data[0][PEAK]) + 14}]} show={84} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 54, opacity: pull}}><Words parts={[['Spot trends and'], ['make connections.', true]]} at={56} size={56} /></div>
      <span style={{display: 'none'}}>{t}</span>
    </AbsoluteFill>
  );
};
