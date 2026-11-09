import React from 'react';
import {C, LOOP, LOOP_BAR} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {fmt} from '../kit/Type';
import {Delta, PlatformIcon, Platform, Spark, PLATFORM_NAME, linePath} from './Primitives';
import {Gauge} from './Screens';
import {FIXES, PORTFOLIO, REQ_MONTHS, SERIES, SITE} from '../../data/demo';

// Complete, self-contained dashboard cards. A card is always shown whole: never clipped mid-content.
const hair = `1px solid ${C.rule}`;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const Card: React.FC<{w: number; h?: number; children: React.ReactNode; style?: React.CSSProperties; pad?: number}> = ({w, h, children, style, pad = 28}) => (
  <div style={{width: w, height: h, background: '#fff', borderRadius: 26, border: hair, padding: pad, boxSizing: 'border-box', fontFamily: F.text, color: C.ink, boxShadow: '0 0 0 1.5px rgba(255,255,255,.85), 0 2px 4px rgba(5,60,63,.05), 0 30px 70px -24px rgba(0,120,160,.35), 0 0 60px -10px rgba(0,185,239,.18)', ...style}}>{children}</div>
);
const Title: React.FC<{children: React.ReactNode; sub?: string; icon?: React.ReactNode}> = ({children, sub, icon}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18}}>{icon}<div><div style={{fontSize: 22, fontWeight: 700}}>{children}</div>{sub && <div style={{fontSize: 14.5, color: C.ink3, marginTop: 2}}>{sub}</div>}</div></div>
);
const Num: React.FC<{v: string; size?: number; color?: string}> = ({v, size = 40, color = C.ink}) => <span style={{fontSize: size, fontWeight: 750, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', color}}>{v}</span>;

// ── Website ──
export const CityPanel: React.FC<{grow?: number; lit?: boolean; w?: number}> = ({grow = 1, lit = true, w = 640}) => {
  const cities: [string, number][] = [['Ho Chi Minh City', 1196], ['Hanoi', 832], ['Singapore', 533], ['Paris', 364], ['Da Nang', 286], ['Bangkok', 221]];
  return (
    <Card w={w}>
      <Title sub="Website, last 30 days">Active users by city</Title>
      {cities.map(([c, v], i) => {
        const g = clamp01(grow * 1.6 - i * 0.1);
        const on = i === 0 && lit;
        return (
          <div key={c} style={{display: 'grid', gridTemplateColumns: '190px 1fr 70px', alignItems: 'center', gap: 14, padding: '14px 12px', borderRadius: 14, background: on ? C.wash : 'none', fontSize: 18, fontWeight: on ? 650 : 450}}>
            {c}<div style={{height: 10, borderRadius: 99, background: C.inset}}><div style={{width: `${(v / 1196) * 100 * g}%`, height: '100%', borderRadius: 99, background: on ? LOOP_BAR : '#b9cacd'}} /></div><span style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{fmt(Math.round(v * g))}</span>
          </div>
        );
      })}
    </Card>
  );
};
export const SessionsPanel: React.FC<{draw?: number; count?: number; w?: number}> = ({draw = 1, count = 1, w = 760}) => (
  <Card w={w}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
      <Title sub="every day">Website sessions</Title>
      <div style={{display: 'flex', gap: 16, fontSize: 15, color: C.ink3}}><span><span style={{color: C.teal}}>●</span> Total</span><span><span style={{color: C.green}}>●</span> From search</span></div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10}}><Num v={fmt(Math.round(7930 * count))} size={52} /><Delta v="21.5%" size={15} /></div>
    <div style={{position: 'relative', height: 250}}>
      <div style={{position: 'absolute', inset: 0}}><Spark id="sp1" data={SERIES.b} w={w - 60} h={240} color={C.teal} dot={false} draw={draw} /></div>
      <div style={{position: 'absolute', top: 60}}><Spark id="sp2" data={SERIES.a} w={w - 60} h={180} color={C.green} draw={draw} /></div>
    </div>
  </Card>
);

// ── Search ──
const QUERIES: [string, number, number][] = [['design and build company', 214, 3.1], ['factory construction vietnam', 168, 4.6], ['office fit-out', 131, 5.2], ['construction consultancy', 96, 6.8], ['factory design and build', 74, 7.4], ['industrial park design', 52, 9.9], ['warehouse design', 41, 11.2]];
export const SearchPanel: React.FC<{query?: string; caret?: boolean; focus?: boolean; w?: number}> = ({query = '', caret = false, focus = false, w = 900}) => {
  const rows = QUERIES.filter(([q]) => !query || q.includes(query));
  return (
    <Card w={w}>
      <Title sub="Google Search Console, last 30 days">Top searches</Title>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, border: focus ? `2px solid ${C.cyan}` : hair, boxShadow: focus ? '0 0 0 5px rgba(0,185,239,.15)' : 'none', borderRadius: 99, padding: '12px 20px', fontSize: 20, marginBottom: 16}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 5 5" /></svg>
        {query ? <span>{query}</span> : <span style={{color: C.ink4}}>Filter searches</span>}{caret && <span style={{width: 2.5, height: 24, background: C.cyan}} />}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 90px 80px', fontSize: 14, color: C.ink3, fontWeight: 600, padding: '0 14px 10px', borderBottom: hair}}><span>Search</span><span style={{textAlign: 'right'}}>Clicks</span><span style={{textAlign: 'right'}}>Rank</span></div>
      {rows.map(([q, c, r], i) => (
        <div key={q} style={{display: 'grid', gridTemplateColumns: '1fr 90px 80px', fontSize: 18, padding: '14px 14px', borderBottom: hair, borderRadius: 12, background: query && i === 0 ? C.wash : 'none', fontWeight: query && i === 0 ? 650 : 450, fontVariantNumeric: 'tabular-nums'}}>
          <span>{query ? <>{q.split(query)[0]}<b style={{color: C.cyanInk}}>{query}</b>{q.split(query)[1]}</> : q}</span><span style={{textAlign: 'right'}}>{c}</span><span style={{textAlign: 'right', color: C.up, fontWeight: 650}}>{r}</span>
        </div>
      ))}
    </Card>
  );
};
export const KpiCard: React.FC<{label: string; v: string; d: string; up?: boolean; w?: number; icon?: Platform}> = ({label, v, d, up = true, w = 280, icon}) => (
  <Card w={w} pad={22}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: C.ink3}}>{icon && <PlatformIcon p={icon} size={28} />}{label}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 8}}><Num v={v} size={42} /><Delta v={d} up={up} size={13} /></div>
  </Card>
);

// ── Social: platform cards ──
export const PlatformCard: React.FC<{p: Platform; label: string; v: number; d: string; up?: boolean; draw?: number; best?: boolean; series: number[]; w?: number}> = ({p, label, v, d, up = true, draw = 1, best = false, series, w = 420}) => (
  <Card w={w} pad={22} style={{borderTop: `4px solid ${p === 'ig' ? C.ig : (C as any)[p]}`, boxShadow: best ? '0 0 0 3px rgba(0,185,239,.5), 0 40px 80px -24px rgba(0,120,160,.45)' : undefined}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}><PlatformIcon p={p} size={40} /><div><div style={{fontSize: 19, fontWeight: 700}}>{PLATFORM_NAME[p]}</div><div style={{fontSize: 14, color: C.ink3}}>{label}</div></div></div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 8px'}}><Num v={fmt(Math.round(v * Math.min(1, draw * 1.4)))} size={38} /><Delta v={d} up={up} size={13} /></div>
    <Spark id={`pc${p}`} data={series} w={w - 44} h={70} color={best ? C.cyan : '#9db6ba'} draw={draw} area={best} width={best ? 3.5 : 2.5} />
  </Card>
);

// ── Email ──
export const FunnelPanel: React.FC<{fill?: number; hover?: boolean; w?: number}> = ({fill = 1, hover = false, w = 640}) => (
  <Card w={w}>
    <Title sub="sent 4 November" icon={<PlatformIcon p="email" size={40} />}>November newsletter</Title>
    {[['Sent', 3412, 100], ['Delivered', 3371, 98.8], ['Opened', 1317, 38.6], ['Clicked', 140, 4.1]].map(([l, v, p], i) => {
      const g = clamp01(fill * 2.2 - i * 0.4);
      const on = i === 2 && hover;
      return (
        <div key={l as string} style={{margin: '0 -12px 14px', padding: '10px 12px', borderRadius: 14, background: on ? C.wash : 'none'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, marginBottom: 10, fontWeight: on ? 650 : 450}}><span>{l}</span><span style={{fontVariantNumeric: 'tabular-nums'}}>{fmt(Math.round((v as number) * g))} <span style={{color: C.ink3, fontWeight: 450}}>{p}%</span></span></div>
          <div style={{height: 14, borderRadius: 99, background: C.inset}}><div style={{width: `${Math.max(p as number, 3) * g}%`, height: '100%', borderRadius: 99, background: i === 2 ? LOOP_BAR : '#b9cacd'}} /></div>
        </div>
      );
    })}
  </Card>
);
export const OpensPanel: React.FC<{draw?: number; w?: number}> = ({draw = 1, w = 560}) => (
  <Card w={w}>
    <Title sub="last 12 campaigns">Open rate</Title>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6}}><Num v="38.6%" size={52} /><Delta v="3.1 pts" size={14} /></div>
    <Spark id="op1" data={SERIES.a} w={w - 60} h={180} color={C.email} draw={draw} />
  </Card>
);

// ── Site Audit ──
export const SiteHealthPanel: React.FC<{gauge?: number; w?: number}> = ({gauge = 1, w = 720}) => (
  <Card w={w}>
    <Title sub="archetype-group.com, crawled 5 Nov">Site health</Title>
    <div style={{display: 'flex', justifyContent: 'center', gap: 30}}><Gauge v={SITE.health} label="HEALTH" size={250} draw={gauge} /><Gauge v={SITE.geo} label="AI SEARCH" size={250} draw={gauge} /></div>
    <div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10, fontSize: 16, fontWeight: 650}}>
      <span style={{color: C.down, background: 'rgba(171,53,39,.08)', borderRadius: 99, padding: '7px 16px'}}>{fmt(Math.round(SITE.errors * gauge))} errors</span>
      <span style={{color: C.amber, background: '#fdf3e2', borderRadius: 99, padding: '7px 16px'}}>{fmt(Math.round(SITE.warnings * gauge))} warnings</span>
      <span style={{color: C.ink2, background: C.inset, borderRadius: 99, padding: '7px 16px'}}>{fmt(Math.round(SITE.notices * gauge))} notices</span>
    </div>
  </Card>
);
export const FixesPanel: React.FC<{done?: number; w?: number}> = ({done = 2, w = 560}) => (
  <Card w={w}>
    <Title sub="most impact first">Fixes</Title>
    {FIXES.map((x, i) => (
      <div key={x} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '13px 4px', borderBottom: hair, fontSize: 18, color: i < done ? C.ink3 : C.ink}}>
        <span style={{width: 26, height: 26, borderRadius: 99, border: i < done ? 'none' : `2px solid ${C.rule}`, background: i < done ? C.up : 'none', color: '#fff', fontSize: 15, display: 'grid', placeItems: 'center'}}>{i < done ? '✓' : ''}</span>
        <span style={{flex: 1, textDecoration: i < done ? 'line-through' : 'none'}}>{x}</span>
      </div>
    ))}
  </Card>
);

// ── PR ──
const MENTIONS: [string, string, string][] = [['Archetype hands over a 42,000 m2 factory in Long An', 'Construction trade press', 'Today'], ['Design and build firms bet on industrial parks', 'Business daily', 'Yesterday'], ['Five firms shaping factory design in Vietnam', 'Industry news site', '3 Nov'], ['New office tower breaks ground in District 1', 'Regional paper', '1 Nov'], ['Workplace trends: the hybrid office in Asia', 'Design magazine', '29 Oct']];
export const MentionsPanel: React.FC<{newIn?: number; ring?: number; w?: number}> = ({newIn = 1, ring = 1, w = 940}) => (
  <Card w={w}>
    <Title sub="checked every day">PR mentions</Title>
    <div style={{position: 'relative'}}>
      {MENTIONS.map(([h, src, d], i) => (
        <div key={i} style={{opacity: i === 0 ? newIn : i === 4 ? 1 - newIn : 1, transform: i === 0 ? `translateY(${(1 - newIn) * -30}px) scale(${0.97 + newIn * 0.03})` : `translateY(${(newIn - 1) * 90}px)`, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 18, border: hair, marginBottom: 10, background: '#fff', boxShadow: i === 0 ? `0 0 0 ${2.5 * ring}px ${C.cyan}, 0 16px 34px -18px rgba(0,120,160,.45)` : 'none'}}>
          <div style={{width: 46, height: 46, borderRadius: 14, background: i === 0 ? LOOP : C.inset, display: 'grid', placeItems: 'center', flex: 'none'}}><svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke={i === 0 ? '#fff' : C.teal} strokeWidth="1.6"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
          <div style={{flex: 1}}><div style={{fontSize: 18, fontWeight: 650}}>{h}</div><div style={{fontSize: 14.5, color: C.ink3, marginTop: 3}}>{src}</div></div>
          {i === 0 && <span style={{fontSize: 14, fontWeight: 700, color: C.up, background: 'rgba(63,122,38,.1)', borderRadius: 99, padding: '4px 12px'}}>● New</span>}
          <span style={{fontSize: 14.5, color: C.ink3, width: 80, textAlign: 'right'}}>{d}</span>
        </div>
      ))}
    </div>
  </Card>
);

// ── Inquiries ──
export const RequestsPanel: React.FC<{won?: boolean; hl?: number; rowsIn?: number; w?: number}> = ({won = true, hl = 2, rowsIn = 1, w = 760}) => (
  <Card w={w} pad={0} style={{overflow: 'hidden'}}>
    <div style={{padding: '24px 28px 8px'}}><Title sub="every request, one list">Business inquiries</Title></div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 130px 110px', fontSize: 14, color: C.ink3, fontWeight: 600, padding: '0 28px 10px', borderBottom: hair}}><span>Request</span><span>Office</span><span>Status</span></div>
    {[['Office fit-out, 2,400 m2', 'Vietnam', 'New'], ['Factory design and build', 'Thailand', 'New'], ['Hotel renovation study', 'Cambodia', won ? 'Won' : 'Quoted'], ['Warehouse expansion', 'Indonesia', 'New'], ['Showroom interior', 'Philippines', 'Quoted'], ['Logistics hub master plan', 'Malaysia', 'Quoted']].map(([n, o, s], i) => {
      const k = clamp01(rowsIn * 6 - i);
      return (
        <div key={i} style={{opacity: k, transform: `translateY(${(1 - k) * 14}px)`, display: 'grid', gridTemplateColumns: '1fr 130px 110px', alignItems: 'center', fontSize: 18, padding: '16px 28px', borderBottom: hair, background: i === hl ? C.wash : 'none', fontWeight: i === hl ? 650 : 450}}>
          <span>{n}</span><span style={{color: C.ink2}}>{o}</span><span style={{fontSize: 14.5, fontWeight: 650, borderRadius: 99, padding: '5px 13px', width: 'fit-content', background: s === 'Won' ? C.teal : C.inset, color: s === 'Won' ? '#fff' : C.ink2}}>{s}</span>
        </div>
      );
    })}
  </Card>
);
export const RequestsChart: React.FC<{draw?: number; total?: number; w?: number}> = ({draw = 1, total = 24, w = 560}) => (
  <Card w={w}>
    <Title sub="last 12 months">Requests per month</Title>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}><Num v={String(total)} size={64} /><Delta v="26%" size={14} /></div>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 10, height: 220, marginTop: 20}}>{REQ_MONTHS.map((v, i) => <div key={i} style={{flex: 1, height: `${(v / 24) * 100 * clamp01(draw * 1.5 - i * 0.04)}%`, borderRadius: 6, background: i === REQ_MONTHS.length - 1 ? `linear-gradient(0deg, ${C.green}, ${C.cyan})` : '#dbe6e8'}} />)}</div>
  </Card>
);

// ── Approvals board ──
export const TaskCard: React.FC<{t: string; tag: string; tc: string; who: string; style?: React.CSSProperties}> = ({t, tag, tc, who, style}) => (
  <div style={{background: '#fff', borderRadius: 16, border: hair, padding: '16px 18px', boxShadow: '0 2px 6px rgba(5,60,63,.05)', fontFamily: F.text, color: C.ink, ...style}}>
    <div style={{fontSize: 18, fontWeight: 600, marginBottom: 12}}>{t}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}><span style={{fontSize: 14, fontWeight: 650, color: tc, background: `${tc}18`, borderRadius: 99, padding: '4px 12px'}}>{tag}</span><span style={{marginLeft: 'auto', width: 28, height: 28, borderRadius: 99, background: C.teal, color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{who}</span></div>
  </div>
);
export const BoardPanel: React.FC<{moved?: boolean; landed?: boolean; w?: number}> = ({moved = false, landed = false, w = 1040}) => (
  <Card w={w}>
    <Title sub={`${landed ? 43 : 44} waiting`}>To Be Approved</Title>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16}}>
      {[['To do', moved ? 4 : 5], ['In review', 2], ['Done', landed ? 4 : 3]].map(([n, k], col) => (
        <div key={n as string} style={{background: C.inset, borderRadius: 18, padding: 14, height: 470}}>
          <div style={{fontSize: 17, fontWeight: 700, marginBottom: 12}}>{n} <span style={{background: C.teal, color: '#fff', borderRadius: 99, padding: '1px 10px', fontSize: 13}}>{k as number}</span></div>
          <div style={{display: 'grid', gap: 12}}>
            {col === 0 && <>{<TaskCard t="Site photos for case study" tag="Urgent" tc="#ab3527" who="QA" style={{opacity: moved ? 0 : 1}} />}<TaskCard t="Office tour reel, final cut" tag="Urgent" tc="#ab3527" who="MT" /><TaskCard t="Brochure copy, page 4" tag="Important" tc="#8f5d18" who="LN" /></>}
            {col === 1 && <TaskCard t="LinkedIn post: factory handover" tag="Review" tc="#00768f" who="DT" />}
            {col === 2 && <>{landed && <TaskCard t="Site photos for case study" tag="Approved" tc="#3f7a26" who="QA" />}<TaskCard t="Newsletter, November" tag="Done" tc="#3f7a26" who="DT" /><TaskCard t="Case study photos" tag="Done" tc="#3f7a26" who="QA" /></>}
          </div>
        </div>
      ))}
    </div>
  </Card>
);
export const PortfolioPanel: React.FC<{draw?: number; w?: number}> = ({draw = 1, w = 400}) => (
  <Card w={w}>
    <Title sub="PPM master list">Project portfolio</Title>
    <svg width="240" height="240" viewBox="0 0 42 42" style={{display: 'block', margin: '0 auto 10px'}}>
      {(() => {let off = 0; return PORTFOLIO.map((s, i) => {const l = (s.v - 1) * draw; const el = <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={s.c} strokeWidth="5" strokeDasharray={`${l} ${100 - l}`} strokeDashoffset={25 - off * draw} />; off += s.v; return el;});})()}
      <text x="21" y="22.6" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="6.5" fill={C.ink}>{Math.round(128 * draw)}</text>
      <text x="21" y="26.6" textAnchor="middle" fontFamily="Inter" fontSize="2.4" fill={C.ink3}>projects</text>
    </svg>
    {[['archetype industry', '#7fbd42', 59], ['archetype reality', '#509cd5', 43], ['Archetype Group', '#055e63', 26]].map(([n, c, v]) => <div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, padding: '7px 0'}}><span style={{width: 12, height: 12, borderRadius: 3, background: c as string}} />{n}<span style={{marginLeft: 'auto', fontWeight: 650}}>{v}</span></div>)}
  </Card>
);

// ── Channel momentum: every row on its own scale, one shared timeline (the dashboard's Home chart) ──
export const MOMENTUM: {label: string; p: Platform; data: number[]; delta: string}[] = [
  {label: 'LinkedIn impressions', p: 'li', data: [5, 6, 5, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 24, 15, 9, 7, 6, 7, 6, 5, 6, 7, 6, 7, 6], delta: '+3.1x'},
  {label: 'Website sessions', p: 'web', data: [9, 10, 9, 11, 10, 9, 10, 11, 10, 9, 10, 11, 10, 9, 10, 11, 10, 13, 22, 16, 12, 11, 10, 11, 10, 11, 10, 11, 10, 11], delta: '+64%'},
  {label: 'Search clicks', p: 'search', data: [7, 8, 7, 8, 7, 8, 9, 8, 7, 8, 9, 8, 7, 8, 9, 8, 8, 9, 13, 17, 12, 10, 9, 9, 8, 9, 8, 9, 8, 9], delta: '+38%'},
  {label: 'Business inquiries', p: 'email', data: [2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 4, 6, 3, 2, 2, 1, 2, 2, 2, 1, 2], delta: '+3'},
];
export const MomentumPanel: React.FC<{draw?: number; band?: number; spike?: number; w?: number}> = ({draw = 1, band = 0, spike = 0, w = 1500}) => {
  const cw = w - 360, rh = 120;
  return (
    <Card w={w}>
      <Title sub="every row on its own scale, one shared timeline">Channel momentum</Title>
      <div style={{position: 'relative'}}>
        {band > 0 && <div style={{position: 'absolute', left: 250 + (17 / 29) * cw - 26, top: -6, width: 110, height: MOMENTUM.length * rh + 6, borderRadius: 16, background: `linear-gradient(180deg, rgba(127,188,66,${0.18 * band}), rgba(0,185,239,${0.18 * band}))`, border: `1.5px solid rgba(0,185,239,${0.5 * band})`}} />}
        {MOMENTUM.map((m, i) => {
          const {pts} = linePath(m.data, cw, rh - 30, 6);
          const k = clamp01(spike * 4 - i * 0.7);
          const pk = m.data.indexOf(Math.max(...m.data));
          return (
            <div key={m.label} style={{display: 'flex', alignItems: 'center', height: rh, borderBottom: i < MOMENTUM.length - 1 ? hair : 'none', position: 'relative'}}>
              <div style={{width: 250, display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, fontWeight: 600}}><PlatformIcon p={m.p} size={32} />{m.label}</div>
              <div style={{position: 'relative'}}>
                <Spark id={`mo${i}`} data={m.data} w={cw} h={rh - 30} color={spike > 0 ? [C.li, C.tealMid, C.cyan, C.green][i] : '#8fb0b5'} dot={false} draw={draw} area={spike > 0} width={3} />
                {k > 0 && <div style={{position: 'absolute', left: pts[pk][0] - 13, top: pts[pk][1] - 13, width: 26, height: 26, borderRadius: 99, background: '#fff', border: `5px solid ${C.cyan}`, transform: `scale(${k})`, boxShadow: `0 0 0 ${10 * (1 - k)}px rgba(0,185,239,.25)`}} />}
                {k > 0 && <div style={{position: 'absolute', left: pts[pk][0] + 22, top: pts[pk][1] - 18, background: C.ink, color: '#fff', borderRadius: 99, padding: '5px 14px', fontSize: 16, fontWeight: 700, opacity: k, whiteSpace: 'nowrap'}}>{m.delta}</div>}
              </div>
            </div>
          );
        })}
        <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 250, width: cw, fontSize: 14, color: C.ink3, marginTop: 8}}><span>1 Oct</span><span>15 Oct</span><span>30 Oct</span></div>
      </div>
    </Card>
  );
};
