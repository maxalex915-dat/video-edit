import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {F} from '../theme/fonts';
import {E, prog, spr, S} from '../theme/motion';
import {MomentumPanel, PlatformCard, MentionsPanel, RequestsPanel, TaskCard} from '../components/ui/Panels';
import {ReportPage} from '../components/ui/Screens';
import {Mist, Pop, Swish, glow, BRAND, INK} from './Look';

// The feature montage: the list on the right scrolls with the voice; the item being said sits in the middle at
// full strength, the others fade and blur toward the ends. On the left, the real feature for that item.
// Times (s into the scene) are when the voice says each item (the line starts 0.3 s in, played 4% faster).
const AT = [0.3, 1.95, 3.36, 4.63, 6.07, 7.59, 8.74, 9.76, 10.86];
const ITEMS = ['Cross-channel analytics', 'Social media performance', 'SEO rankings', 'AI-powered insights', 'Competitor intelligence', 'Media monitoring', 'Lead tracking', 'Task management', 'And a lot more'];
const MUTE = '#6b7f84';
const KW: [string, number, number][] = [['design and build company', 214, 2.1], ['factory construction vietnam', 168, 4.6], ['office fit-out', 131, 5.2], ['construction consultancy', 96, 6.8], ['factory design and build', 74, 7.4], ['industrial park design', 52, 11.9]];
const Glass: React.FC<{w: number; children: React.ReactNode; pad?: number}> = ({w, children, pad = 30}) => (
  <div style={{width: w, borderRadius: 28, background: 'rgba(255,255,255,.9)', ...glow(0.9), padding: pad, boxSizing: 'border-box', fontFamily: F.text, color: INK}}>{children}</div>
);
const Visual: React.FC<{k: number; f: number}> = ({k, f}) => {
  const d = prog(f, 0, 30, (q) => q);
  if (k === 0) return <div style={{position: 'relative', width: 930, height: 400}}><div style={{position: 'absolute', left: 0, top: 0, transform: 'scale(.62)', transformOrigin: '0 0', width: 1500}}><MomentumPanel draw={d} band={prog(f, 24, 14)} spike={prog(f, 30, 14)} w={1500} /></div></div>;
  if (k === 1) return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: 880}}>
      {([['li', 'Impressions', 14210, '12%'], ['fb', 'Views', 9120, '5%'], ['ig', 'Reach', 4380, '9%'], ['yt', 'Views', 2342, '44%']] as const).map(([p, l, v, dd], i) => (
        <div key={p} style={{opacity: prog(f, i * 3, 10), transform: `translateY(${(1 - prog(f, i * 3, 14, E.snappy)) * 30}px)`}}><PlatformCard p={p} label={l} v={v} d={dd} series={[3, 4, 3.5, 5, 4, 6, 5.5, 7, 6.5, 8]} draw={d} best={i === 0} w={431} /></div>
      ))}
    </div>
  );
  if (k === 2) return (
    <Glass w={860}>
      <div style={{fontSize: 24, fontWeight: 700}}>Search rankings</div><div style={{fontSize: 15, color: MUTE, marginTop: 2}}>Google Search Console, last 28 days</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 90px 90px', fontSize: 14, color: MUTE, fontWeight: 600, margin: '18px 0 6px'}}><span>Search</span><span style={{textAlign: 'right'}}>Clicks</span><span style={{textAlign: 'right'}}>Position</span></div>
      {KW.map(([q, c, r], i) => <div key={q} style={{display: 'grid', gridTemplateColumns: '1fr 90px 90px', fontSize: 19, padding: '12px 0', borderTop: '1px solid #edf2f3', opacity: prog(f, 2 + i * 2, 8)}}><span>{q}</span><span style={{textAlign: 'right'}}>{c}</span><span style={{textAlign: 'right', fontWeight: 700, color: r <= 3 ? '#2f7a4a' : r <= 10 ? '#00768f' : MUTE}}>#{r}</span></div>)}
    </Glass>
  );
  if (k === 3) return (
    <Glass w={860} pad={34}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}><span style={{width: 40, height: 40, borderRadius: 12, background: BRAND}} /><b style={{fontSize: 19}}>Weekly AI report</b></div>
      <div style={{fontFamily: F.display, fontSize: 36, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '20px 0', color: '#055e63'}}>Posts about factory handovers reached 2.4x the usual audience.</div>
      <div style={{borderRadius: 18, padding: 2, background: BRAND, opacity: prog(f, 10, 12)}}><div style={{background: '#fff', borderRadius: 16, padding: '16px 20px'}}>
        <div style={{fontSize: 13, fontWeight: 700, letterSpacing: '.12em', backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent'}}>RECOMMENDATION</div>
        <div style={{fontSize: 21, fontWeight: 600, marginTop: 6, lineHeight: 1.35}}>Publish two more handover stories this month and lead with the timeline.</div>
      </div></div>
    </Glass>
  );
  if (k === 4) return <div style={{width: 900 * 0.58, height: 1270 * 0.58, borderRadius: 20, overflow: 'hidden', ...glow(0.9)}}><div style={{transform: 'scale(.58)', transformOrigin: '0 0'}}><ReportPage fill={prog(f, 0, 30)} /></div></div>;
  if (k === 5) return <div style={{position: 'relative', width: 865, height: 520}}><div style={{position: 'absolute', transform: 'scale(.92)', transformOrigin: '0 0', width: 940}}><MentionsPanel newIn={prog(f, 6, 14)} ring={prog(f, 10, 14)} w={940} /></div></div>;
  if (k === 6) return <div style={{position: 'relative', width: 836, height: 560}}><div style={{position: 'absolute', transform: 'scale(1.1)', transformOrigin: '0 0', width: 760}}><RequestsPanel rowsIn={prog(f, 0, 24)} hl={2} w={760} /></div></div>;
  if (k === 7) return (
    <Glass w={880}>
      <div style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Tasks</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14}}>
        {[['To do', [['Fix broken internal links', 'Urgent', '#b3261e'], ['Rewrite page titles', 'Important', '#a87412']]], ['In progress', [['Add answers to service pages', 'Important', '#a87412']]], ['Done', [['Compress hero images', 'Done', '#2f7a4a']]]].map(([col, cards], ci) => (
          <div key={col as string} style={{background: '#f1f6f7', borderRadius: 16, padding: 12, minHeight: 300}}>
            <div style={{fontSize: 15, fontWeight: 700, color: MUTE, marginBottom: 10}}>{col as string}</div>
            {(cards as string[][]).map(([t, tag, tc], i) => <div key={t} style={{marginBottom: 10, opacity: prog(f, 3 + ci * 4 + i * 3, 8), transform: `translateY(${(1 - prog(f, 3 + ci * 4 + i * 3, 12, E.snappy)) * 20}px)`}}><TaskCard t={t} tag={tag} tc={tc} who={['NK', 'TR', 'AO'][ci]} /></div>)}
          </div>
        ))}
      </div>
    </Glass>
  );
  return null;
};
export const Montage: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const t = f / 30;
  // list position follows the voice: settle on each item just as it is said
  const pos = interpolate(t, AT.flatMap((a, i) => [a - 0.22, a + 0.05]).map((v, i) => Math.max(0, v + i * 0.0001)), AT.flatMap((_, i) => [i - (i ? 1 : 0), i]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const cur = Math.round(pos);
  return (
    <AbsoluteFill>
      <Mist lift={0.55} />
      {AT.map((a, i) => <React.Fragment key={i}><Pop at={Math.round(a * 30)} k={i} v={0.16} /><Swish at={Math.round(a * 30) - 6} k={i} v={0.08} /></React.Fragment>)}
      {/* left: the feature itself, tilting in with depth; the previous one falls back */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1120, height: 1080, perspective: 2000}}>
        {ITEMS.slice(0, 8).map((_, k) => {
          const at = Math.round(AT[k] * 30) - 6, next = k < 7 ? Math.round(AT[k + 1] * 30) - 6 : Math.round(AT[8] * 30) - 6;
          const lf = f - at;
          if (lf < -2 || f > next + 14) return null;
          const inn = spr(f, at, S.soft), out = prog(f, next, 14, E.inOut);
          return (
            <div key={k} style={{position: 'absolute', left: 560, top: 540, transformStyle: 'preserve-3d', transform: `translate(-50%, -50%) translateY(${(1 - Math.min(1, inn)) * 260 - out * 220}px) translateZ(${-out * 380}px) rotateY(${12 + (1 - Math.min(1, inn)) * 14}deg) rotateX(${(1 - Math.min(1, inn)) * 18 + out * 10}deg)`, opacity: Math.min(1, inn * 1.4) * (1 - out), filter: out > 0.02 ? `blur(${out * 10}px)` : undefined}}>
              <Visual k={k} f={lf} />
            </div>
          );
        })}
        {/* "and a lot more": all of them at once, fanned out in depth */}
        {f >= Math.round(AT[8] * 30) - 8 && Array.from({length: 8}).map((_, k) => {
          const q = spr(f, Math.round(AT[8] * 30) - 6 + k * 2, S.soft);
          const col = k % 4, row = Math.floor(k / 4);
          return (
            <div key={`m${k}`} style={{position: 'absolute', left: 140 + col * 230, top: 300 + row * 300 - (col % 2) * 40, width: 460, transform: `scale(${0.42 * Math.min(1, q)}) rotateY(12deg)`, transformOrigin: '0 0', opacity: Math.min(1, q), transformStyle: 'preserve-3d'}}>
              <Visual k={k} f={60} />
            </div>
          );
        })}
      </div>
      {/* right: the list */}
      <div style={{position: 'absolute', left: 1080, top: 0, width: 840, height: 1080, WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)'}}>
        {ITEMS.map((it, i) => {
          const d = i - pos, ad = Math.abs(d);
          const on = prog(f, 0, 12);
          return (
            <div key={it} style={{position: 'absolute', left: 110 + 860 - Math.cos(d * 0.19) * 860, top: 540 + Math.sin(d * 0.19) * 860 - 40, fontFamily: F.display, fontSize: 64, fontWeight: 600, letterSpacing: '-0.035em', whiteSpace: 'nowrap', transformOrigin: '0 50%', transform: `rotate(${-d * 0.19 * 57.3}deg) scale(${1 - Math.min(1, ad) * 0.12 - ad * 0.04})`, opacity: on * Math.max(0, 1 - ad * 0.38), filter: ad > 0.08 ? `blur(${Math.min(8, ad * 3)}px)` : undefined, ...(i === cur && ad < 0.5 ? {backgroundImage: BRAND, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'} : {color: INK})}}>{it}</div>
          );
        })}
      </div>
      <span style={{display: 'none'}}>{dur}</span>
    </AbsoluteFill>
  );
};
