#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { listStacks, buildContent, resolveStack } = require('../src/index.js');

function help() {
  return [
    'cursor-rules-init - scaffold opinionated .cursorrules starters',
    '',
    'usage:',
    '  cursor-rules-init [stack]              write .cursorrules to cwd',
    '  cursor-rules-init [stack] -o file      write to specific path',
    '  cursor-rules-init --print [stack]      print to stdout, no file',
    '  cursor-rules-init --list               list stacks',
    '  cursor-rules-init --help               this help',
    '',
    'stacks:',
    ...listStacks().map((s) => `  ${s.key.padEnd(14)}${s.description}`),
    '',
    'default stack: base',
    '',
    'companion CLIs (free, MIT):',
    '  npx ci-doctor          audit GitHub Actions for cost + security',
    '  npx gha-budget         estimate $ cost of a GHA workflow',
    '  npx depmedic           surgical npm vulnerability triage',
    '',
    'For the longer set (24 .cursorrules files + 3 system prompts, $7):',
    '  https://buy.polar.sh/polar_cl_jxM0uITjh3WOQYgLnrVfRgN3yLjhvCCB8iItg3PHmOy',
  ].join('\n');
}

function main(argv) {
  const args = argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    process.stdout.write(help() + '\n');
    return 0;
  }
  if (args.includes('--list')) {
    for (const s of listStacks()) {
      process.stdout.write(`${s.key.padEnd(14)}${s.description}\n`);
    }
    return 0;
  }
  let stack = 'base';
  let outFile = '.cursorrules';
  let printOnly = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--print') printOnly = true;
    else if (a === '-o' || a === '--out') outFile = args[++i];
    else if (a.startsWith('-')) { process.stderr.write(`unknown flag: ${a}\n`); return 2; }
    else stack = a;
  }
  if (!resolveStack(stack)) {
    process.stderr.write(`unknown stack: ${stack}\nrun: cursor-rules-init --list\n`);
    return 2;
  }
  const content = buildContent(stack);
  if (printOnly) {
    process.stdout.write(content);
    return 0;
  }
  const target = path.resolve(process.cwd(), outFile);
  if (fs.existsSync(target)) {
    process.stderr.write(`refusing to overwrite existing file: ${outFile}\n`);
    process.stderr.write(`use a different -o path, delete the file first, or use --print to send to stdout.\n`);
    return 1;
  }
  fs.writeFileSync(target, content);
  process.stdout.write(`wrote ${outFile} (${stack} stack, ${content.length} bytes)\n`);
  return 0;
}

process.exit(main(process.argv));
