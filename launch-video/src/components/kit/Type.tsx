import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {E, prog} from '../../theme/motion';

type WordsProps = {
  text: string;
  start: number; // local frame
  stagger?: number;
  dur?: number;
  size?: number;
  weight?: number;
  color?: string;
  out?: number; // frame where words leave
  outDur?: number;
  align?: 'left' | 'center';
  gradientWords?: number[]; // indexes painted with the brand ramp
  style?: React.CSSProperties;
  dist?: number;
  letter?: number;
};

// Word-level reveal: translate + opacity + blur per word, staggered. Exit is compound too.
export const Words: React.FC<WordsProps> = ({
  text, start, stagger = 3, dur = 16, size = 96, weight = 700, color = C.textOnDark, out, outDur = 9,
  align = 'left', gradientWords = [], style, dist = 0.5, letter = -0.035,
}) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div
      style={{
        fontFamily: F.display, fontSize: size, fontWeight: weight, lineHeight: 1.04, letterSpacing: `${letter}em`,
        color, display: 'flex', flexWrap: 'wrap', gap: `0 ${size * 0.24}px`,
        justifyContent: align === 'center' ? 'center' : 'flex-start', ...style,
      }}
    >
      {words.map((w, i) => {
        const p = prog(f, start + i * stagger, dur, E.snappy);
        const q = out === undefined ? 0 : prog(f, out + i * 2, outDur, E.expoIn);
        const grad = gradientWords.includes(i);
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'visible', paddingBottom: size * 0.08}}>
            <span
              style={{
                display: 'inline-block',
                opacity: p * (1 - q),
                transform: `translateY(${(1 - p) * size * dist - q * size * 0.35}px)`,
                filter: `blur(${(1 - p) * 14 + q * 12}px)`,
                ...(grad
                  ? {backgroundImage: `linear-gradient(100deg, ${C.green}, ${C.cyan} 55%, ${C.sky})`, WebkitBackgroundClip: 'text', color: 'transparent'}
                  : {}),
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

// Mono label in HUD style
export const Label: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({
  children, color = C.mutedOnDark, size = 22, style,
}) => (
  <div style={{fontFamily: F.mono, fontSize: size, letterSpacing: '0.08em', textTransform: 'uppercase', color, ...style}}>{children}</div>
);

export const fmt = (n: number, dec = 0) =>
  n.toLocaleString('en-US', {minimumFractionDigits: dec, maximumFractionDigits: dec});

// Counting number with tabular figures
export const Count: React.FC<{to: number; from?: number; start: number; dur?: number; dec?: number; prefix?: string; suffix?: string; style?: React.CSSProperties}> = ({
  to, from = 0, start, dur = 24, dec = 0, prefix = '', suffix = '', style,
}) => {
  const f = useCurrentFrame();
  const p = prog(f, start, dur, E.snappy);
  const v = from + (to - from) * p;
  return <span style={{fontVariantNumeric: 'tabular-nums', ...style}}>{prefix}{fmt(v, dec)}{suffix}</span>;
};
