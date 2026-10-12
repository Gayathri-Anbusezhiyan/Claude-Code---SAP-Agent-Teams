# TC-CS-128: Attempt to Create Process Order with Missing Master Recipe Field and Verify System Prevents Submission

**User Story:**          [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Creation (Pharmaceutical Manufacturing)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create process orders (SAP_PP_PROCESS_ORDER_CREATE or equivalent) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` is created, released, batch management is active, and the material is configured for plant `{TD.plant}` |
| P4 | Configuration | Plant `{TD.plant}` is configured for pharmaceutical manufacturing |

---

### Test Data

**Dataset Reference:** `testdata/CS-50/CS-50-testdata.json` — Dataset ID: `TD-CS-50-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Master Recipe ID | `{TD.emptyValue}` | Master Recipe field left empty — NOT entered by the user | Missing (mandatory field) |
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
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
| 13 | Leave the "Master Recipe:*" field empty | `{TD.emptyValue}` | Master Recipe field remains blank (no value entered) |
| 14 | In the "Order Quantity:*" field, enter the target production quantity | `{TD.orderQuantity}` | Order quantity is entered into the field |
| 15 | Press Enter to confirm the Order Quantity entry | — | Order quantity is confirmed |
| 16 | In the "Production Start Date:*" field, enter the production start date | `{TD.productionStartDate}` | Production start date is entered into the field |
| 17 | Press Enter to confirm the Production Start Date entry | — | Production start date is confirmed |
| 18 | Click the "Create" button (primary submit action) in the top toolbar | — | SAP validates all mandatory fields before submission |
| 19 | Observe the on-screen response | — | An error message is displayed indicating that the Master Recipe field is mandatory and must be filled |
| 20 | Verify the error message content | — | Error message states: "Enter Master Recipe" or "Master Recipe is required" or similar validation message |
| 21 | Verify that the Master Recipe field is highlighted as mandatory | — | Master Recipe field is highlighted in red or with an error indicator |
| 22 | Verify that no Process Order number is generated | — | No success message is displayed; no Process Order number is shown |
| 23 | Verify that the form remains in edit mode | — | The form remains open with all entered data visible; submission is prevented |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the mandatory Master Recipe field is empty
- The system displays an error message: "Enter Master Recipe" or "Master Recipe is required"
- The Master Recipe field is highlighted as mandatory with a red border or error indicator
- The "Create" button submission is blocked
- No Process Order number is generated
- No Batch number is generated
- The transaction is not completed
- The form remains in edit mode

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
