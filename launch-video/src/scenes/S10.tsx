import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Tip, Drift, prog, E, useF, Cue, lerp} from './common';
import {PlatformCard} from '../components/ui/Panels';
import {Platform} from '../components/ui/Primitives';
import {SERIES} from '../data/demo';

// Value: do what works. Hover across the platforms, click the best one, it comes forward.
const P: {p: Platform; l: string; v: number; d: string; up?: boolean}[] = [
  {p: 'li', l: 'Impressions', v: 14210, d: '18.4%'}, {p: 'fb', l: 'Views', v: 13980, d: '12.1%'}, {p: 'ig', l: 'Reach', v: 1120, d: '64.0%'},
  {p: 'yt', l: 'Views', v: 2640, d: '8.2%', up: false}, {p: 'web', l: 'Sessions', v: 7930, d: '21.5%'}, {p: 'search', l: 'Impressions', v: 29870, d: '9.7%'},
];
const POS = (i: number) => ({x: 870 + (i % 3) * 345, y: 210 + Math.floor(i / 3) * 330});
const CLICK = 80;
export const sfx: Cue[] = [{at: 40, s: 'tick', v: 0.2}, {at: 54, s: 'tick', v: 0.2}, {at: 66, s: 'tick', v: 0.2}, {at: CLICK, s: 'click', v: 0.5}, {at: CLICK + 4, s: 'swoosh_soft', v: 0.3}];
export const S10: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const hov = f >= CLICK ? 2 : f >= 66 ? 2 : f >= 54 ? 4 : f >= 40 ? 0 : -1;
  const pick = prog(f, CLICK + 2, 24, E.snappy);
  const series = [SERIES.a, SERIES.b, [4, 5, 4, 6, 5, 7, 6, 9, 8, 12, 11, 15, 14, 19, 18, 24], SERIES.c, SERIES.b, SERIES.a];
  return (
    <AbsoluteFill>
      <Ground kind="whiterings" />
      <Drift dur={dur} push={0.04} origin="1350px 500px">
        {P.map((c, i) => {
          const q = prog(f, 2 + i * 3, 18, E.snappy);
          const {x, y} = POS(i);
          const best = i === 2;
          const lift = i === hov ? 1 : 0;
          return (
            <div key={c.p} style={{position: 'absolute', left: x, top: y, zIndex: best ? 3 : 1, opacity: q * (best ? 1 : 1 - pick * 0.55), filter: `blur(${(1 - q) * 8 + (best ? 0 : pick * 2)}px)`,
              transform: `translateX(${(1 - q) * 80}px) translateY(${-lift * 8 + (best ? pick * 120 : 0)}px) translateX(${best ? -pick * 300 : 0}px) scale(${1 + lift * 0.03 + (best ? pick * 0.22 : 0)})`, transformOrigin: 'center'}}>
              <PlatformCard p={c.p} label={c.l} v={c.v} d={c.d} up={c.up} draw={prog(f, 6 + i * 3, 36, E.snappy)} best={best && f >= CLICK} series={series[i]} w={320} />
            </div>
          );
        })}
        <Ripple x={1720} y={310} at={CLICK} />
        <Tip x={lerp(pick, 1730, 1440)} y={lerp(pick, 262, 340)} at={CLICK + 4} until={dur - 10}>Best this month, +64%</Tip>
        <Cursor path={[{f: 30, x: 1100, y: 1000}, {f: 40, x: 1020, y: 310}, {f: 54, x: 1370, y: 650}, {f: 66, x: 1710, y: 300}, {f: CLICK, x: 1720, y: 310}, {f: dur, x: 1500, y: 640}]} clicks={[CLICK]} show={30} />
      </Drift>
      <Headline on="white" a="See what works." b="Then do more of it." size={78} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
