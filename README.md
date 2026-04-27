# cursor-rules-init

Scaffold an opinionated `.cursorrules` starter for Cursor, Claude, ChatGPT,
or any chat-based AI coding tool. Free, MIT, no signup, no telemetry.

```bash
npx cursor-rules-init typescript
# wrote .cursorrules (typescript stack, 2014 bytes)
```

## Why

Default AI assistant output is verbose, hedging, and over-eager to
refactor. The fastest fix is a `.cursorrules` file at the repo root.
But you don't want to write one from scratch every time. This is the
starter set I've been using daily for ~18 months.

## Stacks

```bash
npx cursor-rules-init --list
```

Currently:

| Stack | What it stacks |
| - | - |
| `base` | Senior-dev defaults, language-agnostic. |
| `typescript` | base + TypeScript strict. |
| `react` | base + TypeScript + React 18 hooks discipline. |
| `nextjs` | base + TypeScript + React + App Router. |
| `python` | base + Python 3.11+ types + pytest. |
| `node-server` | base + TypeScript + Express/Fastify defaults. |

## Usage

```bash
npx cursor-rules-init                    # base stack -> .cursorrules
npx cursor-rules-init typescript         # ts overlay  -> .cursorrules
npx cursor-rules-init react -o RULES.md  # custom path
npx cursor-rules-init --print python     # stdout only, no file write
npx cursor-rules-init --list             # list stacks
```

The CLI refuses to overwrite an existing `.cursorrules`. Move it aside
or use a different `-o` path.

## What's inside

Every stack starts with the `base` rules:

- Cap output verbosity, no greetings or sign-offs.
- Smallest diff that solves it. No speculative refactors.
- Errors are nouns, never strings. Never catch-and-discard.
- Security defaults: parameterized SQL, no header trust, no PII logs.
- Debug methodology: reproduce > hypothesize > test > fix.
- Code review order: bugs > risks > style. Skip empty categories.
- Power-user mode: messages prefixed with `::` get code-only replies.

Stack overlays add language-specific rules on top: TypeScript strict
typing rules, React hooks discipline, Next.js App Router conventions,
Python pytest patterns, etc.

## Want the longer set

This CLI ships 6 stack starters. The full pack has 24 `.cursorrules`
files plus 3 system prompts, including REST API design, Postgres + SQL,
testing conventions for vitest/jest/pytest, accessibility defaults,
Docker, GitHub Actions, monorepos, and a zero-output power-user mode:

[depmedic Senior Dev Cursor Rules](https://buy.polar.sh/polar_cl_jxM0uITjh3WOQYgLnrVfRgN3yLjhvCCB8iItg3PHmOy) - $7
one-time, free updates within v1.x.

If you only want the system prompt, there's a [$3 single-prompt
SKU](https://buy.polar.sh/polar_cl_uB8vltMstgTufNMgUCEslCJXYrJdKh7IiaV4X40HCoS).

## Companion tools

- [`ci-doctor`](https://www.npmjs.com/package/ci-doctor) - audit GitHub
  Actions workflows for cost waste and security gaps.
- [`depmedic`](https://www.npmjs.com/package/depmedic) - surgical npm
  vulnerability triage. `npm audit fix` is too aggressive; this finds
  the smallest set of bumps that close the real issues.

## License

MIT.
