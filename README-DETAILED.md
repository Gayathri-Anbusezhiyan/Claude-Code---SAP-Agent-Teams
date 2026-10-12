# SAP S/4HANA Cloud Test Automation Framework

AI-powered end-to-end test automation framework for SAP S/4HANA Cloud using Playwright and Claude Code Agent Teams architecture.

## 🎯 Overview

This framework automates the entire testing lifecycle for SAP Fiori applications:
- **Jira Integration**: Auto-imports user stories and requirements  
- **AI Test Generation**: Generates test cases from user stories  
- **Scriptless Execution**: Explores SAP apps via Playwright MCP  
- **Script Generation**: Creates production-ready Playwright tests  
- **Self-Healing**: Automatically fixes failing tests  
- **Report Generation**: HTML and PDF reports with screenshots and videos  

## 🚀 Quick Start

\`\`\`bash
# 1. Install dependencies
npm install
npx playwright install

# 2. Configure environment (create .env file)
cp .env.example .env
# Edit .env with your SAP and Jira credentials

# 3. Run complete pipeline
/e2e-pipeline CS-2
\`\`\`

## 📋 Prerequisites

- Node.js v18+
- Playwright latest
- SAP S/4HANA Cloud tenant access
- Jira Cloud API access (optional)
- Claude Code CLI or VS Code extension

## 🔧 Installation

\`\`\`bash
# Clone repository
git clone <your-repo-url>
cd "Claude Code - SAP Agent Teams"

# Install dependencies
npm install
npx playwright install chromium

# Create .env file
cat > .env << 'ENV'
SAP_FIORI_URL=https://myXXXXXX.s4hana.cloud.sap/shell/run?sap-ui-app-id=...
SAP_BASE_URL=https://myXXXXXX.s4hana.cloud.sap
SAP_USERNAME=your-email@company.com
SAP_PASSWORD=your-password

JIRA_PROJECT_KEY=CS
JIRA_BASE_URL=https://your-company.atlassian.net
ENV
\`\`\`

⚠️ **Never commit .env to git!**

## 📂 Project Structure

\`\`\`
.
├── .claude/commands/          # Slash commands
├── ai-engine/agents/          # AI agents
├── test-registry/
│   ├── automation/
│   │   ├── pages/            # Page Objects
│   │   ├── tests/            # Test specs
│   │   └── test-results/     # Reports
│   └── pdf-reports/          # Custom reports
├── testcases/                # Generated test cases
├── testdata/                 # Test data JSON
└── jira/                     # Jira stories
\`\`\`

## 🎬 Usage

### Run Tests
\`\`\`bash
/run-tests TC-CS-001          # Single test
/run-tests CS-2               # All tests for story
/run-tests mm                 # Module tests
\`\`\`

### Generate Tests
\`\`\`bash
/testcase-pipeline CS-2       # From Jira story
/automate CS-2                # Generate scripts
\`\`\`

### Self-Healing
\`\`\`bash
/self-heal TC-CS-001          # Auto-fix failures
\`\`\`

## 📊 Reports

After each test run:
- **HTML Report**: Interactive with screenshots & videos (Full HD 1920x1080)
- **PDF Report**: Print-ready, test steps only (no media)

Location: \`test-registry/pdf-reports/\`

## 🔒 Security

Protected in .gitignore:
- \`.env\` - Credentials
- \`test-results/\` - Screenshots may contain data
- \`pdf-reports/media/\` - Videos/screenshots

## 📚 Documentation

- [Report Layout](REPORT-LAYOUT-SUMMARY.md)
- [Screenshots & Videos](SCREENSHOTS-AND-VIDEOS-SETUP.md)
- [Portability Guide](PORTABILITY-AUDIT.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Commit and push
5. Create PR

## 📝 License

Proprietary - All Rights Reserved

## 🆘 Support

- Documentation: \`/help\`
- Issues: Contact your team lead

---

**Powered by Claude Code Agent Teams**
