import {Easing, interpolate, spring, SpringConfig} from 'remotion';
import {FPS} from './tokens';

// Music: 108 BPM. Beat 0.5555 s, first downbeat at 0.325 s (measured from the track, see MOTION_NOTES.md).
export const BEAT = 0.5555;
export const BAR = BEAT * 4;
export const PHASE = 0.325;
export const barSec = (n: number) => PHASE + n * BAR;
export const sec = (s: number) => Math.round(s * FPS);
export const beats = (n: number) => sec(n * BEAT);

// Named curves. Only these are used in the film.
export const E = {
  snappy: Easing.bezier(0.16, 1, 0.3, 1), // entrances: fast start, long soft settle
  glide: Easing.bezier(0.25, 0.1, 0.25, 1),
  inOut: Easing.bezier(0.83, 0, 0.17, 1), // morphs and camera moves: momentum in and out
  expoIn: Easing.bezier(0.7, 0, 0.84, 0), // exits that accelerate away
  dramatic: Easing.bezier(0.7, 0, 0.3, 1),
};

export const S: Record<string, Partial<SpringConfig>> = {
  precise: {damping: 200},
  pop: {damping: 13, mass: 0.6, stiffness: 180},
  heavy: {damping: 200, stiffness: 80, mass: 2},
  snap: {damping: 20, stiffness: 220, mass: 0.7},
};

const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// progress 0..1 between two frames with a named curve
export const prog = (f: number, start: number, dur: number, ease = E.snappy) =>
  interpolate(f, [start, start + dur], [0, 1], {...C, easing: ease});

export const lerp = (p: number, a: number, b: number) => a + (b - a) * p;

export const spr = (f: number, start: number, cfg: Partial<SpringConfig> = S.precise, dur?: number) =>
  spring({frame: f - start, fps: FPS, config: cfg, durationInFrames: dur});

export const clamp = C;

// Three properties per entrance: opacity + transform + blur.
export const enter = (f: number, start: number, dur = 16, dist = 40, ease = E.snappy) => {
  const p = prog(f, start, dur, ease);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * dist}px)`,
    filter: `blur(${(1 - p) * 12}px)`,
  } as const;
};

export const exit = (f: number, start: number, dur = 10) => {
  const p = prog(f, start, dur, E.expoIn);
  return {opacity: 1 - p, scale: 1 + p * 0.06, blur: p * 14};
};
