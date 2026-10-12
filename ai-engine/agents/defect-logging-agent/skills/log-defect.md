# Skill: log-defect

## Purpose

Create a Jira Bug issue for a confirmed SAP application defect, with full reproduction steps, evidence from re-execution, and a bi-directional link to the parent user story. Add a comment to the parent story noting the defect. Record the defect locally for traceability.

Output: Jira Bug issue (e.g., CS-25) + `defects/{KEY}/{TC-ID}-{timestamp}-defect.json`.

---

## Pre-conditions

- A classification report must exist with `classification: "APP_DEFECT"`: `defects/{KEY}/{TC-ID}-{timestamp}-classification.json`
- The test case file must exist: `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`
- The story JSON must exist: `jira/userstories/{KEY}/{KEY}.json`
- A re-execution report must exist: `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json`
- `mcp__atlassian__*` tools must be available

---

## Execution Steps

### Step 1 — Verify Classification

Load the most recent classification report for this TC:
- List `defects/{KEY}/` for files matching `{TC-ID}-*-classification.json`
- Sort by timestamp (newest first)
- Read the most recent report

Check `classification` field:
- If `"AUTOMATION_BUG"` → abort: "Not an app defect. Run /patch-scripts {TC-ID} instead of logging a defect."
- If `"NEEDS_REVIEW"` → abort: "Classification requires human review. Check defects/{KEY}/{TC-ID}-{timestamp}-classification.json and decide manually."
- If `"APP_DEFECT"` → proceed

---

### Step 2 — Load All Inputs

Load simultaneously:

1. Classification report → `evidence.acViolated`, `evidence.acText`, `evidence.sapActualBehavior`, `defectMetadata`
2. `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` → priority, severity, preconditions, test steps table, expected result
3. `jira/userstories/{KEY}/{KEY}.json` → `summary`, `url`, `assignee.accountId`, `issueKey`, `description`
4. `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json` → `sapBehaviorNotes`, `sapFinalState`, `snapshots`
5. `.env` → `SAP_FIORI_URL`, `JIRA_PROJECT_KEY`

---

### Step 3 — Confirm Parent Story Exists in Jira

Call `mcp__atlassian__getJiraIssue` with `{KEY}` (e.g., `CS-2`) to confirm the story is accessible and get its internal `id`.

If the story is not found → proceed without parent link; note in defect record: "Parent story {KEY} not accessible via MCP — link not created"

---

### Step 4 — Compose Defect Summary

Format: `[{MODULE}] {TC-ID}: {TC short description} — {AC reference} violated`

Examples:
- `[MM] TC-CS-003: Invalid Supplier validation missing — AC-7 violated`
- `[MM] TC-CS-008: Missing price not prevented — AC-6 violated`
- `[MM] TC-CS-019: Zero quantity not prevented on PO modification — AC-3 violated`

TC short description: take the TC title from the .md file (strip type tag and sequence number).

---

### Step 5 — Compose Defect Description

Write a full description in Atlassian Markdown:

```
## Defect Summary

Automated test *{TC-ID}* failed because the SAP application behavior violates Acceptance Criterion *{AC-N}* from user story *[{KEY}|{storyUrl}]*.

---

## Acceptance Criterion Violated

*{AC-N}:* {exact AC text from story}

---

## Steps to Reproduce

1. Navigate to: {SAP_FIORI_URL}
2. Login with user credentials (email → Continue → password → Continue)
3. Dismiss Guided Tour if shown
4. Open shell search → type "{appName}" → press Enter → click the result
{copy each test step from TC .md file, replacing {TD.*} with resolved values from test data}
{Last step: Click "Order" / "Save" / submit button}

---

## Expected Result

{TC Expected Final Result section from the .md file}

---

## Actual Result

{reexecution.sapBehaviorNotes}

{If specific message/field mismatch, include:}
- Expected message : {expectedMessage}
- Actual message   : {actualMessage or "No message shown"}

---

## Test Evidence

| Item | Location |
|------|----------|
| Test Case | {TC-ID} — {TC description} |
| User Story | {KEY}: {storySummary} |
| Exploration Data | exploration-data/execution/{KEY}/{TC-ID}/ |
| Re-execution Log | self-healing/re-executions/{timestamp}-{TC-ID}/ |
| Classification | defects/{KEY}/{TC-ID}-{timestamp}-classification.json |

---

## Environment

| Property | Value |
|----------|-------|
| SAP Tenant | my429998.s4hana.cloud.sap |
| Module | {MODULE} — {moduleName} |
| Application | {appName} |
| Detected By | Self-Healing Agent (automation-detected) |
| Detection Date | {YYYY-MM-DD} |
```

---

### Step 6 — Determine Priority and Labels

From classification report `defectMetadata`:
- `jiraPriority` (already mapped)
- `labels` (already composed: `["defect", "automation-detected", "{module-lower}", "{KEY}"]`)

---

### Step 7 — Create Jira Bug

Call `mcp__atlassian__createJiraIssue` with:

```json
{
  "projectKey": "{JIRA_PROJECT_KEY}",
  "issueType": "Bug",
  "summary": "[{MODULE}] {TC-ID}: {description} — {AC-N} violated",
  "description": "{full description from Step 5}",
  "priority": "{jiraPriority}",
  "labels": ["defect", "automation-detected", "{module-lower}", "{KEY}"]
}
```

Capture the returned issue key (e.g., `CS-25`) and URL.

If creation fails → write local record with `status: "FAILED"`, include error message; print error for manual follow-up. Do not retry automatically.

---

### Step 8 — Determine Available Link Type

Call `mcp__atlassian__getIssueLinkTypes` to get available link type names.

Preferred link type: `"Causes"` (Bug causes the Story to fail). If not available, use `"Relates"`.

---

### Step 9 — Link Bug to Parent Story

Call `mcp__atlassian__createIssueLink`:
- Link: Bug `{NEW-BUG-KEY}` "relates to" (or "is caused by") Story `{STORY-KEY}`
- Direction: `inwardIssueKey = {NEW-BUG-KEY}`, `outwardIssueKey = {STORY-KEY}`

If linking fails → note in defect record: "Link creation failed — {error}. Manual linking required."

---

### Step 10 — Add Comment to Parent Story

Call `mcp__atlassian__addCommentToJiraIssue` on the parent story:

```
Defect *[{NEW-BUG-KEY}|{BUG-URL}]* detected by automation.

*Test Case:* {TC-ID} — {TC description}
*AC Violated:* {AC-N}: {AC text (first 100 chars)}...
*Status:* Open — logged automatically by Defect Logging Agent
```

If comment fails → note in defect record. Do not fail the whole skill over a comment failure.

---

### Step 11 — Write Local Defect Record

File: `defects/{KEY}/{TC-ID}-{YYYYMMDD-HHmmss}-defect.json`

```json
{
  "bugKey": "CS-25",
  "bugUrl": "https://jira-naqet.atlassian.net/browse/CS-25",
  "tcId": "TC-CS-003",
  "storyKey": "CS-2",
  "storyUrl": "https://jira-naqet.atlassian.net/browse/CS-2",
  "loggedAt": "2026-05-18T12:00:00.000Z",
  "loggedBy": "defect-logging-agent/skills/log-defect",
  "summary": "[MM] TC-CS-003: Invalid Supplier validation missing — AC-7 violated",
  "priority": "High",
  "labels": ["defect", "automation-detected", "mm", "CS-2"],
  "acViolated": "AC-7",
  "acText": "The system displays a descriptive error message if the supplier or material entered does not exist in the system.",
  "sapActualBehavior": "Supplier field accepted non-existent ID without error",
  "classificationFile": "defects/CS-2/TC-CS-003-20260518-110000-classification.json",
  "reExecutionFile": "self-healing/re-executions/20260518-105500-TC-CS-003/TC-CS-003-reexecution.json",
  "jiraLinkCreated": true,
  "jiraCommentAdded": true,
  "status": "LOGGED"
}
```

---

### Step 12 — Print Confirmation

```
Defect Logged Successfully
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Bug Key      : CS-25
  Summary      : [MM] TC-CS-003: Invalid Supplier validation missing — AC-7 violated
  Priority     : High
  Linked To    : CS-2 (Create a New Standard Purchase Order)
  Comment      : Added to CS-2 ✓
  Jira URL     : https://jira-naqet.atlassian.net/browse/CS-25

Local record : defects/CS-2/TC-CS-003-20260518-120000-defect.json
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Classification is AUTOMATION_BUG | Abort: "Not an app defect. Run /patch-scripts {TC-ID} to fix the automation script." |
| Classification is NEEDS_REVIEW | Abort: "Manual review required. Check defects/{KEY}/{TC-ID}-classification.json." |
| Classification report not found | Abort: "No classification report found for {TC-ID}. Run /classify-failure {TC-ID} first." |
| Story JSON not found | Abort: "jira/userstories/{KEY}/{KEY}.json not found. Run /jira-fetch-userstories first." |
| Jira Bug creation fails (API error) | Write local record with status=FAILED; include raw error; print: "Jira issue creation failed — {error}. Create manually at {JIRA_BASE_URL}/projects/{projectKey}" |
| Link creation fails | Note in defect record; do not abort — Bug was created successfully |
| Comment fails | Note in defect record; do not abort |
| mcp__atlassian__ not available | Abort: "Atlassian MCP not connected. Verify mcp__atlassian__atlassianUserInfo works before running this skill." |
| Duplicate defect (same TC already logged) | Check `defects/{KEY}/` for existing `{TC-ID}-*-defect.json` with status=LOGGED. If found, print warning and skip duplicate creation. |
