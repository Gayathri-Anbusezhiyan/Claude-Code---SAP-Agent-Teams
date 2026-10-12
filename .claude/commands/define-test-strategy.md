# /define-test-strategy

Define a formal, risk-calibrated test strategy for a Jira User Story. Requires `/analyze-userstory` to have been run first.

## Usage

```
/define-test-strategy {KEY}
```

Where `{KEY}` is the Jira issue key (e.g., `CS-2`).

## Instructions

1. Read the agent definition at `ai-engine/agents/test-strategy-agent/agent.md` for context
2. Read the skill definition at `ai-engine/agents/test-strategy-agent/skills/define-test-strategy.md`
3. Read `.env` to get `JIRA_PROJECT_KEY`
4. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-analysis.md`
5. Read `test-registry/jira/userstories/$ARGUMENTS/strategy/$ARGUMENTS-risk-profile.json`
6. Execute all steps defined in the skill file exactly as specified
7. Report completion summary when done

## Pre-condition

`/analyze-userstory {KEY}` must have been run first. If the analysis files are missing, run `/analyze-userstory {KEY}` before this command.

## Expected Output

- `test-registry/jira/userstories/{KEY}/strategy/{KEY}-strategy.md` — Test strategy covering: coverage model (HP/AP/NEG/ERR/EDGE/INT counts), quality gates, test priority assignments, automation viability, execution order, and instructions for the TestCase Agent

## Next Step

Run `/generate-testcases {KEY}` to generate full test cases from the story and strategy.
