import React from 'react';
import {AbsoluteFill, Img, staticFile, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S, lerp} from '../theme/motion';
import {PlatformIcon, Platform} from '../components/ui/Primitives';
import {MomentumPanel, SiteHealthPanel} from '../components/ui/Panels';
import {Cursor} from '../components/kit/Anim';
import {RealHome} from './RealHome';
import {BrandField, Mist, Pillar, Words, Center, Drift, glow, BRAND, CY, GR, INK, Pop, Swish} from './Look';

const PS: [Platform, string][] = [['li', 'LinkedIn'], ['fb', 'Facebook'], ['ig', 'Instagram'], ['yt', 'YouTube'], ['web', 'Google Analytics'], ['search', 'Search Console'], ['email', 'GetResponse']];
const MUTE = '#6b7f84';
const W = '#fff';
// a 3D stage: perspective, with the content turning slowly
const Tilt: React.FC<{rx: number; ry: number; rz?: number; cx?: number; cy?: number; children: React.ReactNode}> = ({rx, ry, rz = 0, cx = 960, cy = 540, children}) => (
  <div style={{position: 'absolute', inset: 0, perspective: 2200, perspectiveOrigin: `${cx}px ${cy}px`}}>
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: `${cx}px ${cy}px`, transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`}}>{children}</div>
  </div>
);

// 1. Brand field: the statistic arrives huge, then settles into the sentence.
export const Stat: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const k = prog(f, 38, 16, E.inOut);
  return (
    <AbsoluteFill>
      <BrandField seed={0} />
      <Drift dur={dur} z={0.06}>
        <Center y={lerp(k, 0, -40)}>
          <div style={{transform: `scale(${lerp(k, 1, 0.55)})`}}><Words parts={[['Every week']]} at={22} size={200} color={W} stagger={9} /></div>
        </Center>
        <Center y={70}><Words parts={[['our marketing analytics']]} at={46} size={92} color={W} weight={500} stagger={5} /></Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 2. Mist: "lives on" then "7 different platforms" with the platforms scattered around it at different depths.
const CHIP: [number, number, number][] = [[520, 300, 1], [1380, 260, 1.05], [400, 640, 0.95], [1500, 700, 1], [760, 860, 0.9], [1180, 880, 1.05], [960, 190, 0.85]];
const FILES: [string, number, number][] = [['linkedin_export.csv', 230, 160], ['GA4_sessions (2).xlsx', 1660, 150], ['report_FINAL_v7.xlsx', 200, 900], ['search_console.csv', 1700, 930], ['facebook_insights.xlsx', 1120, 110], ['email_stats.csv', 640, 980]];
export const Platforms: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const t = f / 30;
  return (
    <AbsoluteFill>
      <Mist lift={0.25 + prog(f, 20, 60) * 0.35} />
      {PS.map((_, i) => <Pop key={i} at={30 + i * 3} k={i} v={0.18} />)}
      <Drift dur={dur} z={0.08}>
        {FILES.map(([n, x, y], i) => {
          const q = prog(f, 44 + i * 3, 20, E.snappy);
          return <div key={n} style={{position: 'absolute', left: x - 120 + Math.sin(t + i) * 10, top: y - 22, opacity: q * 0.55, filter: 'blur(2.5px)', transform: `scale(${0.8 + q * 0.1})`, fontFamily: F.text, fontSize: 18, color: MUTE, background: 'rgba(255,255,255,.7)', borderRadius: 99, padding: '8px 18px', boxShadow: '0 6px 20px -10px rgba(4,63,69,.3)'}}>{n}</div>;
        })}
        {PS.map(([p, n], i) => {
          const [x, y, z] = CHIP[i];
          const q = spr(f, 30 + i * 3, S.pop);
          return (
            <div key={p} style={{position: 'absolute', left: x + Math.cos(t * 0.6 + i) * 10, top: y + Math.sin(t * 0.8 + i * 1.3) * 12, transform: `translate(-50%,-50%) scale(${Math.min(1.04, q) * z})`, opacity: Math.min(1, q), display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.92)', borderRadius: 99, padding: '10px 26px 10px 10px', boxShadow: '0 0 0 1.5px #fff, 0 18px 40px -18px rgba(4,63,69,.35)', fontFamily: F.text, fontSize: 26, fontWeight: 600, color: INK, whiteSpace: 'nowrap'}}>
              <PlatformIcon p={p} size={46} style={{borderRadius: 99}} />{n}
            </div>
          );
        })}
        <Center>
          {f < 20 ? <Words parts={[['lives on']]} at={1} size={84} out={13} />
            : <Words parts={[['7', true], ['different platforms']]} at={20} size={92} stagger={5} />}
        </Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 3. The light pillar: "What should be simple" / it splits into ribbons on "has become fragmented & manual".
export const Fragmented: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Mist lift={0.55} />
      <Swish at={0} /><Swish at={44} k={1} />
      <Drift dur={dur} z={0.05}>
        <Pillar rise={prog(f, 0, 30, E.snappy)} split={prog(f, 44, 40, E.inOut)} />
        <Center>
          {f < 44 ? <Words parts={[['What should be simple']]} at={6} size={80} out={36} />
            : <Words parts={[['has become'], ['fragmented & manual', true]]} at={46} size={80} />}
        </Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 4. Brand field: the routine, platform by platform. Then the table steps back and the line stands alone.
const ROWS: [Platform, string, string, string][] = [['li', 'LinkedIn', 'LinkedIn login', '.csv'], ['fb', 'Facebook', 'Meta Business Suite', '.xlsx'], ['ig', 'Instagram', 'Meta Business Suite', '.xlsx'], ['yt', 'YouTube', 'YouTube Studio', '.csv'], ['web', 'Google Analytics', 'Google sign-in', '.xlsx'], ['search', 'Search Console', 'Google sign-in', '.csv'], ['email', 'GetResponse', 'GetResponse login', '.csv']];
export const Routine: React.FC<{dur: number}> = () => {
  const f = useF();
  const back = prog(f, 82, 18, E.inOut);
  const cell: React.CSSProperties = {fontFamily: F.text, fontSize: 24, color: W, display: 'flex', alignItems: 'center', gap: 12};
  return (
    <AbsoluteFill>
      <BrandField seed={1} />
      {ROWS.map((_, i) => <Pop key={i} at={6 + i * 6} k={i} v={0.15} />)}<Swish at={80} />
      <Tilt rx={lerp(prog(f, 0, 80), 16, 8)} ry={-6} cy={600}>
        <div style={{position: 'absolute', inset: 0, opacity: 1 - back, filter: `blur(${back * 16}px)`, transform: `translateZ(${-back * 400}px)`}}>
          <div style={{position: 'absolute', left: 170, right: 170, top: 150, display: 'grid', gridTemplateColumns: '1.2fr 1.3fr .7fr 1.2fr', fontFamily: F.text, fontSize: 15, letterSpacing: '.14em', color: 'rgba(255,255,255,.8)', fontWeight: 600}}>
            <span>PLATFORM</span><span>SIGN-IN</span><span>EXPORT</span><span>INTO THE REPORT</span>
          </div>
          {ROWS.map(([p, n, sgn, ext], i) => {
            const q = prog(f, 6 + i * 6, 14, E.snappy);
            return (
              <div key={p} style={{position: 'absolute', left: 170, right: 170, top: 200 + i * 104, height: 90, display: 'grid', gridTemplateColumns: '1.2fr 1.3fr .7fr 1.2fr', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.3)', opacity: q, filter: `blur(${(1 - q) * 8}px)`, transform: `translateX(${(1 - q) * -60}px)`}}>
                <span style={cell}><PlatformIcon p={p} size={40} style={{borderRadius: 10}} />{n}</span>
                <span style={cell}><span style={{background: 'rgba(255,255,255,.2)', borderRadius: 99, padding: '8px 18px'}}>{sgn}</span></span>
                <span style={{...cell, fontFamily: F.mono}}>{ext}</span>
                <span style={{...cell, fontWeight: 700}}><span style={{background: W, color: '#055e63', borderRadius: 99, padding: '8px 20px'}}>Copied by hand</span></span>
              </div>
            );
          })}
        </div>
      </Tilt>
      {f >= 94 && <Center><Words parts={[['Every week. By hand.']]} at={96} size={96} color={W} /></Center>}
    </AbsoluteFill>
  );
};

// 5. Frosted outlines: an empty form of pills, the gradient glowing under the glass, one bright dot looking for a place.
export const Outlines: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const t = f / 30;
  const melt = prog(f, 66, 20, E.inOut);
  const LIST = ['Different logins', 'Different exports', 'Copied by hand'];
  const rows = [[260, 180, 120, 300, 90], [140, 340, 200, 90, 260], [300, 120, 260, 160, 200], [200, 260, 90, 320, 140]];
  const dx = 960 + Math.sin(t * 2.2) * 420 * (1 - melt), dy = 640 + Math.cos(t * 1.7) * 120 * (1 - melt);
  return (
    <AbsoluteFill>
      <Mist lift={0.7} />
      <Drift dur={dur} z={0.06} x={-40}>
        <Tilt rx={24} ry={0} cy={700}>
          <div style={{opacity: 1 - melt, filter: `blur(${melt * 12}px)`}}>
            {rows.map((r, i) => {
              let x = 180;
              return r.map((w, j) => {
                const el = <div key={`${i}-${j}`} style={{position: 'absolute', left: x + (i % 2) * 40, top: 520 + i * 96, width: w, height: 62, borderRadius: 99, border: '2px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.18)', boxShadow: 'inset 0 0 18px rgba(255,255,255,.5)'}} />;
                x += w + 26;
                return el;
              });
            })}
          </div>
        </Tilt>
        <div style={{position: 'absolute', left: dx - 22, top: dy - 22, width: 44, height: 44, borderRadius: 99, background: BRAND, boxShadow: '0 0 30px rgba(0,185,239,.6)'}} />
        <div style={{position: 'absolute', left: 140, top: 110, opacity: 1 - melt}}>
          {LIST.map((l, i) => <div key={l} style={{fontFamily: F.display, fontSize: 30, fontWeight: 500, color: 'rgba(16,36,42,.32)', marginBottom: 8, opacity: prog(f, i * 6, 12)}}>{l}</div>)}
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 10}}><div style={{width: 120 * prog(f, 16, 14, E.snappy), height: 2, background: 'rgba(16,36,42,.3)'}} /><Words parts={[['Consuming time']]} at={20} size={64} align="left" /></div>
        </div>
      </Drift>
    </AbsoluteFill>
  );
};

// 6. The dot lands, becomes a glass card, "Simpler", which opens into a frosted panel, "Everything in one place".
export const Simpler: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const g = prog(f, 40, 26, E.inOut);
  const w = lerp(g, 380, 1280), h = lerp(g, 200, 640);
  const card = spr(f, 2, S.soft);
  return (
    <AbsoluteFill>
      <Mist lift={0.75} />
      <Pop at={2} v={0.2} /><Swish at={40} />
      <Drift dur={dur} z={0.05}>
        <Tilt rx={lerp(g, 0, 14)} ry={lerp(g, 0, -8)}>
          <div style={{position: 'absolute', left: 960 - w / 2, top: 540 - h / 2, width: w, height: h, borderRadius: 32, background: 'linear-gradient(160deg, rgba(255,255,255,.6), rgba(255,255,255,.25))', border: '2px solid rgba(255,255,255,.95)', boxShadow: '0 40px 90px -40px rgba(0,90,120,.35)', transform: `scale(${Math.min(1, card)})`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: '8%', right: '8%', bottom: '10%', height: '38%', display: 'flex', gap: 18, opacity: g}}>
              {[0, 1, 2].map((i) => <div key={i} style={{flex: 1, borderRadius: 20, background: 'rgba(255,255,255,.4)', border: '1.5px solid rgba(255,255,255,.9)', boxShadow: `inset 0 -50px 60px -24px ${[GR, CY, '#70cbf3'][i]}66`}} />)}
            </div>
          </div>
        </Tilt>
        <Center y={lerp(g, 0, -110)}>
          {f < 40 ? <Words parts={[['Simpler']]} at={8} size={64} out={34} /> : <Words parts={[['Everything in one place']]} at={46} size={72} />}
        </Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 7. "Introducing", then the name with the loop, a gradient light passing through the letters.
export const Intro: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const sweep = prog(f, 44, 30, E.inOut);
  const nm = prog(f, 34, 14, E.snappy);
  return (
    <AbsoluteFill>
      <Mist lift={0.3} />
      <Swish at={34} /><Pop at={38} v={0.24} k={1} />
      <Drift dur={dur} z={0.07}>
        <Center>
          {f < 34 ? <Words parts={[['Introducing', true]]} at={2} size={110} out={28} /> : (
            <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: nm, filter: `blur(${(1 - nm) * 12}px)`, transform: `translateX(${(1 - nm) * -60}px)`}}>
              <Img src={staticFile('logo_loop.svg')} style={{width: 120, height: 120, objectFit: 'contain', transform: `scale(${spr(f, 36, S.pop)}) rotate(${(1 - Math.min(1, spr(f, 36, S.pop))) * -40}deg)`}} />
              <span style={{fontFamily: F.display, fontSize: 116, fontWeight: 650, letterSpacing: '-0.045em', backgroundImage: `linear-gradient(100deg, ${INK} 0%, ${INK} ${sweep * 120 - 30}%, ${GR} ${sweep * 120 - 15}%, ${CY} ${sweep * 120}%, ${INK} ${sweep * 120 + 15}%, ${INK} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent'}}>Marketing Dashboard</span>
            </div>
          )}
          {f >= 70 && <div style={{marginTop: 26}}><Words parts={[['Every channel. One place. Automated.']]} at={72} size={34} color={MUTE} weight={500} stagger={2} /></div>}
        </Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 8. The real Home tab, tilted in 3D; its cards lift out of the page toward the camera, with labels.
const Pill: React.FC<{x: number; y: number; at: number; children: React.ReactNode}> = ({x, y, at, children}) => {
  const f = useF();
  const p = spr(f, at, S.pop);
  return <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${Math.min(1, p)})`, opacity: Math.min(1, p * 1.5), background: INK, color: W, fontFamily: F.text, fontSize: 30, fontWeight: 600, borderRadius: 99, padding: '18px 36px', boxShadow: '0 20px 40px -14px rgba(16,36,42,.5)', whiteSpace: 'nowrap', zIndex: 20}}>{children}</div>;
};
export const Home: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const p = spr(f, 4, S.soft);
  const lift = prog(f, 40, 40, E.inOut);
  const turn = prog(f, 0, dur, (q) => q);
  return (
    <AbsoluteFill>
      <Mist lift={1} />
      <Swish at={4} /><Swish at={40} k={1} /><Pop at={56} v={0.22} /><Pop at={72} v={0.22} k={1} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 60, zIndex: 10}}><Words parts={[['All platforms.'], ['One dashboard.', true]]} at={2} size={60} /></div>
      <Tilt rx={lerp(turn, 26, 18)} ry={lerp(turn, -16, -6)} rz={lerp(turn, 3, 1)} cy={620}>
        <div style={{position: 'absolute', left: 240, top: 210, width: 1600, height: 900, transform: `translateY(${(1 - p) * 160}px) scale(0.9)`, transformOrigin: '0 0', transformStyle: 'preserve-3d', ...glow(1)}}>
          <RealHome at={10} lift={lift} />
        </div>
      </Tilt>
      <Pill x={250} y={700} at={56}>7 platforms, one view</Pill>
      <Pill x={1650} y={170} at={72}>Updated every day</Pill>
      <Cursor path={[{f: 40, x: 900, y: 1060}, {f: 70, x: 345, y: 712}, {f: dur, x: 360, y: 722}]} show={40} />
    </AbsoluteFill>
  );
};

// 9. Brand field again: the turn from data to decisions.
export const Decide: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const k = prog(f, 24, 18, E.inOut);
  return (
    <AbsoluteFill>
      <BrandField seed={2} />
      <Drift dur={dur} z={0.08}>
        <Center y={lerp(k, 0, -50)}><div style={{transform: `scale(${lerp(k, 1, 0.5)})`}}><Words parts={[['Turn insights']]} at={2} size={190} color={W} stagger={5} /></div></Center>
        <Center y={70}><Words parts={[['into an action plan']]} at={30} size={92} color={W} weight={500} /></Center>
      </Drift>
    </AbsoluteFill>
  );
};

// 10. Feature carousel: frosted cards turned in 3D, sliding past; the centre one faces us.
const FEAT: [string, string][] = [['Trends', 'M4 40 L16 28 L26 34 L44 12'], ['AI insights', 'M10 6 h22 l8 8 v28 h-30 z M16 20 h18 M16 28 h18'], ['Keyword strategy', 'M20 32 a12 12 0 1 1 0.1 0 M29 29 l12 12'], ['Site audit', 'M24 6 l16 6 v12 c0 10 -7 16 -16 20 c-9 -4 -16 -10 -16 -20 v-12 z M17 24 l5 5 l9 -10'], ['Competitor reports', 'M8 40 V22 M20 40 V12 M32 40 V26 M44 40 V8'], ['PR tracking', 'M10 30 h6 l16 10 V8 L16 18 h-6 z'], ['Business inquiries', 'M6 12 h36 v24 h-36 z M6 12 l18 14 l18 -14'], ['Approvals', 'M8 26 l10 10 l22 -24']];
export const Carousel: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  // centred card follows the voice: "Trends" ... "AI insight" ... "keyword strategy" ... "and a lot more"
  const KEY: [number, number][] = [[0, -0.15], [0.2, 0], [0.95, 0], [1.2, 1], [2.0, 1], [2.25, 2], [3.2, 2], [dur / 30, FEAT.length - 1]];
  const pos = interpolate(f / 30, KEY.map((k) => k[0]), KEY.map((k) => k[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  return (
    <AbsoluteFill>
      <Mist lift={0.8} />
      {[0.0, 0.95, 2.0].map((t, i) => <Swish key={i} at={Math.round(t * 30) - 4} k={i} v={0.12} />)}
      {[0, 1, 2, 3, 4].map((i) => <Pop key={i} at={Math.round((3.2 + i * 0.36) * 30)} k={i} v={0.12} />)}
      <div style={{position: 'absolute', inset: 0, perspective: 2000}}>
        {FEAT.map(([n, d], i) => {
          const o = i - pos, ao = Math.abs(o);
          const sc = Math.max(0.55, 1.12 - ao * 0.26);
          return (
            <div key={n} style={{position: 'absolute', left: 960 + o * 640 - 280, top: 540 - 230, width: 560, height: 460, borderRadius: 34, background: 'rgba(255,255,255,.88)', border: '2px solid #fff', ...glow(0.9), transform: `translateZ(${-ao * 200}px) rotateY(${Math.max(-40, Math.min(40, -o * 24))}deg) scale(${sc})`, opacity: Math.max(0, 1 - ao * 0.32), filter: `blur(${Math.max(0, ao - 0.5) * 3}px)`, padding: 48, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <svg width="150" height="150" viewBox="0 0 48 48"><defs><linearGradient id={`fi${i}`} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={GR} /><stop offset=".55" stopColor={CY} /><stop offset="1" stopColor="#70cbf3" /></linearGradient></defs><path d={d} fill="none" stroke={`url(#fi${i})`} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div style={{fontFamily: F.display, fontSize: 50, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05, color: INK}}>{n}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 11. Trends on the mist, the panel tilted toward us: every channel on one timeline, the spike lit across all of them.
export const Trends: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const turn = prog(f, 0, dur, (q) => q);
  return (
    <AbsoluteFill>
      <Mist lift={0.6} />
      <Swish at={2} /><Pop at={70} v={0.22} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, zIndex: 5}}><Words parts={[['Spot trends and'], ['make connections.', true]]} at={2} size={60} /></div>
      <Tilt rx={lerp(turn, 22, 12)} ry={lerp(turn, 12, 4)} cy={640}>
        <div style={{position: 'absolute', left: 210, top: 260, borderRadius: 30, ...glow(1), transform: `translateY(${(1 - spr(f, 2, S.soft)) * 140}px)`}}><MomentumPanel draw={prog(f, 6, 50)} band={prog(f, 60, 20)} spike={prog(f, 70, 20)} w={1500} /></div>
      </Tilt>
    </AbsoluteFill>
  );
};

// 12. Weekly AI report on the brand field: the card floats on light, tilted, the recommendation lifting out of it.
export const Report: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const p = spr(f, 6, S.soft);
  const rec = prog(f, 40, 20, E.snappy);
  const turn = prog(f, 0, dur, (q) => q);
  return (
    <AbsoluteFill>
      <BrandField seed={3} />
      <Swish at={6} /><Swish at={40} k={1} v={0.12} /><Pop at={44} v={0.2} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 90, zIndex: 5}}><Words parts={[['Weekly AI reports']]} at={2} size={64} color={W} /></div>
      <Tilt rx={lerp(turn, 18, 10)} ry={lerp(turn, -14, -6)} cy={600}>
        <div style={{position: 'absolute', left: 300, top: 260, width: 1320, borderRadius: 30, background: 'rgba(255,255,255,.97)', padding: '36px 46px', boxSizing: 'border-box', fontFamily: F.text, color: INK, ...glow(1.2), transform: `translateY(${(1 - p) * 120}px)`, opacity: Math.min(1, p), transformStyle: 'preserve-3d'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 44, height: 44, borderRadius: 14, background: BRAND}} /><b style={{fontSize: 20}}>Weekly AI report</b><span style={{fontSize: 15, color: MUTE, background: '#eef4f5', borderRadius: 99, padding: '5px 14px'}}>Week of 2 to 8 November</span></div>
          <div style={{fontFamily: F.display, fontSize: 44, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '24px 0', color: '#055e63'}}>Posts about factory handovers reached 2.4x the usual audience.</div>
          <div style={{marginTop: 34, borderRadius: 20, padding: 2, background: BRAND, opacity: rec, transform: `translateZ(${rec * 90}px)`, boxShadow: `0 ${30 * rec}px 60px -20px rgba(0,90,120,.4)`}}>
            <div style={{background: '#fff', borderRadius: 18, padding: '20px 24px'}}>
              <div style={{fontSize: 14, fontWeight: 700, letterSpacing: '.12em', backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>RECOMMENDATION</div>
              <div style={{fontSize: 24, fontWeight: 600, marginTop: 6, lineHeight: 1.35}}>Factory handover stories outperform everything else. Publish two more this month and lead with the timeline.</div>
            </div>
          </div>
        </div>
      </Tilt>
    </AbsoluteFill>
  );
};

// 13. The saving in the gradient on the mist; the site health card rising under it, tilted.
export const Saving: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = spr(f, 40, S.soft);
  return (
    <AbsoluteFill>
      <Mist lift={0.5} />
      <Drift dur={dur} z={0.05}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 150, transform: `translateY(${-prog(f, 36, 20, E.inOut) * 60}px)`}}>
          <Words parts={[['Save $2,000+', true]]} at={2} size={150} />
          <div style={{height: 8}} />
          <Words parts={[['on SEMrush, with our own site audit']]} at={16} size={46} weight={500} color={MUTE} stagger={2} />
        </div>
        <Tilt rx={lerp(Math.min(1, up), 40, 16)} ry={-6} cy={760}>
          <div style={{position: 'absolute', left: 600, top: 480, borderRadius: 28, ...glow(1), transform: `translateY(${(1 - Math.min(1, up)) * 300}px)`, opacity: Math.min(1, up)}}><SiteHealthPanel gauge={prog(f, 46, 40)} w={720} /></div>
        </Tilt>
      </Drift>
    </AbsoluteFill>
  );
};

// 14. All in one: the real menu, tilted, scrolls while the highlight clicks from item to item (reference 0:36).
const NAV = ['Home', 'Insights', 'Website', 'Search', 'Social', 'Email', 'PR Tracking', 'Competitive Intelligence', 'Business Inquiries', 'To Be Approved', 'PPM Statistics', 'Site Audit'];
export const AllInOne: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const raw = (f / dur) * (NAV.length - 3) + 1, base = Math.floor(raw);
  const pos = base + E.inOut(Math.min(1, Math.max(0, (raw - base - 0.55) / 0.45)));
  return (
    <AbsoluteFill>
      <Mist lift={0.2} />
      <Swish at={2} />
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 1000, background: `linear-gradient(100deg, ${GR} 0%, ${CY} 45%, #70cbf3 75%, rgba(112,203,243,0) 100%)`}} />
      <div style={{position: 'absolute', left: 140, top: 400}}><Words parts={[['All in one\ndashboard']]} at={2} size={96} color={W} align="left" /></div>
      <Tilt rx={6} ry={-22} cx={1360} cy={540}>
        <div style={{position: 'absolute', left: 1080, top: -40, bottom: -40, width: 560, background: 'rgba(255,255,255,.75)', borderLeft: '2px solid #fff', borderRight: '2px solid #fff', overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(0,90,120,.35)'}}>
          {NAV.map((n, i) => {
            const y = 580 + (i - pos) * 84;
            const on = Math.max(0, 1 - Math.abs(i - pos) * 1.6);
            return (
              <div key={n} style={{position: 'absolute', left: 40, right: 40, top: y - 32, height: 64, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', fontFamily: F.text, fontSize: 25, fontWeight: on > 0.5 ? 700 : 500, color: on > 0.5 ? W : INK, background: on > 0.02 ? `linear-gradient(90deg, rgba(10,107,95,${on}), rgba(0,185,239,${on}))` : 'transparent', opacity: Math.max(0.2, 1 - Math.abs(i - pos) * 0.16)}}>
                <span style={{width: 20, height: 20, borderRadius: 6, border: `2.2px solid ${on > 0.5 ? W : '#536a70'}`}} />{n}
              </div>
            );
          })}
        </div>
      </Tilt>
    </AbsoluteFill>
  );
};

// 15. Brand field, four live tiles in a row, turned in 3D and floating up one by one (reference 0:46).
const TT = [14, 38, 65, 104]; // "site health", "press mentions", "competitors analysis", "leads tracking"
const TILES: [string, string, string][] = [['Site health', '78', 'score, 7 up since last crawl'], ['PR articles', '14', 'this month, 3 new'], ['Competitor report', '8 of 13', 'competitors in the news'], ['Business requests', '23', 'this month']];
export const Tiles: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const turn = prog(f, 0, dur, (q) => q);
  return (
    <AbsoluteFill>
      <BrandField seed={4} />
      {TT.map((t, i) => <Pop key={i} at={t} k={i} v={0.22} />)}
      <Tilt rx={lerp(turn, 20, 10)} ry={lerp(turn, 18, 6)} cy={560}>
        {TILES.map(([a, b, c], i) => {
          const q = spr(f, TT[i], S.soft);
          return (
            <div key={a} style={{position: 'absolute', left: 180 + i * 400, top: 380, width: 360, height: 320, borderRadius: 26, background: 'rgba(255,255,255,.96)', ...glow(1), padding: 30, boxSizing: 'border-box', fontFamily: F.text, color: INK, transform: `translateY(${(1 - Math.min(1, q)) * 120}px) translateZ(${Math.sin(f / 20 + i) * 20}px)`, opacity: Math.min(1, q)}}>
              <div style={{fontSize: 21, fontWeight: 700}}>{a}</div>
              <div style={{fontFamily: F.display, fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 40, backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>{b}</div>
              <div style={{fontSize: 18, color: MUTE, marginTop: 6}}>{c}</div>
            </div>
          );
        })}
      </Tilt>
    </AbsoluteFill>
  );
};
