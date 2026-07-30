import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

function getFullContent(entryFile) {
  const content = readFileSync(entryFile, 'utf8');
  const lines = content.split('\n');
  let start = 0;
  if (lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') { start = i + 1; break; }
    }
  }
  const headmatter = lines.slice(0, start).join('\n');
  const remaining = lines.slice(start);
  
  const chunks = [];
  let cur = [];
  let inFence = false;
  for (let i = 0; i < remaining.length; i++) {
    const line = remaining[i];
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && /^---\s*$/.test(line)) {
      chunks.push(cur.join('\n'));
      cur = [];
    } else {
      cur.push(line);
    }
  }
  if (cur.length) chunks.push(cur.join('\n'));
  
  const resolvedChunks = [];
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
      const absoluteSrcPath = join(dirname(entryFile), srcFile);
      if (existsSync(absoluteSrcPath)) {
        resolvedChunks.push(readFileSync(absoluteSrcPath, 'utf8'));
      } else {
        resolvedChunks.push(chunk);
      }
    } else {
      resolvedChunks.push(chunk);
    }
  }
  return headmatter + '\n' + resolvedChunks.join('\n---\n');
}

const lines = getFullContent('slides.md').split('\n');
let inFence = false;
const fenceTagLines = [];
const deepTags = [];
lines.forEach((l, i) => {
  if (/^\s*```/.test(l)) inFence = !inFence;
  if (inFence && /^    </.test(l)) fenceTagLines.push((i + 1) + ': ' + l.trim().slice(0, 40));
  if (!inFence && /^      </.test(l)) deepTags.push((i + 1) + ': ' + l.trim().slice(0, 40));
});
console.log('HTML-tag-like lines INSIDE code fences (4sp):', fenceTagLines.length);
fenceTagLines.slice(0, 10).forEach(x => console.log('  ', x));
console.log('Tags at 6-space indent (outside fences):', deepTags.length);
deepTags.slice(0, 20).forEach(x => console.log('  ', x));
