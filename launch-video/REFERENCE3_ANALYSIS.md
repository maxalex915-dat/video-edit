# Third reference (Peko explainer, 56 s, 25 fps): how it treats colour and motion

Studied frame by frame at the openings, the gradient changes and every cut (strips in `scratch/r3f/`, not committed).

## The four grounds

1. **Bold field** (0:00, 0:26, 0:46). The whole frame is one saturated brand colour. A huge, very soft white bloom (a blurred U or oval, no edges) drifts and breathes across it, and a deep, almost black vignette slides in from one corner, then another. Depth comes from light and shadow moving, not from shapes. White text sits on it.
2. **Mist** (0:02 to 0:06, 0:34, 0:44, 0:48). An off-white ground (warm grey, not pure white). Colour only leaks in from the bottom edge as soft blooms, and they rise and fade like breath. Dark text, or text in the brand colour fading through the gradient.
3. **Light pillar** (0:07 to 0:10). A thin vertical column of colour rises from the bottom of the mist. On "fragmented" it splits into three intertwined ribbons that twist upward. The idea is drawn as light, not as an icon.
4. **Frosted outlines** (0:16 to 0:22). Rows of empty pill outlines, like a form nobody filled in, sit on the mist with colour glowing underneath as if through frosted glass. One bright dot moves between them. They melt away, the dot lands, becomes a glass card ("Simpler"), and the card grows into a frosted panel ("Everything in one place").

They also use a near-black ground with a red glow at the top for the cost table (0:10 to 0:15). Dat has ruled out dark grounds, so that table moves to the bold field.

## Motion rules

- Text never types. Each phrase appears through a soft blurred wipe from left to right (a moving mask), then the next phrase replaces it in the same spot. Big opening words ("Millions", "Manage") arrive huge, then shrink into the sentence.
- Colour is always moving: blooms drift 2 to 5 % of the frame per second, the vignette sweeps once per scene.
- Cuts are soft: a white bloom swells to cover the frame, or the ground's colour shifts from bold to mist under the text. Almost no hard cuts.
- Cards on the bold field have a white glow halo around them, so they float on light.
- Feature carousel (0:27 to 0:34): frosted white cards with a 3D line icon, sliding left one by one, the centre card larger and sharper, the others smaller and faded.
- The product's own menu (0:36): the real side menu scrolls while a gradient highlight bar slides from item to item, with the headline on a bold gradient beside it.
- Logo: the name is wiped in, a gradient light passes through the letters, then the tagline fades in under it.

## Our palette in their roles

| Their role | Ours |
|---|---|
| Hot red field | Archetype cyan `#00b9ef` deepening to `#0096c7` |
| Peach and orange accent | Archetype green `#7fbc42` and light blue `#70cbf3` |
| White bloom | white |
| Near-black vignette | deep teal `#043f45` (corners only, never a whole ground) |
| Warm grey mist | cool off-white `#f3f6f6` |
