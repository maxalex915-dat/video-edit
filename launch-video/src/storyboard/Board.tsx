import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KEYFRAMES} from './KeyFrames';
import {C, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';

const CAP: [string, string, string][] = [
  ['0:00 to 0:04', 'Problem: time wasted', 'Sign-in cards slide in one per beat. Cursor clicks Sign in, the card shakes: wrong password.'],
  ['0:04 to 0:09', 'Problem: copy and paste', 'Cursor drags a selection, Ctrl+C, jumps to another file, Ctrl+V. Numbers type in cell by cell, faster and faster.'],
  ['0:09 to 0:13', 'Reveal, on the drop', 'The swirl blooms, the mark pops in, the name rises from behind a mask.'],
  ['0:13 to 0:18', 'Value: the full picture', 'Cards build in a cascade. Cursor clicks 12 months: every number and line re-counts and redraws.'],
  ['0:18 to 0:22', 'Value: hours back', 'Seven source cards tick green one per beat, numbers roll up live. "No one typed this."'],
  ['0:22 to 0:27', 'Value: know your audience', 'Bars grow city by city. Cursor hovers the top city, tooltip pops with visitors and growth.'],
  ['0:27 to 0:31', 'Value: client intent', 'Cursor types "factory" in search, the table filters live, the top row lifts and sharpens.'],
  ['0:31 to 0:35', 'Value: do what works', 'Cursor hovers across platform cards, each lifts. Click on the best one: it expands to its full chart.'],
  ['0:35 to 0:40', 'Value: emails that land', 'Funnel bars fill in order. Cursor hovers Opened, tooltip counts up to 1,317.'],
  ['0:40 to 0:44', 'Value: insight, not data', 'The briefing types itself sentence by sentence; stat tiles cascade in under it.'],
  ['0:44 to 0:49', 'Value: $1,200 saved a year', 'Renewal notice slides in. Cursor clicks Cancel plan, price strikes through. Site Audit card swings in, gauge sweeps.'],
  ['0:49 to 0:53', 'Value: ahead of competitors', 'Report pages fan in, priority grid fills dot by dot. Cursor clicks Download PDF, button fills.'],
  ['0:53 to 0:58', 'Value: every office covered', 'Globe turns, 22 pins light up west to east. Cursor clicks Thailand, its local card pops out.'],
  ['0:58 to 1:02', 'Value: everyone informed', 'Cursor picks 30 days, clicks Copy link, tooltip "Link copied", the report turns a page behind.'],
  ['1:02 to 1:06', 'Value: no mention missed', 'Notification drops in top-right. The feed shifts down, the new mention slides in with a ring.'],
  ['1:06 to 1:11', 'Value: no lead lost', 'Cursor opens the status menu on a lead, picks Won. Row turns teal, the monthly total ticks up.'],
  ['1:11 to 1:15', 'Value: faster approvals', 'Cursor drags a card across the board to Done, tag flips from Urgent to Approved.'],
  ['1:15 to 1:22', 'Your bento', 'Every tile flies in and lands in its place in your bento, in a cascade. Slow pull-back.'],
  ['1:22 to 1:30', 'Close', 'Music ending. Mark, name, where to find it, credit. Hold on the swirl.'],
];

const COLS = 4, PW = 640, PH = 360, GAP = 44, CAPH = 120, TOP = 230;
const ROWS = Math.ceil(19 / COLS);
export const BOARD_W = COLS * PW + (COLS + 1) * GAP;
export const BOARD_H = TOP + ROWS * (PH + CAPH + GAP) + 40;

export const Board: React.FC = () => (
  <AbsoluteFill style={{background: '#ffffff', fontFamily: F.text, color: C.ink}}>
    <div style={{position: 'absolute', left: GAP, top: 56}}>
      <div style={{fontFamily: F.display, fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em'}}>Marketing Dashboard launch film</div>
      <div style={{fontSize: 26, color: C.mutedOnDark, marginTop: 10}}>Storyboard v6 · value first · a real interaction in every scene · a different gradient style per scene · 90 s · 1920x1080 · cuts on the music's bars (108 BPM) · all figures are demo data</div>
      <div style={{width: 240, height: 6, borderRadius: 3, background: LOOP_BAR, marginTop: 20}} />
    </div>
    {KEYFRAMES.map((K, i) => {
      const x = GAP + (i % COLS) * (PW + GAP), y = TOP + Math.floor(i / COLS) * (PH + CAPH + GAP);
      return (
        <div key={i} style={{position: 'absolute', left: x, top: y, width: PW}}>
          <div style={{width: PW, height: PH, borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px -20px rgba(5,60,63,.35)', border: '1px solid rgba(5,94,99,.12)'}}>
            <div style={{width: 1920, height: 1080, transform: `scale(${PW / 1920})`, transformOrigin: 'top left', position: 'absolute'}}><K /></div>
          </div>
          <div style={{display: 'flex', gap: 12, alignItems: 'baseline', marginTop: 14}}>
            <span style={{fontFamily: F.mono, fontSize: 20, color: C.cyanInk}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{fontSize: 22, fontWeight: 700}}>{CAP[i][1]}</span>
            <span style={{fontFamily: F.mono, fontSize: 17, color: C.mutedOnDark, marginLeft: 'auto'}}>{CAP[i][0]}</span>
          </div>
          <div style={{fontSize: 18, color: C.mutedOnDark, marginTop: 6, lineHeight: 1.4}}>{CAP[i][2]}</div>
        </div>
      );
    })}
  </AbsoluteFill>
);
