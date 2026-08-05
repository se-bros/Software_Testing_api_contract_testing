import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

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

const slides = getSlidesOfFile(join(process.cwd(), 'slides.md'));

console.log(`Analyzing ${slides.length} slides for vertical overflow risks...\n`);

const MAX_SAFE_HEIGHT_PX = 490; // Canvas height is 551px

let overflowCount = 0;

slides.forEach((slideObj, idx) => {
  const slide = slideObj.content;
  const fileName = slideObj.filePath;

  const lines = slide.split('\n');
  let estHeight = 35; // base slide padding top/bottom
  let inCode = false;
  let codeLineCount = 0;
  let tableRowCount = 0;
  let inGrid = false;
  let gridColumns = 1;
  let gridHeightAcc = 0;

  for (const l of lines) {
    const trimmed = l.trim();
    if (trimmed.startsWith('---')) continue;
    if (/^[a-zA-Z][\w-]*:/.test(trimmed)) continue; // frontmatter

    if (trimmed.includes('grid-cols-2')) { inGrid = true; gridColumns = 2; }
    else if (trimmed.includes('grid-cols-3')) { inGrid = true; gridColumns = 3; }
    else if (trimmed.includes('</div>') && inGrid) { 
      estHeight += (gridHeightAcc / gridColumns);
      gridHeightAcc = 0;
      inGrid = false; 
    }

    if (trimmed.startsWith('```')) {
      if (inCode) {
        const itemH = codeLineCount * 15 + 20;
        if (inGrid) gridHeightAcc += itemH; else estHeight += itemH;
        codeLineCount = 0;
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLineCount++;
      continue;
    }

    if (trimmed.startsWith('|')) {
      tableRowCount++;
      continue;
    } else if (tableRowCount > 0) {
      const itemH = tableRowCount * 22 + 12;
      if (inGrid) gridHeightAcc += itemH; else estHeight += itemH;
      tableRowCount = 0;
    }

    let h = 0;
    if (trimmed.startsWith('# ')) h = 45;
    else if (trimmed.startsWith('## ')) h = 32;
    else if (trimmed.startsWith('### ')) h = 26;
    else if (trimmed.includes('class="footnotes"') || trimmed.includes('.footnotes')) h = 50;
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\./.test(trimmed)) h = 18;
    else if (trimmed.length > 0 && !trimmed.startsWith('<')) h = 16;

    if (inGrid) gridHeightAcc += h; else estHeight += h;
  }

  if (inGrid && gridHeightAcc > 0) {
    estHeight += (gridHeightAcc / gridColumns);
  }

  if (tableRowCount > 0) {
    estHeight += tableRowCount * 22 + 12;
  }

  if (estHeight > MAX_SAFE_HEIGHT_PX) {
    overflowCount++;
    console.log(`[OVERFLOW RISK] Slide ${idx + 1} (${fileName}): Est height ~${Math.round(estHeight)}px (Max safe: ${MAX_SAFE_HEIGHT_PX}px)`);
  }
});

console.log(`\n========================================`);
console.log(`Total slides checked: ${slides.length}`);
console.log(`Slides with potential overflow: ${overflowCount}`);
if (overflowCount === 0) {
  console.log(`ALL SLIDES FIT WITHIN CANVAS ✓`);
} else {
  console.log(`ATTENTION: ${overflowCount} slide(s) exceed safe vertical threshold ✗`);
}
