import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, prog, spr, S, E, C, F, useF, Cue, lerp} from './common';
import {Globe, proj} from '../components/ui/Globe';

// Value: every office covered. The globe turns, 22 offices light up west to east, click Thailand.
const CLICK = 100, R = 480, GX = 1280, GY = 540;
export const sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.3}, ...Array.from({length: 11}).map((_, i) => ({at: 20 + i * 5, s: 'tick', v: 0.18})), {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 3, s: 'pop', v: 0.35}];
export const S13: React.FC = () => {
  const f = useF();
  const rot = prog(f, 0, 90, E.inOut);
  const lon0 = lerp(rot, 10, 70);
  const th = proj(15.9, 101, 20, 70, R);
  const tx = GX + th.x, ty = GY + th.y;
  const card = spr(f, CLICK + 3, S.snap);
  return (
    <AbsoluteFill>
      <Ground kind="grid3d" />
      <div style={{position: 'absolute', left: GX - R - 300, top: GY - R - 100, transform: `scale(${0.9 + prog(f, 0, 30, E.snappy) * 0.1})`, transformOrigin: `${R + 300}px ${R + 100}px`}}>
        <Globe lon0={lon0} R={R} pins={Math.round(22 * prog(f, 16, 60))} arcs={prog(f, 60, 34, E.snappy)} labels={f > 70 ? ['France', 'UAE', 'India', 'Vietnam', 'Kazakhstan', 'Mongolia'] : []} hl={f >= CLICK ? 'Thailand' : undefined} />
      </div>
      {f >= CLICK && (
        <div style={{position: 'absolute', left: tx - 470, top: ty + 50, width: 330, background: '#fff', borderRadius: 20, padding: 22, fontFamily: F.text, color: C.ink, boxShadow: '0 30px 60px -20px rgba(0,40,60,.5)', opacity: Math.min(1, card), transform: `scale(${0.85 + Math.min(1, card) * 0.15})`, transformOrigin: 'top left'}}>
          <div style={{fontSize: 14, fontFamily: F.mono, color: C.teal, letterSpacing: '.12em'}}>ARCHETYPE THAILAND</div>
          <div style={{fontSize: 22, fontWeight: 700, marginTop: 8}}>3 local competitors</div>
          <div style={{fontSize: 16, color: C.ink3, marginTop: 4}}>1 new development this month</div>
        </div>
      )}
      <Ripple x={tx} y={ty} at={CLICK} />
      <Headline on="grad" a="Local intelligence" b="for all 22 offices." size={88} style={{left: 110, top: 400}} at={2} />
      <Cursor path={[{f: 70, x: 1700, y: 950}, {f: 96, x: tx - 10, y: ty - 12}]} clicks={[CLICK]} show={70} />
    </AbsoluteFill>
  );
};
