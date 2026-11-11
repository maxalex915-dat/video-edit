import React from 'react';
import {useF} from './frame';
import {cursorPos, Way} from './cursor';

// "Low-power magnet" lift: an (invisible or visible) path glides from card to card; the card under it rises toward
// the viewer and settles again, the cards near it rise a little. The pull is a weighted look back over the last
// 0.8 s, so the lift eases in and out instead of snapping (fast lifts were rejected). The client preferred NO
// visible cursor here: the cards simply float up one after another.
export const HoverCtx = React.createContext<Way[] | null>(null);
export const pull = (f: number, path: Way[] | null, x: number, y: number, w: number, h: number) => {
  if (!path || f < path[0].f) return 0;
  let m = 0, ws = 0;
  for (let k = 0; k < 24; k++) {
    const c = cursorPos(f - k, path);
    const dx = Math.max(x - c.x, 0, c.x - (x + w)), dy = Math.max(y - c.y, 0, c.y - (y + h));
    const d = Math.hypot(dx, dy), wt = Math.sin(((k + 0.5) / 24) * Math.PI);
    m += wt * (d === 0 ? 1 : Math.max(0, 1 - d / 200) * 0.3); ws += wt;
  }
  return m / ws;
};
// A card inside a tilted (preserve-3d) layout. base = the whole layout's lift (0..1), z = how far this card may rise.
export const MagnetCard: React.FC<{x: number; y: number; w: number; h: number; base?: number; z?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, base = 0, z = 80, style, children}) => {
  const f = useF();
  const m = pull(f, React.useContext(HoverCtx), x, y, w, h);
  const ez = m * m * (3 - 2 * m);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 22, boxSizing: 'border-box', overflow: 'hidden',
      boxShadow: `0 0 0 1.5px rgba(255,255,255,.95), 0 ${14 + (base * z) * 0.5 + ez * 30}px ${34 + base * z + ez * 40}px -16px rgba(0,110,150,.35)`,
      transform: `translateZ(${base * z + ez * 90}px) scale(${1 + ez * 0.025})`, ...style}}>{children}</div>
  );
};
