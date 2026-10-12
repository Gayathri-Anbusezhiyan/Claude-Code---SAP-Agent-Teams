# TC-CS-165: Minimum Component Quantity (Smallest Precision)

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MEDIUM
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterial1}` exists, is active, approved for pharmaceutical use, and is configured for plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-EDGE-01`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Component material number — entered by the user | Valid |
| Component Quantity 1 | `{TD.minComponentQuantity}` | Minimum component quantity (e.g., 0.001 or system smallest precision) — entered by the user | Valid (edge case) |
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
| 19 | In the "Quantity" field, enter the minimum component quantity | `{TD.minComponentQuantity}` | Minimum quantity (e.g., 0.001) is entered |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | SAP validates the minimum quantity; if within system precision limits, the quantity is accepted; if below precision, an error or warning may appear |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the BOM creation |
| 23 | Observe the on-screen response | — | If the minimum quantity is valid: A success message is displayed indicating the BOM has been created with a BOM number. If the quantity is below system precision: An error message is displayed stating the quantity is below the minimum allowed precision |
| 24 | If successful, note the BOM number from the success message or header area | — | BOM number is displayed (system-generated) |
| 25 | If successful, verify the BOM status field | — | BOM status is set to "Draft" |
| 26 | If successful, verify the component quantity is stored correctly | — | Component quantity field displays the minimum quantity value `{TD.minComponentQuantity}` |
| 27 | If an error occurs, observe the error message content | — | Error message indicates the quantity is below the minimum allowed precision for the UoM or system configuration |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- If minimum quantity is within system precision limits:
  - A unique BOM number is generated and displayed
  - The BOM is persisted with status "Draft"
  - Component quantity is stored as the minimum value (e.g., 0.001)
  - All header and line item data are correctly saved
  - Change history entry is created
- If minimum quantity is below system precision limits:
  - An error message is displayed indicating the quantity is invalid
  - The BOM is not saved
  - User is informed of the minimum allowed precision

---

### Post-conditions

- If successful: SAP Bill of Material exists with the generated BOM number; BOM status is "Draft"; component quantity is stored as the minimum precision value; change history entry exists
- If error: No new BOM record exists; no change history entry is created; system validation for quantity precision is successfully enforced
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
