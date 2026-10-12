// agents/defect-logging-agent/config/defect.config.js
// Reads Defect Logging Agent configuration from environment variables (.env)
// Usage: const { defectConfig } = require('./defect.config');

require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const defectConfig = {
  jira: {
    projectKey: process.env.JIRA_PROJECT_KEY || '',
    baseUrl:    process.env.JIRA_BASE_URL    || 'https://jira-naqet.atlassian.net',
  },
  paths: {
    selfHealing:     'self-healing',
    failures:        'self-healing/failures',
    reExecutions:    'self-healing/re-executions',
    defects:         'defects',
    testcases:       'testcases/AI-generated testcases',
    jiraUserstories: 'jira/userstories',
    automationData:  'test-registry/automation/test-data',
  },
  // TC priority → Jira priority mapping
  priorityMap: {
    CRITICAL: 'Critical',
    HIGH:     'High',
    MEDIUM:   'Medium',
    LOW:      'Low',
  },
  // TC severity → Jira label mapping
  severityLabelMap: {
    CRITICAL: 'critical',
    MAJOR:    'major',
    MINOR:    'minor',
    TRIVIAL:  'trivial',
  },
  // Fixed labels added to every auto-detected defect
  baseLabels: ['defect', 'automation-detected'],
  // Jira issue type for bugs
  bugIssueType: 'Bug',
  // Preferred issue link type (checked against getIssueLinkTypes; fallback to "Relates")
  preferredLinkType: 'Causes',
  fallbackLinkType:  'Relates',
  // SAP environment metadata (included in defect description)
  sapTenant: 'my429998.s4hana.cloud.sap',
  sapModule: {
    MM: 'Materials Management',
    SD: 'Sales & Distribution',
    FI: 'Financial Accounting',
    HR: 'Human Resources',
    PP: 'Production Planning',
  },
};

module.exports = { defectConfig };
