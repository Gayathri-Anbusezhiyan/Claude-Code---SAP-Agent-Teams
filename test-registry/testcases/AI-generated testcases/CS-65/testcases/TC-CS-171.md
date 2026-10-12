# TC-CS-171: Modify Released BOM — Verify New Version Created (Draft Status), Old Version Remains Released

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       STATE_TRANSITION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create, modify, and release Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component materials `{TD.componentMaterial1}` and `{TD.componentMaterial2}` exist, are active, and approved for pharmaceutical use |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |
| P7 | Workflow | This test requires: (1) Create BOM → (2) Save as Draft → (3) Release BOM → (4) Modify Released BOM → (5) Verify new version created |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-ST-01`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Component material number (initial) — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of component 1 (initial) — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for component 1 — entered by the user | Valid |
| Component Material 2 | `{TD.componentMaterial2}` | Component material number to be added in new version — entered by the user | Valid |
| Component Quantity 2 | `{TD.componentQuantity2}` | Quantity of component 2 — entered by the user | Valid |
| Component UoM 2 | `{TD.componentUoM2}` | Unit of measure for component 2 — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Bills of Material" | — | Search results appear listing the "Manage Bills of Material" application |
| 8 | Click "Manage Bills of Material" from the search results | — | "Manage Bills of Material" application opens displaying the BOM list screen |
| 9 | Click the "Create" button in the application toolbar | — | New BOM creation form opens in edit mode |
| 10 | In the "Material" header field, enter the finished product material number | `{TD.finishedProductMaterial}` | Finished product material number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedProductDesc}` is auto-populated |
| 12 | In the "Plant" header field, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description `{TD.plantDesc}` is auto-populated |
| 14 | In the "BOM Usage" field, select the usage type | `{TD.bomUsage}` | BOM Usage is set to "Production" |
| 15 | In the "Valid From" date field, enter the validity start date | `{TD.validFromDate}` | Valid From date is populated with the specified date |
| 16 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 17 | In the "Component" field, enter the first component material number | `{TD.componentMaterial1}` | Component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated |
| 19 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | Click the "Save" button in the toolbar | — | SAP processes the BOM creation; a success message is displayed with BOM number |
| 23 | Note the BOM number from the success message or header area | — | BOM number is displayed (e.g., BOM-001); BOM status is "Draft" |
| 24 | Click the "Release" button in the toolbar (or access Release function) | — | Release confirmation dialog may appear |
| 25 | Confirm the Release action | — | SAP processes the release; a success message is displayed indicating the BOM has been released |
| 26 | Verify the BOM status field | — | BOM status is now "Released" (status transition: Draft → Released) |
| 27 | Note the BOM version number | — | BOM version is displayed (e.g., Version 1 or 01) |
| 28 | Click the "Edit" or "Modify" button in the toolbar to modify the Released BOM | — | A confirmation message may appear stating that modifying a Released BOM will create a new version |
| 29 | Confirm the modification action | — | SAP creates a new BOM version in edit mode (new draft version); old version remains Released |
| 30 | Verify the new BOM version number and status | — | New BOM version number is displayed (e.g., Version 2 or 02); status is "Draft" |
| 31 | In the "Items" section, click the "Create" button to add a second component | — | A new empty line item row appears in the Items table |
| 32 | In the "Component" field of the new line item, enter the second component material number | `{TD.componentMaterial2}` | Component material number is entered into the field |
| 33 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc2}` is auto-populated |
| 34 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity2}` | Quantity is populated in the line item |
| 35 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM2}` | UoM is populated |
| 36 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 37 | Click the "Save" button in the toolbar | — | SAP processes the BOM modification; a success message is displayed |
| 38 | Verify the new version status | — | New BOM version status is "Draft" |
| 39 | Navigate to the BOM version history or version list (if available) | — | Version history screen is displayed |
| 40 | Verify that the old version still exists with status "Released" | — | Old version (Version 1) is present with status "Released"; new version (Version 2) is present with status "Draft" |
| 41 | Verify the change history entry for the new version | — | Change history entry exists showing: modification timestamp, user ID `{TD.modifiedByUser}`, and BOM version number |
| 42 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 43 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 44 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Initial BOM is created with status "Draft" (Version 1)
- BOM is successfully released; status transitions to "Released" (Version 1)
- When the Released BOM is modified, SAP creates a new BOM version (Version 2) with status "Draft"
- Old BOM version (Version 1) remains with status "Released" (unchanged)
- New BOM version (Version 2) contains the modification (additional component)
- Change history entries exist for both BOM creation, release, and new version creation (AC-6 fulfilled)
- BOM version history correctly reflects: Version 1 (Released), Version 2 (Draft)

---

### Post-conditions

- Two BOM versions exist in SAP for the same finished product material and plant combination
- Version 1: status "Released", contains 1 component
- Version 2: status "Draft", contains 2 components
- Change history audit trail entries exist for: BOM creation, BOM release, and BOM version creation
- No application-level errors or critical warnings remain outstanding

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
