/**
 * Purchase Order Locators for SAP S/4HANA Cloud Fiori
 * Module: Materials Management (MM)
 * App: Manage Purchase Orders
 * Generated: 2026-07-31 (from MCP scriptless execution)
 * Tenant: my426318.s4hana.cloud.sap
 *
 * STRATEGY: CSS selectors prioritized for stability and specificity in SAP's complex UI
 * All locators verified against live SAP system via Playwright MCP browser automation
 */

export const LOCATORS = {
  // ========== IDP LOGIN ==========
  LOGIN: {
    EMAIL_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Email, User ID or Login Name' },
      fallbacks: [
        { strategy: 'css', value: "input[placeholder*='Email']" },
        { strategy: 'css', value: "input[type='text']" }
      ]
    },
    PASSWORD_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Password' },
      fallbacks: [
        { strategy: 'css', value: "input[type='password']" }
      ]
    },
    CONTINUE_BUTTON: {
      primary: { strategy: 'role', role: 'button', name: 'Continue' },
      fallbacks: [
        { strategy: 'css', value: "button[type='submit']" }
      ]
    }
  },

  // ========== SHELL BAR (Global Navigation) ==========
  SHELL_BAR: {
    OPEN_SEARCH_BUTTON: {
      primary: { strategy: 'css', value: "[title='Open Search']" },
      fallbacks: [
        { strategy: 'role', role: 'button', name: 'Open Search' }
      ]
    },
    SEARCH_COMBOBOX: {
      primary: { strategy: 'role', role: 'combobox', name: 'Search', exact: true },
      fallbacks: [
        { strategy: 'css', value: "input[type='search']" },
        { strategy: 'css', value: "input[role='combobox']" }
      ]
    },
    USER_AVATAR_BUTTON: {
      primary: { strategy: 'css', value: "button[id$='-userActionsMenuHeaderButton']" },
      fallbacks: [
        { strategy: 'role', role: 'button', namePattern: /Avatar/ }
      ]
    }
  },

  // ========== SEARCH & NAVIGATION ==========
  SEARCH: {
    RESULT_ITEM: {
      primary: { strategy: 'css', value: "[aria-label='Manage Purchase Orders Navigation Tile']" },
      fallbacks: [
        { strategy: 'text', value: 'Manage Purchase Orders' },
        { strategy: 'role', role: 'row', name: 'Manage Purchase Orders' }
      ]
    }
  },

  // ========== POPUPS & DIALOGS ==========
  DIALOGS: {
    GUIDED_TOUR_DISMISS: {
      primary: { strategy: 'keyboard', key: 'Escape' },
      fallbacks: []
    },
    SIGN_OUT_CONFIRM_OK: {
      primary: { strategy: 'css', value: "button:has-text('OK')" },
      fallbacks: [
        { strategy: 'role', role: 'button', name: 'OK' }
      ]
    }
  },

  // ========== LIST PAGE (Manage Purchase Orders) ==========
LIST_PAGE: {
  CREATE_PO_BUTTON: {
    primary: { strategy: 'role', role: 'button', name: 'Create', exact: true },
    fallbacks: [
      { strategy: 'css', value: "button:has-text('Create')" },
      { strategy: 'css', value: "button[title*='Create']" }
    ]
  }
},

  // ========== PO CREATION FORM - HEADER ==========
  HEADER: {
    SUPPLIER_INPUT: {
      primary: { strategy: 'css', value: "input[id*='ObjectPage'][id*='Supplier']:not([id*='SupplierMaterial'])" },
      fallbacks: [
        { strategy: 'css', value: "input[id*='Supplier'][id*='input']" },
        { strategy: 'role', role: 'textbox', name: 'Supplier' }
      ],
      autoPopulates: ['Purchasing Group', 'Purchasing Organization', 'Company Code']
    },
    CURRENCY_INPUT: {
      primary: { strategy: 'css', value: "input[id*='ObjectPage'][id*='Currency']" },
      fallbacks: [
        { strategy: 'css', value: "input[id*='Currency']" },
        { strategy: 'role', role: 'textbox', name: 'Currency' }
      ]
    },
    PURCHASING_GROUP_INPUT: {
      primary: { strategy: 'css', value: "input[id*='ObjectPage'][id*='PurchasingGroup']" },
      fallbacks: [
        { strategy: 'css', value: "input[id*='PurchasingGroup']:not([id*='filterItemControl'])" },
        { strategy: 'role', role: 'textbox', name: 'Purchasing Group' }
      ]
    },
    PURCHASING_ORG_INPUT: {
      primary: { strategy: 'css', value: "input[id*='ObjectPage'][id*='PurchasingOrganization']" },
      fallbacks: [
        { strategy: 'css', value: "input[id*='PurchasingOrganization']:not([id*='filterItemControl'])" },
        { strategy: 'role', role: 'textbox', name: 'Purchasing Organization' }
      ]
    },
    COMPANY_CODE_INPUT: {
      primary: { strategy: 'css', value: "input[id*='ObjectPage'][id*='CompanyCode']" },
      fallbacks: [
        { strategy: 'css', value: "input[id*='CompanyCode']:not([id*='filterItemControl'])" },
        { strategy: 'role', role: 'textbox', name: 'Company Code' }
      ]
    }
  },

  // ========== PO CREATION FORM - ITEMS SECTION ==========
  ITEMS: {
    CREATE_BUTTON: {
      primary: { strategy: 'css', value: "button[id$='ItemsFacet::addEntry']:not([aria-hidden='true'])" },
      fallbacks: [
        { strategy: 'css', value: "button[title='Create']:has-text('Create')" },
        { strategy: 'role', role: 'button', name: 'Create', toolbarContext: 'Items' }
      ]
    },
    MATERIAL_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Material', exact: true },
      fallbacks: [
        { strategy: 'css', value: "input[id*='Material']:not([id*='MaterialGroup']):not([id*='SupplierMaterial'])" }
      ],
      autoPopulates: ['Short Text', 'Unit of Measure']
    },
    SHORT_TEXT_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Short Text' },
      fallbacks: [
        { strategy: 'css', value: "input[id*='ShortText']" }
      ]
    },
    PLANT_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Plant' },
      fallbacks: [
        { strategy: 'css', value: "input[id*='Plant']" }
      ]
    },
    ORDER_QUANTITY_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Order Quantity', exact: true },
      fallbacks: [
        { strategy: 'css', value: "input[id*='OrderQuantity']:not([id*='OrderPriceUnit'])" }
      ]
    },
    ORDER_UNIT_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Order Unit Order Quantity' },
      fallbacks: [
        { strategy: 'css', value: "input[id*='OrderUnit']" }
      ]
    },
    NET_ORDER_PRICE_INPUT: {
      primary: { strategy: 'role', role: 'textbox', name: 'Net Order Price' },
      fallbacks: [
        { strategy: 'css', value: "input[id*='NetPriceAmount']" }
      ]
    },
    PRICE_UNIT_INPUT: {
      primary: { strategy: 'css', value: "input[id*='PriceUnit']" },
      fallbacks: [
        { strategy: 'role', role: 'textbox', name: 'Price Unit' }
      ]
    },
    MATERIAL_GROUP_INPUT: {
      primary: { strategy: 'css', value: "input[id*='MaterialGroup']" },
      fallbacks: [
        { strategy: 'role', role: 'textbox', name: 'Material Group' }
      ]
    },
    SUPPLIER_MATERIAL_NUMBER_INPUT: {
      primary: { strategy: 'css', value: "input[id*='SupplierMaterialNumber']" },
      fallbacks: [
        { strategy: 'role', role: 'textbox', name: 'Supplier Material Number' }
      ]
    }
  },

  // ========== FOOTER ACTIONS ==========
  FOOTER: {
    ORDER_BUTTON: {
      primary: { strategy: 'text', value: "button:has-text('Order')" },
      fallbacks: [
        { strategy: 'role', role: 'button', name: 'Order', description: 'Default Action' }
      ]
    },
    DISCARD_DRAFT_BUTTON: {
      primary: { strategy: 'text', value: "button:has-text('Discard Draft')" },
      fallbacks: [
        { strategy: 'role', role: 'button', name: 'Discard Draft' }
      ]
    },
    MESSAGES_BUTTON: {
      primary: { strategy: 'css', value: "button[id*='messageButton']" },
      fallbacks: [
        { strategy: 'role', role: 'button', name: 'Messages' }
      ]
    }
  },

  // ========== USER MENU ==========
  USER_MENU: {
    SIGN_OUT_BUTTON: {
      primary: { strategy: 'text', value: "Sign Out" },
      fallbacks: [
        { strategy: 'css', value: "[id$='-logoutBtn']" },
        { strategy: 'role', role: 'button', name: 'Sign Out' }
      ]
    }
  }
};

/**
 * Wait times based on MCP execution observations
 * All values in milliseconds
 */
export const WAITS = {
  PAGE_LOAD: 15000,           // Initial page load (increased for stability)
  NAVIGATION: 5000,           // App navigation
  AUTO_POPULATION: 3000,      // Wait for SAP to auto-populate fields
  CALCULATION: 2000,          // Wait for SAP calculations
  DIALOG_APPEAR: 2000,        // Dialog/popup appearance
  DIALOG_DISMISS: 1000,       // After dismissing dialog
  FIELD_UPDATE: 1000,         // After field entry
  SEARCH_RESULTS: 10000,      // Search results to appear (increased to 10s for SAP Fiori search latency)
  DRAFT_CREATION: 15000,      // Draft PO creation (increased for stability)
  PO_SUBMISSION: 10000,       // PO Order button processing (increased)
  SHORT_PAUSE: 500            // General short pause
};

/**
 * URL patterns for navigation validation
 */
export const URL_PATTERNS = {
  IDP_LOGIN: /accounts\.sap\.com\/saml2\/idp\/sso/,
  FIORI_HOME: /help-autoStartTour=.*#Shell-home/,
  MANAGE_PO_LIST: /#PurchaseOrder-manage(?!&)/,
  PO_DRAFT: /IsActiveEntity=false/,
  PO_SAVED: /IsActiveEntity=true/,
  PO_NUMBER: /PurchaseOrder='(\d{10})'/
};

/**
 * Success indicators
 */
export const SUCCESS_INDICATORS = {
  PO_CREATED: {
    urlPattern: URL_PATTERNS.PO_SAVED,
    titlePattern: /^\d{10} \(Standard PO\) - Purchase Order$/
  },
  AUTO_POPULATION: {
    supplier: {
      purchasingGroup: /\(\d{3}\)$/,
      purchasingOrg: /\(\d{4}\)$/,
      companyCode: /\(\d{4}\)$/
    },
    material: {
      uom: /^[A-Z]{1,3}$/
    }
  }
};

/**
 * Helper to get Playwright locator from locator definition
 * UPDATED: Now supports primary/fallbacks structure with CSS selectors
 */
export function getPlaywrightLocator(page, locatorDef) {
  const primary = locatorDef.primary;

  if (!primary) {
    // Legacy format - fallback to old behavior
    if (locatorDef.toolbarContext) {
      return page.getByRole('toolbar', { name: locatorDef.toolbarContext, exact: true })
                 .getByLabel(locatorDef.name);
    }
    const options = { name: locatorDef.name };
    if (locatorDef.exact) options.exact = true;
    if (locatorDef.description) options.description = locatorDef.description;
    if (locatorDef.namePattern) options.name = locatorDef.namePattern;
    return page.getByRole(locatorDef.role, options);
  }

  // New primary/fallbacks structure
  try {
    switch (primary.strategy) {
      case 'css':
        return page.locator(primary.value);

      case 'text':
        return page.locator(primary.value);

      case 'role':
        const options = { name: primary.name };
        if (primary.exact) options.exact = true;
        if (primary.description) options.description = primary.description;
        if (primary.namePattern) options.name = primary.namePattern;
        return page.getByRole(primary.role, options);

      case 'keyboard':
        return null; // Keyboard actions handled separately

      default:
        throw new Error(`Unknown locator strategy: ${primary.strategy}`);
    }
  } catch (error) {
    // If primary fails, try fallbacks
    if (locatorDef.fallbacks && locatorDef.fallbacks.length > 0) {
      console.warn(`Primary locator failed, trying fallback: ${error.message}`);
      return getPlaywrightLocator(page, { primary: locatorDef.fallbacks[0] });
    }
    throw error;
  }
}

export default {
  LOCATORS,
  WAITS,
  URL_PATTERNS,
  SUCCESS_INDICATORS,
  getPlaywrightLocator
};
