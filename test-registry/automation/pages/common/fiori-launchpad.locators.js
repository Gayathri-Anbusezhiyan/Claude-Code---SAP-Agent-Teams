// automation/pages/common/fiori-launchpad.locators.js
// SAP Fiori Launchpad locator definitions
// Source: Playwright MCP Server exploration on 2026-04-07 against SAP S/4HANA Cloud (my429998)

const FioriLaunchpadLocators = {
  // Shell bar
  shellHeader: {
    primary: { strategy: 'role', value: 'banner', name: 'Shell Bar' },
    fallbacks: [
      { strategy: 'css', value: '#shell-header' },
    ]
  },

  // Open Search button (search is hidden by default in Fiori Launchpad)
  openSearchButton: {
    primary: { strategy: 'role', value: 'button', name: 'Open Search' },
    fallbacks: [
      { strategy: 'css', value: '[id*="shellSearch"] button' },
    ]
  },

  // Search box (visible after clicking Open Search)
  searchField: {
    primary: { strategy: 'role', value: 'searchbox', name: 'Search' },
    fallbacks: [
      { strategy: 'css', value: '#sapUshellSearchField input' },
      { strategy: 'placeholder', value: 'Search' },
    ]
  },

  // User menu button (profile button with dynamic user name)
  userMenuButton: {
    primary: { strategy: 'css', value: 'button[id*="meArea"], button[title*="Profile"]' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Profile of/ },
    ]
  },

  // Notifications button
  notificationsButton: {
    primary: { strategy: 'role', value: 'button', name: 'Notifications' },
    fallbacks: [
      { strategy: 'css', value: '#NotificationsCountButton' },
    ]
  },

  // Sign Out option in user menu (appears as listitem in dialog)
  signOutButton: {
    primary: { strategy: 'text', value: 'Sign Out' },
    fallbacks: [
      { strategy: 'css', value: '[id*="logoutBtn"]' },
    ]
  },

  // Sign Out confirmation OK button
  signOutConfirmOK: {
    primary: { strategy: 'role', value: 'button', name: 'OK' },
    fallbacks: [
      { strategy: 'css', value: '.sapMMessageBox .sapMBtn' },
    ]
  },

  // Guided Tour popup (shown on first login)
  guidedTourDialog: {
    primary: { strategy: 'role', value: 'dialog', name: 'Start Guided Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Start Guided Tour' },
    ]
  },

  // Leave Tour button (dismisses guided tour)
  leaveTourButton: {
    primary: { strategy: 'role', value: 'button', name: 'Leave Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Leave Tour' },
    ]
  },

  // SAP Logo / Home button
  homeButton: {
    primary: { strategy: 'role', value: 'button', name: 'SAP Logo' },
    fallbacks: [
      { strategy: 'css', value: '#shell-header-logo' },
    ]
  },

  // Back navigation
  backButton: {
    primary: { strategy: 'role', value: 'button', name: 'Back' },
    fallbacks: [
      { strategy: 'css', value: '#backBtn' },
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

module.exports = { FioriLaunchpadLocators, LocatorMetadata };
