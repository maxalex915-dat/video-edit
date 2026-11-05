import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KEYFRAMES} from './KeyFrames';
import {C, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';

const CAP: [string, string, string][] = [
  ['0.0 to 4.8 s', 'Problem', 'Seven tiles pop in, one per beat. Second line adds a login box to each.'],
  ['4.8 to 9.2 s', 'Problem', 'Spreadsheets pile up, numbers type in. Then all of it is crushed into one point.'],
  ['9.2 to 13.7 s', 'Reveal, on the drop', 'The point bursts into a gradient flash. Name slams in. Gradient shrinks into the hero card.'],
  ['13.7 to 18.1 s', 'All channels', 'Home page in a slow 3D tilt. Numbers count up, trend lines draw one by one.'],
  ['18.1 to 22.5 s', 'Time saved', 'Clock sweeps. "By hand" crawls, "Automatic" fills and gets a tick. Sources dock.'],
  ['22.5 to 27.0 s', 'What works', 'Bars rise, best bar gets its tag. Bars morph into a trend line, "+29%" pops.'],
  ['27.0 to 31.4 s', 'Weekly AI briefing', 'Glass card slides in, the sentence types itself, three stat cards cascade.'],
  ['31.4 to 35.9 s', 'Site audit', 'Gauges sweep to their scores, chips pop, fixes tick off one by one.'],
  ['35.9 to 40.3 s', 'Competitors', 'Report pages fan out in 3D. Priority grid fills with competitor dots.'],
  ['40.3 to 44.8 s', 'Monitoring', 'Mention alert drops in, request rows stack, monthly bars grow.'],
  ['44.8 to 49.2 s', 'Projects', 'Cursor drags a card from To do to Done. Portfolio donut draws.'],
  ['49.2 to 53.7 s', 'Proof', 'Every tile flies in to form the bento grid. Camera pulls back.'],
  ['53.7 to 60.0 s', 'Close', 'Music ending. Clean lockup, slow drift, hold to the end.'],
];

const COLS = 4, PW = 640, PH = 360, GAP = 44, CAPH = 120, TOP = 230;
export const BOARD_W = COLS * PW + (COLS + 1) * GAP;
export const BOARD_H = TOP + 4 * (PH + CAPH + GAP) + 40;

export const Board: React.FC = () => (
  <AbsoluteFill style={{background: '#06191c', fontFamily: F.text, color: C.textOnDark}}>
    <div style={{position: 'absolute', left: GAP, top: 56}}>
      <div style={{fontFamily: F.display, fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em'}}>Marketing Dashboard launch film</div>
      <div style={{fontSize: 26, color: C.mutedOnDark, marginTop: 10}}>Storyboard v1 · 13 key frames · 60 s · 1920x1080 · cuts on the music's bars (108 BPM) · all figures are demo data</div>
      <div style={{width: 240, height: 6, borderRadius: 3, background: LOOP_BAR, marginTop: 20}} />
    </div>
    {KEYFRAMES.map((K, i) => {
      const x = GAP + (i % COLS) * (PW + GAP), y = TOP + Math.floor(i / COLS) * (PH + CAPH + GAP);
      return (
        <div key={i} style={{position: 'absolute', left: x, top: y, width: PW}}>
          <div style={{width: PW, height: PH, borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px -20px rgba(0,0,0,.8)', border: '1px solid rgba(180,235,240,.12)'}}>
            <div style={{width: 1920, height: 1080, transform: `scale(${PW / 1920})`, transformOrigin: 'top left', position: 'absolute'}}><K /></div>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'baseline', marginTop: 14}}>
            <span style={{fontFamily: F.mono, fontSize: 20, color: C.cyan}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{fontSize: 22, fontWeight: 700}}>{CAP[i][1]}</span>
            <span style={{fontFamily: F.mono, fontSize: 17, color: C.mutedOnDark, marginLeft: 'auto'}}>{CAP[i][0]}</span>
          </div>
          <div style={{fontSize: 18, color: C.mutedOnDark, marginTop: 6, lineHeight: 1.4}}>{CAP[i][2]}</div>
        </div>
      );
    })}
  </AbsoluteFill>
);
