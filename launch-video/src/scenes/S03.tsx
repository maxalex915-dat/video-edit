import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, prog, E, C, F, useF, Cue} from './common';
import {PlatformIcon, Platform, Spark} from '../components/ui/Primitives';

// Pain 2: every tool shows its own slice. The spike on LinkedIn and the spike on the website never meet.
const TOOLS: {p: Platform; n: string; x: number; y: number; r: number; data: number[]}[] = [
  {p: 'li', n: 'LinkedIn analytics', x: 820, y: 130, r: -5, data: [5, 6, 5, 7, 6, 5, 6, 7, 6, 5, 24, 13, 8, 7, 6, 7]},
  {p: 'web', n: 'Google Analytics', x: 1400, y: 250, r: 4, data: [9, 10, 9, 11, 10, 9, 10, 11, 10, 11, 12, 22, 15, 11, 10, 11]},
  {p: 'search', n: 'Search Console', x: 900, y: 600, r: 3, data: [7, 8, 7, 8, 7, 8, 9, 8, 7, 8, 9, 13, 17, 10, 9, 8]},
  {p: 'fb', n: 'Facebook insights', x: 1450, y: 650, r: -4, data: [6, 7, 6, 7, 8, 7, 6, 7, 8, 7, 6, 7, 6, 7, 8, 7]},
];
const W = 440;
const peak = (i: number) => {const t = TOOLS[i]; const k = t.data.indexOf(Math.max(...t.data)); return {x: t.x + 24 + (k / 15) * (W - 48), y: t.y + 80 + 120 * (1 - (t.data[k] - Math.min(...t.data)) / (Math.max(...t.data) - Math.min(...t.data))) + 6};};
const CRUSH = 106;
export const sfx: Cue[] = [...TOOLS.map((_, i) => ({at: 6 + i * 6, s: 'pop_hi', v: 0.2})), {at: 46, s: 'swoosh_soft', v: 0.2}, {at: 66, s: 'tick', v: 0.35}, {at: 82, s: 'tick', v: 0.35}, {at: 79, s: 'riser', v: 0.55}, {at: CRUSH, s: 'whoosh_long', v: 0.35}];
export const S03: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const crush = prog(f, CRUSH, dur - CRUSH, E.expoIn);
  const spread = prog(f, 0, 100, E.glide);
  const tries: [number, number, number][] = [[0, 1, 46], [0, 2, 70]];
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 - crush * 0.97})`, transformOrigin: '1330px 560px', filter: `blur(${crush * 8}px)`, opacity: 1 - prog(f, dur - 5, 5)}}>
        {TOOLS.map((t, i) => {
          const q = prog(f, 4 + i * 6, 18, E.snappy);
          const dx = (t.x - 1330) * spread * 0.06, dy = (t.y - 520) * spread * 0.06;
          return (
            <div key={t.n} style={{position: 'absolute', left: t.x + dx, top: t.y + dy, width: W, background: '#fff', borderRadius: 20, border: `1px solid ${C.rule}`, padding: 22, fontFamily: F.text, boxShadow: '0 30px 60px -25px rgba(5,60,63,.3)', opacity: q, filter: `blur(${(1 - q) * 10}px)`, transform: `rotate(${t.r}deg) translateX(${(1 - q) * -60}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 650, color: C.ink}}><PlatformIcon p={t.p} size={30} />{t.n}<span style={{marginLeft: 'auto', fontSize: 13, color: C.ink4}}>separate login</span></div>
              <div style={{marginTop: 14}}><Spark id={`si${i}`} data={t.data} w={W - 48} h={120} color="#8fa9ae" dot={false} draw={prog(f, 10 + i * 6, 30, E.snappy)} /></div>
            </div>
          );
        })}
        {tries.map(([a, b, at], k) => {
          const A = peak(a), B = peak(b);
          const p = prog(f, at, 16, E.snappy);
          const mx = A.x + (B.x - A.x) * 0.5 * p, my = A.y + (B.y - A.y) * 0.5 * p;
          return f >= at ? (
            <React.Fragment key={k}>
              <svg style={{position: 'absolute', left: 0, top: 0}} width="1920" height="1080"><path d={`M${A.x},${A.y} L${mx},${my}`} stroke={C.cyan} strokeWidth="3" strokeDasharray="8 8" /></svg>
              {p >= 1 && <div style={{position: 'absolute', left: mx - 24, top: my - 24, width: 48, height: 48, borderRadius: 99, background: '#ab3527', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 28, boxShadow: '0 10px 24px -8px rgba(120,30,20,.5)'}}>?</div>}
            </React.Fragment>
          ) : null;
        })}
        <Cursor path={[{f: 26, x: 1200, y: 1000}, {f: 44, x: peak(0).x - 4, y: peak(0).y - 6}, {f: 62, x: peak(0).x + 60, y: peak(0).y + 40}, {f: 80, x: peak(0).x + 20, y: peak(0).y + 120}]} show={26} />
      </div>
      <div style={{position: 'absolute', left: 1330 - 30, top: 560 - 30, width: 60, height: 60, borderRadius: '50%', background: '#fff', boxShadow: `0 0 ${80 * crush}px ${40 * crush}px rgba(0,185,239,.8)`, opacity: crush, transform: `scale(${crush})`}} />
      <div style={{opacity: 1 - prog(f, CRUSH, 12)}}>
        <Headline on="white" a="Data in seven places." b="The bigger picture stays hidden." size={70} style={{left: 110, top: 400, width: 660}} at={2} />
      </div>
    </AbsoluteFill>
  );
};
