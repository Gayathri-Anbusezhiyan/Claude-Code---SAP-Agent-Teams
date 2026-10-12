# TC-CS-134: Attempt to create Scheduling Agreement with validity end date before start date

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Customer Scheduling Agreement Creation
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
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to create Scheduling Agreements (transaction VA31) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and enabled for scheduling agreements in sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid hospital customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical product material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Total target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDateFuture}` | Future start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDateBeforeStart}` | End date before start date — entered by the user | Invalid |

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
| 12 | In the "Valid From:*" field, enter the validity start date | `{TD.validityStartDateFuture}` | Validity start date is entered |
| 13 | In the "Valid To:*" field, enter the validity end date that is before the start date | `{TD.validityEndDateBeforeStart}` | Validity end date (before start date) is entered |
| 14 | Press Enter to confirm the date entry or click out of the field | — | SAP performs date range validation |
| 15 | Observe the system response | — | An error message is displayed stating that the validity end date must be after the validity start date; the "Valid To" field is highlighted as invalid |
| 16 | Attempt to proceed with saving the Scheduling Agreement | — | System prevents submission; the date range validation error persists |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the validity end date must be after the validity start date
- The "Valid To" field is highlighted as invalid
- The Scheduling Agreement is NOT created
- The system prevents submission with the invalid date range

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
