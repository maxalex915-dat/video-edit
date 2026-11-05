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

// Type rules (Dat, 5 Nov): gradient text only on white; white text only on the gradient;
// text never sits on top of dashboard UI. Every headline has its own clean area.
export const GRAD_TEXT = 'linear-gradient(95deg, #7fbc42 0%, #00b9ef 55%, #45b8ee 100%)';
const H: React.FC<{a: string; b?: string; on: 'white' | 'grad'; size?: number; style?: React.CSSProperties; align?: 'left' | 'center'}> = ({a, b, on, size = 96, style, align = 'left'}) => (
  <div style={{position: 'absolute', fontFamily: F.display, fontWeight: 700, fontSize: size, lineHeight: 1.03, letterSpacing: '-0.04em', textAlign: align, ...style}}>
    <div style={on === 'grad' ? {color: '#fff', textShadow: '0 2px 18px rgba(0,70,90,.28)'} : {color: C.ink}}>{a}</div>
    {b && <div style={on === 'grad' ? {color: '#fff', textShadow: '0 2px 18px rgba(0,70,90,.28)'} : {backgroundImage: GRAD_TEXT, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.06em'}}>{b}</div>}
  </div>
);
const Sub: React.FC<{children: React.ReactNode; on: 'white' | 'grad'; style?: React.CSSProperties}> = ({children, on, style}) => (
  <div style={{position: 'absolute', fontFamily: F.text, fontSize: 32, lineHeight: 1.45, color: on === 'grad' ? 'rgba(255,255,255,.95)' : C.ink2, textShadow: on === 'grad' ? '0 1px 10px rgba(0,70,90,.25)' : 'none', ...style}}>{children}</div>
);
const Eyebrow: React.FC<{children: React.ReactNode; on: 'white' | 'grad'; style?: React.CSSProperties}> = ({children, on, style}) => (
  <div style={{position: 'absolute', fontFamily: F.mono, fontSize: 21, letterSpacing: '.18em', textTransform: 'uppercase', color: on === 'grad' ? '#fff' : C.teal, fontWeight: 500, ...style}}>{children}</div>
);
// callout pill: always a solid white pill, so it reads on anything
const Callout: React.FC<{x: number; y: number; dx: number; dy: number; label: string; line?: string}> = ({x, y, dx, dy, label, line = C.teal}) => (
  <>
    <svg style={{position: 'absolute', left: 0, top: 0}} width="1920" height="1080"><path d={`M${x},${y} L${x + dx},${y + dy}`} stroke={line} strokeWidth="2" /><circle cx={x} cy={y} r="8" fill="#fff" stroke={C.cyan} strokeWidth="3" /></svg>
    <div style={{position: 'absolute', left: x + dx + (dx > 0 ? 10 : -10), top: y + dy - 22, transform: dx < 0 ? 'translateX(-100%)' : 'none', background: '#fff', borderRadius: 99, padding: '10px 20px', fontFamily: F.mono, fontSize: 19, color: C.teal, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 12px 30px -10px rgba(5,60,63,.35)'}}>{label}</div>
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
const Glow: React.FC<{x: number; y: number; r?: number; o?: number}> = ({x, y, r = 520, o = 1}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', opacity: o, filter: 'blur(80px)', background: `conic-gradient(from 200deg, ${C.green}, ${C.cyan}, ${C.sky}, ${C.green})`}} />
);
// a floating white UI card on the gradient (no text over it)
const Float: React.FC<{x: number; y: number; w: number; children: React.ReactNode; tilt?: string}> = ({x, y, w, children, tilt = ''}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, transform: tilt, borderRadius: 28, boxShadow: '0 40px 100px -30px rgba(0,60,80,.5)'}}>{children}</div>
);

// 01  Seven logins. Vivid stage, white type above, cards below
const K1 = () => {
  const ps: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
  return (
    <Frame light="vivid" toward={[960, 760]}>
      <H on="grad" a="Seven platforms." b="Seven logins." size={104} align="center" style={{left: 0, width: 1920, top: 90}} />
      <div style={{position: 'absolute', left: 0, top: 480, width: 1920, height: 600, perspective: 1800}}>
        {ps.map((p, i) => {const k = i - 3, z = -Math.abs(k) * 160; return <div key={p} style={{position: 'absolute', left: 810 + k * 300, top: 40 + Math.abs(k) * 22, transform: `translateZ(${z}px) rotateY(${-k * 9}deg) scale(1.35)`, filter: `blur(${Math.abs(k) * 0.9}px)`}}><LoginField p={p} /></div>;})}
      </div>
    </Frame>
  );
};

// 02  Spreadsheet, macro, right side only; text on white at left
const K2 = () => (
  <Frame light="warm" texture="lines" toward={[1300, 540]}>
    <Shot w={1400} h={700} focus={[600, 230]} at={[1320, 500]} scale={1.9} rx={14} ry={-18} rz={-3} dof={{rx: 380, ry: 200, blur: 6}} fade={{side: 'left', at: 760, soft: 220}}><Spreadsheet /></Shot>
    <Cursor x={1390} y={530} s={1.6} />
    <div style={{position: 'absolute', left: 1330, top: 410, background: C.ink, color: '#fff', borderRadius: 10, padding: '8px 14px', fontFamily: F.mono, fontSize: 18}}>Ctrl + V</div>
    <H on="white" a="Copied by hand." b="Every single week." size={92} style={{left: 110, top: 400}} />
  </Frame>
);

// 03  Reveal: vivid field, white type
const K3 = () => (
  <Frame light="vivid" texture="none" toward={[960, 400]}>
    <AbsoluteFill style={{background: 'radial-gradient(700px 500px at 50% 36%, rgba(255,255,255,.45), transparent 70%)'}} />
    <div style={{position: 'absolute', left: 960 - 90, top: 230, width: 180, height: 180, borderRadius: 52, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -20px rgba(0,60,80,.45)'}}><Mark size={120} /></div>
    <Eyebrow on="grad" style={{left: 0, width: 1920, textAlign: 'center', top: 490, letterSpacing: '.5em'}}>Archetype</Eyebrow>
    <H on="grad" a="Marketing Dashboard" size={140} align="center" style={{left: 0, width: 1920, top: 545}} />
    <Sub on="grad" style={{left: 0, width: 1920, top: 730, textAlign: 'center', fontSize: 36}}>All of our marketing, in one place.</Sub>
  </Frame>
);

// 04  Home: headline band on top, the page rises from below
const K4 = () => (
  <Frame light="cool" toward={[960, 760]}>
    <Glow x={960} y={900} r={620} o={0.55} />
    <H on="white" a="Every channel." b="One screen." size={92} align="center" style={{left: 0, width: 1920, top: 70}} />
    <Shot w={1600} h={1000} focus={[700, 250]} at={[960, 640]} scale={1.15} rx={28} ry={0} dof={{rx: 640, ry: 330, blur: 4}} fade={{side: 'top', at: 300, soft: 80}}><HomeReplica /></Shot>
  </Frame>
);

// 05  Time: vivid, one big white number
const K5 = () => (
  <Frame light="vivid2" toward={[1250, 540]}>
    <svg style={{position: 'absolute', left: 1360 - 470, top: 540 - 470}} width="940" height="940" viewBox="-470 -470 940 940">
      <circle r="440" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
      {Array.from({length: 120}).map((_, i) => {const a = (i / 120) * Math.PI * 2, l = i % 10 ? 10 : 26; return <line key={i} x1={Math.cos(a) * 440} y1={Math.sin(a) * 440} x2={Math.cos(a) * (440 - l)} y2={Math.sin(a) * (440 - l)} stroke={i < 88 ? '#fff' : 'rgba(255,255,255,.35)'} strokeWidth={i % 10 ? 2 : 3} transform="rotate(-90)" />;})}
      <circle r="400" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 400 * 0.73} 9999`} strokeLinecap="round" transform="rotate(-90)" />
    </svg>
    <div style={{position: 'absolute', left: 1360 - 400, width: 800, top: 370, textAlign: 'center'}}>
      <div style={{fontFamily: F.mono, fontSize: 22, letterSpacing: '.16em', color: '#fff'}}>EVERY MORNING, ON ITS OWN</div>
      <div style={{fontFamily: F.display, fontSize: 230, fontWeight: 650, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,70,90,.3)'}}>07:13</div>
      <div style={{display: 'inline-flex', gap: 8, alignItems: 'center', background: '#fff', borderRadius: 99, padding: '10px 20px 10px 12px', boxShadow: '0 16px 40px -14px rgba(0,60,80,.45)'}}>{(['web', 'search', 'li', 'fb', 'ig', 'yt', 'email'] as Platform[]).map((p) => <PlatformIcon key={p} p={p} size={34} />)}<span style={{fontFamily: F.text, fontSize: 18, fontWeight: 650, marginLeft: 6, color: C.ink}}>7 sources updated</span></div>
    </div>
    <H on="grad" a="Updates itself." b="No copy and paste." size={80} style={{left: 110, top: 420}} />
  </Frame>
);

// 06  Website: UI on the left, faded before the text; text on white at right
const K6 = () => (
  <Frame light="sky" toward={[700, 560]}>
    <Shot w={1600} h={1000} focus={[1180, 300]} at={[640, 520]} scale={2.0} rx={10} ry={14} dof={{rx: 380, ry: 120, blur: 5}} fade={{side: 'right', at: 820, soft: 200}}><WebsiteScreen hl={0} /></Shot>
    <H on="white" a="Know who visits," b="and from where." size={88} style={{left: 1180, top: 400}} />
  </Frame>
);

// 07  Search: vivid field, the table floats as a white card below the headline
const K7 = () => (
  <Frame light="vivid" toward={[1100, 700]}>
    <H on="grad" a="See how Google" b="finds us." size={100} style={{left: 110, top: 100}} />
    <Float x={560} y={380} w={1300} tilt="perspective(2200px) rotateX(16deg) rotateY(-10deg)">
      <div style={{height: 760, overflow: 'hidden', borderRadius: 28}}><div style={{transform: 'scale(1.3) translate(-640px, -60px)', transformOrigin: '0 0'}}><SearchScreen hl={0} /></div></div>
    </Float>
    <Callout x={1700} y={540} dx={40} dy={-200} label="rank 3.1" line="#fff" />
  </Frame>
);

// 08  Social: headline on white at top-left, the cards fill the right and bottom
const K8 = () => (
  <Frame light="mint" toward={[1250, 650]}>
    <Shot w={1600} h={1000} focus={[1180, 640]} at={[1280, 680]} scale={1.55} rx={18} ry={-10} rz={-2} dof={{rx: 270, ry: 170, blur: 5}} fade={{side: 'left', at: 780, soft: 200}}><HomeReplica /></Shot>
    <Callout x={1450} y={470} dx={60} dy={-150} label="best this month, +64%" />
    <H on="white" a="See what" b="is working." size={112} style={{left: 110, top: 330}} />
  </Frame>
);

// 09  Email: vivid; the funnel card floats right, white text left
const K9 = () => (
  <Frame light="vivid2" toward={[1300, 540]}>
    <Float x={880} y={170} w={900} tilt="perspective(2200px) rotateY(-14deg) rotateX(4deg)">
      <div style={{height: 740, overflow: 'hidden', borderRadius: 28}}><div style={{transform: 'scale(1.7) translate(-890px, -175px)', transformOrigin: '0 0'}}><EmailScreen /></div></div>
    </Float>
    <H on="grad" a="Every campaign," b="measured." size={104} style={{left: 110, top: 380}} />
  </Frame>
);

// 10  The weekly briefing writes itself, on white
const K10 = () => (
  <Frame light="cool" texture="none">
    <Glow x={960} y={560} r={600} o={0.4} />
    <H on="white" a="Your week," b="written for you." size={84} align="center" style={{left: 0, width: 1920, top: 70}} />
    <div style={{position: 'absolute', left: 310, top: 340, boxShadow: '0 40px 100px -40px rgba(5,60,63,.45)', borderRadius: 26}}><InsightsScreen typed={0.86} /></div>
  </Frame>
);

// 11  Site audit: vivid; gauge card floats left, white text right
const K11 = () => (
  <Frame light="vivid" toward={[650, 540]}>
    <Float x={110} y={170} w={860} tilt="perspective(2200px) rotateY(14deg) rotateX(4deg)">
      <div style={{height: 760, overflow: 'hidden', borderRadius: 28}}><div style={{transform: 'scale(1.1) translate(-10px, -40px)', transformOrigin: '0 0'}}><SiteHealthScreen done={2} /></div></div>
    </Float>
    <H on="grad" a="Your website," b="checked in-house." size={92} style={{left: 1100, top: 340}} />
    <Sub on="grad" style={{left: 1104, top: 560}}>118 checks, every two weeks.<br />Fixes ranked by impact.</Sub>
  </Frame>
);

// 12  Competitor report: pages on the right, text on white left
const K12 = () => (
  <Frame light="warm" toward={[1350, 560]}>
    <Shot w={900} h={1270} focus={[450, 560]} at={[1700, 560]} scale={0.82} rx={18} ry={-24} rz={4} dof={{rx: 600, ry: 700, blur: 8}} fade={{side: 'left', at: 960, soft: 160}}><ReportPage title="Country offices" /></Shot>
    <Shot w={900} h={1270} focus={[450, 640]} at={[1330, 600]} scale={1.0} rx={14} ry={-14} rz={-3} dof={{rx: 470, ry: 300, blur: 6}} fade={{side: 'left', at: 960, soft: 160}}><ReportPage /></Shot>
    <H on="white" a="Competitor moves," b="every month." size={84} style={{left: 110, top: 360}} />
    <Sub on="white" style={{left: 114, top: 580}}>Researched, checked and<br />emailed as a PDF.</Sub>
  </Frame>
);

// 13  22 offices on a white-line globe
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
        <radialGradient id="gb" cx="38%" cy="32%"><stop offset="0" stopColor="#ffffff" stopOpacity=".28" /><stop offset="1" stopColor="#ffffff" stopOpacity=".06" /></radialGradient>
        <linearGradient id="ga"><stop offset="0" stopColor={C.green} /><stop offset="1" stopColor={C.cyan} /></linearGradient>
      </defs>
      <circle r={R} fill="url(#gb)" stroke="rgba(255,255,255,.85)" strokeWidth="2" />
      {grat.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1.2" />)}
      {OFF.map(([n, la, lo]) => {
        const p = proj(la, lo, lat0, lon0, R);
        if (p.vis <= 0.02) return null;
        const mx = (p.x + vn.x) / 2, my = (p.y + vn.y) / 2 - Math.hypot(p.x - vn.x, p.y - vn.y) * 0.3;
        const lab = labels.includes(n);
        return (
          <g key={n}>
            {n !== 'Vietnam' && arcs > 0 && <path d={`M${p.x},${p.y} Q${mx},${my} ${vn.x},${vn.y}`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeDasharray={`${arcs * 700} 3000`} opacity=".8" />}
            <circle cx={p.x} cy={p.y} r={n === 'Vietnam' ? 9 : 5.5} fill={n === 'Vietnam' ? C.teal : '#fff'} stroke="#fff" strokeWidth="2.5" />
            {lab && <text x={p.x + 12} y={p.y + 5} fontFamily="Inter" fontSize="19" fontWeight="650" fill="#fff">{n}</text>}
          </g>
        );
      })}
    </svg>
  );
};
const K13 = () => (
  <Frame light="vivid2" toward={[1250, 540]}>
    <div style={{position: 'absolute', left: 1280 - 480 - 300, top: 540 - 480 - 100}}><Globe lon0={70} R={480} labels={['France', 'UAE', 'India', 'Vietnam', 'Singapore', 'Kazakhstan', 'Morocco', 'Indonesia', 'Mongolia']} /></div>
    <H on="grad" a="22 offices." b="Every local competitor." size={92} style={{left: 110, top: 400}} />
  </Frame>
);

// 14  Shared in one link: text on white top-left, panel and report bottom-right
const K14 = () => (
  <Frame light="cool" texture="lines" toward={[1250, 650]}>
    <Glow x={1400} y={700} r={520} o={0.45} />
    <Shot w={900} h={1270} focus={[450, 500]} at={[1450, 560]} scale={0.85} rx={10} ry={-28} rz={3} dof={null} fade={{side: 'top', at: 300, soft: 120}}><ReportPage /></Shot>
    <div style={{position: 'absolute', left: 760, top: 470, transform: 'perspective(2000px) rotateY(-10deg) rotateX(6deg) scale(1.3)', transformOrigin: 'top left'}}><SharePanel /></div>
    <Cursor x={1620} y={830} />
    <H on="white" a="Emailed to leadership." b="Shared in one link." size={84} style={{left: 110, top: 90}} />
  </Frame>
);

// 15  PR: vivid; white text on top, feed card floats below
const K15 = () => (
  <Frame light="vivid" toward={[960, 760]}>
    <H on="grad" a="Every mention," b="found daily." size={100} style={{left: 110, top: 90}} />
    <Float x={560} y={360} w={1300} tilt="perspective(2200px) rotateX(18deg) rotateZ(-2deg)">
      <div style={{height: 780, overflow: 'hidden', borderRadius: 28}}><div style={{transform: 'scale(1.25) translate(-30px, -20px)', transformOrigin: '0 0'}}><MentionsScreen /></div></div>
    </Float>
  </Frame>
);

// 16  Inquiries: text on white left, chart right
const K16 = () => (
  <Frame light="sky" toward={[1350, 520]}>
    <Shot w={1600} h={1000} focus={[1400, 330]} at={[1400, 520]} scale={1.45} rx={10} ry={-14} dof={{rx: 330, ry: 330, blur: 5}} fade={{side: 'left', at: 760, soft: 200}}><InquiriesScreen /></Shot>
    <H on="white" a="Every request," b="logged and counted." size={84} style={{left: 110, top: 400}} />
  </Frame>
);

// 17  Approvals: vivid; board floats right, white text left
const K17 = () => (
  <Frame light="vivid2" toward={[1250, 560]}>
    <Float x={760} y={200} w={1100} tilt="perspective(2200px) rotateY(-12deg) rotateX(6deg)">
      <div style={{height: 720, overflow: 'hidden', borderRadius: 28}}><div style={{transform: 'scale(1.05)', transformOrigin: '0 0'}}><BoardScreen /></div></div>
    </Float>
    <div style={{position: 'absolute', left: 1080, top: 420, width: 380, transform: 'rotate(-4deg)', background: '#fff', borderRadius: 18, padding: '20px 22px', fontFamily: F.text, boxShadow: '0 40px 70px -20px rgba(0,50,70,.5)'}}>
      <div style={{fontSize: 20, fontWeight: 650, color: C.ink, marginBottom: 12}}>Site photos for case study</div><span style={{fontSize: 15, fontWeight: 650, color: '#ab3527', background: '#ab352718', borderRadius: 99, padding: '4px 12px'}}>Urgent</span>
    </div>
    <Cursor x={1390} y={490} />
    <H on="grad" a="Approvals and" b="projects, together." size={88} style={{left: 110, top: 400}} />
  </Frame>
);

// 18  Your bento on the vivid field, white headline above it
const K18 = () => (
  <Frame light="vivid" toward={[960, 640]}>
    <H on="grad" a="One dashboard for all of it." size={72} align="center" style={{left: 0, width: 1920, top: 46}} />
    <div style={{position: 'absolute', left: 960 - 1000 * 0.78, top: 175, transform: 'scale(.78)', transformOrigin: '0 0', borderRadius: 34, overflow: 'hidden', boxShadow: '0 50px 120px -30px rgba(0,50,70,.55)'}}><Bento /></div>
  </Frame>
);

// 19  Lockup on white, gradient name
const K19 = () => (
  <Frame light="cool" texture="none">
    <Glow x={960} y={330} r={360} o={0.5} />
    <div style={{position: 'absolute', left: 960 - 80, top: 250, width: 160, height: 160, borderRadius: 46, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -30px rgba(5,60,63,.45)'}}><Mark size={106} /></div>
    <Eyebrow on="white" style={{left: 0, width: 1920, textAlign: 'center', top: 480, letterSpacing: '.5em'}}>Archetype</Eyebrow>
    <H on="white" a="Marketing" b="Dashboard" size={120} align="center" style={{left: 0, width: 1920, top: 530}} />
    <div style={{position: 'absolute', left: 0, width: 1920, top: 830, textAlign: 'center'}}><span style={{display: 'inline-block', background: `linear-gradient(95deg, #7fbc42, #00b9ef 55%, #70cbf3)`, color: '#fff', borderRadius: 99, padding: '16px 40px', fontFamily: F.text, fontSize: 30, fontWeight: 650, textShadow: '0 1px 6px rgba(0,70,90,.35)'}}>On the Marketing team site</span></div>
    <div style={{position: 'absolute', left: 0, width: 1920, top: 990, textAlign: 'center', fontFamily: F.text, fontSize: 20, color: C.ink3}}>Made by Datdeptrai with ♥</div>
  </Frame>
);

export const KEYFRAMES = [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18, K19];
