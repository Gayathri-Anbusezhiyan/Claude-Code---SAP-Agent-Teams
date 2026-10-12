# TC-CS-156: Attempt to Add Substitute Component Without Regulatory Approval Status Flag

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
| P4 | Master Data | Primary component material `{TD.componentMaterial1}` exists, is active, and approved for pharmaceutical use |
| P5 | Master Data | Substitute component material `{TD.substituteComponentMaterial}` exists, is active, but lacks the regulatory approval status flag |
| P6 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | BOM usage `{TD.bomUsage}` (Production) is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-NEG-03`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where BOM is valid — entered by the user | Valid |
| BOM Usage | `{TD.bomUsage}` | BOM usage type (Production) — selected by the user | Valid |
| Valid From Date | `{TD.validFromDate}` | BOM validity start date — entered by the user | Valid |
| Component Material 1 | `{TD.componentMaterial1}` | Primary component material number (approved) — entered by the user | Valid |
| Component Quantity 1 | `{TD.componentQuantity1}` | Quantity of primary component per finished product unit — entered by the user | Valid |
| Component UoM 1 | `{TD.componentUoM1}` | Unit of measure for primary component — entered by the user | Valid |
| Substitute Component Material | `{TD.substituteComponentMaterial}` | Substitute component material number (not approved) — entered by the user | Invalid |
| Substitute Quantity | `{TD.substituteQuantity}` | Quantity of substitute component — entered by the user | Valid |
| Substitute UoM | `{TD.substituteUoM}` | Unit of measure for substitute — entered by the user | Valid |

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
| 18 | Press Enter to confirm the Component entry | — | SAP validates the material; material description `{TD.componentDesc1}` is auto-populated; material is verified as approved |
| 19 | In the "Quantity" field, enter the component quantity | `{TD.componentQuantity1}` | Quantity is populated in the line item |
| 20 | In the "UoM" field, verify or enter the unit of measure | `{TD.componentUoM1}` | UoM is populated |
| 21 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed; line item is validated |
| 22 | In the same line item, access the substitute component function (e.g., click "Add Substitute" or expand substitute section) | — | Substitute component entry section appears for the line item |
| 23 | In the substitute component field, enter the substitute material number | `{TD.substituteComponentMaterial}` | Substitute material number is entered |
| 24 | Press Enter to confirm the substitute component entry | — | SAP validates the substitute material; an error or warning message is displayed indicating the substitute material lacks regulatory approval status |
| 25 | Attempt to enter the substitute quantity | `{TD.substituteQuantity}` | System may prevent further entry or display a validation error |
| 26 | Attempt to click the "Save" button in the toolbar | — | SAP prevents the save operation; an error message is displayed stating the BOM cannot be saved with an unapproved substitute component |
| 27 | Verify the error message content | — | Error message indicates material `{TD.substituteComponentMaterial}` is not approved for pharmaceutical use and cannot be used as a substitute component |
| 28 | Click the "Cancel" or "Discard" button to exit the BOM creation form | — | Confirmation dialog appears asking to discard unsaved changes |
| 29 | Confirm discard action | — | BOM creation form is closed; no BOM is created; user returns to the BOM list screen |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the missing regulatory approval status flag during substitute component validation
- An error or warning message is displayed when the unapproved substitute component is entered
- The BOM cannot be saved with a substitute component lacking regulatory approval (AC-2 enforcement)
- No BOM is created or persisted in the system
- User is prevented from completing the BOM creation workflow with invalid substitute component

---

### Post-conditions

- No new BOM record exists in SAP
- No change history entry is created
- System validation for approved substitute components (AC-2) is successfully enforced
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
