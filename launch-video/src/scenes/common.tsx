export {Headline, rise, Cursor, Ripple, Tip, typed, countTo, SceneIn} from '../components/kit/Anim';
export {Ground} from '../components/kit/Gradients';
export {Shot} from '../components/kit/Shot';
export {E, S, prog, spr, lerp} from '../theme/motion';
export {C, LOOP, LOOP_BAR} from '../theme/tokens';
export {F} from '../theme/fonts';
export type {Cue} from '../timeline';
import React from 'react';
import {useCurrentFrame} from 'remotion';
export const useF = () => useCurrentFrame();
// floating white UI card on the gradient (text never sits on it)
export const Float: React.FC<{x: number; y: number; w: number; h: number; tilt?: string; children: React.ReactNode; inner: string; style?: React.CSSProperties}> = ({x, y, w, h, tilt = '', children, inner, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: tilt, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(0,40,60,.55)', background: '#fff', ...style}}><div style={{transform: inner, transformOrigin: '0 0'}}>{children}</div></div>
);
