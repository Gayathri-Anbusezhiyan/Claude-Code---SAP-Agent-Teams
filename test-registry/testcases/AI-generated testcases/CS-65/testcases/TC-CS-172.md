# TC-CS-172: Change Draft BOM (No New Version Created — In-Place Edit)

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       STATE_TRANSITION
**Priority:**            MEDIUM
**Severity:**            MEDIUM
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and modify Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component materials `{TD.componentMaterial1}` and `{TD.componentMaterial2}` exist, are active, and approved for pharmaceutical use |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |
| P7 | Workflow | This test requires: (1) Create BOM → (2) Save as Draft → (3) Modify Draft BOM without releasing → (4) Verify no new version created (in-place edit) |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-ST-02`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Component material number (initial) — entered by the user | Valid |
| Component Quantity 1 (Initial) | `{TD.componentQuantity1}` | Quantity of component 1 (initial) — entered by the user | Valid |
| Component Quantity 1 (Modified) | `{TD.componentQuantity1Modified}` | Modified quantity of component 1 — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for component 1 — entered by the user | Valid |

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
| 17 | In the "Component" field, enter the component material number | `{TD.componentMaterial1}` | Component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated |
| 19 | In the "Quantity" field, enter the initial component quantity | `{TD.componentQuantity1}` | Initial quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | Click the "Save" button in the toolbar | — | SAP processes the BOM creation; a success message is displayed with BOM number |
| 23 | Note the BOM number from the success message or header area | — | BOM number is displayed (e.g., BOM-002); BOM status is "Draft" |
| 24 | Note the BOM version number | — | BOM version is displayed (e.g., Version 1 or 01) |
| 25 | Do NOT release the BOM; keep it in Draft status | — | BOM remains in Draft status |
| 26 | Click the "Edit" or "Modify" button in the toolbar to modify the Draft BOM | — | BOM opens in edit mode (no new version is created since BOM is still in Draft status) |
| 27 | Verify the BOM version number remains unchanged | — | BOM version number is still the same (e.g., Version 1); no new version is created |
| 28 | In the "Items" section, locate the existing component line item | — | Existing component line item with material `{TD.componentMaterial1}` and quantity `{TD.componentQuantity1}` is displayed |
| 29 | In the "Quantity" field of the existing component, change the quantity to the modified value | `{TD.componentQuantity1Modified}` | Modified quantity is entered in the quantity field |
| 30 | Press Enter to confirm the modified quantity | — | Modified quantity is confirmed; line item is validated |
| 31 | Click the "Save" button in the toolbar | — | SAP processes the BOM modification; a success message is displayed |
| 32 | Verify the BOM status remains "Draft" | — | BOM status is still "Draft" (unchanged) |
| 33 | Verify the BOM version number remains unchanged | — | BOM version number is still the same (e.g., Version 1); no new version is created (in-place edit) |
| 34 | Verify the component quantity is updated in the same BOM version | — | Component quantity field displays the modified value `{TD.componentQuantity1Modified}` |
| 35 | Navigate to the BOM version history or version list (if available) | — | Version history screen is displayed |
| 36 | Verify that only one BOM version exists | — | Only one BOM version (Version 1) is present with status "Draft"; no additional versions are created |
| 37 | Verify the change history entry for the modification | — | Change history entry exists showing: modification timestamp, user ID `{TD.modifiedByUser}`, and object key (BOM number) |
| 38 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 39 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 40 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- BOM is created with status "Draft" (Version 1)
- BOM is modified while still in Draft status
- No new BOM version is created (in-place edit)
- BOM version number remains unchanged (Version 1)
- BOM status remains "Draft" (unchanged)
- Component quantity is updated to the modified value within the same BOM version
- Change history entries exist for BOM creation and modification (AC-6 fulfilled)
- BOM version history confirms only one version exists (Version 1, Draft)

---

### Post-conditions

- One BOM version exists in SAP for the finished product material and plant combination
- Version 1: status "Draft", contains 1 component with modified quantity
- Change history audit trail entries exist for: BOM creation and BOM modification
- No additional BOM versions are created (in-place edit confirmed)
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
