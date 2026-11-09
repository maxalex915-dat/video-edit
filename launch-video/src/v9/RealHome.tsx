import React from 'react';
import {Img, staticFile} from 'remotion';
import {useF} from '../frame';
import {prog, E, lerp} from '../theme/motion';
import {C} from '../theme/tokens';
import {F} from '../theme/fonts';
const GLASS_BG = 'linear-gradient(150deg, rgba(255,255,255,.72), rgba(255,255,255,.42)), linear-gradient(135deg, rgba(127,188,66,.22) 0%, rgba(0,185,239,.22) 45%, rgba(112,203,243,.22) 100%)';

// The real Home tab of the dashboard (key numbers fold), redrawn as vectors from the approved design
// (marketing-dashboard-clone/docs/mockups/home-redesign/v3.html). Native size 1600 x 900; figures are the mockup's.
const LOOP = 'linear-gradient(135deg, #7fbc42 0%, #00b9ef 40%, #70cbf3 100%)';
const TEAL = '#055e63', INK = '#10242a', MUTE = '#6b7f84', LINE = '#e6eef0', GREEN = '#2f7a4a', RED = '#b3261e';
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const Pill: React.FC<{up: boolean; v: string}> = ({up, v}) => <span style={{fontSize: 12, fontWeight: 700, color: up ? GREEN : RED, background: up ? 'rgba(127,188,66,.16)' : 'rgba(179,38,30,.1)', borderRadius: 99, padding: '3px 8px', whiteSpace: 'nowrap'}}>{up ? '▲' : '▼'} {v}</span>;
const Arrow = () => <span style={{width: 26, height: 26, borderRadius: 99, border: `1px solid ${LINE}`, display: 'grid', placeItems: 'center', color: MUTE, fontSize: 14}}>→</span>;
const LiftCtx = React.createContext(0);
const Card: React.FC<{x: number; y: number; w: number; h: number; children: React.ReactNode; at: number; z?: number; bg?: string}> = ({x, y, w, h, children, at, z = 60, bg = 'linear-gradient(160deg, rgba(255,255,255,.86), rgba(255,255,255,.62))'}) => {
  const f = useF();
  const p = prog(f, at, 18, E.snappy);
  const lift = React.useContext(LiftCtx);
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 22, background: bg, boxShadow: `0 0 0 1.5px rgba(255,255,255,.95), 0 ${14 + lift * z * 0.5}px ${34 + lift * z}px -16px rgba(0,110,150,${0.3 + lift * 0.15})`, padding: '20px 22px', boxSizing: 'border-box', overflow: 'hidden', opacity: p, transform: `translateY(${(1 - p) * 24}px) translateZ(${lift * z}px)`}}>{children}</div>;
};
const NAV: [string, [string, boolean?, string?][]][] = [
  ['OVERVIEW', [['Home', true], ['Insights']]],
  ['PLATFORMS', [['Website', false, 'dot'], ['Search', false, 'dot'], ['Social', false, 'dot'], ['Email', false, 'dot']]],
  ['MONITORING', [['PR Tracking', false, '3'], ['Archetype Competitive Intelligence (ACI)'], ['Business Inquiries']]],
  ['PROJECTS', [['To Be Approved', false, '7'], ['PPM Statistics']]],
  ['WEBSITE HEALTH', [['Site Audit']]],
];
// daily impressions, 30 days, with the 5 Oct spike and the dotted days Google has not reported yet
const IMP = [62, 58, 70, 64, 76, 60, 55, 66, 72, 58, 64, 60, 70, 82, 230, 120, 66, 60, 72, 64, 58, 62, 68, 60, 64, 70, 42, 36, 38, 40];
const ENG = [44, 52, 40, 58, 46, 54, 60, 50, 64, 48, 70, 56, 100, 62, 58, 66];

export const RealHome: React.FC<{at?: number; lift?: number}> = ({at = 0, lift = 0}) => {
  const f = useF() - at;
  const n = prog(f, 14, 40, E.snappy);
  const draw = prog(f, 12, 46, E.inOut);
  const hx = (i: number) => 22 + i * (430 / 29), hy = (v: number) => 470 - v * 1.25;
  const solid = IMP.slice(0, 27).map((v, i) => `${i ? 'L' : 'M'}${hx(i)},${hy(v)}`).join(' ');
  const dotted = IMP.slice(26).map((v, i) => `${i ? 'L' : 'M'}${hx(26 + i)},${hy(v)}`).join(' ');
  return (
    <LiftCtx.Provider value={lift}><div style={{position: 'absolute', left: 0, top: 0, width: 1600, height: 900, borderRadius: 26, background: GLASS_BG, fontFamily: F.text, color: INK, transformStyle: 'preserve-3d', boxShadow: '0 0 0 2px rgba(255,255,255,.95)'}}>
      {/* sidebar */}
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 244, borderRadius: '26px 0 0 26px', background: 'rgba(255,255,255,.5)', borderRight: '1px solid rgba(255,255,255,.9)', padding: '16px 10px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 14px'}}>
          <Img src={staticFile('logo_loop.svg')} style={{width: 24, height: 24, objectFit: 'contain'}} />
          <div><div style={{fontSize: 14, fontWeight: 700}}>Archetype</div><div style={{fontSize: 11, color: MUTE}}>Marketing Dashboard</div></div>
        </div>
        {NAV.map(([g, items]) => (
          <div key={g} style={{marginBottom: 12}}>
            <div style={{fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em', color: MUTE, padding: '4px 8px'}}>{g}</div>
            {items.map(([t, on, tag]) => (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 99, fontSize: 14, fontWeight: on ? 700 : 500, color: on ? '#fff' : INK, background: on ? 'linear-gradient(135deg,#0a6b5f,#055e63 50%,#0b6d86)' : 'transparent', lineHeight: 1.2}}>
                <span style={{width: 15, height: 15, flex: 'none', borderRadius: 4, border: `1.8px solid ${on ? '#fff' : '#536a70'}`}} />
                <span style={{flex: 1}}>{t}</span>
                {tag === 'dot' && <span style={{width: 6, height: 6, borderRadius: 9, background: '#3fa45a'}} />}
                {tag && tag !== 'dot' && <span style={{width: 18, height: 18, borderRadius: 99, background: '#b3261e', color: '#fff', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center'}}>{tag}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* top bar */}
      <div style={{position: 'absolute', left: 268, top: 12}}><div style={{fontSize: 21, fontWeight: 700}}>Home</div><div style={{fontSize: 12, color: MUTE, marginTop: 2}}>Digital performance across every channel</div></div>
      <div style={{position: 'absolute', right: 24, top: 18, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600}}>
        <span style={{letterSpacing: '.1em', color: MUTE, fontSize: 11, marginRight: 4}}>RANGE</span>
        {['7d', '1m', '3m', '6m', 'YTD', '12m', 'All', 'Custom'].map((r) => <span key={r} style={{padding: '5px 11px', borderRadius: 99, color: r === '1m' ? '#fff' : MUTE, background: r === '1m' ? 'linear-gradient(135deg,#3f7a26,#00647d 40%,#1f6d8a)' : 'transparent'}}>{r}</span>)}
        <span style={{marginLeft: 10, padding: '6px 12px', borderRadius: 99, background: '#fff', boxShadow: `0 0 0 1px ${LINE}`, color: INK}}><span style={{color: '#3fa45a'}}>●</span> Updated: 4 hours ago</span>
      </div>
      <div style={{position: 'absolute', left: 278, top: 82, fontSize: 12.5, fontWeight: 600, color: MUTE}}>Key numbers</div>

      {/* hero: total impressions */}
      <Card x={274} y={110} w={640} h={640} at={4} z={170} bg={LOOP}>
        <div style={{display: 'flex', justifyContent: 'space-between', color: '#fff'}}><span style={{fontSize: 19, fontWeight: 700}}>Total impressions</span><span style={{width: 26, height: 26, borderRadius: 99, background: 'rgba(255,255,255,.25)', display: 'grid', placeItems: 'center'}}>→</span></div>
        <div style={{fontFamily: F.display, fontSize: 66, fontWeight: 750, color: '#fff', letterSpacing: '-0.03em', marginTop: 14, fontVariantNumeric: 'tabular-nums'}}>{fmt(164715 * n)}</div>
        <span style={{display: 'inline-block', marginTop: 6, fontSize: 12.5, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,.22)', borderRadius: 99, padding: '4px 10px'}}>▼ 5.9% vs previous 30 days</span>
        <svg width="600" height="520" style={{position: 'absolute', left: 0, top: 0}}>
          <defs><linearGradient id="rhfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
            <clipPath id="rhclip"><rect x={0} y={0} width={22 + 430 * draw + 6} height={600} /></clipPath></defs>
          <g clipPath="url(#rhclip)">
            <path d={`${solid} L${hx(26)},560 L22,560 Z`} fill="url(#rhfill)" transform="translate(30,40)" />
            <path d={solid} fill="none" stroke="#fff" strokeWidth={3} strokeLinejoin="round" transform="translate(30,40)" />
            <path d={dotted} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="3 7" strokeLinecap="round" transform="translate(30,40)" />
            <circle cx={hx(29) + 30} cy={hy(40) + 40} r={6} fill="#fff" />
          </g>
          <text x={430} y={hy(70) + 30} fontSize={11.5} fill="#fff" opacity={0.85 * draw}>Google is 3 days behind</text>
        </svg>
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 52, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'rgba(255,255,255,.9)'}}>{['21 Sep', '28 Sep', '5 Oct', '12 Oct', '20 Oct'].map((d) => <span key={d}>{d}</span>)}</div>
        <div style={{position: 'absolute', left: 22, bottom: 20, fontSize: 12.5, color: '#fff'}}>Google search 47%  ·  LinkedIn 29%  ·  Facebook 23%  ·  Email opens 1%</div>
      </Card>

      {/* total engagements */}
      <Card x={930} y={110} w={316} h={312} at={9} z={110}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: 17, fontWeight: 700}}>Total engagements</span><Arrow /></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 8}}><span style={{fontFamily: F.display, fontSize: 40, fontWeight: 750, backgroundImage: LOOP, WebkitBackgroundClip: 'text', color: 'transparent'}}>{fmt(4916 * n)}</span><Pill up v="32.0%" /></div>
        <div style={{fontSize: 12, color: MUTE}}>vs previous 30 days</div>
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 44, height: 120, display: 'flex', alignItems: 'flex-end', gap: 5}}>
          {ENG.map((v, i) => <div key={i} style={{flex: 1, height: v * 1.05 * prog(f, 18 + i, 20, E.snappy), borderRadius: 4, background: v === 100 ? LOOP : '#dfe8ea', position: 'relative'}}>{v === 100 && <span style={{position: 'absolute', top: -24, left: -12, fontSize: 10.5, fontWeight: 700, fontStyle: 'italic', color: '#fff', background: TEAL, borderRadius: 99, padding: '2px 7px', opacity: prog(f, 44, 10)}}>best</span>}</div>)}
        </div>
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 18, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MUTE}}><span>7 Oct</span><span>20 Oct</span></div>
      </Card>

      {/* social followers */}
      <Card x={1262} y={110} w={316} h={312} at={13} z={140}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: 17, fontWeight: 700}}>Social followers</span><Arrow /></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 8}}><span style={{fontFamily: F.display, fontSize: 40, fontWeight: 750, backgroundImage: LOOP, WebkitBackgroundClip: 'text', color: 'transparent'}}>{fmt(60318 * n)}</span><Pill up v="1.2%" /></div>
        <div style={{fontSize: 12, color: MUTE}}>vs previous 30 days</div>
        <svg width="110" height="110" style={{position: 'absolute', left: 20, top: 168}} viewBox="-55 -55 110 110">
          {[[0.754, '#0a66c2'], [0.218, '#1877f2'], [0.016, '#e1306c'], [0.012, '#ff0000']].reduce<{o: number; el: React.ReactElement[]}>((acc, [v, c], i) => {
            const len = (v as number) * 2 * Math.PI * 42 * prog(f, 18, 40, E.inOut);
            acc.el.push(<circle key={i} r={42} fill="none" stroke={c as string} strokeWidth={13} strokeDasharray={`${len} 400`} strokeDashoffset={-acc.o} transform="rotate(-90)" />);
            acc.o += (v as number) * 2 * Math.PI * 42 * prog(f, 18, 40, E.inOut); return acc;
          }, {o: 0, el: []}).el}
          <text y={2} textAnchor="middle" fontSize={16} fontWeight={750} fill={INK}>+721</text><text y={16} textAnchor="middle" fontSize={9} fill={MUTE}>net</text>
        </svg>
        <div style={{position: 'absolute', left: 150, right: 22, top: 182, fontSize: 12.5, display: 'grid', gap: 9}}>
          {[['LinkedIn', '45,460', '#0a66c2'], ['Facebook', '13,184', '#1877f2'], ['Instagram', '960', '#e1306c'], ['YouTube', '714', '#ff0000']].map(([a, b, c]) => <div key={a} style={{display: 'flex', alignItems: 'center', gap: 7}}><span style={{width: 9, height: 9, borderRadius: 2, background: c}} /><span style={{flex: 1}}>{a}</span><b>{b}</b></div>)}
        </div>
      </Card>

      {/* PR articles */}
      <Card x={930} y={438} w={316} h={312} at={17} z={130}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: 17, fontWeight: 700}}>PR articles</span><Arrow /></div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 8}}><span style={{fontFamily: F.display, fontSize: 40, fontWeight: 750, backgroundImage: LOOP, WebkitBackgroundClip: 'text', color: 'transparent'}}>{Math.round(14 * n)}</span><Pill up v="55.6%" /></div>
        <div style={{fontSize: 12, color: MUTE}}>vs 9 in the previous 30 days</div>
        <div style={{position: 'absolute', left: 22, right: 22, top: 168, borderRadius: 14, background: '#fff', boxShadow: '0 0 0 1px rgba(5,60,63,.08), 0 12px 24px -12px rgba(5,60,63,.25)', padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center', transform: `translateY(${(1 - prog(f, 40, 16, E.snappy)) * 20}px)`, opacity: prog(f, 40, 12)}}>
          <span style={{width: 34, height: 34, borderRadius: 10, background: LOOP}} />
          <div><div style={{fontSize: 13, fontWeight: 700}}>3 new mentions</div><div style={{fontSize: 11.5, color: MUTE}}>VnExpress, 2 days ago</div></div>
        </div>
        <div style={{position: 'absolute', left: 22, bottom: 20, fontSize: 12, color: INK}}>Brand 9  ·  People 3  ·  Offices 2</div>
      </Card>

      {/* this week */}
      <Card x={1262} y={438} w={316} h={312} at={21} z={95}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, fontWeight: 700}}><span style={{width: 26, height: 26, borderRadius: 99, background: LOOP}} />This week</span><Arrow /></div>
        <div style={{fontSize: 14, fontWeight: 700, lineHeight: 1.35, marginTop: 14}}>Website traffic nearly doubled, Thursday 8 Oct was the standout day</div>
        <div style={{position: 'absolute', left: 22, right: 22, top: 176, display: 'flex', gap: 8}}>
          {[['+96%', 'pages viewed'], ['20x', 'Instagram reach Sun'], ['+33%', 'LinkedIn clicks']].map(([a, b], i) => <div key={a} style={{flex: 1, background: '#f1f6f7', borderRadius: 12, padding: '10px 10px', opacity: prog(f, 36 + i * 4, 12), transform: `translateY(${(1 - prog(f, 36 + i * 4, 14, E.snappy)) * 14}px)`}}><span style={{display: 'block', width: 20, height: 20, borderRadius: 6, background: LOOP, marginBottom: 8}} /><div style={{fontSize: 16, fontWeight: 750}}>{a}</div><div style={{fontSize: 10.5, color: MUTE, lineHeight: 1.25}}>{b}</div></div>)}
        </div>
        <div style={{position: 'absolute', left: 22, bottom: 20, fontSize: 12, fontWeight: 700, color: TEAL}}>See all insights →</div>
      </Card>

      {/* start of the Every platform section, below the fold */}
      <Card x={274} y={770} w={1304} h={112} at={26} z={60}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}><span style={{fontSize: 17, fontWeight: 700}}>Every platform</span><span style={{fontSize: 12, color: MUTE}}>the last 30 days · each platform in its own words</span></div>
        <div style={{display: 'flex', gap: 12, marginTop: 14}}>
          {[['LinkedIn', '47,415', '#0a66c2'], ['Facebook', '37,951', '#1877f2'], ['Instagram', '401', '#e1306c'], ['YouTube', '2,342', '#ff0000'], ['Website', '13,246', TEAL], ['Search', '77,699', '#00768f']].map(([a, b, c]) => <div key={a} style={{flex: 1, borderRadius: 14, boxShadow: `0 0 0 1px ${LINE}`, padding: '12px 14px'}}><div style={{display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, fontWeight: 700}}><span style={{width: 24, height: 24, borderRadius: 7, background: c}} />{a}</div><div style={{fontSize: 22, fontWeight: 750, marginTop: 10}}>{b}</div></div>)}
        </div>
      </Card>
      <span style={{display: 'none'}}>{lerp(0, 0, 0)}{C.ink}</span>
    </div></LiftCtx.Provider>
  );
};
