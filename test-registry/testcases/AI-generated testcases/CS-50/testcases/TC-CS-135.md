# TC-CS-135: Create Process Order with Production Start Date at Current Date Boundary and Verify Success

**User Story:**          [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Creation (Pharmaceutical Manufacturing)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create process orders (SAP_PP_PROCESS_ORDER_CREATE or equivalent) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Master Recipe `{TD.masterRecipeId}` exists with status "Approved/Released" |
| P4 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and configured for plant `{TD.plant}` |
| P5 | Master Data | Bill of Material (BOM) is active and linked to the master recipe `{TD.masterRecipeId}` |
| P6 | Master Data | Routing/Operations are defined in the released recipe `{TD.masterRecipeId}` |
| P7 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing |
| P8 | Configuration | Current posting period is open in the SAP system for plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID | `{TD.masterRecipeId}` | Recipe identifier with Approved/Released status — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Plant | `{TD.plant}` | Pharmaceutical manufacturing plant code — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Target production quantity — entered by the user | Valid |
| Production Start Date (Current) | `{TD.currentDate}` | Production start date equal to the current system date (earliest valid date boundary) — entered by the user | Valid (boundary) |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Process Order" | — | Search results appear listing the "Create Process Order" application |
| 8 | Click the "Create Process Order" application name from the search results | — | "Create Process Order" application opens in edit mode |
| 9 | In the "Material:*" header field, enter the Material Number | `{TD.materialNumber}` | Material number is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated in the header |
| 11 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description is auto-populated |
| 13 | In the "Master Recipe:*" field, enter the Master Recipe ID | `{TD.masterRecipeId}` | Master Recipe ID is entered into the field |
| 14 | Press Enter to confirm the Master Recipe entry | — | SAP validates the master recipe; master recipe description is auto-populated; recipe status is confirmed as "Approved/Released" |
| 15 | Verify that the Bill of Material (BOM) section is displayed | — | BOM section is visible; component materials are listed |
| 16 | Verify that the Routing/Operations section is displayed | — | Routing section is visible; operations are listed |
| 17 | In the "Order Quantity:*" field, enter the target production quantity | `{TD.orderQuantity}` | Order quantity is entered into the field |
| 18 | Press Enter to confirm the Order Quantity entry | — | Order quantity is confirmed |
| 19 | In the "Production Start Date:*" field, enter the current system date | `{TD.currentDate}` | Production start date equal to current date is entered into the field (format: DD.MM.YYYY or system default format) |
| 20 | Press Enter to confirm the Production Start Date entry | — | Production start date is confirmed; no error or warning is displayed (system accepts current date as earliest valid date) |
| 21 | Click the "Create" button (primary submit action) in the top toolbar | — | SAP begins processing the process order creation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Process Order number and Batch number |
| 23 | Note the Process Order number and Batch number from the success message | — | Process Order number (10-12 digit numeric) and Batch number (alphanumeric format) are displayed |
| 24 | Verify that the Process Order status is displayed | — | Order status is "CRTD" (Created) or "REL" (Released) |
| 25 | Verify that the production start date matches the current date entered | `{TD.currentDate}` | Production start date in the success message or order details matches the current date value entered |
| 26 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 27 | Click the search icon and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 28 | Click the "Manage Process Orders" application name from the search results | — | "Manage Process Orders" application opens |
| 29 | In the "Process Order:*" filter field, enter the Process Order number noted in step 23 | — | Process Order number is entered into the filter field |
| 30 | Press Enter to create the filter token | — | Filter token is created |
| 31 | Click the "Go" button | — | The list is filtered; the newly created process order is displayed in the list |
| 32 | Verify that the process order row displays the correct Material, Plant, Order Quantity, Start Date (current date), and Status | `{TD.materialNumber}`, `{TD.plant}`, `{TD.orderQuantity}`, `{TD.currentDate}`, Status = "CRTD" or "REL" | All expected values including the current date start date are correctly displayed |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Process Order number is generated by SAP and displayed in the confirmation message
- A unique Batch number is generated and linked to the finished product batch record
- The process order is successfully created with production start date equal to the current system date (earliest valid date boundary)
- The system accepts the current date boundary value without error or warning
- The process order status is "CRTD" (Created) or "REL" (Released)
- All header data (Material, Plant, Master Recipe, Order Quantity, Production Start Date = current date) is correctly stored
- The created process order appears in the "Manage Process Orders" list with the current date correctly displayed as the start date

---

### Post-conditions

- SAP Process Order document exists with the generated Process Order number
- Batch number exists and is linked to the finished product batch record
- Process Order status is "CRTD" (Created) or "REL" (Released)
- Production start date equals the current system date
- No application-level errors or warnings are displayed

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
