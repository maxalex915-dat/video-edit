import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../../theme/tokens';

// Camera over a UI canvas drawn at its real size.
// focus: the canvas point the camera looks at; at: where that point sits in the frame.
// dof: one sharp, full-colour region around the focus; the rest blurs and loses colour.
export type ShotProps = {
  w: number; h: number; focus: [number, number]; at?: [number, number]; scale?: number;
  rx?: number; ry?: number; rz?: number; dof?: {rx: number; ry: number; blur?: number} | null;
  children: React.ReactNode; shadow?: boolean;
};

export const Shot: React.FC<ShotProps> = ({w, h, focus, at = [960, 540], scale = 1, rx = 0, ry = 0, rz = 0, dof = null, children, shadow = true}) => {
  const [fx, fy] = focus;
  const tf = `perspective(2600px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale}) translate(${-fx}px, ${-fy}px)`;
  const layer = (extra: React.CSSProperties) => (
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, ...extra}}>{children}</div>
  );
  const mask = dof ? `radial-gradient(${dof.rx}px ${dof.ry}px at ${fx}px ${fy}px, black 62%, transparent 100%)` : undefined;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: at[0], top: at[1], width: w, height: h, transform: tf, transformOrigin: '0 0', borderRadius: 28,
        boxShadow: shadow ? '0 1px 0 rgba(5,60,63,.04), 0 30px 80px -20px rgba(5,60,63,.18), 0 80px 160px -60px rgba(5,60,63,.22)' : 'none'}}>
        {dof ? (
          <>
            {layer({filter: `blur(${dof.blur ?? 7}px) saturate(.25) brightness(1.03)`, opacity: 0.75})}
            {layer({maskImage: mask, WebkitMaskImage: mask})}
          </>
        ) : layer({})}
      </div>
    </AbsoluteFill>
  );
};

// Light field backgrounds: pale, never flat, slowly moving, a fine texture that leans toward the focal point.
export type LightKind = 'cool' | 'mint' | 'sky' | 'warm' | 'pearl' | 'ink';
const TINT: Record<LightKind, {base: string; a: string; b: string; dot: string}> = {
  cool: {base: '#f6f9fa', a: 'rgba(0,185,239,.16)', b: 'rgba(127,188,66,.10)', dot: 'rgba(5,94,99,.10)'},
  mint: {base: '#f5faf3', a: 'rgba(127,188,66,.20)', b: 'rgba(0,185,239,.10)', dot: 'rgba(63,122,38,.10)'},
  sky: {base: '#f3f9fd', a: 'rgba(112,203,243,.30)', b: 'rgba(5,94,99,.06)', dot: 'rgba(0,118,143,.10)'},
  warm: {base: '#faf9f6', a: 'rgba(240,200,140,.16)', b: 'rgba(0,185,239,.08)', dot: 'rgba(120,90,40,.08)'},
  pearl: {base: '#fbfcfc', a: 'rgba(0,185,239,.08)', b: 'rgba(127,188,66,.08)', dot: 'rgba(5,94,99,.07)'},
  ink: {base: '#0c1d20', a: 'rgba(0,185,239,.22)', b: 'rgba(127,188,66,.16)', dot: 'rgba(160,220,230,.10)'},
};
export const Light: React.FC<{kind: LightKind; toward?: [number, number]; texture?: 'dots' | 'lines' | 'none'; t?: number}> = ({kind, toward = [960, 540], texture = 'dots', t: tt}) => {
  const f = useCurrentFrame();
  const t = (tt ?? f) / 30;
  const k = TINT[kind];
  const ax = 25 + Math.sin(t * 0.35) * 10, ay = 20 + Math.cos(t * 0.28) * 8;
  const bx = 78 + Math.cos(t * 0.3) * 10, by = 80 + Math.sin(t * 0.33) * 8;
  const m = `radial-gradient(900px 700px at ${toward[0]}px ${toward[1]}px, black 0%, transparent 75%)`;
  return (
    <AbsoluteFill style={{background: k.base}}>
      <AbsoluteFill style={{background: `radial-gradient(1100px 800px at ${ax}% ${ay}%, ${k.a}, transparent 70%), radial-gradient(1000px 800px at ${bx}% ${by}%, ${k.b}, transparent 70%)`}} />
      {texture !== 'none' && (
        <AbsoluteFill
          style={{
            backgroundImage: texture === 'dots' ? `radial-gradient(${k.dot} 1.2px, transparent 1.4px)` : `linear-gradient(90deg, ${k.dot} 1px, transparent 1px)`,
            backgroundSize: texture === 'dots' ? '22px 22px' : '28px 100%',
            backgroundPosition: `${t * 6}px ${t * 3}px`, maskImage: m, WebkitMaskImage: m,
          }}
        />
      )}
      <AbsoluteFill style={{background: `radial-gradient(700px 500px at ${toward[0]}px ${toward[1]}px, ${kind === 'ink' ? 'rgba(0,185,239,.10)' : 'rgba(255,255,255,.7)'}, transparent 70%)`}} />
    </AbsoluteFill>
  );
};
export {C};
