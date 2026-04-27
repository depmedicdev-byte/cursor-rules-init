'use strict';
const fs = require('node:fs');
const path = require('node:path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

const STACKS = {
  base: { files: ['base.cursorrules'], description: 'Senior-dev defaults, language-agnostic.' },
  typescript: { files: ['base.cursorrules', 'typescript.cursorrules'], description: 'TypeScript strict + senior-dev defaults.' },
  ts: { alias: 'typescript' },
  react: { files: ['base.cursorrules', 'typescript.cursorrules', 'react.cursorrules'], description: 'React + TypeScript + senior-dev defaults.' },
  nextjs: { files: ['base.cursorrules', 'typescript.cursorrules', 'react.cursorrules', 'nextjs.cursorrules'], description: 'Next.js App Router + React + TypeScript.' },
  next: { alias: 'nextjs' },
  python: { files: ['base.cursorrules', 'python.cursorrules'], description: 'Python 3.11+ + senior-dev defaults.' },
  py: { alias: 'python' },
  'node-server': { files: ['base.cursorrules', 'typescript.cursorrules', 'node-server.cursorrules'], description: 'Node.js server-side service + TypeScript.' },
  node: { alias: 'node-server' },
};

function resolveStack(name) {
  const s = STACKS[name];
  if (!s) return null;
  if (s.alias) return resolveStack(s.alias);
  return s;
}

function listStacks() {
  return Object.entries(STACKS)
    .filter(([, v]) => !v.alias)
    .map(([k, v]) => ({ key: k, description: v.description }));
}

function buildContent(stackKey) {
  const s = resolveStack(stackKey);
  if (!s) throw new Error(`unknown stack: ${stackKey}`);
  const parts = s.files.map((f) => fs.readFileSync(path.join(TEMPLATES_DIR, f), 'utf8'));
  return parts.join('\n\n');
}

module.exports = { STACKS, resolveStack, listStacks, buildContent };
