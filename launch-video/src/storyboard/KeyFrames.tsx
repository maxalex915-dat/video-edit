import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, GradKind, textOn} from '../components/kit/Gradients';
import {Shot} from '../components/kit/Shot';
import {Mark, PlatformIcon, Platform} from '../components/ui/Primitives';
import {HomeReplica} from '../components/ui/HomeReplica';
import {Bento} from '../components/ui/Bento';
import {BoardScreen, EmailScreen, InquiriesScreen, InsightsScreen, LoginField, MentionsScreen, ReportPage, SearchScreen, SharePanel, SiteHealthScreen, Spreadsheet, WebsiteScreen, Gauge} from '../components/ui/Screens';
import {C} from '../theme/tokens';
import {F} from '../theme/fonts';

// Rules (Dat, 5 Nov): gradient text only on white; white text only on gradient or dark;
// text never on top of dashboard UI; copy says the value, not the mechanism.
export const GRAD_TEXT = 'linear-gradient(95deg, #7fbc42 0%, #00b9ef 55%, #45b8ee 100%)';
type On = 'white' | 'grad';
const H: React.FC<{a: string; b?: string; on: On; size?: number; style?: React.CSSProperties; align?: 'left' | 'center'}> = ({a, b, on, size = 96, style, align = 'left'}) => (
  <div style={{position: 'absolute', fontFamily: F.display, fontWeight: 700, fontSize: size, lineHeight: 1.03, letterSpacing: '-0.04em', textAlign: align, ...style}}>
    <div style={on === 'grad' ? {color: '#fff', textShadow: '0 2px 18px rgba(0,50,70,.3)'} : {color: C.ink}}>{a}</div>
    {b && <div style={on === 'grad' ? {color: 'rgba(255,255,255,.92)', textShadow: '0 2px 18px rgba(0,50,70,.3)'} : {backgroundImage: GRAD_TEXT, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.06em'}}>{b}</div>}
  </div>
);
const Frame: React.FC<{children: React.ReactNode; g: GradKind}> = ({children, g}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}><Ground kind={g} t={90} />{children}</AbsoluteFill>
);
// ── interaction props ──
const Cursor: React.FC<{x: number; y: number; s?: number; hand?: boolean}> = ({x, y, s = 1.5}) => (
  <svg style={{position: 'absolute', left: x, top: y, transform: `scale(${s})`, transformOrigin: 'top left', filter: 'drop-shadow(0 4px 6px rgba(5,40,44,.3))', zIndex: 10}} width="22" height="28" viewBox="0 0 20 24"><path d="M2 1.5v18l5-4.6 3.2 7.2 3-1.3-3.1-7h6.6z" fill="#10242a" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
);
const Ripple: React.FC<{x: number; y: number}> = ({x, y}) => (
  <>{[34, 56].map((r, i) => <div key={r} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${3 - i}px solid ${C.cyan}`, opacity: 0.8 - i * 0.35, zIndex: 9}} />)}</>
);
const Tip: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -100%)', background: C.ink, color: '#fff', borderRadius: 12, padding: '10px 16px', fontFamily: F.text, fontSize: 19, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 14px 30px -10px rgba(0,30,40,.5)', zIndex: 11}}>{children}<div style={{position: 'absolute', left: '50%', bottom: -7, marginLeft: -7, width: 14, height: 14, background: C.ink, transform: 'rotate(45deg)'}} /></div>
);
const Toast: React.FC<{x: number; y: number; title: string; sub: string; icon?: React.ReactNode}> = ({x, y, title, sub, icon}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 520, display: 'flex', gap: 16, alignItems: 'center', background: '#fff', borderRadius: 22, padding: '18px 22px', fontFamily: F.text, boxShadow: '0 30px 70px -20px rgba(0,40,60,.5)', zIndex: 12}}>
    <div style={{width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#7fbc42,#00b9ef 45%,#70cbf3)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 26}}>{icon ?? '✓'}</div>
    <div><div style={{fontSize: 20, fontWeight: 700, color: C.ink}}>{title}</div><div style={{fontSize: 16, color: C.ink3, marginTop: 2}}>{sub}</div></div>
  </div>
);
const Float: React.FC<{x: number; y: number; w: number; h: number; tilt?: string; children: React.ReactNode; inner: string}> = ({x, y, w, h, tilt = '', children, inner}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: tilt, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(0,40,60,.55)', background: '#fff'}}><div style={{transform: inner, transformOrigin: '0 0'}}>{children}</div></div>
);

// 01  spot: seven logins, one failing
const K1 = () => {
  const ps: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
  return (
    <Frame g="spot">
      <H on="grad" a="Seven platforms." b="Seven logins. Every week." size={96} align="center" style={{left: 0, width: 1920, top: 90}} />
      <div style={{position: 'absolute', left: 0, top: 480, width: 1920, height: 600, perspective: 1800}}>
        {ps.map((p, i) => {const k = i - 3, z = -Math.abs(k) * 160; return <div key={p} style={{position: 'absolute', left: 810 + k * 300, top: 40 + Math.abs(k) * 22, transform: `translateZ(${z}px) rotateY(${-k * 9}deg) scale(1.35)`, filter: `blur(${Math.abs(k) * 0.9}px)`, opacity: 1 - Math.abs(k) * 0.1}}><LoginField p={p} /></div>;})}
      </div>
      <Ripple x={1012} y={828} /><Cursor x={1000} y={812} />
      <div style={{position: 'absolute', left: 860, top: 880, background: '#ab3527', color: '#fff', borderRadius: 99, padding: '8px 18px', fontFamily: F.text, fontSize: 18, fontWeight: 650}}>Wrong password. Try again.</div>
    </Frame>
  );
};

// 02  holo: hours of copy and paste
const K2 = () => (
  <Frame g="holo">
    <Shot w={1400} h={700} focus={[600, 230]} at={[1320, 500]} scale={1.9} rx={14} ry={-18} rz={-3} dof={{rx: 380, ry: 200, blur: 5}} fade={{side: 'left', at: 760, soft: 220}}><Spreadsheet /></Shot>
    <Cursor x={1390} y={530} />
    <div style={{position: 'absolute', left: 1330, top: 410, background: C.ink, color: '#fff', borderRadius: 10, padding: '8px 14px', fontFamily: F.mono, fontSize: 18}}>Ctrl + V</div>
    <H on="white" a="Hours lost to" b="copy and paste." size={96} style={{left: 110, top: 400}} />
  </Frame>
);

// 03  conic: reveal
const K3 = () => (
  <Frame g="conic">
    <div style={{position: 'absolute', left: 960 - 90, top: 230, width: 180, height: 180, borderRadius: 52, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -20px rgba(0,60,80,.45)'}}><Mark size={120} /></div>
    <div style={{position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 490, fontFamily: F.mono, fontSize: 22, letterSpacing: '.5em', color: '#fff'}}>ARCHETYPE</div>
    <H on="grad" a="Marketing Dashboard" size={140} align="center" style={{left: 0, width: 1920, top: 545}} />
    <div style={{position: 'absolute', left: 0, width: 1920, top: 735, textAlign: 'center', fontFamily: F.text, fontSize: 36, color: '#fff', textShadow: '0 1px 10px rgba(0,60,80,.3)'}}>All of our marketing, in one place.</div>
  </Frame>
);

// 04  sunrise: the full picture; cursor switches the range to 12 months
const K4 = () => (
  <Frame g="sunrise">
    <H on="white" a="See the full picture." b="Every channel, one screen." size={88} align="center" style={{left: 0, width: 1920, top: 60}} />
    <Shot w={1600} h={1000} focus={[900, 200]} at={[960, 620]} scale={1.15} rx={26} dof={null} fade={{side: 'top', at: 300, soft: 70}}><HomeReplica /></Shot>
    <Ripple x={1478} y={438} /><Cursor x={1466} y={424} />
    <Tip x={1478} y={400}>Last 12 months</Tip>
  </Frame>
);

// 05  aurora: updates itself; numbers tick up live, sources check in
const K5 = () => (
  <Frame g="aurora">
    <H on="grad" a="Updates itself." b="Your hours go back to marketing." size={84} style={{left: 110, top: 120}} />
    <div style={{position: 'absolute', left: 110, top: 400, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, width: 1700}}>
      {(['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'] as Platform[]).map((p, i) => (
        <div key={p} style={{background: '#fff', borderRadius: 24, padding: 24, fontFamily: F.text, boxShadow: '0 30px 60px -25px rgba(0,0,0,.55)', opacity: i === 6 ? 0.55 : 1, transform: i === 6 ? 'translateY(30px)' : 'none'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}><PlatformIcon p={p} size={44} /><span style={{fontSize: 21, fontWeight: 650, color: C.ink}}>{['LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'Website', 'Search', 'Email'][i]}</span>
            <span style={{marginLeft: 'auto', width: 32, height: 32, borderRadius: 99, background: i < 6 ? C.up : C.inset, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18}}>{i < 6 ? '✓' : ''}</span></div>
          <div style={{fontSize: 40, fontWeight: 750, color: C.ink, marginTop: 14, fontVariantNumeric: 'tabular-nums'}}>{['14,210', '13,980', '1,120', '2,640', '7,930', '29,870', '3,412'][i]}</div>
          <div style={{fontSize: 15, color: C.ink3}}>{i < 6 ? 'updated just now' : 'updating…'}</div>
        </div>
      ))}
      <div style={{borderRadius: 24, border: '2px dashed rgba(255,255,255,.4)', display: 'grid', placeItems: 'center', fontFamily: F.text, color: '#fff', fontSize: 22, fontWeight: 600}}>No one typed this.</div>
    </div>
  </Frame>
);

// 06  liquid: where visitors come from; hover tooltip on a city
const K6 = () => (
  <Frame g="liquid">
    <Shot w={1600} h={1000} focus={[1180, 300]} at={[1340, 520]} scale={2.0} rx={10} ry={-14} dof={{rx: 380, ry: 140, blur: 5}} fade={{side: 'left', at: 860, soft: 200}}><WebsiteScreen hl={0} /></Shot>
    <Cursor x={1460} y={500} /><Tip x={1470} y={470}>1,196 visitors, +18%</Tip>
    <H on="white" a="Know where" b="visitors come from." size={88} style={{left: 110, top: 400}} />
  </Frame>
);

// 07  mesh: typing a search filters the table live
const K7 = () => (
  <Frame g="blueprint">
    <H on="grad" a="Find what clients" b="search for." size={100} style={{left: 110, top: 100}} />
    <Float x={600} y={380} w={1240} h={760} tilt="perspective(2200px) rotateX(14deg) rotateY(-10deg)" inner="scale(1.3) translate(-640px, -60px)"><SearchScreen hl={1} /></Float>
    <div style={{position: 'absolute', left: 700, top: 330, width: 620, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 99, padding: '18px 26px', fontFamily: F.text, fontSize: 28, color: C.ink, boxShadow: '0 20px 50px -15px rgba(0,40,60,.5)', zIndex: 5}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 5 5" /></svg>factory<span style={{width: 3, height: 32, background: C.cyan}} />
    </div>
  </Frame>
);

// 08  pearl: click the best card, it opens
const K8 = () => (
  <Frame g="pearl">
    <Shot w={1600} h={1000} focus={[1180, 640]} at={[1280, 680]} scale={1.55} rx={18} ry={-10} rz={-2} dof={{rx: 270, ry: 170, blur: 5}} fade={{side: 'left', at: 780, soft: 200}}><HomeReplica /></Shot>
    <Ripple x={1360} y={600} /><Cursor x={1348} y={586} />
    <Tip x={1360} y={555}>Best this month, +64%</Tip>
    <H on="white" a="See what works." b="Then do more of it." size={96} style={{left: 110, top: 380}} />
  </Frame>
);

// 09  bands: hover a campaign, its opens appear
const K9 = () => (
  <Frame g="bands">
    <Float x={980} y={170} w={830} h={740} tilt="perspective(2200px) rotateY(-14deg) rotateX(4deg)" inner="scale(1.7) translate(-890px, -175px)"><EmailScreen /></Float>
    <Cursor x={1380} y={520} /><Tip x={1390} y={490}>1,317 people opened it</Tip>
    <H on="grad" a="Know which emails" b="get opened." size={88} style={{left: 110, top: 380}} />
  </Frame>
);

// 10  holo: the briefing writes itself
const K10 = () => (
  <Frame g="holo">
    <H on="white" a="Monday’s briefing" b="is already written." size={84} align="center" style={{left: 0, width: 1920, top: 70}} />
    <div style={{position: 'absolute', left: 310, top: 340, boxShadow: '0 40px 100px -40px rgba(5,60,63,.45)', borderRadius: 26}}><InsightsScreen typed={0.86} /></div>
  </Frame>
);

// 11  lime: $1,200 a year back; the SEMrush renewal is cancelled with a click
const K11 = () => (
  <Frame g="lime">
    <H on="grad" a="Save $1,200 a year." b="No SEMrush subscription." size={80} style={{left: 110, top: 150}} />
    <div style={{position: 'absolute', left: 110, top: 520, width: 700, background: '#fff', borderRadius: 26, padding: 34, fontFamily: F.text, color: C.ink, boxShadow: '0 40px 80px -30px rgba(0,40,40,.5)', transform: 'rotate(-3deg)'}}>
      <div style={{fontSize: 16, color: C.ink3, fontFamily: F.mono, letterSpacing: '.12em'}}>RENEWAL NOTICE</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}><span style={{fontSize: 30, fontWeight: 700}}>SEMrush, yearly plan</span><span style={{fontSize: 38, fontWeight: 750, textDecoration: 'line-through', textDecorationColor: '#ab3527', textDecorationThickness: 4}}>$1,200</span></div>
      <div style={{display: 'flex', gap: 12, marginTop: 24}}><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: C.inset, fontWeight: 650, fontSize: 19}}>Renew</span><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: C.ink, color: '#fff', fontWeight: 650, fontSize: 19}}>Cancel plan</span></div>
    </div>
    <Ripple x={640} y={784} /><Cursor x={628} y={770} />
    <Float x={1080} y={330} w={740} h={660} tilt="perspective(2200px) rotateY(-12deg) rotateX(4deg)" inner="scale(1.05) translate(-10px, -40px)"><SiteHealthScreen done={3} /></Float>
  </Frame>
);

// 12  spot: competitor moves; click download on the report
const K12 = () => (
  <Frame g="spot">
    <Float x={1000} y={130} w={760} h={880} tilt="perspective(2200px) rotateY(-16deg) rotateX(6deg) rotateZ(2deg)" inner="scale(.9)"><ReportPage /></Float>
    <div style={{position: 'absolute', left: 1530, top: 100, background: '#fff', color: C.teal, borderRadius: 99, padding: '14px 26px', fontFamily: F.text, fontSize: 22, fontWeight: 700, boxShadow: '0 20px 40px -10px rgba(0,0,0,.5)'}}>⬇ Download PDF</div>
    <Ripple x={1640} y={128} /><Cursor x={1628} y={114} />
    <H on="grad" a="Know competitor moves" b="before anyone asks." size={86} style={{left: 110, top: 400}} />
  </Frame>
);

// globe (white lines, for dark grounds)
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
// 13  duo: click an office on the globe, its local page opens
const K13 = () => (
  <Frame g="duo">
    <div style={{position: 'absolute', left: 1280 - 480 - 300, top: 540 - 480 - 100}}><Globe lon0={70} R={480} labels={['France', 'UAE', 'India', 'Vietnam', 'Singapore', 'Kazakhstan', 'Morocco', 'Indonesia', 'Mongolia']} /></div>
    <div style={{position: 'absolute', left: 1560, top: 640, width: 330, background: '#fff', borderRadius: 20, padding: 22, fontFamily: F.text, color: C.ink, boxShadow: '0 30px 60px -20px rgba(0,0,0,.5)'}}>
      <div style={{fontSize: 14, fontFamily: F.mono, color: C.teal, letterSpacing: '.12em'}}>ARCHETYPE THAILAND</div>
      <div style={{fontSize: 22, fontWeight: 700, marginTop: 8}}>3 local competitors</div>
      <div style={{fontSize: 16, color: C.ink3, marginTop: 4}}>1 new development this month</div>
    </div>
    <Ripple x={1446} y={612} /><Cursor x={1434} y={598} />
    <H on="grad" a="Local intelligence" b="for all 22 offices." size={88} style={{left: 110, top: 400}} />
  </Frame>
);

// 14  sunrise: one link, the whole team informed
const K14 = () => (
  <Frame g="sunrise">
    <Shot w={900} h={1270} focus={[450, 500]} at={[1500, 600]} scale={0.85} rx={10} ry={-28} rz={3} dof={null} fade={{side: 'top', at: 300, soft: 120}}><ReportPage /></Shot>
    <div style={{position: 'absolute', left: 760, top: 470, transform: 'perspective(2000px) rotateY(-10deg) rotateX(6deg) scale(1.3)', transformOrigin: 'top left'}}><SharePanel /></div>
    <Ripple x={1612} y={705} /><Cursor x={1600} y={692} />
    <Tip x={1612} y={660}>Link copied</Tip>
    <H on="white" a="One link." b="The whole team informed." size={88} style={{left: 110, top: 90}} />
  </Frame>
);

// 15  mesh: a new mention arrives as a notification
const K15 = () => (
  <Frame g="mesh">
    <H on="grad" a="Never miss" b="a press mention." size={100} style={{left: 110, top: 90}} />
    <Float x={560} y={380} w={1300} h={780} tilt="perspective(2200px) rotateX(18deg) rotateZ(-2deg)" inner="scale(1.25) translate(-30px, -20px)"><MentionsScreen /></Float>
    <Toast x={1290} y={110} title="New mention found" sub="Construction trade press, 2 min ago" icon="🔔" />
  </Frame>
);

// 16  liquid: a lead is marked Won from the dropdown
const K16 = () => (
  <Frame g="liquid">
    <Shot w={1600} h={1000} focus={[1000, 360]} at={[1300, 560]} scale={1.45} rx={10} ry={-14} dof={{rx: 640, ry: 380, blur: 4}} fade={{side: 'left', at: 820, soft: 200}}><InquiriesScreen hl={2} /></Shot>
    <div style={{position: 'absolute', left: 1500, top: 470, width: 220, background: '#fff', borderRadius: 16, padding: 8, fontFamily: F.text, fontSize: 19, boxShadow: '0 24px 50px -16px rgba(5,60,63,.45)', zIndex: 5}}>
      {['New', 'Quoted', 'Won', 'Lost'].map((x) => <div key={x} style={{padding: '10px 14px', borderRadius: 10, background: x === 'Won' ? C.teal : 'none', color: x === 'Won' ? '#fff' : C.ink, fontWeight: x === 'Won' ? 650 : 450}}>{x}</div>)}
    </div>
    <Ripple x={1580} y={588} /><Cursor x={1568} y={575} />
    <H on="white" a="Every business lead," b="tracked. None lost." size={86} style={{left: 110, top: 400}} />
  </Frame>
);

// 17  bands: a card dragged to Done
const K17 = () => (
  <Frame g="deep">
    <Float x={1010} y={200} w={850} h={720} tilt="perspective(2200px) rotateY(-12deg) rotateX(6deg)" inner="scale(1.05)"><BoardScreen /></Float>
    <div style={{position: 'absolute', left: 1300, top: 430, width: 380, transform: 'rotate(-4deg)', background: '#fff', borderRadius: 18, padding: '20px 22px', fontFamily: F.text, boxShadow: '0 40px 70px -20px rgba(0,50,70,.5)', zIndex: 5}}>
      <div style={{fontSize: 20, fontWeight: 650, color: C.ink, marginBottom: 12}}>Site photos for case study</div><span style={{fontSize: 15, fontWeight: 650, color: C.up, background: 'rgba(63,122,38,.12)', borderRadius: 99, padding: '4px 12px'}}>Approved</span>
    </div>
    <Cursor x={1610} y={500} />
    <H on="grad" a="Approvals move faster." b="Nothing stuck in inboxes." size={76} style={{left: 110, top: 400}} />
  </Frame>
);

// 18  aurora: the bento, all of marketing
const K18 = () => (
  <Frame g="aurora">
    <H on="grad" a="All of marketing. One dashboard." size={70} align="center" style={{left: 0, width: 1920, top: 46}} />
    <div style={{position: 'absolute', left: 960 - 1000 * 0.78, top: 175, transform: 'scale(.78)', transformOrigin: '0 0', borderRadius: 34, overflow: 'hidden', boxShadow: '0 50px 120px -30px rgba(0,0,0,.6)'}}><Bento /></div>
  </Frame>
);

// 19  conic: lockup, white type
const K19 = () => (
  <Frame g="conic">
    <div style={{position: 'absolute', left: 960 - 80, top: 230, width: 160, height: 160, borderRadius: 46, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 30px 80px -30px rgba(0,50,70,.5)'}}><Mark size={106} /></div>
    <div style={{position: 'absolute', left: 0, width: 1920, textAlign: 'center', top: 460, fontFamily: F.mono, fontSize: 22, letterSpacing: '.5em', color: '#fff'}}>ARCHETYPE</div>
    <H on="grad" a="Marketing Dashboard" size={130} align="center" style={{left: 0, width: 1920, top: 510}} />
    <div style={{position: 'absolute', left: 0, width: 1920, top: 720, textAlign: 'center'}}><span style={{display: 'inline-block', background: '#fff', color: C.teal, borderRadius: 99, padding: '16px 40px', fontFamily: F.text, fontSize: 30, fontWeight: 700}}>Open it on the Marketing team site</span></div>
    <div style={{position: 'absolute', left: 0, width: 1920, top: 990, textAlign: 'center', fontFamily: F.text, fontSize: 20, color: '#fff'}}>Made by Datdeptrai with ♥</div>
  </Frame>
);

export const KEYFRAMES = [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16, K17, K18, K19];
