import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S} from '../motion';
import {Mist, Words, Drift, Pop, glass} from '../look';
import {F, INK, MUTE} from '../brand';

// THE TOOL SPRAWL: frosted-glass chips (logo + name) pop in around a centred line, scattered in time and depth,
// each bobbing gently; a few blurred file names drift behind them. Then the line: "<n> different platforms".
// chips: [name, logo letter, logo colour] (or swap the letter for a real icon <Img>). Real third-party colours
// are fine on the small logo dots only; the chips themselves stay glass.
type Chip = [string, string, string];
const FILES = ['export_final_v7.xlsx', 'sessions (2).csv', 'report_FINAL.xlsx', 'insights.csv'];
export const Chaos: React.FC<{dur: number; chips: Chip[]; lead?: string; line?: [string, string]}> = ({dur, chips, lead = 'rely on', line = ['15', 'different platforms']}) => {
  const f = useF();
  const t = f / 30, n = chips.length;
  const pos = chips.map((_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + (i % 2) * 0.12, rx = 760 - (i % 3) * 70, ry = 400 - (i % 2) * 60;
    return [960 + Math.cos(a) * rx, 545 + Math.sin(a) * ry, 0.8 + ((i * 7) % 5) * 0.06];
  });
  const order = chips.map((_, i) => (i * 7) % n); // scattered pop order
  return (
    <AbsoluteFill>
      <Mist lift={0.25 + prog(f, 20, 60) * 0.35} />
      {order.map((_, i) => <Pop key={i} at={46 + i * 3} k={i} v={0.14} />)}
      <Drift dur={dur} z={0.08}>
        {FILES.map((nm, i) => {
          const q = prog(f, 60 + i * 3, 20, E.snappy);
          const [x, y] = [[230, 160], [1660, 150], [200, 900], [1700, 930]][i];
          return <div key={nm} style={{position: 'absolute', left: x - 120 + Math.sin(t + i) * 10, top: y - 22, opacity: q * 0.55, filter: 'blur(2.5px)', fontFamily: F.text, fontSize: 18, color: MUTE, background: 'rgba(255,255,255,.3)', border: '1px solid rgba(255,255,255,.75)', borderRadius: 99, padding: '8px 18px'}}>{nm}</div>;
        })}
        {chips.map(([name, letter, col], i) => {
          const [x, y, z] = pos[i];
          const q = spr(f, 46 + order.indexOf(i) * 3, S.pop);
          return (
            <div key={name} style={{position: 'absolute', left: x + Math.cos(t * 0.6 + i) * 10, top: y + Math.sin(t * 0.8 + i * 1.3) * 12, transform: `translate(-50%,-50%) scale(${Math.min(1.04, q) * z})`, opacity: Math.min(1, q), filter: z < 0.86 ? 'blur(1.2px)' : undefined, display: 'flex', alignItems: 'center', gap: 12, ...glass(), borderRadius: 99, padding: '9px 24px 9px 9px', fontFamily: F.text, fontSize: 25, fontWeight: 600, color: INK, whiteSpace: 'nowrap'}}>
              <span style={{width: 44, height: 44, borderRadius: 99, background: col, color: '#fff', fontWeight: 800, fontSize: 20, display: 'grid', placeItems: 'center'}}>{letter}</span>{name}
            </div>
          );
        })}
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {f < 38 ? <Words parts={[[lead]]} at={2} size={84} out={30} /> : <Words parts={[[line[0], true], [line[1]]]} at={41} size={92} stagger={12} />}
        </div>
      </Drift>
    </AbsoluteFill>
  );
};
