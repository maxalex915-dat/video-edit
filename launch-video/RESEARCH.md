# How top SaaS launch films look premium (research, 5 Nov 2026)

Sources are frame-by-frame write-ups of real launch films (Impractical's breakdowns of Linear, Notion, Ramp, Framer,
Attio, Amplitude), GitHub's brand rules for showing product UI, and practitioner roundups. These are third-party write-ups,
not statements from the companies, and none of them gives exact colour values or easing curves.
I could not watch the films themselves from this session.

## What they do

| Principle | What it looks like | Who |
|---|---|---|
| The real UI is the hero | The interface is rebuilt faithfully, at its real proportions, with real-looking content. No clip-art, no giant toy objects. | Linear, Ramp, Minor Visuals case study |
| The camera guides the eye | Slow, continuous 2.5D drift across the UI, then a sudden "punch-in" (fast zoom) onto the one element that changes. The rest blurs. | Linear Pulse, Attio, Ramp, Notion |
| Kill the periphery | At the moment the feature acts, everything else loses colour or goes out of focus. Only the active element carries the brand colour. | Notion (near-monochrome, colour only on the feature), Canvas (depth of field) |
| One accent colour | A neutral, controlled palette. Saturated colour is used once per frame, on the thing that matters. | Notion, GitHub brand rules, What a Story roundup |
| Type is connective tissue | Big, bold, short kinetic lines between UI shots act as chapter markers. Type and dense UI rarely fight for the same frame. | Ramp, Framer 3, Notion, Amplitude |
| Masked reveals, not blur fades | Copy slides out from behind a clean invisible edge. No scaling, no soft opacity fades. | Linear Agent |
| Sharp exponential easing, no bounce | Fast start, long smooth settle. No elastic or bouncy springs. | Linear, Framer, Amplitude, Linear Pulse |
| Stagger, never all at once | Lists, cards and steps cascade in, in reading order. The stagger is the guide for the eye. | Framer, Ramp, Linear Pulse |
| Hard cuts on the beat | Most changes are hard cuts synced to music. A few match cuts or zoom-throughs at chapter changes. | Linear Pulse, Attio, Ramp, Framer |
| Generous holds | Each idea gets time to land before the next cut. | Linear, Amplitude |
| Backgrounds lead to the focal point | Neutral ground for most UI, colour only for big moments. Gradient or dither textures point toward the focus. | GitHub brand rules |
| Soft light, soft shadow | Large blur, low opacity shadows (roughly 5 to 15 percent). Hairline borders. Dark, sharp shadows read as cheap. | Practitioner guidance |

## Why v3 looked cheap (my diagnosis)

1. Toy scale: 300 to 1,100 px numbers, chunky keycaps, a 3x cursor, fat 110 px strokes. Premium films keep objects at believable scale and move the camera instead.
2. Too much colour at once: full gradient fields, gradient text in every headline, red, orange, yellow and green tokens in one frame.
3. Fake 3D with flat fills (pillars with oval tops) reads as cartoon.
4. Placeholder UI: grey bars instead of real content.
5. Every frame busy, no single focal point, no empty space.

## Rules for v4

- UI at real proportions, real copy, hairline borders. The camera does the scaling (punch-ins of 1.6 to 2.4x).
- Depth of field on every UI shot: one element sharp and in colour, the rest blurred and desaturated.
- The brand gradient appears once per shot, on the active element or as soft light. Headlines in ink. At most one gradient word per film section.
- Headlines 72 to 110 px, weight 600, tight tracking, masked reveal. Type-only frames between UI frames.
- Backgrounds: light, never flat. A slow light field in a different pale tint per chapter (cool, mint, sky, warm), with a fine dot or line texture that points at the focal point.
- Easing: exponential out for entrances, exponential in-out for camera; no bounce.
- Hard cuts on the beat; zoom-throughs only at chapter changes.

## Sources

- Linear Agent breakdown: https://impractical.ai/launch-videos/linear-agent
- Linear Pulse: https://impractical.ai/launch-videos/linear-pulse
- Notion 3: https://impractical.ai/launch-videos/notion-3
- Ramp Agents AP: https://impractical.ai/launch-videos/ramp-agents-ap
- Ramp Q2 2026 releases: https://impractical.ai/launch-videos/ramp-q2-2026-releases
- Framer 3: https://impractical.ai/launch-videos/framer-3
- Attio, Ask Attio: https://impractical.ai/launch-videos/attio-ask-attio
- Amplitude Agent Analytics: https://impractical.ai/launch-videos/amplitude-agent-analytics
- GitHub brand, product UI: https://brand.github.com/graphic-elements/product-ui
- Advids, SaaS launch video designs (Notion monochrome, focus by desaturation): https://advids.co/blog/30-creative-saas-launch-video-examples-to-hype-your-saass-debut
- What a Story, SaaS explainer examples (controlled palette): https://www.whatastory.agency/blog/saas-explainer-video-examples
- Minor Visuals case study (real UI rebuilt): https://www.minorvisuals.com/post/ai-product-video-saas-case-study
- Soft shadow guidance: https://mockupio-astro-theme.pages.dev/blog/mastering-minimalist-shadows
