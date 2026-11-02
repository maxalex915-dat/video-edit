#!/usr/bin/env python3
"""Usage: make_filter.py <master.mp4> <filter_out.txt> [scale_to_1080]
Reads edit_list.json and writes a filter graph that uses one input per segment
(-ss/-t before each -i), so memory stays low on a 1080p master. Prints the
matching ffmpeg input arguments, one per line, to stdout.
The cut points and the 0.2 s crossfades are identical to cut_filter.txt.
"""
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
ed = json.load(open(os.path.join(here, "..", "edit_list.json")))
master, out = sys.argv[1], sys.argv[2]
scale = len(sys.argv) > 3 and sys.argv[3] == "1"
xf = ed["crossfade_seconds"]
off = float(os.environ.get("SOURCE_OFFSET", "0"))  # seconds, master_time = reference_time + off
segs = ed["segments"]
lines, args = [], []
for i, s in enumerate(segs):
    a, b = s["source_start"] + off, s["source_end"] + off
    args += ["-ss", f"{a:.3f}", "-t", f"{b - a:.3f}", "-i", master]
    lines.append(f"[{i}:v]setpts=PTS-STARTPTS,fps=25[v{i}];")
cur, acc = "v0", segs[0]["source_end"] - segs[0]["source_start"]
for i in range(1, len(segs)):
    last = i == len(segs) - 1
    nxt = "vout" if last else f"xv{i}"
    lines.append(f"[{cur}][v{i}]xfade=transition=fade:duration={xf}:offset={acc - xf:.3f}[{nxt}]" + ("" if last else ";"))
    acc += (segs[i]["source_end"] - segs[i]["source_start"]) - xf
    cur = nxt
if scale:
    lines[-1] += ";"
    lines.append("[vout]scale=1920:1080:flags=lanczos[vfinal]")
open(out, "w").write("\n".join(lines) + "\n")
print("\n".join(args))
