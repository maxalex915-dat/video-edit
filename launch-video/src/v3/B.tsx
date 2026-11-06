import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, BigWord, Brackets, Wipe, Stage, prog, spr, S, E, C, F, TYPE, ACCENT, Cue, Center} from './util';
import {MomentumPanel} from '../components/ui/Panels';
import {PlatformIcon, Platform} from '../components/ui/Primitives';

// B7 21.0 to 29.2: the bigger picture. Channel momentum on the stage, a light sweep, a side card ticks each link in the chain.
const STEPS: [string, string][] = [['LinkedIn post, 18 Oct', '3.1x impressions'], ['Website, next day', '+64% sessions'], ['Google search', '+38% clicks'], ['Business inquiries', '+3 requests']];
export const b7sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.35}, ...STEPS.map((_, i) => ({at: 70 + i * 22, s: 'tick', v: 0.35})), {at: 64, s: 'shimmer', v: 0.25}];
export const B7: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const sweep = prog(f, 20, 60, E.inOut);
  const card = prog(f, 50, 22, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Stage at={0} w={1500} h={720} x={1080} y={560} rx={14} ry={-20} rz={2} scale={0.95}>
        <MomentumPanel draw={prog(f, 8, 40, E.snappy)} band={prog(f, 60, 12)} spike={prog(f, 70, 88)} />
      </Stage>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${-30 + sweep * 130}%, rgba(255,255,255,.75) ${-20 + sweep * 130}%, transparent ${-8 + sweep * 130}%)`, mixBlendMode: 'screen', pointerEvents: 'none'}} />
      <div style={{position: 'absolute', left: 110, top: 300, width: 520, background: 'rgba(255,255,255,.92)', borderRadius: 24, padding: 30, boxShadow: '0 40px 90px -30px rgba(5,60,63,.35)', border: `1px solid ${C.rule}`, fontFamily: F.mono, opacity: card, filter: `blur(${(1 - card) * 10}px)`, transform: `translateX(${(1 - card) * -60}px)`}}>
        <div style={{fontFamily: F.text, fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 16}}>One post, every channel</div>
        {STEPS.map(([a, b], i) => {
          const k = prog(f, 70 + i * 22, 12, E.snappy);
          return (
            <div key={a} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? `1px solid ${C.rule}` : 'none', opacity: 0.25 + k * 0.75}}>
              <span style={{width: 26, height: 26, borderRadius: 7, background: k > 0.5 ? C.up : C.inset, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 15, fontFamily: F.text}}>{k > 0.5 ? '✓' : ''}</span>
              <div><div style={{fontSize: 17, color: C.ink}}>{a}</div><div style={{fontSize: 15, ...ACCENT, fontWeight: 600}}>{b}</div></div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// B8 29.2 to 33.0: "Every channel, { connected }" then words fall away, { connected } remains and becomes a sync bar.
export const b8sfx: Cue[] = [{at: 4, s: 'swoosh_soft', v: 0.25}, {at: 50, s: 'tick', v: 0.25}, {at: 92, s: 'swoosh', v: 0.35}];
export const B8: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const bar = prog(f, 88, 16, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <div style={{opacity: 1 - prog(f, 86, 6)}}><Line w={[['Every'], ['channel,'], ['{ connected }', true]]} at={2} stagger={7} size={80} spreadOut={50} keep={2} /></div>
      {f >= 84 && (
        <Center>
          <div style={{width: 120 + bar * 1080, height: 70 + bar * 40, borderRadius: 20, background: 'linear-gradient(95deg, #7fbc42, #00b9ef 55%, #70cbf3)', boxShadow: '0 30px 70px -20px rgba(0,140,190,.5)', transform: `translateX(${(1 - bar) * 300}px)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 34px', overflow: 'hidden'}}>
            <div style={{fontFamily: F.mono, fontSize: 30, color: '#fff', opacity: prog(f, 98, 10), filter: `blur(${(1 - prog(f, 98, 10)) * 8}px)`, whiteSpace: 'nowrap'}}>syncing 7 sources...</div>
            <div style={{height: 8, borderRadius: 9, background: 'rgba(255,255,255,.35)', marginTop: 12, opacity: prog(f, 100, 8)}}><div style={{width: `${prog(f, 100, 20) * 30}%`, height: '100%', borderRadius: 9, background: '#fff'}} /></div>
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};

// B9 33.0 to 39.6: the bar becomes the header of the sync card; each source reports in, typed.
const SRC: [Platform, string][] = [['li', 'LinkedIn'], ['fb', 'Facebook'], ['ig', 'Instagram'], ['yt', 'YouTube'], ['web', 'Website (GA4)'], ['search', 'Google Search'], ['email', 'Email']];
export const b9sfx: Cue[] = [...SRC.map((_, i) => ({at: 22 + i * 18, s: 'tick', v: 0.3})), {at: 156, s: 'success', v: 0.4}];
export const B9: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const card = prog(f, 0, 20, E.snappy);
  const pct = Math.min(100, Math.round(prog(f, 0, 150, E.glide) * 100));
  const drift = f * 0.15;
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Center>
        <div style={{width: 1200, borderRadius: 26, overflow: 'hidden', background: 'rgba(255,255,255,.95)', boxShadow: '0 50px 110px -40px rgba(5,60,63,.4)', border: `1px solid ${C.rule}`, transform: `translateY(${-drift}px) perspective(2000px) rotateX(${8 - card * 4}deg)`}}>
          <div style={{background: 'linear-gradient(95deg, #7fbc42, #00b9ef 55%, #70cbf3)', padding: '26px 34px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 30, color: '#fff'}}><span>{pct < 100 ? 'syncing 7 sources...' : 'all 7 sources up to date'}</span><span>{pct}%</span></div>
            <div style={{height: 8, borderRadius: 9, background: 'rgba(255,255,255,.35)', marginTop: 12}}><div style={{width: `${pct}%`, height: '100%', borderRadius: 9, background: '#fff'}} /></div>
          </div>
          <div style={{padding: '18px 34px 26px', maxHeight: card * 700}}>
            {SRC.map(([p, n], i) => {
              const k = prog(f, 14 + i * 18, 10, E.snappy), done = f >= 22 + i * 18;
              const line = `fetching ${n}...`;
              const typedN = Math.max(0, Math.floor(((f - 14 - i * 18) / 30) * 40));
              return (
                <div key={p} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '9px 0', opacity: k, fontFamily: F.mono, fontSize: 23, color: C.ink2}}>
                  <PlatformIcon p={p} size={32} />
                  <span style={{flex: 1}}>{line.slice(0, typedN)}</span>
                  {done && <span style={{color: C.up, fontWeight: 600, transform: `scale(${spr(f, 22 + i * 18, S.pop)})`}}>done ✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      </Center>
    </AbsoluteFill>
  );
};

// B10 39.6 to 44.6: brand field. "it turns" big, then "it turns the numbers into", then [ decisions ] closes, wipe.
export const b10sfx: Cue[] = [{at: 0, s: 'impact', v: 0.5}, {at: 30, s: 'swoosh_soft', v: 0.25}, {at: 76, s: 'pop', v: 0.3}, {at: 118, s: 'swoosh', v: 0.35}, {at: 134, s: 'whoosh_long', v: 0.4}];
export const B10: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      {f < 30 && <BigWord text="it turns" at={0} shrinkAt={22} big={300} small={84} tone="white" />}
      {f >= 30 && f < 74 && <div style={{opacity: 1 - prog(f, 66, 8)}}><Line w={words('it turns the numbers into')} at={30} stagger={5} size={84} tone="white" gather={0.6} /></div>}
      {f >= 74 && <Brackets text="decisions" at={74} closeAt={112} size={96} tone="white" />}
      <Wipe at={dur - 18} dur={18} />
    </AbsoluteFill>
  );
};
