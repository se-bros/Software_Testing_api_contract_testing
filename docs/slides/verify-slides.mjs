import { readFileSync } from 'node:fs';
import MarkdownIt from 'markdown-it';
import { parse } from '@vue/compiler-dom';

const content = readFileSync('slides.md', 'utf8');
const lines = content.split('\n');

// Strip headmatter
let start = 0;
if (lines[0].trim() === '---') {
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { start = i + 1; break; }
  }
}

// Split into chunks on '---' at line start, IGNORING --- inside code fences
const chunks = [];
let cur = [];
let inFence = false;
for (let i = start; i < lines.length; i++) {
  const line = lines[i];
  if (/^\s*```/.test(line)) inFence = !inFence;
  if (!inFence && /^---\s*$/.test(line)) {
    chunks.push(cur.join('\n'));
    cur = [];
  } else {
    cur.push(line);
  }
}
if (cur.length) chunks.push(cur.join('\n'));

// A chunk that is ONLY frontmatter (key: value lines) belongs to the NEXT slide.
const isFrontmatterOnly = (c) => {
  const t = c.trim();
  if (!t) return false;
  return t.split('\n').every(l => l.trim() === '' || /^[a-zA-Z][\w-]*:/.test(l.trim()));
};
const slides = [];
for (let i = 0; i < chunks.length; i++) {
  if (isFrontmatterOnly(chunks[i]) && i + 1 < chunks.length) {
    slides.push(chunks[i] + '\n---\n' + chunks[i + 1]);
    i++;
  } else if (chunks[i].trim()) {
    slides.push(chunks[i]);
  }
}

const md = new MarkdownIt({ html: true, linkify: true });
const debugSlide = parseInt(process.argv[2] || '-1', 10);

let totalErrors = 0;
slides.forEach((slide, idx) => {
  let s = slide;
  const sl = s.split('\n');
  // Strip leading frontmatter: either '---\n...\n---' or 'key: value\n---'
  if (sl[0].trim() === '---') {
    for (let i = 1; i < sl.length; i++) {
      if (sl[i].trim() === '---') { s = sl.slice(i + 1).join('\n'); break; }
    }
  } else if (/^[a-zA-Z][\w-]*:/.test(sl[0].trim())) {
    for (let i = 0; i < sl.length; i++) {
      if (sl[i].trim() === '---') { s = sl.slice(i + 1).join('\n'); break; }
    }
  }
  s = s.replace(/<!--[\s\S]*?-->/g, '');

  const html = md.render(s);
  const errs = [];
  parse(html, { onError: (e) => errs.push(e) });
  const missingEnd = errs.filter(e => /end tag|missing|Invalid|element/i.test(String(e.message || e)));
  const codeTrapped = /&lt;\/?[a-zA-Z]/.test(html);

  if (idx === debugSlide) {
    console.log(`\n########## GENERATED HTML FOR SLIDE ${idx + 1} ##########\n`);
    console.log(html);
    console.log(`########## END SLIDE ${idx + 1} ##########\n`);
  }

  if (missingEnd.length || codeTrapped) {
    totalErrors++;
    console.log(`\n=== SLIDE ${idx + 1} ===`);
    missingEnd.forEach(e => console.log('  VUE ERROR:', e.message, `(loc ~line ${e.loc?.start?.line})`));
    if (codeTrapped) console.log('  WARNING: tag trapped inside <pre><code>');
  }
});

console.log(`\n========================================`);
console.log(`Total slides: ${slides.length}`);
console.log(`Slides with problems: ${totalErrors}`);
console.log(totalErrors === 0 ? 'ALL SLIDES OK ✓' : 'PROBLEMS FOUND ✗');
