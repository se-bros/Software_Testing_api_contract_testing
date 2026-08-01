import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const slidesPath = 'slides.md';
if (!existsSync(slidesPath)) {
  console.error('slides.md not found');
  process.exit(1);
}

const content = readFileSync(slidesPath, 'utf8');
const lines = content.split('\n');

let slideIdx = 1;

// Parse the file to find all src: references in order
const chunks = [];
let cur = [];
let inFence = false;
for (const line of lines) {
  if (/^\s*```/.test(line)) inFence = !inFence;
  if (!inFence && /^---\s*$/.test(line)) {
    chunks.push(cur.join('\n'));
    cur = [];
  } else {
    cur.push(line);
  }
}
if (cur.length) chunks.push(cur.join('\n'));

for (const chunk of chunks) {
  const linesOfChunk = chunk.split('\n');
  let srcFile = null;
  for (const line of linesOfChunk) {
    const match = line.match(/^\s*src:\s*(\S+)/);
    if (match) {
      srcFile = match[1];
      break;
    }
  }

  if (srcFile) {
    const absolutePath = join(dirname(slidesPath), srcFile);
    if (existsSync(absolutePath)) {
      let fileContent = readFileSync(absolutePath, 'utf8');
      
      // Remove any existing Slide number comments at bottom or top
      fileContent = fileContent.replace(/\n*<!--\s*Slide\s+\d+\s*-->\n*$/gi, '');
      fileContent = fileContent.replace(/^\s*<!--\s*Slide\s+\d+\s*-->\n*/gi, '');
      fileContent = fileContent.replace(/\n*<!--\s*Slide\s+\d+\s*-->\n*/gi, '\n');
      
      let updatedContent = '';
      const trimmed = fileContent.trimStart();
      if (trimmed.startsWith('---')) {
        // Has frontmatter
        const fileLines = fileContent.split('\n');
        let endFrontmatterIdx = -1;
        for (let idx = 1; idx < fileLines.length; idx++) {
          if (fileLines[idx].trim() === '---') {
            endFrontmatterIdx = idx;
            break;
          }
        }
        if (endFrontmatterIdx !== -1) {
          fileLines.splice(endFrontmatterIdx + 1, 0, `\n<!-- Slide ${slideIdx} -->`);
          updatedContent = fileLines.join('\n');
        } else {
          updatedContent = `<!-- Slide ${slideIdx} -->\n\n${fileContent}`;
        }
      } else {
        updatedContent = `<!-- Slide ${slideIdx} -->\n\n${trimmed}`;
      }
      
      writeFileSync(absolutePath, updatedContent, 'utf8');
      console.log(`Updated ${srcFile} -> Slide ${slideIdx} (at the top)`);
      slideIdx++;
    } else {
      console.warn(`File not found: ${srcFile}`);
    }
  } else if (chunk.trim() && !chunk.split('\n').every(l => l.trim() === '' || /^[a-zA-Z][\w-]*:/.test(l.trim()))) {
    console.log(`Inline content in slides.md -> Slide ${slideIdx}`);
    slideIdx++;
  }
}
console.log('Finished updating slide numbers at the top!');
