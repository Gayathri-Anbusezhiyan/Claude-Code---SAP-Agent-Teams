# /jira-import-all

Fetch all Epics and User Stories from the configured Jira project in a single run.
Epics are fetched first so their summaries are available when writing Story files.

## Instructions

1. Read the agent definition at `ai-engine/agents/jira-agent/agent.md`
2. Read `.env` to get `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `JIRA_MAX_RESULTS`
3. **Run fetch-epics skill first** (read `ai-engine/agents/jira-agent/skills/fetch-epics.md` and execute all its steps)
   - Write all epic `.md` and `.json` files to `test-registry/jira/epics/`
   - Update `test-registry/jira/index.json` with epic entries
4. **Run fetch-userstories skill** (read `ai-engine/agents/jira-agent/skills/fetch-userstories.md` and execute all its steps)
   - Write all story `.md` and `.json` files to `test-registry/jira/userstories/`
   - When writing each story's Epic field, resolve the epic summary from the already-fetched `test-registry/jira/epics/{epicKey}.json` if available
5. Write the **final merged `test-registry/jira/index.json`** combining both epics and stories:
   - Update `lastFetched` to current timestamp
   - Set `fetchedBy` to `"jira-agent/jira-import-all"`
   - Set `totalEpics` and `totalStories` to the counts from this run
   - `issues` array must contain all epics and all stories
6. Report final summary

## Expected Output

- `test-registry/jira/epics/{KEY-NNN}/{KEY-NNN}.md` + `.json` — one pair per epic
- `test-registry/jira/userstories/{KEY-NNN}/{KEY-NNN}.md` + `.json` — one pair per story
- `test-registry/jira/index.json` — merged master registry with all issues

## Final Summary Format

```
Jira Agent | jira-import-all complete
  Project:   {JIRA_PROJECT_KEY}
  Epics:     {N} fetched → jira/epics/
  Stories:   {N} fetched → jira/userstories/
  Files:     {total files written}
  Index:     jira/index.json updated
```
