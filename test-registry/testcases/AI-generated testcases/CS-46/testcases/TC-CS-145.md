# TC-CS-145: Attempt to create Scheduling Agreement with Interval schedule type but missing Interval value

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
| P4 | Master Data | Material `{TD.materialId}` is created, released, and enabled for scheduling agreements in sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-ERR-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Valid total quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Valid start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Valid end date — entered by the user | Valid |
| Schedule Type | `{TD.scheduleTypeInterval}` | "Interval" — selected by the user | Valid |
| Interval | `{TD.emptyValue}` | Empty/blank — not entered by the user | Missing |

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
| 15 | In the "Material:*" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 17 | In the "Target Quantity:*" field, enter the total quantity | `{TD.totalQuantity}` | Total quantity is entered |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | In the "Schedule Type:*" field, select "Interval" | `{TD.scheduleTypeInterval}` | Schedule Type is set to "Interval" |
| 20 | Leave the "Interval (Days):*" field empty (do not enter any value) | `{TD.emptyValue}` | Interval field remains empty |
| 21 | Attempt to click the "Save" button in the toolbar | — | SAP performs conditional mandatory field validation |
| 22 | Observe the system response | — | An error message is displayed stating that the "Interval" field is mandatory when "Interval" schedule type is selected; the "Interval" field is highlighted as invalid |
| 23 | Verify that the system prevents submission | — | The "Save" action is blocked; the error persists |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the "Interval" field is mandatory for "Interval" schedule type
- The "Interval" field is highlighted as invalid
- The Scheduling Agreement is NOT created
- The system prevents submission without the required Interval value

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
