import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF} from '../frame';
import {E, prog, spr, S, lerp} from '../motion';
import {Mist, Words, Drift, Pop, Swish, Tilt, glow} from '../look';
import {Cursor, Ripple, Way, cursorPos} from '../cursor';
import {F, INK, MUTE, C0, C1, C2, GRAD, inkA, shadeA} from '../brand';
import {MARK} from './logoMark';

// FEATURE IN USE: drag-and-drop shift planning. The real week rota (rebuilt as live UI) rises tilted, eases flat,
// then the cursor drags two open shifts from the tray onto the week (kanban-drag pattern: lift, travel, drop with a
// ripple and a pop). On each drop the person's hours and the labour total in the top bar count up.
// All frames are scene frames (useF). Keep every action before dur - 14 (the exit transition).
const T = {
  rise: 0, head: 2, flatFrom: 70, flatTo: 95, cursorIn: 84,
  grabA: 112, travelA: [118, 144] as const, dropA: 146,
  grabB: 178, travelB: [184, 210] as const, dropB: 212, callout: 156,
};
const W = 1520, H = 780, X0 = 200, Y0 = 236; // app frame size and screen position
const COL0 = 284, CW = (W - 24 - COL0) / 7, ROW0 = 136, RH = 88, CARD_W = CW - 12, CARD_H = RH - 20;
const DAYS = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14', 'Sat 15', 'Sun 16'];
type Role = 'kitchen' | 'floor' | 'bar';
const ROLE_COL: Record<Role, string> = {kitchen: C0, floor: C1, bar: C2};
type Shift = [day: number, time: string, role: Role, label: string];
const TEAM: {name: string; role: string; hours: number; shifts: Shift[]}[] = [
  {name: 'Maya Chen', role: 'Server', hours: 24, shifts: [[0, '11:00-17:00', 'floor', 'Server'], [1, '11:00-17:00', 'floor', 'Server'], [3, '17:00-23:00', 'floor', 'Server'], [5, '17:00-23:00', 'floor', 'Server']]},
  {name: 'Luca Romano', role: 'Chef', hours: 28, shifts: [[0, '10:00-16:00', 'kitchen', 'Chef'], [1, '10:00-16:00', 'kitchen', 'Chef'], [3, '15:00-23:00', 'kitchen', 'Chef'], [4, '15:00-23:00', 'kitchen', 'Chef']]},
  {name: 'Aisha Bello', role: 'Bartender', hours: 32, shifts: [[2, '17:00-01:00', 'bar', 'Bar'], [3, '17:00-01:00', 'bar', 'Bar'], [4, '17:00-01:00', 'bar', 'Bar'], [5, '17:00-01:00', 'bar', 'Bar']]},
  {name: 'Tom Walsh', role: 'Server', hours: 30, shifts: [[0, '17:00-23:00', 'floor', 'Server'], [2, '11:00-17:00', 'floor', 'Server'], [4, '11:00-17:00', 'floor', 'Server'], [5, '11:00-17:00', 'floor', 'Server'], [6, '11:00-17:00', 'floor', 'Server']]},
  {name: 'Sofia Garcia', role: 'Host', hours: 24, shifts: [[3, '17:00-23:00', 'floor', 'Host'], [4, '17:00-23:00', 'floor', 'Host'], [5, '17:00-23:00', 'floor', 'Host'], [6, '12:00-18:00', 'floor', 'Host']]},
  {name: 'Kenji Ito', role: 'Kitchen porter', hours: 24, shifts: [[0, '10:00-16:00', 'kitchen', 'Porter'], [1, '16:00-22:00', 'kitchen', 'Porter'], [4, '16:00-22:00', 'kitchen', 'Porter'], [5, '16:00-22:00', 'kitchen', 'Porter']]},
];
const cell = (day: number, row: number) => ({x: COL0 + day * CW + 6, y: ROW0 + row * RH + 6});
const tray = (i: number) => ({x: COL0 + 16 + i * (CARD_W + 18), y: 682});
// the two drags: open shift i in the tray -> (day, row)
const DRAGS = [
  {from: tray(0), to: cell(4, 0), time: '17:00-23:00', role: 'floor' as Role, label: 'Server', grab: T.grabA, travel: T.travelA, drop: T.dropA, row: 0, add: 92},
  {from: tray(1), to: cell(6, 1), time: '10:00-16:00', role: 'kitchen' as Role, label: 'Chef', grab: T.grabB, travel: T.travelB, drop: T.dropB, row: 1, add: 114},
];
const SALES = 30730, LABOUR = 8420;
const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US');

const ShiftCard: React.FC<{x: number; y: number; time: string; role: Role; label: string; lift?: number; ghost?: boolean}> = ({x, y, time, role, label, lift = 0, ghost}) => (
  <div style={{position: 'absolute', left: x, top: y, width: CARD_W, height: CARD_H, boxSizing: 'border-box', borderRadius: 14, padding: '10px 12px 0 16px',
    background: ghost ? 'transparent' : `linear-gradient(180deg, #fff, ${ROLE_COL[role]}14)`, border: ghost ? `2px dashed ${ROLE_COL[role]}88` : `1px solid ${ROLE_COL[role]}40`,
    boxShadow: ghost ? undefined : `0 ${4 + lift * 22}px ${10 + lift * 34}px -${6 - lift * 2}px ${shadeA(0.18 + lift * 0.2)}`,
    transform: `scale(${1 + lift * 0.04}) rotate(${-2 * lift}deg)`, zIndex: lift > 0 ? 20 : 1, overflow: 'hidden', fontFamily: F.text}}>
    {!ghost && <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: ROLE_COL[role]}} />}
    {!ghost && <div style={{fontSize: 19, fontWeight: 600, color: INK, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums'}}>{time}</div>}
    {!ghost && <div style={{fontSize: 15, fontWeight: 500, color: MUTE, marginTop: 3}}>{label}</div>}
  </div>
);
const Pill: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 18px', borderRadius: 99, background: inkA(0.045), fontFamily: F.text, fontSize: 18, fontWeight: 600, color: INK, whiteSpace: 'nowrap', ...style}}>{children}</div>
);

export const WeekGrid: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const rise = spr(f, T.rise, S.soft);
  const flat = prog(f, T.flatFrom, T.flatTo - T.flatFrom, E.inOut);
  const early = prog(f, 0, T.flatFrom, E.glide);
  const rx = lerp(flat, lerp(early, 22, 14), 0), ry = lerp(flat, lerp(early, -12, -6), 0), rz = lerp(flat, lerp(early, 2, 1), 0);
  const grabOff = {x: 70, y: 36};
  const [A, B] = DRAGS;
  const path: Way[] = [
    {f: T.cursorIn, x: 1180, y: 860}, {f: A.grab - 2, x: A.from.x + grabOff.x, y: A.from.y + grabOff.y},
    {f: A.travel[0], x: A.from.x + grabOff.x, y: A.from.y + grabOff.y - 10},
    {f: A.travel[1], x: A.to.x + grabOff.x, y: A.to.y + grabOff.y - 10}, {f: A.drop + 4, x: A.to.x + grabOff.x, y: A.to.y + grabOff.y},
    {f: B.grab - 2, x: B.from.x + grabOff.x, y: B.from.y + grabOff.y},
    {f: B.travel[0], x: B.from.x + grabOff.x, y: B.from.y + grabOff.y - 10},
    {f: B.travel[1], x: B.to.x + grabOff.x, y: B.to.y + grabOff.y - 10}, {f: B.drop + 4, x: B.to.x + grabOff.x, y: B.to.y + grabOff.y},
    {f: B.drop + 30, x: B.to.x + grabOff.x - 40, y: B.to.y + grabOff.y + 60},
  ];
  // drag states: while held, the card hangs from the cursor at the grab point (so it follows the cursor's arc)
  const st = DRAGS.map((d) => {
    const lift = prog(f, d.grab, 6, E.snappy) * (1 - prog(f, d.drop - 2, 6, E.snappy));
    const held = f >= d.grab && f < d.drop + 4, c = cursorPos(f, path);
    const pos = f < d.grab ? d.from : held ? {x: c.x - grabOff.x, y: c.y - grabOff.y} : d.to;
    return {lift, x: pos.x, y: pos.y, dragging: f >= d.grab && f < d.drop, count: prog(f, d.drop + 2, 24, E.snappy)};
  });
  const labour = LABOUR + DRAGS.reduce((m, d, i) => m + d.add * st[i].count, 0);
  const callout = spr(f, T.callout, S.pop);
  return (
    <AbsoluteFill>
      <Mist lift={0.85} />
      <Pop at={6} v={0.18} k={1} />
      {DRAGS.map((d, i) => (
        <React.Fragment key={i}>
          <Pop at={d.grab} v={0.12} k={i} /><Swish at={d.travel[0] - 2} v={0.07} k={i} /><Pop at={d.drop} v={0.22} k={i + 1} />
        </React.Fragment>
      ))}
      <Pop at={T.callout + 1} v={0.16} k={2} />
      <Drift dur={dur} z={0.04}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 78}}>
          <Words parts={[['Plan the week'], ['by drag and drop.', true]]} at={T.head} size={66} />
        </div>
        <Tilt rx={rx} ry={ry} rz={rz} cy={620}>
          <div style={{position: 'absolute', left: X0, top: Y0 + (1 - Math.min(1, rise)) * 380, width: W, height: H, borderRadius: 28, background: 'rgba(255,255,255,.97)', ...glow(), opacity: Math.min(1, rise * 1.6)}}>
            {/* top bar */}
            <div style={{position: 'absolute', left: 24, right: 24, top: 16, height: 52, display: 'flex', alignItems: 'center', gap: 14}}>
              <svg width={34} height={34} viewBox="0 0 1000 1000">{MARK.paths.map((d, i) => <path key={i} d={d} fill={MARK.fills[i]} />)}</svg>
              <div style={{fontFamily: F.display, fontSize: 24, fontWeight: 600, color: INK, letterSpacing: '-0.02em', marginRight: 10}}>Harbour St Kitchen</div>
              <Pill>Week 46 · 10-16 Nov</Pill>
              <div style={{flex: 1}} />
              <Pill style={{background: `${C1}12`}}>
                <span style={{color: MUTE, fontWeight: 500}}>Labour</span>
                <span style={{fontVariantNumeric: 'tabular-nums', minWidth: 74}}>{money(labour)}</span>
                <span style={{color: MUTE, fontWeight: 500, fontVariantNumeric: 'tabular-nums'}}>{((labour / SALES) * 100).toFixed(1)}% of sales</span>
              </Pill>
              <Pill><span style={{width: 10, height: 10, borderRadius: 99, background: '#2fb36b'}} />No overtime</Pill>
              <div style={{height: 44, padding: '0 22px', borderRadius: 99, background: GRAD, color: '#fff', fontFamily: F.text, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center'}}>Publish</div>
            </div>
            {/* header row */}
            <div style={{position: 'absolute', left: 24, top: 92, fontFamily: F.text, fontSize: 16, fontWeight: 600, color: MUTE, letterSpacing: '0.04em'}}>TEAM</div>
            {DAYS.map((d, i) => (
              <div key={d} style={{position: 'absolute', left: COL0 + i * CW, top: 84, width: CW, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.text, fontSize: 17, fontWeight: 600, color: i === 4 ? C1 : INK}}>{d}</div>
            ))}
            {/* grid lines */}
            {Array.from({length: 8}).map((_, i) => <div key={`v${i}`} style={{position: 'absolute', left: COL0 + i * CW, top: ROW0, width: 1, height: RH * TEAM.length, background: inkA(0.07)}} />)}
            {Array.from({length: TEAM.length + 1}).map((_, i) => <div key={`h${i}`} style={{position: 'absolute', left: 24, right: 24, top: ROW0 + i * RH - 2, height: 1, background: inkA(0.07)}} />)}
            {/* team column */}
            {TEAM.map((p, r) => {
              const di = DRAGS.findIndex((d) => d.row === r);
              const hrs = p.hours + (di >= 0 ? 6 * st[di].count : 0);
              const bump = di >= 0 ? Math.sin(Math.PI * st[di].count) : 0;
              return (
                <div key={p.name} style={{position: 'absolute', left: 24, top: ROW0 + r * RH, width: COL0 - 36, height: RH - 4, display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.text}}>
                  <div style={{width: 42, height: 42, borderRadius: 99, background: [C0, C1, C2][r % 3], color: '#fff', fontSize: 16, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0}}>{p.name.split(' ').map((w) => w[0]).join('')}</div>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 18, fontWeight: 600, color: INK, whiteSpace: 'nowrap'}}>{p.name}</div>
                    <div style={{fontSize: 14, color: MUTE, whiteSpace: 'nowrap'}}>{p.role}</div>
                  </div>
                  <div style={{fontSize: 16, fontWeight: 600, color: bump > 0.05 ? C1 : INK, fontVariantNumeric: 'tabular-nums', transform: `scale(${1 + bump * 0.15})`}}>{Math.round(hrs)}h</div>
                </div>
              );
            })}
            {/* placed shifts */}
            {TEAM.flatMap((p, r) => p.shifts.map(([d, time, role, label]) => {
              const {x, y} = cell(d, r);
              return <ShiftCard key={`${r}-${d}`} x={x} y={y} time={time} role={role} label={label} />;
            }))}
            {/* tray */}
            <div style={{position: 'absolute', left: 16, right: 16, top: 668, height: 96, borderRadius: 20, background: `${C2}0d`, border: `1px dashed ${C2}40`}} />
            <div style={{position: 'absolute', left: 40, top: 690, fontFamily: F.text}}>
              <div style={{fontSize: 18, fontWeight: 600, color: INK}}>Open shifts</div>
              <div style={{fontSize: 14, color: MUTE, marginTop: 4}}>Drag onto the week</div>
            </div>
            <ShiftCard {...tray(2)} time="18:00-00:00" role="bar" label="Bar" />
            {/* drop targets light up while dragging */}
            {DRAGS.map((d, i) => st[i].dragging && <ShiftCard key={`g${i}`} {...d.to} time="" role={d.role} label="" ghost />)}
            {/* the dragged cards (drawn last so they pass over the grid) */}
            {DRAGS.map((d, i) => <ShiftCard key={`d${i}`} x={st[i].x} y={st[i].y} time={d.time} role={d.role} label={d.label} lift={st[i].lift} />)}
            {DRAGS.map((d, i) => <Ripple key={`r${i}`} x={d.to.x + CARD_W / 2} y={d.to.y + CARD_H / 2} at={d.drop} color={C1} />)}
            <Cursor path={path} clicks={[A.grab, B.grab]} show={T.cursorIn} />
          </div>
        </Tilt>
        {f >= T.callout && (
          <div style={{position: 'absolute', right: 170, top: 932, transform: `scale(${Math.min(1.04, callout)})`, opacity: Math.min(1, callout), transformOrigin: '100% 50%', background: INK, color: '#fff', fontFamily: F.text, fontSize: 26, fontWeight: 600, borderRadius: 99, padding: '14px 28px', whiteSpace: 'nowrap', boxShadow: `0 16px 30px -14px ${shadeA(0.5)}`}}>
            Hours and costs update as you plan
          </div>
        )}
      </Drift>
    </AbsoluteFill>
  );
};
