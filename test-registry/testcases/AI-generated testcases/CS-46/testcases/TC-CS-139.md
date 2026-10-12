# TC-CS-139: Attempt to create Scheduling Agreement with missing Material ID field

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer number — entered by the user | Valid |
| Material ID | `{TD.emptyValue}` | Empty/blank — not entered by the user | Missing |
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
| 10 | In the "Sold-To Party:*" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name is auto-populated |
| 12 | In the "Valid From:*" field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 13 | In the "Valid To:*" field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 14 | In the "Items" section, click the "Create" button | — | A new empty line item row appears in the Items table |
| 15 | Leave the "Material:*" field empty (do not enter any value) | `{TD.emptyValue}` | Material field remains empty |
| 16 | In the "Target Quantity:*" field, enter the total quantity | `{TD.totalQuantity}` | Total quantity is entered |
| 17 | Attempt to click the "Save" button in the toolbar | — | SAP performs mandatory field validation |
| 18 | Observe the system response | — | An error message is displayed stating that the "Material" field is mandatory and must be entered; the "Material" field is highlighted as invalid |
| 19 | Verify that the system prevents submission | — | The "Save" action is blocked; the error persists |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the "Material" field is mandatory
- The "Material" field is highlighted as invalid
- The Scheduling Agreement is NOT created
- The system prevents submission without the mandatory Material ID

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
