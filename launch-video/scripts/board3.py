import subprocess, os
# (frame, time label, caption)
K=[(60,'0:00','Typed: "Seven platforms. Seven logins." The logins get selected and retyped.'),
(212,'0:04','"Copied by hand... again?" then the camera dives into the "o".'),
(262,'0:08','"Stop copy-pasting reports." blurs into focus.'),
(300,'0:09','On the drop: "Meet" fills the screen.'),
(345,'0:11','It shrinks; the loop pops in; the name builds.'),
(430,'0:12','"Every channel. One dashboard. Zero copy-paste."'),
(560,'0:15','The Home page rises in 3D and keeps drifting.'),
(780,'0:21','One post ripples through every channel; the side card ticks each link.'),
(905,'0:29','"Every channel, { connected }". Words fall away...'),
(960,'0:31','...{ connected } becomes the sync bar.'),
(1140,'0:33','The bar becomes the sync card; each source reports in, typed.'),
(1255,'0:39','"it turns the numbers into"'),
(1305,'0:41','[ decisions ] closes to [ ], a gradient wipe follows.'),
(1395,'0:44','The Monday briefing writes itself.'),
(1440,'0:47','"Every Monday."'),
(1500,'0:49','"And"'),
(1610,'0:51','"You can double down." Dive through the "o".'),
(1740,'0:54','Platforms side by side; click the best, it comes forward.'),
(1825,'1:00','Giant search field, typing "factory", then pull back.'),
(1940,'1:04','"Save $1,200 a year."'),
(2050,'1:06','Cancel the SEMrush plan; the in-house audit swings in.'),
(2190,'1:11','The competitor report arrives whole and downloads.'),
(2250,'1:14','Fast run: 22 offices, share link, press mention, lead won.'),
(2400,'1:18','"Others juggle spreadsheets." / "We connect everything."'),
(2490,'1:20','Your bento, every tile alive.'),
(2640,'1:26','The gradient takes the screen, shrinks into the loop, logo forms.'),
]
fr=' '.join(str(k[0]) for k in K)
import os
if not all(os.path.exists(f'out/f/{k[0]}.jpg') for k in K): subprocess.run(f'node scripts/stills.mjs {fr}',shell=True,capture_output=True)
ins=[];flt=[]
for i,(f,t,c) in enumerate(K):
    ins+=['-i',f'out/f/{f}.jpg']; t=t.replace(':','m')
    c2=c.replace("'","’").replace(':','\\:').replace(',','\\,')
    flt.append(f"[{i}]scale=480:270,pad=480:330:0:0:white,drawtext=text='{t}  {c2[:70]}':x=6:y=278:fontsize=13:fontcolor=0x10242a:fontfile=/usr/share/fonts/opentype/inter/Inter-Medium.otf,drawtext=text='{c2[70:140]}':x=6:y=300:fontsize=13:fontcolor=0x10242a:fontfile=/usr/share/fonts/opentype/inter/Inter-Medium.otf[v{i}]")
n=len(K); cols=4
lay='|'.join(f'{(i%cols)*490}_{(i//cols)*340}' for i in range(n))
flt.append(''.join(f'[v{i}]' for i in range(n))+f'xstack=inputs={n}:layout={lay}:fill=white')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'storyboard/storyboard-v8.png'],check=True)
print('ok')
