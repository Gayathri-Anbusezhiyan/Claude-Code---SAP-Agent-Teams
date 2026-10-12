// agents/jira-agent/config/jira.config.js
// Reads Jira Agent configuration from environment variables (.env)
// Usage: const { jiraConfig } = require('./jira.config');

require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const jiraConfig = {
  projectKey:  process.env.JIRA_PROJECT_KEY  || '',
  baseUrl:     process.env.JIRA_BASE_URL     || 'https://jira-naqet.atlassian.net',
  maxResults:  parseInt(process.env.JIRA_MAX_RESULTS || '100', 10),
  outputDir: {
    userstories: 'jira/userstories',
    epics:       'jira/epics',
    index:       'jira/index.json',
  },
  issueTypes: {
    story: 'Story',
    epic:  'Epic',
  },
  jql: {
    stories: (key) => `project = ${key} AND issuetype = Story ORDER BY created DESC`,
    epics:   (key) => `project = ${key} AND issuetype = Epic ORDER BY created DESC`,
  },
  fields: {
    stories: [
      'summary', 'status', 'priority', 'assignee', 'reporter',
      'description', 'comment', 'created', 'updated', 'issuetype',
      'labels', 'components', 'fixVersions', 'resolution',
      'issuelinks', 'subtasks', 'attachment',
      'customfield_10016',  // Story Points
      'customfield_10020',  // Sprint
      'customfield_10014',  // Epic Link
      'customfield_10056',  // Acceptance Criteria
    ].join(','),
    epics: [
      'summary', 'status', 'priority', 'assignee', 'reporter',
      'description', 'comment', 'created', 'updated', 'issuetype',
      'labels', 'components',
      'customfield_10011',  // Epic Name
    ].join(','),
  },
};

module.exports = { jiraConfig };
