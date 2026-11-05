import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../../theme/tokens';

// Ambient layers that run under the whole film: canvas, drifting brand glows, grid, grain.
export const Backdrop: React.FC<{pulse?: number}> = ({pulse = 0}) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const o1x = 30 + Math.sin(t * 0.21) * 12;
  const o1y = 25 + Math.cos(t * 0.17) * 10;
  const o2x = 72 + Math.cos(t * 0.19) * 12;
  const o2y = 72 + Math.sin(t * 0.23) * 10;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at ${o1x}% ${o1y}%, rgba(127,188,66,${0.16 + pulse * 0.1}), transparent 70%),
             radial-gradient(1000px 800px at ${o2x}% ${o2y}%, rgba(0,185,239,${0.14 + pulse * 0.12}), transparent 70%),
             radial-gradient(1400px 900px at 50% 120%, rgba(112,203,243,.25), transparent 70%), linear-gradient(180deg, #f8fbfb, #eef4f5)`,
        }}
      />
      <Grid />
    </AbsoluteFill>
  );
};

export const Grid: React.FC<{opacity?: number; size?: number}> = ({opacity = 1, size = 80}) => {
  const f = useCurrentFrame();
  const sweep = ((f * 6) % 2600) - 400;
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(5,94,99,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,94,99,.05) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: `${(f * 0.4) % size}px ${(f * 0.25) % size}px`,
          maskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 85%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(100deg, transparent ${sweep - 200}px, rgba(255,255,255,.5) ${sweep}px, transparent ${sweep + 200}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

// Film grain: SVG feTurbulence, seed moves per frame so it lives, deterministic.
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.035}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 60%, rgba(5,60,63,.06) 100%)', pointerEvents: 'none'}}
  />
);
