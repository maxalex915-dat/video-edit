# Archetype intro video, v6 at 1080p (kit)

This folder lets a fresh Claude Code web session rebuild the approved 59.08 s cut from the original 1080p video,
with no other context.

## What is inside

| Path | What it is |
|---|---|
| `CLAUDE.md` | Instructions Claude Code reads automatically: task, acceptance checks, what not to touch |
| `PROMPT.txt` | The one message to paste into the session |
| `edit_list.json` | The 11 cut points, crossfade, narration and on-screen text per segment |
| `cut_filter.txt` | Same cut as a plain ffmpeg graph (reference only) |
| `audio/audio_v6.m4a` | The finished soundtrack: isolated voice + "Over The Mountains", already mixed |
| `reference/v6_360p.mp4` | The approved video at 360p. This is what the result must look like |
| `reference/v6_contact_sheet.jpg` | Timestamped frames of the approved video |
| `reference/source_360p.mp4` | The 360p copy the cut was made from, used to confirm the master is the same edit |
| `scripts/` | `check_source.sh`, `render.sh`, `verify_output.sh`, `find_offset.py`, helpers |

Package size is about 22 MB.

## Steps

1. Unzip this package and copy everything inside it into the root of your repo
   (`maxalex915-dat/video-edit`), next to the 1080p video. Commit and push.
   If the video was added with Git LFS, Claude handles `git lfs pull` itself.
   GitHub rejects normal files over 100 MB. If your 529 MB upload is not in the repo as a normal or LFS file,
   attach it to a GitHub Release instead (limit 2 GB) and tell Claude the release URL in step 3.
2. Open claude.ai/code, choose the repo `video-edit`, start a new session.
3. Paste the contents of `PROMPT.txt`. If the video is on a Release, add one line with its download URL.
   The session needs network access to GitHub. If the session cannot reach the URL, use the local option below.
4. Wait for it to finish (about 5 to 10 minutes). It should report `ALL CHECKS PASSED` and push the file
   `output/Archetype_Group_Shaping_Tomorrow_v6_1080p.mp4` to branch `v6-1080p`. Download it from GitHub.
5. When you have the file, delete the repo or the Release. The video and the music are company and third-party material.

## Local option (no Claude needed)

Needs ffmpeg and Python 3 with numpy. In the unzipped folder:

```
scripts/render.sh "/path/to/Archetype Group_INTRODUCING VIDEO.mp4"
```

On Windows, run it inside WSL or Git Bash.

## What the checks guarantee

- The master has the same length (158.34 s) and the same frames as the 360p source at 8 points.
- The output is 59.08 s and under 60 s.
- The audio track is byte-identical to the approved audio (it is copied, never re-encoded).
- Twelve frames across the output match the approved 360p video (PSNR 26 dB or more, allowing for 1080p detail).

## What the checks cannot guarantee

- If the master is a different edit from the 360p file you uploaded earlier (for example the version without
  on-screen text), the check fails and Claude stops. That is intended.
- I have not listened to the final audio myself. The mix was judged from measurements and the approved video you reviewed.
- The song license and credit terms for "Over The Mountains" (Infraction) are not verified. Check before public use.
- Narration says "thousands of collaborators", while the on-screen text says "a thousand of collaborators". Check with the team.
