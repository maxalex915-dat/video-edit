import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Typewriter, ZoomThrough, Cursor, Ripple, prog, spr, S, E, C, F, Cue} from '../v3/util';
import {fmt} from '../components/kit/Type';
export {P1, p1sfx} from '../v3/Pain';

const TOP: React.CSSProperties = {top: 40, bottom: 'auto', height: 200};

// P2: platform exports scattered on screen. Copy a total from each, paste it into the master report. One lands in the wrong row.
type Win = {n: string; x: number; y: number; r: number; at: number; c: string};
const WINS: Win[] = [
  {n: 'linkedin_analytics_oct.xlsx', x: 70, y: 210, r: -3, at: 2, c: '#0a66c2'},
  {n: 'facebook_insights_oct.xlsx', x: 120, y: 620, r: 2, at: 6, c: '#1877F2'},
  {n: 'GA4_sessions_export.csv', x: 520, y: 760, r: -2, at: 10, c: '#055e63'},
  {n: 'search_console_q4.csv', x: 1480, y: 760, r: 3, at: 14, c: '#0a8b84'},
];
const WW = 430, WH = 290;
const MX = 900, MY = 230, MW = 780;
const ROWS = ['LinkedIn', 'Facebook', 'Instagram', 'Website', 'Search', 'Email'];
const masterCell = (r: number) => ({x: MX + 20 + 200 + 120, y: MY + 46 + 46 + r * 54 + 27});
const srcCell = (w: Win) => ({x: w.x + WW - 70, y: w.y + 40 + 5 * 36 + 18});
// [source window, master row it lands in, frame]
const CYCLES: [number, number, number][] = [[0, 0, 26], [1, 1, 52], [2, 2, 80]]; // the GA4 total should go to Website (row 3) but lands on Instagram
const ERR = 80 + 20;
export const p2sfx: Cue[] = [...WINS.map((w) => ({at: w.at, s: 'pop_hi', v: 0.2})), {at: 18, s: 'pop', v: 0.2}, ...CYCLES.flatMap(([, , t]) => [{at: t, s: 'click', v: 0.4}, {at: t + 3, s: 'key1', v: 0.4}, {at: t + 18, s: 'key3', v: 0.45}]), {at: ERR + 2, s: 'pop', v: 0.4}, {at: 122, s: 'whoosh_long', v: 0.45}];
const val = (i: number) => [4243, 4901, 7930][i];
export const P2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const cell = masterCell(2);
  const path = [{f: 18, x: 1300, y: 1050}, ...CYCLES.flatMap(([w, r, t]) => {const s = srcCell(WINS[w]), m = masterCell(r); return [{f: t - 4, x: s.x, y: s.y}, {f: t, x: s.x, y: s.y}, {f: t + 14, x: m.x, y: m.y}, {f: t + 18, x: m.x, y: m.y}];})];
  const active = [...CYCLES].reverse().find(([, , t]) => f >= t - 4)?.[0] ?? -1;
  const err = f >= ERR;
  return (
    <AbsoluteFill>
      <ZoomThrough at={dur - 13} dur={13} ox={cell.x} oy={cell.y} max={80}>
        <Ground kind="glow" />
        {WINS.map((w, i) => {
          const p = spr(f, w.at, S.snap);
          const copying = CYCLES.some(([wi, , t]) => wi === i && f >= t && f < t + 18);
          return (
            <div key={w.n} style={{position: 'absolute', left: w.x, top: w.y, width: WW, height: WH, borderRadius: 14, background: '#fff', border: '1px solid #dfe7e8', boxShadow: active === i ? '0 30px 70px -20px rgba(5,60,63,.4)' : '0 16px 40px -20px rgba(5,60,63,.25)', transform: `rotate(${w.r}deg) scale(${0.85 + Math.min(1, p) * 0.15 + (active === i ? 0.03 : 0)})`, opacity: Math.min(1, p), overflow: 'hidden', fontFamily: F.text, zIndex: active === i ? 6 : 2}}>
              <div style={{height: 34, background: '#f3f6f6', display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', fontSize: 13, fontWeight: 600, color: C.ink2, borderBottom: `3px solid ${w.c}`}}>{['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 9, height: 9, borderRadius: 9, background: c}} />)}<span style={{marginLeft: 6}}>{w.n}</span></div>
              {Array.from({length: 6}).map((_, r) => (
                <div key={r} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', height: 36, borderBottom: '1px solid #eef2f2', alignItems: 'center', fontFamily: r ? F.mono : F.text, fontSize: 13, color: C.ink2, fontWeight: r === 0 || r === 5 ? 650 : 400, background: r === 0 ? '#f7fafa' : '#fff'}}>
                  {[0, 1, 2].map((c) => {
                    const tot = r === 5 && c === 2;
                    return <div key={c} style={{padding: '0 10px', textAlign: c ? 'right' : 'left', outline: tot && copying ? `2.5px dashed ${C.cyan}` : 'none', outlineOffset: -3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: c ? 'flex-end' : 'flex-start', background: tot ? 'rgba(0,185,239,.08)' : 'none'}}>
                      {r === 0 ? ['Week', 'Reach', 'Clicks'][c] : r === 5 ? (c === 0 ? 'Total' : c === 2 ? fmt(val(Math.min(i, 2))) : '') : c === 0 ? `W${40 + r}` : fmt(((r * 37 + c * 91 + i * 53) % 900) + 120)}
                    </div>;
                  })}
                </div>
              ))}
            </div>
          );
        })}
        {/* master report */}
        <div style={{position: 'absolute', left: MX, top: MY, width: MW, borderRadius: 16, background: '#fff', border: '1px solid #dfe7e8', boxShadow: '0 40px 90px -30px rgba(5,60,63,.4)', overflow: 'hidden', fontFamily: F.text, zIndex: 4, opacity: prog(f, 16, 12), transform: `scale(${0.94 + prog(f, 16, 16, E.snappy) * 0.06})`}}>
          <div style={{height: 46, background: '#f3f6f6', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', fontSize: 16, fontWeight: 700, color: C.ink, borderBottom: `3px solid ${C.teal}`}}>{['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 11, height: 11, borderRadius: 9, background: c}} />)}<span style={{marginLeft: 8}}>MASTER_report_October.xlsx</span></div>
          <div style={{display: 'grid', gridTemplateColumns: '220px 240px 1fr', height: 46, alignItems: 'center', background: '#f7fafa', fontSize: 15, fontWeight: 650, color: C.ink2, padding: '0 20px', borderBottom: '1px solid #eef2f2'}}><span>Channel</span><span style={{textAlign: 'right'}}>This month</span><span style={{textAlign: 'right'}}>Last month</span></div>
          {ROWS.map((n, r) => {
            const hit = CYCLES.find(([, rr, t]) => rr === r && f >= t + 18);
            const bad = err && r === 2;
            return (
              <div key={n} style={{display: 'grid', gridTemplateColumns: '220px 240px 1fr', height: 54, alignItems: 'center', fontSize: 17, padding: '0 20px', borderBottom: '1px solid #eef2f2', color: C.ink}}>
                <span>{n}</span>
                <span style={{textAlign: 'right', fontFamily: F.mono, padding: '6px 10px', borderRadius: 6, background: bad ? 'rgba(171,53,39,.14)' : hit ? 'rgba(0,185,239,.12)' : 'none', color: bad ? '#ab3527' : C.ink, outline: bad ? '2.5px solid #ab3527' : 'none', fontWeight: bad ? 700 : 400}}>{bad ? '#REF!' : hit ? fmt(val(hit[0])) : ''}</span>
                <span style={{textAlign: 'right', fontFamily: F.mono, color: C.ink3}}>{fmt(3900 + r * 611)}</span>
              </div>
            );
          })}
        </div>
        {CYCLES.map(([w, r, t], k) => {
          const s = srcCell(WINS[w]), m = masterCell(r);
          return <React.Fragment key={k}>
            {f >= t && f < t + 9 && <div style={{position: 'absolute', left: s.x + 24, top: s.y - 58, zIndex: 20, background: C.ink, color: '#fff', borderRadius: 10, padding: '7px 13px', fontFamily: F.mono, fontSize: 17}}>Ctrl + C</div>}
            {f >= t + 18 && f < t + 27 && <div style={{position: 'absolute', left: m.x + 24, top: m.y - 58, zIndex: 20, background: C.ink, color: '#fff', borderRadius: 10, padding: '7px 13px', fontFamily: F.mono, fontSize: 17}}>Ctrl + V</div>}
            <Ripple x={s.x} y={s.y} at={t} />
          </React.Fragment>;
        })}
        {err && <div style={{position: 'absolute', left: MX + 400, top: MY + 360, width: 440, zIndex: 21, display: 'flex', gap: 14, alignItems: 'center', background: '#fff', borderRadius: 18, padding: '16px 20px', fontFamily: F.text, boxShadow: '0 30px 60px -20px rgba(80,20,10,.4)', border: '1.5px solid rgba(171,53,39,.35)', opacity: Math.min(1, spr(f, ERR + 3, S.snap))}}>
          <span style={{width: 40, height: 40, borderRadius: 12, background: '#ab3527', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 22}}>!</span>
          <div><div style={{fontSize: 18, fontWeight: 700, color: C.ink}}>Totals don’t match</div><div style={{fontSize: 15, color: C.ink3}}>Website figure pasted into Instagram</div></div>
        </div>}
        <Cursor path={path} clicks={CYCLES.flatMap(([, , t]) => [t, t + 18])} show={18} />
        <Typewriter ops={[[2, 'type', 'Copy. Switch file. Paste. Again.']]} size={60} cps={22} style={TOP} />
      </ZoomThrough>
    </AbsoluteFill>
  );
};
