# Defect Logging Agent

## Purpose

The Defect Logging Agent activates when the Self-Healing Agent determines that a test failure is caused by the SAP application itself — not by the automation scripts. It classifies the failure against the story's Acceptance Criteria, then creates a Jira Bug issue with full reproduction steps, evidence links, and a bi-directional link to the parent user story.

```
Self-Healing Agent (app defect detected)  →  Defect Logging Agent  →  Jira Bug created + linked to Story
```

---

## Responsibilities

- **Classify failures** — determine whether SAP behavior violates an Acceptance Criterion (`APP_DEFECT`), whether the test expected the wrong thing (`AUTOMATION_BUG`), or whether manual review is needed (`NEEDS_REVIEW`)
- **Map defect to story** — identify which AC was violated; link Bug to the parent Story in Jira
- **Compose full defect** — write structured reproduction steps, expected vs actual results, environment details, and evidence references
- **Log to Jira** — create a Bug issue using `mcp__atlassian__createJiraIssue`
- **Link to parent story** — use `mcp__atlassian__createIssueLink` to connect Bug → Story
- **Notify on story** — add a comment to the parent story via `mcp__atlassian__addCommentToJiraIssue`
- **Record locally** — write defect record JSON for traceability

---

## Skills

| Skill | Slash Command | Skill File | Output |
|-------|---------------|------------|--------|
| Classify Failure | `/classify-failure {TC-ID}` | `skills/classify-failure.md` | `defects/{KEY}/{TC-ID}-{timestamp}-classification.json` |
| Log Defect | `/log-defect {TC-ID}` | `.claude/commands/log-defect.md` | Jira Bug issue + `defects/{KEY}/{TC-ID}-{timestamp}-defect.json` |

The `/log-defect` command runs `classify-failure` first, then `log-defect` only if classification is `APP_DEFECT`.

---

## Classification Logic

```
re-execution PASS  → AUTOMATION_BUG  → do NOT log; recommend /heal-failure
re-execution FAIL  → compare SAP behavior vs Acceptance Criteria
  AC violated      → APP_DEFECT      → log Jira Bug
  AC met           → AUTOMATION_BUG  → do NOT log; recommend /heal-failure
  ambiguous        → NEEDS_REVIEW    → halt; require human decision
```

---

## Inputs

| Input | Source | Required |
|-------|--------|---------|
| Re-execution report | `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json` | Mandatory |
| Test case file | `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` | Mandatory |
| Story JSON | `jira/userstories/{KEY}/{KEY}.json` | Mandatory |
| Failure report | `self-healing/failures/{timestamp}-{TC-ID}-failure.json` | Recommended |
| Atlassian MCP | `mcp__atlassian__*` tools | Required for log-defect |

---

## Outputs

| Path | Description |
|------|-------------|
| `defects/{KEY}/{TC-ID}-{timestamp}-classification.json` | Classification: APP_DEFECT / AUTOMATION_BUG / NEEDS_REVIEW with evidence |
| `defects/{KEY}/{TC-ID}-{timestamp}-defect.json` | Local defect record: Bug key, Jira URL, AC violated, story link |
| Jira Bug issue | Created via `mcp__atlassian__createJiraIssue` |
| Jira issue link | Bug → Story via `mcp__atlassian__createIssueLink` |
| Story comment | Comment on parent story via `mcp__atlassian__addCommentToJiraIssue` |

---

## Configuration

Config file: `agents/defect-logging-agent/config/defect.config.js`

| Variable | Description | Example |
|----------|-------------|---------|
| `JIRA_PROJECT_KEY` | Project key for new Bug issues | `CS` |
| `JIRA_BASE_URL` | Jira instance base URL | `https://jira-naqet.atlassian.net` |

---

## MCP Dependency

This agent uses the **Atlassian MCP server** configured in `.mcp.json`. The following tools are used:

- `mcp__atlassian__getJiraIssue` — Verify parent story exists; get story ID
- `mcp__atlassian__createJiraIssue` — Create Bug issue
- `mcp__atlassian__createIssueLink` — Link Bug to Story
- `mcp__atlassian__addCommentToJiraIssue` — Add comment to parent story
- `mcp__atlassian__getIssueLinkTypes` — Discover available link type names

The Atlassian MCP must be connected before invoking `log-defect`. Verify with: `mcp__atlassian__atlassianUserInfo`.

---

## Defect Field Mapping

| TC Field | Jira Bug Field |
|----------|---------------|
| TC priority (CRITICAL) | Priority: Critical |
| TC priority (HIGH) | Priority: High |
| TC priority (MEDIUM) | Priority: Medium |
| TC severity (CRITICAL) | Label: `critical` |
| TC severity (MAJOR) | Label: `major` |
| TC module (MM) | Label: `mm` |
| Story KEY | Label: `{KEY}` |
| AC violated | Description: "Acceptance Criterion Violated" section |
| TC test steps | Description: "Steps to Reproduce" section |
| TC expected result | Description: "Expected Result" section |
| Re-execution actual result | Description: "Actual Result" section |

---

## How to Invoke

```
/log-defect TC-CS-003            # Classify + log (full cycle)
/classify-failure TC-CS-003      # Classify only (no Jira write)
```

### After running, check Jira

The defect is created in the same Jira project as the parent story (e.g., `CS-25` for project `CS`). A comment is added to the parent story (e.g., `CS-2`) noting the defect key and failing AC.

---

## Integration with Other Agents

- **Self-Healing Agent** escalates here when `re-execute-scriptless` finds `sapBehavior=DIFFERENT`
- Reads `self-healing/re-executions/` as evidence for the defect description
- Reads `jira/userstories/{KEY}/{KEY}.json` (produced by Jira Agent) for story metadata and AC text
- Reads `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` (produced by TestCase Agent) for test steps and priority
