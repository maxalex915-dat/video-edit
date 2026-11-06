import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF, Ground, Line, prog, spr, S, E, C, F, TYPE, ACCENT, Cue, lerp, measure} from '../v3/util';
import {PlatformIcon, Platform} from '../components/ui/Primitives';
import {fmt} from '../components/kit/Type';

// Intro in the frosted-glass style of the Snowfire reference: inline app icons burst into a cloud of glass windows,
// spreadsheet sprawl with frustration notes, a split screen of separate logins, then "All disconnected."
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const Glass: React.FC<{style?: React.CSSProperties; children?: React.ReactNode; tint?: number}> = ({style, children, tint = 0}) => (
  <div style={{position: 'absolute', background: `linear-gradient(150deg, rgba(255,255,255,.62), rgba(${tint ? '205,240,250' : '255,255,255'},.32))`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: '1.5px solid rgba(255,255,255,.9)', borderRadius: 18, boxShadow: '0 24px 60px -24px rgba(0,150,200,.35), inset 0 1px 0 rgba(255,255,255,.9)', fontFamily: F.text, color: C.ink, overflow: 'hidden', ...style}}>{children}</div>
);
const Haze: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill style={{background: '#fbfeff'}}>
    <AbsoluteFill style={{background: `radial-gradient(700px 420px at ${50 + Math.sin(f / 50) * 6}% 50%, rgba(0,185,239,.22), transparent 70%), radial-gradient(600px 400px at 15% 85%, rgba(127,188,66,.14), transparent 70%), radial-gradient(700px 500px at 90% 10%, rgba(112,203,243,.25), transparent 70%)`}} />
  </AbsoluteFill>
);
const SheetIcon: React.FC<{s?: number}> = ({s = 40}) => (
  <svg width={s} height={s * 1.25} viewBox="0 0 20 25"><path d="M2 1h11l5 5v17a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" fill="#1fa463" /><path d="M13 1v5h5" fill="#8ed1ad" /><rect x="5" y="11" width="10" height="8" rx=".5" fill="#fff" /><path d="M5 15h10M10 11v8" stroke="#1fa463" strokeWidth="1.2" /></svg>
);

// I1 0.0 to 3.4: "Your marketing [icons] data" typed; the icons burst out; "is everywhere." among glass fragments.
const PS: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
const A = 'Your ', B = 'marketing', D = ' data';
const BURST = 46;
const SCAT: [number, number, number][] = [[230, 170, -8], [1560, 150, 6], [380, 820, 5], [1660, 780, -6], [880, 120, 3], [1180, 900, -4], [110, 500, 7]];
export const i1sfx: Cue[] = [...Array.from({length: 14}).map((_, i) => ({at: 2 + i * 2, s: `key${i % 4}`, v: 0.22})), ...PS.map((_, i) => ({at: 22 + i * 2, s: 'pop_hi', v: 0.15})), {at: BURST, s: 'whoosh_long', v: 0.45}, {at: 60, s: 'swoosh_soft', v: 0.25}];
export const I1: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const n = Math.floor(Math.max(0, f - 2) / 1.6);
  const a = A.slice(0, n), b = B.slice(0, Math.max(0, n - A.length));
  const iconsN = Math.max(0, Math.min(7, Math.floor((f - 22) / 2) + 1));
  const d = f >= 38 ? D.slice(0, Math.floor((f - 38) / 1.6)) : '';
  const burst = prog(f, BURST, 22, E.snappy);
  const lineOut = prog(f, BURST + 2, 9, E.expoIn);
  const push = prog(f, 0, dur, E.glide);
  const caret = Math.floor(f / 8) % 2 === 0;
  return (
    <AbsoluteFill>
      <Haze f={f} />
      {/* glass fragments behind, at different depths */}
      <AbsoluteFill style={{transform: `scale(${1.08 - push * 0.08})`}}>
        {[
          {x: 1330, y: 140, w: 420, h: 120, b: 0, z: 0.9, k: 'kpi'}, {x: 120, y: 260, w: 520, h: 300, b: 3, z: 1.0, k: 'table'}, {x: 1300, y: 600, w: 520, h: 300, b: 2, z: 1.05, k: 'rows'},
          {x: 640, y: 780, w: 640, h: 200, b: 6, z: 1.15, k: 'bar'}, {x: 760, y: 40, w: 440, h: 70, b: 5, z: 1.1, k: 'bar'},
        ].map((g, i) => {
          const q = prog(f, BURST + 6 + i * 4, 22, E.snappy);
          return (
            <Glass key={i} tint={i % 2} style={{left: g.x, top: g.y, width: g.w, height: g.h, opacity: q * 0.95, filter: `blur(${g.b + (1 - q) * 10}px)`, transform: `scale(${g.z * (0.9 + q * 0.1)}) translateY(${(1 - q) * 40 - f * 0.25 * (i % 2 ? 1 : -1)}px)`, padding: 16}}>
              {g.k === 'kpi' && <div style={{display: 'flex', gap: 14}}>{[['LinkedIn impressions', 14210], ['Website sessions', 7930]].map(([l, v]) => <div key={l} style={{flex: 1, background: 'rgba(255,255,255,.7)', borderRadius: 12, padding: '10px 14px'}}><div style={{fontSize: 12, color: C.ink3}}>{l}</div><div style={{fontSize: 30, fontWeight: 700}}>{fmt(v as number)}</div></div>)}</div>}
              {(g.k === 'table' || g.k === 'rows') && Array.from({length: 6}).map((_, r) => <div key={r} style={{display: 'flex', gap: 10, alignItems: 'center', padding: '8px 4px', borderBottom: '1px solid rgba(5,94,99,.08)'}}><span style={{width: 16, height: 16, borderRadius: 4, background: r % 2 ? 'rgba(0,185,239,.35)' : 'rgba(127,188,66,.35)'}} />{[0, 1, 2].map((c) => <span key={c} style={{flex: 1, height: 8, borderRadius: 4, background: c === 2 && g.k === 'rows' ? ['#f2b8b5', '#bfe3c9'][r % 2] : 'rgba(5,94,99,.12)'}} />)}</div>)}
              {g.k === 'bar' && <div style={{display: 'flex', gap: 10, fontFamily: F.mono, fontSize: 13, color: C.ink3}}>{'File  Edit  View  Insert  Format  Data  Tools  Extensions  Help'.split('  ').map((t) => <span key={t}>{t}</span>)}</div>}
            </Glass>
          );
        })}
      </AbsoluteFill>
      {/* the typed line, icons inline */}
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + push * 0.04})`}}>
        <div style={{...TYPE(84), display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
          <span style={{opacity: 1 - lineOut, filter: `blur(${lineOut * 12}px)`}}>{a}</span><span style={{...ACCENT, opacity: 1 - lineOut, filter: `blur(${lineOut * 12}px)`}}>{b}</span>
          <span style={{display: 'inline-flex', width: iconsN ? 7 * 46 + 40 : 0, height: 90, position: 'relative', margin: iconsN ? '0 10px' : 0}}>
            {PS.map((p, i) => {
              if (i >= iconsN || f >= BURST) return null;
              const pop = spr(f, 22 + i * 2, S.pop);
              const [sx, sy, sr] = SCAT[i];
              const hx = 20 + i * 46, hy = 18 + (i % 2) * 8;
              // fly from the line to a scattered spot on screen (in frame coordinates, relative to the line centre)
              const tx = hx, ty = hy;
              return <div key={p} style={{position: 'absolute', left: tx, top: ty, transform: `scale(${Math.min(1.1, pop) * (1 + burst * 0.8)}) rotate(${burst * sr + (i % 2 ? 6 : -6)}deg)`, filter: `blur(${burst > 0.9 ? 1.5 : 0}px)`, zIndex: 5}}>
                <div style={{padding: 6 + burst * 4, borderRadius: 14, background: `rgba(255,255,255,${0.5 + burst * 0.2})`, boxShadow: `0 10px 26px -10px rgba(0,150,200,${0.3 + burst * 0.2})`, border: '1px solid rgba(255,255,255,.9)', backdropFilter: 'blur(10px)'}}><PlatformIcon p={p} size={44} /></div>
              </div>;
            })}
          </span>
          <span style={{...ACCENT, opacity: 1 - lineOut, filter: `blur(${lineOut * 12}px)`}}>{d}</span>
          {f < BURST && <span style={{display: 'inline-block', width: 4, height: 88, background: C.ink, opacity: caret ? 1 : 0, marginLeft: 4}} />}
        </div>
      </div>
      {f >= BURST && PS.map((p, i) => {
        const wA = measure('Your marketing', 84) - 0.025 * 84 * 13, wD = measure(' data', 84) - 0.025 * 84 * 4, slot = 7 * 46 + 40 + 20;
        const left = 960 - (wA + slot + wD) / 2;
        const x0 = left + wA + 10 + 20 + i * 46, y0 = 540 - 45 + 18 + (i % 2) * 8;
        const [sx, sy, sr] = SCAT[i];
        const x = lerp(burst, x0, sx) + (f >= BURST + 21 ? Math.sin(f / 30 + i) * 8 : 0), y = lerp(burst, y0, sy) + (f >= BURST + 21 ? Math.cos(f / 34 + i) * 8 : 0);
        return <div key={p} style={{position: 'absolute', left: x, top: y, transform: `scale(${1 + burst * 0.8}) rotate(${burst * sr + (i % 2 ? 6 : -6) * (1 - burst)}deg)`, filter: `blur(${i % 3 === 0 ? burst * 2 : 0}px)`, zIndex: 6}}>
          <div style={{padding: 6 + burst * 4, borderRadius: 14, background: `rgba(255,255,255,${0.5 + burst * 0.2})`, boxShadow: `0 10px 26px -10px rgba(0,150,200,${0.3 + burst * 0.2})`, border: '1px solid rgba(255,255,255,.9)'}}><PlatformIcon p={p} size={44} /></div>
        </div>;
      })}
      {f >= BURST + 11 && <Line w={[['is'], ['everywhere.', true]]} at={BURST + 12} stagger={6} size={100} />}
    </AbsoluteFill>
  );
};

// I2 3.4 to 6.4: spreadsheet sprawl, glass file stack with frustration notes.
const FILES: [string, string, number, number][] = [['LinkedIn export', 'Last edited 20 mins ago', 120, 560], ['Facebook insights', 'Last edited 2 days ago', 300, 470], ['GA4 sessions', 'Last edited by Minh', 500, 380], ['MASTER report v7', 'Version conflict detected', 700, 290]];
const NOTES = ['File edited by Minh', 'Version conflict detected', 'Connection lost', 'Comment added (17)'];
export const i2sfx: Cue[] = [...FILES.map((_, i) => ({at: 4 + i * 5, s: 'pop', v: 0.2})), ...NOTES.map((_, i) => ({at: 30 + i * 9, s: 'tick', v: 0.3})), {at: 40, s: 'swoosh_soft', v: 0.25}];
export const I2Body: React.FC<{f: number}> = ({f}) => (
  <AbsoluteFill>
    <Haze f={f + 100} />
    {/* faint spreadsheet chrome behind */}
    <Glass style={{left: 40, top: 640, width: 1800, height: 420, opacity: 0.7, filter: 'blur(1.5px)', padding: '14px 24px'}}>
      <div style={{fontFamily: F.mono, fontSize: 15, color: C.ink3, display: 'flex', gap: 22}}>{'File  Edit  View  Insert  Format  Data  Tools  Extensions  Help'.split('  ').map((t) => <span key={t}>{t}</span>)}</div>
      <div style={{marginTop: 14, height: 30, borderRadius: 99, background: 'rgba(255,255,255,.6)', width: 900, fontFamily: F.mono, fontSize: 14, color: C.ink4, padding: '6px 14px'}}>sheets / MASTER_report_v7</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginTop: 16, gap: 1}}>{Array.from({length: 48}).map((_, k) => <div key={k} style={{height: 34, background: 'rgba(255,255,255,.35)', border: '1px solid rgba(5,94,99,.06)'}} />)}</div>
    </Glass>
    <Glass style={{left: 260, top: 120, width: 520, height: 120, padding: '18px 22px', opacity: prog(f, 20, 12), filter: 'blur(.5px)'}}><div style={{fontFamily: F.mono, fontSize: 22, color: '#c0443a'}}>"#REF!" / "#VALUE!"</div><div style={{fontSize: 14, color: C.ink3, marginTop: 6}}>3 broken formulas in this sheet</div></Glass>
    {FILES.map(([n, s, x, y], i) => {
      const q = prog(f, 2 + i * 5, 18, E.snappy);
      return (
        <Glass key={n} tint={i % 2} style={{left: x + 40, top: y, width: 620, height: 130, padding: '22px 26px', display: 'flex', gap: 20, alignItems: 'center', opacity: q, filter: `blur(${(1 - q) * 10}px)`, transform: `translateX(${(1 - q) * -60 - f * 0.4}px)`, zIndex: 2 + i}}>
          <SheetIcon s={44} /><div><div style={{fontSize: 28, fontWeight: 650}}>{n}</div><div style={{fontSize: 16, color: i === 3 ? '#c0443a' : C.ink3, marginTop: 4}}>{s}</div></div>
        </Glass>
      );
    })}
    <Glass style={{left: 70, top: 300, width: 330, padding: '18px 22px', zIndex: 8, opacity: prog(f, 26, 10), transform: `translateY(${-f * 0.3}px)`}}>
      {NOTES.map((t, i) => <div key={t} style={{fontSize: 17, color: i === 1 || i === 2 ? '#c0443a' : C.ink2, padding: '5px 0', opacity: prog(f, 30 + i * 9, 8), transform: `translateX(${(1 - prog(f, 30 + i * 9, 10, E.snappy)) * -14}px)`}}>{t}</div>)}
    </Glass>
  </AbsoluteFill>
);
export const I2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const push = prog(f, 0, dur, E.glide);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${1 + push * 0.05})`}}><I2Body f={f} /></AbsoluteFill>
      <div style={{position: 'absolute', right: 120, top: 700, textAlign: 'right', fontFamily: F.display, fontWeight: 500, fontSize: 96, letterSpacing: '-0.03em', lineHeight: 1.02}}>
        {['From spreadsheet', 'sprawl'].map((t, i) => {const q = prog(f, 8 + i * 8, 20, E.snappy); return <div key={t} style={{...ACCENT, opacity: q, filter: `blur(${(1 - q) * 14}px)`, transform: `translateX(${(1 - q) * -50}px)`}}>{t}</div>;})}
      </div>
    </AbsoluteFill>
  );
};

// I3 6.4 to 7.9: split screen; the sprawl shrinks into the left pane, separate logins slide in on the right.
export const i3sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.35}, {at: 30, s: 'riser', v: 0.5}, ...[10, 16, 22].map((at) => ({at, s: 'pop_hi', v: 0.2}))];
export const I3: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const sp = prog(f, 0, 16, E.inOut);
  const lines = prog(f, 12, 24, E.snappy);
  return (
    <AbsoluteFill style={{background: '#fbfeff'}}>
      <div style={{position: 'absolute', left: 30, top: 30, width: lerp(sp, 1860, 900), height: 1020, borderRadius: 30, overflow: 'hidden', boxShadow: '0 30px 80px -30px rgba(0,150,200,.35)'}}>
        <div style={{width: 1920, height: 1080, transform: `translate(-30px,-30px) scale(${lerp(sp, 1.05, 0.95)})`, transformOrigin: '30% 50%'}}><I2Body f={f + 90} /></div>
        <div style={{position: 'absolute', right: 40, bottom: 60, textAlign: 'right', fontFamily: F.display, fontWeight: 500, fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.03em', ...ACCENT}}>From spreadsheet<br />sprawl</div>
      </div>
      <div style={{position: 'absolute', left: lerp(sp, 1960, 960), top: 30, width: 930, height: 1020, borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(160deg, #e6f7fd, #7fd3f3 60%, #00b9ef)', boxShadow: '0 30px 80px -30px rgba(0,150,200,.45)'}}>
        <svg width="930" height="1020" style={{position: 'absolute'}}>
          {[[120, 300, 470, 220], [470, 220, 760, 360], [420, 600, 760, 360], [420, 600, 160, 760]].map(([x1, y1, x2, y2], i) => {
            const L = Math.hypot(x2 - x1, y2 - y1);
            return <g key={i}><path d={`M${x1},${y1} L${x1},${(y1 + y2) / 2} L${x2},${(y1 + y2) / 2} L${x2},${y2}`} fill="none" stroke="#10242a" strokeWidth="2.5" strokeDasharray="10 9" strokeDashoffset={(1 - lines) * L * 2} opacity={0.6} />
              <circle cx={x2} cy={y2} r="9" fill="#fff" stroke="#10242a" strokeWidth="3" opacity={lines} /></g>;
          })}
        </svg>
        {(['li', 'search', 'email', 'fb'] as Platform[]).map((p, i) => {
          const q = prog(f, 8 + i * 5, 18, E.snappy);
          const pos = [[60, 180], [420, 110], [560, 300], [330, 520]][i];
          return (
            <Glass key={p} style={{left: pos[0], top: pos[1], width: 300, padding: 18, opacity: q, filter: `blur(${(1 - q) * 8}px)`, transform: `translateY(${(1 - q) * 40 - f * 0.4}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 650}}><PlatformIcon p={p} size={32} />Sign in</div>
              <div style={{marginTop: 12, height: 32, borderRadius: 99, background: 'rgba(255,255,255,.75)', fontSize: 13, color: C.ink4, padding: '8px 14px'}}>Email address</div>
              <div style={{marginTop: 8, height: 32, borderRadius: 99, background: 'rgba(255,255,255,.75)', fontSize: 13, color: C.ink4, padding: '8px 14px', letterSpacing: '.2em'}}>••••••••</div>
            </Glass>
          );
        })}
        <div style={{position: 'absolute', right: 40, bottom: 60, textAlign: 'right', fontFamily: F.display, fontWeight: 500, fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.03em', color: '#fff', textShadow: '0 2px 20px rgba(0,60,80,.25)'}}>
          {['To seven', 'separate logins'].map((t, i) => {const q = prog(f, 14 + i * 6, 18, E.snappy); return <div key={t} style={{opacity: q, filter: `blur(${(1 - q) * 12}px)`, transform: `translateX(${(1 - q) * -40}px)`}}>{t}</div>;})}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// I4 7.9 to 9.2: "All disconnected." on a soft glow.
export const i4sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}];
export const I4: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const g = prog(f, 0, 20, E.snappy);
  const z = interpolate(f, [0, dur], [1.06, 1], cl);
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <AbsoluteFill style={{background: `radial-gradient(${520 * g}px ${360 * g}px at 50% 58%, rgba(0,185,239,.45), rgba(127,188,66,.25) 55%, transparent 75%)`}} />
      <AbsoluteFill style={{transform: `scale(${z})`}}><Line w={[['All'], ['disconnected.', true]]} at={0} stagger={6} size={120} /></AbsoluteFill>
    </AbsoluteFill>
  );
};
