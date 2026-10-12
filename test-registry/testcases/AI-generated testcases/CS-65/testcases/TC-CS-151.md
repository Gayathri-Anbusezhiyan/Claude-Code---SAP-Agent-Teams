# TC-CS-151: Create BOM for Finished Pharmaceutical Product with Active Ingredients and Excipient Components

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterial1}` (active ingredient) exists, is active, approved for pharmaceutical use, and is configured for plant `{TD.plant}` |
| P5 | Master Data | Component material `{TD.componentMaterial2}` (excipient) exists, is active, approved for pharmaceutical use, and is configured for plant `{TD.plant}` |
| P6 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Active ingredient component material number — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of active ingredient per finished product unit — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for component 1 — entered by the user | Valid |
| Component Material 2 | `{TD.componentMaterial2}` | Excipient component material number — entered by the user | Valid |
| Component Quantity 2 | `{TD.componentQuantity2}` | Quantity of excipient per finished product unit — entered by the user | Valid |
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
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedProductDesc}` is auto-populated; material type is verified as FERT or HALB |
| 12 | In the "Plant" header field, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description `{TD.plantDesc}` is auto-populated |
| 14 | In the "BOM Usage" field, select the usage type | `{TD.bomUsage}` | BOM Usage is set to "Production" |
| 15 | In the "Valid From" date field, enter the validity start date | `{TD.validFromDate}` | Valid From date is populated with the specified date |
| 16 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table for the first component |
| 17 | In the "Component" field of the first line item, enter the active ingredient material number | `{TD.componentMaterial1}` | Component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated; base UoM `{TD.componentBaseUoM1}` is auto-filled; material status is verified as active and approved |
| 19 | In the "Quantity" field of the first line item, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field of the first line item, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated (auto-filled from material master or entered manually) |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | Click the "Create" button below the Items table again | — | A new empty line item row appears for the second component (excipient) |
| 23 | In the "Component" field of the second line item, enter the excipient material number | `{TD.componentMaterial2}` | Component material number is entered into the field |
| 24 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc2}` is auto-populated; base UoM `{TD.componentBaseUoM2}` is auto-filled; material status is verified as active and approved |
| 25 | In the "Quantity" field of the second line item, enter the component quantity | `{TD.componentQuantity2}` | Quantity is populated in the line item |
| 26 | In the "UoM" field of the second line item, verify or enter the unit of measure | `{TD.componentUoM2}` | UoM is populated (auto-filled from material master or entered manually) |
| 27 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 28 | Click the "Save" button in the toolbar | — | SAP begins processing the BOM creation |
| 29 | Observe the on-screen confirmation response | — | A success message is displayed indicating the BOM has been created with a BOM number |
| 30 | Note the BOM number from the success message or the header area | — | BOM number is displayed (system-generated, typically 8-digit alphanumeric) |
| 31 | Verify the BOM status field | — | BOM status is set to "Draft" (initial status after creation) |
| 32 | Navigate to the "Change History" or "Change Log" tab if available | — | Change History tab is accessible |
| 33 | Verify the change history entry | — | An audit trail entry is present showing: creation timestamp, user ID `{TD.createdByUser}`, and object key (BOM number) |
| 34 | Navigate back to the BOM list screen | — | BOM list screen is displayed |
| 35 | Search for the newly created BOM using the BOM number noted in step 30 | — | The created BOM appears in the list with status "Draft" |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique BOM number is generated by SAP and displayed in the confirmation message
- The BOM is persisted in SAP with status "Draft" (initial status before release)
- All header data (Finished Product Material, Plant, BOM Usage, Valid From) is correctly stored
- All component line items (Component Material, Quantity, UoM) are correctly stored
- Each component references an approved, active material master record (AC-2 fulfilled)
- A change history entry is created capturing: creation timestamp, user ID, and BOM number (AC-6 fulfilled)
- The created BOM appears in the "Manage Bills of Material" list and can be viewed

---

### Post-conditions

- SAP Bill of Material exists with the generated BOM number
- BOM status is "Draft"
- Finished product material, plant, and BOM usage are correctly recorded in the BOM header
- Two component line items exist with correct material numbers, quantities, and UoMs
- All component materials are active and approved as per material master status
- Change history audit trail entry exists for BOM creation
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
