import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, Wipe, Cursor, Ripple, Tip, prog, spr, S, E, C, F, TYPE, ACCENT, Cue, Center, lerp} from '../v3/util';
import {PlatformIcon, Platform, Spark, linePath} from '../components/ui/Primitives';
import {fmt} from '../components/kit/Type';

const TOP: React.CSSProperties = {top: 34, bottom: 'auto', height: 180};

// M1: "All platform analytics. In one place. Automated." (brand field), then shrinks up as the product rises.
export const m1sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.2}];
export const M1: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, dur - 14, 14, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <AbsoluteFill style={{transform: `translateY(${-up * 420}px) scale(${1 - up * 0.45})`}}>
        <Line w={words('All platform analytics. In one place. Automated.')} at={4} stagger={6} size={70} tone="white" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// M2: spot trends. LinkedIn clicks spikes; other channels appear under it and spike at the same moment; hover reveals the post.
const SPIKE = 17;
const mk = (base: number, amp: number, lag: number, noise: number, seed: number) => Array.from({length: 30}, (_, i) => base + Math.sin(i * 0.9 + seed) * noise + Math.cos(i * 0.37 + seed) * noise * 0.6 + (i === SPIKE + lag ? amp : i === SPIKE + lag + 1 ? amp * 0.45 : i === SPIKE + lag - 1 ? amp * 0.18 : 0));
const ROWS: {label: string; p: Platform; data: number[]; delta: string; col: string}[] = [
  {label: 'LinkedIn clicks', p: 'li', data: mk(10, 30, 0, 1.6, 1), delta: '+3.1x', col: '#0a66c2'},
  {label: 'Website sessions', p: 'web', data: mk(20, 26, 0, 2.2, 2), delta: '+64%', col: '#0a8b84'},
  {label: 'Google search clicks', p: 'search', data: mk(14, 18, 0, 1.8, 3), delta: '+38%', col: '#00a6dc'},
  {label: 'Business inquiries', p: 'email', data: mk(3, 6, 0, 0.7, 4), delta: '+3', col: '#5ea02e'},
];
const RX = 210, RW = 1500, CHX = RX + 300, CHW = 1140, RH = 150, R0 = 190, GAP = 22;
const rowY = (i: number) => R0 + i * (RH + GAP);
const spikePt = (i: number) => {const {pts} = linePath(ROWS[i].data, CHW, RH - 40, 6); return {x: CHX + pts[SPIKE][0], y: rowY(i) + 20 + pts[SPIKE][1]};};
const IN = (i: number) => (i === 0 ? 0 : 64 + i * 12);
const BAND = 116, HOVER = 156, TEXT = 178;
export const m2sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.25}, {at: 50, s: 'pop_hi', v: 0.35}, ...[1, 2, 3].map((i) => ({at: IN(i), s: 'swoosh_soft', v: 0.18})), ...[0, 1, 2, 3].map((i) => ({at: BAND + 6 + i * 5, s: 'pop_hi', v: 0.28})), {at: HOVER, s: 'tick', v: 0.35}, {at: TEXT, s: 'shimmer', v: 0.3}];
export const M2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const sp = spikePt(1);
  const bandX = spikePt(0).x;
  const band = prog(f, BAND, 14, E.snappy);
  const textIn = f >= TEXT;
  const push = prog(f, 0, dur, E.glide);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <AbsoluteFill style={{transform: `scale(${1 + push * 0.04 - (textIn ? prog(f, TEXT, 16, E.inOut) * 0.08 : 0)}) translateY(${textIn ? prog(f, TEXT, 16, E.inOut) * 60 : 0}px)`, transformOrigin: '960px 640px'}}>
        {band > 0 && <div style={{position: 'absolute', left: bandX - 50, top: rowY(0) - 8, width: 100, height: 4 * (RH + GAP) - GAP + 16, borderRadius: 20, background: 'linear-gradient(180deg, rgba(127,188,66,.18), rgba(0,185,239,.18))', border: '2px solid rgba(0,185,239,.5)', opacity: band, transform: `scaleY(${0.6 + band * 0.4})`, zIndex: 3}} />}
        {ROWS.map((r, i) => {
          const q = prog(f, IN(i), 20, E.snappy);
          const lit = i === 0 ? prog(f, 50, 12) : band;
          const k = prog(f, BAND + 6 + i * 5, 10, E.snappy);
          const pt = spikePt(i);
          return (
            <React.Fragment key={r.label}>
              <div style={{position: 'absolute', left: RX, top: rowY(i), width: RW, height: RH, background: '#fff', borderRadius: 22, border: `1px solid ${C.rule}`, boxShadow: '0 20px 50px -24px rgba(5,60,63,.3)', opacity: q, filter: `blur(${(1 - q) * 10}px)`, transform: `translateY(${(1 - q) * 60}px)`, fontFamily: F.text}}>
                <div style={{position: 'absolute', left: 28, top: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 14, fontSize: 21, fontWeight: 650, color: C.ink}}><PlatformIcon p={r.p} size={42} />{r.label}</div>
                <div style={{position: 'absolute', left: CHX - RX, top: 20}}><Spark id={`m2${i}`} data={r.data} w={CHW} h={RH - 40} color={lit > 0.5 ? r.col : '#9db3b7'} dot={false} draw={prog(f, IN(i) + 6, 34, E.snappy)} area={lit > 0.5} width={3} /></div>
              </div>
              {k > 0 && <>
                <div style={{position: 'absolute', left: pt.x - 13, top: pt.y - 13, width: 26, height: 26, borderRadius: 99, background: '#fff', border: `5px solid ${r.col}`, transform: `scale(${k})`, boxShadow: `0 0 0 ${12 * (1 - k)}px rgba(0,185,239,.3)`, zIndex: 4}} />
                <div style={{position: 'absolute', left: pt.x + 26, top: pt.y - 16, background: C.ink, color: '#fff', borderRadius: 99, padding: '5px 14px', fontFamily: F.text, fontSize: 17, fontWeight: 700, opacity: k, zIndex: 4}}>{r.delta}</div>
              </>}
              {i === 0 && f >= 50 && f < BAND + 6 && <div style={{position: 'absolute', left: pt.x - 13, top: pt.y - 13, width: 26, height: 26, borderRadius: 99, background: '#fff', border: `5px solid ${r.col}`, transform: `scale(${spr(f, 50, S.pop)})`, zIndex: 4}} />}
            </React.Fragment>
          );
        })}
        <Tip x={sp.x} y={sp.y - 24} at={HOVER + 2}>LinkedIn post: “Factory handover in Long An”, 18 Oct</Tip>
        <Cursor path={[{f: 120, x: 1500, y: 1050}, {f: HOVER - 2, x: sp.x + 4, y: sp.y + 6}, {f: dur, x: sp.x + 10, y: sp.y + 10}]} show={120} />
      </AbsoluteFill>
      {textIn && <Line w={[['Spot'], ['trends'], ['and'], ['make', true], ['connections.', true]]} at={TEXT} stagger={5} size={64} style={TOP} />}
    </AbsoluteFill>
  );
};

// M3: always up to date. A stale spreadsheet steps aside; live numbers keep ticking, every source streaming in.
const LIVE: {p: Platform; label: string; v: number; rate: number}[] = [
  {p: 'li', label: 'LinkedIn impressions', v: 14210, rate: 3}, {p: 'fb', label: 'Facebook views', v: 13980, rate: 2},
  {p: 'web', label: 'Website sessions', v: 7930, rate: 1}, {p: 'search', label: 'Search impressions', v: 29870, rate: 5},
];
export const m3sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.2}, {at: 44, s: 'swoosh', v: 0.3}, ...[70, 100, 130, 160].map((at) => ({at, s: 'tick', v: 0.2}))];
export const M3: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const stale = prog(f, 4, 18, E.snappy), aside = prog(f, 44, 22, E.inOut);
  const live = (i: number) => prog(f, 54 + i * 6, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Line w={[['Always'], ['up'], ['to'], ['date.'], ['Automatically.', true]]} at={4} stagger={5} size={62} style={TOP} />
      {/* the old way: a report that is already out of date */}
      <div style={{position: 'absolute', left: lerp(aside, 560, 110), top: lerp(aside, 330, 420), width: 800, opacity: stale * (1 - aside * 0.45), filter: `grayscale(${aside}) blur(${aside * 1.5}px)`, transform: `scale(${lerp(aside, 1, 0.62)}) rotate(${-aside * 4}deg)`, transformOrigin: 'top left', background: '#fff', borderRadius: 16, border: '1px solid #dfe7e8', boxShadow: '0 30px 70px -30px rgba(5,60,63,.35)', overflow: 'hidden', fontFamily: F.text}}>
        <div style={{height: 44, background: '#f3f6f6', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', fontSize: 15, fontWeight: 650, color: C.ink2}}>{['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 10, height: 10, borderRadius: 9, background: c}} />)}<span style={{marginLeft: 8}}>MASTER_report_October.xlsx</span>
          <span style={{marginLeft: 'auto', background: '#fbe4e1', color: '#ab3527', borderRadius: 99, padding: '4px 12px', fontSize: 14, fontWeight: 700}}>Last updated 14 days ago</span></div>
        {LIVE.map((l, i) => <div key={l.p} style={{display: 'grid', gridTemplateColumns: '1fr 160px', padding: '14px 20px', borderTop: '1px solid #eef2f2', fontSize: 18, color: C.ink2}}><span>{l.label}</span><span style={{textAlign: 'right', fontFamily: F.mono}}>{fmt(Math.round(l.v * 0.82))}</span></div>)}
      </div>
      {/* the dashboard: live */}
      <div style={{position: 'absolute', left: 760, top: 240, width: 1050, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        {LIVE.map((l, i) => {
          const q = live(i);
          const t = Math.max(0, f - 70 - i * 7);
          const v = l.v + Math.floor(t / (9 - l.rate)) * l.rate;
          const bump = t > 0 && t % (9 - l.rate) < 3;
          return (
            <div key={l.p} style={{background: '#fff', borderRadius: 24, border: `1px solid ${C.rule}`, padding: 26, fontFamily: F.text, boxShadow: '0 30px 70px -28px rgba(5,60,63,.35)', opacity: q, filter: `blur(${(1 - q) * 10}px)`, transform: `translateY(${(1 - q) * 60}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, color: C.ink2}}><PlatformIcon p={l.p} size={36} />{l.label}
                <span style={{marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, color: C.up, background: 'rgba(63,122,38,.1)', borderRadius: 99, padding: '4px 11px'}}><span style={{width: 9, height: 9, borderRadius: 9, background: C.up, opacity: 0.5 + 0.5 * Math.sin(f / 4)}} />LIVE</span></div>
              <div style={{fontSize: 52, fontWeight: 750, color: C.ink, marginTop: 10, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', transform: `translateY(${bump ? -2 : 0}px)`}}>{fmt(v)}</div>
              <div style={{fontSize: 14, color: C.ink3}}>Updated just now</div>
              <div style={{marginTop: 10}}><Spark id={`lv${i}`} data={[5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11, 13]} w={440} h={60} color={C.cyan} draw={Math.min(1, 0.55 + t / 300)} area={false} /></div>
            </div>
          );
        })}
      </div>
      {/* sources streaming in */}
      {(['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'] as Platform[]).map((p, i) => {
        const y = 300 + i * 95;
        return Array.from({length: 3}).map((_, k) => {
          const t = ((f - 60 + k * 14 + i * 5) % 42) / 42;
          return f > 60 ? <div key={`${p}${k}`} style={{position: 'absolute', left: 700 + t * 120, top: y, width: 10, height: 10, borderRadius: 9, background: 'linear-gradient(90deg,#7fbc42,#00b9ef)', opacity: Math.sin(t * Math.PI) * 0.8}} /> : null;
        });
      })}
    </AbsoluteFill>
  );
};

// M4: "Turning insights" then "into decisions", a clean two-line build, then a wipe.
export const m4sfx: Cue[] = [{at: 2, s: 'swoosh_soft', v: 0.25}, {at: 50, s: 'swoosh_soft', v: 0.25}, {at: 100, s: 'whoosh_long', v: 0.4}];
export const M4: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, 46, 16, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <AbsoluteFill style={{transform: `translateY(${-up * 56}px)`}}><Line w={words('Turning insights')} at={2} stagger={6} size={96} tone="white" /></AbsoluteFill>
      <AbsoluteFill style={{transform: 'translateY(64px)'}}>{f >= 50 && <Line w={words('into decisions.')} at={50} stagger={6} size={96} tone="white" />}</AbsoluteFill>
      <Wipe at={dur - 18} dur={18} />
    </AbsoluteFill>
  );
};
