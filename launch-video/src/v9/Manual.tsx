import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {BrandField, Words, Pop, Swish, INK, GR, CY, SKY} from './Look';

// The old way, every week: countless spreadsheets of numbers, copied by hand into a PowerPoint report. Then again.
const XL = '#1d6f42', PP = '#c43e1c', MUTE = '#6b7f84';
const FILES = ['linkedin_export_wk44.xlsx', 'facebook_insights.xlsx', 'GA4_sessions (2).xlsx', 'search_console_oct.xlsx', 'youtube_studio.xlsx', 'getresponse_stats.xlsx', 'instagram_reach.xlsx', 'MASTER_report_v7.xlsx', 'pr_mentions_oct.xlsx', 'inquiries_log.xlsx', 'keywords_rank.xlsx', 'website_pages.xlsx', 'social_followers.xlsx', 'email_opens.xlsx'];
const num = (r: number, c: number, s: number) => {
  const v = Math.abs(Math.sin(r * 12.9898 + c * 78.233 + s * 3.7) * 43758.5453) % 1;
  return c === 0 ? `${(r % 28) + 1} Oct` : c === 1 ? Math.round(v * 9000 + 400).toLocaleString('en-US') : c === 2 ? `${(v * 9).toFixed(1)}%` : Math.round(v * 800).toString();
};
const Sheet: React.FC<{name: string; w: number; h: number; fill: number; seed: number; sel?: number; ants?: number}> = ({name, w, h, fill, seed, sel = 0, ants = 0}) => {
  const rows = Math.floor((h - 92) / 26), cols = 6;
  const shown = Math.floor(fill * rows * cols);
  return (
    <div style={{width: w, height: h, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(155deg, rgba(240,252,244,.66) 0%, rgba(196,236,208,.52) 55%, rgba(150,215,172,.46) 100%)', border: '1.5px solid rgba(255,255,255,.85)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 30px 60px -26px rgba(0,50,40,.45)', fontFamily: F.text}}>
      <div style={{height: 34, background: 'linear-gradient(90deg, rgba(29,111,66,.78), rgba(46,140,88,.55))', display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', color: '#fff', fontSize: 14, fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.5)'}}>
        <span style={{width: 18, height: 18, borderRadius: 4, background: '#fff', color: XL, fontSize: 12, fontWeight: 800, display: 'grid', placeItems: 'center'}}>X</span>{name}
      </div>
      <div style={{height: 24, background: 'rgba(255,255,255,.28)', borderBottom: '1px solid rgba(255,255,255,.55)', display: 'flex', fontSize: 11, color: '#3f5f50'}}>
        <span style={{width: 30}} />{'ABCDEF'.split('').map((l) => <span key={l} style={{flex: 1, textAlign: 'center', lineHeight: '24px', borderLeft: '1px solid rgba(255,255,255,.45)'}}>{l}</span>)}
      </div>
      <div style={{position: 'relative'}}>
        {Array.from({length: rows}).map((_, r) => (
          <div key={r} style={{display: 'flex', height: 26, borderBottom: '1px solid rgba(255,255,255,.45)', fontSize: 12.5, color: '#163a2a', fontVariantNumeric: 'tabular-nums'}}>
            <span style={{width: 30, textAlign: 'center', lineHeight: '26px', color: '#3f5f50', background: 'rgba(255,255,255,.22)', fontSize: 11}}>{r + 1}</span>
            {Array.from({length: cols}).map((_, c) => <span key={c} style={{flex: 1, lineHeight: '26px', padding: '0 6px', borderLeft: '1px solid rgba(255,255,255,.4)', textAlign: c ? 'right' : 'left', opacity: r * cols + c < shown ? 1 : 0, whiteSpace: 'nowrap', overflow: 'hidden'}}>{num(r, c, seed)}</span>)}
          </div>
        ))}
        {sel > 0 && <div style={{position: 'absolute', left: 30 + ((w - 30) / 6) * 1, top: 26, width: ((w - 30) / 6) * 3 * sel, height: 26 * 6, background: 'rgba(29,111,66,.12)', border: `2px ${ants > 0 ? 'dashed' : 'solid'} ${XL}`, borderRadius: 2}} />}
      </div>
    </div>
  );
};
const Report: React.FC<{w: number; h: number; bars: number; week: number}> = ({w, h, bars, week}) => (
  <div style={{width: w, height: h, borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(155deg, rgba(255,255,255,.66) 0%, rgba(252,228,218,.45) 60%, rgba(245,200,182,.36) 100%)', border: '1.5px solid rgba(255,255,255,.85)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9), 0 40px 80px -26px rgba(60,30,20,.45)', fontFamily: F.text, display: 'flex', flexDirection: 'column'}}>
    <div style={{height: 38, background: 'linear-gradient(90deg, rgba(196,62,28,.8), rgba(222,110,70,.58))', borderBottom: '1px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', color: '#fff', fontSize: 15, fontWeight: 600}}>
      <span style={{width: 20, height: 20, borderRadius: 4, background: '#fff', color: PP, fontSize: 13, fontWeight: 800, display: 'grid', placeItems: 'center'}}>P</span>Weekly marketing report, week {week}.pptx
    </div>
    <div style={{flex: 1, display: 'flex', gap: 14, padding: 14}}>
      <div style={{width: 120, display: 'flex', flexDirection: 'column', gap: 10}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{height: 66, borderRadius: 8, background: 'rgba(255,255,255,.5)', border: i === 1 ? '2px solid rgba(196,62,28,.7)' : '1px solid rgba(255,255,255,.8)'}} />)}</div>
      <div style={{flex: 1, background: 'rgba(255,255,255,.72)', border: '1px solid rgba(255,255,255,.9)', borderRadius: 12, padding: '26px 30px', boxShadow: '0 8px 20px -10px rgba(60,30,20,.25)', position: 'relative'}}>
        <div style={{fontSize: 30, fontWeight: 700, color: INK}}>Marketing performance, week {week}</div>
        <div style={{fontSize: 16, color: MUTE, marginTop: 4}}>LinkedIn, Facebook, Instagram, YouTube, website, search, email</div>
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 30, height: h * 0.45, display: 'flex', alignItems: 'flex-end', gap: 16, borderBottom: '2px solid #e7e2de'}}>
          {[0.55, 0.8, 0.4, 0.65, 0.9, 0.5, 0.72].map((v, i) => <div key={i} style={{flex: 1, height: `${v * 100 * Math.min(1, Math.max(0, bars * 7 - i))}%`, background: i % 2 ? '#e8907a' : PP, borderRadius: '4px 4px 0 0'}} />)}
        </div>
      </div>
    </div>
  </div>
);
// wall of sheets: [x, y, z, rotation, file index]
const WALL: [number, number, number, number][] = [[140, 260, -260, -4], [620, 200, -380, 3], [1120, 240, -300, -2], [1500, 300, -420, 4], [60, 600, -160, 3], [480, 560, -60, -3], [930, 620, -200, 2], [1380, 640, -120, -4], [260, 900, -40, -2], [760, 940, 40, 3], [1240, 960, -80, -3], [1640, 980, -260, 2], [20, 260, -520, 2], [1700, 560, -480, -2]];
export const Manual: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  // camera: wide on the wall, push in to the front sheet, back out to the report beside the pile
  const push = prog(f, 34, 26, E.inOut), back = prog(f, 96, 30, E.inOut);
  const cs = lerp(back, lerp(push, 1, 1.45), 0.72), cx = lerp(back, lerp(push, 960, 820), 960), cy = lerp(back, lerp(push, 640, 760), 380);
  const sel = prog(f, 56, 12, E.inOut), ants = f >= 68 ? 1 : 0;
  const fly = prog(f, 70, 18, E.inOut);
  const pptIn = spr(f, 62, S.soft), bars = prog(f, 84, 22, (q) => q);
  const week = 44 + Math.max(0, Math.min(3, Math.floor((f - 120) / 28)));
  const reshuffle = (k: number) => (f >= 120 ? Math.abs(Math.sin(((f - 120) / 28) * Math.PI)) : 0) * (k % 2 ? 1 : 0.6);
  return (
    <AbsoluteFill>
      <BrandField seed={1} />
      {WALL.map((_, i) => <Pop key={i} at={4 + i * 2} k={i} v={0.09} />)}<Swish at={34} /><Pop at={68} v={0.2} /><Swish at={70} k={1} /><Pop at={86} k={1} v={0.18} /><Swish at={96} />{[120, 148, 176].map((t, i) => <Pop key={t} at={t + 14} k={i} v={0.16} />)}
      <div style={{position: 'absolute', inset: 0, perspective: 2000}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: `${cx}px ${cy}px`, transform: `translate(${960 - cx}px, ${560 - cy}px) scale(${cs}) rotateX(${lerp(prog(f, 0, dur), 20, 12)}deg) rotateY(${lerp(prog(f, 0, dur), -10, -4)}deg)`}}>
          {WALL.map(([x, y, z, r], i) => {
            const q = spr(f, 4 + i * 2, S.soft);
            const front = i === 9;
            const fill = prog(f, 6 + i * 2, 30, (t) => t);
            const out = back * (front ? 0.1 : 0.3) + reshuffle(i) * 0.5;
            return (
              <div key={i} style={{position: 'absolute', left: x - 230, top: y - 300, transform: `translateZ(${z}px) rotate(${r}deg) translateY(${(1 - Math.min(1, q)) * 500}px)`, opacity: Math.min(1, q) * (1 - out), transformStyle: 'preserve-3d'}}>
                <Sheet name={front ? 'linkedin_export_wk44.xlsx' : FILES[(i + (week - 44) * 5) % FILES.length]} w={460} h={300} fill={fill} seed={i + week} sel={front ? sel : 0} ants={front ? ants : 0} />
              </div>
            );
          })}
          {/* the copied block flies from the sheet into the slide */}
          {fly > 0 && fly < 1 && <div style={{position: 'absolute', left: lerp(fly, 760 - 230 + 105, 1180), top: lerp(fly, 940 - 300 + 84, 620), width: lerp(fly, 215, 120), height: lerp(fly, 156, 80), border: `2px dashed ${XL}`, background: 'rgba(29,111,66,.18)', borderRadius: 4, transform: `translateZ(${120 + Math.sin(fly * Math.PI) * 200}px)`}} />}
          <div style={{position: 'absolute', left: 1080, top: 360, transform: `translateZ(${180}px) translateX(${(1 - Math.min(1, pptIn)) * 900}px)`, opacity: Math.min(1, pptIn)}}>
            <Report w={760} h={480} bars={bars} week={week} />
          </div>
        </div>
      </div>
      {/* the weekly loop */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 70}}><Words parts={[['Every week.'], ['By hand.']]} at={102} size={84} color="#fff" stagger={5} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center', opacity: prog(f, 118, 10), transform: `translateY(${(1 - prog(f, 118, 14, E.snappy)) * 40}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.95)', borderRadius: 99, padding: '12px 26px', fontFamily: F.text, fontSize: 28, fontWeight: 700, color: INK, boxShadow: '0 16px 40px -14px rgba(0,60,90,.4)'}}>
          <svg width="30" height="30" viewBox="0 0 24 24" style={{transform: `rotate(${f * 6}deg)`}}><defs><linearGradient id="lp" x1="0" x2="1"><stop offset="0" stopColor={GR} /><stop offset=".55" stopColor={CY} /><stop offset="1" stopColor={SKY} /></linearGradient></defs><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" fill="none" stroke="url(#lp)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Week {week}
        </div>
      </div>
      <span style={{display: 'none'}}>{interpolate(0, [0, 1], [0, 1])}</span>
    </AbsoluteFill>
  );
};
