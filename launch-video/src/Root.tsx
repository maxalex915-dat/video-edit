import React from 'react';
import {Composition, Still} from 'remotion';
import {loadFonts} from './theme/fonts';
import {Board, BOARD_H, BOARD_W} from './storyboard/Board';
import {KEYFRAMES} from './storyboard/KeyFrames';
import {Launch} from './Launch';
import {TOTAL} from './timeline';
import {Contact} from './Contact';

loadFonts();

const KeyFrame: React.FC<{i: number}> = ({i}) => {
  const K = KEYFRAMES[i];
  return <K />;
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Launch" component={Launch} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{music: true, sfx: true}} />
    <Still id="Contact" component={Contact} width={6 * 488} height={6 * 278} defaultProps={{cols: 6}} />
    <Still id="Board" component={Board} width={BOARD_W} height={BOARD_H} />
    <Still id="KeyFrame" component={KeyFrame} width={1920} height={1080} defaultProps={{i: 0}} />
  </>
);
