import React from 'react';
import {Composition, Still} from 'remotion';
import {loadFonts} from './theme/fonts';
import {Board, BOARD_H, BOARD_W} from './storyboard/Board';
import {KEYFRAMES} from './storyboard/KeyFrames';

loadFonts();

const KeyFrame: React.FC<{i: number}> = ({i}) => {
  const K = KEYFRAMES[i];
  return <K />;
};

export const RemotionRoot: React.FC = () => (
  <>
    <Still id="Board" component={Board} width={BOARD_W} height={BOARD_H} />
    <Still id="KeyFrame" component={KeyFrame} width={1920} height={1080} defaultProps={{i: 0}} />
  </>
);
