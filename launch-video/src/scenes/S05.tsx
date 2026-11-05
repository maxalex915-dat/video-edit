import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, prog, spr, S, E, C, F, useF, Cue} from './common';
import {PlatformIcon, Platform} from '../components/ui/Primitives';

// Value: hours back. Seven sources check in one per beat, numbers roll up on their own.
const PS: Platform[] = ['li', 'fb', 'ig', 'yt', 'web', 'search', 'email'];
const NAMES = ['LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'Website', 'Search', 'Email'];
const VALS = [14210, 13980, 1120, 2640, 7930, 29870, 3412];
const DONE = (i: number) => 40 + i * 9;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.4}, ...PS.map((_, i) => ({at: DONE(i), s: 'tick', v: 0.35})), {at: 108, s: 'success', v: 0.35}];
export const S05: React.FC = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Ground kind="waves" />
      <Headline on="grad" a="Updates itself." b="Your hours go back to marketing." size={84} style={{left: 110, top: 120}} at={2} />
      <div style={{position: 'absolute', left: 110, top: 400, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, width: 1700}}>
        {PS.map((p, i) => {
          const q = prog(f, 8 + i * 4, 18, E.snappy), d = f >= DONE(i), ck = spr(f, DONE(i), S.pop);
          const v = Math.round(VALS[i] * prog(f, 14 + i * 4, DONE(i) - 10 - i * 4, E.glide));
          return (
            <div key={p} style={{background: '#fff', borderRadius: 24, padding: 24, fontFamily: F.text, boxShadow: '0 30px 60px -25px rgba(0,40,60,.45)', opacity: q, transform: `translateY(${(1 - q) * 50}px) scale(${0.95 + q * 0.05})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}><PlatformIcon p={p} size={44} /><span style={{fontSize: 21, fontWeight: 650, color: C.ink}}>{NAMES[i]}</span>
                <span style={{marginLeft: 'auto', width: 32, height: 32, borderRadius: 99, background: d ? C.up : 'none', border: d ? 'none' : `3px solid ${C.inset}`, borderTopColor: d ? undefined : C.cyan, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18, transform: d ? `scale(${ck})` : `rotate(${f * 14}deg)`}}>{d ? '✓' : ''}</span></div>
              <div style={{fontSize: 40, fontWeight: 750, color: C.ink, marginTop: 14, fontVariantNumeric: 'tabular-nums'}}>{v.toLocaleString('en-US')}</div>
              <div style={{fontSize: 15, color: C.ink3}}>{d ? 'updated just now' : 'updating…'}</div>
            </div>
          );
        })}
        <div style={{borderRadius: 24, border: '2px dashed rgba(255,255,255,.55)', display: 'grid', placeItems: 'center', fontFamily: F.text, color: '#fff', fontSize: 24, fontWeight: 650, opacity: prog(f, 104, 12), transform: `scale(${0.9 + prog(f, 104, 16, E.snappy) * 0.1})`}}>No one typed this.</div>
      </div>
    </AbsoluteFill>
  );
};
