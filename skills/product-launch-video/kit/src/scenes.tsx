import React from 'react';
import type {Beat} from './film';
import {Statement} from './scenes/Statement';
import {Chaos} from './scenes/Chaos';
import {Problems} from './scenes/Problems';
import {ButWait} from './scenes/ButWait';
import {Montage} from './scenes/Montage';
import {LogoOutro} from './scenes/LogoOutro';

// THE RUNNING ORDER. name must match the scene names in audio.json / src/timing.json.
// into = how the camera enters the scene (vary it: pushIn, pullOut, left, right, up, down).
// Grounds alternate between the fluid brand colour (statements, big moments) and mist (UI, lists).
const W = (C: React.FC<any>, props: object) => (p: {dur: number}) => <C {...props} {...p} />;
export const SCENES: Beat[] = [
  {name: 'Statement', C: W(Statement, {big: 'Millions', rest: 'of teams like yours'}), ground: {k: 'fluid', seed: 0}},
  {name: 'Chaos', C: W(Chaos, {chips: [['Google Ads', 'G', '#4285f4'], ['Slack', 'S', '#611f69'], ['Notion', 'N', '#111'], ['HubSpot', 'H', '#ff7a59'], ['Sheets', 'S', '#188038'], ['Canva', 'C', '#00a3c4']], line: ['6', 'different tools']}), ground: {k: 'mist', lift: 0.45}, into: 'left'},
  {name: 'Problems', C: W(Problems, {}), ground: {k: 'mist', lift: 0.7}, into: 'up'},
  {name: 'ButWait', C: W(ButWait, {}), ground: {k: 'fluid', seed: 7}, into: 'pushIn'},
  {name: 'Montage', C: W(Montage, {items: ['Feature one', 'Feature two', 'Feature three', 'And a lot more'], at: [0.3, 2.0, 3.6, 5.2], visual: (k: number) => <div style={{width: 820, height: 460, borderRadius: 28, background: '#fff'}}>{k}</div>}), ground: {k: 'mist', lift: 0.55}, into: 'left'},
  {name: 'Outro', C: W(LogoOutro, {rest: {x: 420, y: 380, w: 220}, wordmark: undefined}), ground: {k: 'own'}, into: 'pullOut'},
];
