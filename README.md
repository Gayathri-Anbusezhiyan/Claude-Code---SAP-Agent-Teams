# SAP S/4HANA Cloud Automation Framework

AI-powered test automation for SAP S/4HANA Cloud using Agent Teams architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Fetch Jira stories and generate test cases
/jira-import-all
/testcase-pipeline {STORY-KEY}

# Generate automation scripts
/automate {STORY-KEY}
```

## Project Structure

```
📁 test-registry/  → Complete test artifact registry (requirements → execution → reports)
📁 ai-engine/      → AI automation engine (agents, prompts, blueprints, documentation)
📄 .env            → Environment configuration
📄 package.json    → NPM dependencies and scripts
```

## Documentation

📖 **Complete documentation:** [ai-engine/CLAUDE.md](ai-engine/CLAUDE.md)

- Agent Teams Pipeline
- Slash Commands Reference
- Test Execution Guide
- Configuration Details

## Key Commands

| Command | Purpose |
|---------|---------|
| `/jira-import-all` | Fetch all Jira stories and epics |
| `/testcase-pipeline {KEY}` | Generate test cases for a story |
| `/automate {KEY}` | Explore SAP via MCP + generate scripts |
| `/run-tests {KEY}` | Execute Playwright tests |
| `/generate-reports` | Generate PDF + Excel reports from test results |
| `/e2e-pipeline {KEY}` | Full 7-phase automated pipeline |

## Configuration

Edit `.env` to configure:
- SAP tenant URL and credentials
- Jira project key and API settings
- MCP server configuration

## Support

- **Agent Documentation:** `ai-engine/agents/{agent-name}/agent.md`
- **Architecture:** `ai-engine/architecture/ARCHITECTURE.md`
- **Test Results:** `test-registry/test-results/`
- **Reports:** `test-registry/pdf-reports/`

---

**Framework Version:** 1.0.0  
**SAP System:** S/4HANA Cloud Public Edition  
**Automation:** Playwright + MCP + Agent Teams
