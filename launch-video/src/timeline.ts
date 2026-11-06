import {barSec, sec} from './theme/motion';

// Scene timing in film bars (108 BPM, bar = 2.22 s; halves land on beat 3).
// The music's calm opening two bars play twice, so the drop lands on film bar 6 (13.7 s).
export type Cue = {at: number; s: string; v?: number};
const B = (n: number) => (n === 0 ? 0 : sec(barSec(n)));
export const TOTAL = 2700; // 90 s
export const PAN = 16; // frames of camera pan across each cut
const BARS: [string, number, number][] = [
  ['S01', 0, 2], ['S02', 2, 4], ['S03', 4, 6], ['S04', 6, 8], ['S05', 8, 10], ['S06', 10, 12], ['S07', 12, 13.5], ['S08', 13.5, 15],
  ['S09', 15, 16.5], ['S10', 16.5, 18.5], ['S11', 18.5, 20], ['S12', 20, 22], ['S13', 22, 24], ['S14', 24, 26],
  ['S15', 26, 28], ['S16', 28, 29.5], ['S17', 29.5, 31], ['S18', 31, 33], ['S19', 33, 35], ['S20', 35, -1],
];
export const TIMING = BARS.map(([id, a, b]) => ({id, from: B(a), dur: (b < 0 ? TOTAL : B(b)) - B(a)}));
