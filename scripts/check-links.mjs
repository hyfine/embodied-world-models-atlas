import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const files = ['.', 'docs'].flatMap(dir => readdirSync(dir)
  .filter(name => /\.(?:md|html)$/.test(name)).map(name => `${dir}/${name}`));
let total = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const pattern = file.endsWith('.md') ? /\]\(<?([^\s)>]+)/g : /(?:href|src)="([^"]+)"/g;
  for (const [, url] of text.matchAll(pattern)) {
    if (/^[a-z]+:/i.test(url)) continue;
    const [path, anchor] = url.split('#');
    const target = path ? resolve(dirname(file), path) : file;
    assert(existsSync(target), `${file}: missing ${url}`);
    if (anchor) assert(readFileSync(target, 'utf8').includes(`id="${anchor}"`), `${file}: missing anchor ${url}`);
    total++;
  }
}
console.log(`Verified ${total} local links and explicit anchors.`);
