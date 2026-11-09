import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {Cursor, Ripple} from '../components/kit/Anim';
import {BrandField, Mist, Words, Center, Drift, glow, BRAND, GR, CY, SKY, INK} from './Look';
import {Dial} from './Dial';

// The Site Audit section: the second key feature after "everything in one place".
// Names and figures follow the dashboard's own Site Audit (Overview, Expert Review, Tasks); figures are demo data.
const W = '#fff', MUTE = '#5b6f74';
const Tilt: React.FC<{rx: number; ry: number; rz?: number; cx?: number; cy?: number; children: React.ReactNode}> = ({rx, ry, rz = 0, cx = 960, cy = 540, children}) => (
  <div style={{position: 'absolute', inset: 0, perspective: 2200, perspectiveOrigin: `${cx}px ${cy}px`}}>
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: `${cx}px ${cy}px`, transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`}}>{children}</div>
  </div>
);

// A1. "Our own site audit tool": a tilted browser crawls archetype-group.com, page by page.
export const AuditOpen: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const turn = prog(f, 0, dur, (q) => q);
  const scan = (f % 46) / 46;
  const pages = Math.round(1240 * prog(f, 14, 70, E.inOut));
  return (
    <AbsoluteFill>
      <BrandField seed={5} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 90, zIndex: 5}}>
        <Words parts={[['Our own'], ['site audit tool.', false]]} at={2} size={84} color={W} />
        <div style={{height: 10}} />
        <Words parts={[['Like SEMrush. Built in-house.']]} at={18} size={40} color="rgba(255,255,255,.9)" weight={500} stagger={2} />
      </div>
      <Tilt rx={lerp(turn, 30, 20)} ry={lerp(turn, -18, -8)} rz={2} cy={760}>
        <div style={{position: 'absolute', left: 360, top: 420, width: 1200, height: 560, borderRadius: 26, background: 'rgba(255,255,255,.9)', ...glow(1), overflow: 'hidden', transform: `translateY(${(1 - spr(f, 4, S.soft)) * 300}px)`}}>
          <div style={{height: 54, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: '1px solid #e6eef0'}}>
            {['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 12, height: 12, borderRadius: 9, background: c}} />)}
            <span style={{marginLeft: 16, flex: 1, background: '#f1f6f7', borderRadius: 99, padding: '8px 18px', fontFamily: F.text, fontSize: 18, color: MUTE}}>archetype-group.com</span>
            <span style={{fontFamily: F.text, fontSize: 18, fontWeight: 700, color: INK, fontVariantNumeric: 'tabular-nums'}}>{pages.toLocaleString('en-US')} pages crawled</span>
          </div>
          <div style={{position: 'relative', padding: 26, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16}}>
            {Array.from({length: 18}).map((_, i) => {
              const q = prog(f, 10 + i * 2, 12, E.snappy);
              const bad = i % 5 === 2, warn = i % 4 === 1;
              return (
                <div key={i} style={{height: 128, borderRadius: 14, background: '#f6f9fa', border: '1px solid #e6eef0', opacity: q, transform: `scale(${0.9 + q * 0.1})`, padding: 12, boxSizing: 'border-box', position: 'relative'}}>
                  <div style={{height: 46, borderRadius: 8, background: 'linear-gradient(135deg, rgba(127,188,66,.25), rgba(0,185,239,.25) 55%, rgba(112,203,243,.25))'}} />
                  {[0, 1, 2].map((r) => <div key={r} style={{height: 7, borderRadius: 4, background: '#e1e9eb', marginTop: 9, width: `${90 - r * 22}%`}} />)}
                  <span style={{position: 'absolute', right: 10, top: 10, width: 14, height: 14, borderRadius: 9, background: bad ? '#d9483b' : warn ? '#e8a33d' : '#3fa45a', opacity: prog(f, 24 + i * 2, 8)}} />
                </div>
              );
            })}
            <div style={{position: 'absolute', left: 0, right: 0, top: `${scan * 100}%`, height: 90, background: `linear-gradient(180deg, transparent, rgba(0,185,239,.18) 70%, rgba(0,185,239,.5))`, borderBottom: `3px solid ${CY}`}} />
          </div>
        </div>
      </Tilt>
    </AbsoluteFill>
  );
};

// A2. The two dials, big, the main visual. Both sweep and count up together.
export const Dials: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const p = prog(f, 12, 50, E.inOut);
  const turn = prog(f, 0, dur, (q) => q);
  const D: [number, string, string, number][] = [[72, 'Site health', '114 checks, every two weeks', -1], [58, 'AI search health', 'How quotable we are in AI search', 1]];
  return (
    <AbsoluteFill>
      <Mist lift={0.7} />
      <Drift dur={dur} z={0.05}>
        {D.map(([v, label, sub, side], i) => {
          const q = spr(f, 2 + i * 5, S.soft);
          return (
            <div key={label} style={{position: 'absolute', inset: 0, perspective: 2000}}>
              <div style={{position: 'absolute', left: 960 + side * 430 - 290, top: 150, width: 580, transform: `rotateY(${side * -lerp(turn, 18, 10)}deg) translateY(${(1 - Math.min(1, q)) * 200}px)`, opacity: Math.min(1, q), textAlign: 'center'}}>
                <Dial v={v} p={p} size={580} label={label} id={`d${i}`} />
                <div style={{fontFamily: F.text, fontSize: 28, fontWeight: 500, color: MUTE, marginTop: -30, whiteSpace: 'nowrap', opacity: prog(f, 50 + i * 6, 14)}}>{sub}</div>
              </div>
            </div>
          );
        })}
      </Drift>
    </AbsoluteFill>
  );
};

// A3. Every issue sorted: errors, warnings, notices, then the categories, each a row with its count.
const CATS: [string, number, number][] = [['Internal linking', 58, 296], ['Crawlability', 64, 210], ['Site performance', 41, 188], ['AI search', 26, 186], ['Markup', 22, 140], ['On-page', 18, 96]];
export const Issues: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const turn = prog(f, 0, dur, (q) => q);
  const SEV: [string, number, string][] = [['Errors', 214, '#d9483b'], ['Warnings', 1032, '#e8a33d'], ['Notices', 610, '#7a8f94']];
  return (
    <AbsoluteFill>
      <Mist lift={0.5} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, zIndex: 5}}><Words parts={[['Every issue,'], ['sorted and explained.', true]]} at={2} size={64} /></div>
      <Tilt rx={lerp(turn, 22, 14)} ry={lerp(turn, 14, 6)} cy={640}>
        <div style={{position: 'absolute', left: 200, top: 230, display: 'flex', flexDirection: 'column', gap: 18}}>
          {SEV.map(([n, v, c], i) => {
            const q = spr(f, 6 + i * 4, S.soft);
            return (
              <div key={n} style={{width: 420, height: 170, borderRadius: 24, background: 'rgba(255,255,255,.95)', ...glow(0.8), padding: '24px 30px', boxSizing: 'border-box', fontFamily: F.text, transform: `translateX(${(1 - Math.min(1, q)) * -200}px)`, opacity: Math.min(1, q)}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 700, color: INK}}><span style={{width: 14, height: 14, borderRadius: 9, background: c}} />{n}</div>
                <div style={{fontFamily: F.display, fontSize: 70, fontWeight: 700, letterSpacing: '-0.03em', color: INK, fontVariantNumeric: 'tabular-nums'}}>{Math.round(v * prog(f, 10 + i * 4, 30, E.snappy)).toLocaleString('en-US')}</div>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 680, top: 230, width: 1040, borderRadius: 26, background: 'rgba(255,255,255,.95)', ...glow(1), padding: '26px 34px', boxSizing: 'border-box', fontFamily: F.text, color: INK, opacity: prog(f, 16, 14)}}>
          <div style={{fontSize: 24, fontWeight: 700, marginBottom: 14}}>Issues by category</div>
          {CATS.map(([n, e, w], i) => {
            const q = prog(f, 24 + i * 5, 18, E.snappy);
            return (
              <div key={n} style={{display: 'grid', gridTemplateColumns: '260px 1fr 70px 70px', alignItems: 'center', gap: 16, padding: '14px 0', borderTop: '1px solid #edf2f3', opacity: q, transform: `translateZ(${(1 - q) * 120}px) translateY(${(1 - q) * 20}px)`}}>
                <span style={{fontSize: 22, fontWeight: 600}}>{n}</span>
                <span style={{height: 14, borderRadius: 7, background: '#edf2f3', position: 'relative', overflow: 'hidden'}}><span style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(w / 300) * 100 * q}%`, background: `linear-gradient(90deg, #d9483b ${(e / w) * 100}%, #e8a33d ${(e / w) * 100}%)`, borderRadius: 7}} /></span>
                <span style={{fontSize: 20, fontWeight: 700, color: '#d9483b', textAlign: 'right'}}>{e}</span>
                <span style={{fontSize: 20, fontWeight: 700, color: '#b07a1e', textAlign: 'right'}}>{w}</span>
              </div>
            );
          })}
        </div>
      </Tilt>
    </AbsoluteFill>
  );
};

// A4. The AI expert review: SEO, GEO and content findings; the front one lifts out, "Create task" is clicked.
const FINDINGS: [string, string, string, string][] = [
  ['SEO', 'Rewrite page titles that get cut off in Google', 'High', 'Shorten the titles on the project pages to under 60 characters, with the project type first.'],
  ['GEO', 'Answer the question at the top of key pages', 'High', 'Open each service page with a two-line answer that ChatGPT and Google AI can quote.'],
  ['Content', 'Merge project pages that compete with each other', 'Medium', 'Combine the overlapping factory pages into one stronger page and redirect the others.'],
];
const CT = 92;
export const Review: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const turn = prog(f, 0, dur, (q) => q);
  const cur = Math.min(2, Math.floor(f / 30));
  const done = f >= CT + 4;
  return (
    <AbsoluteFill>
      <BrandField seed={6} />
      <div style={{position: 'absolute', left: 120, top: 330, width: 640, zIndex: 5}}>
        <Words parts={[['An AI expert\nreview, every month.']]} at={2} size={74} color={W} align="left" />
        <div style={{height: 22}} />
        <div style={{display: 'flex', gap: 12}}>
          {['SEO', 'GEO', 'Content'].map((t, i) => <span key={t} style={{fontFamily: F.text, fontSize: 28, fontWeight: 700, borderRadius: 99, padding: '12px 28px', background: i === cur ? W : 'rgba(255,255,255,.22)', color: i === cur ? INK : W, opacity: prog(f, 20 + i * 4, 10), transform: `scale(${i === cur ? 1.06 : 1})`}}>{t}</span>)}
        </div>
      </div>
      <Tilt rx={lerp(turn, 16, 10)} ry={lerp(turn, -24, -14)} cx={1300} cy={560}>
        {FINDINGS.map(([cat, title, sev, todo], i) => {
          const front = i === cur;
          const q = spr(f, 8 + i * 6, S.soft);
          const z = front ? 120 : -60 * Math.abs(i - cur);
          return (
            <div key={cat} style={{position: 'absolute', left: 860, top: 220 + i * 70, width: 900, borderRadius: 28, background: 'rgba(255,255,255,.97)', ...glow(front ? 1.1 : 0.6), padding: '28px 34px', boxSizing: 'border-box', fontFamily: F.text, color: INK, transform: `translateZ(${z}px) translateY(${(1 - Math.min(1, q)) * 200}px)`, opacity: Math.min(1, q) * (front ? 1 : 0.75), zIndex: front ? 3 : 1, transition: 'none'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <span style={{fontSize: 15, fontWeight: 700, letterSpacing: '.12em', backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>{cat.toUpperCase()}</span>
                <span style={{fontSize: 14, fontWeight: 700, color: sev === 'High' ? '#c4501b' : '#a87412', background: sev === 'High' ? '#fcf0ea' : '#fdf6e4', borderRadius: 99, padding: '4px 12px'}}>{sev}</span>
              </div>
              <div style={{fontFamily: F.display, fontSize: 36, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 12}}>{title}</div>
              <div style={{fontSize: 15, fontWeight: 700, color: MUTE, marginTop: 18, letterSpacing: '.08em'}}>WHAT TO DO</div>
              <div style={{fontSize: 22, lineHeight: 1.4, marginTop: 6}}>{todo}</div>
              <div style={{marginTop: 20, display: 'inline-block', borderRadius: 99, padding: '12px 26px', fontSize: 20, fontWeight: 700, background: front && done && i === 2 ? `linear-gradient(90deg, ${GR}, ${CY} 60%, ${SKY})` : INK, color: W}}>{front && done && i === 2 ? '✓ Task created' : 'Create task'}</div>
            </div>
          );
        })}
      </Tilt>
      <Ripple x={1012} y={720} at={CT} />
      <Cursor path={[{f: 62, x: 1500, y: 1060}, {f: CT - 3, x: 1005, y: 712}, {f: dur, x: 1030, y: 740}]} clicks={[CT]} show={62} />
    </AbsoluteFill>
  );
};

// A5. The saving: the yearly renewal is cancelled.
export const Cancel: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const strike = prog(f, 40, 12, E.inOut);
  const stamp = spr(f, 52, S.pop);
  const turn = prog(f, 0, dur, (q) => q);
  return (
    <AbsoluteFill>
      <Mist lift={0.6} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 130, zIndex: 5}}>
        <Words parts={[['Save'], ['$2,000+', true], ['a year']]} at={2} size={120} />
        <div style={{height: 8}} />
        <Words parts={[['on our SEMrush subscription.']]} at={18} size={44} weight={500} color={MUTE} stagger={2} />
      </div>
      <Tilt rx={lerp(turn, 26, 16)} ry={lerp(turn, 10, 4)} cy={700}>
        <div style={{position: 'absolute', left: 560, top: 470, width: 800, borderRadius: 28, background: 'rgba(255,255,255,.97)', ...glow(1), padding: '32px 40px', boxSizing: 'border-box', fontFamily: F.text, color: INK, transform: `translateY(${(1 - Math.min(1, spr(f, 6, S.soft))) * 260}px)`}}>
          <div style={{fontSize: 15, letterSpacing: '.14em', fontWeight: 700, color: MUTE}}>RENEWAL NOTICE</div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12}}>
            <span style={{fontSize: 32, fontWeight: 700}}>SEMrush, yearly plan</span>
            <span style={{position: 'relative', fontSize: 40, fontWeight: 750, color: strike > 0.5 ? '#9aa9ad' : INK}}>$2,000+<span style={{position: 'absolute', left: -4, top: '52%', height: 4, width: `${strike * 108}%`, background: '#d9483b', borderRadius: 2}} /></span>
          </div>
          <div style={{position: 'absolute', right: 40, bottom: -26, transform: `rotate(-8deg) scale(${Math.min(1.1, stamp)})`, opacity: Math.min(1, stamp), borderRadius: 99, padding: '14px 30px', fontSize: 26, fontWeight: 800, color: W, background: `linear-gradient(90deg, ${GR}, ${CY} 60%, ${SKY})`, boxShadow: '0 18px 40px -14px rgba(0,120,160,.5)'}}>Cancelled</div>
        </div>
      </Tilt>
    </AbsoluteFill>
  );
};
export const _c = Center;
