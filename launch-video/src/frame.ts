import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
// Scenes start rendering a few frames before their cut (the camera pan overlaps them),
// so each scene reads its frame through this offset: frame 0 is still the bar line.
export const FrameOffset = createContext(0);
export const useF = () => useCurrentFrame() - useContext(FrameOffset);
// v6: when an older scene is placed inside a new frame (a tilted app window), it drops its own ground and headline.
export const Bare = createContext(false);
// v8: one continuous ground runs under the whole film, so scenes leave theirs out.
export const NoGround = createContext(false);
