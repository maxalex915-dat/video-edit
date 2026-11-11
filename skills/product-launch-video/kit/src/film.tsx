import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {FrameOffset, NoGround} from './frame';
import {E} from './motion';
import {FluidFieldRaw, MistRaw} from './look';
import {MIST} from './brand';
import timing from './timing.json';
import {SCENES} from './scenes';

// THE FILM: one shared ground under everything, scene foregrounds moved by a "camera".
// - Ground per scene: fluid brand colour, light mist (with lift), or 'own' (the scene draws its own).
//   On a cut the next ground BLOOMS open over the previous one from where the camera is heading, so a frame
//   edge is never seen and the colour never jumps.
// - Foreground per scene: the old one leaves (push in / pull out / left / right / up / down, 14 frames each side,
//   with blur) and the new one arrives the same way. The old text clears BEFORE the new text is readable, and the new
//   scene is readable by its frame 2-3, so the first word and its sound land together.
// - Durations come from src/timing.json (written by scripts/build_audio.py), so picture and voice never drift.
export type Ground = {k: 'fluid'; seed: number} | {k: 'mist'; lift: number} | {k: 'own'};
export type K = 'pushIn' | 'pullOut' | 'left' | 'right' | 'up' | 'down';
export type Beat = {name: string; C: React.FC<{dur: number}>; ground: Ground; into?: K}; // into = how the camera enters this scene
const P = 14;
const durs: Record<string, number> = Object.fromEntries((timing as unknown as {scenes: [string, number][]}).scenes.map(([n, d]) => [n, Math.round(d * 30)]));
export const DURS = SCENES.map((b) => durs[b.name] ?? 90);
export const STARTS = DURS.reduce<number[]>((a, d, i) => [...a, i ? a[i - 1] + DURS[i - 1] : 0], []);
export const TOTAL = STARTS[STARTS.length - 1] + DURS[DURS.length - 1];
const easeOut = (x: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
const easeIn = (x: number) => Math.pow(Math.max(0, Math.min(1, x)), 3);
const Move: React.FC<{len: number; inK: K | null; outK: K | null; children: React.ReactNode}> = ({len, inK, outK, children}) => {
  const f = useCurrentFrame();
  const i = inK ? 1 - easeOut(f / (2 * P)) : 0;
  const o = outK ? easeIn((f - (len - 2 * P)) / (2 * P)) : 0;
  let tx = 0, ty = 0, sc = 1, bl = 0;
  const apply = (k: K, e: number, leaving: boolean) => {
    const d = leaving ? -1 : 1;
    if (k === 'pushIn') sc *= leaving ? 1 + e * 1.6 : 1 - e * 0.45;
    if (k === 'pullOut') sc *= leaving ? 1 - e * 0.55 : 1 + e * 1.1;
    if (k === 'left') tx += d * e * 1100;
    if (k === 'right') tx -= d * e * 1100;
    if (k === 'up') ty += d * e * 800;
    if (k === 'down') ty -= d * e * 800;
    bl += e * e * 26;
  };
  if (inK) apply(inK, i, false);
  if (outK) apply(outK, o, true);
  const wi = inK ? Math.max(0, Math.min(1, f / (2 * P))) : 1, wo = outK ? Math.max(0, Math.min(1, (f - (len - 2 * P)) / (2 * P))) : 0;
  const op = Math.min(easeOut(Math.max(0, Math.min(1, (wi - 0.4) / 0.35))), 1 - E.inOut(Math.max(0, Math.min(1, wo / 0.6))));
  return <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${sc})`, opacity: op, filter: bl > 0.4 ? `blur(${bl}px)` : undefined}}>{children}</AbsoluteFill>;
};
const ORIGIN: Record<K, string> = {pushIn: '50% 50%', pullOut: '50% 50%', left: '100% 50%', right: '0% 50%', up: '50% 100%', down: '50% 0%'};
const GroundLayer: React.FC<{g: Ground; inK: K | null}> = ({g, inK}) => {
  const f = useCurrentFrame();
  const m = inK ? interpolate(f, [0, 2 * P], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut}) : 1;
  const r = 20 + m * 160;
  const mask = m >= 1 ? undefined : `radial-gradient(${r}% ${r}% at ${ORIGIN[inK ?? 'pushIn']}, #000 ${Math.max(0, r - 60)}%, transparent ${r}%)`;
  if (g.k === 'own') return null;
  return <AbsoluteFill style={{WebkitMaskImage: mask, maskImage: mask, opacity: inK ? Math.min(1, m * 1.4) : 1}}>{g.k === 'fluid' ? <FluidFieldRaw seed={g.seed} /> : <MistRaw lift={g.lift} />}</AbsoluteFill>;
};
export const Film: React.FC<{sfx?: boolean}> = ({sfx = true}) => (
  <AbsoluteFill style={{background: MIST}}>
    {SCENES.map((b, i) => {
      const pre = i ? P : 0, post = i < SCENES.length - 1 ? P : 0;
      return <Sequence key={`g${i}`} from={STARTS[i] - pre} durationInFrames={DURS[i] + pre + post}><GroundLayer g={b.ground} inK={i ? b.into ?? 'pushIn' : null} /></Sequence>;
    })}
    {SCENES.map((b, i) => {
      const pre = i ? P : 0, post = i < SCENES.length - 1 ? P : 0, len = DURS[i] + pre + post;
      const C = b.C;
      return (
        <Sequence key={i} name={b.name} from={STARTS[i] - pre} durationInFrames={len}>
          <Move len={len} inK={i ? b.into ?? 'pushIn' : null} outK={post ? SCENES[i + 1].into ?? 'pushIn' : null}>
            <NoGround.Provider value={b.ground.k !== 'own'}><FrameOffset.Provider value={pre}><C dur={DURS[i]} /></FrameOffset.Provider></NoGround.Provider>
          </Move>
        </Sequence>
      );
    })}
    {/* a muffled swoosh on every cut, peaking as the camera moves fastest */}
    {sfx && STARTS.slice(1).map((a, i) => <Sequence key={`cut${i}`} from={a - 10} durationInFrames={30} layout="none"><Html5Audio src={staticFile(`sfx/mswoosh${i % 2}.wav`)} volume={0.14} /></Sequence>)}
  </AbsoluteFill>
);
