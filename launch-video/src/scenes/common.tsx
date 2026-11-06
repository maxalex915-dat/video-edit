export {Headline, rise, Cursor, Ripple, Tip, typed, countTo, SceneIn} from '../components/kit/Anim';
export {Ground} from '../components/kit/Gradients';
export {Shot} from '../components/kit/Shot';
export {E, S, prog, spr, lerp} from '../theme/motion';
export {C, LOOP, LOOP_BAR} from '../theme/tokens';
export {F} from '../theme/fonts';
export type {Cue} from '../timeline';
import React from 'react';
export {useF} from '../frame';
// floating white UI card on the gradient (text never sits on it)
export const Float: React.FC<{x: number; y: number; w: number; h: number; tilt?: string; children: React.ReactNode; inner: string; style?: React.CSSProperties}> = ({x, y, w, h, tilt = '', children, inner, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: tilt, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(0,40,60,.55)', background: '#fff', ...style}}><div style={{transform: inner, transformOrigin: '0 0'}}>{children}</div></div>
);
export {Words} from '../components/kit/Anim';
// Camera drift for a scene's UI group: a slow push and slide, so nothing ever sits still.
export const Drift: React.FC<{dur: number; children: React.ReactNode; push?: number; slide?: number; origin?: string}> = ({dur, children, push = 0.04, slide = -24, origin = '1300px 540px'}) => {
  const f = useCurrentFrameOffset();
  const p = Math.max(0, Math.min(1, f / dur));
  const e = p * p * (3 - 2 * p);
  return <div style={{position: 'absolute', inset: 0, transform: `translateX(${e * slide}px) scale(${1 + e * push})`, transformOrigin: origin}}>{children}</div>;
};
import {useF as useCurrentFrameOffset} from '../frame';
