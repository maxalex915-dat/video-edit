import React from 'react';
import {AbsoluteFill} from 'remotion';
import {KEYFRAMES} from './KeyFrames';
import {C, LOOP_BAR} from '../theme/tokens';
import {F} from '../theme/fonts';

const CAP: [string, string, string][] = [
  ['0:00 to 0:04', 'Problem', 'Seven tiles pop in, one per beat. Second line adds a login box to each.'],
  ['0:04 to 0:09', 'Problem', 'Spreadsheets pile up, numbers type in. Then all of it is crushed into one point.'],
  ['0:09 to 0:13', 'Reveal, on the drop', 'The point bursts into a gradient flash. Name slams in. Gradient shrinks into the hero card.'],
  ['0:13 to 0:18', 'All channels', 'Home page in a slow 3D tilt. Numbers count up, trend lines draw one by one.'],
  ['0:18 to 0:22', 'Time saved', 'Clock sweeps. "By hand" crawls, "Automatic" fills and gets a tick. Sources dock.'],
  ['0:22 to 0:27', 'Website', 'Two session lines draw together, city bars grow in a cascade, totals count up.'],
  ['0:27 to 0:31', 'Search', 'Four numbers count up, top searches slide in row by row, ranks pop green.'],
  ['0:31 to 0:35', 'Social: what works', 'Bars rise, best bar gets its tag. Bars morph into a trend line, "+29%" pops.'],
  ['0:35 to 0:40', 'Email', 'Card slides in from the left, figures count, the sent, opened, clicked funnel fills.'],
  ['0:40 to 0:44', 'Weekly AI briefing', 'Glass card slides in, the sentence types itself, three stat cards cascade.'],
  ['0:44 to 0:49', 'Site audit', 'Gauges sweep to their scores, chips pop, fixes tick off one by one.'],
  ['0:49 to 0:53', 'Competitors', 'Report pages fan out in 3D. Priority grid fills with competitor dots.'],
  ['0:53 to 0:58', '22 country offices', 'Region cards open, 22 country chips pop in a wave from west to east.'],
  ['0:58 to 1:02', 'Report emails and links', 'Email card drops in, link is made with a click, the report book turns a page.'],
  ['1:02 to 1:06', 'PR mentions', 'A new mention drops on top, older ones push down the stack.'],
  ['1:06 to 1:11', 'Business inquiries', 'Request rows stack in, monthly bars grow, the total counts to 24.'],
  ['1:11 to 1:15', 'Approvals and projects', 'Cursor drags a card from To do to Done. Portfolio donut draws.'],
  ['1:15 to 1:22', 'Your bento', 'Each tile flies in to its place in your bento. Camera pulls back to show it whole.'],
  ['1:22 to 1:30', 'Close', 'Music ending. Clean lockup, slow drift, hold to the end.'],
];

const COLS = 4, PW = 640, PH = 360, GAP = 44, CAPH = 120, TOP = 230;
const ROWS = Math.ceil(19 / COLS);
export const BOARD_W = COLS * PW + (COLS + 1) * GAP;
export const BOARD_H = TOP + ROWS * (PH + CAPH + GAP) + 40;

export const Board: React.FC = () => (
  <AbsoluteFill style={{background: '#ffffff', fontFamily: F.text, color: C.ink}}>
    <div style={{position: 'absolute', left: GAP, top: 56}}>
      <div style={{fontFamily: F.display, fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em'}}>Marketing Dashboard launch film</div>
      <div style={{fontSize: 26, color: C.mutedOnDark, marginTop: 10}}>Storyboard v2, white theme · 19 key frames · 90 s · 1920x1080 · cuts on the music's bars (108 BPM) · all figures are demo data</div>
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
