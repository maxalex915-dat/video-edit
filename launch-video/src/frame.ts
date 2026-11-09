import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
// Scenes start rendering a few frames before their cut (the camera pan overlaps them),
// so each scene reads its frame through this offset: frame 0 is still the bar line.
export const FrameOffset = createContext(0);
export const useF = () => useCurrentFrame() - useContext(FrameOffset);
