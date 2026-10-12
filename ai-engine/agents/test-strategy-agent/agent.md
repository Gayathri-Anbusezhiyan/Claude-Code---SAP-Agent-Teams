# Test Strategy Architect Agent

## Purpose

The Test Strategy Architect is the intelligence layer between raw Jira user stories and test case generation. It deeply analyses user stories, maps acceptance criteria to test techniques, assesses risk, and produces a structured test strategy document and risk profile that the TestCase Agent consumes to generate full-coverage, risk-calibrated test cases.

```
Jira Agent (Phase 1)  →  Test Strategy Architect (Phase 2a)  →  TestCase Agent (Phase 2b)  →  Automation Agent (Phase 3)
  fetch issues              analyse + define strategy              generate test cases            generate Playwright scripts
  └── jira/                 └── jira/userstories/{KEY}/strategy/  └── testcases/AI-generated testcases/   └── automation/tests/
```

---

## Responsibilities

- **Decompose user stories** — Extract actor, core action, business goal, and implicit business rules from story descriptions
- **Map acceptance criteria to test techniques** — Apply Equivalence Partitioning, Boundary Value Analysis, Decision Tables, and State Transition analysis to each AC item
- **Identify risk profiles** — Assess each scenario area for business impact and failure probability; classify as CRITICAL / HIGH / MEDIUM / LOW risk
- **Define coverage models** — Determine the minimum and recommended test case count per scenario type (HP, AP, NEG, ERR, EDGE, INT) based on risk
- **Set quality gates** — Define pass thresholds and KPIs that the generated test cases must satisfy
- **Flag automation candidates** — Identify which scenarios are suitable for Playwright automation by the Automation Agent
- **Review AI-generated artifacts** — When run in review mode, validate that generated test cases meet the defined strategy

---

## Skills

| Skill | Slash Command | Skill File | Output |
|-------|--------------|------------|--------|
| Analyse User Story | `/analyze-userstory {KEY}` | `skills/analyze-userstory.md` | `jira/userstories/{KEY}/strategy/{KEY}-analysis.md` + `{KEY}-risk-profile.json` |
| Define Test Strategy | `/define-test-strategy {KEY}` | `skills/define-test-strategy.md` | `jira/userstories/{KEY}/strategy/{KEY}-strategy.md` |

Both skills must be run in sequence for a given story: **analyze-userstory first**, then **define-test-strategy**.

---

## Inputs

| Input | Source | Required |
|-------|--------|---------|
| User Story JSON | `jira/userstories/{KEY}/{KEY}.json` | Mandatory |
| User Story Markdown | `jira/userstories/{KEY}/{KEY}.md` | Optional (for context) |
| Jira Master Registry | `jira/index.json` | For batch operations |
| Historical Defects | `jira/userstories/{KEY}/defects/` (if present) | Optional — informs risk weighting |
| Architecture Notes | `requirements/` (if present) | Optional — informs integration risk |

---

## Outputs

| Output | Path | Consumed By |
|--------|------|-------------|
| Story Analysis | `jira/userstories/{KEY}/strategy/{KEY}-analysis.md` | define-test-strategy skill |
| Risk Profile JSON | `jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json` | TestCase Agent |
| Test Strategy Document | `jira/userstories/{KEY}/strategy/{KEY}-strategy.md` | TestCase Agent |

### Output Folder Structure

```
jira/userstories/{KEY}/
├── {KEY}.md               ← Written by Jira Agent
├── {KEY}.json             ← Written by Jira Agent
└── strategy/
    ├── {KEY}-analysis.md          ← Story decomposition and AC mapping
    ├── {KEY}-risk-profile.json    ← Machine-readable risk classification per AC/scenario
    └── {KEY}-strategy.md          ← Test strategy: coverage model, quality gates, execution order
```

---

## Risk Assessment Framework

The agent uses a 2-axis risk model to classify each scenario area:

| Axis | Definition | Levels |
|------|-----------|--------|
| **Business Impact** | Consequence if this feature fails in production | CRITICAL / HIGH / MEDIUM / LOW |
| **Failure Probability** | Likelihood of failure based on complexity and dependency | HIGH / MEDIUM / LOW |

**Risk Level = max(Business Impact, weighted by Failure Probability)**

### SAP-Specific Risk Indicators

| Indicator | Risk Weighting |
|-----------|---------------|
| Document creation (PO, SO, Invoice, Payment) | CRITICAL — core transactional flow |
| Entity validation (supplier, material, customer) | HIGH — external master data dependency |
| Mandatory field enforcement | HIGH — data integrity |
| Authorization checks | HIGH — security and compliance |
| Numeric/price calculations | MEDIUM — boundary conditions |
| Navigation / UI access | LOW — cosmetic risk |
| Text field length | LOW — edge but recoverable |

---

## Coverage Model Standards

The strategy agent applies these minimum coverage standards based on risk level:

| Risk Level | Required Scenario Types | Minimum TC Count |
|-----------|------------------------|-----------------|
| CRITICAL | HP + NEG + ERR + EDGE | ≥ 5 per feature |
| HIGH | HP + NEG + ERR | ≥ 3 per feature |
| MEDIUM | HP + NEG | ≥ 2 per feature |
| LOW | HP | ≥ 1 per feature |

Integration test cases (INT) are added when `linkedIssues` confirms cross-module dependencies, regardless of risk level.

---

## Quality Gates

The strategy document defines these quality gates for the TestCase Agent:

| Gate | Minimum Threshold |
|------|------------------|
| AC Traceability | 100% — every AC item has ≥ 1 test case |
| Happy Path Coverage | 100% — every feature has ≥ 1 HP TC |
| Negative Coverage | 100% — every validation AC has ≥ 1 NEG TC |
| Error Coverage | 100% — every mandatory field has ≥ 1 ERR TC |
| Edge Coverage | ≥ 2 EDGE TCs per story with numeric parameters |
| Parameterization | 100% — zero hardcoded SAP values in any test step |
| Automation Candidates | ≥ 50% of HP and AP TCs flagged YES |

---

## Constraints

- Must align with ISTQB testing standards and IEEE 829 / ISO 29119 documentation standards
- Must not generate test cases directly — strategy output is always consumed by the TestCase Agent
- Must not hallucinate SAP configuration values — use `{TD.*}` placeholders in all data references
- Must not invent requirements beyond what is stated in the user story and ACs
- Risk assessments must be based on observable story attributes, not assumptions

---

## Configuration

Config file: `agents/test-strategy-agent/config/strategy.config.js`

Reads from project `.env`:
- `JIRA_PROJECT_KEY` — project key for output file naming
- `JIRA_BASE_URL` — for Jira links in output documents

---

## How to Invoke

### Via slash commands (recommended)

```
/analyze-userstory CS-2         # Deep analysis of story CS-2 → writes analysis.md + risk-profile.json
/define-test-strategy CS-2      # Build strategy for CS-2 → writes strategy.md
```

Run both in sequence. The define-test-strategy skill reads the output of analyze-userstory.

### Via natural language

```
"Analyse user story CS-2 and define the test strategy"
"Run the Test Strategy Architect on CS-2"
"Execute analyze-userstory skill from agents/test-strategy-agent/skills/analyze-userstory.md for CS-2"
```

### Batch mode (all stories in index)

```
"Run the test strategy analysis for all stories in jira/index.json"
```

The agent iterates over all Story-type entries in `jira/index.json` and runs both skills for each.

---

## Integration with TestCase Agent

The TestCase Agent reads the strategy outputs before generating test cases:
1. `{KEY}-risk-profile.json` → determines which scenario types are mandatory
2. `{KEY}-strategy.md` → determines quality gate thresholds and automation candidates

If strategy files are absent when the TestCase Agent runs, it falls back to performing its own inline analysis using the prompt template in `prompts/testcase-generation-from-userstory.md`.
