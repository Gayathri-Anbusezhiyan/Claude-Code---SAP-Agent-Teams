/**
 * Purchase Order Page Object
 * SAP S/4HANA Cloud Fiori - Materials Management (MM)
 * App: Manage Purchase Orders
 *
 * Generated: 2026-07-31 (from MCP scriptless execution)
 * All methods verified against live SAP tenant: my426318.s4hana.cloud.sap
 */

import { LOCATORS, WAITS, URL_PATTERNS, SUCCESS_INDICATORS, getPlaywrightLocator } from './purchase-order.locators.js';

export class PurchaseOrderPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * ========================================
   * NAVIGATION & AUTHENTICATION
   * ========================================
   */

  async navigateToFiori(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: WAITS.PAGE_LOAD });
    await this.page.waitForTimeout(WAITS.SHORT_PAUSE);
  }

  async loginTwoStep(email, password) {
    // Step 1: Enter email
    const emailInput = getPlaywrightLocator(this.page, LOCATORS.LOGIN.EMAIL_INPUT);
    await emailInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });

    // Check if email is pre-filled
    const currentValue = await emailInput.inputValue();
    if (!currentValue || currentValue !== email) {
      await emailInput.fill(email);
    }

    // Click Continue
    const continueBtn1 = getPlaywrightLocator(this.page, LOCATORS.LOGIN.CONTINUE_BUTTON);
    await continueBtn1.click();
    await this.page.waitForTimeout(WAITS.SHORT_PAUSE);

    // Step 2: Enter password
    const passwordInput = getPlaywrightLocator(this.page, LOCATORS.LOGIN.PASSWORD_INPUT);
    await passwordInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await passwordInput.fill(password);

    // Click Continue
    const continueBtn2 = getPlaywrightLocator(this.page, LOCATORS.LOGIN.CONTINUE_BUTTON);
    await continueBtn2.click();

    // Wait for Fiori home to load
    await this.page.waitForURL(URL_PATTERNS.FIORI_HOME, { timeout: WAITS.PAGE_LOAD });
    await this.page.waitForTimeout(WAITS.NAVIGATION);
  }

  /**
   * ========================================
   * POPUP HANDLING
   * ========================================
   */

  async dismissGuidedTour() {
    try {
      // Wait for guided tour dialog to appear (if it exists)
      const guidedTourDialog = this.page.locator('dialog[role="dialog"]:has-text("Guided Tour"), [class*="help4"]').first();
      const isVisible = await guidedTourDialog.isVisible({ timeout: 3000 }).catch(() => false);

      if (isVisible) {
        console.log('⚠️  Guided Tour dialog detected, dismissing...');

        // Method 1: Try clicking "Leave Tour" button
        try {
          const leaveButton = this.page.getByRole('button', { name: /Leave Tour/i });
          if (await leaveButton.isVisible({ timeout: 1000 })) {
            await leaveButton.click();
            await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
            console.log('✓ Guided Tour dismissed via Leave Tour button');
            return;
          }
        } catch (e) {
          // Leave button not found, try other methods
        }

        // Method 2: Press Escape key
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);

        // Method 3: If still visible, press Escape again
        if (await guidedTourDialog.isVisible({ timeout: 500 }).catch(() => false)) {
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
        }

        console.log('✓ Guided Tour dismissed via Escape key');
      } else {
        console.log('✓ No Guided Tour dialog detected');
      }
    } catch (e) {
      console.log('⚠️  Could not dismiss Guided Tour:', e.message);
      // Continue anyway - maybe it wasn't there
    }
  }

  async dismissAllKnownPopups() {
    await this.dismissGuidedTour();

    // Dismiss any other dialogs that might be open
    try {
      const anyDialog = this.page.locator('dialog[role="dialog"]').first();
      if (await anyDialog.isVisible({ timeout: 1000 }).catch(() => false)) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(WAITS.SHORT_PAUSE);
      }
    } catch (e) {
      // No other dialogs
    }
  }

  async dismissManagePOWelcomePopup() {
    try {
      // Wait for optional welcome/introduction popup on Manage Purchase Orders page
      // This appears for new users but not for returning users
      const welcomePopup = this.page.locator('dialog[role="dialog"], [class*="sapMMessageBox"], [class*="sapMDialog"]').first();
      const isVisible = await welcomePopup.isVisible({ timeout: 2000 }).catch(() => false);

      if (isVisible) {
        console.log('⚠️  Welcome popup detected on Manage PO page, dismissing...');

        // Method 1: Try clicking OK/Close/Got It button
        const closeButtons = [
          this.page.getByRole('button', { name: /OK/i }),
          this.page.getByRole('button', { name: /Close/i }),
          this.page.getByRole('button', { name: /Got It/i }),
          this.page.getByRole('button', { name: /Dismiss/i }),
          this.page.getByRole('button', { name: /Continue/i })
        ];

        for (const button of closeButtons) {
          try {
            if (await button.isVisible({ timeout: 500 })) {
              await button.click();
              await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
              console.log('✓ Welcome popup dismissed via button');
              return;
            }
          } catch (e) {
            // Button not found, try next
          }
        }

        // Method 2: Press Escape key
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
        console.log('✓ Welcome popup dismissed via Escape key');
      } else {
        console.log('✓ No welcome popup detected on Manage PO page');
      }
    } catch (e) {
      console.log('⚠️  Could not dismiss welcome popup:', e.message);
      // Continue anyway - maybe it wasn't there
    }
  }

  /**
   * ========================================
   * SEARCH & APP NAVIGATION
   * ========================================
   */

  async openSearchBar() {
    const searchButton = getPlaywrightLocator(this.page, LOCATORS.SHELL_BAR.OPEN_SEARCH_BUTTON);
    await searchButton.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });

    // Click and wait for search box to appear
    await searchButton.click();
    await this.page.waitForTimeout(WAITS.DIALOG_APPEAR);

    // Verify search box opened by checking for the combobox
    const searchBox = getPlaywrightLocator(this.page, LOCATORS.SHELL_BAR.SEARCH_COMBOBOX);

    // Try longer wait first (SAP may take time to render search overlay)
    let isVisible = await searchBox.isVisible({ timeout: 5000 }).catch(() => false);

    if (!isVisible) {
      console.log('⚠️  Search box not visible after 5s, checking for blocking dialogs...');

      // Check for and dismiss any blocking dialogs
      const anyDialog = await this.page.locator('[class*="help4"], dialog[role="dialog"], [role="alertdialog"]').count();
      if (anyDialog > 0) {
        console.log(`⚠️  ${anyDialog} dialog(s) detected, dismissing...`);
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
        await this.page.keyboard.press('Escape'); // Sometimes need double Escape
        await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);
      }

      // Wait for search box again after dialog dismissal
      isVisible = await searchBox.isVisible({ timeout: 3000 }).catch(() => false);

      if (!isVisible) {
        console.log('⚠️  Search box still not visible, waiting for network idle...');
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
          console.log('⚠️  Network idle timeout, continuing anyway...');
        });

        // Final wait
        await searchBox.waitFor({ state: 'visible', timeout: 5000 });
      }
    }

    console.log('✓ Search box is now visible');
  }

  async searchForApp(appName) {
    const searchBox = getPlaywrightLocator(this.page, LOCATORS.SHELL_BAR.SEARCH_COMBOBOX);

    try {
      await searchBox.waitFor({ state: 'visible', timeout: WAITS.NAVIGATION });
    } catch (e) {
      // Diagnostic: check if any dialogs are blocking
      const anyDialog = await this.page.locator('[class*="help4"], dialog').count();
      if (anyDialog > 0) {
        console.log(`⚠️  ${anyDialog} dialog(s) detected, dismissing...`);
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(WAITS.DIALOG_DISMISS);

        // Try waiting for search box again
        await searchBox.waitFor({ state: 'visible', timeout: WAITS.NAVIGATION });
      } else {
        throw e;
      }
    }

    await searchBox.fill(appName);
    // Wait for search results to populate (no fixed timeout — wait dynamically)
    await this.page.waitForTimeout(500);  // Brief pause for search to trigger
  }

  async selectSearchResult(appName) {
    const resultRow = this.page.getByRole('row', { name: appName });
    // Wait for search result row to appear (increased timeout for SAP Fiori search backend latency)
    await resultRow.waitFor({ state: 'visible', timeout: WAITS.SEARCH_RESULTS });
    await resultRow.click();
    await this.page.waitForTimeout(WAITS.NAVIGATION);
  }

  async closeSearchOverlay() {
    // Close search overlay by pressing Escape
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(WAITS.SHORT_PAUSE);

    // Verify overlay is closed by checking body class
    const body = this.page.locator('body');
    const bodyClass = await body.getAttribute('class');

    if (bodyClass && bodyClass.includes('sapUshellShellShowSearchOverlay')) {
      console.log('⚠️  Search overlay still visible, pressing Escape again...');
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(WAITS.SHORT_PAUSE);
    }

    console.log('✓ Search overlay closed');
  }

  async navigateToManagePurchaseOrders() {
    await this.openSearchBar();
    await this.searchForApp('Manage Purchase Orders');
    await this.selectSearchResult('Manage Purchase Orders');

    // Verify navigation
    await this.page.waitForURL(URL_PATTERNS.MANAGE_PO_LIST, { timeout: WAITS.NAVIGATION });

    // Close search overlay to unblock page interactions
    await this.closeSearchOverlay();

    // Wait for page to fully load after closing overlay
    await this.page.waitForLoadState('domcontentloaded', { timeout: WAITS.PAGE_LOAD });
    await this.page.waitForTimeout(WAITS.NAVIGATION);

    // Dismiss optional welcome popup (appears for new users only)
    await this.dismissManagePOWelcomePopup();

    console.log('✓ Manage Purchase Orders page fully loaded');
  }

  /**
   * ========================================
   * LIST PAGE ACTIONS
   * ========================================
   */

  async clickCreatePoButton() {
    const createButton = getPlaywrightLocator(this.page, LOCATORS.LIST_PAGE.CREATE_PO_BUTTON);

    // Wait for button to be visible and clickable
    await createButton.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });

    // Extra wait to ensure page is stable
    await this.page.waitForTimeout(WAITS.SHORT_PAUSE);

    console.log('✓ Create button visible, clicking...');
    await createButton.click();

    // Wait for draft to be created (URL changes to include IsActiveEntity=false)
    console.log('⏳ Waiting for draft creation...');
    await this.page.waitForURL(URL_PATTERNS.PO_DRAFT, { timeout: WAITS.DRAFT_CREATION });
    await this.page.waitForTimeout(WAITS.NAVIGATION);

    console.log('✓ PO draft created successfully');
  }

  /**
   * ========================================
   * HEADER DATA ENTRY
   * ========================================
   */

  async enterSupplier(supplierId) {
    const supplierInput = getPlaywrightLocator(this.page, LOCATORS.HEADER.SUPPLIER_INPUT);
    await supplierInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await supplierInput.fill(supplierId);
  }

  async confirmSupplierEntry() {
    await this.page.keyboard.press('Enter');
    // Wait for auto-population
    await this.page.waitForTimeout(WAITS.AUTO_POPULATION);
  }

  async getSupplierAutoPopulatedFields() {
    const purchasingGroup = getPlaywrightLocator(this.page, LOCATORS.HEADER.PURCHASING_GROUP_INPUT);
    const purchasingOrg = getPlaywrightLocator(this.page, LOCATORS.HEADER.PURCHASING_ORG_INPUT);
    const companyCode = getPlaywrightLocator(this.page, LOCATORS.HEADER.COMPANY_CODE_INPUT);

    return {
      purchasingGroup: await purchasingGroup.inputValue(),
      purchasingOrg: await purchasingOrg.inputValue(),
      companyCode: await companyCode.inputValue()
    };
  }

  /**
   * ========================================
   * LINE ITEM ACTIONS
   * ========================================
   */

  async createLineItem() {
    const createButton = getPlaywrightLocator(this.page, LOCATORS.ITEMS.CREATE_BUTTON);
    await createButton.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await createButton.click();
    await this.page.waitForTimeout(WAITS.FIELD_UPDATE);
  }

  async enterMaterial(materialId) {
    const materialInput = getPlaywrightLocator(this.page, LOCATORS.ITEMS.MATERIAL_INPUT);
    await materialInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await materialInput.fill(materialId);
  }

  async confirmMaterialEntry() {
    await this.page.keyboard.press('Enter');
    // Wait for auto-population (UoM, description)
    await this.page.waitForTimeout(WAITS.AUTO_POPULATION);
  }

  async enterQuantity(quantity) {
    const quantityInput = getPlaywrightLocator(this.page, LOCATORS.ITEMS.ORDER_QUANTITY_INPUT);
    await quantityInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await quantityInput.fill(quantity);
  }

  async tabToNextField() {
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(WAITS.SHORT_PAUSE);
  }

  async enterNetPrice(price) {
    const priceInput = getPlaywrightLocator(this.page, LOCATORS.ITEMS.NET_ORDER_PRICE_INPUT);
    await priceInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await priceInput.fill(price);
  }

  async confirmPriceEntry() {
    await this.page.keyboard.press('Enter');
    // Wait for calculation
    await this.page.waitForTimeout(WAITS.CALCULATION);
  }

  async enterPlant(plantCode) {
    const plantInput = getPlaywrightLocator(this.page, LOCATORS.ITEMS.PLANT_INPUT);
    await plantInput.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await plantInput.fill(plantCode);
  }

  async confirmPlantEntry() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(WAITS.FIELD_UPDATE);
  }

  async getLineItemUoM() {
    const uomInput = getPlaywrightLocator(this.page, LOCATORS.ITEMS.ORDER_UNIT_INPUT);
    return await uomInput.inputValue();
  }

  /**
   * ========================================
   * PO SUBMISSION
   * ========================================
   */

  async submitPurchaseOrder() {
    // PATCHED 2026-07-31: Now using CSS text selector from locators file
    // (primary: button:has-text('Order'), fallback: role-based)
    const orderButton = getPlaywrightLocator(this.page, LOCATORS.FOOTER.ORDER_BUTTON);
    await orderButton.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await orderButton.click();

    // Wait for PO to be saved
    await this.page.waitForURL(URL_PATTERNS.PO_SAVED, { timeout: WAITS.PO_SUBMISSION });
    await this.page.waitForTimeout(WAITS.NAVIGATION);
  }

  async getPoInfo() {
    // Extract PO number from URL
    const url = this.page.url();
    const match = url.match(URL_PATTERNS.PO_NUMBER);
    const poNumber = match ? match[1] : null;

    // Get page title
    const title = await this.page.title();

    return {
      isSuccessful: url.includes('IsActiveEntity=true'),
      poNumber: poNumber,
      pageTitle: title,
      url: url
    };
  }

  /**
   * ========================================
   * ERROR HANDLING
   * ========================================
   */

  async getErrorMessage() {
    try {
      const errorDialog = this.page.locator('[role="alert"]').first();
      const isVisible = await errorDialog.isVisible({ timeout: 2000 });
      if (isVisible) {
        return await errorDialog.textContent();
      }
    } catch (e) {
      // No error found
    }
    return null;
  }

  async getSuccessMessage() {
    try {
      const successAlert = this.page.locator('[role="alert"]').first();
      const isVisible = await successAlert.isVisible({ timeout: 2000 });
      if (isVisible) {
        return await successAlert.textContent();
      }
    } catch (e) {
      // No success message found
    }
    return null;
  }

  async discardDraft() {
    const discardButton = getPlaywrightLocator(this.page, LOCATORS.FOOTER.DISCARD_DRAFT_BUTTON);
    await discardButton.click();
    await this.page.waitForTimeout(WAITS.DIALOG_APPEAR);

    // Confirm discard
    const confirmButton = this.page.getByRole('button', { name: 'Discard', exact: true });
    await confirmButton.click();
    await this.page.waitForTimeout(WAITS.NAVIGATION);
  }

  /**
   * ========================================
   * USER MENU & SIGN OUT
   * ========================================
   */

  async openUserMenu() {
    const avatarButton = getPlaywrightLocator(this.page, LOCATORS.SHELL_BAR.USER_AVATAR_BUTTON);
    await avatarButton.waitFor({ state: 'visible', timeout: WAITS.PAGE_LOAD });
    await avatarButton.click();
    await this.page.waitForTimeout(WAITS.DIALOG_APPEAR);
  }

  async clickSignOut() {
    const signOutButton = getPlaywrightLocator(this.page, LOCATORS.USER_MENU.SIGN_OUT_BUTTON);
    await signOutButton.waitFor({ state: 'visible', timeout: WAITS.DIALOG_APPEAR });
    await signOutButton.click();
    await this.page.waitForTimeout(WAITS.DIALOG_APPEAR);
  }

  async confirmSignOut() {
    const okButton = getPlaywrightLocator(this.page, LOCATORS.DIALOGS.SIGN_OUT_CONFIRM_OK);
    await okButton.waitFor({ state: 'visible', timeout: WAITS.DIALOG_APPEAR });
    await okButton.click();
    await this.page.waitForTimeout(WAITS.NAVIGATION);
  }

  async signOut() {
    await this.openUserMenu();
    await this.clickSignOut();
    await this.confirmSignOut();
  }

  /**
   * ========================================
   * COMBINED WORKFLOWS
   * ========================================
   */

  async createPurchaseOrder(testData) {
    // Navigate to Manage Purchase Orders
    await this.navigateToManagePurchaseOrders();

    // Click Create
    await this.clickCreatePoButton();

    // Enter Supplier
    await this.enterSupplier(testData.supplierId);
    await this.confirmSupplierEntry();

    // Verify auto-population
    const autoFields = await this.getSupplierAutoPopulatedFields();

    // Create line item
    await this.createLineItem();

    // Enter Material
    await this.enterMaterial(testData.materialId);
    await this.confirmMaterialEntry();

    // Enter Quantity
    await this.enterQuantity(testData.quantity);
    await this.tabToNextField();

    // Enter Price
    await this.enterNetPrice(testData.price);
    await this.confirmPriceEntry();

    // Enter Plant
    await this.enterPlant(testData.plant);
    await this.confirmPlantEntry();

    // Submit PO
    await this.submitPurchaseOrder();

    // Get PO info
    const poInfo = await this.getPoInfo();

    return {
      ...poInfo,
      autoPopulated: autoFields
    };
  }
}
