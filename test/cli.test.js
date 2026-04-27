'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const CLI = path.join(__dirname, '..', 'bin', 'cli.js');
const NODE = process.execPath;

function run(args, cwd) {
  return execFileSync(NODE, [CLI, ...args], { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
}

test('list shows stacks', () => {
  const out = run(['--list']);
  assert.match(out, /typescript/);
  assert.match(out, /python/);
  assert.match(out, /react/);
});

test('help mentions Polar pack', () => {
  const out = run(['--help']);
  assert.match(out, /buy\.polar\.sh/);
});

test('print writes content to stdout, no file', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-'));
  const out = run(['--print', 'typescript'], tmp);
  assert.match(out, /TypeScript 5\.x/);
  assert.equal(fs.existsSync(path.join(tmp, '.cursorrules')), false);
});

test('write to default path', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-'));
  const out = run(['react'], tmp);
  assert.match(out, /wrote \.cursorrules/);
  const body = fs.readFileSync(path.join(tmp, '.cursorrules'), 'utf8');
  assert.match(body, /React 18\+/);
  assert.match(body, /TypeScript 5\.x/);
  assert.match(body, /senior-dev/i);
});

test('refuses to overwrite existing file', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cr-'));
  fs.writeFileSync(path.join(tmp, '.cursorrules'), 'old');
  let err;
  try { run(['base'], tmp); } catch (e) { err = e; }
  assert.ok(err, 'expected non-zero exit');
  assert.match(err.stderr.toString(), /refusing to overwrite/);
});
