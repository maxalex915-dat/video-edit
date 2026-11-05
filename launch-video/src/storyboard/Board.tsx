import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KEYFRAMES} from './KeyFrames';
import {C, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';

const CAP: [string, string, string][] = [
  ['0:00 to 0:04', 'Problem', 'Seven real sign-in cards slide in one per beat along an arc, far ones soft.'],
  ['0:04 to 0:09', 'Problem', 'Slow drift over an old spreadsheet. A value is pasted into the lit cell. Fast pull-out on the build.'],
  ['0:09 to 0:13', 'Reveal, on the drop', 'Brand light blooms behind the mark. The name rises from behind a mask.'],
  ['0:13 to 0:18', 'All channels', 'Camera drifts over the real Home page. Hero card in focus, numbers count, the rest soft.'],
  ['0:18 to 0:22', 'Time saved', 'Hairline clock ring fills, 07:13 rolls in digit by digit, the seven sources tick in.'],
  ['0:22 to 0:27', 'Website', 'Punch-in on the city list. Bars grow in a cascade, the top city lights up.'],
  ['0:27 to 0:31', 'Search', 'Camera tilts down the top-searches table. The first row sharpens, rank callout pops.'],
  ['0:31 to 0:35', 'Social: what works', 'Push-in on the six platform cards. The best one stays sharp and gets a callout.'],
  ['0:35 to 0:40', 'Email', 'Funnel bars fill in order. Focus racks from Sent down to Opened.'],
  ['0:40 to 0:44', 'Weekly AI briefing', 'Type moment: the briefing sentence types itself, stat tiles cascade under it.'],
  ['0:44 to 0:49', 'Site audit', 'Gauge sweeps to 72. Focus slides right as fixes tick off.'],
  ['0:49 to 0:53', 'Competitors', 'Two report pages drift in depth. The priority grid fills dot by dot.'],
  ['0:53 to 0:58', '22 offices', 'Hairline globe turns, 22 pins light west to east, arcs draw home to Vietnam.'],
  ['0:58 to 1:02', 'Report emails and links', 'Share panel rises over the report, 30 days is pressed, the link copies.'],
  ['1:02 to 1:06', 'PR mentions', 'A new mention slides in at the top of the feed and gets a cyan ring.'],
  ['1:06 to 1:11', 'Business inquiries', 'Bars grow left to right, the total counts to 24, rows stack in.'],
  ['1:11 to 1:15', 'Approvals and projects', 'Cursor lifts a card and carries it to Done, its shadow grows as it lifts.'],
  ['1:15 to 1:22', 'Your bento', 'Every tile settles into your bento in a cascade. Slow pull-back.'],
  ['1:22 to 1:30', 'Close', 'Music ending. Brand light behind the mark, the name, where to find it. Hold.'],
];

const COLS = 4, PW = 640, PH = 360, GAP = 44, CAPH = 120, TOP = 230;
const ROWS = Math.ceil(19 / COLS);
export const BOARD_W = COLS * PW + (COLS + 1) * GAP;
export const BOARD_H = TOP + ROWS * (PH + CAPH + GAP) + 40;

export const Board: React.FC = () => (
  <AbsoluteFill style={{background: '#ffffff', fontFamily: F.text, color: C.ink}}>
    <div style={{position: 'absolute', left: GAP, top: 56}}>
      <div style={{fontFamily: F.display, fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em'}}>Marketing Dashboard launch film</div>
      <div style={{fontSize: 26, color: C.mutedOnDark, marginTop: 10}}>Storyboard v5 · vivid brand gradient and white scenes alternate · text always on a clean area · 90 s · 1920x1080 · cuts on the music's bars (108 BPM) · all figures are demo data</div>
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
