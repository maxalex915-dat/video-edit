import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, Cursor, Ripple, Drift, prog, E, useF, Cue, typed} from './common';
import {SearchPanel, KpiCard} from '../components/ui/Panels';

// Value: client intent. Click the filter, type "factory", the list narrows live.
const CLICK = 18, TYPE = 24, WORD = 'factory';
export const sfx: Cue[] = [{at: CLICK, s: 'click', v: 0.45}, ...WORD.split('').map((_, i) => ({at: TYPE + Math.round((i * 30) / 12), s: `key${i % 4}`, v: 0.45}))];
export const S09: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const q = typed(f, WORD, TYPE, 12);
  const a = prog(f, 0, 20, E.snappy), k1 = prog(f, 40, 18, E.snappy), k2 = prog(f, 46, 18, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="dots" />
      <Drift dur={dur} push={0.05} origin="1350px 480px">
        <div style={{position: 'absolute', left: 900, top: 170, opacity: a, filter: `blur(${(1 - a) * 8}px)`, transform: `translateX(${(1 - a) * 80}px)`}}><SearchPanel query={q} caret={f >= CLICK && Math.floor(f / 8) % 2 === 0} focus={f >= CLICK} /></div>
        <div style={{position: 'absolute', left: 1500, top: 840, opacity: k1, transform: `translateY(${(1 - k1) * 40}px)`}}><KpiCard label="Clicks" v="1,104" d="12.3%" icon="search" w={300} /></div>
        <div style={{position: 'absolute', left: 1180, top: 870, opacity: k2, transform: `translateY(${(1 - k2) * 40}px)`}}><KpiCard label="Average rank" v="8.4" d="1.2" w={290} /></div>
        <Ripple x={1100} y={310} at={CLICK} />
        <Cursor path={[{f: 4, x: 1300, y: 900}, {f: 15, x: 1090, y: 298}, {f: dur, x: 1150, y: 360}]} clicks={[CLICK]} show={4} />
      </Drift>
      <Headline on="grad" a="Find what clients" b="search for." size={92} style={{left: 110, top: 400}} at={2} />
    </AbsoluteFill>
  );
};
