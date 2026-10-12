# /testcase-pipeline

Run the complete test case pipeline for a Jira User Story in a single command.
Executes all three phases in strict sequence — none is skipped, none is approximated.

## Usage

```
/testcase-pipeline {KEY}
```

Where `{KEY}` is the Jira issue key (e.g., `CS-2`).

## What This Command Does

Runs these three phases back-to-back for the same story key, each phase fully completing before the next begins:

```
Phase 1: /analyze-userstory {KEY}       → Deep story analysis + risk profile
Phase 2: /define-test-strategy {KEY}    → Coverage model + quality gates
Phase 3: /generate-testcases {KEY}      → Full test case suite + test data
```

**No phase is skipped. No phase falls back to inline approximation.**
Phase 2 and Phase 3 always read the full artefacts produced by the preceding phase.

---

## Instructions

### Phase 1 — Story Analysis (Test Strategy Architect)

1. Read the agent definition at `ai-engine/agents/test-strategy-agent/agent.md`
2. Read the skill definition at `ai-engine/agents/test-strategy-agent/skills/analyze-userstory.md`
3. Read `.env` to get `JIRA_PROJECT_KEY` and `JIRA_BASE_URL`
4. Read `test-registry/jira/userstories/$ARGUMENTS/$ARGUMENTS.json` as the primary story input
5. Execute **all steps** in the analyze-userstory skill exactly as specified
6. Confirm both output files exist before proceeding to Phase 2:
   - `test-registry/jira/userstories/{KEY}/strategy/{KEY}-analysis.md`
   - `test-registry/jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json`
7. If either file was not written, stop and report: `ERROR: Phase 1 failed for {KEY}. Phase 2 will not run.`

---

### Phase 2 — Test Strategy Definition (Test Strategy Architect)

8. Read the skill definition at `ai-engine/agents/test-strategy-agent/skills/define-test-strategy.md`
9. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-analysis.md`
10. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-risk-profile.json`
11. Execute **all steps** in the define-test-strategy skill exactly as specified
12. Confirm the output file exists before proceeding to Phase 3:
    - `test-registry/jira/userstories/{KEY}/strategy/{KEY}-strategy.md`
13. If the file was not written, stop and report: `ERROR: Phase 2 failed for {KEY}. Phase 3 will not run.`

---

### Phase 3 — Test Case Generation (TestCase Agent)

14. Read the agent definition at `ai-engine/agents/testcase-agent/agent.md`
15. Read the skill definition at `ai-engine/agents/testcase-agent/skills/generate-testcases.md`
16. Read the generation prompt at `ai-engine/prompts/testcase-generation-from-userstory.md`
17. Read `.env` to get `JIRA_PROJECT_KEY`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
18. Read `test-registry/jira/userstories/$ARGUMENTS/$ARGUMENTS.json` (story data)
19. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-strategy.md` (from Phase 2)
20. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-risk-profile.json` (from Phase 1)
21. Execute **all steps** in the generate-testcases skill exactly as specified
22. As the final step, execute **all steps** in `ai-engine/agents/testcase-agent/skills/extract-testdata.md`
23. Report the full completion summary when done

---

## Expected Output

### Phase 1 artefacts — `test-registry/jira/userstories/{KEY}/strategy/`
- `{KEY}-analysis.md` — Story decomposition, AC classification, risk assessment, scenario inventory
- `{KEY}-risk-profile.json` — Machine-readable risk scores and scenario inventory

### Phase 2 artefacts — `test-registry/jira/userstories/{KEY}/strategy/`
- `{KEY}-strategy.md` — Coverage model, quality gates, automation viability, execution order

### Phase 3 artefacts — `test-registry/testcases/AI-generated testcases/{KEY}/`
- `{KEY}-testcases.md` — All test cases: HP → AP → NEG → ERR → EDGE → INT (IEEE 829 / ISTQB)
- `{KEY}-coverage-matrix.md` — AC-to-TC traceability and coverage completeness
- `{KEY}-summary.json` — Machine-readable registry for the Automation Agent

### Test data — `test-registry/testdata/{KEY}/`
- `{KEY}-testdata.json` — Parameterized test datasets with `{{PLACEHOLDER}}` values
- `{KEY}-testdata-guide.md` — Guide explaining what real SAP values to substitute per placeholder

---

## Completion Report

After all three phases complete, print this summary:

```
TestCase Pipeline | Complete
  Story:          {KEY} — {story summary}
  Module:         {MODULE}

  Phase 1 — Story Analysis:
    ACs analysed:     {n}
    Overall Risk:     {CRITICAL | HIGH | MEDIUM | LOW}
    Scenarios mapped: HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n} INT:{n}
    Files:            {KEY}-analysis.md + {KEY}-risk-profile.json

  Phase 2 — Test Strategy:
    Coverage model:   HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n} INT:{n}
    TCs planned:      {min} (min) — {target} (target)
    Quality gates:    {n} defined
    File:             {KEY}-strategy.md

  Phase 3 — Test Cases:
    Total TCs:        {n}
    Coverage:         HP:{n} | AP:{n} | NEG:{n} | ERR:{n} | EDGE:{n} | INT:{n}
    Automation YES:   {n}
    Quality gates:    ALL PASSED
    Files:            {KEY}-testcases.md + {KEY}-coverage-matrix.md + {KEY}-summary.json
                      testdata/{KEY}-testdata.json + {KEY}-testdata-guide.md

  All output written to:
    test-registry/jira/userstories/{KEY}/strategy/
    test-registry/testcases/AI-generated testcases/{KEY}/
    test-registry/testdata/{KEY}/
```

## Pre-condition

`test-registry/jira/userstories/{KEY}/{KEY}.json` must exist. If it does not, run `/jira-fetch-userstories` first.
