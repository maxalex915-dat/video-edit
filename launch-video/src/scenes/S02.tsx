import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Words, Cursor, Ripple, Drift, prog, spr, S, E, C, F, useF, Cue} from './common';
import {fmt} from '../components/kit/Type';

// Pain 1: one report, seven exports. Switch tab, copy, switch, paste... until one paste lands in the wrong cell.
const TABS = ['LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'GA4', 'Search', 'REPORT'];
const WX = 800, WY = 150, WW = 1040, WH = 760;
const tabX = (i: number) => WX + 20 + i * 132 + 60, tabY = WY + WH - 30;
const cell = (r: number, c: number) => ({x: WX + 16 + 70 + (c - 1) * 150 + 75, y: WY + 128 + r * 52 + 26});
// [frame, action, arg]
const STEPS: [number, 'tab' | 'copy' | 'paste', number][] = [
  [20, 'tab', 1], [28, 'copy', 0], [38, 'tab', 6], [44, 'paste', 2],
  [54, 'tab', 2], [60, 'copy', 0], [68, 'tab', 6], [72, 'paste', 3],
  [80, 'tab', 4], [85, 'copy', 0], [91, 'tab', 6], [95, 'paste', 3],
];
const ERR = 95;
export const sfx: Cue[] = STEPS.map(([at, a]) => ({at, s: a === 'tab' ? 'click' : a === 'copy' ? 'key1' : 'key3', v: a === 'tab' ? 0.35 : 0.45})).concat([{at: ERR + 2, s: 'pop', v: 0.4}, {at: 100, s: 'tick', v: 0.3}]);
const val = (tab: number, r: number, c: number) => ((tab * 131 + r * 37 + c * 91) % 900) * 7 + 120;
export const S02: React.FC<{dur: number; bare?: boolean}> = ({dur, bare = false}) => {
  const f = useF();
  const done = STEPS.filter(([t]) => f >= t);
  const tab = [...done].reverse().find(([, a]) => a === 'tab')?.[2] ?? 0;
  const copying = done.length > 0 && done[done.length - 1][1] === 'copy';
  const pasted = done.filter(([, a]) => a === 'paste').map(([, , r]) => r);
  const err = f >= ERR;
  // cursor waypoints from the steps
  const path = [{f: 6, x: 1500, y: 1000}, ...STEPS.map(([t, a, arg]) => {const p = a === 'tab' ? {x: tabX(arg), y: tabY} : a === 'copy' ? cell(4, 3) : cell(arg, 2); return {f: t - 3, x: p.x - 6, y: p.y - 8};})];
  const win = (k: number, at: number) => spr(f, at, S.snap);
  return (
    <AbsoluteFill>
      {!bare && <Ground kind="whitegrid" />}
      <Drift dur={dur} push={0.05} origin="1300px 520px">
        {(bare ? [['facebook_insights_oct.xlsx', 4], ['GA4_export (3).csv', 10], ['linkedin_analytics_oct.xlsx', 16], ['search_console_q4.csv', 52], ['email_stats_FINAL.xlsx', 74]] : [['GA4_export (3).csv', 52], ['linkedin_analytics_oct.xlsx', 74]]).map(([n, at], k) => {
          const p = win(k, at as number);
          return <div key={k} style={{position: 'absolute', left: WX - 70 - (bare ? 200 : 0) + k * (bare ? 90 : 40), top: WY - 70 - (bare ? 60 : 0) + k * (bare ? 26 : 30), width: WW, height: 120, borderRadius: 16, background: '#fff', border: '1px solid #dfe7e8', boxShadow: '0 20px 50px -20px rgba(5,60,63,.3)', opacity: Math.min(1, p), transform: `scale(${0.9 + Math.min(1, p) * 0.1})`, padding: '12px 16px', fontFamily: F.text, fontSize: 15, fontWeight: 600, color: C.ink2}}>
            <span style={{display: 'inline-flex', gap: 7, marginRight: 14}}>{['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 11, height: 11, borderRadius: 99, background: c, display: 'inline-block'}} />)}</span>{n}</div>;
        })}
        <div style={{position: 'absolute', left: WX, top: WY, width: WW, height: WH, background: '#fff', borderRadius: 18, border: '1px solid #dfe7e8', boxShadow: '0 40px 100px -30px rgba(5,60,63,.35)', overflow: 'hidden', fontFamily: F.text, color: C.ink2}}>
          <div style={{height: 46, background: '#f4f7f7', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', borderBottom: '1px solid #e3eaea'}}>
            {['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 12, height: 12, borderRadius: 99, background: c}} />)}
            <span style={{marginLeft: 12, fontSize: 15, fontWeight: 650, color: C.ink}}>monthly_report_FINAL_v7.xlsx</span>
          </div>
          <div style={{display: 'flex', gap: 10, padding: '10px 16px', fontFamily: F.mono, fontSize: 15, borderBottom: '1px solid #e3eaea', color: C.ink3}}><span style={{width: 60}}>{tab === 6 ? 'B4' : 'C5'}</span><span>{tab === 6 ? '=' + "'GA4'!C5" : fmt(val(tab, 4, 3))}</span></div>
          <div style={{padding: '0 16px'}}>
            {Array.from({length: 11}).map((_, r) => (
              <div key={r} style={{display: 'grid', gridTemplateColumns: '70px repeat(6, 150px)', borderBottom: '1px solid #eef2f2', height: 52, alignItems: 'center'}}>
                {Array.from({length: 7}).map((_, c) => {
                  const isCopy = tab !== 6 && copying && r === 4 && c === 3;
                  const isPaste = tab === 6 && c === 2 && pasted.includes(r);
                  const bad = tab === 6 && err && r === 3 && c === 2;
                  const head = r === 0;
                  const txt = c === 0 ? (head ? '' : r) : head ? (tab === 6 ? ['Channel', 'This month', 'Last month', 'Change', 'Notes', ''][c - 1] : ['Date', 'Reach', 'Clicks', 'Views', 'Saves', 'Shares'][c - 1]) : tab === 6 ? (c === 1 ? ['', 'LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'Website', 'Search', 'Email', 'Total', '', ''][r] : isPaste ? (bad ? '#REF!' : fmt(val(r, 4, 3))) : c === 3 && r < 8 ? fmt(val(9, r, c)) : '') : c === 1 ? `${r} Oct` : fmt(val(tab, r, c));
                  return (
                    <div key={c} style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: c > 1 || (tab !== 6 && c === 1) ? 'flex-end' : 'flex-start', padding: '0 12px', borderLeft: c ? '1px solid #eef2f2' : 'none', fontFamily: !head && c > 1 ? F.mono : F.text, fontSize: 16, fontWeight: head ? 650 : 400,
                      background: bad ? 'rgba(171,53,39,.14)' : isPaste ? 'rgba(0,185,239,.10)' : c === 0 || head ? '#f7fafa' : '#fff', color: bad ? '#ab3527' : undefined,
                      outline: isCopy ? `2.5px dashed ${C.cyan}` : bad ? '2.5px solid #ab3527' : 'none', outlineOffset: -3}}>{txt}</div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, background: '#f4f7f7', borderTop: '1px solid #e3eaea', display: 'flex', alignItems: 'center', gap: 4, padding: '0 20px'}}>
            {TABS.map((t, i) => <span key={t} style={{width: 128, textAlign: 'center', padding: '9px 0', borderRadius: 8, fontSize: 15, fontWeight: i === tab ? 700 : 500, background: i === tab ? '#fff' : 'none', color: i === tab ? (i === 6 ? C.teal : C.ink) : C.ink3, boxShadow: i === tab ? '0 1px 4px rgba(5,60,63,.18)' : 'none'}}>{t}</span>)}
          </div>
        </div>
        {STEPS.filter(([, a]) => a !== 'tab').map(([t, a], k) => {
          const show = f >= t && f < t + 8;
          const p = cell(a === 'copy' ? 4 : 2, a === 'copy' ? 3 : 2);
          return show ? <div key={k} style={{position: 'absolute', left: p.x + 30, top: p.y - 60, background: C.ink, color: '#fff', borderRadius: 10, padding: '7px 13px', fontFamily: F.mono, fontSize: 17, opacity: 1 - prog(f, t + 4, 4)}}>{a === 'copy' ? 'Ctrl + C' : 'Ctrl + V'}</div> : null;
        })}
        {STEPS.filter(([, a]) => a === 'tab').map(([t, , i], k) => <Ripple key={k} x={tabX(i)} y={tabY} at={t} />)}
        <Cursor path={path} clicks={STEPS.map(([t]) => t)} show={6} />
        {err && <div style={{position: 'absolute', left: WX + 520, top: WY + 250, width: 470, display: 'flex', gap: 14, alignItems: 'center', background: '#fff', borderRadius: 18, padding: '16px 20px', fontFamily: F.text, boxShadow: '0 30px 60px -20px rgba(80,20,10,.4)', border: '1.5px solid rgba(171,53,39,.35)', opacity: Math.min(1, spr(f, ERR + 3, S.snap)), transform: `translateY(${(1 - Math.min(1, spr(f, ERR + 3, S.snap))) * 20}px)`}}>
          <span style={{width: 40, height: 40, borderRadius: 12, background: '#ab3527', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 22}}>!</span>
          <div><div style={{fontSize: 18, fontWeight: 700, color: C.ink}}>Totals don’t match last month</div><div style={{fontSize: 15, color: C.ink3}}>Instagram figure pasted over Facebook</div></div>
        </div>}
      </Drift>
      {!bare && <><Headline on="white" a="Copy. Switch. Paste. Repeat." size={68} style={{left: 110, top: 380, width: 640}} at={2} />
      <div style={{position: 'absolute', left: 110, top: 560, width: 640, fontFamily: F.display, fontWeight: 700, fontSize: 52, lineHeight: 1.05, letterSpacing: '-0.035em'}}>
        <Words text="One wrong cell breaks the report." at={ERR + 2} size={52} grad style={{}} />
      </div></>}
    </AbsoluteFill>
  );
};
