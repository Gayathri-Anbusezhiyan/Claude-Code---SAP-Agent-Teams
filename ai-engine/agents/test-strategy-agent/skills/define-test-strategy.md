# Skill: define-test-strategy

## Purpose

Consume the story analysis produced by `analyze-userstory` and produce a formal, actionable test strategy document. The strategy defines:
- Which scenario types are mandatory and recommended for this specific story
- Minimum and target test case counts per type, calibrated to the risk profile
- Quality gates (pass thresholds the TestCase Agent must meet)
- Test execution order (risk-based: highest-risk scenarios run first)
- Automation viability assessment per scenario type
- Regulatory and compliance notes (where applicable)

The output drives the TestCase Agent's generation decisions — ensuring test coverage is proportional to risk, not arbitrary.

---

## Pre-conditions

- `analyze-userstory` skill must have run first for this story key
- `jira/userstories/{KEY}/strategy/{KEY}-analysis.md` must exist
- `jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json` must exist
- Read `.env` for `JIRA_PROJECT_KEY`

---

## Execution Steps

### Step 1 — Load Analysis Artefacts

Read both files produced by the `analyze-userstory` skill:
1. `jira/userstories/{KEY}/strategy/{KEY}-analysis.md` — for human context
2. `jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json` — for structured data

Extract:
- `overallRisk` — story-level risk classification
- `scenarioInventory` — the complete list of scenarios to cover, grouped by type
- `recommendedTCCount` — baseline counts per scenario type
- `dataParameters` — boundary and input parameters
- `acceptanceCriteria` array — each AC's risk and required coverage
- `hasLinkedIssues` + `linkedIssueCount` — integration scope
- `complexity` — affects effort estimates and automation viability

---

### Step 2 — Define the Coverage Model

Using the scenario inventory and risk profile, finalize the coverage model: which scenario types are MANDATORY, RECOMMENDED, or OPTIONAL for this story.

Apply these rules:

| Risk Level | HP | AP | NEG | ERR | EDGE | INT |
|-----------|----|----|-----|-----|------|-----|
| CRITICAL | MANDATORY | RECOMMENDED | MANDATORY | MANDATORY | MANDATORY | If linked |
| HIGH | MANDATORY | OPTIONAL | MANDATORY | MANDATORY | RECOMMENDED | If linked |
| MEDIUM | MANDATORY | OPTIONAL | MANDATORY | RECOMMENDED | OPTIONAL | If linked |
| LOW | MANDATORY | OPTIONAL | OPTIONAL | OPTIONAL | OPTIONAL | If linked |

For this story's `overallRisk`, determine the final coverage model and note any story-specific adjustments based on the AC analysis (e.g., even a LOW-risk story with mandatory-field ACs requires ERR test cases).

**Finalize TC counts:**
- Start from `recommendedTCCount` in the risk profile
- Adjust up if any AC has higher risk than the story average
- Adjust down only if a scenario type is truly inapplicable (document the reason)
- Minimum per MANDATORY type: see Coverage Model Standards in agent.md

---

### Step 3 — Define Quality Gates

Set the pass/fail thresholds the TestCase Agent output must meet:

| Gate | Threshold | Rationale |
|------|-----------|-----------|
| AC Traceability | 100% of ACs covered | Every stated requirement must be tested |
| HP Coverage | 100% — all HP scenarios from inventory | Core functionality must pass |
| NEG Coverage | 100% of NEG scenarios from inventory | Every validation must be verified |
| ERR Coverage | 100% of ERR scenarios from inventory | Every mandatory field must be tested |
| EDGE Coverage | ≥ 2 EDGE TCs (lower + upper boundary) | Boundary conditions must be explicit |
| Parameterization | 0 hardcoded values | All data must use `{TD.*}` placeholders |
| Automation Eligibility | ≥ 50% of HP/AP TCs flagged YES | Enable downstream Playwright generation |

For CRITICAL risk stories, add:

| Additional Gate | Threshold |
|----------------|-----------|
| Negative coverage (entity validation) | 100% — one NEG per named entity that can be invalid |
| Error coverage (mandatory fields) | 100% — one ERR per mandatory field in ACs |

---

### Step 4 — Assign Test Case Priorities

For each scenario type, define the priority assignment rules:

| Scenario Type | Default Priority | Override Condition |
|--------------|----------------|-------------------|
| HP (core transaction) | CRITICAL | Always CRITICAL for document-creation stories |
| HP (access/navigation) | HIGH | If access is a prerequisite for all other TCs |
| AP (multi-item) | HIGH | If ACs explicitly describe multi-item requirements |
| NEG (invalid entity) | HIGH | Business process blocked by invalid master data |
| ERR (missing mandatory field) | HIGH | Data integrity failure |
| EDGE (boundary value) | MEDIUM | Important but not core path |
| INT (cross-module) | HIGH | Integration failures can cascade |

---

### Step 5 — Define Automation Viability

For each scenario type, assess automation suitability:

| Scenario Type | Automation Candidate | Rationale |
|--------------|---------------------|-----------|
| HP | YES | Stable, repeatable, regression-critical |
| AP | YES or PARTIAL | If data-driven (PARTIAL if SAP config varies) |
| NEG | YES | Validation checks are stable and repeatable |
| ERR | YES | Field-level validation is stable |
| EDGE | PARTIAL | Boundary values may require system config changes |
| INT | PARTIAL | Multi-session flows require careful orchestration |

**Override rules:**
- Mark PARTIAL if the scenario requires manual data setup in SAP (e.g., creating test master data)
- Mark NO if the scenario requires human judgment to verify the outcome
- Mark YES for all scenarios where expected results are machine-verifiable (message text, document number presence)

---

### Step 6 — Define Test Execution Order

Specify the order in which test cases should be executed (risk-descending, dependencies-respected):

```
Execution Order:
  1. CRITICAL risk scenarios first (HP core transaction)
  2. HIGH risk validation scenarios (NEG entity validations)
  3. HIGH risk error scenarios (ERR mandatory fields)
  4. MEDIUM risk scenarios (AP variants, EDGE boundaries)
  5. LOW risk scenarios (additional EDGE, navigation-only)
  6. Integration scenarios last (depend on prior steps being stable)
```

---

### Step 7 — Write the Strategy Document

Path: `jira/userstories/{KEY}/strategy/{KEY}-strategy.md`

```markdown
# Test Strategy: [{KEY}] {story summary}

**Created:**          {YYYY-MM-DD}
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/{KEY}/strategy/{KEY}-analysis.md
**Risk Profile:**     jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json
**Overall Risk:**     {CRITICAL | HIGH | MEDIUM | LOW}

---

## Business Context

- **Actor:** {actor}
- **Business Object:** {SAP document / entity}
- **SAP Module:** {MODULE} — {module full name}
- **Business Goal:** {goal}

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | {min} | {target} | CRITICAL |
| Alternative Path (AP) | {MANDATORY / RECOMMENDED / OPTIONAL / NOT APPLICABLE} | {min} | {target} | {priority} |
| Negative (NEG) | {status} | {min} | {target} | HIGH |
| Error / Missing Field (ERR) | {status} | {min} | {target} | HIGH |
| Edge Case / Boundary (EDGE) | {status} | {min} | {target} | MEDIUM |
| Integration (INT) | {status} | {min} | {target} | {priority} |
| **TOTAL** | — | **{total min}** | **{total target}** | — |

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

{List each scenario from the risk profile that is MANDATORY, with ID, description, risk level, and ACs covered}

### Recommended Scenarios

{List each RECOMMENDED scenario}

### Optional Scenarios

{List each OPTIONAL scenario, or "None"}

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All {n} HP scenarios generated | YES |
| NEG Coverage | All {n} NEG scenarios generated | YES |
| ERR Coverage | All {n} ERR scenarios generated | YES |
| EDGE Coverage | ≥ 2 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ {n} TCs flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least {percentage}% of recommended gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | {rationale} |
| NEG (invalid entity) | HIGH | MAJOR | {rationale} |
| ERR (missing field) | HIGH | MAJOR | {rationale} |
| EDGE (boundary) | MEDIUM | MINOR | {rationale} |
| AP (alternative) | HIGH | MAJOR | {rationale} |
| INT (integration) | HIGH | MAJOR | {rationale} |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright |
| AP | YES | Data-driven via testdata JSON |
| NEG | YES | Stable validation checks |
| ERR | YES | Field-level validation stable |
| EDGE | PARTIAL | May require specific SAP config |
| INT | PARTIAL | Multi-session orchestration needed |

**Target automation coverage:** {n} of {total} TCs ({percentage}%)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  {List HP test case IDs once generated}

Priority 2 — HIGH (validate immediately after):
  {List NEG and ERR test case IDs}

Priority 3 — MEDIUM (complete coverage):
  {List AP and EDGE test case IDs}

Priority 4 — Integration (run after core stability confirmed):
  {List INT test case IDs, or "None"}
```

---

## Regulatory and Compliance Notes

{For SAP MM processes:}
- Purchase Orders are legally binding procurement documents — test cases must verify that mandatory approval fields are enforced
- Ensure test data does not use real production vendor or material IDs
- All test execution must use dedicated test system instances (not production)

{If story involves financial data (FI module):}
- Financial postings must be reversible in the test system (use test period configuration)
- Ensure SOD (Segregation of Duties) authorization requirements are pre-conditioned correctly

{If no specific compliance constraints apply:}
- Standard SAP S/4HANA Cloud test governance applies

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `{KEY}-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first
3. Generate RECOMMENDED types unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/{KEY}/` and `testdata/{KEY}/`
```

---

### Step 8 — Report Completion

Print:
```
Test Strategy Architect | define-test-strategy complete
  Story:               {KEY} — {summary}
  Overall Risk:        {CRITICAL | HIGH | MEDIUM | LOW}
  Coverage Model:      HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n} INT:{n}
  Total TCs planned:   {total min} (min) — {total target} (target)
  Quality gates set:   {n}
  File written:        jira/userstories/{KEY}/strategy/{KEY}-strategy.md
  Next step:           Run /generate-testcases {KEY}
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Analysis file not found | Abort: `ERROR: {KEY}-analysis.md not found. Run /analyze-userstory {KEY} first.` |
| Risk profile not found | Abort: `ERROR: {KEY}-risk-profile.json not found. Run /analyze-userstory {KEY} first.` |
| No ACs in risk profile | Log warning: `WARNING: No ACs in risk profile for {KEY}. Strategy will be based on description analysis only.` |
| All ACs are LOW risk | Still apply MANDATORY coverage for HP; log: `NOTE: All ACs are LOW risk. HP and basic NEG coverage applied.` |
| Story has no numeric parameters | Set EDGE count to 0 and mark EDGE as NOT APPLICABLE with explanation |
