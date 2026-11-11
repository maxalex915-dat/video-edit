import React from 'react';
import {AbsoluteFill, useCurrentFrame, Sequence, Html5Audio, staticFile} from 'remotion';
import {useF, FrameOffset, NoGround} from './frame';
import {E, prog} from './motion';
import {C0, C1, C2, GRAD, INK, MIST, F, BRAND} from './brand';
const s = Math.sin, c = Math.cos;

// Film grain: a whisper of monochrome noise so flat colour never looks digital.
const Grain: React.FC<{o: number}> = ({o}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: o, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 7} /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#grain)" /></svg>
    </AbsoluteFill>
  );
};

// Texture: a fine grid of tiny dots, low opacity, drifting; dot sizes breathe in a slow wave.
export const Dots: React.FC<{color: string; o: number}> = ({color, o}) => {
  const f = useF();
  const t = f / 30, G = 40, dx = (t * 6) % G, dy = (t * 3) % G;
  const els: React.ReactElement[] = [];
  for (let y = -G; y < 1080 + G; y += G) for (let x = -G; x < 1920 + G; x += G) {
    const w = s(x / 260 + y / 340 - t * 0.9) * 0.5 + 0.5;
    els.push(<circle key={`${x}-${y}`} cx={x + dx} cy={y + dy} r={0.9 + w * 1.3} />);
  }
  return <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0, opacity: o}} fill={color}>{els}</svg>;
};

// FLUID FIELD: the full-colour ground. A strong base (the core brand colour) with a few HUGE, very soft blobs
// (the other brand colours and white) that drift, stretch and turn like a thick liquid. The motion must be easy to
// see (blobs travel a third of the frame in a few seconds); a barely moving gradient reads as a still image.
export const FluidField: React.FC<{seed?: number}> = (p) => (React.useContext(NoGround) ? null : <FluidFieldRaw {...p} />);
export const FluidFieldRaw: React.FC<{seed?: number}> = ({seed = 0}) => {
  const f = useF();
  const t = f / 30 + seed * 3.7;
  const blob = (k: string, cx: number, cy: number, w: number, h: number, sx: number, rot: number, bg: string, o = 1) => (
    <div key={k} style={{position: 'absolute', left: cx - w / 2, top: cy - h / 2, width: w, height: h, borderRadius: '50%', background: bg, opacity: o, transform: `rotate(${rot}deg) scale(${sx}, ${2 - sx})`}} />
  );
  const rg = (col: string, stop: number) => `radial-gradient(closest-side, ${col} ${stop}%, ${col}00)`;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: C1}}>
      <div style={{position: 'absolute', inset: '-18%', filter: 'blur(80px)'}}>
        <div style={{position: 'absolute', left: '18%', top: '18%', width: 1920, height: 1080}}>
          {blob('a', 1450 + s(t * 0.55) * 520, 260 + c(t * 0.67) * 300, 1500, 1100, 1 + s(t * 0.8) * 0.4, t * 16, rg(C2, 35))}
          {blob('b', 380 + s(t * 0.6 + 2) * 560, 820 + c(t * 0.78) * 320, 1700, 1250, 1 + s(t * 0.9 + 1) * 0.45, -t * 18, rg(C0, 35))}
          {blob('w', 960 + s(t * 0.72) * 720 + s(t * 1.4 + 1) * 180, 460 + c(t * 0.63) * 360, 1500, 1050, 1 + s(t * 1.05) * 0.5, t * 22, 'radial-gradient(closest-side, rgba(255,255,255,.95) 25%, rgba(240,250,255,.5) 60%, rgba(255,255,255,0))', 0.85)}
          {blob('b2', 1600 + s(t * 0.66 + 4) * 420, 980 + c(t * 0.74 + 1) * 260, 1300, 950, 1 + s(t * 0.95 + 3) * 0.45, t * 14, rg(C0, 25), 0.8)}
          {blob('c', 300 + s(t * 0.5 + 1) * 380, 120 + c(t * 0.6 + 2) * 240, 1200, 900, 1 + s(t * 0.85 + 2) * 0.4, -t * 12, rg(C1, 40))}
          {blob('w2', 520 + s(t * 0.9 + 3) * 600, 300 + c(t * 0.8 + 5) * 280, 900, 520, 1 + s(t * 1.2) * 0.5, t * 30, 'radial-gradient(closest-side, rgba(255,255,255,.7), rgba(255,255,255,0))', 0.7)}
        </div>
      </div>
      <Dots color="#fff" o={0.22} />
      <Grain o={0.12} />
    </AbsoluteFill>
  );
};

// MIST: the light ground. Off-white with the brand gradient rising softly from the bottom edge; lift 0..1 raises it.
export const Mist: React.FC<{lift?: number}> = (p) => (React.useContext(NoGround) ? null : <MistRaw {...p} />);
export const MistRaw: React.FC<{lift?: number}> = ({lift = 0.4}) => {
  const f = useF();
  const t = f / 30, h = 34 + lift * 30 + s(t * 0.6) * 3, a = 100 + s(t * 0.2) * 12;
  return (
    <AbsoluteFill style={{background: MIST, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: '-20%', right: '-20%', bottom: '-12%', height: `${h + 12}%`, background: `linear-gradient(${a}deg, ${C0} 0%, ${C1} 50%, ${C2} 100%)`, transform: `translateX(${s(t * 0.25) * 6}%)`, filter: 'blur(90px)', opacity: 0.7, WebkitMaskImage: 'linear-gradient(0deg, #000 25%, transparent 100%)', maskImage: 'linear-gradient(0deg, #000 25%, transparent 100%)'}} />
      <Dots color={BRAND.dotTint} o={0.16} />
      <Grain o={0.035} />
    </AbsoluteFill>
  );
};

// SOUND placed on a scene frame, so it lands exactly on the animation it belongs to.
export const Sfx: React.FC<{at: number; s: string; v?: number}> = ({at, s: name, v = 0.2}) => {
  const off = React.useContext(FrameOffset);
  if (at + off < 0) return null;
  return <Sequence from={Math.round(at + off)} durationInFrames={30} layout="none"><Html5Audio src={staticFile(`sfx/${name}.wav`)} volume={v} /></Sequence>;
};
// pop: on the frame a thing APPEARS (its first visible frame), not when its animation is scheduled to start
export const Pop: React.FC<{at: number; v?: number; k?: number}> = ({at, v = 0.22, k = 0}) => <Sfx at={at} s={`mpop${k % 3}`} v={v} />;
// swish: the file peaks ~7 frames in, so place it ~6 frames BEFORE the movement's fastest moment
export const Swish: React.FC<{at: number; v?: number; k?: number}> = ({at, v = 0.16, k = 0}) => <Sfx at={at} s={`mswoosh${k % 2}`} v={v} />;

// TEXT, word by word: each word slides in from the left out of a blur (18 frames, snappy). parts: [text, inGradient?].
// One soft pop per word. out = the frame the whole line blurs away upward.
export type Part = [string, boolean?];
export const Words: React.FC<{parts: Part[]; at: number; size: number; color?: string; weight?: number; out?: number; stagger?: number; align?: 'center' | 'left'; style?: React.CSSProperties; quiet?: boolean}> = ({parts, at, size, color = INK, weight = 600, out, stagger = 3, align = 'center', style, quiet}) => {
  const f = useF();
  const o = out === undefined ? 0 : prog(f, out, 9, E.expoIn);
  let k = 0;
  const lines = parts.flatMap(([t, g]) => t.split('\n').map((ln, j) => ({ln, g, br: j > 0})));
  const nWords = lines.reduce((m, l) => m + l.ln.split(' ').filter(Boolean).length, 0);
  return (
    <>
      {!quiet && Array.from({length: nWords}).map((_, j) => <Pop key={`p${j}`} at={at + j * stagger} k={j} v={0.13} />)}
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: size * 0.26, fontFamily: F.display, fontSize: size, fontWeight: weight, letterSpacing: '-0.035em', lineHeight: 1.12, opacity: 1 - o, filter: o > 0 ? `blur(${o * 14}px)` : undefined, transform: `translateY(${-o * 20}px)`, ...style}}>
        {lines.map(({ln, g, br}, li) => (
          <React.Fragment key={li}>
            {br && <div style={{flexBasis: '100%', height: 0}} />}
            {ln.split(' ').filter(Boolean).map((w) => {
              const p = prog(f, at + k++ * stagger, 18, E.snappy);
              const look: React.CSSProperties = g ? {backgroundImage: GRAD, WebkitBackgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em'} : {color};
              return <span key={k} style={{display: 'inline-block', opacity: p, filter: `blur(${(1 - p) * 14}px)`, transform: `translateX(${(1 - p) * -size * 0.6}px)`, ...look}}>{w}</span>;
            })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

// A card floating on light: a white halo around it.
export const glow = (k = 1): React.CSSProperties => ({boxShadow: `0 0 0 ${6 * k}px rgba(255,255,255,.35), 0 0 ${70 * k}px ${12 * k}px rgba(255,255,255,.5), 0 30px 60px -30px rgba(${BRAND.shadeRGB},.35)`});
// FROSTED GLASS: see-through, the ground's colour shows through blurred; white hairline edge; light from above.
export const glass = (o = 1): React.CSSProperties => ({background: `linear-gradient(160deg, rgba(255,255,255,${0.62 * o}), rgba(255,255,255,${0.26 * o}))`, backdropFilter: 'blur(18px) saturate(1.4)', WebkitBackdropFilter: 'blur(18px) saturate(1.4)', border: '1.5px solid rgba(255,255,255,.85)', boxShadow: `inset 0 1px 0 rgba(255,255,255,.95), inset 0 -10px 20px -12px rgba(255,255,255,.6), 0 18px 40px -18px rgba(${BRAND.shadeRGB},.3)`});
// The camera never stops: a slow push and drift through every scene.
export const Drift: React.FC<{dur: number; children: React.ReactNode; z?: number; x?: number}> = ({dur, children, z = 0.05, x = 0}) => {
  const f = useF();
  const p = prog(f, 0, dur, (q) => q);
  return <AbsoluteFill style={{transform: `scale(${1 + p * z}) translateX(${p * x}px)`}}>{children}</AbsoluteFill>;
};
// 3D tilt of a whole layout (UI panels are shown tilted, easing toward flat over the scene).
export const Tilt: React.FC<{rx: number; ry: number; rz?: number; cx?: number; cy?: number; children: React.ReactNode}> = ({rx, ry, rz = 0, cx = 960, cy = 540, children}) => (
  <div style={{position: 'absolute', inset: 0, perspective: 2200, perspectiveOrigin: `${cx}px ${cy}px`}}>
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: `${cx}px ${cy}px`, transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`}}>{children}</div>
  </div>
);
