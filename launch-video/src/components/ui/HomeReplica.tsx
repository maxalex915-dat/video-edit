import React from 'react';
import {C, LOOP, R} from '../../theme/tokens';
import {F} from '../../theme/fonts';
import {KPI, PLATFORMS, SERIES} from '../../data/demo';
import {Card, Delta, Mark, PlatformIcon, Spark, Platform, PLATFORM_NAME} from './Primitives';
import {fmt} from '../kit/Type';

// Static replica of the dashboard Home page (src/index.template.html + home.css), at 1600x1000.
// `p` drives entrance per card group (0..1 each), `draw` the chart lines, `count` the numbers.
export const HomeReplica: React.FC<{cards?: number[]; draw?: number; count?: number; range?: string; lift?: number}> = ({cards = [1, 1, 1, 1, 1, 1], draw = 1, count = 1, range = '1m', lift = -1}) => {
  const c = (i: number) => {
    const p = cards[i] ?? 1;
    return {opacity: p, transform: `translateY(${(1 - p) * 60}px) scale(${0.96 + p * 0.04})`, filter: `blur(${(1 - p) * 10}px)`};
  };
  const nav = ['Home', 'Insights', 'Website', 'Search', 'Social', 'Email', 'PR Tracking', 'Competitor Intelligence', 'Business Inquiries', 'To Be Approved', 'PPM Statistics', 'Site Audit'];
  return (
    <div style={{width: 1600, height: 1000, background: '#fff', borderRadius: 28, overflow: 'hidden', display: 'flex', fontFamily: F.text, color: C.ink, position: 'relative'}}>
      <div style={{width: 244, borderRight: `1px solid ${C.rule}`, padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 14px'}}>
          <Mark size={30} />
          <div><div style={{fontWeight: 700, fontSize: 15}}>Archetype</div><div style={{fontSize: 12, color: C.ink3}}>Marketing Dashboard</div></div>
        </div>
        {nav.map((n, i) => (
          <div key={n} style={{padding: '9px 14px', borderRadius: 999, fontSize: 14.5, fontWeight: i === 0 ? 650 : 500, color: i === 0 ? '#fff' : '#4b5563', background: i === 0 ? LOOP : 'transparent', textShadow: i === 0 ? '0 1px 2px rgba(0,60,70,.45)' : 'none'}}>{n}</div>
        ))}
      </div>
      <div style={{flex: 1, padding: '22px 28px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22}}>
          <div><div style={{fontSize: 22, fontWeight: 700}}>Good morning</div><div style={{fontSize: 13, color: C.ink3}}>Updated today, 07:13</div></div>
          <div style={{display: 'flex', gap: 4, background: C.inset, padding: 4, borderRadius: 999, fontSize: 13, fontWeight: 600, color: C.ink3}}>
            {['7d', '1m', '3m', '6m', 'YTD', '12m'].map((r) => (
              <span key={r} style={{padding: '5px 12px', borderRadius: 999, background: r === range ? LOOP : 'transparent', color: r === range ? '#fff' : C.ink3}}>{r}</span>
            ))}
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1.65fr 1fr 1fr', gap: 18, marginBottom: 18}}>
          <div style={{...c(0), height: 300, borderRadius: R.feature / 2, background: LOOP, padding: 24, position: 'relative', overflow: 'hidden', boxShadow: '0 12px 32px -8px rgba(5,94,99,.3)'}}>
            <div style={{fontSize: 18, fontWeight: 650, color: '#fff', textShadow: '0 1px 2px rgba(0,60,70,.45)'}}>Total impressions</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{fontSize: 56, fontWeight: 750, color: '#fff', fontFamily: F.display, letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,80,86,.3)', fontVariantNumeric: 'tabular-nums'}}>{fmt(KPI.impressions * count)}</div>
              <span style={{background: 'rgba(255,255,255,.25)', color: '#fff', borderRadius: 999, padding: '4px 12px', fontSize: 14, fontWeight: 650}}>▲ 6.4% vs previous 30 days</span>
            </div>
            <div style={{position: 'absolute', left: 16, right: 16, bottom: 22}}><Spark id="hero" data={SERIES.hero} w={540} h={140} color="#ffffff" draw={draw} width={3} /></div>
          </div>
          <Card radius={22} style={{...c(1), padding: 22, boxShadow: '0 4px 14px -4px rgba(5,60,63,.12)'}}>
            <div style={{fontSize: 18, fontWeight: 650}}>Total engagements</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0'}}>
              <span style={{fontSize: 44, fontWeight: 750, fontFamily: F.display, background: LOOP, WebkitBackgroundClip: 'text', color: 'transparent', fontVariantNumeric: 'tabular-nums'}}>{fmt(KPI.engagements * count)}</span>
              <Delta v="31.5%" size={14} />
            </div>
            <Spark id="eng" data={SERIES.c} w={250} h={140} color={C.tealMid} draw={draw} />
          </Card>
          <Card radius={22} style={{...c(2), padding: 22, boxShadow: '0 4px 14px -4px rgba(5,60,63,.12)'}}>
            <div style={{fontSize: 18, fontWeight: 650}}>Social followers</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0 14px'}}>
              <span style={{fontSize: 44, fontWeight: 750, fontFamily: F.display, background: LOOP, WebkitBackgroundClip: 'text', color: 'transparent', fontVariantNumeric: 'tabular-nums'}}>{fmt(KPI.followers * count)}</span>
              <Delta v="1.4%" size={14} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <svg width="110" height="110" viewBox="0 0 42 42">
                {[[C.li, 0, 62], [C.fb, 62, 20], [C.ig, 82, 10], [C.yt, 92, 8]].map(([col, off, len], i) => (
                  <circle key={i} cx="21" cy="21" r="15.9" fill="none" stroke={col as string} strokeWidth="6" strokeDasharray={`${(len as number) * draw} ${100 - (len as number) * draw}`} strokeDashoffset={25 - (off as number)} />
                ))}
              </svg>
              <div style={{fontSize: 13, display: 'grid', gap: 6}}>
                {(['li', 'fb', 'ig', 'yt'] as Platform[]).map((p) => (
                  <div key={p} style={{display: 'flex', gap: 8, alignItems: 'center'}}><span style={{width: 10, height: 10, borderRadius: 2, background: (C as any)[p]}} />{PLATFORM_NAME[p]}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <Card radius={22} style={{...c(3), padding: 18, boxShadow: '0 4px 14px -4px rgba(5,60,63,.12)'}}>
          <div style={{fontSize: 18, fontWeight: 650, marginBottom: 12}}>Every platform <span style={{fontSize: 13, color: C.ink3, fontWeight: 500}}>the last 30 days</span></div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12}}>
            {PLATFORMS.map((pl, i) => {
              const k = Math.max(0, Math.min(1, (draw - i * 0.08) / 0.6));
              return (
                <div key={pl.p} style={{transform: i === lift ? 'translateY(-6px) scale(1.03)' : 'none', boxShadow: i === lift ? '0 18px 40px -14px rgba(5,60,63,.35)' : 'none', background: '#fff', border: `1px solid ${C.rule}`, borderTop: `3px solid ${pl.p === 'ig' ? C.ig : (C as any)[pl.p]}`, borderRadius: 14, padding: '12px 14px'}}>
                  <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                    <PlatformIcon p={pl.p as Platform} size={30} />
                    <div><div style={{fontSize: 14, fontWeight: 650}}>{PLATFORM_NAME[pl.p as Platform]}</div><div style={{fontSize: 11.5, color: C.ink3}}>{pl.sub}</div></div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0 4px'}}>
                    <span style={{fontSize: 26, fontWeight: 750, fontVariantNumeric: 'tabular-nums'}}>{fmt(pl.value * count)}</span>
                    <Delta v={pl.delta} up={pl.up} size={12} />
                  </div>
                  <Spark id={`p${i}`} data={[SERIES.a, SERIES.b, SERIES.c][i % 3]} w={340} h={40} color={C.cyan} draw={k} area={false} width={2.2} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
