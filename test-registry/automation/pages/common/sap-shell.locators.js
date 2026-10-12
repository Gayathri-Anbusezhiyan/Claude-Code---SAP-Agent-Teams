// automation/pages/common/sap-shell.locators.js
// SAP Shell (header bar) locator definitions
// Source: Playwright MCP Server exploration on 2026-04-07 against SAP S/4HANA Cloud (my429998)

const SapShellLocators = {
  shellBar: {
    primary: { strategy: 'role', value: 'banner', name: 'Shell Bar' },
    fallbacks: [
      { strategy: 'css', value: '#shell-header' },
    ]
  },

  appTitle: {
    primary: { strategy: 'role', value: 'button', name: 'Purchase Order' },
    fallbacks: [
      { strategy: 'css', value: '.sapUshellHeadTitle, #shellAppTitle' },
    ]
  },

  backButton: {
    primary: { strategy: 'role', value: 'button', name: 'Back' },
    fallbacks: [
      { strategy: 'css', value: '#backBtn' },
    ]
  },

  userAvatar: {
    primary: { strategy: 'css', value: 'button[id*="meArea"], button[title*="Profile"]' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Profile of/ },
    ]
  },
};

const LocatorMetadata = {
  recordedDate: '2026-04-07',
  recordedBy: 'Playwright MCP Server',
  environment: 'SAP S/4HANA Cloud - my429998',
  browser: 'Chromium',
  resolution: '1920x1080'
};

module.exports = { SapShellLocators, LocatorMetadata };
