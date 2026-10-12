# TC-CS-044: Attempt to Create Rebate Agreement with Customer NOT Assigned to Any GPO

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
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
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to maintain rebate agreements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerIdNoGpo}` exists and is active in SAP but is NOT assigned to any GPO |
| P4 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are configured and active |
| P6 | Configuration | Condition Type `{TD.conditionType}` is configured for rebate processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID (No GPO) | `{TD.customerIdNoGpo}` | Customer number NOT assigned to any GPO — entered by the user | Invalid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Rebate condition type code — entered by the user | Valid |
| Rebate Basis | `{TD.rebateBasis}` | Calculation basis (Value/Volume/Percentage) — selected by the user | Valid |
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
| 10 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrganization}` | Sales Organization value is entered into the field |
| 11 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization |
| 12 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel value is entered into the field |
| 13 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 14 | In the "Division" field, enter the Division code | `{TD.division}` | Division value is entered into the field |
| 15 | Press Enter to confirm the Division entry | — | SAP validates the division |
| 16 | In the "Customer" field, enter the Customer ID (customer NOT assigned to any GPO) | `{TD.customerIdNoGpo}` | Customer ID value is entered into the field |
| 17 | Press Enter to confirm the Customer entry | — | SAP validates the customer exists; Customer name is auto-populated |
| 18 | In the "Group Purchasing Org" field, enter the GPO ID | `{TD.gpoId}` | GPO ID value is entered into the field |
| 19 | Press Enter to confirm the GPO entry | — | SAP displays an error message indicating that the customer is not assigned to the specified GPO; GPO name is NOT auto-populated or validation fails |
| 20 | Observe the error message details | — | Error message is displayed clearly stating that customer `{TD.customerIdNoGpo}` is not assigned to any Group Purchasing Organization or is not assigned to GPO `{TD.gpoId}` |
| 21 | Verify that the "Save" button is either disabled or clicking it results in a validation error | — | Save action is blocked or validation error is displayed preventing submission |
| 22 | In the "Condition Type" field, enter the Condition Type code | `{TD.conditionType}` | Condition Type value is entered into the field |
| 23 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type |
| 24 | In the "Calculation Basis" dropdown, select the Rebate Basis | `{TD.rebateBasis}` | Rebate basis is selected |
| 25 | In the "Rate/Percentage" field, enter the Rebate Rate | `{TD.rebateRate}` | Rebate rate value is entered |
| 26 | Press Enter to confirm the Rebate Rate entry | — | Rebate rate is confirmed |
| 27 | In the "Valid From" date field, enter the Validity Start Date | `{TD.validityStartDate}` | Validity start date is populated |
| 28 | In the "Valid To" date field, enter the Validity End Date | `{TD.validityEndDate}` | Validity end date is populated |
| 29 | Click the "Save" button in the toolbar | — | SAP displays a validation error; save action is blocked |
| 30 | Observe the validation error message | — | Error message clearly states that the customer-GPO assignment validation failed; rebate agreement is NOT created |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the customer is not assigned to the specified GPO
- The error message is displayed either at the GPO field validation step (step 19) or at the Save action step (step 30)
- The rebate agreement is NOT created
- No Rebate Agreement Number is generated
- The validation error is clearly communicated to the user with specific details about the customer-GPO assignment failure

---

### Post-conditions

- No SAP Rebate Agreement document is created
- Customer-GPO assignment validation successfully prevented the creation of an invalid rebate agreement
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
