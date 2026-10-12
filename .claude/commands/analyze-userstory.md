# /analyze-userstory

Deeply analyse a Jira User Story and produce a structured story analysis document and machine-readable risk profile.

## Usage

```
/analyze-userstory {KEY}
```

Where `{KEY}` is the Jira issue key (e.g., `CS-2`).

## Instructions

1. Read the agent definition at `ai-engine/agents/test-strategy-agent/agent.md` for context
2. Read the skill definition at `ai-engine/agents/test-strategy-agent/skills/analyze-userstory.md`
3. Read `.env` to get `JIRA_PROJECT_KEY` and `JIRA_BASE_URL`
4. Read `test-registry/jira/userstories/$ARGUMENTS/$ARGUMENTS.json` as the primary input
5. Execute all steps defined in the skill file exactly as specified
6. Report completion summary when done

## Expected Output

- `test-registry/jira/userstories/{KEY}/strategy/{KEY}-analysis.md` — Story decomposition, AC classification, data parameter inventory, risk assessment, and scenario inventory
- `test-registry/jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json` — Machine-readable risk profile consumed by define-test-strategy and the TestCase Agent

## Next Step

Run `/define-test-strategy {KEY}` to produce the formal test strategy document.
