import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S} from '../motion';
import {Mist, Pop, Swish} from '../look';
import {F, GRAD, INK} from '../brand';

// FEATURE MONTAGE ("and a lot more"): the list on the right sits on a big wheel. The item being said sits in the
// middle, in the brand gradient, stepped out to the left; the others turn away along the circle, fading and blurring
// toward the ends. On the left, the real feature for that item tilts in with depth; the previous one falls back
// into the distance. The last item ("And a lot more") fans out every visual at once.
// at = seconds into the scene when the voice SAYS each item (measure with scripts/vo_words.py; never guess).
export const Montage: React.FC<{dur: number; items: string[]; at: number[]; visual: (k: number, f: number) => React.ReactNode}> = ({dur, items, at, visual}) => {
  const f = useF();
  const t = f / 30;
  const pos = interpolate(t, at.flatMap((a) => [a - 0.22, a + 0.05]).map((v, i) => Math.max(0, v + i * 0.0001)), at.flatMap((_, i) => [i - (i ? 1 : 0), i]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const cur = Math.round(pos), last = items.length - 1;
  const fr = (i: number) => Math.round(at[i] * 30) - 6;
  return (
    <AbsoluteFill>
      <Mist lift={0.55} />
      {at.map((a, i) => <React.Fragment key={i}><Pop at={Math.round(a * 30)} k={i} v={0.16} /><Swish at={Math.round(a * 30) - 6} k={i} v={0.08} /></React.Fragment>)}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1120, height: 1080, perspective: 2000}}>
        {items.slice(0, last).map((_, k) => {
          const st = fr(k), next = fr(k + 1);
          if (f < st - 2 || f > next + 14) return null;
          const inn = spr(f, st, S.soft), out = prog(f, next, 14, E.inOut);
          return (
            <div key={k} style={{position: 'absolute', left: 560, top: 540, transformStyle: 'preserve-3d', transform: `translate(-50%, -50%) translateY(${(1 - Math.min(1, inn)) * 260 - out * 220}px) translateZ(${-out * 380}px) rotateY(${12 + (1 - Math.min(1, inn)) * 14}deg) rotateX(${(1 - Math.min(1, inn)) * 18 + out * 10}deg)`, opacity: Math.min(1, inn * 1.4) * (1 - out), filter: out > 0.02 ? `blur(${out * 10}px)` : undefined}}>
              {visual(k, f - st)}
            </div>
          );
        })}
        {f >= fr(last) - 2 && Array.from({length: last}).map((_, k) => {
          const q = spr(f, fr(last) + k * 2, S.soft), col = k % 4, row = Math.floor(k / 4);
          return <div key={`m${k}`} style={{position: 'absolute', left: 140 + col * 230, top: 300 + row * 300 - (col % 2) * 40, width: 460, transform: `scale(${0.42 * Math.min(1, q)}) rotateY(12deg)`, transformOrigin: '0 0', opacity: Math.min(1, q)}}>{visual(k, 60)}</div>;
        })}
      </div>
      <div style={{position: 'absolute', left: 1080, top: 0, width: 840, height: 1080, WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)'}}>
        {items.map((it, i) => {
          const d = i - pos, ad = Math.abs(d);
          // a true circle of radius 1700 whose centre is far to the right: items are spokes, turning away
          return (
            <div key={it} style={{position: 'absolute', left: 110 + 1700 - Math.cos(d * 0.092) * 1700 - Math.max(0, 1 - ad) * 70, top: 540 + Math.sin(d * 0.092) * 1700 - 40, fontFamily: F.display, fontSize: 64, fontWeight: 600, letterSpacing: '-0.035em', whiteSpace: 'nowrap', transformOrigin: '0 50%', transform: `rotate(${-d * 0.092 * 57.3}deg) scale(${1 - Math.min(1, ad) * 0.12 - ad * 0.04})`, opacity: prog(f, 0, 12) * Math.max(0, 1 - ad * 0.38), filter: ad > 0.08 ? `blur(${Math.min(8, ad * 3)}px)` : undefined, ...(i === cur && ad < 0.5 ? {backgroundImage: GRAD, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'} : {color: INK})}}>{it}</div>
          );
        })}
      </div>
      <span style={{display: 'none'}}>{dur}</span>
    </AbsoluteFill>
  );
};
