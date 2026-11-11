import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
// Scenes start rendering a few frames before their cut (the transition overlaps them), so every scene reads its
// frame through useF(): frame 0 is the cut. ALWAYS use useF (and helpers built on it) inside scenes, never
// useCurrentFrame: mixing the two puts sounds and cursors off by the transition length.
export const FrameOffset = createContext(0);
export const useF = () => useCurrentFrame() - useContext(FrameOffset);
// true inside scenes: the Film draws one shared ground under all scenes, so scenes do not draw their own
export const NoGround = createContext(false);
