# TC-CS-126: Attempt to Select Master Recipe with Draft Status and Verify System Prevents Selection

**User Story:**          [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Creation (Pharmaceutical Manufacturing)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create process orders (SAP_PP_PROCESS_ORDER_CREATE or equivalent) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Master Recipe `{TD.draftMasterRecipeId}` exists with status "Draft" (NOT Approved/Released) |
| P4 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and the material is configured for plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID (Draft) | `{TD.draftMasterRecipeId}` | Recipe identifier with "Draft" status (NOT Approved/Released) — entered by the user | Invalid |
| Material Number | `{TD.materialNumber}` | Finished product material number with batch management active — entered by the user | Valid |
| Plant | `{TD.plant}` | Pharmaceutical manufacturing plant code — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Target production quantity — entered by the user | Valid |
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
| 13 | In the "Master Recipe:*" field, enter the Master Recipe ID with Draft status | `{TD.draftMasterRecipeId}` | Master Recipe ID is entered into the field |
| 14 | Press Enter to confirm the Master Recipe entry | — | SAP validates the master recipe and displays an error message indicating that the recipe status must be "Approved/Released" or that the recipe is not valid for production |
| 15 | Observe the error message displayed | — | Error message is displayed (e.g., "Recipe status must be Approved/Released" or "Recipe is not valid for production" or "Master recipe is not released") |
| 16 | Verify that the Master Recipe field is highlighted as invalid | — | Master Recipe field is highlighted in red or with an error indicator |
| 17 | Verify that the BOM and Routing sections are not populated | — | BOM and Routing sections remain empty or are not displayed |
| 18 | Attempt to click the "Create" button (primary submit action) in the top toolbar | — | The "Create" button is either disabled (greyed out) or clicking it triggers a validation error preventing submission |
| 19 | Observe that the process order is not created | — | No success message is displayed; no Process Order number is generated; the form remains in edit mode |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the Master Recipe `{TD.draftMasterRecipeId}` has status "Draft" (NOT Approved/Released)
- The system displays an error message indicating that the recipe status must be "Approved/Released" or that the recipe is not valid for production
- The Master Recipe field is highlighted as invalid
- The BOM and Routing sections are not populated
- The "Create" button is disabled or clicking it triggers a validation error
- No Process Order is created
- No Batch number is generated
- The transaction is not completed

---

### Post-conditions

- No SAP Process Order document is created
- No Batch number is generated
- The system remains in edit mode with validation error displayed
- No data is persisted in the SAP system

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
