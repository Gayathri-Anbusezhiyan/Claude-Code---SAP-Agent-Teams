# TC-CS-158: Attempt to Create Process Order Against BOM with In Review Status

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
| P1 | User Role | User has the role of Production Planner with SAP authorization to create process orders and access Bills of Material |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists, is active, material type FERT or HALB, and is configured for plant `{TD.plant}` |
| P4 | BOM Data | A Bill of Material exists in the system for finished product `{TD.finishedProductMaterial}` at plant `{TD.plant}` with BOM status "In Review" (BOM number: `{TD.bomNumber}`) |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-65/CS-65-testdata.json` — Dataset ID: `TD-CS-065-NEG-05`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Pharmaceutical finished product material number (FERT type) — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where process order is to be created — entered by the user | Valid |
| BOM Number | `{TD.bomNumber}` | BOM number with status "In Review" — referenced by the system | Valid (but In Review status) |
| Production Order Type | `{TD.productionOrderType}` | Process order type — selected by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to be produced — entered by the user | Valid |
| Order UoM | `{TD.orderUoM}` | Unit of measure for the order quantity — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 8 | Click "Manage Process Orders" from the search results | — | "Manage Process Orders" application opens displaying the process order list screen |
| 9 | Click the "Create" button in the application toolbar | — | New process order creation form opens in edit mode |
| 10 | In the "Material" field, enter the finished product material number | `{TD.finishedProductMaterial}` | Finished product material number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedProductDesc}` is auto-populated |
| 12 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description `{TD.plantDesc}` is auto-populated |
| 14 | In the "Production/Process Order Type" field, select the order type | `{TD.productionOrderType}` | Production order type is set (e.g., Process Order) |
| 15 | In the "Order Quantity" field, enter the quantity to be produced | `{TD.orderQuantity}` | Order quantity is populated in the field |
| 16 | In the "UoM" field, verify or enter the unit of measure | `{TD.orderUoM}` | UoM is populated |
| 17 | Press Enter to confirm the quantity and UoM entry | — | Quantity and UoM are confirmed |
| 18 | SAP system attempts to automatically determine the BOM for the material and plant combination | — | System identifies BOM number `{TD.bomNumber}` but detects it has status "In Review" |
| 19 | Observe the on-screen error or warning message | — | An error message is displayed indicating the BOM is in "In Review" status and cannot be used for process order creation |
| 20 | Attempt to click the "Save" or "Create" button in the toolbar | — | SAP prevents the save operation; error message persists stating process orders cannot be created against BOMs with In Review status (AC-5 enforcement) |
| 21 | Verify the error message content | — | Error message indicates BOM `{TD.bomNumber}` is in In Review status and must be Released before it can be used for production |
| 22 | Click the "Cancel" or "Discard" button to exit the process order creation form | — | Confirmation dialog appears asking to discard unsaved changes |
| 23 | Confirm discard action | — | Process order creation form is closed; no process order is created; user returns to the process order list screen |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the BOM status "In Review" during process order creation validation
- An error message is displayed stating the BOM cannot be used for process order creation
- The process order cannot be saved or created against a BOM with In Review status (AC-5 enforcement)
- No process order is created or persisted in the system
- User is prevented from creating a process order until the BOM is Released

---

### Post-conditions

- No new process order record exists in SAP
- BOM status remains "In Review" (unchanged)
- System validation for Released BOM status (AC-5) is successfully enforced
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
