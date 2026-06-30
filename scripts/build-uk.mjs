#!/usr/bin/env node
/*
 * build-uk.mjs — generate uk/index.html from the canonical index.html.
 *
 * The app in index.html already embeds BOTH languages plus the switcher, so the
 * Ukrainian page is the very same file with only three differences:
 *   1. a <base href="../"> so every relative path (favicons, sw.js, …) resolves
 *      from the real root even though the file is served from /uk/;
 *   2. the localizable <head> block (title, manifest, canonical, OG/Twitter,
 *      iOS title) swapped to Ukrainian — this is what crawlers like Telegram read;
 *   3. window.__DEFAULT_LANG flipped to "uk" so the app boots in Ukrainian.
 *
 * Edit content/markup ONLY in index.html, then re-run:  node scripts/build-uk.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "index.html");
const OUT = resolve(root, "uk", "index.html");

const UK_HEAD = `<!-- I18N-HEAD:START — GENERATED for /uk/ by scripts/build-uk.mjs; do not edit here, edit index.html -->
<title>Ну і хто ж ти?</title>
<link rel="manifest" href="manifest-uk.webmanifest" id="manifestLink" />
<link rel="canonical" href="https://rostk.github.io/pub-experiment/uk/" />
<meta name="description" content="Квіз для компанії: дай відповідь на 5 хитрих питань, отримай сканування аури просто на пристрої — і агент виносить вердикт: піца твого духу, внутрішня рослина, факультет Гоґвортсу й інше. Пускайте по колу за столом і порівнюйте." />
<meta property="og:locale" content="uk_UA" />
<meta property="og:site_name" content="Ну і хто ж ти?" />
<meta property="og:url" content="https://rostk.github.io/pub-experiment/uk/" />
<meta property="og:title" content="Ну і хто ж ти?" />
<meta property="og:description" content="Квіз для компанії: 5 хитрих питань, сканування аури на пристрої — і агент виносить вердикт. Пускайте по колу за столом і порівнюйте." />
<meta name="twitter:title" content="Ну і хто ж ти?" />
<meta name="twitter:description" content="Квіз для компанії: 5 хитрих питань — і агент виносить вердикт." />
<meta name="apple-mobile-web-app-title" content="Хто ж ти?" id="appleTitle" />
<!-- I18N-HEAD:END -->`;

function must(cond, msg) { if (!cond) { console.error("build-uk: " + msg); process.exit(1); } }

let html = readFileSync(SRC, "utf8");

// 1. <html lang="en"> → uk
must(html.includes('<html lang="en">'), 'could not find <html lang="en">');
html = html.replace('<html lang="en">', '<html lang="uk">');

// 2. inject <base href="../"> right after the charset meta (before any URL-bearing tag)
const CHARSET = '<meta charset="UTF-8" />';
must(html.includes(CHARSET), "could not find charset meta");
html = html.replace(CHARSET, CHARSET + '\n<base href="../" />');

// 3. swap the whole localizable head block
const headRe = /<!-- I18N-HEAD:START[\s\S]*?I18N-HEAD:END -->/;
must(headRe.test(html), "could not find I18N-HEAD markers");
html = html.replace(headRe, UK_HEAD);

// 4. flip the boot default language
const DEFEN = 'window.__DEFAULT_LANG = "en";';
must(html.includes(DEFEN), "could not find __DEFAULT_LANG marker");
html = html.replace(DEFEN, 'window.__DEFAULT_LANG = "uk";');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log("build-uk: wrote " + OUT + " (" + html.length + " bytes)");
