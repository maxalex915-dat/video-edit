import React from 'react';
import {AbsoluteFill, Img, staticFile, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {PlatformIcon, Platform} from '../components/ui/Primitives';
import {MomentumPanel, SiteHealthPanel} from '../components/ui/Panels';
import {RealHome} from './RealHome';
import {BoldField, Mist, Pillar, Reveal, Say, Center, glow, BRAND, CY, GR, INK, TEALD} from './Look';

const PS: [Platform, string][] = [['li', 'LinkedIn'], ['fb', 'Facebook'], ['ig', 'Instagram'], ['yt', 'YouTube'], ['web', 'Google Analytics'], ['search', 'Search Console'], ['email', 'GetResponse']];
const MUTE = '#6b7f84';

// 1. Bold field: the statistic arrives huge, then settles into the sentence.
export const Stat: React.FC<{dur: number}> = () => {
  const f = useF();
  const k = prog(f, 30, 16, E.inOut);
  return (
    <AbsoluteFill>
      <BoldField corner={0} />
      <Center>
        <div style={{transform: `scale(${lerp(k, 1, 0.5)})`}}><Reveal at={10} dur={12}><Say size={210} color="#fff">Every week</Say></Reveal></div>
        <div style={{height: lerp(k, 0, 20)}} />
        <div style={{position: 'absolute', top: 600}}><Reveal at={36} dur={16}><Say size={96} color="#fff" weight={500}>our marketing data</Say></Reveal></div>
      </Center>
    </AbsoluteFill>
  );
};

// 2. Mist: "lives on" then "7 different platforms" with the platforms scattered around it at different depths.
const CHIP: [number, number, number][] = [[520, 300, 1], [1380, 260, 1.05], [400, 640, 0.95], [1500, 700, 1], [760, 860, 0.9], [1180, 880, 1.05], [960, 190, 0.85]];
const FILES: [string, number, number][] = [['linkedin_export.csv', 230, 160], ['GA4_sessions (2).xlsx', 1660, 150], ['report_FINAL_v7.xlsx', 200, 900], ['search_console.csv', 1700, 930], ['facebook_insights.xlsx', 1120, 110], ['email_stats.csv', 640, 980]];
export const Platforms: React.FC<{dur: number}> = () => {
  const f = useF();
  const t = f / 30;
  return (
    <AbsoluteFill>
      <Mist lift={0.25 + prog(f, 20, 60) * 0.35} />
      {FILES.map(([n, x, y], i) => {
        const q = prog(f, 30 + i * 3, 20, E.snappy);
        return <div key={n} style={{position: 'absolute', left: x - 120 + Math.sin(t + i) * 10, top: y - 22, opacity: q * 0.55, filter: 'blur(2.5px)', transform: `scale(${0.8 + q * 0.1})`, fontFamily: F.text, fontSize: 18, color: MUTE, background: 'rgba(255,255,255,.7)', borderRadius: 99, padding: '8px 18px', boxShadow: '0 6px 20px -10px rgba(4,63,69,.3)'}}>{n}</div>;
      })}
      {PS.map(([p, n], i) => {
        const [x, y, z] = CHIP[i];
        const q = spr(f, 24 + i * 3, S.pop);
        return (
          <div key={p} style={{position: 'absolute', left: x, top: y + Math.sin(t * 0.8 + i * 1.3) * 12, transform: `translate(-50%,-50%) scale(${Math.min(1.04, q) * z})`, opacity: Math.min(1, q), display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.9)', borderRadius: 99, padding: '10px 26px 10px 10px', boxShadow: '0 0 0 1.5px rgba(255,255,255,1), 0 18px 40px -18px rgba(4,63,69,.35)', fontFamily: F.text, fontSize: 26, fontWeight: 600, color: INK, whiteSpace: 'nowrap'}}>
            <PlatformIcon p={p} size={46} style={{borderRadius: 99}} />{n}
          </div>
        );
      })}
      <Center>
        {f < 22 ? <Reveal at={2} dur={10} out={16}><Say size={84}>lives on</Say></Reveal>
          : <Reveal at={22} dur={12}><Say size={92}><span style={{backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>7</span> different platforms</Say></Reveal>}
      </Center>
    </AbsoluteFill>
  );
};

// 3. The light pillar: "What should be simple" / it splits into ribbons on "has become fragmented & manual".
export const Fragmented: React.FC<{dur: number}> = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Mist lift={0.55} tint={1} />
      <Pillar rise={prog(f, 0, 30, E.snappy)} split={prog(f, 56, 40, E.inOut)} />
      <Center>
        {f < 36 ? <Reveal at={4} out={30}><Say size={80}>What should be simple</Say></Reveal>
          : <div style={{display: 'flex'}}><Reveal at={36} dur={22}><Say size={80}>has become <span style={{backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>fragmented</span></Say></Reveal><Reveal at={112}><Say size={80}> <span style={{backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>& manual</span></Say></Reveal></div>}
      </Center>
    </AbsoluteFill>
  );
};

// 4. Bold field: the routine, platform by platform. Sign in, export, copy into the report by hand.
const ROWS: [Platform, string, string, string][] = [['li', 'LinkedIn', 'LinkedIn login', '.csv'], ['fb', 'Facebook', 'Meta Business Suite', '.xlsx'], ['ig', 'Instagram', 'Meta Business Suite', '.xlsx'], ['yt', 'YouTube', 'YouTube Studio', '.csv'], ['web', 'Google Analytics', 'Google sign-in', '.xlsx'], ['search', 'Search Console', 'Google sign-in', '.csv'], ['email', 'GetResponse', 'GetResponse login', '.csv']];
export const Routine: React.FC<{dur: number}> = () => {
  const f = useF();
  const zoom = prog(f, 72, 28, E.inOut);
  const cell: React.CSSProperties = {fontFamily: F.text, fontSize: 24, color: '#fff', display: 'flex', alignItems: 'center', gap: 12};
  return (
    <AbsoluteFill>
      <BoldField corner={1} bloom={0.6} />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + zoom * 0.7})`, transformOrigin: '1560px 560px', filter: `blur(${zoom * 2}px)`}}>
        <div style={{position: 'absolute', left: 170, right: 170, top: 150, display: 'grid', gridTemplateColumns: '1.2fr 1.3fr .7fr 1.2fr', fontFamily: F.text, fontSize: 15, letterSpacing: '.14em', color: 'rgba(255,255,255,.7)', fontWeight: 600}}>
          <span>PLATFORM</span><span>SIGN-IN</span><span>EXPORT</span><span>INTO THE REPORT</span>
        </div>
        {ROWS.map(([p, n, sgn, ext], i) => {
          const q = prog(f, 6 + i * 6, 14, E.snappy);
          return (
            <div key={p} style={{position: 'absolute', left: 170, right: 170, top: 200 + i * 104, height: 90, display: 'grid', gridTemplateColumns: '1.2fr 1.3fr .7fr 1.2fr', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.22)', opacity: q, filter: `blur(${(1 - q) * 8}px)`}}>
              <span style={cell}><PlatformIcon p={p} size={40} style={{borderRadius: 10}} />{n}</span>
              <span style={cell}><span style={{background: 'rgba(255,255,255,.16)', borderRadius: 99, padding: '8px 18px'}}>{sgn}</span></span>
              <span style={{...cell, fontFamily: F.mono}}>{ext}</span>
              <span style={{...cell, fontWeight: 700}}><span style={{background: '#fff', color: TEALD, borderRadius: 99, padding: '8px 20px'}}>Copied by hand</span></span>
            </div>
          );
        })}
      </div>
      {f >= 98 && <Center><Reveal at={100}><Say size={86} color="#fff">Every week. By hand.</Say></Reveal></Center>}
    </AbsoluteFill>
  );
};

// 5. Frosted outlines: an empty form of pills, colour glowing under the glass, one bright dot looking for a place.
export const Outlines: React.FC<{dur: number}> = () => {
  const f = useF();
  const t = f / 30;
  const melt = prog(f, 66, 20, E.inOut);
  const LIST = ['Different logins', 'Different exports', 'Copied by hand'];
  const rows = [[260, 180, 120, 300, 90], [140, 340, 200, 90, 260], [300, 120, 260, 160, 200], [200, 260, 90, 320, 140]];
  const dx = 960 + Math.sin(t * 2.2) * 420 * (1 - melt), dy = 560 + Math.cos(t * 1.7) * 120 * (1 - melt);
  return (
    <AbsoluteFill>
      <Mist lift={0.7} tint={0} />
      <div style={{opacity: 1 - melt, filter: `blur(${melt * 12}px)`}}>
        {rows.map((r, i) => {
          let x = 140;
          return r.map((w, j) => {
            const el = <div key={`${i}-${j}`} style={{position: 'absolute', left: x + (i % 2) * 40, top: 470 + i * 96, width: w, height: 62, borderRadius: 99, border: '2px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.16)', boxShadow: 'inset 0 0 18px rgba(255,255,255,.5)'}} />;
            x += w + 26;
            return el;
          });
        })}
      </div>
      <div style={{position: 'absolute', left: dx - 22, top: dy - 22, width: 44, height: 44, borderRadius: 99, background: BRAND, boxShadow: '0 0 30px rgba(0,185,239,.6)'}} />
      <div style={{position: 'absolute', left: 140, top: 110, opacity: 1 - melt}}>
        {LIST.map((l, i) => <div key={l} style={{fontFamily: F.display, fontSize: 30, fontWeight: 500, color: 'rgba(16,36,42,.32)', marginBottom: 8, opacity: prog(f, i * 6, 12)}}>{l}</div>)}
        <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 10}}><div style={{width: 120, height: 2, background: 'rgba(16,36,42,.3)'}} /><Reveal at={38}><Say size={64}>Consuming time</Say></Reveal></div>
      </div>
    </AbsoluteFill>
  );
};

// 6. The dot lands, becomes a glass card, "Simpler", which opens into a frosted panel, "Everything in one place".
export const Simpler: React.FC<{dur: number}> = () => {
  const f = useF();
  const g = prog(f, 50, 26, E.inOut);
  const w = lerp(g, 380, 1280), h = lerp(g, 200, 640);
  const card = spr(f, 2, S.soft);
  return (
    <AbsoluteFill>
      <Mist lift={0.75} tint={2} />
      <div style={{position: 'absolute', left: 960 - w / 2, top: 540 - h / 2, width: w, height: h, borderRadius: 32, background: 'linear-gradient(160deg, rgba(255,255,255,.55), rgba(255,255,255,.2))', border: '2px solid rgba(255,255,255,.95)', backdropFilter: 'blur(24px)', boxShadow: '0 40px 90px -40px rgba(4,63,69,.35)', transform: `scale(${Math.min(1, card)})`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: '8%', right: '8%', bottom: '10%', height: '38%', display: 'flex', gap: 18, opacity: g}}>
          {[0, 1, 2].map((i) => <div key={i} style={{flex: 1, borderRadius: 20, background: 'rgba(255,255,255,.35)', border: '1.5px solid rgba(255,255,255,.9)', boxShadow: `inset 0 -40px 60px -20px ${[CY, GR, CY][i]}55`}} />)}
        </div>
      </div>
      <Center y={lerp(g, 0, -110)}>
        {f < 50 ? <Reveal at={22} out={44}><Say size={64}>Simpler</Say></Reveal> : <Reveal at={56}><Say size={72}>Everything in one place</Say></Reveal>}
      </Center>
    </AbsoluteFill>
  );
};

// 7. "Introducing", then the name with the loop, a gradient light passing through the letters.
export const Intro: React.FC<{dur: number}> = () => {
  const f = useF();
  const sweep = prog(f, 36, 30, E.inOut);
  return (
    <AbsoluteFill>
      <Mist lift={0.3} />
      <Center>
        {f < 28 ? <Reveal at={2} dur={12} out={22}><Say size={110} grad>Introducing</Say></Reveal> : (
          <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: prog(f, 28, 8), filter: `blur(${(1 - prog(f, 28, 10)) * 10}px)`}}>
            <Img src={staticFile('logo_loop.svg')} style={{width: 120, height: 120, objectFit: 'contain', transform: `scale(${spr(f, 30, S.pop)})`}} />
            <span style={{fontFamily: F.display, fontSize: 116, fontWeight: 650, letterSpacing: '-0.045em', backgroundImage: `linear-gradient(100deg, ${INK} 0%, ${INK} ${sweep * 120 - 30}%, ${GR} ${sweep * 120 - 15}%, ${CY} ${sweep * 120}%, ${INK} ${sweep * 120 + 15}%, ${INK} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent'}}>Marketing Dashboard</span>
          </div>
        )}
        {f >= 48 && <div style={{marginTop: 26}}><Reveal at={50}><Say size={34} color={MUTE} weight={500}>Every channel. One place. Automated.</Say></Reveal></div>}
      </Center>
    </AbsoluteFill>
  );
};

// 8. The real Home tab in a frosted window, floating on the mist with a colour band behind it.
export const Home: React.FC<{dur: number}> = () => {
  const f = useF();
  const p = spr(f, 4, S.soft);
  return (
    <AbsoluteFill>
      <Mist lift={1} tint={0} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center'}}><Reveal at={2}><Say size={60}>Every channel. <span style={{backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>One dashboard.</span></Say></Reveal></div>
      <div style={{position: 'absolute', left: 240, top: 190, width: 1600, height: 900, transform: `translateY(${(1 - p) * 120}px) scale(${0.9})`, transformOrigin: '0 0', borderRadius: 26, overflow: 'hidden', ...glow(1.2), backdropFilter: 'blur(28px)'}}><RealHome at={10} /></div>
    </AbsoluteFill>
  );
};

// 9. Bold field again: the turn from data to decisions.
export const Decide: React.FC<{dur: number}> = () => {
  const f = useF();
  const k = prog(f, 44, 14, E.inOut);
  return (
    <AbsoluteFill>
      <BoldField corner={2} />
      <Center>
        <div style={{transform: `translateY(${lerp(k, 0, -60)}px) scale(${lerp(k, 1, 0.48)})`}}><Reveal at={22} dur={12}><Say size={200} color="#fff">Turn insights</Say></Reveal></div>
        <div style={{position: 'absolute', top: 560}}><Reveal at={50}><Say size={96} color="#fff" weight={500}>into decisions</Say></Reveal></div>
      </Center>
    </AbsoluteFill>
  );
};

// 10. Feature carousel: frosted cards with a line icon slide past; the centre one is larger and sharp.
const FEAT: [string, string][] = [['Spot trends', 'M4 40 L16 28 L26 34 L44 12'], ['Weekly AI reports', 'M10 6 h22 l8 8 v28 h-30 z M16 20 h18 M16 28 h18'], ['Keyword strategy', 'M20 32 a12 12 0 1 1 0.1 0 M29 29 l12 12'], ['Site audit', 'M24 6 l16 6 v12 c0 10 -7 16 -16 20 c-9 -4 -16 -10 -16 -20 v-12 z M17 24 l5 5 l9 -10'], ['Competitor reports', 'M8 40 V22 M20 40 V12 M32 40 V26 M44 40 V8'], ['PR tracking', 'M10 30 h6 l16 10 V8 L16 18 h-6 z'], ['Business inquiries', 'M6 12 h36 v24 h-36 z M6 12 l18 14 l18 -14'], ['Approvals', 'M8 26 l10 10 l22 -24']];
export const Carousel: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const pos = interpolate(f / 30, [0.4, 1.0, 1.9, 3.1, 4.6, dur / 30], [0, 1, 2, 3, 6, 7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  return (
    <AbsoluteFill>
      <Mist lift={0.8} tint={1} />
      {FEAT.map(([n, d], i) => {
        const o = i - pos, ao = Math.abs(o);
        const sc = Math.max(0.6, 1.25 - ao * 0.3);
        return (
          <div key={n} style={{position: 'absolute', left: 960 + o * 420 - 170, top: 540 - 150, width: 340, height: 300, borderRadius: 28, background: 'rgba(255,255,255,.82)', border: '2px solid #fff', backdropFilter: 'blur(18px)', ...glow(0.8), transform: `scale(${sc})`, opacity: Math.max(0, 1 - ao * 0.32), filter: `blur(${Math.max(0, ao - 0.4) * 3}px)`, padding: 34, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <svg width="96" height="96" viewBox="0 0 48 48"><defs><linearGradient id={`fi${i}`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={GR} /><stop offset="1" stopColor={CY} /></linearGradient></defs><path d={d} fill="none" stroke={`url(#fi${i})`} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div style={{fontFamily: F.display, fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', color: INK}}>{n}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 11. Trends on the mist: every channel on one timeline, the spike lit across all of them.
export const Trends: React.FC<{dur: number}> = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Mist lift={0.6} tint={0} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center'}}><Reveal at={2}><Say size={60}>Spot trends and <span style={{backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>make connections.</span></Say></Reveal></div>
      <div style={{position: 'absolute', left: 210, top: 250, borderRadius: 30, ...glow(1)}}><MomentumPanel draw={prog(f, 6, 50)} band={prog(f, 60, 20)} spike={prog(f, 70, 20)} w={1500} /></div>
    </AbsoluteFill>
  );
};

// 12. Weekly AI report on the bold field: the card floats on light.
export const Report: React.FC<{dur: number}> = () => {
  const f = useF();
  const p = spr(f, 6, S.soft);
  const rec = prog(f, 40, 20, E.snappy);
  return (
    <AbsoluteFill>
      <BoldField corner={1} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center'}}><Reveal at={2}><Say size={64} color="#fff">Weekly AI reports</Say></Reveal></div>
      <div style={{position: 'absolute', left: 300, top: 250, width: 1320, borderRadius: 30, background: 'rgba(255,255,255,.96)', padding: '36px 46px', boxSizing: 'border-box', fontFamily: F.text, color: INK, ...glow(1.2), transform: `translateY(${(1 - p) * 80}px)`, opacity: Math.min(1, p)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 44, height: 44, borderRadius: 14, background: BRAND}} /><b style={{fontSize: 20}}>Weekly AI report</b><span style={{fontSize: 15, color: MUTE, background: '#eef4f5', borderRadius: 99, padding: '5px 14px'}}>Week of 2 to 8 November</span></div>
        <div style={{fontFamily: F.display, fontSize: 44, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '24px 0', color: '#055e63'}}>Posts about factory handovers reached 2.4x the usual audience.</div>
        <div style={{borderRadius: 20, padding: 2, background: BRAND, opacity: rec, transform: `scale(${0.96 + rec * 0.04})`}}>
          <div style={{background: '#fff', borderRadius: 18, padding: '20px 24px'}}>
            <div style={{fontSize: 14, fontWeight: 700, letterSpacing: '.12em', backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>RECOMMENDATION</div>
            <div style={{fontSize: 24, fontWeight: 600, marginTop: 6, lineHeight: 1.35}}>Factory handover stories outperform everything else. Publish two more this month and lead with the timeline.</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 13. The saving, in the gradient on the mist, the site health card rising under it.
export const Saving: React.FC<{dur: number}> = () => {
  const f = useF();
  const up = spr(f, 80, S.soft);
  return (
    <AbsoluteFill>
      <Mist lift={0.5} tint={2} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', transform: `translateY(${-prog(f, 76, 20, E.inOut) * 60}px)`}}>
        <Reveal at={44}><Say size={150} grad>Save $2,000+</Say></Reveal>
        <Reveal at={64}><Say size={46} weight={500} color={MUTE}>on SEMrush, with our own site audit</Say></Reveal>
      </div>
      <div style={{position: 'absolute', left: 600, top: 470, borderRadius: 28, ...glow(1), transform: `translateY(${(1 - Math.min(1, up)) * 300}px)`, opacity: Math.min(1, up)}}><SiteHealthPanel gauge={prog(f, 86, 40)} w={720} /></div>
    </AbsoluteFill>
  );
};

// 14. All in one: the real menu scrolls while the highlight slides from item to item (reference 0:36).
const NAV = ['Home', 'Insights', 'Website', 'Search', 'Social', 'Email', 'PR Tracking', 'Competitive Intelligence', 'Business Inquiries', 'To Be Approved', 'PPM Statistics', 'Site Audit'];
export const AllInOne: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const raw = (f / dur) * (NAV.length - 3) + 1, base = Math.floor(raw), fr = raw - base;
  const pos = base + E.inOut(Math.min(1, Math.max(0, (fr - 0.55) / 0.45)));
  return (
    <AbsoluteFill>
      <Mist lift={0.2} />
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 900, background: `linear-gradient(90deg, ${CY} 0%, rgba(0,185,239,.75) 35%, rgba(127,188,66,.35) 70%, rgba(243,246,246,0) 100%)`}} />
      <div style={{position: 'absolute', left: 140, top: 400}}><Reveal at={2}><Say size={96} color="#fff">All in one{'\n'}dashboard</Say></Reveal></div>
      <div style={{position: 'absolute', left: 1080, top: 0, bottom: 0, width: 560, borderRadius: 0, background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(20px)', borderLeft: '1.5px solid #fff', borderRight: '1.5px solid #fff', overflow: 'hidden'}}>
        {NAV.map((n, i) => {
          const y = 540 + (i - pos) * 84;
          const on = Math.max(0, 1 - Math.abs(i - pos) * 1.6);
          return (
            <div key={n} style={{position: 'absolute', left: 40, right: 40, top: y - 32, height: 64, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', fontFamily: F.text, fontSize: 25, fontWeight: on > 0.5 ? 700 : 500, color: on > 0.5 ? '#fff' : INK, background: on > 0.02 ? `linear-gradient(90deg, rgba(10,107,95,${on}), rgba(0,185,239,${on}))` : 'transparent', opacity: Math.max(0.2, 1 - Math.abs(i - pos) * 0.16)}}>
              <span style={{width: 20, height: 20, borderRadius: 6, border: `2.2px solid ${on > 0.5 ? '#fff' : '#536a70'}`}} />{n}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 15. Bold field, four live tiles glowing in a row (reference 0:46).
const TILES: [string, string, string][] = [['Site health', '78', 'score, 7 up since last crawl'], ['PR articles', '14', 'this month, 3 new'], ['Competitor report', '8 of 13', 'competitors in the news'], ['Business requests', '23', 'this month'] ];
export const Tiles: React.FC<{dur: number}> = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <BoldField corner={0} />
      {TILES.map(([a, b, c], i) => {
        const q = spr(f, [6, 36, 58, 72][i], S.soft);
        return (
          <div key={a} style={{position: 'absolute', left: 180 + i * 400, top: 380, width: 360, height: 320, borderRadius: 26, background: 'rgba(255,255,255,.95)', ...glow(1), padding: 30, boxSizing: 'border-box', fontFamily: F.text, color: INK, transform: `translateY(${(1 - Math.min(1, q)) * 60}px)`, opacity: Math.min(1, q)}}>
            <div style={{fontSize: 21, fontWeight: 700}}>{a}</div>
            <div style={{fontFamily: F.display, fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 40, backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>{b}</div>
            <div style={{fontSize: 18, color: MUTE, marginTop: 6}}>{c}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
