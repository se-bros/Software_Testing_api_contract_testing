import { readFileSync } from 'node:fs';
const lines = readFileSync('slides.md', 'utf8').split('\n');
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
