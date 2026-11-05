import {barSec, sec} from './theme/motion';

// Scene timing in music bars (108 BPM, bar = 2.22 s). Change a scene's length here only.
export type Cue = {at: number; s: string; v?: number};
const B = (n: number) => (n === 0 ? 0 : sec(barSec(n)));
export const TOTAL = 2700; // 90 s
const BARS: [string, number, number][] = [
  ['S01', 0, 2], ['S02', 2, 4], ['S03', 4, 6], ['S04', 6, 8], ['S05', 8, 10], ['S06', 10, 12], ['S07', 12, 14], ['S08', 14, 16], ['S09', 16, 18],
  ['S10', 18, 20], ['S11', 20, 22], ['S12', 22, 24], ['S13', 24, 26], ['S14', 26, 28], ['S15', 28, 30], ['S16', 30, 32], ['S17', 32, 34], ['S18', 34, -1],
];
export const TIMING = BARS.map(([id, a, b]) => ({id, from: B(a), dur: (b < 0 ? TOTAL : B(b)) - B(a)}));
