import {Easing, interpolate, spring, SpringConfig} from 'remotion';
export const FPS = 30;
// Named curves. Use only these, so the whole film moves with one personality.
export const E = {
  snappy: Easing.bezier(0.16, 1, 0.3, 1), // entrances: fast start, long soft settle (text words, cards landing)
  glide: Easing.bezier(0.25, 0.1, 0.25, 1), // slow, even drifts
  inOut: Easing.bezier(0.83, 0, 0.17, 1), // morphs and camera moves: momentum in and out
  expoIn: Easing.bezier(0.7, 0, 0.84, 0), // exits that accelerate away
  soft: (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t), // gentle sine: cursors, hover lifts, anything that must feel unhurried
};
export const S: Record<string, Partial<SpringConfig>> = {
  precise: {damping: 200},
  soft: {damping: 26, stiffness: 120, mass: 1}, // panels arriving
  pop: {damping: 13, mass: 0.6, stiffness: 180}, // chips, badges, stamps (small overshoot)
};
const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const clamp = C;
// progress 0..1 between two frames with a named curve
export const prog = (f: number, start: number, dur: number, ease: (t: number) => number = E.snappy) =>
  interpolate(f, [start, start + dur], [0, 1], {...C, easing: ease});
export const lerp = (p: number, a: number, b: number) => a + (b - a) * p;
export const spr = (f: number, start: number, cfg: Partial<SpringConfig> = S.precise) => spring({frame: f - start, fps: FPS, config: cfg});
