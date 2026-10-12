# /log-defect

Log a SAP application defect to Jira. First classifies whether the failure is an app bug (SAP violates an Acceptance Criterion) or a script bug (test expected the wrong thing). Only creates a Jira issue if it is a confirmed app defect.

## Usage

```
/log-defect {TC-ID}
```

Example: `/log-defect TC-CS-003`

## Instructions

1. Read `ai-engine/agents/defect-logging-agent/agent.md` for agent context
2. Read `.env` → get `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`

**Step 1 — Classify the Failure**
Execute all steps in `ai-engine/agents/defect-logging-agent/skills/classify-failure.md`:
- Load re-execution report from `test-registry/self-healing/re-executions/` for `$ARGUMENTS`
  - If not found: ask the user to run `/self-heal $ARGUMENTS` first
- Load test case: `test-registry/testcases/AI-generated testcases/{KEY}/testcases/$ARGUMENTS.md`
- Load story: `test-registry/jira/userstories/{KEY}/{KEY}.json`
- Compare SAP actual behavior (from re-execution) against story Acceptance Criteria:
  - SAP behavior **violates** an AC → `APP_DEFECT` → proceed to Step 2
  - SAP behavior **meets** the AC but test expected wrong thing → `AUTOMATION_BUG` → stop, recommend `/self-heal`
  - Cannot determine → `NEEDS_REVIEW` → stop, ask for human review
- Write: `test-registry/defects/{KEY}/$ARGUMENTS-{timestamp}-classification.json`

**Step 2 — Log Jira Defect** (only if APP_DEFECT)
Execute all steps in `ai-engine/agents/defect-logging-agent/skills/log-defect.md`:
- Compose defect:
  - **Summary**: `[{MODULE}] {TC-ID}: {description} — {AC-N} violated`
  - **Description**: AC violated + steps to reproduce (from TC file with resolved values) + expected vs actual result + evidence references + SAP environment
  - **Priority**: mapped from TC priority (CRITICAL→Critical, HIGH→High, MEDIUM→Medium)
  - **Labels**: `["defect", "automation-detected", "{module}", "{storyKey}"]`
- Call `mcp__atlassian__createJiraIssue` → capture new bug key (e.g., `CS-25`)
- Call `mcp__atlassian__createIssueLink` → link Bug to parent Story (`Relates` or `Causes`)
- Call `mcp__atlassian__addCommentToJiraIssue` → add comment to parent story
- Write: `test-registry/defects/{KEY}/$ARGUMENTS-{timestamp}-defect.json`

3. Print outcome

## Pre-conditions

- `/self-heal {TC-ID}` must have been run first (re-execution report is required for classification)
- `mcp__atlassian__*` tools must be connected
- Story JSON must exist: `test-registry/jira/userstories/{KEY}/{KEY}.json`

## Output

**If APP_DEFECT:**
```
test-registry/defects/{KEY}/{TC-ID}-{timestamp}-classification.json
test-registry/defects/{KEY}/{TC-ID}-{timestamp}-defect.json
Jira Bug: {PROJECT}-{NNN} — linked to parent story — comment added
```

**If AUTOMATION_BUG:**
```
test-registry/defects/{KEY}/{TC-ID}-{timestamp}-classification.json
→ This is a script bug. Run /self-heal {TC-ID} to fix the automation script.
```

**If NEEDS_REVIEW:**
```
test-registry/defects/{KEY}/{TC-ID}-{timestamp}-classification.json
→ Cannot auto-classify. Review the classification file and decide manually.
```
