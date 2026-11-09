# Voice-over script (v9 storyboard)

Generate it as one single MP3. I find the pauses between lines and cut it into the scenes myself.
The table is the plan; the block under it is what to paste into ElevenLabs.

| # | Scene | Line to generate | Fits in |
|---|---|---|---|
| 01 | Every week, our marketing data | Every week, our marketing data... | 2.6 s |
| 02 | 7 different platforms | ...lives on seven different platforms. | 4.4 s |
| 03 | Light splits | What should be simple has become fragmented. And manual. | 3.4 s |
| 04 | The routine table | Sign in. Export. Copy it all by hand. Every single week. | 4.6 s |
| 05 | Consuming time | Sounds familiar? It takes hours. | 3.0 s |
| 06 | Simpler | So we made it simpler. Everything, in one place. | 3.4 s |
| 07 | Introducing | Introducing the Marketing Dashboard. | 3.6 s |
| 08 | Home tab | Every channel, in one dashboard. Updated automatically. No more copy and paste. | 4.4 s |
| 09 | Turn insights into decisions | Now, we can turn insights into decisions. | 2.6 s |
| 10 | Features slide past | Trends, AI reports, keyword strategy, site audits... and a lot more. | 4.4 s |
| 11 | Spot trends | Spot a spike on one channel, and see how it lifts all the others. | 5.0 s |
| 12 | Weekly AI reports | Every week, AI reads the numbers, and tells us what to do next. | 5.0 s |
| 13 | Save $2,000+ | And with our own site audit, we save over two thousand dollars a year on SEMrush. | 4.6 s |
| 14 | All in one | All of it, in one dashboard. | 4.0 s |
| 15 | Live tiles | Site health, press, competitors and leads. Always live. | 3.6 s |
| 16 | Bento, then logo | The Marketing Dashboard. Less time collecting, more time deciding. | 5 to 6 s |

## Paste this into ElevenLabs (one generation)

The `<break time="0.8s" />` tags give a clear pause between lines, which is where I cut. Keep them.

```
Every week, our marketing data... lives on seven different platforms. <break time="0.8s" />
What should be simple has become fragmented. And manual. <break time="0.8s" />
Sign in. Export. Copy it all by hand. Every single week. <break time="0.8s" />
Sounds familiar? It takes hours. <break time="0.8s" />
So we made it simpler. Everything, in one place. <break time="0.8s" />
Introducing the Marketing Dashboard. <break time="0.8s" />
Every channel, in one dashboard. Updated automatically. No more copy and paste. <break time="0.8s" />
Now, we can turn insights into decisions. <break time="0.8s" />
Trends, AI reports, keyword strategy, site audits... and a lot more. <break time="0.8s" />
Spot a spike on one channel, and see how it lifts all the others. <break time="0.8s" />
Every week, AI reads the numbers, and tells us what to do next. <break time="0.8s" />
And with our own site audit, we save over two thousand dollars a year on SEMrush. <break time="0.8s" />
All of it, in one dashboard. <break time="0.8s" />
Site health, press, competitors and leads. Always live. <break time="0.8s" />
The Marketing Dashboard. Less time collecting, more time deciding.
```

## Or, with emotion: Eleven v3 (recommended)

v3 reads bracketed audio tags for tone, but it ignores the `<break>` tags above, so this version uses `[pause]` and new lines instead.
Tags are kept light on purpose; too many make it sound acted. If a tag gets read aloud, delete it.

```
[confident] Every week, our marketing data... lives on seven different platforms. [pause]

[thoughtful] What should be simple has become fragmented. [sighs] And manual. [pause]

[matter-of-fact] Sign in. Export. Copy it all by hand. Every single week. [pause]

[knowingly] Sounds familiar? It takes hours. [pause]

[warmly] So we made it simpler. Everything, in one place. [pause]

[excited] Introducing the Marketing Dashboard. [pause]

[upbeat] Every channel, in one dashboard. Updated automatically. No more copy and paste. [pause]

[confident] Now, we can turn insights into decisions. [pause]

[upbeat] Trends, AI reports, keyword strategy, site audits... and a lot more. [pause]

[curious] Spot a spike on one channel, and see how it lifts all the others. [pause]

[warmly] Every week, AI reads the numbers, and tells us what to do next. [pause]

[proud] And with our own site audit, we save over two thousand dollars a year on SEMrush. [pause]

[confident] All of it, in one dashboard. [pause]

[upbeat] Site health, press, competitors and leads. Always live. [pause]

[warmly] The Marketing Dashboard. [pause] Less time collecting, more time deciding.
```

For v3, set Stability to "Natural" (the middle setting). "Creative" adds more emotion but can drift between takes.

## Settings for ElevenLabs

- Voice: warm, confident, conversational, as if explaining it to a colleague. Not a radio announcer, not salesy.
- Model: Eleven Multilingual v2 (or v3 if you have it).
- Stability about 50, Similarity about 75, Style about 20, Speaker boost on, speed 1.0.
- Format: MP3, 44.1 kHz, 128 kbps or better.
- Pronunciation: "SEMrush" is "SEM-rush". If a word comes out wrong, spell it the way it sounds in the box (for example "Sem rush").
- Lines 01 and 02 are one sentence, so they are spoken together; I split them at the "...".
- If one line comes out badly, regenerate the whole file rather than patching a single line, so the voice stays the same throughout.
- If the model reads the break tags aloud, delete them and press Enter twice between lines instead.
