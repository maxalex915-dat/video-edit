import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../theme/fonts';
export {useF} from '../frame';
export {Ground} from '../components/kit/Gradients';
export {Line, words, Typewriter, BigWord, Brackets, ZoomThrough, Stage, Wipe, ACCENT, TYPE} from '../components/k/Kinetic';
export {Cursor, Ripple, Tip, typed} from '../components/kit/Anim';
export {E, S, prog, spr, lerp} from '../theme/motion';
export {C, LOOP} from '../theme/tokens';
export {F};
export type Cue = {at: number; s: string; v?: number};

// width of a string in the display face, measured in the browser (fonts are loaded before render)
let ctx: CanvasRenderingContext2D | null = null;
export const measure = (text: string, size: number, weight = 500) => {
  if (typeof document === 'undefined') return text.length * size * 0.5;
  ctx = ctx ?? document.createElement('canvas').getContext('2d');
  if (!ctx) return text.length * size * 0.5;
  ctx.font = `${weight} ${size}px 'Inter Display'`;
  return ctx.measureText(text).width * (1 - 0.025 * 0); // letter-spacing applied separately
};
// x of the centre of character i in a centred single line (letter-spacing -0.025em)
export const charX = (text: string, i: number, size: number, weight = 500) => {
  const ls = -0.025 * size;
  const full = measure(text, size, weight) + ls * (text.length - 1);
  const pre = measure(text.slice(0, i), size, weight) + ls * i;
  const ch = measure(text[i], size, weight);
  return 960 - full / 2 + pre + ch / 2;
};
// faint product windows drifting at the edges, blurred (the reference's problem backdrop)
export const Ghosts: React.FC<{f: number; near?: number; children?: React.ReactNode}> = ({f, near = 0}) => {
  const win = (x: number, y: number, w: number, h: number, r: number, k: number, title: string) => (
    <div key={title} style={{position: 'absolute', left: x - f * (0.3 + k * 0.15) * (k % 2 ? 1 : -1), top: y - f * 0.2, width: w, height: h, borderRadius: 14, background: '#fff', border: '1px solid #e4ecec', boxShadow: '0 20px 50px -25px rgba(5,60,63,.25)', transform: `rotate(${r}deg) scale(${1 + near * 0.15})`, filter: `blur(${2.5 - near * 1.5}px)`, opacity: 0.55 + near * 0.3, overflow: 'hidden', fontFamily: F.text}}>
      <div style={{height: 26, background: '#f3f6f6', display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', fontSize: 11, color: '#7d9095'}}>{['#ff6058', '#ffbd2e', '#28c940'].map((c) => <span key={c} style={{width: 8, height: 8, borderRadius: 9, background: c}} />)}<span style={{marginLeft: 6}}>{title}</span></div>
      {Array.from({length: Math.floor(h / 26) - 1}).map((_, r2) => <div key={r2} style={{display: 'flex', gap: 6, padding: '7px 10px', borderBottom: '1px solid #f0f4f4'}}>{[0, 1, 2, 3].map((c) => <div key={c} style={{flex: 1, height: 8, borderRadius: 4, background: (r2 + c + k) % 5 === 0 ? 'rgba(0,185,239,.35)' : '#e6eded'}} />)}</div>)}
    </div>
  );
  return (
    <AbsoluteFill>
      {win(80, 70, 420, 260, -4, 1, 'linkedin_export.csv')}
      {win(1420, 60, 440, 250, 3, 2, 'GA4_sessions (2).xlsx')}
      {win(40, 720, 460, 270, 3, 3, 'report_FINAL_v7.xlsx')}
      {win(1380, 740, 480, 260, -3, 4, 'search_console.csv')}
      {win(760, -140, 400, 200, 2, 5, 'facebook_insights.xlsx')}
      {win(780, 960, 420, 220, -2, 6, 'email_stats.csv')}
    </AbsoluteFill>
  );
};
export const Center: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>{children}</div>;
