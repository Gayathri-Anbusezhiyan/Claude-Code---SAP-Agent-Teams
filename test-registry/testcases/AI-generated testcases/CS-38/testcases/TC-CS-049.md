# TC-CS-049: Attempt to Submit Rebate Agreement with Customer Field Empty

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
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
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to maintain rebate agreements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are configured and active |
| P4 | Configuration | Condition Type `{TD.conditionType}` is configured for rebate processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.emptyValue}` | Customer number — intentionally left empty | Empty (Invalid) |
| Condition Type | `{TD.conditionType}` | Rebate condition type code — entered by the user | Valid |
| Rebate Rate | `{TD.rebateRate}` | Rate or percentage value — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Agreement start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Agreement end date — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Maintain Rebate Agreements" | — | Search results appear |
| 8 | Click "Maintain Rebate Agreements" from the search results | — | Application opens |
| 9 | Click the "Create" button in the application toolbar | — | New rebate agreement creation form opens |
| 10 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrganization}` | Sales Organization value is entered |
| 11 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization |
| 12 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel value is entered |
| 13 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 14 | In the "Division" field, enter the Division code | `{TD.division}` | Division value is entered |
| 15 | Press Enter to confirm the Division entry | — | SAP validates the division |
| 16 | Leave the "Customer" field empty (do not enter any value) | `{TD.emptyValue}` | Customer field remains empty |
| 17 | In the "Condition Type" field, enter the Condition Type code | `{TD.conditionType}` | Condition Type value is entered |
| 18 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type |
| 19 | In the "Rate/Percentage" field, enter the Rebate Rate | `{TD.rebateRate}` | Rebate rate value is entered |
| 20 | Press Enter to confirm the Rebate Rate entry | — | Rebate rate is confirmed |
| 21 | In the "Valid From" date field, enter the Validity Start Date | `{TD.validityStartDate}` | Validity start date is populated |
| 22 | In the "Valid To" date field, enter the Validity End Date | `{TD.validityEndDate}` | Validity end date is populated |
| 23 | Click the "Save" button in the toolbar | — | SAP highlights the "Customer" field as mandatory; submission is blocked; field is visually indicated as required |
| 24 | Observe the validation error message | — | Error message states that "Customer" is a mandatory field and must be filled |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP highlights the "Customer" field as mandatory and prevents submission
- A validation error message is displayed indicating the field is required
- The rebate agreement is NOT created
- No Rebate Agreement Number is generated

---

### Post-conditions

- No SAP Rebate Agreement document is created
- Mandatory field enforcement successfully prevented creation with missing Customer field
- No application-level errors or critical warnings remain outstanding after signing out

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
