# TC-CS-138: Attempt to create Scheduling Agreement with missing Customer ID field

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Customer Scheduling Agreement Creation
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
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to create Scheduling Agreements (transaction VA31) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.emptyValue}` | Empty/blank — not entered by the user | Missing |
| Material ID | `{TD.materialId}` | Valid material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Valid total quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Valid start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Valid end date — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Scheduling Agreement" | — | Search results appear listing the Scheduling Agreement application |
| 8 | Click "Scheduling Agreement" from the search results | — | Scheduling Agreement application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Scheduling Agreement creation form opens in edit mode |
| 10 | Leave the "Sold-To Party:*" field empty (do not enter any value) | `{TD.emptyValue}` | Field remains empty |
| 11 | In the "Valid From:*" field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 12 | In the "Valid To:*" field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 13 | Attempt to navigate to the Items section or click the "Save" button | — | SAP performs mandatory field validation |
| 14 | Observe the system response | — | An error message is displayed stating that the "Sold-To Party" field is mandatory and must be entered; the "Sold-To Party" field is highlighted as invalid |
| 15 | Verify that the system prevents submission | — | The "Save" button is disabled OR submission is blocked; the error persists |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the "Sold-To Party" field is mandatory
- The "Sold-To Party" field is highlighted as invalid
- The Scheduling Agreement is NOT created
- The system prevents submission without the mandatory Customer ID

---

### Post-conditions

- No Scheduling Agreement document is created in SAP
- The system remains in a clean state with no partially created records
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
