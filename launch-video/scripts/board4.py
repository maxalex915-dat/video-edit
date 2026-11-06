import subprocess, os
# (frame, time label, caption)
K=[(70,'0:00','Sign-in cards rise; switch account; wrong password. "Still logging in to multiple accounts for analytics?"'),
(200,'0:03','Exports scattered on screen; copy each total, paste into the master report...'),
(222,'0:06','...one paste lands in the wrong row (#REF!). The camera dives into it.'),
(262,'0:08','"Stop copy-pasting reports." blurs into focus.'),
(300,'0:09','On the drop: "Meet" fills the screen.'),
(345,'0:11','It shrinks; the loop pops in; the name builds.'),
(440,'0:12','"All platform analytics. In one place. Automated."'),
(560,'0:15','The Home page rises in 3D and keeps drifting.'),
(700,'0:21','LinkedIn clicks draws and spikes...'),
(805,'0:24','...other channels spike at the same moment; hover shows the LinkedIn post.'),
(840,'0:28','"Spot trends and make connections."'),
(1000,'0:28','A report 14 days old steps aside; live numbers keep ticking. "Always up to date. Automatically."'),
(1110,'0:35','"Turning insights" / "into decisions." then a gradient wipe.'),
(1320,'0:39','Weekly AI reports: the report writes itself, a recommendation lights up.'),
(1530,'0:46','From the AI recommendation: topics ranked, open the winner, its posts. "Know what works. Double down."'),
(1660,'0:53','What visitors search to find you; ranks 4 to 10 tagged Opportunity.'),
(1790,'0:57','Keywords fly into a strategy board: defend, push, create.'),
(1865,'1:01','"In-house site audit tool"'),
(1980,'1:03','"Save $2,000+ on SEMrush subscription." The plan is cancelled.'),
(2120,'1:07','Site health and AI search health; issues by category, like SEMrush...'),
(2182,'1:10','...open Errors; each issue becomes a task.'),
(2290,'1:14','Word burst of features: Expert review by AI, AI search readiness, Core Web Vitals...'),
(2360,'1:18','"All in-house. All yours."'),
(2470,'1:19','The competitor report arrives whole and downloads.'),
(2600,'1:23','22 offices on the globe; click Thailand.'),
(2740,'1:28','One link, the whole team informed.'),
(2880,'1:32','A new press mention arrives.'),
(3020,'1:36','A lead is marked Won; the month ticks up.'),
(3150,'1:41','A card is dragged to Done and approved.'),
(3240,'1:45','"Others juggle spreadsheets." / "We connect everything."'),
(3320,'1:48','Bento builds in random order as the camera pulls back...'),
(3420,'1:52','...centre card last: "Marketing Dashboard, made by Dat Tran". Hold.'),
(3475,'1:55','The centre card fills the screen: this is the loop, up close...'),
(3505,'1:56','...it pulls back to its real size...'),
(3560,'1:58','...and "archetype group" forms around it.'),
]
fr=' '.join(str(k[0]) for k in K)
import os
subprocess.run(f'COMP=Film4 node scripts/stills.mjs {fr}',shell=True,capture_output=True)
ins=[];flt=[]
for i,(f,t,c) in enumerate(K):
    ins+=['-i',f'out/f/{f}.jpg']; t=t.replace(':','m')
    c2=c.replace("'","’").replace(':','\\:').replace(',','\\,')
    flt.append(f"[{i}]scale=480:270,pad=480:330:0:0:white,drawtext=text='{t}  {c2[:72]}':x=6:y=278:fontsize=13:fontcolor=0x10242a:fontfile=/usr/share/fonts/opentype/inter/Inter-Medium.otf,drawtext=text='{c2[72:144]}':x=6:y=300:fontsize=13:fontcolor=0x10242a:fontfile=/usr/share/fonts/opentype/inter/Inter-Medium.otf[v{i}]")
n=len(K); cols=4
lay='|'.join(f'{(i%cols)*490}_{(i//cols)*340}' for i in range(n))
flt.append(''.join(f'[v{i}]' for i in range(n))+f'xstack=inputs={n}:layout={lay}:fill=white')
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'storyboard/storyboard-v9.png'],check=True)
print('ok')
