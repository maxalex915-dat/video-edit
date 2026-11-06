import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, BigWord, ZoomThrough, Stage, Cursor, Ripple, Tip, typed, charX, prog, spr, S, E, C, F, TYPE, Cue, Center, lerp} from './util';
import {InsightsScreen, ReportPage, SharePanel} from '../components/ui/Screens';
import {PlatformCard, SearchPanel, SiteHealthPanel, MentionsPanel, RequestsPanel, BoardPanel} from '../components/ui/Panels';
import {Globe, proj} from '../components/ui/Globe';
import {Platform} from '../components/ui/Primitives';
import {SERIES} from '../data/demo';

// B11 44.6 to 47.4: the weekly briefing writes itself on the stage.
export const b11sfx: Cue[] = [{at: 0, s: 'shimmer', v: 0.3}, ...Array.from({length: 14}).map((_, i) => ({at: 10 + i * 4, s: `key${i % 4}`, v: 0.2}))];
export const B11: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <div style={{position: 'absolute', left: 110, top: 90, ...TYPE(54), opacity: prog(f, 4, 16)}}>Your Monday briefing, <span style={{backgroundImage: 'linear-gradient(95deg, #6cb434, #00aee6 60%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>written by AI</span></div>
      <Stage at={0} w={1300} h={560} x={1000} y={620} rx={12} ry={-14} rz={2} scale={1.12}>
        <InsightsScreen typed={prog(f, 8, 60)} body={prog(f, 66, 10)} stats={prog(f, 70, 14)} />
      </Stage>
    </AbsoluteFill>
  );
};

// B12 47.4 to 49.4 and B13 49.4 to 51.0: single big words on the brand field.
export const b12sfx: Cue[] = [{at: 0, s: 'impact', v: 0.45}];
export const B12: React.FC = () => <AbsoluteFill><Ground kind="field" /><BigWord text="Every Monday." at={0} shrinkAt={44} big={210} small={150} tone="white" /></AbsoluteFill>;
export const b13sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.35}];
export const B13: React.FC = () => <AbsoluteFill><Ground kind="field" /><BigWord text="And" at={0} shrinkAt={30} big={420} small={300} tone="white" /></AbsoluteFill>;

// B14 51.0 to 54.6: "when you see what works" then "You can double down", zoom through the "o" into the product.
const L2 = 'You can double down.';
export const b14sfx: Cue[] = [{at: 2, s: 'swoosh_soft', v: 0.2}, {at: 50, s: 'swoosh_soft', v: 0.25}, {at: 92, s: 'whoosh_long', v: 0.45}];
export const B14: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const ox = charX(L2, 9, 84) + 2;
  return (
    <AbsoluteFill>
      <ZoomThrough at={dur - 14} dur={14} ox={ox} oy={540 + 10} max={90}>
        <Ground kind="glow" />
        {f < 48 && <div style={{opacity: 1 - prog(f, 40, 8)}}><Line w={words('when you see what works,')} at={2} stagger={6} size={72} /></div>}
        {f >= 48 && <Line w={[['You'], ['can'], ['double', true], ['down.', true]]} at={48} stagger={6} size={84} gather={0.5} />}
      </ZoomThrough>
    </AbsoluteFill>
  );
};

// B15 54.6 to 60.1: the platforms side by side; hover, click the best, it comes forward.
const P: {p: Platform; l: string; v: number; d: string; up?: boolean}[] = [
  {p: 'li', l: 'Impressions', v: 14210, d: '18.4%'}, {p: 'fb', l: 'Views', v: 13980, d: '12.1%'}, {p: 'ig', l: 'Reach', v: 1120, d: '64.0%'},
  {p: 'yt', l: 'Views', v: 2640, d: '8.2%', up: false}, {p: 'web', l: 'Sessions', v: 7930, d: '21.5%'}, {p: 'search', l: 'Impressions', v: 29870, d: '9.7%'},
];
const CLK = 92;
export const b15sfx: Cue[] = [{at: 60, s: 'tick', v: 0.2}, {at: 76, s: 'tick', v: 0.2}, {at: CLK, s: 'click', v: 0.5}, {at: CLK + 4, s: 'swoosh_soft', v: 0.3}];
export const B15: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const pick = prog(f, CLK + 2, 26, E.snappy);
  const series = [SERIES.a, SERIES.b, [4, 5, 4, 6, 5, 7, 6, 9, 8, 12, 11, 15, 14, 19, 18, 24], SERIES.c, SERIES.b, SERIES.a];
  const pos = (i: number) => ({x: 280 + (i % 3) * 480, y: 230 + Math.floor(i / 3) * 360});
  const hov = f >= 76 ? 2 : f >= 60 ? 4 : -1;
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <AbsoluteFill style={{perspective: 2400}}>
        <div style={{position: 'absolute', inset: 0, transform: `rotateX(${10 - pick * 6}deg) rotateY(${-8 + pick * 4}deg) translateY(${-f * 0.3}px)`}}>
          {P.map((c, i) => {
            const q = prog(f, i * 4, 20, E.snappy);
            const {x, y} = pos(i);
            const best = i === 2;
            return (
              <div key={c.p} style={{position: 'absolute', left: x, top: y, zIndex: best ? 3 : 1, opacity: q * (best ? 1 : 1 - pick * 0.6), filter: `blur(${(1 - q) * 10 + (best ? 0 : pick * 3)}px)`,
                transform: `translateY(${(1 - q) * 200 - (i === hov ? 10 : 0)}px) translate(${best ? pick * -480 : 0}px, ${best ? pick * 170 : 0}px) scale(${best ? 1 + pick * 0.35 : 1})`}}>
                <PlatformCard p={c.p} label={c.l} v={c.v} d={c.d} up={c.up} draw={prog(f, 6 + i * 4, 36, E.snappy)} best={best && f >= CLK} series={series[i]} w={420} />
              </div>
            );
          })}
          <Ripple x={1450} y={300} at={CLK} />
          <Tip x={lerp(pick, 1450, 1190)} y={lerp(pick, 250, 330)} at={CLK + 4}>Best this month, +64%</Tip>
          <Cursor path={[{f: 40, x: 1200, y: 1000}, {f: 60, x: 1020, y: 640}, {f: 76, x: 1440, y: 290}, {f: CLK, x: 1450, y: 300}, {f: dur, x: 1300, y: 640}]} clicks={[CLK]} show={40} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// B16 60.1 to 64.0: macro typing in a giant search field, then pull back to the table.
const Q = 'factory';
export const b16sfx: Cue[] = [...Q.split('').map((_, i) => ({at: 14 + i * 4, s: `key${i % 4}`, v: 0.45})), {at: 58, s: 'swoosh_soft', v: 0.3}];
export const B16: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const q = typed(f, Q, 14, 7.5);
  const back = prog(f, 56, 30, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <AbsoluteFill style={{transform: `scale(${lerp(back, 3.2, 1)}) translate(${lerp(back, 220, 0)}px, ${lerp(back, 210, 0)}px)`, transformOrigin: '760px 340px'}}>
        <div style={{position: 'absolute', left: 520, top: 170}}><SearchPanel query={q} caret={Math.floor(f / 8) % 2 === 0} focus /></div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 900, ...TYPE(52), opacity: prog(f, 70, 14), filter: `blur(${(1 - prog(f, 70, 14)) * 10}px)`}}>See what clients <span style={{backgroundImage: 'linear-gradient(95deg, #6cb434, #00aee6 60%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>search for</span></div>
    </AbsoluteFill>
  );
};

// B17 64.0 to 71.0: "Save $1,200 a year." then the SEMrush renewal is cancelled and the in-house audit takes over.
const CX = 104;
export const b17sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.25}, {at: CX, s: 'click', v: 0.5}, {at: CX + 4, s: 'cash', v: 0.55}, {at: 120, s: 'swoosh', v: 0.3}, {at: 180, s: 'success', v: 0.35}];
export const B17: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const lineOut = prog(f, 52, 14, E.inOut);
  const card = prog(f, 60, 20, E.snappy);
  const strike = prog(f, CX + 2, 10, E.snappy);
  const sw = prog(f, 118, 24, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <AbsoluteFill style={{transform: `translateY(${-lineOut * 380}px) scale(${1 - lineOut * 0.4})`}}>
        <Line w={[['Save'], ['$1,200', true], ['a'], ['year.']]} at={2} stagger={6} size={96} />
      </AbsoluteFill>
      <Stage at={60} w={760} h={300} x={lerp(sw, 960, 560)} y={620} rx={10} ry={8} rz={-2} dissolve={false}>
        <div style={{width: 700, background: '#fff', borderRadius: 26, padding: 34, fontFamily: F.text, color: C.ink, boxShadow: '0 40px 80px -30px rgba(5,60,63,.4)', border: `1px solid ${C.rule}`, opacity: card}}>
          <div style={{fontSize: 16, color: C.ink3, fontFamily: F.mono, letterSpacing: '.12em'}}>{strike > 0.5 ? 'PLAN CANCELLED' : 'RENEWAL NOTICE'}</div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}><span style={{fontSize: 30, fontWeight: 700}}>SEMrush, yearly plan</span>
            <span style={{position: 'relative', fontSize: 38, fontWeight: 750, color: strike > 0.5 ? C.ink3 : C.ink}}>$1,200<span style={{position: 'absolute', left: -4, top: '52%', height: 4, width: `${strike * 108}%`, background: '#ab3527', borderRadius: 2}} /></span></div>
          <div style={{display: 'flex', gap: 12, marginTop: 24}}><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: C.inset, fontWeight: 650, fontSize: 19}}>Renew</span><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '14px 0', background: f >= CX ? C.up : C.ink, color: '#fff', fontWeight: 650, fontSize: 19}}>{f >= CX ? '✓ Cancelled' : 'Cancel plan'}</span></div>
        </div>
      </Stage>
      {f >= 116 && <Stage at={118} w={760} h={560} x={1320} y={600} rx={12} ry={-14} rz={2} dissolve={false}><SiteHealthPanel gauge={prog(f, 128, 34, E.snappy)} w={740} /></Stage>}
      {f < 118 && <><Ripple x={1150} y={712} at={CX} /><Cursor path={[{f: 76, x: 1300, y: 1000}, {f: 100, x: 1140, y: 700}]} clicks={[CX]} show={76} /></>}
    </AbsoluteFill>
  );
};

// B18 71.0 to 74.4: the competitor report arrives whole and downloads.
const DL = 64;
export const b18sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...[18, 24, 30, 36, 42].map((at) => ({at, s: 'pop', v: 0.2})), {at: DL, s: 'click', v: 0.5}, {at: DL + 18, s: 'success', v: 0.35}];
export const B18: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const dl = prog(f, DL + 2, 16, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="pearl" />
      <div style={{position: 'absolute', left: 110, top: 440, ...TYPE(64), lineHeight: 1.1, opacity: prog(f, 4, 16), filter: `blur(${(1 - prog(f, 4, 16)) * 12}px)`}}>Competitor moves,<br /><span style={{backgroundImage: 'linear-gradient(95deg, #6cb434, #00aee6 60%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>every month.</span></div>
      <Stage at={0} w={900} h={1270} x={1360} y={600} rx={16} ry={-22} rz={4} scale={0.7} dissolve={false}><div style={{boxShadow: '0 60px 120px -40px rgba(5,60,63,.4)'}}><ReportPage fill={prog(f, 16, 30)} /></div></Stage>
      <div style={{position: 'absolute', left: 1560, top: 90, overflow: 'hidden', background: C.teal, color: '#fff', borderRadius: 99, padding: '14px 26px', fontFamily: F.text, fontSize: 22, fontWeight: 700, transform: `scale(${Math.min(1, spr(f, 44, S.snap))})`}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${dl * 100}%`, background: C.up}} /><span style={{position: 'relative'}}>{dl >= 1 ? '✓ Saved' : '⬇ Download PDF'}</span>
      </div>
      <Ripple x={1670} y={118} at={DL} />
      <Cursor path={[{f: 40, x: 1500, y: 800}, {f: DL - 4, x: 1660, y: 106}]} clicks={[DL]} show={40} />
    </AbsoluteFill>
  );
};

// B19 74.4 to 78.4: a fast run of four product moments, one per beat-pair.
export const b19sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.3}, {at: 26, s: 'click', v: 0.4}, {at: 30, s: 'swoosh', v: 0.3}, {at: 52, s: 'click', v: 0.45}, {at: 60, s: 'swoosh', v: 0.3}, {at: 72, s: 'chime', v: 0.45}, {at: 90, s: 'swoosh', v: 0.3}, {at: 106, s: 'click', v: 0.45}, {at: 110, s: 'success', v: 0.35}];
export const B19: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const seg = f < 30 ? 0 : f < 60 ? 1 : f < 90 ? 2 : 3;
  const l = f - seg * 30;
  const cap = ['22 offices, every local competitor', 'One link, the whole team informed', 'Never miss a press mention', 'Every business lead, tracked'][seg];
  const th = proj(15.9, 101, 20, 70, 380);
  return (
    <AbsoluteFill>
      <Ground kind={seg % 2 ? 'glow' : 'field'} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', ...TYPE(54, seg % 2 ? 'ink' : 'white'), opacity: prog(l, 0, 8), filter: `blur(${(1 - prog(l, 0, 8)) * 10}px)`}}>{cap}</div>
      {seg === 0 && <Center style={{top: 120}}><div style={{transform: `scale(${0.9 + prog(l, 0, 30) * 0.1})`}}><Globe lon0={lerp(prog(l, 0, 30, E.inOut), 40, 70)} R={380} pins={Math.round(22 * prog(l, 0, 22))} arcs={prog(l, 10, 18)} hl={l > 26 ? 'Thailand' : undefined} /></div></Center>}
      {seg === 1 && <Stage at={30} w={760} h={330} x={960} y={600} rx={10} ry={-8} rz={1} scale={1.4} dissolve={false}><SharePanel days={1} copied={l >= 22} /></Stage>}
      {seg === 2 && <Stage at={60} w={940} h={600} x={960} y={640} rx={14} ry={-6} rz={1} scale={1.05} dissolve={false}><MentionsPanel newIn={prog(l, 10, 14, E.snappy)} /></Stage>}
      {seg === 3 && <Stage at={90} w={760} h={560} x={960} y={620} rx={12} ry={-8} rz={1} scale={1.15} dissolve={false}><RequestsPanel won={l >= 16} rowsIn={1} /></Stage>}
    </AbsoluteFill>
  );
};
