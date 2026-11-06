import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {useF, Ground, Line, words, Typewriter, BigWord, ZoomThrough, Stage, Ghosts, charX, measure, prog, spr, S, E, C, F, TYPE, Cue, Center} from './util';
import {HomeReplica} from '../components/ui/HomeReplica';

// B1 0.0 to 4.4: the problem, typed. A phrase is selected and replaced.
export const b1sfx: Cue[] = [...Array.from({length: 26}).map((_, i) => ({at: 8 + i * 3 + (i > 15 ? 36 : 0), s: `key${i % 4}`, v: 0.25})), {at: 78, s: 'tick', v: 0.3}, {at: 90, s: 'key2', v: 0.4}];
export const B1: React.FC = () => {
  const f = useF();
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Ghosts f={f} />
      <Typewriter ops={[[8, 'type', 'Seven platforms.'], [38, 'type', ' Seven logins.'], [78, 'select', 13], [92, 'delete'], [96, 'type', 'One spreadsheet.']]} size={76} cps={20} />
    </AbsoluteFill>
  );
};

// B2 4.4 to 7.9: "Copied by hand... again?" then the camera dives into the "o".
const T2 = 'Copied by hand… again?';
export const b2sfx: Cue[] = [...Array.from({length: 18}).map((_, i) => ({at: 6 + i * 2, s: `key${i % 4}`, v: 0.25})), {at: 86, s: 'whoosh_long', v: 0.45}];
export const B2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const ox = charX(T2, 1, 76) + 3, oy = 540 + 6;
  return (
    <AbsoluteFill>
      <ZoomThrough at={dur - 12} dur={12} ox={ox} oy={oy} max={90}>
        <Ground kind="glow" />
        <Ghosts f={f + 130} near={prog(f, 0, dur, E.glide)} />
        <Typewriter ops={[[6, 'type', T2]]} size={76} cps={16} />
      </ZoomThrough>
    </AbsoluteFill>
  );
};

// B3 7.9 to 9.2: "Stop copy-pasting reports" blurs into focus.
export const b3sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.3}];
export const B3: React.FC = () => (
  <AbsoluteFill>
    <Ground kind="glow" />
    <Line w={words('Stop *copy-pasting *reports.')} at={0} stagger={6} size={84} />
  </AbsoluteFill>
);

// B4 9.2 to 12.4: on the drop. "Meet" huge, shrinks, the loop pops in, the name builds; then the lockup recedes.
export const b4sfx: Cue[] = [{at: 0, s: 'impact', v: 0.8}, {at: 30, s: 'swoosh_soft', v: 0.3}, {at: 46, s: 'pop', v: 0.45}, {at: 52, s: 'shimmer', v: 0.35}, {at: 84, s: 'swoosh', v: 0.35}];
export const B4: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const rec = prog(f, dur - 12, 12, E.expoIn);
  const icon = spr(f, 44, S.pop);
  const name = prog(f, 48, 20, E.snappy);
  const shift = prog(f, 40, 14, E.inOut);
  const size = 104, gap = 30, iconW = 92;
  const wMeet = measure('Meet', size, 600) - 0.04 * size * 3, wName = measure('Marketing Dashboard', size, 600) - 0.04 * size * 18;
  const total = wMeet + gap + iconW + gap + wName;
  const left = 960 - total / 2;
  const meetCx = 960 + shift * (left + wMeet / 2 - 960);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <AbsoluteFill style={{transform: `scale(${1 - rec * 0.75})`, filter: `blur(${rec * 10}px)`, opacity: 1 - rec}}>
        <BigWord text="Meet" at={0} shrinkAt={30} big={420} small={size} tone="white" x={meetCx - 960} />
        <div style={{position: 'absolute', left: left + wMeet + gap, top: 540 - iconW / 2 + 4, width: iconW, height: iconW, borderRadius: 26, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 16px 40px -10px rgba(0,60,90,.35)', transform: `scale(${icon})`, opacity: Math.min(1, icon)}}><Img src={staticFile('logo_loop.svg')} style={{width: 66}} /></div>
        <div style={{position: 'absolute', left: left + wMeet + gap * 2 + iconW, top: 540 - size * 0.58, ...TYPE(size, 'white'), fontWeight: 600, letterSpacing: '-0.04em', opacity: name, filter: `blur(${(1 - name) * 14}px)`, transform: `translateX(${(1 - name) * -40}px)`}}>Marketing Dashboard</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// B5 12.4 to 15.6: the line builds word by word, then shrinks up as the product rises (B6 overlaps).
export const b5sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.2}];
export const B5: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const up = prog(f, dur - 14, 14, E.inOut);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <AbsoluteFill style={{transform: `translateY(${-up * 420}px) scale(${1 - up * 0.45})`, opacity: 1 - up * 0.2}}>
        <Line w={words('Every channel. One dashboard. Zero copy-paste.')} at={4} stagger={6} size={72} tone="white" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// B6 15.6 to 21.0: the Home page rises from below in 3D, keeps drifting; label top right; camera pushes in.
export const b6sfx: Cue[] = [{at: 0, s: 'whoosh_long', v: 0.4}, {at: 100, s: 'swoosh_soft', v: 0.25}];
export const B6: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const flat = prog(f, 90, dur - 90, E.inOut);
  const lab = prog(f, 14, 20, E.snappy);
  return (
    <AbsoluteFill>
      <Ground kind="field" />
      <div style={{position: 'absolute', left: 110, top: 64, ...TYPE(50, 'white'), lineHeight: 1.05, opacity: lab * (1 - flat), filter: `blur(${(1 - lab) * 10}px)`, transform: `translateX(${(1 - lab) * -40}px)`}}>For the whole marketing team</div>
      <Stage at={0} w={1600} h={1000} x={960 + flat * 120} y={600 + flat * 120} rx={24} ry={-18} rz={5} scale={1.05 + flat * 0.45} flat={flat}>
        <HomeReplica cards={[0, 1, 2, 3, 4, 5].map((i) => prog(f, 6 + i * 4, 18, E.snappy))} draw={prog(f, 14, 40, E.snappy)} count={prog(f, 18, 30, E.snappy)} />
      </Stage>
    </AbsoluteFill>
  );
};
