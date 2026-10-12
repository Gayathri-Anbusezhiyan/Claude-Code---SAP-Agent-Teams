# Automation Agent — Phase 3 & Phase 4

## Purpose

The Automation Agent executes SAP test cases via the Playwright MCP server to capture real UI data (Phase 3: Exploration), then generates 100% executable Playwright scripts from that data (Phase 4: Script Generation).

## Pipeline Position

```
TestCase Agent (Phase 2b)  →  Automation Agent P3 (Explore)  →  Automation Agent P4 (Generate)
  testcases/ + testdata/        exploration-data/execution/        test-registry/automation/pages/ + tests/
```

## Skills

| Skill | Slash Command | Skill File |
|-------|---------------|------------|
| Explore and Capture | `/explore-and-capture {KEY}` | `skills/explore-and-capture.md` |
| Generate Scripts | `/generate-scripts {KEY}` | `skills/generate-scripts.md` |

## Quick Start

```
/explore-and-capture CS-2    # Execute all CS-2 TCs via MCP, capture selectors + behaviors
/generate-scripts CS-2       # Generate locators.js, page.js, fixtures.js, spec.js, data.json
npm run test:mm               # Run the generated scripts
```

## Status

Active — Phase 3 and Phase 4 implemented. See `agent.md` for full documentation.
