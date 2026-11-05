import React from 'react';
import {C, LOOP, LOOP_BAR} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {Delta, Mark, PlatformIcon, Platform, Spark, PLATFORM_NAME} from './Primitives';
import {SERIES} from '../../data/demo';

// Dat's bento overview (the image he made), rebuilt in code at its own 2000x1125 grid.
// Tile copy is his, word for word. `tile(i)` returns the per-tile style so a scene can fly tiles in.
export type TileStyle = (i: number) => React.CSSProperties;
const ink = '#1c2a30';
export const BENTO_TILES: [number, number, number, number][] = [
  [17, 17, 290, 353], [325, 17, 302, 436], [643, 17, 712, 368], [1373, 17, 300, 376], [1690, 17, 293, 376],
  [17, 388, 290, 295], [325, 471, 302, 212], [643, 404, 712, 381], [1373, 410, 610, 375],
  [17, 700, 610, 407], [643, 803, 382, 304], [1043, 803, 940, 304],
];
const T: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({children, size = 32, style}) => (
  <div style={{fontFamily: F.text, fontWeight: 650, fontSize: size, lineHeight: 1.12, color: ink, letterSpacing: '-0.01em', ...style}}>{children}</div>
);
const bar = (w: number | string, h = 10, c = '#dfe6e8') => <div style={{width: w, height: h, borderRadius: 99, background: c}} />;
const gradText: React.CSSProperties = {background: `linear-gradient(90deg, ${C.green}, ${C.cyan})`, WebkitBackgroundClip: 'text', color: 'transparent'};

const tiles: React.ReactNode[] = [
  // 1 find out what is working
  <><T>Find out what<br />is working</T>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 16, height: 150, marginTop: 44}}>
      {[55, 85, 45, 140, 75].map((h, i) => <div key={i} style={{position: 'relative', width: 34, height: h, borderRadius: 10, background: i === 3 ? `linear-gradient(0deg, ${C.cyan}, ${C.green})` : '#dfe6e8'}}>{i === 3 && <span style={{position: 'absolute', top: -34, left: -10, background: C.teal, color: '#fff', borderRadius: 99, padding: '3px 12px', fontSize: 17, fontWeight: 700}}>best</span>}</div>)}
    </div>
    <div style={{display: 'flex', gap: 12, marginTop: 22}}>{(['li', 'fb', 'ig', 'yt'] as Platform[]).map((p) => <PlatformIcon key={p} p={p} size={44} />)}</div></>,
  // 2 site audit
  <><T>Free, in-house<br />site audit</T>
    <div style={{position: 'relative', height: 120, marginTop: 18, display: 'grid', placeItems: 'center'}}>
      <svg width="180" height="110" viewBox="0 0 100 60"><path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#e3eaea" strokeWidth="8" strokeLinecap="round" /><path d="M10 55 A40 40 0 0 1 75 22" fill="none" stroke={`url(#bg2)`} strokeWidth="8" strokeLinecap="round" /><defs><linearGradient id="bg2"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient></defs></svg>
      <div style={{position: 'absolute', top: 40, textAlign: 'center'}}><div style={{fontSize: 40, fontWeight: 750, color: C.teal}}>65</div><div style={{fontSize: 13, color: C.ink3, letterSpacing: '.08em'}}>HEALTH</div></div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, color: C.ink2, marginTop: 6}}>Replaced <span style={{background: '#fde9e3', color: '#ff642d', borderRadius: 99, padding: '4px 14px', fontWeight: 700}}>SEMrush</span></div>
    <div style={{fontFamily: F.display, fontSize: 74, fontWeight: 800, ...gradText, marginTop: 10}}>$1,200</div>
    <div style={{fontSize: 26, color: C.ink2}}>saved every year</div></>,
  // 3 all channels
  <><T style={{textAlign: 'center'}}>All marketing channels in 1 place</T>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 16}}>
      {[['Total impressions', '58,420'], ['Total engagements', '2,318'], ['Social followers', '21,946'], ['Website sessions', '7,930']].map(([l, v]) => <div key={l} style={{border: '1px solid #e6eded', borderRadius: 14, padding: '8px 12px'}}><div style={{fontSize: 10, color: C.ink3}}>{l}</div><div style={{fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap'}}>{v} <Delta v="4.2%" size={9} /></div></div>)}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 10}}>
      {(['li', 'fb', 'ig', 'yt', 'web', 'search'] as Platform[]).map((p, i) => <div key={p} style={{border: '1px solid #e6eded', borderRadius: 14, padding: '8px 12px'}}><div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 650}}><PlatformIcon p={p} size={22} />{PLATFORM_NAME[p]}</div><Spark id={`bt${i}`} data={[SERIES.a, SERIES.b, SERIES.c][i % 3]} w={200} h={52} color={[C.li, C.fb, C.ig, C.yt, C.tealMid, C.cyan][i]} dot={false} width={2} /></div>)}
    </div></>,
  // 4 time saved
  <><T>Time saved,<br />every month</T>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 14}}>
      <svg width="104" height="104" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke={`url(#bg4)`} strokeWidth="9" strokeDasharray="210 260" transform="rotate(-90 50 50)" strokeLinecap="round" /><defs><linearGradient id="bg4"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient></defs><path d="M50 50V28M50 50l14 8" stroke={ink} strokeWidth="6" strokeLinecap="round" /></svg>
      <div><div style={{fontFamily: F.display, fontSize: 72, fontWeight: 800, ...gradText, lineHeight: 1}}>90</div><div style={{fontSize: 15, color: C.ink2}}>automatic updates, no copy and paste</div></div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '84px 1fr', gap: 10, alignItems: 'center', fontSize: 14, color: C.ink2, marginTop: 14}}>By hand{bar('100%', 12)}Automatic<div style={{display: 'flex', gap: 8, alignItems: 'center'}}>{bar(20, 12, LOOP_BAR)}{bar('100%', 12)}</div></div>
    <div style={{fontSize: 14, color: C.ink2, marginTop: 14}}>Every day, on its own</div>
    <div style={{display: 'flex', gap: 8, marginTop: 8}}>{['6:00', '12:00', '18:00'].map((t) => <span key={t} style={{flex: 1, textAlign: 'center', background: C.wash, borderRadius: 99, padding: '8px 0', fontWeight: 650, color: C.teal, fontSize: 16}}>{t}</span>)}</div></>,
  // 5 portfolio
  <><T>Project portfolio<br />statistics</T>
    <svg width="200" height="200" viewBox="0 0 42 42" style={{display: 'block', margin: '20px auto 0'}}>{[[ '#3b5fc7', 0, 37], ['#5ea02e', 37, 33], [C.teal, 70, 30]].map(([c, o, l], i) => <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={c as string} strokeWidth="7" strokeDasharray={`${l} ${100 - (l as number)}`} strokeDashoffset={25 - (o as number)} />)}</svg>
    <div style={{display: 'flex', gap: 14, marginTop: 18, alignItems: 'center'}}>{['#3b5fc7', '#5ea02e', C.teal].map((c) => <React.Fragment key={c}><span style={{width: 14, height: 14, borderRadius: 4, background: c}} />{bar(46, 8)}</React.Fragment>)}</div></>,
  // 6 PR
  <><T>Track all PR<br />article mentions</T>
    <div style={{marginTop: 50, background: '#fff', borderRadius: 18, boxShadow: '0 8px 24px -8px rgba(5,60,63,.18)', padding: 14, display: 'flex', gap: 12, alignItems: 'center'}}>
      <div style={{width: 56, height: 56, borderRadius: 14, background: LOOP, display: 'grid', placeItems: 'center'}}><svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
      <div style={{flex: 1, fontSize: 20, fontWeight: 600}}>New<br />mention</div>
      <span style={{fontSize: 16, color: C.ink2, fontWeight: 600, background: C.inset, borderRadius: 99, padding: '4px 10px'}}><span style={{color: '#3f9a3a'}}>●</span> daily</span>
    </div></>,
  // 7 trends
  <><T>Spot trends</T>
    <div style={{position: 'relative', marginTop: 20}}><Spark id="btr" data={[30, 33, 31, 34, 32, 35, 33, 36, 34, 38, 36, 42, 46]} w={250} h={90} color={C.cyan} />
      <span style={{position: 'absolute', right: -6, top: -26, background: C.teal, color: '#fff', borderRadius: 99, padding: '4px 14px', fontWeight: 700, fontSize: 20}}>+29%</span></div></>,
  // 8 hero
  null,
  // 9 tasks
  <><T size={36}>Task management</T>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 20}}>
      {[['To do', 5, ['Urgent', 'Important']], ['Done', 3, []]].map(([n, k, tags]) => (
        <div key={n as string} style={{background: '#f2f6f7', borderRadius: 16, padding: 12, height: 250}}>
          <div style={{fontSize: 20, fontWeight: 650}}>{n} <span style={{background: C.teal, color: '#fff', borderRadius: 99, padding: '1px 9px', fontSize: 14}}>{k as number}</span></div>
          {[0, 1].map((r) => <div key={r} style={{background: '#fff', borderRadius: 12, padding: 12, marginTop: 10, display: 'grid', gap: 8}}>{bar('80%')}{bar('50%', 8)}{(tags as string[])[r] && <span style={{fontSize: 13, fontWeight: 700, color: r ? C.amber : C.down, background: r ? '#fdf1dc' : '#fbe4e1', borderRadius: 99, padding: '2px 10px', width: 'fit-content'}}>{(tags as string[])[r]}</span>}</div>)}
        </div>
      ))}
    </div></>,
  // 10 competitor report
  <><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><T size={34}>Monthly competitor report</T><span style={{background: C.wash, color: C.teal, borderRadius: 99, padding: '6px 16px', fontWeight: 700, fontSize: 18}}>⬇ PDF</span></div>
    <div style={{display: 'flex', gap: 24, marginTop: 24}}>
      <div style={{width: 280, height: 290, background: '#fff', borderRadius: 10, boxShadow: '0 12px 30px -10px rgba(5,60,63,.3)', transform: 'rotate(-4deg)', padding: 16}}>
        <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '.12em', color: C.teal, fontWeight: 600}}>COMPETITIVE INTELLIGENCE</div>
        {[['MG', '#b3261e', 'Critical'], ['KI', '#d4561e', 'High'], ['NE', '#e0a020', 'Medium'], ['HC', '#2f7a4a', 'Low']].map(([i, c, l]) => <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 18}}><span style={{width: 30, height: 30, borderRadius: 99, background: c, color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{i}</span>{bar(110, 8)}<span style={{marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: c, border: `1px solid ${c}`, borderRadius: 99, padding: '1px 8px'}}>{l}</span></div>)}
      </div>
      <div style={{flex: 1}}>
        <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px -10px rgba(5,60,63,.25)', overflow: 'hidden', fontSize: 12, fontWeight: 650}}>
          {[['Critical', '#fbe9e7', '#b3261e', 'MG', 0], ['High', '#fbefe9', '#d4561e', 'KI', 1], ['Medium', '#fdf4dc', '#a07010', 'NE', 0], ['Low', '#eaf3ec', '#2f7a4a', 'HC AF', 1]].map(([l, bg, c, d, col]) => <div key={l as string} style={{display: 'grid', gridTemplateColumns: '80px 1fr 1fr', alignItems: 'center', height: 44, background: bg as string, color: c as string, padding: '0 10px'}}>{l}{[0, 1].map((k) => <span key={k}>{k === col && (d as string).split(' ').map((x) => <span key={x} style={{display: 'inline-grid', placeItems: 'center', width: 26, height: 26, borderRadius: 99, background: c as string, color: '#fff', fontSize: 9, marginRight: 4}}>{x}</span>)}</span>)}</div>)}
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 14}}>{[['6 of 10', 'In the news'], ['4', 'Developments'], ['Critical', 'Top impact']].map(([v, l], i) => <div key={l} style={{background: '#f2f6f7', borderRadius: 12, padding: '8px 12px', whiteSpace: 'nowrap'}}><div style={{fontSize: 22, fontWeight: 700, color: i === 2 ? C.down : ink}}>{v}</div><div style={{fontSize: 11, color: C.ink3}}>{l}</div></div>)}</div>
      </div>
    </div></>,
  // 11 weekly insights
  <><div style={{display: 'flex', gap: 14, alignItems: 'center'}}><div style={{width: 54, height: 54, borderRadius: 99, background: LOOP, display: 'grid', placeItems: 'center'}}><svg width="28" height="28" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#fff" /></svg></div><T size={30}>Weekly AI Insights<br />briefing</T></div>
    <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.25)', padding: 12, marginTop: 14, display: 'grid', gap: 8}}>{bar('85%', 12)}{bar('55%', 12, LOOP_BAR)}<div style={{display: 'flex', gap: 6}}>{[['Highlights', 3], ['Actions', 2], ['Ideas', 1], ['Channels', 3]].map(([l, v]) => <div key={l} style={{flex: 1, background: '#f2f6f7', borderRadius: 8, padding: '3px 6px', fontSize: 8, color: C.ink3}}>{l}<div style={{fontSize: 15, color: ink, fontWeight: 700}}>{v}</div></div>)}</div></div>
    <div style={{display: 'flex', gap: 10, marginTop: 12}}>{[C.tealMid, '#e0a020', C.cyan].map((c, i) => <div key={i} style={{flex: 1, height: 70, background: '#fff', borderRadius: 12, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', padding: 6}}><div style={{width: 22, height: 22, borderRadius: 6, background: c}} /></div>)}</div></>,
  // 12 business requests
  <><T size={36}>Track business requests</T>
    <div style={{display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.8fr', gap: 18, marginTop: 20, height: 200}}>
      <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', overflow: 'hidden'}}>{[0, 1, 2].map((r) => <div key={r} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px', background: r === 2 ? '#eef7f8' : '#fff', borderBottom: '1px solid #eef2f2'}}><span style={{width: 30, height: 30, borderRadius: 99, background: r === 2 ? LOOP : '#e6eded'}} /><div style={{flex: 1, display: 'grid', gap: 6}}>{bar('80%', 8)}{bar('40%', 6)}</div><span style={{fontSize: 11, color: r === 2 ? '#fff' : C.ink3, background: r === 2 ? C.teal : '#f2f6f7', borderRadius: 99, padding: '2px 8px'}}>{r === 2 ? '$' : 'new'}</span></div>)}</div>
      <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', display: 'flex', alignItems: 'flex-end', gap: 8, padding: 14}}>{[20, 30, 25, 40, 35, 50, 45, 60, 52, 75, 90].map((h, i) => <div key={i} style={{flex: 1, height: `${h}%`, borderRadius: 4, background: i === 10 ? `linear-gradient(0deg, ${C.green}, ${C.cyan})` : '#dfe6e8'}} />)}</div>
      <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', padding: 16, display: 'grid', gap: 12, alignContent: 'center'}}>{[90, 70, 55, 40, 25].map((w, i) => <div key={i} style={{display: 'flex', gap: 8}}>{bar(50, 8)}{bar(`${w}%`, 8, [C.teal, C.green, '#3b5fc7', C.cyan, C.tealMid][i])}</div>)}</div>
    </div></>,
];

export const Bento: React.FC<{tile?: TileStyle; hero?: React.ReactNode}> = ({tile = () => ({}), hero}) => (
  <div style={{width: 2000, height: 1125, background: '#eef1f3', position: 'relative', fontFamily: F.text, color: ink}}>
    {BENTO_TILES.map(([x, y, w, h], i) => (
      <div key={i} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 28, background: i === 7 ? LOOP : '#fff', padding: i === 7 ? 0 : '24px 26px', boxSizing: 'border-box', overflow: 'hidden', boxShadow: '0 2px 6px rgba(5,60,63,.04)', ...tile(i)}}>
        {i === 7 ? hero ?? <BentoHero /> : tiles[i]}
      </div>
    ))}
  </div>
);

export const BentoHero: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', color: '#fff'}}>
    <svg style={{position: 'absolute', left: 26, top: 26}} width="64" height="64" viewBox="0 0 64 64">{Array.from({length: 12}).map((_, i) => <line key={i} x1="32" y1="32" x2={32 + 28 * Math.cos((i * Math.PI) / 6)} y2={32 + 28 * Math.sin((i * Math.PI) / 6)} stroke="#fff" strokeWidth="5" strokeLinecap="round" />)}</svg>
    <div>
      <div style={{fontFamily: F.display, fontSize: 170, fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', textShadow: '0 4px 20px rgba(0,80,86,.25)'}}>100%</div>
      <div style={{fontFamily: F.text, fontSize: 64, fontWeight: 700, marginTop: 22, textShadow: '0 2px 10px rgba(0,80,86,.3)'}}>Made In Claude</div>
      <div style={{fontFamily: F.text, fontSize: 32, marginTop: 10, textShadow: '0 2px 10px rgba(0,80,86,.3)'}}>(no coding knowledge required)</div>
    </div>
  </div>
);
