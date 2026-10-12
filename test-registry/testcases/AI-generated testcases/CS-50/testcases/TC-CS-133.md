# TC-CS-133: Create Process Order with Order Quantity at Minimum Lot Size Boundary and Verify Success

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
| P3 | Master Data | Master Recipe `{TD.masterRecipeId}` exists with status "Approved/Released" and defines a minimum lot size constraint |
| P4 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and configured for plant `{TD.plant}` |
| P5 | Master Data | Bill of Material (BOM) is active and linked to the master recipe `{TD.masterRecipeId}` |
| P6 | Master Data | Routing/Operations are defined in the released recipe `{TD.masterRecipeId}` |
| P7 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID | `{TD.masterRecipeId}` | Recipe identifier with Approved/Released status — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Plant | `{TD.plant}` | Pharmaceutical manufacturing plant code — entered by the user | Valid |
| Order Quantity (Min) | `{TD.minQuantity}` | Minimum lot size as defined in the master recipe (lower boundary) — entered by the user | Valid (boundary) |
| Production Start Date | `{TD.productionStartDate}` | Scheduled start date for production — entered by the user | Valid |

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
| 17 | In the "Order Quantity:*" field, enter the minimum lot size quantity | `{TD.minQuantity}` | Minimum lot size quantity is entered into the field |
| 18 | Press Enter to confirm the Order Quantity entry | — | Order quantity is confirmed; no error or warning is displayed (system accepts minimum lot size) |
| 19 | In the "Production Start Date:*" field, enter the production start date | `{TD.productionStartDate}` | Production start date is entered into the field |
| 20 | Press Enter to confirm the Production Start Date entry | — | Production start date is confirmed |
| 21 | Click the "Create" button (primary submit action) in the top toolbar | — | SAP begins processing the process order creation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Process Order number and Batch number |
| 23 | Note the Process Order number and Batch number from the success message | — | Process Order number (10-12 digit numeric) and Batch number (alphanumeric format) are displayed |
| 24 | Verify that the Process Order status is displayed | — | Order status is "CRTD" (Created) or "REL" (Released) |
| 25 | Verify that the order quantity matches the minimum lot size entered | `{TD.minQuantity}` | Order quantity in the success message or order details matches the minimum lot size value entered |
| 26 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 27 | Click the search icon and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 28 | Click the "Manage Process Orders" application name from the search results | — | "Manage Process Orders" application opens |
| 29 | In the "Process Order:*" filter field, enter the Process Order number noted in step 23 | — | Process Order number is entered into the filter field |
| 30 | Press Enter to create the filter token | — | Filter token is created |
| 31 | Click the "Go" button | — | The list is filtered; the newly created process order is displayed in the list |
| 32 | Verify that the process order row displays the correct Material, Plant, Order Quantity (minimum lot size), and Status | `{TD.materialNumber}`, `{TD.plant}`, `{TD.minQuantity}`, Status = "CRTD" or "REL" | All expected values including the minimum lot size quantity are correctly displayed |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Process Order number is generated by SAP and displayed in the confirmation message
- A unique Batch number is generated and linked to the finished product batch record
- The process order is successfully created with order quantity equal to the minimum lot size defined in the master recipe
- The system accepts the minimum lot size boundary value without error or warning
- The process order status is "CRTD" (Created) or "REL" (Released)
- All header data (Material, Plant, Master Recipe, Order Quantity = minimum lot size, Production Start Date) is correctly stored
- The created process order appears in the "Manage Process Orders" list with the minimum lot size quantity correctly displayed

---

### Post-conditions

- SAP Process Order document exists with the generated Process Order number
- Batch number exists and is linked to the finished product batch record
- Process Order status is "CRTD" (Created) or "REL" (Released)
- Order quantity equals the minimum lot size value from the master recipe
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
