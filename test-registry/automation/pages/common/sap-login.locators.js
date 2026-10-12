// automation/pages/common/sap-login.locators.js
// SAP IDP/IAS Login page locator definitions
// Source: Playwright MCP Server exploration on 2026-04-07 — two-step IDP login via accounts.sap.com

const SapLoginLocators = {
  // Step 1: Email/username field (IDP login page)
  emailField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Email, User ID or Login Name' },
    fallbacks: [
      { strategy: 'css', value: 'input[name="j_username"], input[type="email"]' },
      { strategy: 'placeholder', value: 'Email, User ID or Login Name' },
    ]
  },

  // Continue button (used after both email and password steps)
  continueButton: {
    primary: { strategy: 'role', value: 'button', name: 'Continue' },
    fallbacks: [
      { strategy: 'css', value: 'button[type="submit"]' },
    ]
  },

  // Step 2: Password field (shown after email + Continue)
  passwordField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Password' },
    fallbacks: [
      { strategy: 'css', value: 'input[type="password"], input[name="j_password"]' },
      { strategy: 'placeholder', value: 'Password' },
    ]
  },

  // Error message on login failure
  errorMessage: {
    primary: { strategy: 'role', value: 'alert' },
    fallbacks: [
      { strategy: 'css', value: '#messageArea, .sapMMessagePage, .urMsgBarTxt' },
    ]
  },
};

const LocatorMetadata = {
  recordedDate: '2026-04-07',
  recordedBy: 'Playwright MCP Server',
  environment: 'SAP S/4HANA Cloud - IDP via accounts.sap.com',
  browser: 'Chromium',
  resolution: '1920x1080'
};

module.exports = { SapLoginLocators, LocatorMetadata };
