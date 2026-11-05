import re,sys
# replicate timeline: bar n -> frame
def B(n): return 0 if n==0 else round((0.325+0.5555*4*n)*30)
bars=[(0,2),(2,4),(4,6),(6,8),(8,10),(10,12),(12,14),(14,16),(16,18),(18,20),(20,22),(22,24),(24,26),(26,28),(28,30),(30,32),(32,34),(34,-1)]
out=[]
for a,b in bars:
    s=B(a); e=2700 if b<0 else B(b)
    out += [s+30, s+min(e-s-20,100)]
print(' '.join(map(str,out)))
