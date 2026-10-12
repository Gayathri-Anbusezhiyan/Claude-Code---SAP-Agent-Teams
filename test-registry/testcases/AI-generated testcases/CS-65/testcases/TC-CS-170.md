# TC-CS-170: Maximum Number of Alternatives Per Component Item

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
| P4 | Master Data | Primary component material `{TD.componentMaterial1}` exists, is active, and approved for pharmaceutical use |
| P5 | Master Data | Multiple substitute/alternative component materials exist, are active, approved for pharmaceutical use, and are configured for plant `{TD.plant}` (number of alternatives equals system maximum limit) |
| P6 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |
| P8 | System Configuration | System maximum number of alternative components per BOM item is known (typically 99 or as per system configuration) |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-EDGE-06`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Primary component material number — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of primary component per finished product unit — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for primary component — entered by the user | Valid |
| Max Alternatives Count | `{TD.maxAlternativesCount}` | Maximum number of alternative components allowed per BOM item (e.g., 99) | Valid (edge case) |
| Alternative Material Array | `{TD.alternativeMaterialArray}` | Array of alternative component material numbers (count equals system maximum) — entered by the user | Valid |
| Alternative Quantity Array | `{TD.alternativeQuantityArray}` | Array of alternative component quantities corresponding to each material — entered by the user | Valid |
| Alternative UoM Array | `{TD.alternativeUoMArray}` | Array of alternative component UoMs corresponding to each material — entered by the user | Valid |

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
| 17 | In the "Component" field of the line item, enter the primary component material number | `{TD.componentMaterial1}` | Primary component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated |
| 19 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | In the same line item, access the alternative/substitute component function (e.g., click "Add Alternative" or expand alternatives section) | — | Alternative component entry section appears for the line item |
| 23 | Add alternative components up to the system maximum count | `{TD.maxAlternativesCount}` | For each alternative (up to maximum): Enter alternative material → Enter quantity → Enter UoM → Confirm entry. Repeat until maximum alternative count is reached |
| 24 | Verify that all alternative components (up to maximum count) are added successfully | — | All alternative components are displayed; total count equals `{TD.maxAlternativesCount}` |
| 25 | Attempt to add one more alternative component beyond the maximum count | — | Attempt to add another alternative; observe system behavior: either (a) system prevents adding more alternatives, or (b) system allows adding but will reject on save |
| 26 | If system prevents adding more alternatives, observe the warning or message | — | A warning message appears indicating maximum number of alternatives reached |
| 27 | Click the "Save" button in the toolbar | — | SAP begins processing the BOM creation |
| 28 | Observe the on-screen response | — | If maximum alternatives are within system limits: A success message is displayed indicating the BOM has been created with a BOM number. If maximum exceeded: An error message is displayed stating maximum alternative count exceeded |
| 29 | If successful, note the BOM number from the success message or header area | — | BOM number is displayed (system-generated) |
| 30 | If successful, verify the BOM status field | — | BOM status is set to "Draft" |
| 31 | If successful, verify the BOM component contains the maximum number of alternative components | — | Total count of alternative components for the line item equals `{TD.maxAlternativesCount}` |
| 32 | If an error occurs, observe the error message content | — | Error message indicates the maximum number of alternative components per BOM item has been exceeded |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- If maximum alternatives are within system limits:
  - A unique BOM number is generated and displayed
  - The BOM is persisted with status "Draft"
  - The BOM component contains the maximum number of alternative/substitute components allowed by the system
  - All header, component, and alternative data are correctly saved
  - Change history entry is created
- If maximum exceeded:
  - An error message is displayed indicating maximum alternative count per component exceeded
  - The BOM is not saved
  - User is informed of the system limit

---

### Post-conditions

- If successful: SAP Bill of Material exists with the generated BOM number; BOM status is "Draft"; BOM component contains maximum number of alternatives; change history entry exists
- If error: No new BOM record exists; no change history entry is created; system validation for maximum alternative count per component is successfully enforced
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
