# TC-CS-038: Create and Activate GPO Rebate Agreement with Mandatory Fields

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to maintain rebate agreements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to GPO `{TD.gpoId}` |
| P4 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are configured and active |
| P6 | Configuration | Condition Type `{TD.conditionType}` is configured for rebate processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Organization | `{TD.salesOrganization}` | Sales org code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Customer ID | `{TD.customerId}` | Customer number — entered by the user | Valid |
| GPO ID | `{TD.gpoId}` | Group Purchasing Organization ID — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Rebate condition type code — entered by the user | Valid |
| Rebate Basis | `{TD.rebateBasis}` | Calculation basis (Value/Volume/Percentage) — selected by the user | Valid |
| Rebate Rate | `{TD.rebateRate}` | Rate or percentage value — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Agreement start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Agreement end date — entered by the user | Valid |
| Verification Period | `{TD.verificationPeriod}` | Accrual period (Monthly/Quarterly/Yearly) — selected by the user | Valid |

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
| 11 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization; organizational details are confirmed |
| 12 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel value is entered into the field |
| 13 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 14 | In the "Division" field, enter the Division code | `{TD.division}` | Division value is entered into the field |
| 15 | Press Enter to confirm the Division entry | — | SAP validates the division; organizational data block is complete |
| 16 | In the "Customer" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 17 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated |
| 18 | In the "Group Purchasing Org" field, enter the GPO ID | `{TD.gpoId}` | GPO ID value is entered into the field |
| 19 | Press Enter to confirm the GPO entry | — | SAP validates the GPO; GPO name `{TD.gpoName}` is auto-populated; system confirms customer-GPO assignment is valid |
| 20 | In the "Condition Type" field, enter the Condition Type code | `{TD.conditionType}` | Condition Type value is entered into the field |
| 21 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type; rebate calculation configuration is applied |
| 22 | In the "Calculation Basis" dropdown, select the Rebate Basis | `{TD.rebateBasis}` | Rebate basis (Value/Volume/Percentage) is selected |
| 23 | In the "Rate/Percentage" field, enter the Rebate Rate | `{TD.rebateRate}` | Rebate rate value is entered |
| 24 | Press Enter to confirm the Rebate Rate entry | — | Rebate rate is confirmed; calculation preview may display |
| 25 | In the "Valid From" date field, enter the Validity Start Date | `{TD.validityStartDate}` | Validity start date is populated |
| 26 | In the "Valid To" date field, enter the Validity End Date | `{TD.validityEndDate}` | Validity end date is populated; system validates end date is after start date |
| 27 | In the "Verification Period" dropdown, select the Accrual Period | `{TD.verificationPeriod}` | Verification period (Monthly/Quarterly/Yearly) is selected |
| 28 | Click the "Save" button in the toolbar | — | SAP saves the rebate agreement as a draft; a success message is displayed |
| 29 | Observe the success message and note the generated Rebate Agreement Number | — | A success message is displayed containing the newly generated Rebate Agreement Number; agreement status is "Draft" |
| 30 | Note the Rebate Agreement Number from the header area | — | Rebate Agreement Number is displayed in the top-left header (10-digit alphanumeric) |
| 31 | Click the "Activate" button in the toolbar | — | SAP initiates the activation process |
| 32 | Observe the activation confirmation message | — | A success message is displayed confirming the rebate agreement is now "Active"; agreement status changes from "Draft" to "Active" |
| 33 | Navigate back to the "Maintain Rebate Agreements" list | — | Rebate agreement list is displayed |
| 34 | Search for the newly created rebate agreement using the number noted in step 30 | — | The created rebate agreement appears in the list with status "Active" |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Rebate Agreement Number is generated by SAP and displayed in the confirmation message
- The rebate agreement is persisted in SAP with status "Active"
- All header organizational data (Sales Org, Distribution Channel, Division, Customer, GPO) is correctly stored
- All rebate condition data (Condition Type, Rebate Basis, Rate, Validity Period) is correctly stored
- The activated rebate agreement appears in the "Maintain Rebate Agreements" list and is ready for automatic accrual processing
- Eligible customer sales transactions will now automatically accrue rebate amounts per the configured rate and basis

---

### Post-conditions

- SAP Rebate Agreement document exists with the generated agreement number
- Agreement status is "Active"
- Customer-GPO assignment is validated and recorded
- Rebate conditions (condition type, rate, basis, validity period) are correctly configured
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
