import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import MarkdownIt from 'markdown-it';
import { parse } from '@vue/compiler-dom';

const slidesPath = 'slides.md';
if (!existsSync(slidesPath)) {
  console.error('slides.md not found');
  process.exit(1);
}

function getSlidesOfFile(filePath) {
  const content = readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split('\n');
  
  const parts = [];
  let cur = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && /^---\s*$/.test(line)) {
      parts.push(cur.join('\n'));
      cur = [];
    } else {
      cur.push(line);
    }
  }
  if (cur.length) parts.push(cur.join('\n'));

  const slides = [];
  let i = 0;
  const startsWithDashes = content.trimStart().startsWith('---');
  if (startsWithDashes) {
    i = 1;
  }
  
  while (i < parts.length) {
    let frontmatter = '';
    let slideContent = '';
    
    if (startsWithDashes || i > 0) {
      frontmatter = parts[i] || '';
      slideContent = parts[i + 1] || '';
      i += 2;
    } else {
      slideContent = parts[i] || '';
      i += 1;
    }
    
    let srcFile = null;
    const fmLines = frontmatter.split('\n');
    for (const line of fmLines) {
      const match = line.match(/^\s*src:\s*(\S+)/);
      if (match) { srcFile = match[1]; break; }
    }
    if (!srcFile) {
      const cLines = slideContent.split('\n');
      for (const line of cLines) {
        const match = line.match(/^\s*src:\s*(\S+)/);
        if (match) { srcFile = match[1]; break; }
      }
    }
    
    if (srcFile) {
      const absolutePath = join(dirname(filePath), srcFile);
      if (existsSync(absolutePath)) {
        slides.push(...getSlidesOfFile(absolutePath));
      } else {
        console.warn('Not found: ' + srcFile);
      }
    } else if (frontmatter.trim() || slideContent.trim()) {
      slides.push({ filePath, frontmatter, content: slideContent });
    }
  }
  return slides;
}

const slides = getSlidesOfFile(slidesPath);
console.log(`Analyzing ${slides.length} slides for Vue/HTML syntax issues...\n`);

const md = new MarkdownIt({ html: true, linkify: true });
const debugSlide = parseInt(process.argv[2] || '-1', 10);

let totalErrors = 0;
slides.forEach((slideObj, idx) => {
  let s = slideObj.content;
  s = s.replace(/<!--[\s\S]*?-->/g, '');

  const html = md.render(s);
  const errs = [];
  parse(html, { onError: (e) => errs.push(e) });
  const missingEnd = errs.filter(e => /end tag|missing|Invalid|element/i.test(String(e.message || e)));
  const codeTrapped = /&lt;\/?[a-zA-Z]/.test(html.replace(/&lt;token&gt;/g, ''));

  if (idx === debugSlide) {
    console.log(`\n########## GENERATED HTML FOR SLIDE ${idx + 1} ##########\n`);
    console.log(html);
    console.log(`########## END SLIDE ${idx + 1} ##########\n`);
  }

  if (missingEnd.length || codeTrapped) {
    totalErrors++;
    console.log(`\n=== SLIDE ${idx + 1} (${slideObj.filePath}) ===`);
    missingEnd.forEach(e => console.log('  VUE ERROR:', e.message, `(loc ~line ${e.loc?.start?.line})`));
    if (codeTrapped) console.log('  WARNING: tag trapped inside <pre><code>');
  }
});

console.log(`\n========================================`);
console.log(`Total slides: ${slides.length}`);
console.log(`Slides with problems: ${totalErrors}`);
console.log(totalErrors === 0 ? 'ALL SLIDES OK ✓' : 'PROBLEMS FOUND ✗');
process.exit(totalErrors === 0 ? 0 : 1);
