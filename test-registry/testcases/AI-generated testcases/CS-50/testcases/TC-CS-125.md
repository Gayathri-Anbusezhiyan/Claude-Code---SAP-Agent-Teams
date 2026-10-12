# TC-CS-125: Create Process Order with Approved Master Recipe and Verify BOM, Routing, Batch Number, and IPC Steps

**User Story:**          [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Creation (Pharmaceutical Manufacturing)
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create process orders (SAP_PP_PROCESS_ORDER_CREATE or equivalent) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Master Recipe `{TD.masterRecipeId}` exists with status "Approved/Released" and is active in the SAP system |
| P4 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and the material is configured for plant `{TD.plant}` |
| P5 | Master Data | Bill of Material (BOM) is active and linked to the master recipe `{TD.masterRecipeId}` with at least one active ingredient and one excipient |
| P6 | Master Data | Routing/Operations are defined in the released recipe `{TD.masterRecipeId}` |
| P7 | Master Data | In-Process Control (IPC) steps are defined in the master recipe operations |
| P8 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing and assigned to company code `{TD.companyCode}` |
| P9 | Configuration | Production version exists and is active for material `{TD.materialNumber}` and plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID | `{TD.masterRecipeId}` | Recipe identifier with Approved/Released status — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Finished product material number with batch management active — entered by the user | Valid |
| Plant | `{TD.plant}` | Pharmaceutical manufacturing plant code — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Target production quantity — entered by the user | Valid |
| Production Start Date | `{TD.productionStartDate}` | Scheduled start date for production — entered by the user | Valid |
| Unit of Measure | `{TD.uom}` | Unit of measure — auto-populated from material master | Valid |
| Production Version | `{TD.productionVersion}` | Production version — auto-populated from material/plant combination | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing organization — auto-populated | Valid |
| Company Code | `{TD.companyCode}` | Company code — auto-populated from plant | Valid |

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
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant description is auto-populated; production version `{TD.productionVersion}` is auto-populated |
| 13 | In the "Master Recipe:*" field, enter the Master Recipe ID | `{TD.masterRecipeId}` | Master Recipe ID is entered into the field |
| 14 | Press Enter to confirm the Master Recipe entry | — | SAP validates the master recipe; master recipe description is auto-populated; recipe status is confirmed as "Approved/Released" |
| 15 | Verify that the Bill of Material (BOM) section is displayed with at least one active ingredient and one excipient | — | BOM section is visible; component materials (active ingredients and excipients) are listed with material numbers, descriptions, and quantities |
| 16 | Verify that the Routing/Operations section is displayed with the list of operations from the master recipe | — | Routing section is visible; operations are listed with operation numbers, descriptions, work centers, and standard values |
| 17 | Verify that the In-Process Control (IPC) steps section is displayed | — | IPC section is visible; at least one IPC step is displayed with inspection type and control characteristics |
| 18 | In the "Order Quantity:*" field, enter the target production quantity | `{TD.orderQuantity}` | Order quantity is entered into the field |
| 19 | Press Enter to confirm the Order Quantity entry | — | Order quantity is confirmed; unit of measure `{TD.uom}` is displayed next to the quantity field |
| 20 | In the "Production Start Date:*" field, enter the production start date | `{TD.productionStartDate}` | Production start date is entered into the field (format: DD.MM.YYYY or system default format) |
| 21 | Press Enter to confirm the Production Start Date entry | — | Production start date is confirmed |
| 22 | Click the "Create" button (primary submit action) in the top toolbar | — | SAP begins processing the process order creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Process Order number and Batch number |
| 24 | Note the Process Order number and Batch number from the success message | — | Process Order number (10-12 digit numeric beginning with 1 or 2) and Batch number (alphanumeric format per client config) are displayed |
| 25 | Verify that the Process Order status is displayed | — | Order status is "CRTD" (Created) or "REL" (Released) depending on system configuration |
| 26 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 27 | Click the search icon and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 28 | Click the "Manage Process Orders" application name from the search results | — | "Manage Process Orders" application opens with a list of process orders |
| 29 | In the "Process Order:*" filter field, enter the Process Order number noted in step 24 | — | Process Order number is entered into the filter field |
| 30 | Press Enter to create the filter token | — | Filter token is created |
| 31 | Click the "Go" button | — | The list is filtered; the newly created process order is displayed in the list |
| 32 | Verify that the process order row displays the correct Material, Plant, Order Quantity, and Status | `{TD.materialNumber}`, `{TD.plant}`, `{TD.orderQuantity}`, Status = "CRTD" or "REL" | All expected values are correctly displayed in the process order list row |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Process Order number (10-12 digit numeric beginning with 1 or 2) is generated by SAP and displayed in the confirmation message
- A unique Batch number (alphanumeric format per client config, e.g., YYYYMMDD-XXX) is generated and linked to the finished product batch record
- The process order is persisted in SAP with order type "PP01" or client-configured pharmaceutical production type
- The process order status is "CRTD" (Created) or "REL" (Released) depending on automatic release configuration
- All header data (Material, Plant, Master Recipe, Order Quantity, Production Start Date) is correctly stored
- The Bill of Material (active ingredients and excipients) is correctly pulled from the master recipe and linked to the process order
- The Routing/Operations are correctly pulled from the master recipe and linked to the process order
- The In-Process Control (IPC) steps are displayed as defined in the master recipe operations
- The created process order appears in the "Manage Process Orders" list and can be viewed

---

### Post-conditions

- SAP Process Order document exists with the generated Process Order number
- Batch number exists and is linked to the finished product batch record
- Process Order status is "CRTD" (Created) or "REL" (Released)
- Material, plant, master recipe, order quantity, and production start date data are correctly recorded on the process order
- BOM components, routing operations, and IPC steps are correctly linked to the process order
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
