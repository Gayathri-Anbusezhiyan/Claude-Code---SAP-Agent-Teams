# TC-CS-169: BOM with Maximum Number of Components

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MEDIUM
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Multiple component materials exist, are active, approved for pharmaceutical use, and are configured for plant `{TD.plant}` (number of components equals system maximum limit) |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |
| P7 | System Configuration | System maximum number of BOM components is known (typically 999 or as per system configuration) |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-EDGE-05`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Max Components Count | `{TD.maxComponentsCount}` | Maximum number of components allowed by system (e.g., 999) | Valid (edge case) |
| Component Material Array | `{TD.componentMaterialArray}` | Array of component material numbers (count equals system maximum) — entered by the user | Valid |
| Component Quantity Array | `{TD.componentQuantityArray}` | Array of component quantities corresponding to each material — entered by the user | Valid |
| Component UoM Array | `{TD.componentUoMArray}` | Array of component UoMs corresponding to each material — entered by the user | Valid |

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
| 16 | In the "Items" section, add component line items up to the system maximum count | `{TD.maxComponentsCount}` | For each component (up to maximum): Click "Create" button → Enter component material → Enter quantity → Enter UoM → Press Enter to confirm. Repeat until maximum component count is reached |
| 17 | Verify that all component line items (up to maximum count) are added successfully | — | All component line items are displayed in the Items table; total count equals `{TD.maxComponentsCount}` |
| 18 | Attempt to add one more component line item beyond the maximum count | — | Click "Create" button; observe system behavior: either (a) system prevents adding more line items, or (b) system allows adding but will reject on save |
| 19 | If system prevents adding more line items, observe the warning or message | — | A warning message appears indicating maximum number of components reached |
| 20 | Click the "Save" button in the toolbar | — | SAP begins processing the BOM creation |
| 21 | Observe the on-screen response | — | If maximum components are within system limits: A success message is displayed indicating the BOM has been created with a BOM number. If maximum exceeded: An error message is displayed stating maximum component count exceeded |
| 22 | If successful, note the BOM number from the success message or header area | — | BOM number is displayed (system-generated) |
| 23 | If successful, verify the BOM status field | — | BOM status is set to "Draft" |
| 24 | If successful, verify the BOM contains the maximum number of component line items | — | Total count of component line items equals `{TD.maxComponentsCount}` |
| 25 | If an error occurs, observe the error message content | — | Error message indicates the maximum number of BOM components has been exceeded |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- If maximum components are within system limits:
  - A unique BOM number is generated and displayed
  - The BOM is persisted with status "Draft"
  - The BOM contains the maximum number of component line items allowed by the system
  - All header and line item data are correctly saved
  - Change history entry is created
- If maximum exceeded:
  - An error message is displayed indicating maximum component count exceeded
  - The BOM is not saved
  - User is informed of the system limit

---

### Post-conditions

- If successful: SAP Bill of Material exists with the generated BOM number; BOM status is "Draft"; BOM contains maximum number of components; change history entry exists
- If error: No new BOM record exists; no change history entry is created; system validation for maximum component count is successfully enforced
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
