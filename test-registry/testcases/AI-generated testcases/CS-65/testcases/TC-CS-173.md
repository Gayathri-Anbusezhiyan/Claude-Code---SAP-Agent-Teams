# TC-CS-173: Release New BOM Version — Verify Status Transition (Draft → Released)

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       STATE_TRANSITION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create, release, and manage Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterial1}` exists, is active, approved for pharmaceutical use, and is configured for plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |
| P7 | Workflow | This test requires: (1) Create BOM → (2) Save as Draft → (3) Release BOM → (4) Verify status transition to Released |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-ST-03`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Component material number — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of component per finished product unit — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for component — entered by the user | Valid |

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
| 17 | In the "Component" field of the line item, enter the component material number | `{TD.componentMaterial1}` | Component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated; base UoM `{TD.componentBaseUoM1}` is auto-filled |
| 19 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | Click the "Save" button in the toolbar | — | SAP processes the BOM creation; a success message is displayed with BOM number |
| 23 | Note the BOM number from the success message or header area | — | BOM number is displayed (e.g., BOM-003) |
| 24 | Verify the BOM status field | — | BOM status is "Draft" (initial status after creation) |
| 25 | Note the BOM version number | — | BOM version is displayed (e.g., Version 1 or 01) |
| 26 | Click the "Release" button in the toolbar (or access Release function via menu) | — | Release confirmation dialog may appear asking to confirm the release action |
| 27 | Confirm the Release action | — | SAP begins processing the BOM release |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed indicating the BOM has been released successfully |
| 29 | Verify the BOM status field after release | — | BOM status has transitioned from "Draft" to "Released" (status transition confirmed) |
| 30 | Verify the BOM version number remains unchanged | — | BOM version number is still the same (e.g., Version 1); no new version is created by the release action |
| 31 | Navigate to the "Change History" or "Change Log" tab if available | — | Change History tab is accessible |
| 32 | Verify the change history entries | — | Change history contains entries for: (1) BOM creation (Draft), (2) BOM release (status change to Released); each entry shows timestamp, user ID `{TD.releasedByUser}`, and BOM number (AC-6 fulfilled) |
| 33 | Navigate back to the BOM list screen | — | BOM list screen is displayed |
| 34 | Search for the BOM using the BOM number noted in step 23 | — | The BOM appears in the list with status "Released" |
| 35 | Verify that process orders can now reference this BOM (if applicable, check in "Manage Process Orders" app or reference in planning documents) | — | BOM with status "Released" is available for production planning and process order creation (AC-5 fulfilled) |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- BOM is created with status "Draft" (Version 1)
- BOM is successfully released; status transitions from "Draft" to "Released" (AC-4 fulfilled)
- BOM version number remains unchanged (Version 1)
- Change history entries exist for: (1) BOM creation, (2) BOM release (AC-6 fulfilled)
- Released BOM is available for production planning and process order creation (AC-5 fulfilled)
- No new BOM version is created by the release action (version remains unchanged)

---

### Post-conditions

- SAP Bill of Material exists with the generated BOM number
- BOM status is "Released"
- BOM version is Version 1
- Finished product material, plant, and BOM usage are correctly recorded in the BOM header
- One component line item exists with correct material number, quantity, and UoM
- Change history audit trail entries exist for: BOM creation and BOM release
- BOM is available for production planning and process order creation
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
