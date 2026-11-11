import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {Ripple, cursorPos, Way} from '../components/kit/Anim';
import {Words, glow, BRAND, GR, CY, SKY, INK, Pop, Swish} from './Look';

// Weekly AI report, then the action plan, in one continuous shot on the brand field.
// 1) The report lands on the left; four recommendations lift out of it one by one into a stack on the right.
// 2) "Turn insights into an action plan": the report falls away, a board with To do, In progress and Done
//    rises, and the four recommendations fly into To do. The cursor drags the first into In progress, the
//    second after it, then the first on to Done.
// Figures are demo data.
const W = '#fff', MUTE = '#5b6f74';
type Rec = {cat: string; pri: 'High' | 'Medium'; t: string; why: string; m: string; who: string};
const RECS: Rec[] = [
  {cat: 'Social', pri: 'High', t: 'Publish two more factory handover stories', why: 'Handover posts reached 2.4x the usual audience', m: '2.4x reach', who: 'NK'},
  {cat: 'Search', pri: 'High', t: 'Refresh the office fit-out page', why: 'It slipped from #3 to #7 on Google', m: '#3 to #7', who: 'TR'},
  {cat: 'Content', pri: 'Medium', t: 'Cut the Long An case study into a short video', why: 'Video views rose 44% this month', m: '+44% views', who: 'AO'},
  {cat: 'Email', pri: 'Medium', t: 'Resend the newsletter to people who missed it', why: 'Opens fell to 21% this week', m: '21% opens', who: 'MH'},
];
const CW = 640, CH = 150; // a recommendation card at its own size
const RecCard: React.FC<{r: Rec; badge: number; done: number}> = ({r, badge, done}) => (
  <div style={{width: CW, height: CH, borderRadius: 26, background: 'rgba(255,255,255,.97)', boxSizing: 'border-box', padding: '20px 24px', fontFamily: F.text, color: INK, position: 'relative', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 7, background: `linear-gradient(180deg, ${GR}, ${CY} 60%, ${SKY})`}} />
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <span style={{fontSize: 14, fontWeight: 700, letterSpacing: '.12em', backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>{r.cat.toUpperCase()}</span>
      <span style={{fontSize: 13, fontWeight: 700, color: r.pri === 'High' ? '#c4501b' : '#a87412', background: r.pri === 'High' ? '#fcf0ea' : '#fdf6e4', borderRadius: 99, padding: '3px 11px'}}>{r.pri}</span>
      <span style={{marginLeft: 'auto', fontSize: 15, fontWeight: 700, color: '#0a6f86', background: '#e8f6fb', borderRadius: 99, padding: '4px 12px', fontVariantNumeric: 'tabular-nums'}}>{r.m}</span>
    </div>
    <div style={{fontFamily: F.display, fontSize: 27, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: done > 0.5 ? 'line-through' : undefined, textDecorationColor: 'rgba(16,36,42,.35)'}}>{r.t}</div>
    <div style={{fontSize: 18, color: MUTE, marginTop: 6}}>{r.why}</div>
    <span style={{position: 'absolute', right: 20, bottom: 18, width: 38, height: 38, borderRadius: 99, background: done > 0.5 ? `linear-gradient(135deg, ${GR}, ${CY})` : '#0a5d63', color: W, fontSize: 14, fontWeight: 700, display: 'grid', placeItems: 'center', transform: `scale(${badge})`, opacity: Math.min(1, badge)}}>{done > 0.5 ? '✓' : r.who}</span>
  </div>
);

// board geometry (screen space)
const BX = 150, BY = 300, COLW = 520, GAP = 35, SC = 0.74, ROW = CH * SC + 16;
const slot = (col: number, i: number): [number, number, number] => [BX + col * (COLW + GAP) + (COLW - CW * SC) / 2, BY + 86 + i * ROW, SC];
const stackSlot = (k: number): [number, number, number] => [1110, 250 + k * 178, 1.08];
// each card: [frame, column (-1 = stack beside the report), row]
const MOVES: [number, number, number][][] = [
  [[0, -1, 0], [150, 0, 0], [205, 1, 0], [258, 2, 1]],
  [[0, -1, 1], [156, 0, 1], [205, 0, 0], [232, 1, 1], [258, 1, 0]],
  [[0, -1, 2], [162, 0, 2], [205, 0, 1], [232, 0, 0]],
  [[0, -1, 3], [168, 0, 3], [205, 0, 2], [232, 0, 1]],
];
const MV = 16;
const posOf = (k: number, f: number): [number, number, number] => {
  const m = MOVES[k];
  let [x, y, s] = m[0][1] < 0 ? stackSlot(m[0][2]) : slot(m[0][1], m[0][2]);
  for (let i = 1; i < m.length; i++) {
    const [t, c, r] = m[i];
    const [tx, ty, ts] = c < 0 ? stackSlot(r) : slot(c, r);
    const p = prog(f, t, MV, E.inOut);
    x = lerp(p, x, tx); y = lerp(p, y, ty); s = lerp(p, s, ts);
  }
  return [x, y, s];
};
// drags done with the cursor: [card, start frame]
const DRAGS: [number, number][] = [[0, 205], [1, 232], [0, 258]];

const SOFT = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
// a teammate's cursor: the usual arrow in their colour with their name beside it
const Teammate: React.FC<{name: string; color: string; path: Way[]; clicks: number[]; show: number}> = ({name, color, path, clicks, show}) => {
  const f = useF();
  const {x, y} = cursorPos(f, path, SOFT);
  const press = clicks.reduce((m, c) => Math.max(m, f >= c && f < c + 6 ? 1 - Math.abs(f - c - 2) / 4 : 0), 0);
  const o = prog(f, show, 8);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: o, zIndex: 30, transform: `scale(${1 - press * 0.12})`, transformOrigin: '0 0'}}>
      <svg width="34" height="40" viewBox="0 0 34 40" style={{position: 'absolute', left: -3, top: -3, overflow: 'visible', filter: 'drop-shadow(0 6px 8px rgba(5,40,44,.3))'}}>
        <path d="M3 3 L3 33 L11 25 L17 37 L23 34 L17 22 L28 22 Z" fill={color} stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
      </svg>
      <span style={{position: 'absolute', left: 26, top: 30, fontFamily: F.text, fontSize: 20, fontWeight: 700, color: W, background: color, borderRadius: 99, padding: '5px 14px', whiteSpace: 'nowrap', boxShadow: '0 8px 18px -8px rgba(5,40,44,.4)', border: '2px solid #fff'}}>{name}</span>
    </div>
  );
};
export const Report: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const doc = spr(f, 6, S.soft);
  const docOut = prog(f, 128, 22, E.inOut);
  const board = spr(f, 134, S.soft);
  const t1out = 124;
  // cursor: comes in, then grabs each card at its current spot and rides with it
  // three people work on the board at once, each with their own cursor and name
  const grab = (k: number, at: number, ox: number, oy: number, from: Way, end: Way): Way[] => {
    const [x0, y0, s0] = posOf(k, at - 1);
    const pts: Way[] = [from, {f: at - 6, x: x0 + CW * s0 * ox, y: y0 + CH * s0 * oy}];
    for (let g = 0; g <= MV; g += 2) {const [x, y, sc] = posOf(k, at + g); pts.push({f: at + g, x: x + CW * sc * ox, y: y + CH * sc * oy});}
    pts.push(end);
    return pts;
  };
  const pA = [...grab(0, 205, 0.5, 0.45, {f: 172, x: 760, y: 1120}, {f: 236, x: 820, y: 560}).slice(0, -1), ...grab(0, 258, 0.5, 0.45, {f: 236, x: 820, y: 560}, {f: dur + 20, x: 1500, y: 640})];
  const pB = grab(1, 232, 0.62, 0.5, {f: 180, x: 120, y: 1100}, {f: dur + 20, x: 800, y: 760});
  const pC: Way[] = [{f: 186, x: 1960, y: 900}, {f: 214, x: 330, y: 760}, {f: 236, x: 300, y: 720}, {f: 252, x: 360, y: 600}, {f: 275, x: 1440, y: 820}, {f: dur + 20, x: 1460, y: 840}];
  const PEOPLE: [string, string, Way[], number[], number][] = [['Dat', GR, pA, [203, 256], 176], ['Sophie', CY, pB, [230], 186], ['Lucas', '#f08a5d', pC, [], 192]];
  return (
    <AbsoluteFill>
      <Swish at={6} />{RECS.map((_, k) => <Pop key={k} at={40 + k * 14} k={k} v={0.18} />)}
      <Swish at={130} k={1} v={0.14} />{RECS.map((_, k) => <Pop key={`b${k}`} at={150 + k * 6 + 12} k={k} v={0.1} />)}
      {DRAGS.map(([, at], i) => <React.Fragment key={i}><Pop at={at - 2} k={i} v={0.16} /><Swish at={at + 2} k={i} v={0.08} /><Pop at={at + MV} k={i + 1} v={0.22} /></React.Fragment>)}
      {/* titles */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 96, zIndex: 5}}>
        {f < t1out + 10 ? <Words parts={[['Weekly AI reports']]} at={2} size={66} color={W} out={t1out} /> : <Words parts={[['Turn insights into'], ['an action plan', false]]} at={136} size={66} color={W} />}
      </div>
      <div style={{position: 'absolute', inset: 0, perspective: 2400, perspectiveOrigin: '960px 500px'}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateX(${lerp(prog(f, 0, dur, (q) => q), 12, 6)}deg)`, transformOrigin: '960px 640px'}}>
          {/* the report */}
          {docOut < 1 && (
            <div style={{position: 'absolute', left: 130, top: 250, width: 860, borderRadius: 30, background: 'rgba(255,255,255,.97)', padding: '34px 40px', boxSizing: 'border-box', fontFamily: F.text, color: INK, ...glow(1.1), transform: `translateY(${(1 - Math.min(1, doc)) * 160 + docOut * 120}px) translateX(${-docOut * 420}px) rotateY(${10 + docOut * 20}deg)`, opacity: Math.min(1, doc) * (1 - docOut), transformOrigin: '0 50%'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 46, height: 46, borderRadius: 14, background: BRAND}} /><b style={{fontSize: 21}}>Weekly AI report</b><span style={{fontSize: 15, color: MUTE, background: '#eef4f5', borderRadius: 99, padding: '5px 14px'}}>2 to 8 November</span></div>
              <div style={{fontFamily: F.display, fontSize: 40, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '22px 0 18px', color: '#055e63'}}>Factory handover stories carried the week. Search slipped on one key page.</div>
              <svg width="780" height="190" style={{display: 'block'}}>
                <defs><linearGradient id="rpA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={CY} stopOpacity=".35" /><stop offset="1" stopColor={CY} stopOpacity="0" /></linearGradient><linearGradient id="rpL" x1="0" x2="1"><stop offset="0" stopColor={GR} /><stop offset=".6" stopColor={CY} /><stop offset="1" stopColor={SKY} /></linearGradient></defs>
                {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="780" y1={20 + i * 50} y2={20 + i * 50} stroke="#edf2f3" />)}
                {(() => {
                  const ys = [150, 138, 144, 120, 126, 98, 104, 70, 82, 30];
                  const n = Math.max(2, Math.round(prog(f, 14, 40) * ys.length));
                  const pts = ys.slice(0, n).map((y, i) => `${i * (780 / 9)},${y}`);
                  return <><path d={`M0,190 L${pts.join(' L')} L${(n - 1) * (780 / 9)},190 Z`} fill="url(#rpA)" /><path d={`M${pts.join(' L')}`} fill="none" stroke="url(#rpL)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></>;
                })()}
              </svg>
              <div style={{display: 'flex', gap: 12, marginTop: 18}}>
                {[['Reach', '+38%'], ['Clicks', '+12%'], ['Opens', '-6%']].map(([l, v]) => <div key={l} style={{flex: 1, background: '#f3f8f9', borderRadius: 16, padding: '12px 16px'}}><div style={{fontSize: 15, color: MUTE}}>{l}</div><div style={{fontSize: 28, fontWeight: 700, color: v.startsWith('-') ? '#c4501b' : '#2f7a4a'}}>{v}</div></div>)}
              </div>
            </div>
          )}
          {/* the board */}
          {board > 0.01 && ['To do', 'In progress', 'Done'].map((n, c) => {
            const q = Math.min(1, spr(f, 134 + c * 4, S.soft));
            const cnt = c === 0 ? 4 - [205, 232].filter((t) => f >= t + MV / 2).length : c === 1 ? (f >= 205 + MV / 2 ? 1 : 0) + (f >= 232 + MV / 2 ? 1 : 0) - (f >= 258 + MV / 2 ? 1 : 0) : 1 + (f >= 258 + MV / 2 ? 1 : 0);
            const showCnt = f >= 150 ? cnt : c === 2 ? 1 : 0;
            return (
              <div key={n} style={{position: 'absolute', left: BX + c * (COLW + GAP), top: BY, width: COLW, height: 700, borderRadius: 30, background: 'rgba(255,255,255,.28)', border: '2px solid rgba(255,255,255,.75)', boxShadow: 'inset 0 0 40px rgba(255,255,255,.25)', transform: `translateY(${(1 - q) * 240}px)`, opacity: q, fontFamily: F.text}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '22px 26px', fontSize: 24, fontWeight: 700, color: W}}>
                  <span style={{width: 14, height: 14, borderRadius: 9, background: c === 0 ? '#fff' : c === 1 ? '#ffd27a' : '#c9f29b'}} />{n}
                  <span style={{marginLeft: 'auto', fontSize: 18, background: 'rgba(255,255,255,.3)', borderRadius: 99, padding: '3px 12px'}}>{showCnt}</span>
                </div>
              </div>
            );
          })}
          {/* a card already finished last week, in Done */}
          {board > 0.01 && (() => {
            const [x, y, s] = slot(2, 0);
            const q = Math.min(1, spr(f, 142, S.soft));
            return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) translateY(${(1 - q) * 200}px)`, transformOrigin: '0 0', opacity: q * 0.85}}><RecCard r={{cat: 'Search', pri: 'Medium', t: 'Add answers to the service pages', why: 'Finished last week', m: 'Done', who: 'TR'}} badge={1} done={1} /></div>;
          })()}
          {/* the recommendations */}
          {RECS.map((r, k) => {
            const inn = spr(f, 40 + k * 14, S.soft);
            if (f < 38 + k * 14) return null;
            const [x, y, s] = posOf(k, f);
            const lifting = DRAGS.some(([kk, at]) => kk === k && f >= at - 2 && f <= at + MV + 2);
            const from = Math.min(1, inn);
            // out of the report: start small, behind, at the report's right edge
            const ox = lerp(from, 780, x), oy = lerp(from, 420, y), os = lerp(from, 0.5, s);
            const badge = spr(f, 150 + k * 6 + 10, S.pop);
            const done = k === 0 ? prog(f, 258 + MV, 2) : 0;
            return (
              <div key={k} style={{position: 'absolute', left: 0, top: 0, transform: `translate(${ox}px, ${oy}px) translateZ(${lifting ? 60 : (1 - from) * -200}px) scale(${os * (lifting ? 1.04 : 1)}) rotate(${lifting ? -2 : 0}deg)`, transformOrigin: '0 0', opacity: from, borderRadius: 26, boxShadow: lifting ? '0 40px 60px -20px rgba(0,60,90,.45)' : '0 20px 40px -24px rgba(0,60,90,.35)', zIndex: lifting ? 10 : 2}}>
                <RecCard r={r} badge={f >= 150 ? badge : 0} done={done} />
              </div>
            );
          })}
          <div style={{position: 'absolute', inset: 0, transform: 'translateZ(90px)', zIndex: 20}}>
          {DRAGS.map(([k, at], i) => {const [x, y, s] = posOf(k, at + MV); return <Ripple key={i} x={x + CW * s * 0.5} y={y + CH * s * 0.45} at={at + MV} />;})}
          {PEOPLE.map(([n, c, pth, cl, sh]) => <Teammate key={n} name={n} color={c} path={pth} clicks={cl} show={sh} />)}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export const _i = interpolate;
