// automation/pages/mm/purchase-requisition/purchase-requisition.locators.js
// Generated based on POM patterns for SAP S/4HANA Cloud
// Note: Element refs should be validated via scriptless execution

const PurchaseRequisitionLocators = {
  // --- Launchpad: Open Search ---

  openSearchButton: {
    primary: { strategy: 'role', value: 'button', name: 'Open Search' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: 'Focus Search' },
      { strategy: 'css', value: '[id*="shellSearch"] button' },
    ]
  },

  // --- Launchpad: Search box ---

  launchpadSearchField: {
    primary: { strategy: 'role', value: 'searchbox', name: 'Search' },
    fallbacks: [
      { strategy: 'css', value: '#sapUshellSearchField input' },
      { strategy: 'placeholder', value: 'Search' },
    ]
  },

  // --- Search result for "Create purchase Requestion - Advanced" or "Display Purchase - Requisitions" ---

  createPRSearchResult: {
    primary: { strategy: 'role', value: 'link', name: /Create.*Purchase.*Requisition/i },
    fallbacks: [
      { strategy: 'text', value: /Create.*Purchase.*Requisition.*Advanced/i },
    ]
  },

  displayPRSearchResult: {
    primary: { strategy: 'role', value: 'link', name: /Display.*Purchase.*Requisition/i },
    fallbacks: [
      { strategy: 'text', value: /Display.*Purchase.*Requisition/i },
    ]
  },

  // --- Guided Tour popup ---

  guidedTourLeaveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Leave Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Leave Tour' },
    ]
  },

  // --- Create PR form fields ---

  // Item Overview section - expand/collapse
  itemOverviewSection: {
    primary: { strategy: 'role', value: 'button', name: /Item Overview/i },
    fallbacks: [
      { strategy: 'text', value: 'Item Overview' },
      { strategy: 'css', value: '[id*="ItemOverview"]' },
    ]
  },

  materialField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Material', exact: true },
    fallbacks: [
      { strategy: 'label', value: 'Material', exact: true },
      { strategy: 'css', value: '[id*="Material"]:not([id*="MaterialGroup"]) input' },
    ]
  },

  plantField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Plant', exact: true },
    fallbacks: [
      { strategy: 'role', value: 'combobox', name: 'Plant', exact: true },
      { strategy: 'label', value: 'Plant', exact: true },
      { strategy: 'css', value: '[id*="Plant"] input' },
    ]
  },

  quantityField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Quantity', exact: true },
    fallbacks: [
      { strategy: 'role', value: 'textbox', name: /Quantity/ },
      { strategy: 'label', value: 'Quantity', exact: true },
      { strategy: 'css', value: '[id*="Quantity"] input' },
    ]
  },

  // --- Save button (footer toolbar) ---

  saveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Save', exact: true },
    fallbacks: [
      { strategy: 'css', value: '[id*="save"]' },
    ]
  },

  // --- Success message (toast or message strip) ---

  successMessage: {
    primary: { strategy: 'css', value: '.sapMMessageToast, .sapMMessageStrip' },
    fallbacks: [
      { strategy: 'text', value: /Purchase requisition.*created/i },
      { strategy: 'css', value: '[class*="Message"]' },
    ]
  },

  // --- Display/Change PR fields ---

  purchaseRequisitionNumberField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Purchase Requisition' },
    fallbacks: [
      { strategy: 'label', value: 'Purchase Requisition' },
      { strategy: 'css', value: '[id*="PurchaseRequisition"] input' },
    ]
  },

  runButton: {
    primary: { strategy: 'role', value: 'button', name: 'Run' },
    fallbacks: [
      { strategy: 'css', value: '[id*="btnGo"]' },
    ]
  },

  // PR table row (double-click to open)
  prTableRow: {
    primary: { strategy: 'role', value: 'row' },
    fallbacks: [
      { strategy: 'css', value: '[id*="Table"] tr' },
    ]
  },

  // Item value in table
  itemValueCell: {
    primary: { strategy: 'role', value: 'gridcell', name: /\d{5}/ },
    fallbacks: [
      { strategy: 'css', value: '[id*="Item"]' },
    ]
  },

  // Display/Change tab
  displayChangeTab: {
    primary: { strategy: 'role', value: 'button', name: /Display\/Change|Change/i },
    fallbacks: [
      { strategy: 'text', value: 'Display/Change' },
      { strategy: 'css', value: '[id*="DisplayChange"]' },
    ]
  },

  // PR Quantity field (editable in Change mode)
  prQuantityField: {
    primary: { strategy: 'role', value: 'textbox', name: /PR Quantity|Quantity/ },
    fallbacks: [
      { strategy: 'label', value: 'PR Quantity' },
      { strategy: 'css', value: '[id*="Quantity"] input' },
    ]
  },

  // --- User menu / Sign out ---

  userProfileButton: {
    primary: { strategy: 'css', value: 'button[id*="meArea"], button[title*="Profile"]' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Profile of/ },
    ]
  },

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
  generatedDate: '2026-04-24',
  generatedBy: 'Claude Code - Pattern-based generation',
  environment: 'SAP S/4HANA Cloud - my429998',
  note: 'Locators should be validated via scriptless execution for accuracy',
};

module.exports = { PurchaseRequisitionLocators, LocatorMetadata };
