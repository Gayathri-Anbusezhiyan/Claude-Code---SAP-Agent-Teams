# Skill: fetch-epics

## Purpose

Fetch all Epics from the configured Jira project and write each into its own subfolder under `jira/epics/{issueKey}/` containing a `.md` (human-readable) and `.json` (machine-readable) file.

Run this skill **before** `fetch-userstories` when doing a full import — Epic data is needed to resolve Epic summaries in Story files.

---

## Execution Steps

### Step 1 — Read configuration

Read the `.env` file in the project root and extract:
- `JIRA_PROJECT_KEY` (e.g. `JNJSAP`) — **required**, abort if missing
- `JIRA_BASE_URL` (default: `https://jira-naqet.atlassian.net`)
- `JIRA_MAX_RESULTS` (default: `100`)

---

### Step 2 — Fetch Epics with pagination

Call `mcp__atlassian__searchJiraIssuesUsingJql` with:
- `jql`: `project = {JIRA_PROJECT_KEY} AND issuetype = Epic ORDER BY created DESC`
- `fields`: `summary,status,priority,assignee,reporter,description,comment,created,updated,issuetype,labels,components,customfield_10011`
- `maxResults`: value from `JIRA_MAX_RESULTS`
- `startAt`: `0` (first page)

The response includes a `total` field. Paginate by repeating with `startAt += maxResults` until accumulated count equals `total` or the page returns 0 issues.

> Note: `customfield_10011` = Epic Name (the short label field distinct from the summary). Standard Jira Cloud field ID.

---

### Step 3 — For each Epic, write output files

For each issue returned across all pages:

**a) Write Markdown file** → `jira/epics/{issueKey}/{issueKey}.md`

Create the subfolder `jira/epics/{issueKey}/` if it does not exist.

Use this exact template:

```
# [{issueKey}] {summary}

**Issue Key:** {issueKey}
**Type:** Epic
**Epic Name:** {customfield_10011}       ← use summary if customfield_10011 is null
**Status:** {status.name}
**Priority:** {priority.name}
**Assignee:** {assignee.displayName}     ← use "Unassigned" if null
**Reporter:** {reporter.displayName}
**Labels:** {labels joined by ", "}     ← omit entire line if labels array is empty
**Components:** {components joined by ", "} ← omit entire line if components array is empty
**Created:** {created as YYYY-MM-DD}
**Updated:** {updated as YYYY-MM-DD}

## Description

{description rendered as plain text, or "(No description provided)" if null}

## Comments

{For each of the latest 3 comments (most recent last), render:}
### Comment {n} — {author.displayName} ({created as YYYY-MM-DD})
{comment body as plain text}

{If there are more than 3 comments, add: "_(Showing 3 of {total} comments. View all at the link below.)_"}
{Omit the entire Comments section if the issue has no comments}

## Links

- **Jira:** {JIRA_BASE_URL}/browse/{issueKey}
```

**b) Write JSON file** → `jira/epics/{issueKey}/{issueKey}.json`

```json
{
  "issueKey": "{issueKey}",
  "type": "Epic",
  "summary": "{summary}",
  "epicName": "{customfield_10011 or summary if null}",
  "status": "{status.name}",
  "priority": "{priority.name}",
  "assignee": { "displayName": "{name}", "accountId": "{id}" },
  "reporter": { "displayName": "{name}", "accountId": "{id}" },
  "labels": ["{label1}", "{label2}"],
  "components": ["{comp1}"],
  "description": "{raw description text}",
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
- Use `null` for: `assignee`, `reporter` when not present
- Use `[]` for: `labels`, `components`, `comments` when empty
- `epicName`: always a string — fall back to `summary` if `customfield_10011` is null
- Do not omit any key — always include all keys with their null/empty value

---

### Step 4 — Update jira/index.json

After all epic files are written, update (or create) `jira/index.json`:

```json
{
  "project": "{JIRA_PROJECT_KEY}",
  "jiraBaseUrl": "{JIRA_BASE_URL}",
  "lastFetched": "{current ISO8601 timestamp}",
  "fetchedBy": "jira-agent/skills/fetch-epics",
  "totalStories": {preserve existing value if present, else 0},
  "totalEpics": {count of epics written},
  "issues": [
    {
      "key": "{issueKey}",
      "type": "Epic",
      "summary": "{summary}",
      "epicName": "{epicName}",
      "status": "{status}",
      "priority": "{priority}",
      "mdFile": "jira/epics/{issueKey}/{issueKey}.md",
      "jsonFile": "jira/epics/{issueKey}/{issueKey}.json",
      "fetchedAt": "{ISO8601}"
    }
  ]
}
```

When updating index.json: replace all existing Epic-type entries with the newly fetched ones. Preserve any existing Story-type entries from a prior fetch-userstories run.

---

### Step 5 — Report completion

Print a summary:
```
Jira Agent | fetch-epics complete
  Project:  {JIRA_PROJECT_KEY}
  Epics:    {N} fetched
  Files:    {N*2} written (jira/epics/{key}/{key}.md + {key}.json)
  Index:    jira/index.json updated
```

---

## Error Handling

- If `JIRA_PROJECT_KEY` is empty: stop and print "ERROR: JIRA_PROJECT_KEY is not set in .env"
- If a single issue fetch fails: log a warning for that issue key and continue
- If `jira/epics/{issueKey}/` subfolder does not exist: create it before writing files
- If description is in ADF (Atlassian Document Format): render to plain text; do not include raw JSON/ADF in markdown

---

## Field Reference

| .md Label | JSON Key | Jira Field | Notes |
|-----------|----------|------------|-------|
| Issue Key | issueKey | `key` | e.g. PROJ-100 |
| Epic Name | epicName | `fields.customfield_10011` | Short epic label |
| Status | status | `fields.status.name` | |
| Priority | priority | `fields.priority.name` | |
| Assignee | assignee | `fields.assignee` | null if unassigned |
| Reporter | reporter | `fields.reporter` | |
| Labels | labels | `fields.labels` | String array |
| Components | components | `fields.components[].name` | |
| Description | description | `fields.description` | ADF or string |
| Comments | comments | `fields.comment.comments` | Latest 3 in .md |

> Epics do not have Story Points or Sprint fields — those are Story-level concepts.
