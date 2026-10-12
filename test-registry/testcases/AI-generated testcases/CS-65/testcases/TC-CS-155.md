# TC-CS-155: Attempt to Add BOM Component with Inactive/Blocked Material Master

**User Story:**          [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Manufacturing (PP)
**Feature:**             Bill of Material (BOM) Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            HIGH
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Master Data Specialist with SAP authorization to create and maintain Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.inactiveComponentMaterial}` exists in the system but is marked as inactive or blocked for the plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P6 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-NEG-02`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Inactive Component Material | `{TD.inactiveComponentMaterial}` | Inactive or blocked component material number — entered by the user | Invalid |
| Component Quantity | `{TD.componentQuantity}` | Quantity of component per finished product unit — entered by the user | Valid |
| Component UoM | `{TD.componentUoM}` | Unit of measure for component — entered by the user | Valid |

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
| 17 | In the "Component" field of the line item, enter the inactive component material number | `{TD.inactiveComponentMaterial}` | Inactive component material number is entered into the field |
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; an error or warning message is displayed indicating the material is inactive or blocked for the plant |
| 19 | Attempt to enter the component quantity in the "Quantity" field | `{TD.componentQuantity}` | System may prevent further entry or display a validation error |
| 20 | Attempt to click the "Save" button in the toolbar | — | SAP prevents the save operation; an error message is displayed stating the BOM cannot be saved with inactive or blocked component materials |
| 21 | Verify the error message content | — | Error message indicates material `{TD.inactiveComponentMaterial}` is inactive or blocked and cannot be used as a BOM component |
| 22 | Click the "Cancel" or "Discard" button to exit the BOM creation form | — | Confirmation dialog appears asking to discard unsaved changes |
| 23 | Confirm discard action | — | BOM creation form is closed; no BOM is created; user returns to the BOM list screen |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the inactive or blocked material master status during component entry validation
- An error or warning message is displayed when the inactive component material is entered
- The BOM cannot be saved with an inactive or blocked component material (AC-2 enforcement)
- No BOM is created or persisted in the system
- User is prevented from completing the BOM creation workflow with invalid component material

---

### Post-conditions

- No new BOM record exists in SAP
- No change history entry is created
- System validation for active component materials (AC-2) is successfully enforced
- No application-level errors or critical warnings remain outstanding after discard action

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
