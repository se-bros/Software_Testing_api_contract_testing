import { readFileSync, readdirSync } from 'node:fs';
const files = readdirSync('pages').filter(f => f.endsWith('.md'));
for (const f of files) {
  const lines = readFileSync('pages/' + f, 'utf8').split('\n');
  let inFence = false;
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) inFence = !inFence;
    if (!inFence && l.includes('{{')) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
