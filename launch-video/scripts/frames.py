# review frames: two per scene, from the film-bar timeline
def B(n): return 0 if n==0 else round((0.325+0.5555*4*n)*30)
bars=[(0,2),(2,4),(4,6),(6,8),(8,10),(10,12),(12,13.5),(13.5,15),(15,16.5),(16.5,18.5),(18.5,20),(20,22),(22,24),(24,26),(26,28),(28,29.5),(29.5,31),(31,33),(33,35),(35,-1)]
out=[]
for a,b in bars:
    s=B(a); e=2700 if b<0 else B(b)
    out += [s+min(40,(e-s)//2), e-12 if b>0 else s+150]
print(' '.join(map(str,out)))
