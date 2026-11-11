import React from 'react';
import type {Beat} from './film';
import {Statement} from './scenes/Statement';
import {Chaos} from './scenes/Chaos';
import {Problems} from './scenes/Problems';
import {Introducing} from './scenes/Introducing';
import {WeekGrid} from './scenes/WeekGrid';
import {ButWait} from './scenes/ButWait';
import {Montage} from './scenes/Montage';
import {featureVisual} from './scenes/MontageVisuals';
import {LogoOutro} from './scenes/LogoOutro';

// THE RUNNING ORDER (storyboard v0 for Shiftly). name must match src/timing.json / audio.json.
// Not built yet (next round, see plan.md): GroupChat, Swaps, Forecast, AISummary, Saving, Bento.
const W = (C: React.FC<any>, props: object) => (p: {dur: number}) => <C {...props} {...p} />;
const CHIPS: [string, string, string][] = [
  ['Excel', 'X', '#217346'], ['WhatsApp', 'W', '#25d366'], ['Paper rota', 'P', '#8a8f98'], ['Google Sheets', 'S', '#188038'],
  ['Text messages', 'T', '#0a84ff'], ['Square POS', 'Sq', '#1a1a1a'], ['Payroll', '$', '#f45d48'], ['Email', 'E', '#ea4335'],
  ['Google Calendar', 'C', '#4285f4'], ['Phone calls', 'Ph', '#6c6c70'],
];
export const SCENES: Beat[] = [
  {name: 'Statement', C: W(Statement, {big: 'Hours', rest: 'lost to the rota every week'}), ground: {k: 'fluid', seed: 0}},
  {name: 'Chaos', C: W(Chaos, {chips: CHIPS, lead: 'juggling', line: ['10', 'different tools'], files: ['rota_week46_FINAL.xlsx', 'swaps (2).txt', 'payroll_oct_v3.csv', 'IMG_4471.jpg']}), ground: {k: 'mist', lift: 0.45}, into: 'left'},
  {name: 'Problems', C: W(Problems, {list: [['Last-minute swaps', 37], ['Surprise overtime', 74], ['Labour over budget', 129]]}), ground: {k: 'mist', lift: 0.7}, into: 'up'},
  {name: 'Introducing', C: W(Introducing, {name: 'Shiftly'}), ground: {k: 'mist', lift: 0.2}, into: 'pushIn'},
  {name: 'WeekGrid', C: W(WeekGrid, {}), ground: {k: 'mist', lift: 0.85}, into: 'up'},
  {name: 'ButWait', C: W(ButWait, {}), ground: {k: 'fluid', seed: 7}, into: 'pushIn'},
  {name: 'Montage', C: W(Montage, {items: ['Drag-and-drop shifts', 'Swap requests', 'Labour forecasts', 'Overtime alerts', 'Staff availability', 'Time-off requests', 'And a lot more'], at: [0.3, 1.7, 3.1, 4.5, 5.9, 7.3, 8.9], visual: featureVisual, visualW: 760, visualH: 440, fanCols: 3}), ground: {k: 'mist', lift: 0.55}, into: 'left'},
  {name: 'Outro', C: W(LogoOutro, {rest: {x: 520, y: 410, w: 260}, anchor: [0.42, 0.25], wordText: 'Shiftly', wordX: 820, wordY: 432, wordSize: 200}), ground: {k: 'own'}, into: 'pullOut'},
];
