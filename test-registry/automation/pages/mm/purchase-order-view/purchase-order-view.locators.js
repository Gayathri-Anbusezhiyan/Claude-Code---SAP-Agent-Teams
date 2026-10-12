// automation/pages/mm/purchase-order-view/purchase-order-view.locators.js
// Source: Scriptless execution report 2026-04-16T06-00-00 — Display Purchase Order (ME23N) in SAP GUI iframe
// Exploration data: automation/exploration-data/selectors/mm-purchase-order-view.selectors.json
// NOTE: ME23N shares identical UI structure with ME22N (Change PO). Same toolbar, header, tabs, grid.
// Difference: no Save/Check buttons in Display mode.

const PurchaseOrderViewLocators = {
  // --- Fiori Shell: Search for app ---
  // Confirmed by scriptless 2026-04-16: Open Search button revealed searchbox

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

  guidedTourLeaveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Leave Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Leave Tour' },
    ]
  },

  // --- SAP GUI iframe: "Other Purchase Order" button ---
  // Scriptless 2026-04-16 confirmed: Identical to ME22N — toolbar button opens "Select Document" dialog
  // with "Pur. Order" textbox and radio buttons (Pur. Order / Purch. Requisition)

  otherPurchaseOrderButton: {
    primary: { strategy: 'css', value: '[title*="Other Purchase Order"], [title*="Other document"]' },
    fallbacks: [
      { strategy: 'css', value: '[title*="Other Purch"]' },
      { strategy: 'text', value: 'Other Purchase Order' },
    ]
  },

  // --- SAP GUI iframe: PO number input in "Select Document" dialog ---
  // Scriptless 2026-04-16 confirmed: "Pur. Order" textbox, active by default

  purOrderField: {
    primary: { strategy: 'css', value: 'input[title*="Pur. Order"], input[id*="PurchaseOrder"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="purOrder"]' },
    ]
  },

  // --- SAP GUI iframe: PO header/title area ---
  // Scriptless 2026-04-16 confirmed: After loading PO, Shell Bar title updates to
  // "Standard PO 4500063731 Created by Trial 0030517 User"
  // The SAP GUI iframe has header fields: Order Type, Purchasing Document, Supplier, Doc. Date

  poShellBarTitle: {
    primary: { strategy: 'role', value: 'heading', name: /Standard PO/ },
    fallbacks: [
      { strategy: 'css', value: '[id*="shellAppTitle"]' },
    ]
  },

  // --- SAP GUI iframe: Header fields (read-only in Display mode) ---
  // Scriptless 2026-04-16 confirmed: These textboxes exist in the iframe header area

  orderTypeField: {
    primary: { strategy: 'css', value: 'input[title*="Order Type"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="OrderType"]' },
    ]
  },

  purchasingDocumentField: {
    primary: { strategy: 'css', value: 'input[title*="Purchasing Document"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="PurchDoc"]' },
    ]
  },

  supplierField: {
    primary: { strategy: 'css', value: 'input[title*="Supplier"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="Supplier"]' },
    ]
  },

  docDateField: {
    primary: { strategy: 'css', value: 'input[title*="Doc. Date"]' },
    fallbacks: [
      { strategy: 'css', value: 'input[id*="DocDate"]' },
    ]
  },

  // --- SAP GUI iframe: Display/Change toggle ---
  // Scriptless 2026-04-16 confirmed: Button exists in ME23N toolbar, switches to ME22N if authorized

  displayChangeButton: {
    primary: { strategy: 'css', value: '[title*="Display <-> Change"], [title*="Display/Change"]' },
    fallbacks: [
      { strategy: 'css', value: '[title*="Display"], [title*="Change"]' },
    ]
  },

  // --- User menu / Sign out (in Fiori shell, NOT iframe) ---
  // Scriptless 2026-04-16 confirmed: Profile dialog with 8 list items, Sign Out is last

  userProfileButton: {
    primary: { strategy: 'css', value: 'button[id*="meArea"], button[title*="Profile"]' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Profile of/ },
    ]
  },

  // Scriptless 2026-04-16 confirmed: Sign Out is listitem with ID __list9-8-logoutBtn
  signOutButton: {
    primary: { strategy: 'css', value: '[id*="logoutBtn"]' },
    fallbacks: [
      { strategy: 'text', value: 'Sign Out' },
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
  recordedBy: 'Scriptless execution report 2026-04-16T06-00-00 (Playwright MCP)',
  environment: 'SAP S/4HANA Cloud - my429998',
  browser: 'Chromium',
  appType: 'SAP GUI for HTML (ME23N) in iframe',
};

module.exports = { PurchaseOrderViewLocators, LocatorMetadata };
