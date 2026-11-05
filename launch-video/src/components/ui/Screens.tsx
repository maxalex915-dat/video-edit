import React from 'react';
import {C, LOOP, LOOP_BAR} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {fmt} from '../kit/Type';
import {Delta, Mark, PlatformIcon, Platform, Spark, PLATFORM_NAME} from './Primitives';
import {FIXES, INSIGHT, PORTFOLIO, REQ_MONTHS, SERIES, SITE} from '../../data/demo';

// Dashboard screens at their real size (13 to 15 px body, 22 px card radius, hairlines),
// so the camera can push in and everything stays crisp, like the product.
const hair = `1px solid ${C.rule}`;
export const Panel: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div style={{background: '#fff', borderRadius: 22, border: hair, boxShadow: '0 1px 2px rgba(5,60,63,.04), 0 6px 18px -8px rgba(5,60,63,.10)', padding: 20, fontFamily: F.text, color: C.ink, position: 'relative', ...style}}>{children}</div>
);
const T: React.FC<{children: React.ReactNode; sub?: string}> = ({children, sub}) => (
  <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14}}><span style={{fontSize: 17, fontWeight: 650}}>{children}</span>{sub && <span style={{fontSize: 12.5, color: C.ink3}}>{sub}</span>}</div>
);
const Num: React.FC<{v: string; size?: number; style?: React.CSSProperties}> = ({v, size = 30, style}) => <span style={{fontSize: size, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', ...style}}>{v}</span>;
const Sm: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{fontSize: 12.5, color: C.ink3, ...style}}>{children}</div>;
const Page: React.FC<{w?: number; h?: number; children: React.ReactNode; title: string; sub?: string}> = ({w = 1600, h = 1000, children, title, sub}) => (
  <div style={{width: w, height: h, background: '#fff', borderRadius: 28, overflow: 'hidden', fontFamily: F.text, color: C.ink, padding: '26px 32px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22}}><Mark size={26} /><span style={{fontSize: 22, fontWeight: 700}}>{title}</span>{sub && <span style={{fontSize: 13, color: C.ink3}}>{sub}</span>}
      <span style={{marginLeft: 'auto', display: 'flex', gap: 4, background: C.inset, padding: 4, borderRadius: 99, fontSize: 12.5, fontWeight: 600, color: C.ink3}}>{['7d', '1m', '3m', '12m'].map((r) => <span key={r} style={{padding: '4px 11px', borderRadius: 99, background: r === '1m' ? LOOP : 'none', color: r === '1m' ? '#fff' : C.ink3}}>{r}</span>)}</span>
    </div>
    {children}
  </div>
);

// ── Spreadsheet (the old way) ──
export const Spreadsheet: React.FC<{hl?: [number, number]; name?: string}> = ({hl = [6, 3], name = 'weekly_numbers_FINAL (3).xlsx'}) => (
  <div style={{width: 1400, background: '#fff', borderRadius: 14, overflow: 'hidden', fontFamily: F.text, fontSize: 14, color: C.ink2, border: '1px solid #dfe7e8'}}>
    <div style={{height: 38, background: '#f4f7f7', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderBottom: '1px solid #e3eaea'}}>
      {['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 11, height: 11, borderRadius: 99, background: c}} />)}
      <span style={{marginLeft: 12, fontSize: 13, fontWeight: 600, color: C.ink}}>{name}</span>
    </div>
    <div style={{display: 'flex', gap: 8, padding: '8px 14px', fontFamily: F.mono, fontSize: 13, borderBottom: '1px solid #e3eaea', color: C.ink3}}><span style={{width: 50}}>D7</span><span>=Facebook!C14+LinkedIn!C9</span></div>
    {Array.from({length: 16}).map((_, row) => (
      <div key={row} style={{display: 'grid', gridTemplateColumns: '50px repeat(8, 1fr)', borderBottom: '1px solid #eef2f2'}}>
        {Array.from({length: 9}).map((_, col) => {
          const on = row === hl[0] && col === hl[1];
          return <div key={col} style={{padding: '7px 10px', borderLeft: col ? '1px solid #eef2f2' : 'none', background: on ? 'rgba(0,185,239,.10)' : col === 0 || row === 0 ? '#f7fafa' : '#fff', boxShadow: on ? `inset 0 0 0 2px ${C.cyan}` : 'none', fontFamily: row && col ? F.mono : F.text, fontSize: 13, textAlign: col && row ? 'right' : 'left', fontWeight: row === 0 ? 600 : 400}}>
            {col === 0 ? (row ? row : '') : row === 0 ? ['Week', 'LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'Website', 'Search', 'Email'][col - 1] : col === 1 ? `W${30 + row}` : fmt(((row * 37 + col * 91) % 900) * 7 + 120)}
          </div>;
        })}
      </div>
    ))}
  </div>
);

// ── Website ──
export const WebsiteScreen: React.FC<{hl?: number; draw?: number}> = ({hl = 0, draw = 1}) => {
  const cities: [string, number][] = [['Ho Chi Minh City', 1196], ['Hanoi', 832], ['Singapore', 533], ['Paris', 364], ['Da Nang', 286], ['Bangkok', 221], ['Kuala Lumpur', 174]];
  return (
    <Page title="Website" sub="Google Analytics, last 30 days">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16}}>
        {[['Sessions', '7,930', '21.5%'], ['From search', '62%', '4.1%'], ['Avg. time', '1:48', '6.0%'], ['New visitors', '5,214', '17.2%']].map(([l, v, d]) => <Panel key={l}><Sm>{l}</Sm><div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}><Num v={v} /><Delta v={d} size={11} /></div></Panel>)}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16}}>
        <Panel style={{height: 660}}>
          <T sub="every day">Organic vs total sessions</T>
          <div style={{position: 'relative', height: 560}}>
            <div style={{position: 'absolute', inset: 0}}><Spark id="ws1" data={SERIES.b} w={850} h={540} color={C.teal} dot={false} draw={draw} /></div>
            <div style={{position: 'absolute', top: 110}}><Spark id="ws2" data={SERIES.a} w={850} h={430} color={C.green} draw={draw} /></div>
          </div>
        </Panel>
        <Panel style={{height: 660}}>
          <T>Active users by city</T>
          {cities.map(([c, v], i) => (
            <div key={c} style={{display: 'grid', gridTemplateColumns: '150px 1fr 54px', alignItems: 'center', gap: 12, padding: '14px 10px', borderRadius: 12, background: i === hl ? C.wash : 'none', fontSize: 14, fontWeight: i === hl ? 650 : 450}}>
              {c}<div style={{height: 8, borderRadius: 99, background: C.inset}}><div style={{width: `${(v / 1196) * 100}%`, height: '100%', borderRadius: 99, background: i === hl ? LOOP_BAR : '#b9cacd'}} /></div><span style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{fmt(v)}</span>
            </div>
          ))}
        </Panel>
      </div>
    </Page>
  );
};

// ── Search ──
export const SearchScreen: React.FC<{hl?: number}> = ({hl = 0}) => (
  <Page title="Search" sub="Google Search Console">
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16}}>
      {[['Impressions', '29,870', '9.7%', true], ['Clicks', '1,104', '12.3%', true], ['Click rate', '3.7%', '0.4 pts', true], ['Avg. position', '8.4', '1.2', true]].map(([l, v, d, u]) => <Panel key={l as string}><Sm>{l}</Sm><div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}><Num v={v as string} /><Delta v={d as string} up={u as boolean} size={11} /></div></Panel>)}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16}}>
      <Panel style={{height: 660}}><T sub="impressions and average rank">Search demand vs ranking</T><Spark id="sr1" data={SERIES.b} w={620} h={260} color={C.cyan} dot={false} /><div style={{height: 30}} /><Spark id="sr2" data={SERIES.c} w={620} h={220} color={C.green} area={false} /></Panel>
      <Panel style={{height: 660}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 80px 80px 70px', fontSize: 12.5, color: C.ink3, fontWeight: 600, padding: '0 12px 10px', borderBottom: hair}}><span>Top searches</span><span style={{textAlign: 'right'}}>Clicks</span><span style={{textAlign: 'right'}}>Shown</span><span style={{textAlign: 'right'}}>Rank</span></div>
        {[['design and build company', 214, 3120, 3.1], ['factory construction vietnam', 168, 2876, 4.6], ['office fit-out', 131, 2410, 5.2], ['construction consultancy', 96, 1980, 6.8], ['industrial park design', 74, 1690, 7.4], ['hotel renovation', 52, 1430, 9.9], ['warehouse design', 41, 1210, 11.2], ['project management services', 33, 980, 12.6]].map(([q, c, s, r], i) => (
          <div key={i} style={{display: 'grid', gridTemplateColumns: '1fr 80px 80px 70px', fontSize: 14, padding: '15px 12px', borderBottom: hair, borderRadius: i === hl ? 12 : 0, background: i === hl ? C.wash : 'none', fontWeight: i === hl ? 650 : 450, fontVariantNumeric: 'tabular-nums'}}>
            <span>{q}</span><span style={{textAlign: 'right'}}>{c}</span><span style={{textAlign: 'right'}}>{fmt(s as number)}</span><span style={{textAlign: 'right', color: C.up, fontWeight: 650}}>{r}</span>
          </div>
        ))}
      </Panel>
    </div>
  </Page>
);

// ── Email ──
export const EmailScreen: React.FC = () => (
  <Page title="Email" sub="GetResponse">
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16}}>
      {[['Subscribers', '3,412', '2.3%'], ['Open rate', '38.6%', '3.1 pts'], ['Click rate', '4.1%', '0.6 pts']].map(([l, v, d]) => <Panel key={l}><Sm>{l}</Sm><div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}><Num v={v} size={34} /><Delta v={d} size={11} /></div></Panel>)}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16}}>
      <Panel style={{height: 640}}><T sub="last 12 campaigns">Opens per campaign</T><Spark id="em1" data={SERIES.a} w={760} h={540} color={C.email} /></Panel>
      <Panel style={{height: 640}}>
        <T>November newsletter</T>
        {[['Sent', 3412, 100], ['Delivered', 3371, 98.8], ['Opened', 1317, 38.6], ['Clicked', 140, 4.1]].map(([l, v, p], i) => (
          <div key={l as string} style={{marginBottom: 26}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8}}><span>{l}</span><span style={{fontWeight: 650, fontVariantNumeric: 'tabular-nums'}}>{fmt(v as number)} <span style={{color: C.ink3, fontWeight: 450}}>{p}%</span></span></div>
            <div style={{height: 12, borderRadius: 99, background: C.inset}}><div style={{width: `${Math.max(p as number, 3)}%`, height: '100%', borderRadius: 99, background: i === 2 ? LOOP_BAR : '#b9cacd'}} /></div>
          </div>
        ))}
      </Panel>
    </div>
  </Page>
);

// ── Weekly briefing card (Insights) ──
export const InsightsScreen: React.FC<{typed?: number}> = ({typed = 1}) => {
  const s = INSIGHT.sentence;
  const n = Math.round(s.length * typed);
  return (
    <div style={{width: 1300, background: '#fff', borderRadius: 26, border: hair, padding: 44, fontFamily: F.text, color: C.ink}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 44, height: 44, borderRadius: 14, background: LOOP, display: 'grid', placeItems: 'center'}}><svg width="24" height="24" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#fff" /></svg></div>
        <span style={{fontSize: 18, fontWeight: 650}}>This week</span>
        <span style={{fontSize: 13, color: C.ink3, background: C.inset, borderRadius: 99, padding: '5px 12px'}}>Week of 2 to 8 November 2026</span>
        <span style={{marginLeft: 'auto', fontSize: 12.5, color: C.ink3}}>Written by Claude, Monday 07:13</span>
      </div>
      <div style={{fontFamily: F.display, fontSize: 46, fontWeight: 650, letterSpacing: '-0.025em', lineHeight: 1.15, color: C.teal, margin: '30px 0 14px', minHeight: 110}}>
        {s.slice(0, n)}{typed < 1 && <span style={{display: 'inline-block', width: 3, height: 46, background: C.cyan, verticalAlign: 'middle', marginLeft: 3}} />}
      </div>
      <div style={{fontSize: 17, color: C.ink2, lineHeight: 1.55, maxWidth: 1000}}>The carousel on the Long An factory handover reached twice the usual audience. Two of the three comments asked about timelines.</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 30}}>
        {INSIGHT.stats.map((x) => <div key={x.l} style={{background: C.inset, borderRadius: 16, padding: '16px 20px'}}><Num v={x.v} size={34} style={{color: x.v.startsWith('-') ? C.down : C.ink}} /><Sm>{x.l}</Sm></div>)}
      </div>
    </div>
  );
};

// ── Site health ──
export const Gauge: React.FC<{v: number; label: string; size: number; draw?: number}> = ({v, label, size, draw = 1}) => {
  const a = Math.PI * 0.75, span = Math.PI * 1.5, r = 42;
  const pt = (t: number) => [50 + r * Math.cos(a + span * t), 50 + r * Math.sin(a + span * t)];
  const arc = (t: number) => {const [x0, y0] = pt(0), [x1, y1] = pt(Math.max(t, 0.001)); return `M${x0},${y0} A${r},${r} 0 ${span * t > Math.PI ? 1 : 0} 1 ${x1},${y1}`;};
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs><linearGradient id={`gg${label}`} x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={C.green} /><stop offset=".55" stopColor={C.cyan} /><stop offset="1" stopColor={C.sky} /></linearGradient></defs>
        <path d={arc(1)} fill="none" stroke={C.inset} strokeWidth="7" strokeLinecap="round" />
        <path d={arc((v / 100) * draw)} fill="none" stroke={`url(#gg${label})`} strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'}}><div><Num v={String(Math.round(v * draw))} size={size * 0.26} style={{color: C.teal}} /><div style={{fontSize: size * 0.055, color: C.ink3, letterSpacing: '.12em', fontWeight: 600}}>{label}</div></div></div>
    </div>
  );
};
export const SiteHealthScreen: React.FC<{done?: number}> = ({done = 2}) => (
  <Page title="Site Audit" sub="archetype-group.com · crawled 5 Nov">
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
      <Panel style={{height: 820}}>
        <T>Site health</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 30, marginTop: 30}}><Gauge v={SITE.health} label="HEALTH" size={260} /><Gauge v={SITE.geo} label="AI SEARCH" size={260} /></div>
        <div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, fontSize: 13.5, fontWeight: 650}}>
          <span style={{color: C.down, background: 'rgba(171,53,39,.08)', borderRadius: 99, padding: '6px 14px'}}>{fmt(SITE.errors)} errors</span>
          <span style={{color: C.amber, background: '#fdf3e2', borderRadius: 99, padding: '6px 14px'}}>{fmt(SITE.warnings)} warnings</span>
          <span style={{color: C.ink2, background: C.inset, borderRadius: 99, padding: '6px 14px'}}>{fmt(SITE.notices)} notices</span>
        </div>
        <Sm style={{textAlign: 'center', marginTop: 18}}>{fmt(SITE.pages)} pages checked against 118 checks</Sm>
      </Panel>
      <Panel style={{height: 820}}>
        <T sub="most impact first">Fixes</T>
        {[...FIXES, 'Duplicate meta descriptions', 'Pages blocked from AI crawlers', 'Missing structured data'].map((x, i) => (
          <div key={x} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 6px', borderBottom: hair, fontSize: 14.5, color: i < done ? C.ink3 : C.ink}}>
            <span style={{width: 22, height: 22, borderRadius: 99, border: i < done ? 'none' : `1.5px solid ${C.rule}`, background: i < done ? C.up : 'none', color: '#fff', fontSize: 13, display: 'grid', placeItems: 'center'}}>{i < done ? '✓' : ''}</span>
            <span style={{flex: 1, textDecoration: i < done ? 'line-through' : 'none'}}>{x}</span>
            <span style={{fontSize: 12, color: i % 3 === 0 ? C.down : C.amber, fontWeight: 650}}>{[42, 37, 21, 88, 64, 12, 9][i]} pages</span>
          </div>
        ))}
      </Panel>
    </div>
  </Page>
);

// ── Competitor report page (PDF) ──
export const ReportPage: React.FC<{title?: string}> = ({title = 'November at a glance'}) => {
  const lv = [['Critical', '#b3261e', '#fbeceb'], ['High', '#c4501b', '#fcf0ea'], ['Medium', '#a87412', '#fdf6e4'], ['Low', '#2f7a4a', '#edf5ef']];
  const dots: [number, number, string][] = [[0, 0, 'NK'], [1, 1, 'TR'], [1, 0, 'AO'], [2, 0, 'BV'], [3, 1, 'LM'], [3, 1, 'QH']];
  return (
    <div style={{width: 900, height: 1270, background: '#fff', borderRadius: 6, padding: '70px 70px', fontFamily: F.text, color: C.ink}}>
      <div style={{fontFamily: F.mono, fontSize: 14, letterSpacing: '.18em', color: C.teal, fontWeight: 600}}>COMPETITIVE INTELLIGENCE · NOVEMBER 2026</div>
      <div style={{fontFamily: F.display, fontSize: 54, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 18}}>{title}</div>
      <div style={{width: 90, height: 5, borderRadius: 3, background: LOOP_BAR, margin: '22px 0 34px'}} />
      <div style={{display: 'flex', gap: 14, marginBottom: 34}}>{[['6 of 13', 'in the news'], ['4', 'developments'], ['Critical', 'top impact']].map(([v, l], i) => <div key={l} style={{flex: 1, background: C.inset, borderRadius: 12, padding: '14px 18px'}}><Num v={v} size={28} style={{color: i === 2 ? C.down : C.ink}} /><Sm>{l}</Sm></div>)}</div>
      <div style={{display: 'grid', gridTemplateColumns: '120px 1fr 1fr', fontSize: 13, fontWeight: 650, color: C.ink3, padding: '0 14px 10px'}}><span /><span>Plan announced</span><span>Already done</span></div>
      {lv.map(([l, c, b], i) => (
        <div key={l} style={{display: 'grid', gridTemplateColumns: '120px 1fr 1fr', alignItems: 'center', height: 78, background: b, borderRadius: 10, marginBottom: 6, padding: '0 14px', color: c, fontSize: 15, fontWeight: 650}}>
          {l}{[0, 1].map((col) => <div key={col} style={{display: 'flex', gap: 8}}>{dots.filter((d) => d[0] === i && d[1] === col).map((d) => <span key={d[2]} style={{width: 40, height: 40, borderRadius: 99, background: c, color: '#fff', fontSize: 13, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{d[2]}</span>)}</div>)}
        </div>
      ))}
      {[0, 1, 2, 3].map((r) => <div key={r} style={{marginTop: 30}}><div style={{fontSize: 16, fontWeight: 650}}>{['NK opened a design studio in Hanoi', 'TR won a 60,000 m2 factory in Bac Ninh', 'AO announced a sustainability unit', 'BV hired a new regional director'][r]}</div><Sm style={{marginTop: 6, lineHeight: 1.5}}>Source checked. What it means for us and which office it touches, in two plain sentences.</Sm></div>)}
    </div>
  );
};

// ── Share panel ──
export const SharePanel: React.FC = () => (
  <div style={{width: 760, background: '#fff', borderRadius: 22, border: hair, padding: 30, fontFamily: F.text, color: C.ink, boxShadow: '0 30px 70px -30px rgba(5,60,63,.3)'}}>
    <div style={{fontSize: 19, fontWeight: 700}}>Share the report</div>
    <Sm style={{marginTop: 4}}>Opens one month's report, no sign-in needed.</Sm>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 22}}>
      <div><Sm>For</Sm><div style={{border: hair, borderRadius: 99, padding: '10px 16px', marginTop: 6, fontSize: 14.5}}>Leadership team</div></div>
      <div><Sm>Works for</Sm><div style={{display: 'flex', gap: 6, marginTop: 6}}>{['7 days', '30 days', '90 days'].map((d) => <span key={d} style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '10px 0', fontSize: 13.5, fontWeight: 600, background: d === '30 days' ? LOOP : C.inset, color: d === '30 days' ? '#fff' : C.ink2}}>{d}</span>)}</div></div>
    </div>
    <div style={{display: 'flex', gap: 10, marginTop: 20, alignItems: 'center'}}>
      <div style={{flex: 1, borderRadius: 99, background: C.inset, padding: '12px 18px', fontFamily: F.mono, fontSize: 13.5, color: C.ink2}}>…/share.html#r=nov-2026.k3f9…</div>
      <span style={{borderRadius: 99, background: C.teal, color: '#fff', padding: '12px 22px', fontSize: 14, fontWeight: 650}}>Copy link</span>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 13, color: C.ink3}}><span><span style={{color: C.up}}>●</span> Active · until 5 December</span><span>Opened 3 times</span></div>
  </div>
);

// ── PR mentions ──
export const MentionsScreen: React.FC<{fresh?: number}> = ({fresh = 1}) => (
  <Page title="PR Tracking" sub="checked every day">
    {[['New', 'Construction trade press', 'Archetype hands over a 42,000 m2 factory in Long An', 'Today'], ['', 'Business daily', 'Design and build firms bet on industrial parks', 'Yesterday'], ['', 'Industry news site', 'Five firms shaping factory design in Vietnam', '3 Nov'], ['', 'Regional paper', 'New office tower breaks ground in District 1', '1 Nov'], ['', 'Design magazine', 'Workplace trends: the hybrid office in Asia', '29 Oct'], ['', 'Trade press', 'Sustainability rules reshape warehouse design', '27 Oct']].map(([n, src, h, d], i) => (
      <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 22px', borderRadius: 18, border: hair, marginBottom: 12, background: i === 0 ? '#fff' : '#fcfdfd', boxShadow: i === 0 ? `0 0 0 ${2 * fresh}px ${C.cyan}, 0 18px 40px -20px rgba(0,120,160,.4)` : 'none'}}>
        <div style={{width: 48, height: 48, borderRadius: 14, background: i === 0 ? LOOP : C.inset, display: 'grid', placeItems: 'center'}}><svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke={i === 0 ? '#fff' : C.teal} strokeWidth="1.6"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
        <div style={{flex: 1}}><div style={{fontSize: 16, fontWeight: 650}}>{h}</div><Sm style={{marginTop: 4}}>{src}</Sm></div>
        {n && <span style={{fontSize: 12.5, fontWeight: 700, color: C.up, background: 'rgba(63,122,38,.1)', borderRadius: 99, padding: '4px 12px'}}>● {n}</span>}
        <Sm style={{width: 80, textAlign: 'right'}}>{d}</Sm>
      </div>
    ))}
  </Page>
);

// ── Business inquiries ──
export const InquiriesScreen: React.FC<{hl?: number; draw?: number}> = ({hl = 0, draw = 1}) => (
  <Page title="Business Inquiries" sub="every request, in one list">
    <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16}}>
      <Panel style={{height: 840, padding: 0, overflow: 'hidden'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 120px 90px', fontSize: 12.5, color: C.ink3, fontWeight: 600, padding: '18px 22px', borderBottom: hair}}><span>Request</span><span>Office</span><span>Status</span></div>
        {[['Office fit-out, 2,400 m2', 'Vietnam', 'New'], ['Factory design and build', 'Thailand', 'New'], ['Hotel renovation study', 'Cambodia', 'Won'], ['Warehouse expansion', 'Indonesia', 'New'], ['Showroom interior', 'Philippines', 'Quoted'], ['Logistics hub master plan', 'Malaysia', 'Quoted'], ['School campus feasibility', 'Vietnam', 'New'], ['Data centre shell', 'Singapore', 'Lost']].map(([n, o, s], i) => (
          <div key={i} style={{display: 'grid', gridTemplateColumns: '1fr 120px 90px', alignItems: 'center', fontSize: 14.5, padding: '19px 22px', borderBottom: hair, background: i === hl ? C.wash : 'none', fontWeight: i === hl ? 650 : 450}}>
            <span>{n}</span><span style={{color: C.ink2}}>{o}</span><span style={{fontSize: 12.5, fontWeight: 650, borderRadius: 99, padding: '4px 10px', width: 'fit-content', background: s === 'Won' ? C.teal : C.inset, color: s === 'Won' ? '#fff' : C.ink2}}>{s}</span>
          </div>
        ))}
      </Panel>
      <Panel style={{height: 840}}>
        <T sub="last 12 months">Requests per month</T>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}><Num v={String(Math.round(24 * draw))} size={64} /><Delta v="26%" size={13} /></div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, height: 560, marginTop: 30}}>{REQ_MONTHS.map((v, i) => <div key={i} style={{flex: 1, height: `${(v / 24) * 100 * draw}%`, borderRadius: 6, background: i === REQ_MONTHS.length - 1 ? `linear-gradient(0deg, ${C.green}, ${C.cyan})` : '#dbe6e8'}} />)}</div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink3, marginTop: 10}}><span>Dec</span><span>Nov</span></div>
      </Panel>
    </div>
  </Page>
);

// ── To Be Approved board + PPM donut ──
export const BoardScreen: React.FC<{lift?: number}> = ({lift = 1}) => {
  const task = (t: string, tag: string, tc: string, who: string) => (
    <div style={{background: '#fff', borderRadius: 14, border: hair, padding: '14px 16px', boxShadow: '0 2px 6px rgba(5,60,63,.05)'}}>
      <div style={{fontSize: 14.5, fontWeight: 600, marginBottom: 10}}>{t}</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}><span style={{fontSize: 12, fontWeight: 650, color: tc, background: `${tc}18`, borderRadius: 99, padding: '3px 10px'}}>{tag}</span><span style={{marginLeft: 'auto', width: 24, height: 24, borderRadius: 99, background: C.teal, color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{who}</span></div>
    </div>
  );
  return (
    <Page title="To Be Approved" sub="44 waiting">
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 0.9fr', gap: 16}}>
        {[['To do', 5], ['In review', 2], ['Done', 3]].map(([n, k], col) => (
          <div key={n as string} style={{background: C.inset, borderRadius: 18, padding: 14, height: 830}}>
            <div style={{fontSize: 15, fontWeight: 700, marginBottom: 12}}>{n} <span style={{background: C.teal, color: '#fff', borderRadius: 99, padding: '1px 9px', fontSize: 12}}>{k as number}</span></div>
            <div style={{display: 'grid', gap: 10}}>
              {col === 0 && <>{task('Office tour reel, final cut', 'Urgent', '#ab3527', 'MT')}{task('Brochure copy, page 4', 'Important', '#8f5d18', 'LN')}{task('Award entry text', 'This week', '#00768f', 'HP')}</>}
              {col === 1 && <>{task('LinkedIn post: factory handover', 'Review', '#00768f', 'DT')}</>}
              {col === 2 && <>{task('Newsletter, November', 'Done', '#3f7a26', 'DT')}{task('Case study photos', 'Done', '#3f7a26', 'QA')}</>}
            </div>
          </div>
        ))}
        <Panel style={{height: 830}}>
          <T>Project portfolio</T>
          <svg width="300" height="300" viewBox="0 0 42 42" style={{display: 'block', margin: '40px auto'}}>
            {(() => {let off = 0; return PORTFOLIO.map((s, i) => {const el = <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={s.c} strokeWidth="5" strokeDasharray={`${s.v - 1} ${101 - s.v}`} strokeDashoffset={25 - off} />; off += s.v; return el;});})()}
            <text x="21" y="22.6" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="6.5" fill={C.ink}>128</text>
            <text x="21" y="26.6" textAnchor="middle" fontFamily="Inter" fontSize="2.4" fill={C.ink3}>projects</text>
          </svg>
          {[['archetype industry', '#7fbd42', 59], ['archetype reality', '#509cd5', 43], ['Archetype Group', '#055e63', 26]].map(([n, c, v]) => <div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, padding: '9px 0'}}><span style={{width: 10, height: 10, borderRadius: 3, background: c as string}} />{n}<span style={{marginLeft: 'auto', fontWeight: 650}}>{v}</span></div>)}
        </Panel>
      </div>
    </Page>
  );
};

export const LoginField: React.FC<{p: Platform}> = ({p}) => (
  <div style={{width: 300, background: '#fff', borderRadius: 18, border: hair, padding: 20, fontFamily: F.text, color: C.ink, boxShadow: '0 20px 50px -24px rgba(5,60,63,.28)'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 650}}><PlatformIcon p={p} size={34} />{PLATFORM_NAME[p]}</div>
    <div style={{marginTop: 16, border: hair, borderRadius: 99, padding: '9px 14px', fontSize: 13, color: C.ink4}}>Email address</div>
    <div style={{marginTop: 8, border: hair, borderRadius: 99, padding: '9px 14px', fontSize: 13, color: C.ink4, letterSpacing: '.2em'}}>••••••••</div>
    <div style={{marginTop: 12, borderRadius: 99, padding: '9px 0', fontSize: 13, fontWeight: 650, textAlign: 'center', background: C.ink, color: '#fff'}}>Sign in</div>
  </div>
);
