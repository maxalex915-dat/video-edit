import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Grain} from '../components/kit/Backdrop';
import {Light, LightKind, Shot} from '../components/kit/Shot';
import {Mark, PlatformIcon, Platform} from '../components/ui/Primitives';
import {HomeReplica} from '../components/ui/HomeReplica';
import {Bento} from '../components/ui/Bento';
import {BoardScreen, EmailScreen, InquiriesScreen, InsightsScreen, LoginField, MentionsScreen, ReportPage, SearchScreen, SharePanel, SiteHealthScreen, Spreadsheet, WebsiteScreen} from '../components/ui/Screens';
import {C} from '../theme/tokens';
import {F} from '../theme/fonts';

// ── type: ink headline, second line in grey. Gradient words are rare. ──
const H: React.FC<{a: string; b?: string; size?: number; style?: React.CSSProperties; align?: 'left' | 'center'; grad?: boolean}> = ({a, b, size = 92, style, align = 'left', grad}) => (
  <div style={{position: 'absolute', fontFamily: F.display, fontWeight: 650, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.04em', textAlign: align, ...style}}>
    <div style={{color: C.ink}}>{a}</div>
    {b && <div style={grad ? {backgroundImage: 'linear-gradient(95deg, #4f9a26, #0098cc 70%)', WebkitBackgroundClip: 'text', color: 'transparent'} : {color: '#8a9ba0'}}>{b}</div>}
  </div>
);
const Eyebrow: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{position: 'absolute', fontFamily: F.mono, fontSize: 20, letterSpacing: '.16em', textTransform: 'uppercase', color: C.teal, fontWeight: 500, ...style}}>{children}</div>
);
// HUD callout: dot on the UI, hairline leader, mono label
const Callout: React.FC<{x: number; y: number; dx: number; dy: number; label: string}> = ({x, y, dx, dy, label}) => (
  <>
    <svg style={{position: 'absolute', left: 0, top: 0}} width="1920" height="1080"><path d={`M${x},${y} L${x + dx},${y + dy}`} stroke={C.teal} strokeWidth="1.5" /><circle cx={x} cy={y} r="7" fill="#fff" stroke={C.teal} strokeWidth="2" /></svg>
    <div style={{position: 'absolute', left: x + dx + (dx > 0 ? 10 : -10), top: y + dy - 18, transform: dx < 0 ? 'translateX(-100%)' : 'none', background: '#fff', border: `1px solid ${C.rule}`, borderRadius: 99, padding: '8px 16px', fontFamily: F.mono, fontSize: 17, color: C.teal, whiteSpace: 'nowrap', boxShadow: '0 10px 30px -12px rgba(5,60,63,.3)'}}>{label}</div>
  </>
);
const Frame: React.FC<{children: React.ReactNode; light: LightKind; toward?: [number, number]; texture?: 'dots' | 'lines' | 'none'}> = ({children, light, toward, texture}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    <Light kind={light} toward={toward} texture={texture} t={90} />
    {children}
    <Grain opacity={0.025} />
  </AbsoluteFill>
);
const Cursor: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1.3}) => (
  <svg style={{position: 'absolute', left: x, top: y, transform: `scale(${s})`, transformOrigin: 'top left', filter: 'drop-shadow(0 4px 6px rgba(5,40,44,.25))'}} width="22" height="28" viewBox="0 0 20 24"><path d="M2 1.5v18l5-4.6 3.2 7.2 3-1.3-3.1-7h6.6z" fill="#10242a" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
);
const Bloom: React.FC<{x: number; y: number; r?: number; o?: number}> = ({x, y, r = 520, o = 1}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', opacity: o, filter: 'blur(90px)', background: `conic-gradient(from 200deg, ${C.green}, ${C.cyan}, ${C.sky}, ${C.green})`}} />
);

// 01  Seven logins, an arc of real sign-in cards
const K1 = () => {
  const ps: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
  return (
    <Frame light="pearl" toward={[960, 700]}>
      <H a="Seven platforms." b="Seven logins." size={100} align="center" style={{left: 0, width: 1920, top: 110}} />
      <div style={{position: 'absolute', left: 0, top: 470, width: 1920, height: 560, perspective: 1800}}>
        {ps.map((p, i) => {
          const k = i - 3, z = -Math.abs(k) * 160;
          return <div key={p} style={{position: 'absolute', left: 810 + k * 300, top: 40 + Math.abs(k) * 22, transform: `translateZ(${z}px) rotateY(${-k * 9}deg) scale(1.35)`, filter: `blur(${Math.abs(k) * 0.9}px)`, opacity: 1 - Math.abs(k) * 0.08}}><LoginField p={p} /></div>;
        })}
      </div>
    </Frame>
  );
};

// 02  The old spreadsheet, macro, one cell in focus
const K2 = () => (
  <Frame light="warm" texture="lines" toward={[1150, 450]}>
    <Shot w={1400} h={700} focus={[600, 230]} at={[1180, 470]} scale={1.9} rx={14} ry={-18} rz={-3} dof={{rx: 380, ry: 200, blur: 6}}><Spreadsheet /></Shot>
    <Cursor x={1250} y={500} s={1.6} />
    <div style={{position: 'absolute', left: 1190, top: 380, background: C.ink, color: '#fff', borderRadius: 10, padding: '8px 14px', fontFamily: F.mono, fontSize: 18}}>Ctrl + V</div>
    <H a="Copied by hand." b="Every single week." size={96} style={{left: 110, top: 720}} />
  </Frame>
);

// 03  Reveal: brand light blooms behind the mark
const K3 = () => (
  <Frame light="cool" texture="none">
    <Bloom x={960} y={430} r={460} o={0.55} />
    <div style={{position: 'absolute', left: 960 - 85, top: 260, width: 170, height: 170, borderRadius: 48, background: 'rgba(255,255,255,.92)', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -30px rgba(5,60,63,.4), inset 0 1px 0 #fff'}}><Mark size={112} /></div>
    <Eyebrow style={{left: 0, width: 1920, textAlign: 'center', top: 500, letterSpacing: '.5em'}}>Archetype</Eyebrow>
    <H a="Marketing Dashboard" size={136} align="center" style={{left: 0, width: 1920, top: 560}} />
    <div style={{position: 'absolute', left: 0, width: 1920, top: 740, textAlign: 'center', fontFamily: F.text, fontSize: 34, color: C.ink3}}>All of our marketing, in one place.</div>
  </Frame>
);

// 04  Home: camera drifts over the real page, hero card in focus
const K4 = () => (
  <Frame light="cool" toward={[1200, 600]}>
    <Shot w={1600} h={1000} focus={[700, 250]} at={[1150, 560]} scale={1.3} rx={16} ry={-12} rz={-2} dof={{rx: 640, ry: 330, blur: 5}}><HomeReplica /></Shot>
    <H a="Every channel." b="One screen." size={92} style={{left: 110, top: 90}} />
  </Frame>
);

// 05  Time: one number does the talking
const K5 = () => (
  <Frame light="mint" toward={[1250, 540]}>
    <svg style={{position: 'absolute', left: 1250 - 470, top: 540 - 470}} width="940" height="940" viewBox="-470 -470 940 940">
      <circle r="440" fill="none" stroke="rgba(5,94,99,.12)" strokeWidth="1.5" />
      {Array.from({length: 120}).map((_, i) => {const a = (i / 120) * Math.PI * 2, l = i % 10 ? 10 : 26; return <line key={i} x1={Math.cos(a) * 440} y1={Math.sin(a) * 440} x2={Math.cos(a) * (440 - l)} y2={Math.sin(a) * (440 - l)} stroke={i < 88 ? C.teal : 'rgba(5,94,99,.2)'} strokeWidth={i % 10 ? 1.5 : 2.5} transform="rotate(-90)" />;})}
      <defs><linearGradient id="arc5"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient></defs>
      <circle r="400" fill="none" stroke="url(#arc5)" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 400 * 0.73} 9999`} strokeLinecap="round" transform="rotate(-90)" />
    </svg>
    <div style={{position: 'absolute', left: 1250 - 400, width: 800, top: 380, textAlign: 'center'}}>
      <div style={{fontFamily: F.mono, fontSize: 22, letterSpacing: '.16em', color: C.teal}}>EVERY MORNING, ON ITS OWN</div>
      <div style={{fontFamily: F.display, fontSize: 230, fontWeight: 600, letterSpacing: '-0.05em', color: C.ink, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums'}}>07:13</div>
      <div style={{display: 'inline-flex', gap: 8, alignItems: 'center', background: '#fff', border: `1px solid ${C.rule}`, borderRadius: 99, padding: '10px 18px 10px 12px', boxShadow: '0 12px 30px -16px rgba(5,60,63,.3)'}}>{(['web', 'search', 'li', 'fb', 'ig', 'yt', 'email'] as Platform[]).map((p) => <PlatformIcon key={p} p={p} size={34} />)}<span style={{fontFamily: F.text, fontSize: 18, fontWeight: 600, marginLeft: 6, color: C.ink}}>7 sources updated</span></div>
    </div>
    <H a="Updates itself." b="No copy and paste." size={92} style={{left: 110, top: 400}} />
  </Frame>
);

// 06  Website: punch-in on the city table
const K6 = () => (
  <Frame light="sky" toward={[1000, 560]}>
    <Shot w={1600} h={1000} focus={[1180, 300]} at={[1060, 520]} scale={2.1} rx={10} ry={-16} dof={{rx: 380, ry: 120, blur: 6}}><WebsiteScreen hl={0} /></Shot>
    <Callout x={1500} y={520} dx={90} dy={-150} label="top city this month" />
    <H a="Know who visits," b="and from where." size={88} style={{left: 110, top: 780}} />
  </Frame>
);

// 07  Search: the top search, ranked, sharp; the rest falls away
const K7 = () => (
  <Frame light="pearl" texture="lines" toward={[1150, 450]}>
    <Shot w={1600} h={1000} focus={[1100, 300]} at={[1060, 560]} scale={1.75} rx={16} ry={6} rz={2} dof={{rx: 520, ry: 120, blur: 6}}><SearchScreen hl={0} /></Shot>
    <Callout x={1560} y={545} dx={60} dy={-190} label="rank 3.1" />
    <H a="See how Google" b="finds us." size={96} style={{left: 110, top: 110}} />
  </Frame>
);

// 08  Social: every platform side by side, the best one lifts
const K8 = () => (
  <Frame light="mint" toward={[1100, 600]}>
    <Shot w={1600} h={1000} focus={[1180, 640]} at={[1220, 640]} scale={1.6} rx={18} ry={-10} rz={-2} dof={{rx: 260, ry: 170, blur: 6}}><HomeReplica /></Shot>
    <Callout x={1340} y={410} dx={80} dy={-130} label="best this month, +64%" />
    <H a="See what" b="is working." size={110} style={{left: 110, top: 110}} grad />
  </Frame>
);

// 09  Email: the funnel, opened bar in focus
const K9 = () => (
  <Frame light="sky" texture="lines" toward={[1150, 520]}>
    <Shot w={1600} h={1000} focus={[1230, 400]} at={[1180, 600]} scale={1.6} rx={8} ry={-18} dof={{rx: 420, ry: 260, blur: 6}}><EmailScreen /></Shot>
    <H a="Every campaign," b="measured." size={100} style={{left: 110, top: 110}} />
  </Frame>
);

// 10  The weekly briefing writes itself
const K10 = () => (
  <Frame light="cool" texture="none">
    <Bloom x={1500} y={300} r={420} o={0.35} />
    <Eyebrow style={{left: 310, top: 170}}>Insights · every Monday</Eyebrow>
    <div style={{position: 'absolute', left: 310, top: 240, boxShadow: '0 40px 100px -40px rgba(5,60,63,.35)', borderRadius: 26}}><InsightsScreen typed={0.86} /></div>
    <H a="Your week, written for you." size={72} style={{left: 310, top: 870}} />
  </Frame>
);

// 11  Site audit: gauge macro
const K11 = () => (
  <Frame light="pearl" toward={[700, 500]}>
    <Shot w={1600} h={1000} focus={[420, 330]} at={[620, 500]} scale={1.7} rx={10} ry={16} rz={1} dof={{rx: 420, ry: 300, blur: 6}}><SiteHealthScreen done={2} /></Shot>
    <H a="Your website," b="checked in-house." size={96} style={{left: 1080, top: 120}} />
    <div style={{position: 'absolute', left: 1084, top: 360, fontFamily: F.text, fontSize: 30, color: C.ink3, lineHeight: 1.45}}>118 checks. Every two weeks.<br />Fixes ranked by impact.</div>
  </Frame>
);

// 12  Competitor report: two pages, one in focus
const K12 = () => (
  <Frame light="warm" toward={[1250, 560]}>
    <Shot w={900} h={1270} focus={[450, 560]} at={[1660, 560]} scale={0.85} rx={18} ry={-24} rz={4} dof={{rx: 600, ry: 700, blur: 8}} shadow><ReportPage title="Country offices" /></Shot>
    <Shot w={900} h={1270} focus={[450, 640]} at={[1280, 620]} scale={1.05} rx={14} ry={-14} rz={-3} dof={{rx: 470, ry: 300, blur: 6}}><ReportPage /></Shot>
    <H a="Competitor moves," b="every month." size={96} style={{left: 110, top: 110}} />
    <div style={{position: 'absolute', left: 114, top: 340, fontFamily: F.text, fontSize: 30, color: C.ink3, lineHeight: 1.45}}>Researched, checked and<br />emailed as a PDF.</div>
  </Frame>
);

// 13  22 offices on a hairline globe
const OFF: [string, number, number][] = [
  ['France', 46.6, 2.2], ['Ivory Coast', 7.5, -5.5], ['Tunisia', 34, 9], ['Morocco', 31.8, -7.1], ['UAE', 24, 54], ['USA', 39, -98], ['Brazil', -14, -51], ['Mexico', 23, -102],
  ['Bangladesh', 23.7, 90.4], ['Cambodia', 12.6, 105], ['China', 35, 104], ['India', 21, 78], ['Indonesia', -2.5, 118], ['Laos', 19.9, 102.5], ['Kazakhstan', 48, 67], ['Malaysia', 4.2, 102],
  ['Myanmar', 21.9, 96], ['Mongolia', 46.9, 103.8], ['Philippines', 12.9, 121.8], ['Singapore', 1.35, 103.8], ['Thailand', 15.9, 101], ['Vietnam', 14, 108.3],
];
const proj = (lat: number, lon: number, lat0: number, lon0: number, R: number) => {
  const r = Math.PI / 180, p = lat * r, l = (lon - lon0) * r, p0 = lat0 * r;
  return {x: R * Math.cos(p) * Math.sin(l), y: -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), vis: Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)};
};
export const Globe: React.FC<{lon0: number; lat0?: number; R: number; arcs?: number; labels?: string[]}> = ({lon0, lat0 = 20, R, arcs = 1, labels = []}) => {
  const path = (pts: {x: number; y: number; vis: number}[]) => {let d = '', pen = false; for (const p of pts) {if (p.vis > 0) {d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)} `; pen = true;} else pen = false;} return d;};
  const grat: string[] = [];
  for (let lat = -75; lat <= 75; lat += 15) grat.push(path(Array.from({length: 91}, (_, i) => proj(lat, -180 + i * 4, lat0, lon0, R))));
  for (let lon = -180; lon < 180; lon += 15) grat.push(path(Array.from({length: 44}, (_, i) => proj(-86 + i * 4, lon, lat0, lon0, R))));
  const vn = proj(14, 108.3, lat0, lon0, R);
  return (
    <svg width={R * 2 + 600} height={R * 2 + 200} viewBox={`${-R - 300} ${-R - 100} ${R * 2 + 600} ${R * 2 + 200}`}>
      <defs>
        <radialGradient id="gb" cx="38%" cy="32%"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e6f3f6" /></radialGradient>
        <linearGradient id="ga"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient>
      </defs>
      <circle r={R} fill="url(#gb)" stroke="rgba(5,94,99,.25)" strokeWidth="1.5" />
      {grat.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(5,94,99,.12)" strokeWidth="1" />)}
      {OFF.map(([n, la, lo]) => {
        const p = proj(la, lo, lat0, lon0, R);
        if (p.vis <= 0.02) return null;
        const mx = (p.x + vn.x) / 2, my = (p.y + vn.y) / 2 - Math.hypot(p.x - vn.x, p.y - vn.y) * 0.3;
        const lab = labels.includes(n);
        return (
          <g key={n}>
            {n !== 'Vietnam' && arcs > 0 && <path d={`M${p.x},${p.y} Q${mx},${my} ${vn.x},${vn.y}`} fill="none" stroke="url(#ga)" strokeWidth="1.8" strokeDasharray={`${arcs * 700} 3000`} opacity=".8" />}
            <circle cx={p.x} cy={p.y} r={n === 'Vietnam' ? 9 : 5.5} fill={n === 'Vietnam' ? C.teal : '#fff'} stroke={C.teal} strokeWidth="2.5" />
            {lab && <text x={p.x + 12} y={p.y + 5} fontFamily="Inter" fontSize="17" fontWeight="600" fill={C.ink}>{n}</text>}
          </g>
        );
      })}
    </svg>
  );
};
const K13 = () => (
  <Frame light="sky" toward={[1250, 540]}>
    <div style={{position: 'absolute', left: 1250 - 480 - 300, top: 540 - 480 - 100}}><Globe lon0={70} R={480} labels={['France', 'UAE', 'India', 'Vietnam', 'Singapore', 'Kazakhstan', 'Morocco', 'Indonesia', 'Mongolia']} /></div>
    <H a="22 offices." b="Every local competitor." size={96} style={{left: 110, top: 380}} />
  </Frame>
);

// 14  Shared in one link, the report behind it
const K14 = () => (
  <Frame light="cool" texture="lines" toward={[1150, 600]}>
    <Shot w={900} h={1270} focus={[450, 500]} at={[1320, 520]} scale={0.9} rx={10} ry={-28} rz={3} dof={{rx: 10, ry: 10, blur: 5}}><ReportPage /></Shot>
    <div style={{position: 'absolute', left: 700, top: 470, transform: 'perspective(2000px) rotateY(-10deg) rotateX(6deg) scale(1.3)', transformOrigin: 'top left'}}><SharePanel /></div>
    <Cursor x={1600} y={830} />
    <H a="Emailed to leadership." b="Shared in one link." size={88} style={{left: 110, top: 110}} />
  </Frame>
);

// 15  PR: the newest mention lights up at the top of the feed
const K15 = () => (
  <Frame light="mint" texture="lines" toward={[1100, 400]}>
    <Shot w={1600} h={1000} focus={[800, 140]} at={[1000, 520]} scale={1.5} rx={14} ry={-8} dof={{rx: 860, ry: 120, blur: 6}}><MentionsScreen /></Shot>
    <H a="Every mention," b="found daily." size={100} style={{left: 110, top: 110}} />
  </Frame>
);

// 16  Inquiries: the month's total, in focus
const K16 = () => (
  <Frame light="sky" toward={[1350, 500]}>
    <Shot w={1600} h={1000} focus={[1400, 330]} at={[1300, 520]} scale={1.5} rx={10} ry={-14} dof={{rx: 330, ry: 330, blur: 6}}><InquiriesScreen /></Shot>
    <H a="Every request," b="logged and counted." size={88} style={{left: 110, top: 110}} />
  </Frame>
);

// 17  Approvals: a card lifted mid-drag
const K17 = () => (
  <Frame light="pearl" toward={[900, 540]}>
    <Shot w={1600} h={1000} focus={[560, 330]} at={[900, 560]} scale={1.45} rx={14} ry={12} rz={-2} dof={{rx: 560, ry: 380, blur: 5}}><BoardScreen /></Shot>
    <div style={{position: 'absolute', left: 900, top: 470, width: 380, transform: 'rotate(-4deg)', background: '#fff', borderRadius: 18, border: `1px solid ${C.rule}`, padding: '20px 22px', fontFamily: F.text, boxShadow: '0 40px 70px -20px rgba(5,60,63,.35)'}}>
      <div style={{fontSize: 20, fontWeight: 650, color: C.ink, marginBottom: 12}}>Site photos for case study</div><span style={{fontSize: 15, fontWeight: 650, color: '#ab3527', background: '#ab352718', borderRadius: 99, padding: '4px 12px'}}>Urgent</span>
    </div>
    <Cursor x={1210} y={540} />
    <H a="Approvals and projects," b="in one place." size={84} style={{left: 110, top: 90}} />
  </Frame>
);

// 18  Your bento, settling into place
const K18 = () => (
  <Frame light="pearl" toward={[960, 600]}>
    <Shot w={2000} h={1125} focus={[1000, 560]} at={[960, 600]} scale={0.74} rx={14} rz={-2} dof={null}><Bento /></Shot>
    <H a="One dashboard for all of it." size={68} align="center" style={{left: 0, width: 1920, top: 50}} />
  </Frame>
);

// 19  Lockup
const K19 = () => (
  <Frame light="cool" texture="none">
    <Bloom x={960} y={540} r={560} o={0.45} />
    <div style={{position: 'absolute', left: 960 - 75, top: 230, width: 150, height: 150, borderRadius: 42, background: 'rgba(255,255,255,.94)', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -30px rgba(5,60,63,.4)'}}><Mark size={100} /></div>
    <Eyebrow style={{left: 0, width: 1920, textAlign: 'center', top: 440, letterSpacing: '.5em'}}>Archetype</Eyebrow>
    <H a="Marketing Dashboard" size={128} align="center" style={{left: 0, width: 1920, top: 490}} />
    <div style={{position: 'absolute', left: 0, width: 1920, top: 680, textAlign: 'center'}}><span style={{display: 'inline-block', background: C.ink, color: '#fff', borderRadius: 99, padding: '16px 36px', fontFamily: F.text, fontSize: 30, fontWeight: 600}}>On the Marketing team site</span></div>
    <div style={{position: 'absolute', left: 0, width: 1920, top: 960, textAlign: 'center', fontFamily: F.text, fontSize: 20, color: C.ink3}}>Made by Datdeptrai with ♥</div>
  </Frame>
);

export const KEYFRAMES = [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18, K19];
