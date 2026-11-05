import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop, Grain, Vignette} from '../components/kit/Backdrop';
import {Label, fmt} from '../components/kit/Type';
import {Card, Chip, Glass, Mark, PlatformIcon, Platform, Spark, linePath, PLATFORM_NAME} from '../components/ui/Primitives';
import {HomeReplica} from '../components/ui/HomeReplica';
import {C, LOOP, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';
import {BARS, FIXES, INSIGHT, PORTFOLIO, REQ_MONTHS, REQUESTS, RIVALS, SERIES, SITE} from '../data/demo';

const H1: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties; color?: string}> = ({children, size = 104, style, color = C.textOnDark}) => (
  <div style={{fontFamily: F.display, fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.035em', color, ...style}}>{children}</div>
);
const G: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{backgroundImage: `linear-gradient(100deg, ${C.green}, ${C.cyan} 55%, ${C.sky})`, WebkitBackgroundClip: 'text', color: 'transparent'}}>{children}</span>
);
const Frame: React.FC<{children: React.ReactNode; bg?: React.ReactNode}> = ({children, bg}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    {bg ?? <Backdrop />}
    {children}
    <Vignette />
    <Grain />
  </AbsoluteFill>
);
const abs = (x: number, y: number, extra: React.CSSProperties = {}): React.CSSProperties => ({position: 'absolute', left: x, top: y, ...extra});

// 1. Seven platforms, seven logins
const K1 = () => {
  const ps: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
  const pos = [[1080, 150, -14], [1450, 230, 12], [1250, 430, -6], [1620, 520, 16], [1060, 640, 10], [1400, 760, -12], [1700, 860, 8]];
  return (
    <Frame>
      {ps.map((p, i) => (
        <div key={p} style={abs(pos[i][0], pos[i][1], {transform: `perspective(1200px) rotateY(${pos[i][2]}deg) rotateZ(${pos[i][2] / 3}deg)`})}>
          <Glass style={{padding: 18, display: 'flex', alignItems: 'center', gap: 16, borderRadius: 28}}>
            <PlatformIcon p={p} size={64} />
            <div>
              <div style={{fontSize: 22, fontWeight: 650}}>{PLATFORM_NAME[p]}</div>
              <div style={{marginTop: 8, display: 'flex', gap: 6}}>
                <div style={{width: 120, height: 26, borderRadius: 999, background: 'rgba(255,255,255,.1)', fontFamily: F.mono, fontSize: 14, color: C.mutedOnDark, padding: '3px 12px'}}>••••••••</div>
                <div style={{height: 26, borderRadius: 999, background: 'rgba(112,203,243,.25)', fontSize: 13, padding: '4px 12px', fontWeight: 600}}>Sign in</div>
              </div>
            </div>
          </Glass>
        </div>
      ))}
      <div style={abs(150, 380)}>
        <Label style={{marginBottom: 28}}>The old way</Label>
        <H1 size={120}>Seven platforms.</H1>
        <H1 size={120} color={C.mutedOnDark}>Seven logins.</H1>
      </div>
    </Frame>
  );
};

// 2. Copied by hand
const Sheet: React.FC<{x: number; y: number; r: number; seed: number; hl?: boolean}> = ({x, y, r, seed, hl}) => (
  <div style={abs(x, y, {transform: `perspective(1400px) rotateY(${r}deg) rotateX(6deg)`})}>
    <div style={{width: 640, background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 80px -30px rgba(0,0,0,.7)', fontFamily: F.mono, fontSize: 15, color: C.ink2}}>
      <div style={{height: 36, background: '#e9f1f1', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px'}}>
        {['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 11, height: 11, borderRadius: 99, background: c}} />)}
        <span style={{marginLeft: 12, fontFamily: F.text, fontSize: 13, fontWeight: 600}}>{['report_final_v3.xlsx', 'social_export.csv', 'weekly_numbers (2).xlsx'][seed % 3]}</span>
      </div>
      {Array.from({length: 8}).map((_, row) => (
        <div key={row} style={{display: 'grid', gridTemplateColumns: '50px repeat(5,1fr)', borderTop: '1px solid #e3eaea'}}>
          {Array.from({length: 6}).map((_, col) => (
            <div key={col} style={{padding: '8px 10px', borderLeft: col ? '1px solid #e3eaea' : 'none', background: hl && row === 4 && col === 3 ? 'rgba(0,185,239,.18)' : col === 0 ? '#f4f8f8' : '#fff', outline: hl && row === 4 && col === 3 ? `2px solid ${C.cyan}` : 'none'}}>
              {col === 0 ? row + 1 : row === 0 ? ['Date', 'Reach', 'Clicks', 'Views', 'Opens'][col - 1] : fmt(((row * 37 + col * 91 + seed * 13) % 900) * 7 + 120)}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
const Cursor: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <svg style={abs(x, y, {transform: `scale(${s})`, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.4))'})} width="40" height="48" viewBox="0 0 20 24">
    <path d="M2 1.5v18l5-4.6 3.2 7.2 3-1.3-3.1-7h6.6z" fill="#fff" stroke="#10242a" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const K2 = () => (
  <Frame>
    <Sheet x={1130} y={110} r={-18} seed={1} />
    <Sheet x={1260} y={330} r={-14} seed={2} />
    <Sheet x={1080} y={540} r={-20} seed={3} hl />
    <Cursor x={1600} y={770} s={1.4} />
    <Chip color={C.ink} bg="#fff" size={22} style={abs(1450, 480, {boxShadow: '0 10px 30px rgba(0,0,0,.4)'})}>Ctrl + C</Chip>
    <Chip color={C.ink} bg="#fff" size={22} style={abs(1700, 700, {boxShadow: '0 10px 30px rgba(0,0,0,.4)'})}>Ctrl + V</Chip>
    <div style={abs(150, 400)}>
      <H1 size={110}>Copied by hand.</H1>
      <H1 size={110} color={C.mutedOnDark}>Every single week.</H1>
    </div>
  </Frame>
);

// 3. Reveal on the drop
const K3 = () => (
  <Frame bg={<AbsoluteFill style={{background: LOOP}} />}>
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.55), transparent 45%)'}} />
    <AbsoluteFill style={{display: 'grid', placeItems: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 18, background: 'rgba(255,255,255,.85)', borderRadius: 999, padding: '12px 30px 12px 14px', marginBottom: 40, boxShadow: '0 10px 40px rgba(5,94,99,.25)'}}>
          <Mark size={56} /><span style={{fontFamily: F.display, fontSize: 34, fontWeight: 700, color: C.teal}}>Archetype</span>
        </div>
        <H1 size={188} color={C.ink} style={{letterSpacing: '-0.045em'}}>Marketing<br />Dashboard</H1>
      </div>
    </AbsoluteFill>
  </Frame>
);

// 4. Every channel, one screen
const K4 = () => (
  <Frame>
    <div style={abs(160, 90)}><H1 size={84}>Every channel. <G>One screen.</G></H1></div>
    <div style={abs(300, 250, {transform: 'perspective(2400px) rotateX(18deg) rotateZ(-2deg) scale(.86)', transformOrigin: 'top center', boxShadow: '0 60px 140px -40px rgba(0,185,239,.45)', borderRadius: 28})}>
      <HomeReplica />
    </div>
  </Frame>
);

// 5. Updates itself
const K5 = () => (
  <Frame>
    <div style={abs(150, 300)}>
      <Label style={{marginBottom: 24}}>Time saved</Label>
      <H1 size={110}>Updates itself.</H1>
      <H1 size={110}><G>Every morning.</G></H1>
      <div style={{fontFamily: F.text, fontSize: 36, color: C.mutedOnDark, marginTop: 30}}>No more copy and paste.</div>
    </div>
    <Card style={abs(1070, 190, {width: 700, height: 700, padding: 54})}>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <svg width="240" height="240" viewBox="0 0 100 100">
          <defs><linearGradient id="k5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.green} /><stop offset=".4" stopColor={C.cyan} /><stop offset="1" stopColor={C.sky} /></linearGradient></defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke={C.inset} strokeWidth="9" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#k5)" strokeWidth="9" strokeLinecap="round" strokeDasharray="200 264" transform="rotate(-90 50 50)" />
          <path d="M50 50 L50 24 M50 50 L66 58" stroke={C.ink} strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="4" fill={C.ink} />
        </svg>
        <div>
          <div style={{fontFamily: F.display, fontSize: 120, fontWeight: 800, background: LOOP, WebkitBackgroundClip: 'text', color: 'transparent', lineHeight: 1}}>07:13</div>
          <div style={{fontSize: 26, color: C.ink2, marginTop: 8}}>every day, on its own</div>
        </div>
      </div>
      <div style={{marginTop: 70, display: 'grid', gap: 30, fontSize: 26, color: C.ink2}}>
        <div style={{display: 'grid', gridTemplateColumns: '170px 1fr', alignItems: 'center'}}>By hand<div style={{height: 22, borderRadius: 99, background: C.inset}}><div style={{width: '22%', height: '100%', borderRadius: 99, background: '#c9d6d8'}} /></div></div>
        <div style={{display: 'grid', gridTemplateColumns: '170px 1fr 50px', alignItems: 'center', gap: 0}}>Automatic<div style={{height: 22, borderRadius: 99, background: LOOP_BAR}} /><div style={{width: 40, height: 40, borderRadius: 99, background: C.up, color: '#fff', display: 'grid', placeItems: 'center', marginLeft: 12, fontSize: 24}}>✓</div></div>
      </div>
      <div style={{display: 'flex', gap: 14, marginTop: 56}}>{(['web', 'search', 'li', 'fb', 'ig', 'yt', 'email'] as Platform[]).map((p) => <PlatformIcon key={p} p={p} size={62} />)}</div>
    </Card>
  </Frame>
);

// 6. See what is working (bars mid-morph into line)
const K6 = () => {
  const W = 1060, Hh = 520;
  const {d} = linePath(SERIES.trend, W, Hh - 80, 20);
  return (
    <Frame>
      <div style={abs(150, 110)}><H1 size={110}>See what is <G>working.</G></H1></div>
      <Card style={abs(700, 330, {width: 1080, height: 620, padding: 40})}>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 34, height: 440, paddingLeft: 30}}>
          {BARS.map((b, i) => (
            <div key={i} style={{position: 'relative', width: 104, height: `${b}%`, borderRadius: 16, background: i === 5 ? `linear-gradient(0deg, ${C.green}, ${C.cyan} 60%, ${C.sky})` : '#dfe9ea'}}>
              {i === 5 && <span style={{position: 'absolute', top: -58, left: 8, background: C.teal, color: '#fff', borderRadius: 999, padding: '6px 20px', fontSize: 24, fontWeight: 700}}>best</span>}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', gap: 34, paddingLeft: 30, marginTop: 20}}>
          {(['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'] as Platform[]).map((p) => <div key={p} style={{width: 104, display: 'grid', placeItems: 'center'}}><PlatformIcon p={p} size={52} /></div>)}
        </div>
        <svg style={abs(20, 50)} width={W} height={Hh}><path d={d} fill="none" stroke={C.cyan} strokeWidth="6" strokeLinecap="round" strokeDasharray="1400 3000" opacity=".9" /></svg>
      </Card>
      <Chip color="#fff" bg={C.teal} size={34} style={abs(1520, 280, {boxShadow: '0 10px 30px rgba(0,0,0,.4)'})}>+29%</Chip>
      <div style={abs(150, 380, {width: 470})}><div style={{fontFamily: F.text, fontSize: 40, lineHeight: 1.3, color: C.mutedOnDark}}>Every post, every channel, ranked by what it actually did.</div></div>
    </Frame>
  );
};

// 7. Weekly AI briefing
const K7 = () => (
  <Frame>
    <div style={abs(150, 140)}><Label style={{marginBottom: 24}}>Insights, every Monday</Label><H1 size={104}>A briefing, written<br />for you <G>weekly.</G></H1></div>
    <Glass style={abs(150, 520, {width: 1000, padding: 44})}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 26}}>
        <div style={{width: 64, height: 64, borderRadius: 18, background: LOOP, display: 'grid', placeItems: 'center'}}><svg width="34" height="34" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="#fff" /></svg></div>
        <div style={{fontSize: 30, fontWeight: 650}}>This week</div>
        <Chip color={C.textOnDark} bg="rgba(255,255,255,.12)" size={20}>Week of 2 to 8 November</Chip>
      </div>
      <div style={{fontFamily: F.display, fontSize: 52, fontWeight: 650, lineHeight: 1.15, letterSpacing: '-0.02em'}}>LinkedIn reach doubled after Tuesday’s project po<span style={{display: 'inline-block', width: 4, height: 52, background: C.cyan, verticalAlign: 'middle', marginLeft: 4}} /></div>
    </Glass>
    <div style={abs(1250, 300, {display: 'grid', gap: 26})}>
      {INSIGHT.stats.map((s, i) => (
        <Card key={i} style={{width: 500, padding: '28px 34px', transform: `translateX(${i * 40}px)`}}>
          <div style={{fontFamily: F.display, fontSize: 72, fontWeight: 750, color: s.v.startsWith('-') ? C.down : C.ink, letterSpacing: '-0.02em'}}>{s.v}</div>
          <div style={{fontSize: 26, color: C.ink3}}>{s.l}</div>
        </Card>
      ))}
    </div>
  </Frame>
);

// 8. Site audit
const Gauge: React.FC<{v: number; label: string; size: number}> = ({v, label, size}) => {
  const a = Math.PI * 0.75, span = Math.PI * 1.5, r = 42;
  const pt = (t: number) => [50 + r * Math.cos(a + span * t), 50 + r * Math.sin(a + span * t)];
  const arc = (t: number) => {const [x0, y0] = pt(0), [x1, y1] = pt(t); return `M${x0},${y0} A${r},${r} 0 ${span * t > Math.PI ? 1 : 0} 1 ${x1},${y1}`;};
  return (
    <div style={{position: 'relative', width: size, height: size}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs><linearGradient id={`g${label}`} x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={C.green} /><stop offset=".5" stopColor={C.cyan} /><stop offset="1" stopColor={C.sky} /></linearGradient></defs>
        <path d={arc(1)} fill="none" stroke={C.inset} strokeWidth="8" strokeLinecap="round" />
        <path d={arc(v / 100)} fill="none" stroke={`url(#g${label})`} strokeWidth="8" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center'}}>
        <div><div style={{fontFamily: F.display, fontSize: size * 0.3, fontWeight: 750, color: C.teal, lineHeight: 1}}>{v}</div><div style={{fontFamily: F.mono, fontSize: size * 0.065, color: C.ink3, letterSpacing: '.1em'}}>{label}</div></div>
      </div>
    </div>
  );
};
const K8 = () => (
  <Frame>
    <Card style={abs(150, 170, {width: 860, height: 740, padding: 56})}>
      <div style={{fontSize: 34, fontWeight: 700}}>Site health</div>
      <div style={{display: 'flex', gap: 40, marginTop: 30, justifyContent: 'center'}}><Gauge v={SITE.health} label="HEALTH" size={330} /><Gauge v={SITE.geo} label="AI SEARCH" size={330} /></div>
      <div style={{display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10}}>
        <Chip size={26} color={C.down} bg="rgba(171,53,39,.1)">{fmt(SITE.errors)} errors</Chip>
        <Chip size={26} color={C.amber} bg="rgba(214,159,77,.18)">{fmt(SITE.warnings)} warnings</Chip>
        <Chip size={26} color={C.ink2} bg={C.inset}>{fmt(SITE.notices)} notices</Chip>
      </div>
      <div style={{textAlign: 'center', fontSize: 24, color: C.ink3, marginTop: 26}}>{fmt(SITE.pages)} pages checked</div>
    </Card>
    <div style={abs(1110, 170)}><H1 size={92}>Your website,<br /><G>checked in-house.</G></H1><div style={{fontFamily: F.text, fontSize: 34, color: C.mutedOnDark, marginTop: 20}}>Over 100 checks.</div></div>
    <div style={abs(1110, 560, {display: 'grid', gap: 16, width: 640})}>
      {FIXES.map((x, i) => (
        <Glass key={x} style={{padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 18, borderRadius: 20, fontSize: 28, opacity: i < 3 ? 1 : 0.5}}>
          <span style={{width: 36, height: 36, borderRadius: 99, display: 'grid', placeItems: 'center', background: i < 2 ? C.up : 'rgba(255,255,255,.12)', fontSize: 20}}>{i < 2 ? '✓' : ''}</span>
          <span style={{textDecoration: i < 2 ? 'line-through' : 'none', color: i < 2 ? C.mutedOnDark : C.textOnDark}}>{x}</span>
        </Glass>
      ))}
    </div>
  </Frame>
);

// 9. Competitors
const K9 = () => {
  const lv = ['Critical', 'High', 'Medium', 'Low'];
  const tint = ['rgba(171,53,39,.10)', 'rgba(171,53,39,.05)', 'rgba(214,159,77,.14)', 'rgba(63,122,38,.08)'];
  const dot = ['#b3261e', '#d4561e', '#e0a020', '#2f7a4a'];
  return (
    <Frame>
      <div style={abs(150, 110)}><H1 size={100}>Competitor moves,<br /><G>every month.</G></H1></div>
      {[0, 1, 2].map((i) => (
        <Card key={i} radius={16} style={abs(180 + i * 150, 430 + i * 20, {width: 470, height: 600, padding: 34, transform: `perspective(1600px) rotateY(${22 - i * 8}deg) rotateZ(${-8 + i * 5}deg)`})}>
          <div style={{fontFamily: F.mono, fontSize: 16, letterSpacing: '.14em', color: C.teal, fontWeight: 600}}>COMPETITIVE INTELLIGENCE</div>
          <div style={{fontFamily: F.display, fontSize: 30, fontWeight: 700, marginTop: 14}}>{['November report', 'Country offices', 'What they launched'][i]}</div>
          {[0, 1, 2, 3, 4, 5].map((r) => <div key={r} style={{height: 12, borderRadius: 6, background: C.inset, marginTop: 22, width: `${90 - ((r * 17) % 40)}%`}} />)}
        </Card>
      ))}
      <Card style={abs(1000, 300, {width: 780, padding: 40})}>
        <div style={{display: 'grid', gridTemplateColumns: '170px 1fr 1fr', fontSize: 22, color: C.ink3, fontWeight: 600, marginBottom: 12}}><span /><span>Plan announced</span><span>Already done</span></div>
        {lv.map((l, i) => (
          <div key={l} style={{display: 'grid', gridTemplateColumns: '170px 1fr 1fr', alignItems: 'center', height: 100, background: tint[i], borderRadius: 14, marginBottom: 8, padding: '0 20px', fontSize: 26, fontWeight: 650, color: dot[i]}}>
            {l}
            {[0, 1].map((col) => (
              <div key={col} style={{display: 'flex', gap: 12}}>
                {RIVALS.filter((r) => r.lvl === i && r.col === col).map((r) => <span key={r.i} style={{width: 60, height: 60, borderRadius: 99, background: dot[i], color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 700, boxShadow: '0 6px 14px rgba(0,0,0,.2)'}}>{r.i}</span>)}
              </div>
            ))}
          </div>
        ))}
      </Card>
      <Chip color={C.teal} bg="#fff" size={26} style={abs(1610, 220, {boxShadow: '0 10px 30px rgba(0,0,0,.4)'})}>⬇ PDF</Chip>
    </Frame>
  );
};

// 10. Mentions and requests
const K10 = () => (
  <Frame>
    <div style={abs(150, 120)}><H1 size={96}>Every mention<br />and request,<br /><G>logged.</G></H1></div>
    <Card style={abs(150, 620, {width: 760, padding: 30, display: 'flex', alignItems: 'center', gap: 26})}>
      <div style={{width: 96, height: 96, borderRadius: 26, background: LOOP, display: 'grid', placeItems: 'center'}}><svg width="48" height="48" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M6 15h8" /><path d="M10 3.2a4.6 4.6 0 0 0-4.6 4.6v2.4L4 13.2h12l-1.4-3V7.8A4.6 4.6 0 0 0 10 3.2Z" /></svg></div>
      <div style={{flex: 1}}><div style={{fontSize: 36, fontWeight: 700}}>New mention</div><div style={{fontSize: 24, color: C.ink3}}>Construction trade press, today</div></div>
      <Chip size={24} color={C.up} bg="rgba(63,122,38,.12)">● daily</Chip>
    </Card>
    <Card style={abs(1010, 160, {width: 760, padding: '24px 30px'})}>
      <div style={{fontSize: 28, fontWeight: 700, marginBottom: 10}}>Business requests</div>
      {REQUESTS.map((r, i) => (
        <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 0', borderTop: `1px solid ${C.rule}`, background: i === 2 ? 'rgba(0,185,239,.06)' : 'transparent'}}>
          <span style={{width: 44, height: 44, borderRadius: 99, background: i === 2 ? LOOP : C.inset}} />
          <span style={{flex: 1, fontSize: 24, fontWeight: 550}}>{r.n}</span>
          <Chip size={18} color={r.s === 'won' ? '#fff' : C.ink3} bg={r.s === 'won' ? C.teal : C.inset}>{r.s}</Chip>
        </div>
      ))}
    </Card>
    <Card style={abs(1010, 700, {width: 760, height: 280, padding: 30, display: 'flex', alignItems: 'flex-end', gap: 18})}>
      {REQ_MONTHS.map((v, i) => <div key={i} style={{flex: 1, height: `${(v / 24) * 100}%`, borderRadius: 8, background: i === REQ_MONTHS.length - 1 ? `linear-gradient(0deg, ${C.green}, ${C.cyan})` : '#dfe9ea'}} />)}
    </Card>
  </Frame>
);

// 11. Approvals and projects
const K11 = () => {
  const task = (t: string, tag: string, tc: string, w = 420) => (
    <div style={{fontFamily: F.text, color: C.ink, background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 4px 14px -4px rgba(5,60,63,.15)', width: w}}>
      <div style={{fontSize: 22, fontWeight: 650, marginBottom: 12}}>{t}</div>
      <Chip size={16} color={tc} bg={`${tc}1f`}>{tag}</Chip>
    </div>
  );
  return (
    <Frame>
      <div style={abs(150, 100)}><H1 size={96}>Approvals and projects<br /><G>in one place.</G></H1></div>
      <Card style={abs(150, 400, {width: 1040, height: 600, padding: 30, display: 'flex', gap: 24})}>
        {[['To do', 4], ['Done', 4]].map(([n, k], col) => (
          <div key={col} style={{flex: 1, background: C.inset, borderRadius: 22, padding: 18}}>
            <div style={{fontSize: 24, fontWeight: 700, marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center'}}>{n}<span style={{background: C.teal, color: '#fff', borderRadius: 99, padding: '2px 12px', fontSize: 16}}>{k}</span></div>
            <div style={{display: 'grid', gap: 14}}>
              {col === 0 ? <>{task('Approve office tour reel', 'Urgent', '#ab3527', 440)}{task('Brochure copy, page 4', 'Important', '#8f5d18', 440)}</> : <>{task('LinkedIn carousel', 'Done', '#3f7a26', 440)}</>}
            </div>
          </div>
        ))}
      </Card>
      <div style={abs(700, 640, {transform: 'rotate(-4deg)', boxShadow: '0 30px 60px rgba(0,0,0,.35)', borderRadius: 16})}>{task('Site photos for case study', 'Urgent', '#ab3527', 440)}</div>
      <Cursor x={1080} y={720} s={1.4} />
      <Card style={abs(1290, 400, {width: 480, height: 600, padding: 40, textAlign: 'center'})}>
        <div style={{fontSize: 28, fontWeight: 700, textAlign: 'left'}}>Project portfolio</div>
        <svg width="320" height="320" viewBox="0 0 42 42" style={{marginTop: 30}}>
          {(() => {let off = 0; return PORTFOLIO.map((s, i) => {const el = <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={s.c} strokeWidth="6" strokeDasharray={`${s.v - 1} ${101 - s.v}`} strokeDashoffset={25 - off} />; off += s.v; return el;});})()}
          <text x="21" y="22.5" textAnchor="middle" fontFamily="Inter Display" fontWeight="750" fontSize="7" fill={C.ink}>128</text>
          <text x="21" y="27" textAnchor="middle" fontFamily="Inter" fontSize="2.6" fill={C.ink3}>projects</text>
        </svg>
      </Card>
    </Frame>
  );
};

// 12. Bento pull-back
const K12 = () => {
  const tiles: [number, number, number, number, string][] = [
    [0, 0, 1, 1, 'What is working'], [1, 0, 1, 1, 'Site audit'], [2, 0, 2, 1, 'All channels'], [4, 0, 1, 1, 'Time saved'], [5, 0, 1, 1, 'Portfolio'],
    [0, 1, 1, 1, 'PR mentions'], [1, 1, 1, 1, 'Trends'], [2, 1, 2, 1, ''], [4, 1, 2, 1, 'Approvals'],
    [0, 2, 2, 1, 'Competitor report'], [2, 2, 1, 1, 'AI briefing'], [3, 2, 3, 1, 'Business requests'],
  ];
  const cw = 250, ch = 230, gap = 20, ox = (1920 - (6 * cw + 5 * gap)) / 2, oy = 210;
  return (
    <Frame>
      <div style={abs(0, 70, {width: 1920, textAlign: 'center'})}><H1 size={84}>One dashboard for <G>all of it.</G></H1></div>
      {tiles.map(([x, y, w, h, t], i) => (
        <div key={i} style={abs(ox + x * (cw + gap), oy + y * (ch + gap), {width: w * cw + (w - 1) * gap, height: h * ch + (h - 1) * gap, borderRadius: 30, background: t ? '#fff' : LOOP, boxShadow: '0 30px 60px -30px rgba(0,0,0,.6)', padding: 24, fontFamily: F.display, fontSize: 26, fontWeight: 700, color: C.ink, display: 'flex', flexDirection: 'column', justifyContent: t ? 'space-between' : 'center', alignItems: t ? 'stretch' : 'center'})}>
          {t ? (<>{t}<Spark id={`b${i}`} data={[SERIES.a, SERIES.b, SERIES.c][i % 3]} w={w * cw - 48} h={70} color={[C.cyan, C.tealMid, C.green][i % 3]} dot={false} /></>) : (<><Mark size={84} /><div style={{fontSize: 34, marginTop: 10}}>Marketing Dashboard</div></>)}
        </div>
      ))}
    </Frame>
  );
};

// 13. Lockup
const K13 = () => (
  <Frame bg={<AbsoluteFill style={{background: `radial-gradient(1200px 800px at 30% 20%, rgba(127,188,66,.55), transparent 60%), radial-gradient(1200px 900px at 75% 80%, rgba(0,185,239,.6), transparent 60%), ${C.bg}`}} />}>
    <AbsoluteFill style={{display: 'grid', placeItems: 'center', textAlign: 'center'}}>
      <div>
        <Mark size={110} />
        <div style={{fontFamily: F.mono, fontSize: 26, letterSpacing: '.3em', color: C.textOnDark, marginTop: 30}}>ARCHETYPE</div>
        <H1 size={150} style={{marginTop: 10}}>Marketing Dashboard</H1>
        <div style={{fontFamily: F.text, fontSize: 38, color: C.textOnDark, marginTop: 34, opacity: 0.9}}>On the Marketing team site.</div>
        <div style={{fontFamily: F.text, fontSize: 22, color: C.mutedOnDark, marginTop: 70}}>Made by Datdeptrai with ♥</div>
      </div>
    </AbsoluteFill>
  </Frame>
);

export const KEYFRAMES = [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13];
