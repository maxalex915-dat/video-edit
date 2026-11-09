import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {useF, prog, spr, S, E, lerp, C, F, PlatformIcon, Platform, Typed, LoopGlow, AppWin, Host, TiltIn, Tilt, Callout, Streams, IconPill, Sky, Out, gradText} from './Kit';
import {Cursor, Ripple} from '../components/kit/Anim';
import {KpiCard, PlatformCard, SessionsPanel, SiteHealthPanel, FunnelPanel, RequestsChart} from '../components/ui/Panels';
import {ReportPage} from '../components/ui/Screens';
import {RealHome} from './RealHome';
import * as M from '../v4/Mid';
import * as M2 from '../v4/Mid2';
import * as SA from '../v4/Audit';
import * as S15 from '../scenes/S15';
import * as S16 from '../scenes/S16';
import * as S17 from '../scenes/S17';
import * as S18 from '../scenes/S18';
import * as S19 from '../scenes/S19';

type Cue = {at: number; s: string; v?: number};
const PS: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
const keys = (at: number, n: number, v = 0.16, step = 3): Cue[] => Array.from({length: n}).map((_, i) => ({at: at + i * step, s: `key${i % 4}`, v}));
const shift = (cs: Cue[], d: number) => cs.map((c) => ({...c, at: c.at + d})).filter((c) => c.at >= 0);

// ---------- Meet: the big white disc on the night sky, the loop glowing behind the typed name, platforms around it ----------
export const meetSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...keys(8, 10), ...PS.map((_, i) => ({at: 34 + i * 3, s: 'pop_hi', v: 0.14}))];
export const Meet: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const r = 640 * Math.min(1.02, spr(f, 0, S.soft));
  const ring = prog(f, 6, 30, E.snappy);
  const ICON: [number, number][] = [[560, 300], [1340, 270], [470, 690], [1430, 720], [780, 860], [1150, 880], [960, 180]];
  return (
    <AbsoluteFill>
      <Sky dark />
      <Out dur={dur}>
        <div style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, #ffffff 55%, #f2fbff 80%, #e2f5fd 100%)', boxShadow: '0 0 120px 10px rgba(0,185,239,.35)'}} />
        <div style={{position: 'absolute', left: 960 - r - 40, top: 540 - r - 40, width: (r + 40) * 2, height: (r + 40) * 2, borderRadius: '50%', border: '2px solid rgba(120,220,255,.6)', opacity: ring}} />
        <LoopGlow s={190} glow={0.9} style={{left: 865, top: 440, opacity: 0.5 * prog(f, 10, 20)}} />
        {ICON.map(([x, y], i) => {
          const p = spr(f, 34 + i * 3, S.pop);
          return <div key={i} style={{position: 'absolute', left: x - 34, top: y - 34 + Math.sin(f / 18 + i) * 8, transform: `scale(${Math.min(1.05, p)})`, opacity: Math.min(1, p)}}><PlatformIcon p={PS[i]} size={68} style={{borderRadius: 18, boxShadow: '0 16px 30px -12px rgba(0,60,90,.4)'}} /></div>;
        })}
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typed parts={[['Meet '], ['Marketing Dashboard', true]]} at={8} size={104} dark={false} />
        </div>
      </Out>
    </AbsoluteFill>
  );
};

// ---------- Home: the product window swings in, steeply tilted, over the night sky ----------
export const homeSfx: Cue[] = [...keys(2, 12, 0.14), {at: 30, s: 'whoosh_long', v: 0.4}, ...[50, 56, 62, 68].map((at) => ({at, s: 'pop', v: 0.18}))];
const SER = [[3, 4, 3.5, 5, 6, 5.5, 7, 8, 7.5, 9], [5, 4, 6, 5, 4.5, 6, 7, 6.5, 8, 9]];
export const Home: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const t: Tilt = {ry0: -38, rx0: 24, x0: 520, y0: 260, ry1: -9, rx1: 9, rz1: 1};
  const d = prog(f, 44, 40, E.snappy);
  const KP: [string, string, string, Platform][] = [['LinkedIn impressions', '14,210', '12%', 'li'], ['Website sessions', '7,930', '8%', 'web'], ['Search clicks', '3,480', '15%', 'search'], ['Facebook views', '9,120', '5%', 'fb']];
  return (
    <AbsoluteFill>
      <Sky dark />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center'}}>
        <Typed parts={[['Every channel. '], ['One dashboard.', true], [' Zero copy-paste.']]} at={2} size={60} dark />
      </div>
      <TiltIn t={t} at={26} dur={dur} cx={960} cy={640}>
        <div style={{position: 'absolute', left: 240, top: 200, width: 1600, height: 900, transform: 'scale(0.9)', transformOrigin: '0 0', borderRadius: 24, overflow: 'hidden', boxShadow: '0 0 0 2px rgba(120,220,255,.85), 0 0 50px -6px rgba(0,185,239,.55), 0 70px 150px -30px rgba(0,10,20,.8)'}}><RealHome at={26} /></div>
      </TiltIn>
    </AbsoluteFill>
  );
};

// ---------- A hosted product moment: the window, its headline beside it and a callout ----------
type WinP = {Old: React.FC<{dur: number}>; dark: boolean; alt?: 0 | 1 | 2; win: [number, number, number, number]; host: [number, number, number]; tilt: Tilt; head: [string, boolean?][]; hx: number; hy: number; hw: number; hs?: number; hat?: number; active?: number; from?: number; call?: {d: string; at: number; label?: string; lx?: number; ly?: number; anchor?: 'start' | 'end'}[]; streams?: boolean; align?: 'left' | 'right' | 'center'};
const winScene = (p: WinP): React.FC<{dur: number}> => ({dur}) => {
  const f = useF();
  const [wx, wy, ww, wh] = p.win;
  return (
    <AbsoluteFill>
      <Sky dark={p.dark} alt={p.alt} />
      {p.streams && <><Streams x={wx} y={wy + wh / 2} side="left" at={14} dark={p.dark} reach={Math.min(520, wx)} /><Streams x={wx + ww} y={wy + wh / 2} side="right" at={14} dark={p.dark} reach={Math.min(520, 1920 - wx - ww)} /></>}
      <TiltIn t={p.tilt} at={0} dur={dur} cx={wx + ww / 2} cy={wy + wh / 2}>
        <AppWin w={ww} h={wh} active={p.active ?? 2} dark={p.dark} style={{left: wx, top: wy}}>
          <Host C={p.Old} dur={dur} scale={p.host[0]} x={p.host[1]} y={p.host[2]} from={p.from ?? 0} />
        </AppWin>
      </TiltIn>
      {(p.call ?? []).map((c, i) => <Callout key={i} {...c} dark={p.dark} />)}
      <div style={{position: 'absolute', left: p.hx, top: p.hy, width: p.hw, textAlign: p.align ?? 'left', opacity: 1 - prog(f, dur - 8, 8)}}>
        <Typed parts={p.head} at={p.hat ?? 4} size={p.hs ?? 60} dark={p.dark} />
      </div>
    </AbsoluteFill>
  );
};

// Trends: the window on the right, the line on the left (reference 0:38).
export const trendsSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...M.m2sfx];
export const Trends = winScene({Old: M.M2, dark: true, win: [600, 230, 1250, 600], host: [0.76, -140, -102], tilt: {ry0: 34, rx0: 6, x0: 600, y0: 0, ry1: -7, rx1: 3}, head: [['Spot trends and\n'], ['make connections.', true]], hx: 80, hy: 420, hw: 520, hs: 58, hat: 120,
  call: [{d: 'M 80 690 L 380 690 Q 410 690 410 720 L 410 740 Q 410 770 440 770 L 620 770', at: 140, label: 'One post. Every channel lifts.', lx: 80, ly: 640}]});

// ---------- Live data: platforms flow into a glowing hub; fresh numbers flow out ----------
export const liveSfx: Cue[] = [...keys(2, 10, 0.14), ...PS.map((_, i) => ({at: 26 + i * 9, s: 'swoosh_soft', v: 0.12})), ...[70, 88, 106, 124].map((at) => ({at, s: 'tick', v: 0.22})), {at: 60, s: 'shimmer', v: 0.3}];
export const Live: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const HX = 820, HY = 560, HS = 330;
  const pulse = PS.reduce((m, _, i) => Math.max(m, 1 - Math.min(1, Math.abs(f - (26 + i * 9 + 34)) / 8)), 0);
  const OUTS: [string, number, Platform][] = [['LinkedIn impressions', 14210, 'li'], ['Website sessions', 7930, 'web'], ['Search clicks', 3480, 'search'], ['Facebook views', 9120, 'fb']];
  return (
    <AbsoluteFill>
      <Sky dark />
      <Out dur={dur}>
        {/* faint guide lines through the hub */}
        <svg width="1920" height="1080" style={{position: 'absolute'}}>
          {[HX - 230, HX + HS + 230].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={1080} stroke="rgba(150,220,255,.12)" />)}
          {[HY - HS / 2 - 90, HY + HS / 2 + 90].map((y) => <line key={y} x1={0} y1={y} x2={1920} y2={y} stroke="rgba(150,220,255,.12)" />)}
          <line x1={0} y1={HY} x2={HX - HS / 2} y2={HY} stroke="rgba(150,220,255,.35)" strokeDasharray="4 8" />
        </svg>
        {PS.map((p, i) => {
          const k = prog(f, 26 + i * 9, 34, E.inOut);
          const x = lerp(k, -120, HX - HS / 2 + 40), y = HY + Math.sin(k * Math.PI) * ((i % 3) - 1) * 90;
          return <div key={p} style={{position: 'absolute', left: x - 34, top: y - 34, opacity: k >= 1 ? 0 : 1, transform: `scale(${1 - Math.max(0, k - 0.8) * 4})`}}><div style={{width: 68, height: 68, borderRadius: 99, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 0 30px rgba(120,220,255,.5)'}}><PlatformIcon p={p} size={46} style={{borderRadius: 99}} /></div></div>;
        })}
        {/* the hub */}
        <div style={{position: 'absolute', left: HX - HS / 2, top: HY - HS / 2, width: HS, height: HS, borderRadius: 28, background: 'linear-gradient(160deg, rgba(40,110,130,.45), rgba(10,40,50,.55))', border: '1.5px solid rgba(140,225,255,.55)', boxShadow: `0 0 ${60 + pulse * 60}px rgba(0,185,239,${0.25 + pulse * 0.3}), inset 0 1px 0 rgba(255,255,255,.25)`, backdropFilter: 'blur(14px)', transform: `scale(${spr(f, 4, S.soft) * (1 + pulse * 0.03)})`}}>
          <div style={{position: 'absolute', left: HS / 2 - 95, top: HS / 2 - 95, width: 190, height: 190, borderRadius: '50%', background: `conic-gradient(from ${f * 4}deg, #7fbc42, #00b9ef, #70cbf3, #7fbc42)`, filter: 'blur(1px)', opacity: 0.9}} />
          <div style={{position: 'absolute', left: HS / 2 - 86, top: HS / 2 - 86, width: 172, height: 172, borderRadius: '50%', background: '#0b2229'}} />
          <LoopGlow s={110} glow={0.6 + pulse * 0.5} style={{left: HS / 2 - 55, top: HS / 2 - 55}} />
        </div>
        {/* fresh numbers out */}
        {OUTS.map(([l, v, p], i) => {
          const y = HY - 240 + i * 160, at = 64 + i * 18;
          const q = prog(f, at, 18, E.snappy);
          const tick = Math.floor(Math.max(0, f - at - 20) / 14);
          return (
            <React.Fragment key={l}>
              <Callout d={`M ${HX + HS / 2} ${HY} L ${HX + HS / 2 + 120} ${HY} Q ${HX + HS / 2 + 150} ${HY} ${HX + HS / 2 + 150} ${HY + (y - HY) * 0.2} L ${HX + HS / 2 + 150} ${y - Math.sign(y - HY) * 30} Q ${HX + HS / 2 + 150} ${y} ${HX + HS / 2 + 180} ${y} L 1340 ${y}`} at={at - 12} len={16} dark />
              <div style={{position: 'absolute', left: 1340, top: y - 52, width: 470, height: 104, borderRadius: 20, background: 'rgba(255,255,255,.93)', boxShadow: '0 0 0 1.5px rgba(120,220,255,.8), 0 30px 60px -20px rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', opacity: q, transform: `translateX(${(1 - q) * 40}px)`, fontFamily: F.text}}>
                <PlatformIcon p={p} size={46} />
                <div style={{flex: 1}}><div style={{fontSize: 16, color: C.ink3}}>{l}</div><div style={{fontSize: 34, fontWeight: 750, color: C.ink, fontVariantNumeric: 'tabular-nums'}}>{(v + tick * (7 + i * 3)).toLocaleString('en-US')}</div></div>
                <div style={{fontSize: 15, fontWeight: 700, color: '#1f8a4c', background: 'rgba(127,188,66,.15)', borderRadius: 99, padding: '6px 12px', opacity: tick > 0 ? 1 : 0}}>updated</div>
              </div>
            </React.Fragment>
          );
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', justifyContent: 'center'}}>
          <Typed parts={[['Always up to date. '], ['Automatically.', true]]} at={2} size={64} dark />
        </div>
      </Out>
    </AbsoluteFill>
  );
};

// ---------- Decisions: a small line, then the big gradient line under it, with a flare (reference 1:14) ----------
export const decSfx: Cue[] = [...keys(2, 6, 0.14, 4), {at: 36, s: 'swoosh_soft', v: 0.3}, ...keys(40, 6, 0.16, 4), {at: 70, s: 'shimmer', v: 0.3}];
export const Decisions: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, 34, 14, E.inOut);
  return (
    <AbsoluteFill>
      <Sky dark />
      <AbsoluteFill style={{background: `radial-gradient(900px 260px at ${40 + f * 0.2}% 100%, rgba(0,185,239,.45), transparent 70%), radial-gradient(500px 200px at ${70 - f * 0.15}% 0%, rgba(127,188,66,.35), transparent 70%)`}} />
      <Out dur={dur}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 500 - up * 70, display: 'flex', justifyContent: 'center'}}>
          <Typed parts={[['Turning insights']]} at={2} size={lerp(up, 76, 56)} dark weight={500} caretHold={0} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center'}}>
          {f >= 38 && <Typed parts={[['into decisions.', true]]} at={40} size={132} dark />}
        </div>
      </Out>
    </AbsoluteFill>
  );
};

// ---------- Weekly AI reports: the words part for a pill of platforms, which turns into the product; then the report ----------
const A1_AT = 70;
export const aiSfx: Cue[] = [{at: 0, s: 'shimmer', v: 0.3}, ...keys(2, 8, 0.14, 3), {at: 26, s: 'swoosh_soft', v: 0.3}, ...PS.map((_, i) => ({at: 30 + i * 2, s: 'pop_hi', v: 0.12})), {at: 50, s: 'whoosh_long', v: 0.3}, {at: A1_AT - 4, s: 'swoosh', v: 0.3}, ...shift(M2.a1sfx.slice(1), A1_AT)];
export const AiReport: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const split = prog(f, 26, 16, E.inOut);
  const gone = prog(f, A1_AT - 12, 12, E.expoIn);
  const win = prog(f, A1_AT - 6, 26, E.snappy);
  return (
    <AbsoluteFill>
      <Sky dark={false} alt={1} />
      <AbsoluteFill style={{opacity: 1 - gone, filter: `blur(${gone * 14}px)`, transform: `scale(${1 + gone * 0.2})`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 490, display: 'flex', justifyContent: 'center', gap: split * 600}}>
          <Typed parts={[['Weekly']]} at={2} size={88} dark={false} caretHold={-200} />
          <Typed parts={[['AI reports', true]]} at={2 + 7 * 1.25} size={88} dark={false} caretHold={0} />
        </div>
        {f >= 28 && <IconPill ps={PS} at={28} morph={50} label="Weekly AI report" x={960} y={545} />}
      </AbsoluteFill>
      {f >= A1_AT - 8 && <>
        <Streams x={300} y={540} side="left" at={A1_AT} />
        <Streams x={1620} y={540} side="right" at={A1_AT} />
        <div style={{opacity: win, transform: `translateY(${(1 - win) * 80}px) scale(${0.94 + win * 0.06})`, position: 'absolute', inset: 0}}>
          <AppWin w={1320} h={640} active={1} dark={false} style={{left: 300, top: 220}}>
            <Host C={M2.A1} dur={dur - A1_AT} scale={0.86} x={-204} y={-168} from={A1_AT} />
          </AppWin>
        </div>
      </>}
    </AbsoluteFill>
  );
};

// ---------- Double down: the big number on the left, the proof in the window (reference 1:06) ----------
export const ddSfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}, ...keys(4, 4, 0.2, 4), ...M2.a2sfx.slice(1)];
export const Double: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const p = prog(f, 4, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Sky dark={false} alt={2} />
      <TiltIn t={{ry0: 30, rx0: 4, x0: 500, y0: 0, ry1: -8, rx1: 2}} dur={dur} cx={1330} cy={560}>
        <AppWin w={1130} h={650} active={3} dark={false} style={{left: 740, top: 220}}>
          <Host C={M2.A2} dur={dur} scale={0.85} x={-303} y={-143} />
        </AppWin>
      </TiltIn>
      <div style={{position: 'absolute', left: 100, top: 280, opacity: p, filter: `blur(${(1 - p) * 12}px)`}}>
        <div style={{fontFamily: F.display, fontSize: 190, fontWeight: 650, letterSpacing: '-0.05em', lineHeight: 1, ...gradText(false)}}>{(2.4 * prog(f, 4, 30, E.snappy)).toFixed(1)}x</div>
        <div style={{fontFamily: F.display, fontSize: 30, fontWeight: 500, color: C.ink3, marginTop: 6, width: 560}}>usual reach for factory handover posts</div>
      </div>
      <div style={{position: 'absolute', left: 100, top: 580, width: 600}}>
        <Typed parts={[['Know what works. '], ['Double down.', true]]} at={30} size={62} dark={false} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- Keywords: searches orbit the logo (reference 0:34), then the strategy in the window ----------
const KWS = ['design and build company', 'factory construction vietnam', 'office fit-out', 'construction consultancy', 'factory design and build', 'industrial park construction'];
const A3_AT = 90;
export const kwSfx: Cue[] = [{at: 0, s: 'shimmer', v: 0.3}, ...keys(2, 10, 0.14), ...KWS.map((_, i) => ({at: 24 + i * 8, s: 'pop', v: 0.18})), {at: A3_AT - 6, s: 'whoosh_long', v: 0.35}, ...shift(M2.a3sfx.slice(1), A3_AT - 70).filter((c) => c.at >= A3_AT)];
export const Keywords: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const gone = prog(f, A3_AT - 14, 14, E.expoIn);
  const win = prog(f, A3_AT - 4, 26, E.snappy);
  const ring = prog(f, 4, 30, E.snappy);
  return (
    <AbsoluteFill>
      <Sky dark={false} alt={2} />
      <AbsoluteFill style={{opacity: 1 - gone, filter: `blur(${gone * 14}px)`, transform: `scale(${1 + gone * 0.25})`}}>
        <svg width="1920" height="1080" style={{position: 'absolute'}}>
          <defs><linearGradient id="orb" x1="0" x2="1"><stop offset="0" stopColor="#7fbc42" /><stop offset="1" stopColor="#00b9ef" /></linearGradient></defs>
          <circle cx={960} cy={590} r={250} fill="none" stroke="url(#orb)" strokeWidth={2.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ring} transform={`rotate(${-90 + f * 0.6} 960 590)`} />
        </svg>
        <div style={{position: 'absolute', left: 960 - 130, top: 590 - 130, width: 260, height: 260, borderRadius: '50%', background: '#fff', boxShadow: '0 30px 80px -20px rgba(0,120,170,.35)', transform: `scale(${spr(f, 2, S.soft)})`}} />
        <LoopGlow s={150} glow={0.5} style={{left: 885, top: 515}} />
        {KWS.map((k, i) => {
          const a = (i / KWS.length) * Math.PI * 2 + f * 0.006, R = 430 + (i % 2) * 70;
          const x = 960 + Math.cos(a) * R * 1.35, y = 590 + Math.sin(a) * R * 0.62;
          const q = prog(f, 24 + i * 8, 18, E.snappy);
          return <div key={k} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.9 + q * 0.1})`, opacity: q, filter: `blur(${(1 - q) * 10}px)`, fontFamily: F.display, fontSize: 38 - (i % 3) * 4, fontWeight: 500, letterSpacing: '-0.02em', color: C.ink, whiteSpace: 'nowrap', background: 'rgba(255,255,255,.7)', borderRadius: 99, padding: '10px 26px', boxShadow: '0 0 0 1.5px rgba(120,220,255,.7)'}}>“{k}”</div>;
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center'}}>
          <Typed parts={[['What visitors search to '], ['find you.', true]]} at={2} size={64} dark={false} />
        </div>
      </AbsoluteFill>
      {f >= A3_AT - 6 && <>
        <div style={{position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center'}}>
          <Typed parts={[['Turn rankings into a '], ['keyword strategy.', true]]} at={A3_AT + 30} size={60} dark={false} />
        </div>
        <div style={{opacity: win, transform: `translateY(${(1 - win) * 80}px)`, position: 'absolute', inset: 0}}>
          <AppWin w={1560} h={680} active={4} dark={false} style={{left: 180, top: 200}}>
            <Host C={M2.A3} dur={dur} scale={0.88} x={-108} y={-182} from={A3_AT - 70} />
          </AppWin>
        </div>
      </>}
    </AbsoluteFill>
  );
};

// ---------- Site audit intro: the big gradient line over a card tilted toward us (reference 1:10) ----------
export const sa1Sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...keys(2, 8, 0.15, 3)];
export const AuditIntro: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Sky dark />
      <AbsoluteFill style={{background: 'radial-gradient(700px 300px at 62% 52%, rgba(127,188,66,.35), transparent 70%)'}} />
      <TiltIn t={{ry0: -6, rx0: 52, x0: 0, y0: 500, ry1: -6, rx1: 26, rz1: 2}} at={6} len={28} dur={dur} cx={960} cy={760} out={false}>
        <div style={{position: 'absolute', left: 560, top: 420}}><SiteHealthPanel gauge={prog(f, 14, 40)} w={820} /></div>
      </TiltIn>
      <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center'}}>
        <Typed parts={[['In-house '], ['site audit tool', true]]} at={2} size={104} dark cps={30} />
      </div>
    </AbsoluteFill>
  );
};

// SEMrush saving: the number big on the left, the cancelled renewal on the right.
export const sa2Sfx: Cue[] = [...keys(2, 6, 0.18, 3), ...SA.sa2sfx];
export const Saving: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Sky dark={false} alt={0} />
      <TiltIn t={{ry0: 28, rx0: 6, x0: 400, y0: 0, ry1: -10, rx1: 3}} dur={dur} cx={1350} cy={560}>
        <div style={{position: 'absolute', left: 840, top: 280, width: 960, height: 520, borderRadius: 28, overflow: 'hidden', background: 'rgba(255,255,255,.55)', boxShadow: '0 0 0 1.5px rgba(120,220,255,.9), 0 50px 120px -40px rgba(0,100,140,.45)', backdropFilter: 'blur(16px)'}}>
          <Host C={SA.SA2} dur={dur} scale={1.15} x={-641} y={-480} />
        </div>
      </TiltIn>
      <div style={{position: 'absolute', left: 100, top: 330, width: 680}}>
        <Typed parts={[['Save '], ['$2,000+', true]]} at={2} size={128} dark={false} caretHold={0} />
        {f >= 22 && <Typed parts={[['on SEMrush subscription.']]} at={22} size={52} dark={false} weight={500} style={{marginTop: 18}} />}
      </div>
    </AbsoluteFill>
  );
};

// Site health dashboard in the window, the headline left, callouts (reference 0:38).
export const sa3Sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...SA.sa3sfx];
export const AuditDash = winScene({Old: SA.SA3, dark: true, win: [620, 240, 1240, 600], host: [0.66, -78, -100], tilt: {ry0: 30, rx0: 8, x0: 500, y0: 60, ry1: -8, rx1: 3}, head: [['Site health and\n'], ['AI search health.', true]], hx: 80, hy: 330, hw: 500, hs: 64, active: 2,
  call: [{d: 'M 90 720 L 420 720 Q 450 720 450 750 L 450 830 Q 450 860 480 860 L 660 860', at: 100, label: 'Issues sorted by category', lx: 90, ly: 670}]});

// Audit features: words orbit the logo, then gather into the line.
const FEAT: [string, boolean][] = [['Expert review by AI', true], ['AI search readiness', true], ['Core Web Vitals', false], ['Page explorer', false], ['Content audit', false], ['Keyword opportunities', true], ['Live tasks for the team', false], ['AI handover files', true], ['A new crawl every two weeks', false]];
const FP = 9, GATHER = FEAT.length * FP + 4;
export const sa4Sfx: Cue[] = [...FEAT.map((_, i) => ({at: i * FP, s: i % 2 ? 'pop_hi' : 'pop', v: 0.25})), {at: GATHER, s: 'whoosh_long', v: 0.35}, {at: GATHER + 10, s: 'impact', v: 0.35}, ...keys(GATHER + 8, 8, 0.14)];
export const Features: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const g = prog(f, GATHER, 14, E.expoIn);
  return (
    <AbsoluteFill>
      <Sky dark />
      <Out dur={dur}>
        <LoopGlow s={170} glow={0.9 + g} style={{left: 875, top: 455 - prog(f, GATHER + 4, 16, E.inOut) * 200, transform: `scale(${spr(f, 0, S.soft) * (1 - prog(f, GATHER + 4, 16, E.inOut) * 0.4)})`}} />
        {FEAT.map(([w, acc], i) => {
          const a = -Math.PI / 2 + (i / FEAT.length) * Math.PI * 2 + f * 0.008;
          const R = 330 + (i % 3) * 60;
          const q = prog(f, i * FP, 14, E.snappy);
          const x = lerp(g, 960 + Math.cos(a) * R * 1.75, 960), y = lerp(g, 540 + Math.sin(a) * R * 0.95, 540);
          return <div key={w} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${(0.85 + q * 0.15) * (1 - g * 0.8)})`, opacity: q * (1 - g), filter: `blur(${(1 - q) * 12 + g * 10}px)`, fontFamily: F.display, fontSize: 46, fontWeight: 500, letterSpacing: '-0.025em', whiteSpace: 'nowrap', ...(acc ? gradText(true) : {color: '#fff'})}}>{w}</div>;
        })}
        {f >= GATHER + 6 && <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}><Typed parts={[['All in-house. '], ['All yours.', true]]} at={GATHER + 8} size={104} dark /></div>}
      </Out>
    </AbsoluteFill>
  );
};

// ---------- Competitors: the monthly report swings in steeply; download it ----------
const DL = 76;
export const compSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...keys(4, 10, 0.14), {at: DL, s: 'click', v: 0.5}, {at: DL + 18, s: 'success', v: 0.35}];
export const Competitors: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const dl = prog(f, DL + 2, 16, E.inOut);
  return (
    <AbsoluteFill>
      <Sky dark />
      <AbsoluteFill style={{background: 'radial-gradient(600px 400px at 70% 40%, rgba(0,185,239,.3), transparent 70%)'}} />
      <TiltIn t={{ry0: -42, rx0: 14, x0: 600, y0: 120, ry1: -16, rx1: 6, rz1: 2, s0: 0.85, s1: 1}} at={2} dur={dur} cx={1290} cy={560}>
        <div style={{position: 'absolute', left: 1290 - 900 * 0.36, top: 560 - 1270 * 0.36, width: 900, height: 1270, transform: 'scale(0.72)', transformOrigin: '0 0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 0 0 2px rgba(120,220,255,.8), 0 0 50px rgba(0,185,239,.4), 0 80px 160px -40px rgba(0,0,0,.8)'}}><ReportPage fill={prog(f, 18, 30)} /></div>
      </TiltIn>
      <div style={{position: 'absolute', left: 100, top: 400, width: 640}}>
        <Typed parts={[['Competitor moves, '], ['every month.', true]]} at={4} size={76} dark />
      </div>
      <div style={{position: 'absolute', left: 100, top: 640, overflow: 'hidden', background: '#fff', color: C.ink, borderRadius: 99, padding: '16px 30px', fontFamily: F.text, fontSize: 24, fontWeight: 700, opacity: prog(f, 40, 12), boxShadow: '0 0 0 1.5px rgba(120,220,255,.9), 0 0 30px rgba(0,185,239,.35)'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${dl * 100}%`, background: 'linear-gradient(90deg,#7fbc42,#00b9ef)'}} />
        <span style={{position: 'relative', color: dl > 0.5 ? '#fff' : C.ink}}>{dl >= 1 ? '✓ Saved as PDF' : 'Download the PDF'}</span>
      </div>
      <Ripple x={230} y={672} at={DL} />
      <Cursor path={[{f: 44, x: 700, y: 900}, {f: DL - 4, x: 220, y: 668}, {f: dur, x: 260, y: 720}]} clicks={[DL]} show={44} />
    </AbsoluteFill>
  );
};

// ---------- Offices: the globe on the night sky, the line beside it ----------
export const offSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...S15.sfx];
export const Offices: React.FC<{dur: number}> = ({dur}) => (
  <AbsoluteFill>
    <Sky dark />
    <Host C={S15.S15 as React.FC<{dur: number}>} dur={dur} scale={1} x={120} y={30} />
    <div style={{position: 'absolute', left: 100, top: 380, width: 700}}><Typed parts={[['Local intelligence '], ['for all 22 offices.', true]]} at={4} size={80} dark /></div>
  </AbsoluteFill>
);

// Share, PR, inquiries, approvals: four different stagings of the window.
export const shareSfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}, ...S16.sfx];
export const Share = winScene({Old: S16.S16, dark: false, alt: 1, win: [330, 190, 1260, 840], host: [1.0, -700, -47], tilt: {ry0: 0, rx0: 30, x0: 0, y0: 300, ry1: 0, rx1: 4}, head: [['One link. '], ['The whole team informed.', true]], hx: 0, hy: 80, hw: 1920, hs: 64, align: 'center', streams: true, active: 4});
export const prSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...S17.sfx];
export const Press = winScene({Old: S17.S17, dark: true, win: [80, 150, 1200, 800], host: [0.95, -702, -85], tilt: {ry0: -32, rx0: 6, x0: -500, y0: 0, ry1: 9, rx1: 3}, head: [['Never miss\n'], ['a press mention.', true]], hx: 1360, hy: 380, hw: 520, hs: 70, active: 1,
  call: [{d: 'M 1830 700 L 1500 700 Q 1470 700 1470 730 L 1470 790 Q 1470 820 1440 820 L 1270 820', at: 70, label: 'Every mention, as it lands', lx: 1830, ly: 650, anchor: 'end'}]});
export const inqSfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}, ...S18.sfx];
export const Inquiries = winScene({Old: S18.S18, dark: false, alt: 2, win: [640, 120, 1220, 840], host: [0.9, -653, -148], tilt: {ry0: 26, rx0: 14, x0: 300, y0: 200, ry1: -6, rx1: 4}, head: [['Every business lead,\n'], ['tracked. None lost.', true]], hx: 80, hy: 410, hw: 560, hs: 58, active: 3});
export const apSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...S19.sfx];
export const Approvals = winScene({Old: S19.S19, dark: true, win: [300, 290, 1320, 760], host: [1.15, -947, -221], tilt: {ry0: -4, rx0: 40, x0: 0, y0: 400, ry1: -3, rx1: 14, rz1: 1}, head: [['Approvals move faster. '], ['Nothing stuck in inboxes.', true]], hx: 0, hy: 90, hw: 1920, hs: 66, align: 'center', active: 5});

export const _keep = [Img, staticFile, gradText];

// ---------- Recap: the value in one line, the dashboard tilted under it (reference 1:10) ----------
export const recapSfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...keys(4, 12, 0.14), {at: 60, s: 'shimmer', v: 0.3}];
export const Recap: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const KP: [string, string, string, Platform][] = [['LinkedIn impressions', '14,210', '12%', 'li'], ['Website sessions', '7,930', '8%', 'web'], ['Search clicks', '3,480', '15%', 'search'], ['Facebook views', '9,120', '5%', 'fb']];
  return (
    <AbsoluteFill>
      <Sky dark />
      <AbsoluteFill style={{background: 'radial-gradient(800px 320px at 55% 62%, rgba(0,185,239,.35), transparent 70%)'}} />
      <TiltIn t={{ry0: -10, rx0: 50, x0: 0, y0: 500, ry1: -8, rx1: 24, rz1: 2}} at={4} len={30} dur={dur} cx={960} cy={800}>
        <div style={{position: 'absolute', left: 280, top: 430, width: 1600, height: 900, transform: 'scale(0.85)', transformOrigin: '0 0', borderRadius: 24, overflow: 'hidden', boxShadow: '0 0 0 2px rgba(120,220,255,.85), 0 0 50px -6px rgba(0,185,239,.55), 0 70px 150px -30px rgba(0,10,20,.8)'}}><RealHome at={-60} /></div>
      </TiltIn>
      <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center'}}>
        <Typed parts={[['Less time collecting. '], ['More time deciding.', true]]} at={4} size={92} dark />
      </div>
    </AbsoluteFill>
  );
};

// ---------- Connect: real reports fly in and circle the logo, each linked to it (reference 0:34) ----------
type Orb = {k: string; x: number; y: number; from: [number, number]; at: number; s: number; z: number; node: React.ReactElement};
export const connSfx: Cue[] = [{at: 0, s: 'shimmer', v: 0.3}, ...[8, 16, 24, 32].map((at) => ({at, s: 'whoosh_long', v: 0.2})), ...[34, 42, 50, 58].map((at) => ({at, s: 'pop', v: 0.16})), {at: 70, s: 'chime', v: 0.25}];
export const Connect: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const d = prog(f, 20, 60, E.snappy);
  const ring = prog(f, 2, 34, E.snappy);
  const pull = prog(f, dur - 16, 16, E.expoIn);
  const ORBS: Orb[] = [
    {k: 'sessions', x: 150, y: 90, from: [-900, -500], at: 8, s: 0.72, z: 0.9, node: <SessionsPanel draw={d} count={d} w={760} />},
    {k: 'li', x: 1330, y: 120, from: [900, -500], at: 16, s: 0.85, z: 1, node: <PlatformCard p="li" label="Clicks" v={2840} d="64%" series={[3, 3.4, 3.1, 3.6, 3.3, 9, 5, 3.8, 3.6, 4]} draw={d} best w={460} />},
    {k: 'funnel', x: 170, y: 650, from: [-900, 500], at: 24, s: 0.68, z: 1.05, node: <FunnelPanel fill={d} w={640} />},
    {k: 'leads', x: 1310, y: 610, from: [900, 500], at: 32, s: 0.82, z: 0.95, node: <RequestsChart draw={d} w={560} />},
  ];
  const WORDS: [string, number, number, number][] = [['Channels', 1010, 150, 30], ['Trends', 1190, 470, 38], ['Leads', 980, 905, 46], ['Connections', 470, 520, 54]];
  return (
    <AbsoluteFill>
      <Sky dark={false} alt={2} />
      <Out dur={dur}>
        <svg width="1920" height="1080" style={{position: 'absolute'}}>
          <defs><linearGradient id="cring" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#00b9ef" /><stop offset="1" stopColor="#7fbc42" /></linearGradient></defs>
          <circle cx={960} cy={540} r={200} fill="none" stroke="url(#cring)" strokeWidth={2.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ring} transform={`rotate(${-90 + f * 0.5} 960 540)`} />
          {/* each report linked to the centre */}
          {ORBS.map((o, i) => {
            const q = prog(f, o.at + 20, 18, E.inOut);
            const cx = o.x + (o.x < 960 ? 380 : 0), cy = o.y + (o.y < 540 ? 200 : 60);
            const ex = 960 + Math.sign(cx - 960) * 180, ey = 540 + Math.sign(cy - 540) * 130;
            return <path key={i} d={`M ${cx} ${cy} Q ${(cx + ex) / 2} ${cy} ${ex} ${ey}`} fill="none" stroke="rgba(0,150,200,.45)" strokeWidth={2} strokeDasharray="6 8" strokeDashoffset={-f * 1.5} opacity={q} />;
          })}
        </svg>
        {ORBS.map((o) => {
          const p = prog(f, o.at, 30, E.snappy);
          const drift = f - o.at;
          const ox = Math.sin(drift / 40 + o.at) * 10 * o.z, oy = Math.cos(drift / 46 + o.at) * 8 * o.z;
          const px = lerp(pull, 0, 960 - o.x - 200), py = lerp(pull, 0, 540 - o.y - 120);
          return (
            <div key={o.k} style={{position: 'absolute', left: o.x + (1 - p) * o.from[0] + ox + px, top: o.y + (1 - p) * o.from[1] + oy + py, transform: `scale(${o.s * (1 + (1 - p) * 0.6) * (1 - pull * 0.7)})`, transformOrigin: '0 0', opacity: Math.min(1, p * 1.5) * (1 - pull), filter: `blur(${(1 - p) * 14 + pull * 8}px)`}}>{o.node}</div>
          );
        })}
        <div style={{position: 'absolute', left: 960 - 115, top: 540 - 115, width: 230, height: 230, transform: `scale(${spr(f, 0, S.soft) * (1 + pull * 0.15)})`}}><LoopGlow s={230} glow={0.8 + pull} style={{left: 0, top: 0}} /></div>
        {WORDS.map(([w, x, y, at]) => {
          const q = prog(f, at, 16, E.snappy);
          return <div key={w} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) translateY(${(1 - q) * 20}px)`, opacity: q * (1 - pull), filter: `blur(${(1 - q) * 10}px)`, fontFamily: F.display, fontSize: 64, fontWeight: 550, letterSpacing: '-0.035em', color: C.ink, whiteSpace: 'nowrap'}}>{w}</div>;
        })}
      </Out>
    </AbsoluteFill>
  );
};
