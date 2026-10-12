# /generate-testcases

Generate a complete, industrial-standard test case suite for a Jira User Story. Covers all scenario types: Happy Path, Alternative Path, Negative, Error/Missing Field, Edge/Boundary, and Integration (when applicable).

## Usage

```
/generate-testcases {KEY}
```

Where `{KEY}` is the Jira issue key (e.g., `CS-2`).

## Instructions

1. Read the agent definition at `ai-engine/agents/testcase-agent/agent.md` for context
2. Read the skill definition at `ai-engine/agents/testcase-agent/skills/generate-testcases.md`
3. Read the generation prompt at `ai-engine/prompts/testcase-generation-from-userstory.md`
4. Read `.env` to get `JIRA_PROJECT_KEY`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
5. Read `test-registry/jira/userstories/$ARGUMENTS/$ARGUMENTS.json` as the primary story input
6. Read strategy files if present:
   - `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-strategy.md`
   - `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-risk-profile.json`
7. Execute all steps defined in the generate-testcases skill file exactly as specified
8. Invoke `ai-engine/agents/testcase-agent/skills/extract-testdata.md` as the final step
9. Report completion summary when done

## Recommended Pre-condition

For best results, run the Test Strategy Architect first:
```
/analyze-userstory {KEY}
/define-test-strategy {KEY}
/generate-testcases {KEY}
```

If strategy files are absent, the TestCase Agent will perform inline Pre-Generation Analysis using the generation prompt template.

## Expected Output

### Test Cases — `test-registry/testcases/AI-generated testcases/{KEY}/`
- `{KEY}-testcases.md` — All test cases in IEEE 829 / ISTQB format (HP → AP → NEG → ERR → EDGE → INT)
- `{KEY}-coverage-matrix.md` — AC-to-TC traceability matrix and coverage completeness table
- `{KEY}-summary.json` — Machine-readable test case registry for the Automation Agent

### Test Data — `test-registry/testdata/{KEY}/`
- `{KEY}-testdata.json` — Parameterized test datasets with `{{PLACEHOLDER}}` values
- `{KEY}-testdata-guide.md` — Guide explaining what real SAP values to substitute per placeholder

## Coverage Guarantee

All generated test cases:
- Map to at least one Acceptance Criterion
- Contain no hardcoded SAP values (all data uses `{TD.*}` placeholders)
- Follow the TC-{PROJECT}-{MODULE}-{TYPE}-{NNN} identifier convention
- Include pre-conditions, parameterized test steps, and verifiable expected results
