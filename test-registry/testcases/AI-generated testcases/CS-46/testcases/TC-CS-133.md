# TC-CS-133: Attempt to create Scheduling Agreement with customer not assigned to sales organization

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
| P3 | Master Data | Customer `{TD.customerNotAssignedToSalesOrg}` exists but is NOT assigned to sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerNotAssignedToSalesOrg}` | Customer exists but not assigned to sales organization — entered by the user | Invalid |
| Material ID | `{TD.materialId}` | Valid material number — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Total target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | End date — entered by the user | Valid |

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
| 10 | In the "Sold-To Party:*" field, enter the Customer ID | `{TD.customerNotAssignedToSalesOrg}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP attempts to validate the customer for the sales organization |
| 12 | Observe the system response | — | An error message is displayed stating that the customer is not assigned to the sales organization or is not valid for this organizational unit; the "Sold-To Party" field is highlighted as invalid |
| 13 | Attempt to proceed with entering additional data | — | System prevents further data entry or highlights organizational data errors |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the customer is not assigned to the sales organization
- The "Sold-To Party" field is highlighted as invalid
- The Scheduling Agreement is NOT created
- The system prevents submission with the invalid customer-sales organization assignment

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
