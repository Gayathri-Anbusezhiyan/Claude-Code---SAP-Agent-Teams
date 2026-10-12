// automation/pages/mm/purchase-order-change/purchase-order-change.locators.js
// Source: Scriptless execution reports 2026-04-15T11-12-00 and 2026-04-16T06-00-00
// Exploration data: automation/exploration-data/selectors/mm-purchase-order-change.selectors.json
// NOTE: This app is a classic SAP GUI transaction (ME22N) embedded in an iframe. Most locators
// target elements INSIDE the iframe, not the Fiori shell. Use getSapGuiFrame() first.

const PurchaseOrderChangeLocators = {
  // --- Fiori Shell: Search for app ---

  openSearchButton: {
    primary: { strategy: 'role', value: 'button', name: 'Open Search' },
    fallbacks: [
      { strategy: 'css', value: '[id*="shellSearch"] button' },
    ]
  },

  launchpadSearchField: {
    primary: { strategy: 'role', value: 'searchbox', name: 'Search' },
    fallbacks: [
      { strategy: 'css', value: '#sapUshellSearchField input' },
    ]
  },

  // --- Guided Tour popup ---

  guidedTourLeaveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Leave Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Leave Tour' },
    ]
  },

  // --- SAP GUI iframe: "Other Purchase Order" button ---
  // Scriptless discovered: This is a TOOLBAR BUTTON that opens a "Select Document" dialog,
  // NOT a tab. The dialog contains a "Pur. Order" input field.

  otherPurchaseOrderButton: {
    primary: { strategy: 'css', value: '[title*="Other Purchase Order"], [title*="Other document"]' },
    fallbacks: [
      { strategy: 'css', value: '[title*="Other Purch"]' },
      { strategy: 'text', value: 'Other Purchase Order' },
    ]
  },

  // --- SAP GUI iframe: "Select Document" dialog ---
  // Scriptless discovered: After clicking "Other Purchase Order", a modal dialog appears
  // with a "Pur. Order" field and radio buttons.

  purOrderField: {
    primary: { strategy: 'css', value: 'input[id*="PurchaseOrder"], input[title*="Pur. Order"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="purOrder"]' },
    ]
  },

  // --- SAP GUI iframe: Display/Change toggle ---
  // Scriptless discovered: Button toggles between Display and Change mode.
  // After save, SAP reverts to Display mode — must click again to re-enter edit.

  displayChangeButton: {
    primary: { strategy: 'css', value: '[title*="Display <-> Change"], [title*="Display/Change"]' },
    fallbacks: [
      { strategy: 'css', value: '[title*="Display"], [title*="Change"]' },
    ]
  },

  // --- SAP GUI iframe: PO Quantity field ---
  // Scriptless discovered: Field is in the item detail area, editable after Display/Change toggle.

  poQuantityField: {
    primary: { strategy: 'css', value: 'input[title*="PO Quantity"], input[id*="POQuantity"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[title*="PO quantity"], input[title*="Quantity"]' },
    ]
  },

  // --- SAP GUI iframe: Save button ---

  saveButton: {
    primary: { strategy: 'css', value: '[title="Save (Ctrl+S)"]' },
    fallbacks: [
      { strategy: 'css', value: '[title="Save"]' },
      { strategy: 'css', value: 'button[id*="save"], [id*="SAVE"]' },
    ]
  },

  // --- SAP GUI iframe: Status bar message ---
  // Scriptless discovered: After save, message appears like "Standard PO 4500063731 changed"

  statusBarMessage: {
    primary: { strategy: 'css', value: '[id*="msgArea"], .urMsgBarTxt' },
    fallbacks: [
      { strategy: 'css', value: '[id*="statusbar"], [id*="MessageArea"]' },
    ]
  },

  // --- User menu / Sign out (in Fiori shell, NOT iframe) ---

  userProfileButton: {
    primary: { strategy: 'css', value: 'button[id*="meArea"], button[title*="Profile"]' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Profile of/ },
    ]
  },

  // Scriptless discovered: Sign Out is a list item with internal ID logoutBtn in the profile dialog.
  signOutButton: {
    primary: { strategy: 'text', value: 'Sign Out' },
    fallbacks: [
      { strategy: 'css', value: '[id*="logoutBtn"]' },
    ]
  },

  signOutConfirmOK: {
    primary: { strategy: 'role', value: 'button', name: 'OK' },
    fallbacks: [
      { strategy: 'css', value: '.sapMMessageBox .sapMBtn' },
    ]
  },
};

const LocatorMetadata = {
  recordedDate: '2026-04-16',
  recordedBy: 'Scriptless execution reports (Playwright MCP) — 2026-04-15 and 2026-04-16',
  environment: 'SAP S/4HANA Cloud - my429998',
  browser: 'Chromium',
  appType: 'SAP GUI for HTML (ME22N) in iframe',
};

module.exports = { PurchaseOrderChangeLocators, LocatorMetadata };
