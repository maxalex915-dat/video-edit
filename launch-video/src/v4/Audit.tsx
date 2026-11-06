import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF, Ground, Line, words, Stage, Cursor, Ripple, prog, spr, S, E, C, F, TYPE, ACCENT, Cue, Center, lerp} from '../v3/util';
import {Gauge} from '../components/ui/Screens';
import {fmt} from '../components/kit/Type';

const TOP: React.CSSProperties = {top: 34, bottom: 'auto', height: 180};

// SA1: introduce the tool.
export const sa1sfx: Cue[] = [{at: 0, s: 'impact', v: 0.4}, {at: 8, s: 'shimmer', v: 0.3}];
export const SA1: React.FC = () => {
  const f = useF();
  const ic = spr(f, 2, S.pop);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <Center style={{top: -120}}><div style={{width: 110, height: 110, borderRadius: 30, background: '#fff', display: 'grid', placeItems: 'center', transform: `scale(${ic})`, boxShadow: '0 20px 50px -14px rgba(0,60,90,.4)'}}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#055e63" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /><path d="M8.5 11.2l1.8 1.8 3.4-3.6" stroke="#00b9ef" /></svg>
      </div></Center>
      <AbsoluteFill style={{transform: 'translateY(70px)'}}><Line w={words('In-house site audit tool')} at={8} stagger={6} size={92} tone="white" /></AbsoluteFill>
    </AbsoluteFill>
  );
};

// SA2: "Save $2,000+ on SEMrush subscription": the renewal is cancelled.
const CX = 76;
export const sa2sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.25}, {at: CX, s: 'click', v: 0.5}, {at: CX + 4, s: 'cash', v: 0.55}];
export const SA2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const card = prog(f, 22, 20, E.snappy);
  const strike = prog(f, CX + 2, 10, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Line w={[['Save'], ['$2,000+', true], ['on'], ['SEMrush'], ['subscription.']]} at={2} stagger={6} size={78} style={{top: 120, bottom: 'auto', height: 200}} />
      <Center style={{top: 200}}>
        <div style={{width: 760, background: '#fff', borderRadius: 26, padding: 36, fontFamily: F.text, color: C.ink, boxShadow: '0 40px 80px -30px rgba(5,60,63,.4)', border: `1px solid ${C.rule}`, opacity: card, transform: `translateY(${(1 - card) * 60}px) rotate(${-2 * card}deg)`}}>
          <div style={{fontSize: 16, color: C.ink3, fontFamily: F.mono, letterSpacing: '.12em'}}>{strike > 0.5 ? 'PLAN CANCELLED' : 'RENEWAL NOTICE'}</div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12}}><span style={{fontSize: 32, fontWeight: 700}}>SEMrush, yearly plan</span>
            <span style={{position: 'relative', fontSize: 40, fontWeight: 750, color: strike > 0.5 ? C.ink3 : C.ink}}>$2,000+<span style={{position: 'absolute', left: -4, top: '52%', height: 4, width: `${strike * 108}%`, background: '#ab3527', borderRadius: 2}} /></span></div>
          <div style={{display: 'flex', gap: 12, marginTop: 26}}><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '15px 0', background: C.inset, fontWeight: 650, fontSize: 20}}>Renew</span><span style={{flex: 1, textAlign: 'center', borderRadius: 99, padding: '15px 0', background: f >= CX ? C.up : C.ink, color: '#fff', fontWeight: 650, fontSize: 20}}>{f >= CX ? '✓ Cancelled' : 'Cancel plan'}</span></div>
        </div>
      </Center>
      <Ripple x={1160} y={812} at={CX} />
      <Cursor path={[{f: 44, x: 1400, y: 1050}, {f: CX - 3, x: 1150, y: 800}, {f: dur, x: 1180, y: 830}]} clicks={[CX]} show={44} />
    </AbsoluteFill>
  );
};

// SA3: the audit dashboard. Site health and AI search health, issues by severity and by category, like SEMrush.
const CATS: [string, number, number][] = [['Crawlability', 64, 210], ['HTTPS', 3, 12], ['Site performance', 41, 188], ['Internal linking', 58, 296], ['Markup', 22, 140], ['AI search readiness', 26, 186]];
const ISSUES: [string, number, string][] = [['Broken internal links', 42, 'Error'], ['Pages returning 4xx', 12, 'Error'], ['Missing title tags', 21, 'Error'], ['Pages blocked from AI crawlers', 9, 'Error']];
const TAB = 120;
export const sa3sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, {at: 30, s: 'swoosh_soft', v: 0.2}, ...CATS.map((_, i) => ({at: 60 + i * 5, s: 'tick', v: 0.15})), {at: TAB, s: 'click', v: 0.45}, ...ISSUES.map((_, i) => ({at: TAB + 6 + i * 5, s: 'pop_hi', v: 0.2}))];
export const SA3: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const g = prog(f, 20, 40, E.snappy);
  const tab = f >= TAB;
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Line w={[['Site'], ['health'], ['and'], ['AI', true], ['search', true], ['health.', true]]} at={2} stagger={5} size={60} style={TOP} />
      <Stage at={0} w={1640} h={780} x={960} y={610} rx={9} ry={-7} rz={1} drift={0.6} dissolve={false}>
        <div style={{width: 1640, height: 780, display: 'grid', gridTemplateColumns: '520px 1fr', gap: 22, fontFamily: F.text, color: C.ink}}>
          <div style={{background: '#fff', borderRadius: 26, border: `1px solid ${C.rule}`, boxShadow: '0 30px 70px -30px rgba(5,60,63,.35)', padding: 28}}>
            <div style={{fontSize: 22, fontWeight: 700}}>Site Audit</div>
            <div style={{fontSize: 14, color: C.ink3, marginTop: 2}}>archetype-group.com, 1,240 pages crawled</div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 24}}><Gauge v={72} label="SITE HEALTH" size={220} draw={g} /><Gauge v={58} label="AI SEARCH" size={220} draw={g} /></div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 24}}>
              {[['Errors', 214, '#ab3527', '#fbecea'], ['Warnings', 1032, '#8f5d18', '#fdf3e2'], ['Notices', 610, C.ink2, C.inset]].map(([n, v, c, bg], i) => (
                <div key={n as string} style={{borderRadius: 16, padding: '14px 14px', background: bg as string, outline: tab && i === 0 ? `2.5px solid ${c}` : 'none', transform: tab && i === 0 ? 'scale(1.04)' : 'none'}}><div style={{fontSize: 30, fontWeight: 750, color: c as string, fontVariantNumeric: 'tabular-nums'}}>{fmt(Math.round((v as number) * g))}</div><div style={{fontSize: 15, color: C.ink2}}>{n}</div></div>
              ))}
            </div>
            <div style={{fontSize: 14, color: C.ink3, marginTop: 18}}>118 checks: every SEMrush site audit check, plus AI search checks</div>
          </div>
          <div style={{background: '#fff', borderRadius: 26, border: `1px solid ${C.rule}`, boxShadow: '0 30px 70px -30px rgba(5,60,63,.35)', padding: 28, position: 'relative', overflow: 'hidden'}}>
            <div style={{display: 'flex', gap: 10, marginBottom: 16}}>{['Issues by category', 'Errors', 'Warnings', 'Notices'].map((t, i) => <span key={t} style={{fontSize: 15, fontWeight: 650, borderRadius: 99, padding: '8px 16px', background: (tab ? i === 1 : i === 0) ? C.teal : C.inset, color: (tab ? i === 1 : i === 0) ? '#fff' : C.ink2}}>{t}</span>)}</div>
            <div style={{opacity: 1 - prog(f, TAB, 10)}}>
              {CATS.map(([n, e, w], i) => {
                const k = prog(f, 56 + i * 5, 20, E.snappy);
                return (
                  <div key={n} style={{display: 'grid', gridTemplateColumns: '250px 1fr 130px', alignItems: 'center', gap: 16, padding: '15px 6px', borderTop: i ? `1px solid ${C.rule}` : 'none', fontSize: 19, opacity: k, transform: `translateX(${(1 - k) * 30}px)`}}>
                    <span style={{fontWeight: 600}}>{n}</span>
                    <div style={{display: 'flex', height: 14, borderRadius: 99, overflow: 'hidden', background: C.inset}}><div style={{width: `${(e / 300) * 100 * k}%`, background: '#c0443a'}} /><div style={{width: `${(w / 300) * 100 * k}%`, background: '#e0a33a'}} /></div>
                    <span style={{textAlign: 'right', fontSize: 15, color: C.ink3}}><b style={{color: '#ab3527'}}>{e}</b> · {w}</span>
                  </div>
                );
              })}
            </div>
            {tab && <div style={{position: 'absolute', left: 28, right: 28, top: 84}}>
              {ISSUES.map(([n, v], i) => {
                const k = prog(f, TAB + 6 + i * 5, 16, E.snappy);
                return <div key={n} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 8px', borderTop: i ? `1px solid ${C.rule}` : 'none', fontSize: 20, opacity: k, transform: `translateY(${(1 - k) * 16}px)`}}>
                  <span style={{fontSize: 13, fontWeight: 700, color: '#ab3527', background: '#fbecea', borderRadius: 99, padding: '4px 10px'}}>Error</span>
                  <span style={{flex: 1, fontWeight: 600}}>{n}</span><span style={{color: C.ink3}}>{v} pages</span>
                  <span style={{fontSize: 14, fontWeight: 650, color: '#fff', background: C.teal, borderRadius: 99, padding: '6px 14px'}}>Create task</span>
                </div>;
              })}
            </div>}
          </div>
        </div>
      </Stage>
      <Ripple x={862} y={292} at={TAB} />
      <Cursor path={[{f: 80, x: 1300, y: 1050}, {f: TAB - 3, x: 852, y: 282}, {f: dur, x: 900, y: 380}]} clicks={[TAB]} show={80} />
    </AbsoluteFill>
  );
};

// SA4: word bomb. The rest of the tool, one feature per beat, punched in and out.
const WORDS: [string, boolean][] = [['Expert review by AI', true], ['AI search readiness', true], ['Core Web Vitals', false], ['Page explorer', false], ['Content audit', false], ['Keyword opportunities', true], ['Live tasks for the team', false], ['AI handover files', true], ['A new crawl every two weeks', false]];
const PER = 13;
export const sa4sfx: Cue[] = WORDS.map((_, i) => ({at: i * PER, s: i % 2 ? 'pop_hi' : 'pop', v: 0.3})).concat([{at: WORDS.length * PER + 2, s: 'impact', v: 0.4}]);
export const SA4: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const i = Math.min(WORDS.length - 1, Math.floor(f / PER));
  const l = f - i * PER;
  const fin = f >= WORDS.length * PER;
  const pin = interpolate(l, [0, 5], [1.25, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.snappy});
  const tone = i % 2 === 0;
  return (
    <AbsoluteFill>
      <Ground kind={fin ? 'field' : tone ? 'glow' : 'field'} />
      {!fin && <Center><div style={{...TYPE(110, tone ? 'ink' : 'white'), fontWeight: 650, letterSpacing: '-0.04em', transform: `scale(${pin + l * 0.004})`, filter: `blur(${l < 2 ? 6 : 0}px)`, ...(tone && WORDS[i][1] ? ACCENT : {})}}>{WORDS[i][0]}</div></Center>}
      {/* small trail of the earlier words */}
      {!fin && WORDS.slice(0, i).map(([w], k) => <div key={w} style={{position: 'absolute', left: ((k * 431) % 1500) + 80, top: k % 2 ? 140 + (k * 97) % 120 : 820 + (k * 53) % 120, ...TYPE(34, tone ? 'ink' : 'white'), opacity: 0.22}}>{w}</div>)}
      {fin && <Line w={[['All'], ['in-house.'], ['All'], ['yours.']]} at={WORDS.length * PER} stagger={5} size={100} tone="white" />}
    </AbsoluteFill>
  );
};
