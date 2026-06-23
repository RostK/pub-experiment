# 🍕 What Are You, Really?

A pub party game. Answer **5 cheeky questions** and a single-prompt "agent" reads
your inputs and **crowns you** — your spirit pizza topping, inner houseplant,
Hogwarts house, drink alter-ego, crisp flavour and bar-stool archetype — plus an
overall **Title + a one-line roast** to read aloud. Then run it round the table
and **compare**.

> Built from a pub challenge brief: *"WHAT ARE YOU, REALLY? — Answer 5 questions.
> Meet your spirit pizza topping… then an agent crowns you. Run it round the
> table and compare."* — tags: `AI Agent`, `Vision`.

## How to play

Open **`index.html`** in any browser (phone or laptop). No install, no internet,
no API key — **it runs 100% offline and nothing leaves the device.**

1. Type your name → answer 5 questions.
2. Watch the agent "read your inputs", then get crowned.
3. Tap **Add me to the table**, pass the phone to the next person.
4. Hit **Compare the table** for everyone's results + cheeky superlatives
   (Most chaotic, Warmest soul, Biggest main character, Deepest thinker…).
5. **Copy my result** / **Share the table** drops a ready-made message into the
   group chat.

## How the "agent" works

There's no model call — it's a deterministic **4-element spirit engine** (Fire 🔥
/ Earth 🌿 / Air ✨ / Water 🌊). Every answer carries weights across the four
elements; your dominant + secondary element pick your Title, and each verdict is
selected from a hand-written pool using a hash of your answers, so the categories
decorrelate and tables get varied, repeatable results. All 1,024 answer
combinations are covered — no dead ends.

## Tweak it

Everything lives in one file. Edit the `QUESTIONS`, `TITLES` and `POOLS` data at
the top of the `<script>` block to change questions or add your own verdict
categories. Cheeky-but-kind by design — swap the lines for house-rules spice.
