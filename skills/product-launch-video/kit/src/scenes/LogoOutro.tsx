import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {useF} from '../frame';
import {E, prog, lerp} from '../motion';
import {C0, C1, C2, F, INK} from '../brand';
import {MARK} from './logoMark';

// OUTRO (if no bento comes before it, the gradient card fades and settles in first): a gradient card grows to fill the frame; inside it the logo MARK is so large that one of its strokes fills
// the screen, so the card "becomes" the mark. The mark then pulls back to its real size (fast start, soft landing)
// and the wordmark slides in beside it out of a blur. The music's own ending lands here.
//
// Colour rule (learned the hard way): while huge, the mark carries the card's screen-wide gradient (so nothing
// jumps at the hand-off); as it pulls back it must take on the logo's OWN colours. A traced logo is usually many
// flat-coloured pieces, not one linear gradient: export each piece's path AND fill (logoMark.ts) and draw them in
// their own colours. A single gradient stretched over the shrinking mark reads as one flat colour mid-shrink.
const HOLD = 20, EXPAND = 20, SHRINK = 30; // frames
const T1 = HOLD + EXPAND, T3 = T1 + SHRINK;
export const LogoOutro: React.FC<{dur: number; rest: {x: number; y: number; w: number}; anchor?: [number, number]; wordmark?: string; wordX?: number; wordY?: number; wordW?: number; wordText?: string; wordSize?: number}> = ({dur, rest, anchor = [0.6, 0.1], wordmark, wordX = 640, wordY = 440, wordW = 820, wordText, wordSize = 200}) => {
  const f = useF();
  const ex = prog(f, HOLD, EXPAND, E.inOut);
  const sh = prog(f, T1, SHRINK, (x) => 1 - Math.pow(1 - x, 3));
  const own = prog(sh, 0.05, 0.4, E.inOut);
  const scale = Math.pow(60, 1 - sh);
  const k0 = rest.w / MARK.w, gs = k0 * scale;
  const ax = rest.x + anchor[0] * rest.w, ay = rest.y + anchor[1] * MARK.h * k0;
  const sx = ax + (960 - ax) * (1 - sh), sy = ay + (540 - ay) * (1 - sh);
  const gx = sx - anchor[0] * MARK.w * gs, gy = sy - anchor[1] * MARK.h * gs;
  const wa = prog(f, T3 + 2, 20, E.snappy);
  const end = prog(f, T3, dur - T3, E.glide);
  const card = {x: lerp(ex, 640, 0), y: lerp(ex, 360, 0), w: lerp(ex, 640, 1920), h: lerp(ex, 360, 1080)};
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      {f < T1 + 1 && <div style={{position: 'absolute', left: card.x, top: card.y, width: card.w, height: card.h, borderRadius: lerp(ex, 27, 0), opacity: prog(f, 0, 12), transform: `scale(${lerp(prog(f, 0, 16, E.snappy), 0.9, 1)})`, background: `linear-gradient(135deg, ${C0} 0%, ${C1} 45%, ${C2} 100%)`}} />}
      {f >= T1 && (
        <AbsoluteFill style={{transform: `scale(${1 + end * 0.03})`, transformOrigin: '960px 540px'}}>
          <svg width="1920" height="1080" style={{position: 'absolute', left: 0, top: 0}}>
            <defs>
              <linearGradient id="outG" gradientUnits="userSpaceOnUse" x1="210" y1="-210" x2="1710" y2="1290"><stop offset="0" stopColor={C0} /><stop offset=".45" stopColor={C1} /><stop offset="1" stopColor={C2} /></linearGradient>
              <clipPath id="outClip">{MARK.paths.map((d, i) => <path key={i} d={d} transform={`translate(${gx}, ${gy}) scale(${gs})`} />)}</clipPath>
            </defs>
            <g clipPath="url(#outClip)" opacity={1 - own}><rect width="1920" height="1080" fill="url(#outG)" /></g>
            <g opacity={own}>{MARK.paths.map((d, i) => <path key={i} d={d} fill={MARK.fills[i]} stroke={MARK.fills[i]} strokeWidth={1.2 / gs} transform={`translate(${gx}, ${gy}) scale(${gs})`} />)}</g>
          </svg>
          {wordText && !wordmark && <div style={{position: 'absolute', left: wordX, top: wordY, fontFamily: F.display, fontWeight: 600, fontSize: wordSize, lineHeight: 1, letterSpacing: '-0.04em', color: INK, whiteSpace: 'nowrap', opacity: wa, filter: `blur(${(1 - wa) * 12}px)`, transform: `translateX(${(1 - wa) * -60}px)`}}>{wordText}</div>}
          {wordmark && <Img src={staticFile(wordmark)} style={{position: 'absolute', left: wordX, top: wordY, width: wordW, opacity: wa, filter: `blur(${(1 - wa) * 12}px)`, transform: `translateX(${(1 - wa) * -60}px)`}} />}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
