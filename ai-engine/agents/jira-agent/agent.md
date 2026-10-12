# Jira Agent

## Purpose

The Jira Agent is the data ingestion layer of the Agent Teams pipeline. It fetches Issues from the configured Jira project and writes structured local files that downstream agents consume.

```
Jira Agent (Phase 1)  →  Test Strategy Architect (Phase 2a)  →  TestCase Agent (Phase 2b)  →  Automation Agent (Phase 3)
  fetch issues              analyse + define strategy            generate test cases          generate Playwright scripts
  └── jira/                 
  └── jira/.../strategy/               
  └── testcases/AI-generated testcases/   
  └── test-registry/automation/tests/
```

## Skills

| Skill | Slash Command | Skill File | Output |
|-------|---------------|------------|--------|
| Fetch User Stories | `/jira-fetch-userstories` | `skills/fetch-userstories.md` | `jira/userstories/{key}/{key}.md` + `.json` |
| Fetch Epics | `/jira-fetch-epics` | `skills/fetch-epics.md` | `jira/epics/{key}/{key}.md` + `.json` |
| Import All | `/jira-import-all` | `.claude/commands/jira-import-all.md` | Both folders + `jira/index.json` |

## Configuration

All configuration is read from the project `.env` file. Change `JIRA_PROJECT_KEY` to switch between projects — no code changes required.

| Variable | Description | Example |
|----------|-------------|---------|
| `JIRA_PROJECT_KEY` | The Jira project key to fetch from | `JNJSAP` |
| `JIRA_BASE_URL` | Jira instance base URL | `https://jira-naqet.atlassian.net` |
| `JIRA_MAX_RESULTS` | Pagination page size (max 100) | `100` |

Config is also available programmatically via `agents/jira-agent/config/jira.config.js`.

## MCP Dependency

This agent uses the Atlassian MCP server configured in `.mcp.json`. The following tools are used:

- `mcp__atlassian__searchJiraIssuesUsingJql` — JQL-based issue search with pagination
- `mcp__atlassian__getJiraIssue` — Full issue detail fetch (used for enrichment if needed)

The Atlassian MCP must be connected before running any skill. Verify with: `mcp__atlassian__atlassianUserInfo`.

## How to Invoke

### Via slash commands (recommended)
```
/jira-import-all              # Fetch Epics + Stories in one run (most common)
/jira-fetch-userstories       # Fetch Stories only
/jira-fetch-epics             # Fetch Epics only
```

### Via natural language
```
"Run the Jira Agent to fetch all stories"
"Execute the fetch-userstories skill from agents/jira-agent/skills/fetch-userstories.md"
"Import all Jira issues from project JNJSAP"
```

## Output Structure

```
jira/
├── userstories/
│   ├── PROJ-123/
│   │   ├── PROJ-123.md       Human-readable story with all fields
│   │   └── PROJ-123.json     Machine-readable story data (used by TestCase Agent)
│   ├── PROJ-124/
│   │   ├── PROJ-124.md
│   │   └── PROJ-124.json
│   └── ...
├── epics/
│   ├── PROJ-100/
│   │   ├── PROJ-100.md
│   │   └── PROJ-100.json
│   └── ...
└── index.json            Master registry: { totalStories, totalEpics, issues: [...] }
```

Each run fully overwrites existing files (Jira is the source of truth — no stale accumulation).

## Story JSON Fields (for TestCase Agent)

Each `{issueKey}.json` file contains all fields the TestCase Agent needs to generate test cases:

| Field | Purpose for TestCase Agent |
|-------|---------------------------|
| `summary` | Test case title / scenario name |
| `description` | Business context, scope, background |
| `acceptanceCriteria` | **Primary source for test steps and expected results** |
| `priority` | Test case priority (High/Medium/Low) |
| `status` | Skip generation if status is "Won't Do" or "Duplicate" |
| `linkedIssues` | Identify integration test scenarios; flag dependencies |
| `fixVersions` | Tag test cases to release/version |
| `subtasks` | Generate sub-scenario test cases |
| `components` | Map to SAP module (MM, SD, FI, HR) |
| `labels` | Additional test categorisation |
| `attachments` | Reference specs/designs when writing test steps |
| `epic` | Group test cases under the parent epic |

## Integration with Downstream Agents

- **Test Strategy Architect (Phase 2a)** reads `jira/userstories/{key}/{key}.json` as its primary input to analyse the story and produce risk profiles and test strategy documents in `jira/userstories/{key}/strategy/`
- **TestCase Agent (Phase 2b)** reads the strategy artefacts produced by Phase 2a alongside the story JSON to generate SAP test cases in `testcases/AI-generated testcases/`
- **Automation Agent (Phase 3)** reads `testcases/` to generate Playwright automation scripts in `test-registry/test-registry/automation/tests/`
- The `jira/index.json` serves as the handoff manifest — downstream agents use it to discover which issues need processing
