# Skill: fetch-userstories

## Purpose

Fetch all User Stories from the configured Jira project and write each into its own subfolder under `jira/userstories/{issueKey}/` containing a `.md` (human-readable) and `.json` (machine-readable) file.

The output must contain **all fields required by the TestCase Agent** to generate complete, accurate SAP test cases — including acceptance criteria, linked issues, fix versions, sub-tasks, and attachments.

---

## Execution Steps

### Step 1 — Read configuration

Read the `.env` file in the project root and extract:
- `JIRA_PROJECT_KEY` (e.g. `JNJSAP`) — **required**, abort if missing
- `JIRA_BASE_URL` (default: `https://jira-naqet.atlassian.net`)
- `JIRA_MAX_RESULTS` (default: `100`)

---

### Step 2 — Fetch Stories with pagination

Call `mcp__atlassian__searchJiraIssuesUsingJql` with:
- `jql`: `project = {JIRA_PROJECT_KEY} AND issuetype = Story ORDER BY created DESC`
- `fields`: `summary,status,priority,assignee,reporter,description,comment,created,updated,issuetype,labels,components,fixVersions,resolution,issuelinks,subtasks,attachment,customfield_10016,customfield_10020,customfield_10014,customfield_10035`
- `maxResults`: value from `JIRA_MAX_RESULTS`
- `startAt`: `0` (first page)

The response includes a `total` field. Paginate by repeating with `startAt += maxResults` until accumulated count equals `total` or the page returns 0 issues.

Track: `paginationState = { startAt: 0, fetched: 0, total: null }`

> **Custom field notes:**
> - `customfield_10016` = Story Points
> - `customfield_10020` = Sprint
> - `customfield_10014` = Epic Link
> - `customfield_10035` = Acceptance Criteria (confirmed field ID for this Jira instance)
>
> **If `customfield_10035` returns null for all issues:** inspect the first issue's raw field map and look for a field whose key contains "acceptance" (case-insensitive) or whose value contains "Given/When/Then" or "AC:" patterns. Use that field ID instead and note it in the run summary.
>
> **If acceptance criteria is embedded in the description:** it may appear under a heading such as `h2. Acceptance Criteria`, `## Acceptance Criteria`, or inside an ADF panel titled "Acceptance Criteria". Extract that section separately and write it to `acceptanceCriteria` in the JSON (do not duplicate it in the `description` field).

---

### Step 3 — For each Story, write output files

For each issue returned across all pages:

**a) Write Markdown file** → `jira/userstories/{issueKey}/{issueKey}.md`

Create the subfolder `jira/userstories/{issueKey}/` if it does not exist.

Use this exact template:

```
# [{issueKey}] {summary}

**Issue Key:** {issueKey}
**Type:** Story
**Status:** {status.name}
**Resolution:** {resolution.name}           ← use "Unresolved" if null
**Priority:** {priority.name}
**Assignee:** {assignee.displayName}        ← use "Unassigned" if null
**Reporter:** {reporter.displayName}
**Story Points:** {customfield_10016}       ← use "Not estimated" if null
**Sprint:** {sprint.name}                   ← use "Not assigned" if null; sprint = customfield_10020[0] if array
**Fix Version/s:** {fixVersions joined by ", "}  ← use "Unreleased" if empty
**Epic:** [{epicKey}] {epicSummary}         ← use "None" if no epic; epicKey from customfield_10014
**Labels:** {labels joined by ", "}        ← omit entire line if labels array is empty
**Components:** {components joined by ", "} ← omit entire line if components array is empty
**Created:** {created as YYYY-MM-DD}
**Updated:** {updated as YYYY-MM-DD}

## Description

{description rendered as plain text, or "(No description provided)" if null.
If description contains an "Acceptance Criteria" section, render it here too but also extract it into the dedicated section below.}

## Acceptance Criteria

{customfield_10035 rendered as plain text.
If customfield_10035 is null, extract the Acceptance Criteria section from the description if present.
If neither is available, write: "(No acceptance criteria defined)"}

## Linked Issues

{For each entry in issuelinks, render one line:}
- [{direction}: {linkType.name}] {linkedIssue.key} — {linkedIssue.fields.summary} ({linkedIssue.fields.status.name})

  direction = "inward" or "outward" from the link object
  linkType examples: "blocks", "is blocked by", "relates to", "duplicates", "is duplicate of"

{Omit the entire section if issuelinks is empty}

## Sub-Tasks

{For each entry in subtasks, render one line:}
- {subtask.key}: {subtask.fields.summary} [{subtask.fields.status.name}]

{Omit the entire section if subtasks is empty}

## Attachments

{For each entry in attachment (fields.attachment), render one line:}
- {attachment.filename} ({attachment.mimeType}, {attachment.size} bytes) — added by {attachment.author.displayName} on {attachment.created as YYYY-MM-DD}

{Omit the entire section if attachment array is empty}

## Comments

{For each of the latest 3 comments (most recent last), render:}
### Comment {n} — {author.displayName} ({created as YYYY-MM-DD})
{comment body as plain text}

{If there are more than 3 comments, add: "_(Showing 3 of {total} comments. View all at the link below.)_"}
{Omit the entire Comments section if the issue has no comments}

## Links

- **Jira:** {JIRA_BASE_URL}/browse/{issueKey}
{If epic is present: "- **Epic:** {JIRA_BASE_URL}/browse/{epicKey}"}
```

---

**b) Write JSON file** → `jira/userstories/{issueKey}/{issueKey}.json`

```json
{
  "issueKey": "{issueKey}",
  "type": "Story",
  "summary": "{summary}",
  "status": "{status.name}",
  "resolution": "{resolution.name or null}",
  "priority": "{priority.name}",
  "assignee": { "displayName": "{name}", "accountId": "{id}" },
  "reporter": { "displayName": "{name}", "accountId": "{id}" },
  "storyPoints": {customfield_10016 as number, or null},
  "sprint": { "id": {id}, "name": "{name}", "state": "{state}" },
  "fixVersions": ["{version1}", "{version2}"],
  "epic": { "key": "{epicKey}", "summary": "{epicSummary}" },
  "labels": ["{label1}", "{label2}"],
  "components": ["{comp1}"],
  "description": "{full description as plain text — exclude the Acceptance Criteria section if extracted separately}",
  "acceptanceCriteria": "{acceptance criteria as plain text, or null if not defined}",
  "linkedIssues": [
    {
      "direction": "inward|outward",
      "linkType": "{e.g. blocks, relates to, duplicates}",
      "key": "{linked issue key}",
      "summary": "{linked issue summary}",
      "status": "{linked issue status}",
      "issueType": "{linked issue type}"
    }
  ],
  "subtasks": [
    { "key": "{subtask key}", "summary": "{subtask summary}", "status": "{status}" }
  ],
  "attachments": [
    {
      "filename": "{filename}",
      "mimeType": "{mimeType}",
      "size": {bytes as number},
      "url": "{content URL}",
      "author": "{displayName}",
      "created": "{ISO8601}"
    }
  ],
  "comments": [
    { "author": "{displayName}", "created": "{ISO8601}", "body": "{text}" }
  ],
  "created": "{ISO8601}",
  "updated": "{ISO8601}",
  "url": "{JIRA_BASE_URL}/browse/{issueKey}",
  "fetchedAt": "{current ISO8601 timestamp}"
}
```

**Null-safety rules for JSON:**
- Use `null` (not empty string) for: `assignee`, `reporter`, `storyPoints`, `sprint`, `epic`, `resolution`, `acceptanceCriteria` when not present
- Use `[]` (empty array) for: `labels`, `components`, `comments`, `linkedIssues`, `subtasks`, `attachments`, `fixVersions` when empty
- `description` and `acceptanceCriteria` must always be strings — use `null` only when truly absent
- Do not omit any key — always include all keys with their null/empty value

---

### Step 4 — Update jira/index.json

After all story files are written, update (or create) `jira/index.json`:

```json
{
  "project": "{JIRA_PROJECT_KEY}",
  "jiraBaseUrl": "{JIRA_BASE_URL}",
  "lastFetched": "{current ISO8601 timestamp}",
  "fetchedBy": "jira-agent/skills/fetch-userstories",
  "totalStories": {count of stories written},
  "totalEpics": {preserve existing value if present, else 0},
  "issues": [
    {
      "key": "{issueKey}",
      "type": "Story",
      "summary": "{summary}",
      "status": "{status}",
      "resolution": "{resolution or null}",
      "priority": "{priority}",
      "sprint": "{sprint name or null}",
      "fixVersion": "{first fix version name or null}",
      "epic": "{epic key or null}",
      "storyPoints": {number or null},
      "hasAcceptanceCriteria": {true if acceptanceCriteria is non-null and non-empty, else false},
      "linkedIssueCount": {number of linked issues},
      "subtaskCount": {number of sub-tasks},
      "mdFile": "jira/userstories/{issueKey}/{issueKey}.md",
      "jsonFile": "jira/userstories/{issueKey}/{issueKey}.json",
      "fetchedAt": "{ISO8601}"
    }
  ]
}
```

When updating index.json: replace all existing Story-type entries with the newly fetched ones. Preserve any existing Epic-type entries from a prior fetch-epics run.

---

### Step 5 — Report completion

Print a summary:
```
Jira Agent | fetch-userstories complete
  Project:           {JIRA_PROJECT_KEY}
  Stories fetched:   {N}
  With AC:           {count with acceptanceCriteria defined}
  With Linked Issues:{count with linkedIssueCount > 0}
  Files written:     {N*2} (jira/userstories/{key}/{key}.md + {key}.json)
  Index:             jira/index.json updated
  AC field used:     customfield_{NNNN} (or "extracted from description")
```

---

## Error Handling

- If `JIRA_PROJECT_KEY` is empty: stop and print `ERROR: JIRA_PROJECT_KEY is not set in .env`
- If a single issue fails: log a warning for that issue key and continue — do not abort the entire run
- If `jira/userstories/{issueKey}/` subfolder does not exist: create it before writing files
- If description/AC contains ADF (Atlassian Document Format): render to plain text; do not include raw JSON/ADF in any output file
- If `customfield_10056` is null for ALL stories: log `WARNING: Acceptance criteria field not found at customfield_10056 — inspect raw fields of first story to identify correct field ID`
- If a linked issue's detail cannot be resolved: write the key and link type but set summary and status to `null`

---

## Field Reference

| .md Label | JSON Key | Jira Field | Notes |
|-----------|----------|------------|-------|
| Issue Key | issueKey | `key` | e.g. PROJ-123 |
| Status | status | `fields.status.name` | |
| Resolution | resolution | `fields.resolution.name` | null = Unresolved |
| Priority | priority | `fields.priority.name` | |
| Assignee | assignee | `fields.assignee` | null if unassigned |
| Reporter | reporter | `fields.reporter` | |
| Story Points | storyPoints | `fields.customfield_10016` | May vary by instance |
| Sprint | sprint | `fields.customfield_10020` | Array; use [0] |
| Fix Version/s | fixVersions | `fields.fixVersions[].name` | String array |
| Epic | epic | `fields.customfield_10014` | Epic link key |
| Labels | labels | `fields.labels` | String array |
| Components | components | `fields.components[].name` | |
| Description | description | `fields.description` | ADF or string |
| Acceptance Criteria | acceptanceCriteria | `fields.customfield_10035` | Confirmed field ID for this Jira instance |
| Linked Issues | linkedIssues | `fields.issuelinks[]` | Blocks, relates to, etc. |
| Sub-Tasks | subtasks | `fields.subtasks[]` | Child tasks |
| Attachments | attachments | `fields.attachment[]` | Files attached to story |
| Comments | comments | `fields.comment.comments` | Latest 3 in .md, all in .json |
