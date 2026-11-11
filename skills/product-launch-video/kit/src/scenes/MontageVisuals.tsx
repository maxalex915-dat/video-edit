import React from 'react';
import {E, prog, spr, S, lerp} from '../motion';
import {glow} from '../look';
import {F, INK, MUTE, C0, C1, C2, GRAD, inkA, shadeA} from '../brand';

// One small live UI card per montage item (760 x 440). f = frames since the item arrived (60 = settled, for the fan).
const CW = 760, CH = 440;
const Card: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
  <div style={{position: 'relative', width: CW, height: CH, borderRadius: 28, background: 'rgba(255,255,255,.97)', ...glow(), overflow: 'hidden', fontFamily: F.text, color: INK}}>
    <div style={{position: 'absolute', left: 32, top: 26, fontFamily: F.display, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em'}}>{title}</div>
    {children}
  </div>
);
const Av: React.FC<{t: string; c: string; x: number; y: number; s?: number}> = ({t, c, x, y, s = 44}) => (
  <div style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: 99, background: c, color: '#fff', fontSize: s * 0.36, fontWeight: 700, display: 'grid', placeItems: 'center', border: '3px solid #fff'}}>{t}</div>
);
const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US');

// 0 drag-and-drop shifts: a mini week with one card lifting and landing in an empty slot
const Drag: React.FC<{f: number}> = ({f}) => {
  const tr = prog(f, 8, 22, E.soft), lift = prog(f, 4, 6) * (1 - prog(f, 30, 6));
  const cols = 5, cw = 128, x0 = 40, y0 = 96;
  const filled = [[0, 0], [1, 0], [3, 0], [0, 1], [2, 1], [4, 1], [1, 2], [2, 2], [3, 2]];
  const col = [C0, C1, C2];
  return (
    <Card title="This week">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => <div key={d} style={{position: 'absolute', left: x0 + i * (cw + 8), top: 74, width: cw, textAlign: 'center', fontSize: 16, fontWeight: 600, color: MUTE}}>{d}</div>)}
      {filled.map(([c, r], i) => <div key={i} style={{position: 'absolute', left: x0 + c * (cw + 8), top: y0 + 12 + r * 96, width: cw, height: 80, borderRadius: 14, background: `${col[r]}18`, borderLeft: `5px solid ${col[r]}`, boxSizing: 'border-box'}} />)}
      <div style={{position: 'absolute', left: x0 + 4 * (cw + 8), top: y0 + 12 + 2 * 96, width: cw, height: 80, borderRadius: 14, border: `2px dashed ${C2}66`, boxSizing: 'border-box', opacity: 1 - prog(f, 30, 4)}} />
      <div style={{position: 'absolute', left: lerp(tr, x0 + 2 * (cw + 8), x0 + 4 * (cw + 8)), top: lerp(tr, y0 + 12 + 3 * 96 + 10, y0 + 12 + 2 * 96) - lift * 10, width: cw, height: 80, borderRadius: 14, background: GRAD, color: '#fff', fontSize: 17, fontWeight: 600, padding: '14px 0 0 16px', boxSizing: 'border-box', transform: `scale(${1 + lift * 0.05}) rotate(${-2 * lift}deg)`, boxShadow: `0 ${8 + lift * 20}px ${20 + lift * 24}px -10px ${shadeA(0.45)}`}}>17:00-23:00</div>
    </Card>
  );
};
// 1 swap requests: a request with Approve; on approval the button turns into a confirmation
const Swap: React.FC<{f: number}> = ({f}) => {
  const ok = prog(f, 22, 8, E.snappy);
  return (
    <Card title="Swap request">
      <Av t="TW" c={C0} x={40} y={100} s={72} /><Av t="MC" c={C2} x={200} y={100} s={72} />
      <svg width="60" height="20" style={{position: 'absolute', left: 126, top: 126}}><path d="M2 10 H52 M44 3 L52 10 L44 17" stroke={C1} strokeWidth={3} fill="none" strokeLinecap="round" /></svg>
      <div style={{position: 'absolute', left: 300, top: 104, fontSize: 24, fontWeight: 600}}>Tom asks Maya to cover</div>
      <div style={{position: 'absolute', left: 300, top: 142, fontSize: 20, color: MUTE}}>Friday 14 Nov · 17:00-23:00 · Server</div>
      <div style={{position: 'absolute', left: 40, top: 220, right: 40, height: 1, background: inkA(0.08)}} />
      <div style={{position: 'absolute', left: 40, top: 246, fontSize: 19, color: MUTE}}>Maya: 30h this week, no overtime</div>
      <div style={{position: 'absolute', left: 40, top: 320, height: 64, width: 240, borderRadius: 99, background: inkA(0.05), display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 600, opacity: 1 - ok}}>Decline</div>
      <div style={{position: 'absolute', left: lerp(ok, 300, 40), top: 320, height: 64, width: lerp(ok, 240, 680), borderRadius: 99, background: GRAD, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 600}}>{ok > 0.5 ? 'Swap approved' : 'Approve'}</div>
    </Card>
  );
};
// 2 labour forecast: bars for the week grow, a budget line, the total counts up
const Forecast: React.FC<{f: number}> = ({f}) => {
  const vals = [0.42, 0.48, 0.55, 0.62, 0.92, 1, 0.74];
  const tot = 8620 * prog(f, 2, 34, E.snappy);
  return (
    <Card title="Labour forecast, next week">
      <div style={{position: 'absolute', right: 32, top: 22, fontFamily: F.display, fontSize: 40, fontWeight: 600, fontVariantNumeric: 'tabular-nums', backgroundImage: GRAD, WebkitBackgroundClip: 'text', color: 'transparent'}}>{money(tot)}</div>
      <div style={{position: 'absolute', right: 32, top: 76, fontSize: 17, color: MUTE}}>27.6% of forecast sales</div>
      {vals.map((v, i) => {
        const g = spr(f, 2 + i * 3, S.soft);
        return <React.Fragment key={i}>
          <div style={{position: 'absolute', left: 60 + i * 96, bottom: 70, width: 56, height: 240 * v * Math.min(1, g), borderRadius: 12, background: `linear-gradient(0deg, ${C0}, ${C1} 60%, ${C2})`, opacity: i >= 4 ? 1 : 0.55}} />
          <div style={{position: 'absolute', left: 60 + i * 96, bottom: 34, width: 56, textAlign: 'center', fontSize: 16, fontWeight: 600, color: MUTE}}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
        </React.Fragment>;
      })}
      <div style={{position: 'absolute', left: 40, right: 40, bottom: 70 + 240 * 0.85, borderTop: `2px dashed ${inkA(0.3)}`, opacity: prog(f, 20, 10)}} />
      <div style={{position: 'absolute', right: 40, bottom: 76 + 240 * 0.85, fontSize: 15, fontWeight: 600, color: MUTE, opacity: prog(f, 20, 10)}}>Budget</div>
    </Card>
  );
};
// 3 overtime alerts (weekly AI summary): three short flags appear one by one
const Alerts: React.FC<{f: number}> = ({f}) => {
  const rows: [string, string, string][] = [['#e5484d', 'Luca reaches 44h if he works Sunday', 'Move Sunday to Kenji'], ['#f5a524', 'Bar is short on Friday after 22:00', 'Add one bartender'], ['#2fb36b', 'Floor hours are on budget', 'No change needed']];
  return (
    <Card title="Weekly AI summary">
      <div style={{position: 'absolute', right: 32, top: 26, height: 34, padding: '0 16px', borderRadius: 99, background: GRAD, color: '#fff', fontSize: 16, fontWeight: 600, display: 'grid', placeItems: 'center'}}>Mon 17 Nov</div>
      {rows.map(([c, t, a], i) => {
        const q = prog(f, 4 + i * 8, 16, E.snappy);
        return (
          <div key={i} style={{position: 'absolute', left: 32, right: 32, top: 92 + i * 108, height: 92, borderRadius: 18, background: inkA(0.035), opacity: q, transform: `translateX(${(1 - q) * -40}px)`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box'}}>
            <div style={{width: 14, height: 14, borderRadius: 99, background: c, flexShrink: 0}} />
            <div><div style={{fontSize: 21, fontWeight: 600, whiteSpace: 'nowrap'}}>{t}</div><div style={{fontSize: 17, color: MUTE, marginTop: 4}}>{a}</div></div>
          </div>
        );
      })}
    </Card>
  );
};
// 4 staff availability: who can work which day
const Avail: React.FC<{f: number}> = ({f}) => {
  const ppl: [string, string, number[]][] = [['MC', C2, [1, 1, 0, 1, 1, 1, 0]], ['LR', C0, [1, 1, 1, 0, 1, 0, 1]], ['AB', C1, [0, 0, 1, 1, 1, 1, 1]], ['TW', C0, [1, 0, 1, 0, 1, 1, 1]]];
  return (
    <Card title="Staff availability">
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} style={{position: 'absolute', left: 170 + i * 80, top: 82, width: 50, textAlign: 'center', fontSize: 16, fontWeight: 600, color: MUTE}}>{d}</div>)}
      {ppl.map(([t, c, days], r) => (
        <React.Fragment key={r}>
          <Av t={t} c={c} x={60} y={120 + r * 76} s={52} />
          {days.map((ok, i) => {
            const q = spr(f, 2 + r * 3 + i, S.pop);
            return <div key={i} style={{position: 'absolute', left: 170 + i * 80, top: 124 + r * 76, width: 50, height: 44, borderRadius: 12, background: ok ? `${C1}22` : inkA(0.05), border: ok ? `1.5px solid ${C1}66` : 'none', transform: `scale(${Math.min(1.05, q)})`, opacity: Math.min(1, q), display: 'grid', placeItems: 'center'}}>
              {ok ? <svg width="20" height="16"><path d="M2 8 L8 13 L18 2" stroke={C1} strokeWidth={3} fill="none" strokeLinecap="round" /></svg> : <div style={{width: 14, height: 2, background: inkA(0.25)}} />}
            </div>;
          })}
        </React.Fragment>
      ))}
    </Card>
  );
};
// 5 time-off requests: dates on a calendar, then an Approved stamp
const TimeOff: React.FC<{f: number}> = ({f}) => {
  const stamp = spr(f, 20, S.pop);
  return (
    <Card title="Time off">
      <div style={{position: 'absolute', left: 32, top: 70, fontSize: 19, color: MUTE}}>Sofia Garcia · 22-24 December</div>
      {Array.from({length: 21}).map((_, i) => {
        const day = 8 + i, on = day >= 22 && day <= 24;
        const q = prog(f, 4 + (on ? (day - 22) * 3 : 0), 10);
        return <div key={i} style={{position: 'absolute', left: 40 + (i % 7) * 96, top: 120 + Math.floor(i / 7) * 92, width: 80, height: 76, borderRadius: 16, background: on ? GRAD : inkA(0.035), opacity: on ? q : 1, color: on ? '#fff' : INK, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 600}}>{day}</div>;
      })}
      <div style={{position: 'absolute', right: 40, bottom: 34, padding: '10px 26px', borderRadius: 14, border: `3px solid ${C1}`, color: C1, fontFamily: F.display, fontSize: 30, fontWeight: 700, transform: `rotate(-8deg) scale(${Math.min(1.08, stamp)})`, opacity: Math.min(1, stamp), background: '#fff'}}>Approved</div>
    </Card>
  );
};
const ALL = [Drag, Swap, Forecast, Alerts, Avail, TimeOff];
export const featureVisual = (k: number, f: number) => {
  const V = ALL[k] ?? Drag;
  return <V f={f} />;
};
