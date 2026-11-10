import React from 'react';
import {C, LOOP, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';
import {Delta, PlatformIcon, Platform, Spark, PLATFORM_NAME} from '../components/ui/Primitives';
import {BENTO_TILES} from '../components/ui/Bento';
import {SERIES} from '../data/demo';
import {E, prog, spr, S} from '../theme/motion';
import {fmt} from '../components/kit/Type';

// Dat's bento, every tile alive. f = scene frame. Tile i lands at land(i), then its content plays.
const ink = '#1c2a30';
const gradText: React.CSSProperties = {background: `linear-gradient(90deg, ${C.green}, ${C.cyan})`, WebkitBackgroundClip: 'text', color: 'transparent'};
const bar = (w: number | string, h = 10, c = '#dfe6e8') => <div style={{width: w, height: h, borderRadius: 99, background: c}} />;
const T: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({children, size = 32, style}) => (
  <div style={{fontFamily: F.text, fontWeight: 650, fontSize: size, lineHeight: 1.12, color: ink, letterSpacing: '-0.01em', ...style}}>{children}</div>
);
export const ORDER = [4, 9, 1, 11, 6, 0, 8, 3, 10, 5, 2, 7]; // random order, the centre card last
export const land = (i: number) => 2 + ORDER.indexOf(i) * 4;

const tiles = (f: number, i: number): React.ReactNode => {
  const s0 = land(i) + 14;
  const k = (d = 30, off = 0) => prog(f, s0 + off, d, E.snappy);
  switch (i) {
    case 0: return (<><T>Find out what<br />is working</T>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16, height: 124, marginTop: 40}}>
        {[46, 72, 38, 118, 64].map((h, j) => <div key={j} style={{position: 'relative', width: 34, height: h * k(26, j * 3), borderRadius: 10, background: j === 3 ? `linear-gradient(0deg, ${C.cyan}, ${C.green})` : '#dfe6e8'}}>{j === 3 && <span style={{position: 'absolute', top: -34, left: -10, background: C.teal, color: '#fff', borderRadius: 99, padding: '3px 12px', fontSize: 17, fontWeight: 700, transform: `scale(${spr(f, s0 + 28, S.pop)})`}}>best</span>}</div>)}
      </div>
      <div style={{display: 'flex', gap: 12, marginTop: 18}}>{(['li', 'fb', 'ig', 'yt'] as Platform[]).map((p, j) => <PlatformIcon key={p} p={p} size={44} style={{transform: `scale(${spr(f, s0 + 10 + j * 4, S.pop)})`}} />)}</div></>);
    case 1: {
      const g = k(40);
      return (<><T>Free, in-house<br />site audit</T>
        <div style={{position: 'relative', height: 120, marginTop: 18, display: 'grid', placeItems: 'center'}}>
          <svg width="180" height="110" viewBox="0 0 100 60"><path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#e3eaea" strokeWidth="8" strokeLinecap="round" /><path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="url(#bga2)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${126 * 0.72 * g} 200`} /><defs><linearGradient id="bga2"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient></defs></svg>
          <div style={{position: 'absolute', top: 40, textAlign: 'center'}}><div style={{fontSize: 40, fontWeight: 750, color: C.teal}}>{Math.round(65 * g)}</div><div style={{fontSize: 13, color: C.ink3, letterSpacing: '.08em'}}>HEALTH</div></div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, color: C.ink2, marginTop: 6}}>Replaced <span style={{background: '#fde9e3', color: '#ff642d', borderRadius: 99, padding: '4px 14px', fontWeight: 700}}>SEMrush</span></div>
        <div style={{fontFamily: F.display, fontSize: 58, fontWeight: 800, ...gradText, marginTop: 14, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', whiteSpace: 'nowrap'}}>${fmt(Math.round(2000 * k(36, 10)))}+</div>
        <div style={{fontSize: 26, color: C.ink2}}>saved every year</div></>);
    }
    case 2: return (<><T style={{textAlign: 'center'}}>All marketing channels in 1 place</T>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 16}}>
        {[['Total impressions', 58420], ['Total engagements', 2318], ['Social followers', 21946], ['Website sessions', 7930]].map(([l, v], j) => <div key={l as string} style={{border: '1px solid #e6eded', borderRadius: 14, padding: '8px 12px'}}><div style={{fontSize: 10, color: C.ink3}}>{l}</div><div style={{fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums'}}>{fmt(Math.round((v as number) * k(30, j * 3)))} <Delta v="4.2%" size={9} /></div></div>)}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 10}}>
        {(['li', 'fb', 'ig', 'yt', 'web', 'search'] as Platform[]).map((p, j) => <div key={p} style={{border: '1px solid #e6eded', borderRadius: 14, padding: '8px 12px'}}><div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 650}}><PlatformIcon p={p} size={22} />{PLATFORM_NAME[p]}</div><Spark id={`ba${j}`} data={[SERIES.a, SERIES.b, SERIES.c][j % 3]} w={168} h={52} color={[C.li, C.fb, C.ig, C.yt, C.tealMid, C.cyan][j]} dot={false} width={2} draw={k(36, j * 4)} /></div>)}
      </div></>);
    case 3: {
      const g = k(40);
      return (<><T>Time saved,<br />every month</T>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 14}}>
          <svg width="104" height="104" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#eef2f3" strokeWidth="9" /><circle cx="50" cy="50" r="40" fill="none" stroke="url(#bg4a)" strokeWidth="9" strokeDasharray={`${210 * g} 260`} transform="rotate(-90 50 50)" strokeLinecap="round" /><defs><linearGradient id="bg4a"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient></defs><g transform={`rotate(${g * 300} 50 50)`}><path d="M50 50V28" stroke={ink} strokeWidth="6" strokeLinecap="round" /></g><path d="M50 50l14 8" stroke={ink} strokeWidth="6" strokeLinecap="round" /></svg>
          <div><div style={{fontFamily: F.display, fontSize: 72, fontWeight: 800, ...gradText, lineHeight: 1}}>{Math.round(90 * g)}</div><div style={{fontSize: 15, color: C.ink2}}>automatic updates, no copy and paste</div></div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '84px 1fr', gap: 10, alignItems: 'center', fontSize: 14, color: C.ink2, marginTop: 14}}>By hand{bar(`${100 * k(50, 4)}%`, 12)}Automatic<div style={{display: 'flex', gap: 8, alignItems: 'center'}}>{bar(20 * k(10, 4), 12, LOOP_BAR)}{bar('100%', 12)}</div></div>
        <div style={{fontSize: 14, color: C.ink2, marginTop: 14}}>Every day, on its own</div>
        <div style={{display: 'flex', gap: 8, marginTop: 8}}>{['6:00', '12:00', '18:00'].map((tm, j) => <span key={tm} style={{flex: 1, textAlign: 'center', background: C.wash, borderRadius: 99, padding: '8px 0', fontWeight: 650, color: C.teal, fontSize: 16, transform: `scale(${spr(f, s0 + 20 + j * 5, S.pop)})`}}>{tm}</span>)}</div></>);
    }
    case 4: {
      const g = k(44);
      return (<><T>Project portfolio<br />statistics</T>
        <svg width="158" height="158" viewBox="0 0 42 42" style={{display: 'block', margin: '16px auto 0', transform: `rotate(${(1 - g) * -90}deg)`}}>{[['#3b5fc7', 0, 37], ['#5ea02e', 37, 33], [C.teal, 70, 30]].map(([c, o, l], j) => <circle key={j} cx="21" cy="21" r="15.9" fill="none" stroke={c as string} strokeWidth="7" strokeDasharray={`${(l as number) * g} ${100 - (l as number) * g}`} strokeDashoffset={25 - (o as number) * g} />)}</svg>
        <div style={{display: 'flex', gap: 12, marginTop: 16, alignItems: 'center', justifyContent: 'center'}}>{['#3b5fc7', '#5ea02e', C.teal].map((c) => <React.Fragment key={c}><span style={{width: 14, height: 14, borderRadius: 4, background: c}} />{bar(38 * g, 8)}</React.Fragment>)}</div></>);
    }
    case 5: {
      const n = spr(f, s0 + 10, S.snap);
      return (<><T>Track all PR<br />article mentions</T>
        <div style={{marginTop: 50, background: '#fff', borderRadius: 18, boxShadow: '0 8px 24px -8px rgba(5,60,63,.18)', padding: 14, display: 'flex', gap: 12, alignItems: 'center', opacity: Math.min(1, n), transform: `translateY(${(1 - n) * -30}px)`}}>
          <div style={{width: 56, height: 56, borderRadius: 14, background: LOOP, display: 'grid', placeItems: 'center', transform: `rotate(${Math.sin(Math.max(0, f - s0 - 10) * 0.6) * 14 * Math.exp(-Math.max(0, f - s0 - 10) / 12)}deg)`}}><svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
          <div style={{flex: 1, fontSize: 20, fontWeight: 600}}>New<br />mention</div>
          <span style={{fontSize: 16, color: C.ink2, fontWeight: 600, background: C.inset, borderRadius: 99, padding: '4px 10px'}}><span style={{color: '#3f9a3a'}}>●</span> daily</span>
        </div></>);
    }
    case 6: return (<><T>Spot trends</T>
      <div style={{position: 'relative', marginTop: 20}}><Spark id="btra" data={[30, 33, 31, 34, 32, 35, 33, 36, 34, 38, 36, 42, 46]} w={250} h={90} color={C.cyan} draw={k(34)} />
        <span style={{position: 'absolute', right: -6, top: -26, background: C.teal, color: '#fff', borderRadius: 99, padding: '4px 14px', fontWeight: 700, fontSize: 20, transform: `scale(${spr(f, s0 + 30, S.pop)})`}}>+{Math.round(29 * k(24, 30))}%</span></div></>);
    case 8: {
      // a card moves from To do to Done
      const mv = prog(f, s0 + 24, 26, E.inOut);
      return (<><T size={36}>Task management</T>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 20, position: 'relative'}}>
          {[['To do', mv > 0.5 ? 4 : 5], ['Done', mv > 0.5 ? 4 : 3]].map(([n, kk], col) => (
            <div key={n as string} style={{background: '#f2f6f7', borderRadius: 16, padding: 12, height: 250}}>
              <div style={{fontSize: 20, fontWeight: 650}}>{n} <span style={{background: C.teal, color: '#fff', borderRadius: 99, padding: '1px 9px', fontSize: 14}}>{kk as number}</span></div>
              {[0, 1].map((r) => <div key={r} style={{background: '#fff', borderRadius: 12, padding: 12, marginTop: col === 1 && r === 1 ? 52 : 10, display: 'grid', gap: 8, opacity: r === 0 ? 0 : 1}}>{bar('80%')}{bar('50%', 8)}{col === 0 && r === 1 && <span style={{fontSize: 13, fontWeight: 700, color: C.amber, background: '#fdf1dc', borderRadius: 99, padding: '2px 10px', width: 'fit-content'}}>Important</span>}</div>)}
            </div>
          ))}
          <div style={{position: 'absolute', left: 12 + mv * 284, top: 46 - Math.sin(mv * Math.PI) * 30, width: 250, background: '#fff', borderRadius: 12, padding: 12, display: 'grid', gap: 8, transform: `rotate(${Math.sin(mv * Math.PI) * 5}deg)`, boxShadow: `0 ${4 + Math.sin(mv * Math.PI) * 24}px ${10 + Math.sin(mv * Math.PI) * 30}px -8px rgba(5,60,63,.3)`}}>
            {bar('80%')}{bar('50%', 8)}<span style={{fontSize: 13, fontWeight: 700, color: mv > 0.9 ? C.up : C.down, background: mv > 0.9 ? 'rgba(63,122,38,.12)' : '#fbe4e1', borderRadius: 99, padding: '2px 10px', width: 'fit-content'}}>{mv > 0.9 ? 'Approved' : 'Urgent'}</span>
          </div>
        </div></>);
    }
    case 9: {
      const cols = ['#b3261e', '#d4561e', '#e0a020', '#2f7a4a'];
      return (<><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><T size={34}>Monthly competitor report</T><span style={{background: C.wash, color: C.teal, borderRadius: 99, padding: '6px 16px', fontWeight: 700, fontSize: 18}}>⬇ PDF</span></div>
        <div style={{display: 'flex', gap: 24, marginTop: 24}}>
          <div style={{width: 236, flex: 'none', height: 290, background: '#fff', borderRadius: 10, boxShadow: '0 12px 30px -10px rgba(5,60,63,.3)', transform: `rotate(${-4 * k(30)}deg)`, padding: 16}}>
            <div style={{fontFamily: F.mono, fontSize: 11, letterSpacing: '.12em', color: C.teal, fontWeight: 600}}>COMPETITIVE INTELLIGENCE</div>
            {[['MG', 'Critical'], ['KI', 'High'], ['NE', 'Medium'], ['HC', 'Low']].map(([n, l], j) => <div key={n} style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, opacity: k(16, j * 5), transform: `translateX(${(1 - k(16, j * 5)) * -20}px)`}}><span style={{width: 30, height: 30, borderRadius: 99, background: cols[j], color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{n}</span>{bar(110, 8)}<span style={{marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: cols[j], border: `1px solid ${cols[j]}`, borderRadius: 99, padding: '1px 8px'}}>{l}</span></div>)}
          </div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px -10px rgba(5,60,63,.25)', overflow: 'hidden', fontSize: 12, fontWeight: 650}}>
              {[['Critical', '#fbe9e7', '#b3261e', 'MG', 0], ['High', '#fbefe9', '#d4561e', 'KI', 1], ['Medium', '#fdf4dc', '#a07010', 'NE', 0], ['Low', '#eaf3ec', '#2f7a4a', 'HC AF', 1]].map(([l, bg, c, d, col], j) => <div key={l as string} style={{display: 'grid', gridTemplateColumns: '80px 1fr 1fr', alignItems: 'center', height: 44, background: bg as string, color: c as string, padding: '0 10px'}}>{l}{[0, 1].map((kk) => <span key={kk}>{kk === col && (d as string).split(' ').map((x) => <span key={x} style={{display: 'inline-grid', placeItems: 'center', width: 26, height: 26, borderRadius: 99, background: c as string, color: '#fff', fontSize: 9, marginRight: 4, transform: `scale(${spr(f, s0 + 12 + j * 5, S.pop)})`}}>{x}</span>)}</span>)}</div>)}
            </div>
            <div style={{display: 'flex', gap: 10, marginTop: 14}}>{[['6 of 10', 'In the news'], ['4', 'Developments'], ['Critical', 'Top impact']].map(([v, l], j) => <div key={l} style={{flex: 1, minWidth: 0, background: '#f2f6f7', borderRadius: 12, padding: '8px 10px', whiteSpace: 'nowrap', overflow: 'hidden', opacity: k(14, 26 + j * 4)}}><div style={{fontSize: 18, fontWeight: 700, color: j === 2 ? C.down : ink}}>{v}</div><div style={{fontSize: 11, color: C.ink3}}>{l}</div></div>)}</div>
          </div>
        </div></>);
    }
    case 10: return (<><div style={{display: 'flex', gap: 14, alignItems: 'center'}}><div style={{width: 54, height: 54, borderRadius: 99, background: LOOP, display: 'grid', placeItems: 'center', transform: `rotate(${(1 - k(30)) * -180}deg)`}}><svg width="28" height="28" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#fff" /></svg></div><T size={30}>Weekly AI Insights<br />briefing</T></div>
      <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.25)', padding: 12, marginTop: 14, display: 'grid', gap: 8}}>{bar(`${85 * k(26)}%`, 12)}{bar(`${55 * k(26, 8)}%`, 12, LOOP_BAR)}<div style={{display: 'flex', gap: 6}}>{[['Highlights', 3], ['Actions', 2], ['Ideas', 1], ['Channels', 3]].map(([l, v], j) => <div key={l as string} style={{flex: 1, background: '#f2f6f7', borderRadius: 8, padding: '3px 6px', fontSize: 8, color: C.ink3, opacity: k(12, 14 + j * 3)}}>{l}<div style={{fontSize: 15, color: ink, fontWeight: 700}}>{v}</div></div>)}</div></div>
      </>);
    case 11: return (<><T size={36}>Track business requests</T>
      <div style={{display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.8fr', gap: 18, marginTop: 20, height: 200}}>
        <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', overflow: 'hidden'}}>{[0, 1, 2].map((r) => <div key={r} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '14px 14px', background: r === 2 && k(10, 30) > 0.5 ? '#eef7f8' : '#fff', borderBottom: '1px solid #eef2f2', opacity: k(14, r * 5), transform: `translateY(${(1 - k(14, r * 5)) * 14}px)`}}><span style={{width: 30, height: 30, borderRadius: 99, background: r === 2 ? LOOP : '#e6eded'}} /><div style={{flex: 1, display: 'grid', gap: 6}}>{bar('80%', 8)}{bar('40%', 6)}</div><span style={{fontSize: 11, color: r === 2 ? '#fff' : C.ink3, background: r === 2 ? C.teal : '#f2f6f7', borderRadius: 99, padding: '2px 8px'}}>{r === 2 ? '$' : 'new'}</span></div>)}</div>
        <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', display: 'flex', alignItems: 'flex-end', gap: 8, padding: 14}}>{[20, 30, 25, 40, 35, 50, 45, 60, 52, 75, 90].map((h, j) => <div key={j} style={{flex: 1, height: `${h * k(20, j * 2)}%`, borderRadius: 4, background: j === 10 ? `linear-gradient(0deg, ${C.green}, ${C.cyan})` : '#dfe6e8'}} />)}</div>
        <div style={{background: '#fff', borderRadius: 14, boxShadow: '0 6px 18px -8px rgba(5,60,63,.2)', padding: 16, display: 'grid', gap: 12, alignContent: 'center'}}>{[90, 70, 55, 40, 25].map((w, j) => <div key={j} style={{display: 'flex', gap: 8}}>{bar(50, 8)}{bar(`${w * k(24, j * 3)}%`, 8, [C.teal, C.green, '#3b5fc7', C.cyan, C.tealMid][j])}</div>)}</div>
      </div></>);
    default: return null;
  }
};

const Hero: React.FC<{f: number}> = ({f}) => {
  const s0 = land(7) + 6;
  const p = prog(f, s0, 20, E.snappy), q = prog(f, s0 + 10, 18, E.snappy);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', color: '#fff'}}>
      <div>
        <div style={{fontFamily: F.display, fontSize: 92, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.04em', textShadow: '0 4px 20px rgba(0,80,86,.25)', opacity: p, filter: `blur(${(1 - p) * 14}px)`, transform: `translateY(${(1 - p) * 20}px)`}}>Marketing<br />Dashboard</div>
        <div style={{fontFamily: F.text, fontSize: 24, marginTop: 22, opacity: q * 0.92, letterSpacing: '0.02em'}}>made by Dat Tran</div>
      </div>
    </div>
  );
};

// each tile flies in from a direction away from the centre, with depth and a little spin
export const BentoAnim: React.FC<{f: number}> = ({f}) => (
  <div style={{width: 2000, height: 1125, background: '#eef1f3', position: 'relative', fontFamily: F.text, color: ink}}>
    {BENTO_TILES.map(([x, y, w, h], i) => {
      const p = spr(f, land(i), S.snap, 22);
      const o = 1 - p;
      return (
        <div key={i} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 28, background: i === 7 ? LOOP : '#fff', padding: i === 7 ? 0 : '24px 26px', boxSizing: 'border-box', overflow: 'hidden', opacity: Math.min(1, p * 1.6),
          transform: `translateY(${o * 40}px) scale(${0.86 + Math.min(1, p) * 0.14})`, filter: o > 0.02 ? `blur(${o * 12}px)` : undefined,
          boxShadow: `0 ${2 + o * 30}px ${6 + o * 40}px rgba(5,60,63,${0.04 + o * 0.15})`}}>
          {i === 7 ? <Hero f={f} /> : tiles(f, i)}
        </div>
      );
    })}
  </div>
);
