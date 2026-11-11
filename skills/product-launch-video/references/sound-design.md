# Sound design

The film uses only two synthesised sounds, in a few variants, placed by code on the exact frame of the event they
belong to. They are soft and low on purpose: the client asked for "muffled" pops and swooshes after brighter
versions (clicks, chimes, keyboard thocks) were tried. Files: `kit/public/sfx/` (ready to use) and
`kit/scripts/make_sfx.py` (regenerates them deterministically, no downloads).

## The sounds

| File | What it is | Use |
|---|---|---|
| `mpop0`, `mpop1`, `mpop2` | 0.16 s soft, low tap "through felt": a 150 to 186 Hz sine with a quick pitch drop, a little filtered air, the top end smoothed off | a word appearing, a chip or card landing, a number settling, a click, a drop, a stamp |
| `mswoosh0`, `mswoosh1` | 0.42 s air through a low moving band (180 > 700 Hz), swelling and fading, slight left-to-right pan, no hiss | camera moves, cards travelling, a list scrolling, scene cuts |

Variants rotate (`k % 3`, `k % 2`) so repeated sounds never machine-gun the same sample.

## Placement rules

- **Pop on the first visible frame** of the thing, not when its animation is scheduled. With the snappy curve a word
  is readable ~2 frames after its start, so the pop at the word's start frame is right.
- **Swoosh before the motion's fastest point**: the file peaks ~7 frames in, so place it ~6 frames before the peak
  speed of a move, and 10 frames before a scene cut.
- **Inside a scene, place sounds in the scene's own frames** (the `Pop`/`Swish`/`Sfx` components handle the
  transition offset). Using the raw composition frame for sounds or cursors puts them 14 frames early.
- **A scene's first text must already be readable when its pops play.** If a scene fades in slowly, the pops come
  before the words and the whole film feels out of sync. The kit's transition makes scenes readable by frame 2-3.
- **One sound per event, quiet**: words 0.13, chips 0.14, cards 0.16 to 0.22, big moments (a stamp, the payoff word,
  the logo) 0.24 to 0.4; swooshes 0.05 to 0.16. A sequence of 15 chips gets 15 quiet pops, not one loud one.
- **Every important event has a sound and every sound has an event.** If you hear a sound with nothing happening,
  or see a card land in silence, fix it.
- Long sequences (a list of 8 items) get a pop on each arrival plus a light swoosh as the list moves.

## Checking sync

Render the sound-effects track alone (`npx remotion render Film out/sfx.wav --codec wav`), mix, and watch the
moments where many things happen (text reveals, montage, drags). If something feels off, check the event's first
visible frame in stills against the sound's placed frame; do not move sounds by ear.
