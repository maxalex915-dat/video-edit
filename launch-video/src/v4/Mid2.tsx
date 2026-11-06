import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useF, Ground, Line, words, Cursor, Ripple, Tip, prog, spr, S, E, C, F, TYPE, ACCENT, Cue, lerp} from '../v3/util';
import {PlatformIcon} from '../components/ui/Primitives';

const TOP: React.CSSProperties = {top: 34, bottom: 'auto', height: 180};
const RAMP = 'linear-gradient(135deg,#7fbc42,#00b9ef 50%,#70cbf3)';
const Spark4: React.FC<{s?: number}> = ({s = 26}) => <svg width={s} height={s} viewBox="0 0 24 24"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="#fff" /></svg>;

// A1: Weekly AI reports. Orbs, the report writes itself, then a recommendation lights up.
const HEAD = 'Posts about factory handovers reached 2.4x the usual audience.';
const T0 = 26, T1 = 86, REC = 100;
export const a1sfx: Cue[] = [{at: 0, s: 'shimmer', v: 0.35}, ...Array.from({length: 16}).map((_, i) => ({at: T0 + i * 4, s: `key${i % 4}`, v: 0.18})), {at: REC, s: 'shimmer', v: 0.4}, {at: REC + 30, s: 'pop', v: 0.3}];
export const A1: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const card = prog(f, 8, 22, E.snappy);
  const n = Math.round(HEAD.length * prog(f, T0, T1 - T0, (x) => x));
  const rec = prog(f, REC, 22, E.snappy);
  const drift = f * 0.25;
  return (
    <AbsoluteFill>
      <Ground kind="ai" />
      <Line w={[['Weekly'], ['AI', true], ['reports', true]]} at={2} stagger={6} size={70} style={TOP} />
      <div style={{position: 'absolute', left: 260, top: 230 - drift * 0.4, width: 1400, borderRadius: 30, padding: 2, background: RAMP, boxShadow: '0 50px 120px -40px rgba(0,140,190,.45)', opacity: card, filter: `blur(${(1 - card) * 12}px)`, transform: `translateY(${(1 - card) * 80}px)`}}>
        <div style={{background: 'rgba(255,255,255,.94)', borderRadius: 28, padding: '34px 44px', fontFamily: F.text, color: C.ink, backdropFilter: 'blur(20px)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 46, height: 46, borderRadius: 14, background: RAMP, display: 'grid', placeItems: 'center', transform: `rotate(${f * 1.5}deg)`}}><Spark4 /></div>
            <span style={{fontSize: 20, fontWeight: 700}}>Weekly AI report</span>
            <span style={{fontSize: 15, color: C.ink3, background: C.inset, borderRadius: 99, padding: '5px 14px'}}>Week of 2 to 8 November</span>
          </div>
          <div style={{fontFamily: F.display, fontSize: 44, fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '26px 0 22px', minHeight: 104, color: C.teal}}>{HEAD.slice(0, n)}{f < T1 + 6 && f >= T0 && <span style={{display: 'inline-block', width: 3, height: 44, background: C.cyan, verticalAlign: 'middle', marginLeft: 3}} />}</div>
          <div style={{display: 'flex', gap: 14, opacity: prog(f, T1 - 4, 12)}}>
            {[['3 of the top 5 posts', 'are handover stories'], ['+38%', 'website visits that week'], ['2x', 'comments asking about timelines']].map(([a, b], i) => (
              <div key={a} style={{flex: 1, background: C.inset, borderRadius: 16, padding: '14px 18px', transform: `translateY(${(1 - prog(f, T1 - 4 + i * 4, 12, E.snappy)) * 16}px)`}}><div style={{fontSize: 26, fontWeight: 750}}>{a}</div><div style={{fontSize: 15, color: C.ink3}}>{b}</div></div>
            ))}
          </div>
          {/* the recommendation */}
          <div style={{marginTop: 22, borderRadius: 20, padding: 2, background: RAMP, opacity: rec, transform: `scale(${0.96 + rec * 0.04})`, boxShadow: `0 0 ${40 * rec}px rgba(0,185,239,${0.35 * rec})`}}>
            <div style={{background: '#fff', borderRadius: 18, padding: '20px 24px', display: 'flex', gap: 18, alignItems: 'flex-start'}}>
              <div style={{width: 44, height: 44, flex: 'none', borderRadius: 12, background: RAMP, display: 'grid', placeItems: 'center'}}><Spark4 s={22} /></div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 14, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', ...ACCENT}}>Recommendation</div>
                <div style={{fontSize: 24, fontWeight: 600, marginTop: 6, lineHeight: 1.35}}>Factory handover stories outperform everything else. Publish two more this month and lead with the timeline.</div>
              </div>
              <div style={{alignSelf: 'center', background: C.ink, color: '#fff', borderRadius: 99, padding: '12px 22px', fontSize: 17, fontWeight: 650, whiteSpace: 'nowrap', opacity: prog(f, REC + 24, 10)}}>See the posts</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// A2: double down. From the recommendation, open the content topics: one clearly outperforms; open it, the winning posts.
const TOPICS: [string, number, string][] = [['Factory handovers', 2.4, '#7fbc42'], ['Project milestones', 1.3, '#9db3b7'], ['Team and culture', 1.0, '#9db3b7'], ['Industry news', 0.7, '#9db3b7']];
const POSTS: [string, string, string][] = [['Long An factory handover, carousel', '41,200 reach', '3.1x'], ['Bac Ninh plant: from steel to keys', '28,700 reach', '2.2x'], ['Handover day in 60 seconds, video', '24,900 reach', '1.9x']];
const CLK = 112;
export const a2sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.25}, ...TOPICS.map((_, i) => ({at: 30 + i * 6, s: 'tick', v: 0.2})), {at: CLK, s: 'click', v: 0.5}, ...POSTS.map((_, i) => ({at: CLK + 8 + i * 6, s: 'pop_hi', v: 0.25}))];
export const A2: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const card = prog(f, 6, 22, E.snappy);
  const open = prog(f, CLK + 2, 22, E.snappy);
  const BX = 360, BY = 300, BW = 1200;
  const rowY = (i: number) => BY + 120 + i * 78;
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      <Line w={[['Know'], ['what'], ['works.'], ['Double', true], ['down.', true]]} at={2} stagger={6} size={66} style={TOP} />
      <div style={{position: 'absolute', left: BX + 30, top: 200, display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 99, padding: '10px 18px 10px 10px', background: '#fff', border: '2px solid transparent', backgroundImage: `linear-gradient(#fff,#fff), ${RAMP}`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', fontFamily: F.text, fontSize: 18, fontWeight: 650, color: C.ink, opacity: card, boxShadow: '0 14px 30px -14px rgba(0,140,190,.4)'}}>
        <span style={{width: 30, height: 30, borderRadius: 99, background: RAMP, display: 'grid', placeItems: 'center'}}><Spark4 s={16} /></span>From your AI report: focus on factory handover content
      </div>
      <div style={{position: 'absolute', left: BX, top: BY, width: BW, background: '#fff', borderRadius: 26, border: `1px solid ${C.rule}`, boxShadow: '0 40px 90px -30px rgba(5,60,63,.35)', padding: '28px 34px', fontFamily: F.text, opacity: card, transform: `translateY(${(1 - card) * 60}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}><PlatformIcon p="li" size={34} /><span style={{fontSize: 22, fontWeight: 700, color: C.ink}}>Engagement by content topic</span><span style={{marginLeft: 'auto', fontSize: 15, color: C.ink3}}>vs. your average post</span></div>
        <div style={{marginTop: 18}}>
          {TOPICS.map(([n, x, col], i) => {
            const g = prog(f, 26 + i * 6, 30, E.snappy);
            const best = i === 0;
            return (
              <div key={n} style={{display: 'grid', gridTemplateColumns: '260px 1fr 80px', alignItems: 'center', gap: 18, height: 78, borderTop: i ? `1px solid ${C.rule}` : 'none', fontSize: 20, fontWeight: best ? 700 : 500, color: C.ink, background: best && f >= CLK ? C.wash : 'none', borderRadius: 14, padding: '0 12px'}}>
                <span>{n}</span>
                <div style={{height: 18, borderRadius: 99, background: C.inset}}><div style={{width: `${(x / 2.6) * 100 * g}%`, height: '100%', borderRadius: 99, background: best ? 'linear-gradient(90deg,#7fbc42,#00b9ef)' : col}} /></div>
                <span style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums', ...(best ? ACCENT : {})}}>{(x * g).toFixed(1)}x</span>
              </div>
            );
          })}
        </div>
        <div style={{overflow: 'hidden', maxHeight: open * 300}}>
          <div style={{marginTop: 10, padding: '14px 12px 0', borderTop: `2px solid ${C.wash}`}}>
            {POSTS.map(([t, r, x], i) => {
              const q = prog(f, CLK + 8 + i * 6, 14, E.snappy);
              return <div key={t} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', fontSize: 18, color: C.ink, opacity: q, transform: `translateX(${(1 - q) * -30}px)`}}><span style={{width: 34, height: 34, borderRadius: 8, background: RAMP}} /><span style={{flex: 1, fontWeight: 600}}>{t}</span><span style={{color: C.ink3}}>{r}</span><span style={{fontWeight: 700, color: C.up, width: 60, textAlign: 'right'}}>{x}</span></div>;
            })}
          </div>
        </div>
      </div>
      <Ripple x={BX + 170} y={rowY(0)} at={CLK} />
      <Cursor path={[{f: 70, x: 1500, y: 1000}, {f: CLK - 3, x: BX + 160, y: rowY(0) - 8}, {f: dur, x: BX + 200, y: rowY(0) + 40}]} clicks={[CLK]} show={70} />
    </AbsoluteFill>
  );
};

// A3: what visitors search for, then a keyword strategy built from the rankings.
const KW: [string, number, number][] = [['design and build company', 214, 2.1], ['factory construction vietnam', 168, 4.6], ['office fit-out', 131, 5.2], ['construction consultancy', 96, 6.8], ['factory design and build', 74, 7.4], ['industrial park design', 52, 11.9], ['warehouse design', 41, 14.2]];
const lane = (r: number) => (r <= 3 ? 0 : r <= 10 ? 1 : 2);
const LANES = ['Defend (top 3)', 'Push to top 3', 'Create content'];
const SPLIT = 120;
export const a3sfx: Cue[] = [{at: 0, s: 'swoosh_soft', v: 0.25}, ...KW.map((_, i) => ({at: 10 + i * 5, s: 'tick', v: 0.16})), {at: 70, s: 'pop_hi', v: 0.3}, {at: SPLIT, s: 'whoosh_long', v: 0.35}, ...KW.map((_, i) => ({at: SPLIT + 14 + i * 4, s: 'pop', v: 0.15}))];
export const A3: React.FC<{dur: number}> = ({dur}) => {
  const f = useF();
  const split = prog(f, SPLIT, 34, E.inOut);
  const card = prog(f, 4, 20, E.snappy);
  const LX = 460, LY = 230, LW = 1000;
  const laneX = (l: number) => 150 + l * 560, laneW = 520;
  const counts = [0, 0, 0];
  return (
    <AbsoluteFill>
      <Ground kind="glow" />
      {f < SPLIT + 10 ? <div style={{opacity: 1 - prog(f, SPLIT, 10)}}><Line w={[['What'], ['visitors'], ['search'], ['to'], ['find', true], ['you.', true]]} at={2} stagger={5} size={64} style={TOP} /></div>
        : <Line w={[['Turn'], ['rankings'], ['into'], ['a'], ['keyword', true], ['strategy.', true]]} at={SPLIT + 10} stagger={5} size={64} style={TOP} />}
      <div style={{position: 'absolute', left: LX, top: LY, width: LW, height: 640, background: '#fff', borderRadius: 26, border: `1px solid ${C.rule}`, boxShadow: '0 40px 90px -30px rgba(5,60,63,.35)', opacity: card * (1 - split), transform: `scale(${1 + split * 0.06})`}}>
        <div style={{padding: '26px 32px 12px', fontFamily: F.text}}><div style={{fontSize: 22, fontWeight: 700, color: C.ink}}>Top searches that bring visitors</div><div style={{fontSize: 15, color: C.ink3, marginTop: 3}}>Google Search Console, last 30 days</div></div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 110px 110px 150px', padding: '0 32px 10px', fontFamily: F.text, fontSize: 14, color: C.ink3, fontWeight: 600}}><span>Search</span><span style={{textAlign: 'right'}}>Clicks</span><span style={{textAlign: 'right'}}>Rank</span><span /></div>
      </div>
      {KW.map(([q, c, r], i) => {
        const l = lane(r); const slot = counts[l]++;
        const q0 = prog(f, 10 + i * 5, 16, E.snappy);
        const k = prog(f, SPLIT + 10 + i * 4, 30, E.inOut);
        const x = lerp(k, LX + 20, laneX(l) + 20), y = lerp(k, LY + 132 + i * 66, 300 + 88 + slot * 74), w = lerp(k, LW - 40, laneW - 40);
        const opp = r > 3 && r <= 10 && f >= 70;
        return (
          <div key={q} style={{position: 'absolute', left: x, top: y, width: w, height: 58, display: 'grid', gridTemplateColumns: k > 0.5 ? '1fr 70px' : '1fr 110px 110px 150px', alignItems: 'center', padding: '0 14px', borderRadius: 14, fontFamily: F.text, fontSize: 19, color: C.ink, opacity: q0, background: k > 0.02 ? '#fff' : opp ? C.wash : 'none', boxShadow: k > 0.02 ? '0 10px 24px -12px rgba(5,60,63,.3)' : 'none', border: k > 0.02 ? `1px solid ${C.rule}` : 'none', zIndex: 3}}>
            <span style={{fontWeight: 550, whiteSpace: 'nowrap', overflow: 'hidden'}}>{q}</span>
            {k <= 0.5 && <><span style={{textAlign: 'right', fontVariantNumeric: 'tabular-nums'}}>{c}</span><span style={{textAlign: 'right', fontWeight: 700, color: r <= 3 ? C.up : r <= 10 ? '#00768f' : C.ink3}}>{r}</span>
              <span style={{textAlign: 'right'}}>{opp && <span style={{fontSize: 13, fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg,#7fbc42,#00b9ef)', borderRadius: 99, padding: '4px 10px', transform: `scale(${spr(f, 70 + i * 3, S.pop)})`, display: 'inline-block'}}>Opportunity</span>}</span></>}
            {k > 0.5 && <span style={{textAlign: 'right', fontWeight: 700, color: r <= 3 ? C.up : r <= 10 ? '#00768f' : C.ink3}}>#{Math.round(r)}</span>}
          </div>
        );
      })}
      {split > 0 && LANES.map((n, l) => (
        <div key={n} style={{position: 'absolute', left: laneX(l), top: 270, width: laneW, height: 560, borderRadius: 24, background: 'rgba(255,255,255,.7)', border: `1.5px solid ${l === 1 ? 'rgba(0,185,239,.5)' : C.rule}`, opacity: split, transform: `translateY(${(1 - split) * 40}px)`, fontFamily: F.text, padding: '20px 20px', zIndex: 1}}>
          <div style={{fontSize: 21, fontWeight: 700, color: C.ink, ...(l === 1 ? ACCENT : {})}}>{n}</div>
          <div style={{fontSize: 15, color: C.ink3, marginTop: 2}}>{['Keep these pages fresh', 'Rank 4 to 10: improve pages, add links', 'Rank 10+: write new pages'][l]}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
