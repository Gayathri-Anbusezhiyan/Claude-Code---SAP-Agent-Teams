# /jira-fetch-userstories

Fetch all User Stories from the configured Jira project and write them to `jira/userstories/`.

## Instructions

1. Read the agent definition at `ai-engine/agents/jira-agent/agent.md` for context
2. Read the skill definition at `ai-engine/agents/jira-agent/skills/fetch-userstories.md`
3. Read `.env` to get `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `JIRA_MAX_RESULTS`
4. Execute all steps defined in the skill file exactly as specified
5. Report completion summary when done

## Expected Output

- `test-registry/jira/userstories/{KEY-NNN}/{KEY-NNN}.md` — one markdown file per story
- `test-registry/jira/userstories/{KEY-NNN}/{KEY-NNN}.json` — one JSON file per story
- `test-registry/jira/index.json` — updated with all story entries (Epic entries preserved)
