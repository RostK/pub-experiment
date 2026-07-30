# What Are You, Really?

A pub party game, built in a pub in about an hour. Answer five questions, let it
read your aura through the camera, and it crowns you — spirit pizza topping,
inner houseplant, Hogwarts house, drink alter-ego, crisp flavour and bar-stool
archetype — plus a title and a one-line roast to read aloud. Then pass the phone
round the table and compare.

Live at **[pub.rostyslav.rocks](https://pub.rostyslav.rocks/)**.

## How to play

Open the page on any phone or laptop. No install, no sign-up, no API key.

1. Type your name, answer five questions.
2. Let it read your aura through the camera — or decline, and it works from the
   answers alone.
3. Get crowned. Tap **Add me to the table** and pass the phone on.
4. **Compare the table** for everyone's results and the superlatives — most
   chaotic, warmest soul, biggest main character, deepest thinker.
5. Save an aura card as an image, or share the whole table into the group chat.

## How it works

Two inputs, blended. No server, and at runtime no model call or network
request of any kind.

**The camera read.** Two frames are grabbed from `getUserMedia` a beat apart.
The captured frame is analysed on-device for colour and brightness and for where
you are in it; the difference between the two frames gives your movement, which
feeds extra energy into Fire and Air. That produces a score across four elements
— Fire, Earth, Air, Water — plus a brightness value that decides whether your
aura comes out bright or deep. The camera stream is stopped as soon as the read
finishes. The frame stays in the page to render your aura card and is never
uploaded.

**The answers.** Each answer carries its own weights across the same four
elements. The two are blended — answers at full weight, camera at 0.8 — and your
dominant element picks the title. Each verdict is drawn from a pre-generated pool
using a hash of your answers, so the categories decorrelate and a table gets
varied but repeatable results.

The verdicts, titles and roasts were generated ahead of time by an agent and
frozen into the page. The AI work happens before you open it — at runtime the
engine is deterministic, offline, and never calls a model.

No camera, or permission declined, and it says so and reads the answers alone.

Everything is one `index.html`: plain JavaScript and HTML, no build step, no
dependencies. English and Ukrainian.

## Tweak it

`QUESTIONS`, `TITLES` and `POOLS` at the top of the `<script>` block hold the
content. Cheeky-but-kind by design — swap the lines for house rules.
