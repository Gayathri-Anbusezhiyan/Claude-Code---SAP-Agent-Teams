// automation/pages/sd/sales-order/sales-order.locators.js
// Source: Scriptless execution of VA01 on 2026-04-21 against SAP S/4HANA Cloud (my429998)
// VA01 is a SAP GUI for HTML transaction embedded in iframe[name="__container63-iframe"]
// All locators derived from real MCP accessibility snapshots during scriptless execution

const SalesOrderLocators = {
  // --- Launchpad: Search (hidden by default — "Focus Search" on this SAP environment) ---

  focusSearchButton: {
    primary: { strategy: 'role', value: 'button', name: 'Focus Search' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: 'Open Search' },
      { strategy: 'css', value: '[id*="shellSearch"] button' },
    ]
  },

  launchpadSearchField: {
    primary: { strategy: 'role', value: 'searchbox', name: 'Search' },
    fallbacks: [
      { strategy: 'css', value: '#sapUshellSearchField input' },
      { strategy: 'placeholder', value: 'Search' },
    ]
  },

  // --- VA01 search result (SalesDocument-create semantic object) ---

  va01SearchResult: {
    primary: { strategy: 'text', value: 'Create Sales Order - VA01' },
    fallbacks: [
      { strategy: 'role', value: 'link', name: 'Create Sales Order - VA01' },
      { strategy: 'role', value: 'row', name: 'Create Sales Order - VA01' },
    ]
  },

  // --- VA02 search result (Change Sales Order) ---

  va02SearchResult: {
    primary: { strategy: 'text', value: 'Change Sales Order - VA02' },
    fallbacks: [
      { strategy: 'role', value: 'link', name: 'Change Sales Order - VA02' },
      { strategy: 'role', value: 'row', name: 'Change Sales Order - VA02' },
    ]
  },

  // --- VA03 search result (Display Sales Order) ---

  va03SearchResult: {
    primary: { strategy: 'text', value: 'Display Sales Order - VA03' },
    fallbacks: [
      { strategy: 'role', value: 'link', name: 'Display Sales Order - VA03' },
      { strategy: 'role', value: 'row', name: 'Display Sales Order - VA03' },
    ]
  },

  // --- Guided Tour popup ---

  guidedTourLeaveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Leave Tour' },
    fallbacks: [
      { strategy: 'text', value: 'Leave Tour' },
    ]
  },

  // --- VA01 Initial Screen: Order Type ---
  // Actual SAP GUI element: textbox "Order Type Required" (NOT a combobox/dropdown)
  // Type "OR" to set Standard Order type

  orderTypeField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Order Type Required' },
    fallbacks: [
      { strategy: 'label', value: 'Order Type' },
      { strategy: 'css', value: 'input[title*="Order Type"]' },
    ]
  },

  // --- VA02/VA03 Initial Screen: Sales Order Number ---

  salesOrderNumberField: {
    primary: { strategy: 'role', value: 'textbox', name: /Sales.*Order/ },
    fallbacks: [
      { strategy: 'label', value: 'Sales Order' },
      { strategy: 'css', value: 'input[title*="Sales Order"]' },
    ]
  },

  // --- VA01 Initial Screen: Sales Organization fields ---

  salesOrganizationField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Sales Organization' },
    fallbacks: [
      { strategy: 'label', value: 'Sales Organization' },
    ]
  },

  distributionChannelField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Distribution Channel' },
    fallbacks: [
      { strategy: 'label', value: 'Distribution Channel' },
    ]
  },

  divisionField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Division' },
    fallbacks: [
      { strategy: 'label', value: 'Division' },
    ]
  },

  // --- VA01 Initial Screen: Continue button ---

  continueButton: {
    primary: { strategy: 'role', value: 'button', name: /Continue/ },
    fallbacks: [
      { strategy: 'role', value: 'button', name: 'Continue  Emphasized' },
      { strategy: 'css', value: '[title*="Continue"]' },
    ]
  },

  // --- Create Standard Order: Overview fields ---

  soldToPartyField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Sold-to party' },
    fallbacks: [
      { strategy: 'label', value: 'Sold-to party' },
    ]
  },

  shipToPartyField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Ship-to party' },
    fallbacks: [
      { strategy: 'label', value: 'Ship-to party' },
    ]
  },

  custReferenceField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Cust. Reference' },
    fallbacks: [
      { strategy: 'label', value: 'Cust. Reference' },
    ]
  },

  custRefDateField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Cust. Ref. Date' },
    fallbacks: [
      { strategy: 'label', value: 'Cust. Ref. Date' },
    ]
  },

  // --- Items grid: Material and Quantity ---
  // Scriptless: SAP GUI grid cells are <span> NOT <input>.
  // Pattern: click gridcell → wait 1s → SAP creates NEW textbox → fill the textbox
  // browser_type crashes Chrome on SAP GUI grid cells — MUST use fill approach

  materialGridCell: {
    primary: { strategy: 'role', value: 'gridcell', name: 'Material' },
    fallbacks: [
      { strategy: 'css', value: 'td[role="gridcell"][aria-label*="Material"]' },
    ]
  },

  materialInput: {
    primary: { strategy: 'role', value: 'textbox', name: 'Material' },
    fallbacks: [
      { strategy: 'label', value: 'Material' },
      { strategy: 'css', value: 'input[title*="Material"]:not([readonly])' },
    ]
  },

  orderQuantityGridCell: {
    primary: { strategy: 'role', value: 'gridcell', name: 'Order Quantity' },
    fallbacks: [
      { strategy: 'css', value: 'td[role="gridcell"][aria-label*="Order Quantity"]' },
    ]
  },

  orderQuantityInput: {
    primary: { strategy: 'role', value: 'textbox', name: 'Order Quantity' },
    fallbacks: [
      { strategy: 'label', value: 'Order Quantity' },
      { strategy: 'css', value: 'input[title*="Order Quantity"]:not([readonly])' },
    ]
  },

  // --- Save button ---

  saveButton: {
    primary: { strategy: 'role', value: 'button', name: /Save/ },
    fallbacks: [
      { strategy: 'css', value: '[title="Save (Ctrl+S)"]' },
      { strategy: 'css', value: '[title="Save"]' },
    ]
  },

  // --- Document Incomplete dialog ---
  // Scriptless: After Save, dialog title is "Save Incomplete Document" (NOT "Document Incomplete")
  // Dialog body contains text "Document Incomplete"

  documentIncompleteDialog: {
    primary: { strategy: 'text', value: 'Save Incomplete Document' },
    fallbacks: [
      { strategy: 'text', value: 'Document Incomplete' },
      { strategy: 'role', value: 'dialog', name: 'Save Incomplete Document' },
    ]
  },

  documentIncompleteEditButton: {
    primary: { strategy: 'role', value: 'button', name: 'Edit' },
    fallbacks: [
      { strategy: 'text', value: 'Edit' },
    ]
  },

  documentIncompleteSaveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Save' },
    fallbacks: [
      { strategy: 'text', value: 'Save' },
    ]
  },

  // --- Incompletion Log ---
  // Scriptless: "Select All" and "Complete Data" buttons in Incompletion Log

  selectAllButton: {
    primary: { strategy: 'role', value: 'button', name: 'Select All (F5)' },
    fallbacks: [
      { strategy: 'role', value: 'button', name: /Select All/ },
      { strategy: 'text', value: 'Select All' },
      { strategy: 'css', value: '[title*="Select All"]' },
    ]
  },

  completeDataButton: {
    primary: { strategy: 'role', value: 'button', name: 'Complete Data' },
    fallbacks: [
      { strategy: 'text', value: 'Complete Data' },
      { strategy: 'css', value: '[title*="Complete Data"]' },
    ]
  },

  // --- Weight fields (shown via Incompletion Log → Complete Data) ---

  grossWeightField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Gross Weight' },
    fallbacks: [
      { strategy: 'label', value: 'Gross Weight' },
    ]
  },

  netWeightField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Net Weight' },
    fallbacks: [
      { strategy: 'label', value: 'Net Weight' },
    ]
  },

  // --- Edit Next Data button (navigate between incomplete fields) ---

  editNextDataButton: {
    primary: { strategy: 'role', value: 'button', name: 'Edit Next Data' },
    fallbacks: [
      { strategy: 'text', value: 'Edit Next Data' },
      { strategy: 'css', value: '[title*="Edit Next Data"]' },
    ]
  },

  // --- Pricing Elements grid ---
  // Scriptless: CnTy cells are readonly by default; must use "Insert Row" to create editable row

  insertRowButton: {
    primary: { strategy: 'role', value: 'button', name: 'Insert Row' },
    fallbacks: [
      { strategy: 'text', value: 'Insert Row' },
      { strategy: 'css', value: '[title*="Insert Row"]' },
    ]
  },

  cnTypeField: {
    primary: { strategy: 'role', value: 'textbox', name: 'CnTy' },
    fallbacks: [
      { strategy: 'label', value: 'CnTy' },
      { strategy: 'css', value: 'input[title*="CnTy"]' },
    ]
  },

  amountField: {
    primary: { strategy: 'role', value: 'textbox', name: 'Amount' },
    fallbacks: [
      { strategy: 'label', value: 'Amount' },
      { strategy: 'css', value: 'input[title*="Amount"]' },
    ]
  },

  // --- Status bar message (bottom of SAP GUI screen) ---

  statusBarMessage: {
    primary: { strategy: 'css', value: '[id*="msgArea"]' },
    fallbacks: [
      { strategy: 'css', value: '[id*="statusbar"]' },
      { strategy: 'css', value: '.urMsgBarTxt' },
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
  recordedDate: '2026-04-21',
  recordedBy: 'Scriptless Execution via Playwright MCP Server',
  environment: 'SAP S/4HANA Cloud - my429998',
  browser: 'Chromium',
  resolution: '1920x1080',
  sapGuiIframeName: '__container*-iframe (wildcard — name changes per session)',
  transactionCode: 'VA01',
  notes: [
    'VA01 is SAP GUI for HTML — runs inside iframe, not native Fiori',
    'Grid cells require click → wait → re-query for NEW input → fill (NOT type)',
    'Pricing Elements grid: must use Insert Row before cells become editable',
    'browser_type crashes Chrome on SAP GUI grid cells — use fill_form/fill instead',
  ],
};

module.exports = { SalesOrderLocators, LocatorMetadata };
