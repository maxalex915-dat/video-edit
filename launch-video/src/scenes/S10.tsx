import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Ground, Headline, prog, E, useF, Cue} from './common';
import {InsightsScreen} from '../components/ui/Screens';
import {INSIGHT} from '../data/demo';

// Value: insight, not data. The weekly briefing writes itself.
const T0 = 24, T1 = 74;
export const sfx: Cue[] = [{at: 0, s: 'swoosh', v: 0.35}, {at: T0, s: 'shimmer', v: 0.3}, ...Array.from({length: 18}).map((_, i) => ({at: T0 + Math.round((i * (T1 - T0)) / 18), s: `key${i % 4}`, v: 0.22})), ...[96, 101, 106].map((at) => ({at, s: 'pop', v: 0.25}))];
export const S10: React.FC = () => {
  const f = useF();
  const up = prog(f, 4, 22, E.snappy);
  const tp = Math.max(0, Math.min(1, (f - T0) / (T1 - T0)));
  return (
    <AbsoluteFill>
      <Ground kind="whitegrid" />
      <Headline on="white" a="Monday’s briefing" b="is already written." size={84} align="center" style={{left: 0, width: 1920, top: 70}} at={2} />
      <div style={{position: 'absolute', left: 310, top: 340, boxShadow: '0 40px 100px -40px rgba(5,60,63,.45)', borderRadius: 26, opacity: up, transform: `translateY(${(1 - up) * 80}px) scale(${0.97 + up * 0.03})`}}>
        <InsightsScreen typed={f < T0 ? 0.0001 : tp} body={prog(f, T1 + 4, 14, E.snappy)} stats={prog(f, 94, 18)} />
      </div>
      <span style={{display: 'none'}}>{INSIGHT.sentence}</span>
    </AbsoluteFill>
  );
};
