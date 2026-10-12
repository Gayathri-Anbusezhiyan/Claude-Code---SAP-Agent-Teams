# TC-CS-048: Attempt to Submit Rebate Agreement with Sales Organization Field Empty

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to GPO `{TD.gpoId}` |
| P4 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |
| P5 | Configuration | Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` are configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.emptyValue}` | Sales org code — intentionally left empty | Empty (Invalid) |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.customerId}` | Customer number — entered by the user | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |
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
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Maintain Rebate Agreements" | — | Search results appear listing the "Maintain Rebate Agreements" application |
| 8 | Click "Maintain Rebate Agreements" from the search results | — | "Maintain Rebate Agreements" application opens |
| 9 | Click the "Create" button in the application toolbar | — | New rebate agreement creation form opens in edit mode |
| 10 | Leave the "Sales Organization" field empty (do not enter any value) | `{TD.emptyValue}` | Sales Organization field remains empty |
| 11 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel value is entered into the field |
| 12 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 13 | In the "Division" field, enter the Division code | `{TD.division}` | Division value is entered into the field |
| 14 | Press Enter to confirm the Division entry | — | SAP validates the division |
| 15 | In the "Customer" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 16 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated |
| 17 | In the "Group Purchasing Org" field, enter the GPO ID | `{TD.gpoId}` | GPO ID value is entered into the field |
| 18 | Press Enter to confirm the GPO entry | — | SAP validates the GPO; GPO name `{TD.gpoName}` is auto-populated |
| 19 | In the "Condition Type" field, enter the Condition Type code | `{TD.conditionType}` | Condition Type value is entered into the field |
| 20 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type |
| 21 | In the "Rate/Percentage" field, enter the Rebate Rate | `{TD.rebateRate}` | Rebate rate value is entered |
| 22 | Press Enter to confirm the Rebate Rate entry | — | Rebate rate is confirmed |
| 23 | In the "Valid From" date field, enter the Validity Start Date | `{TD.validityStartDate}` | Validity start date is populated |
| 24 | In the "Valid To" date field, enter the Validity End Date | `{TD.validityEndDate}` | Validity end date is populated |
| 25 | Click the "Save" button in the toolbar | — | SAP highlights the "Sales Organization" field as mandatory; submission is blocked; field is visually indicated as required (e.g., red border or asterisk) |
| 26 | Observe the validation error message | — | Error message is displayed stating that "Sales Organization" is a mandatory field and must be filled; error highlights the specific field |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP highlights the "Sales Organization" field as mandatory and prevents submission
- A validation error message is displayed indicating the field is required
- The rebate agreement is NOT created
- No Rebate Agreement Number is generated
- The user is prompted to fill the missing "Sales Organization" field before proceeding

---

### Post-conditions

- No SAP Rebate Agreement document is created
- Mandatory field enforcement successfully prevented the creation of a rebate agreement with missing Sales Organization
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
