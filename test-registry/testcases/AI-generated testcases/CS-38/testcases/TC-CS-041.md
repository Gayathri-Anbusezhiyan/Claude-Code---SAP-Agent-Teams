# TC-CS-041: Create Rebate Agreement with Multiple Materials in Agreement Scope

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Rebate Agreement Maintenance for GPO Contracts
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to GPO `{TD.gpoId}` |
| P4 | Master Data | GPO `{TD.gpoId}` exists and is active in SAP |
| P5 | Master Data | Material `{TD.materialId1}` is created, released, and active in SAP |
| P6 | Master Data | Material `{TD.materialId2}` is created, released, and active in SAP |
| P7 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are configured and active |
| P8 | Configuration | Condition Type `{TD.conditionType}` is configured for rebate processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-AP-001`

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
| Material ID 1 | `{TD.materialId1}` | First material number for agreement scope — entered by the user | Valid |
| Material ID 2 | `{TD.materialId2}` | Second material number for agreement scope — entered by the user | Valid |
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
| 11 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization |
| 12 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel value is entered into the field |
| 13 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 14 | In the "Division" field, enter the Division code | `{TD.division}` | Division value is entered into the field |
| 15 | Press Enter to confirm the Division entry | — | SAP validates the division |
| 16 | In the "Customer" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 17 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated |
| 18 | In the "Group Purchasing Org" field, enter the GPO ID | `{TD.gpoId}` | GPO ID value is entered into the field |
| 19 | Press Enter to confirm the GPO entry | — | SAP validates the GPO; GPO name `{TD.gpoName}` is auto-populated |
| 20 | In the "Condition Type" field, enter the Condition Type code | `{TD.conditionType}` | Condition Type value is entered into the field |
| 21 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type |
| 22 | In the "Calculation Basis" dropdown, select the Rebate Basis | `{TD.rebateBasis}` | Rebate basis is selected |
| 23 | In the "Rate/Percentage" field, enter the Rebate Rate | `{TD.rebateRate}` | Rebate rate value is entered |
| 24 | Press Enter to confirm the Rebate Rate entry | — | Rebate rate is confirmed |
| 25 | In the "Valid From" date field, enter the Validity Start Date | `{TD.validityStartDate}` | Validity start date is populated |
| 26 | In the "Valid To" date field, enter the Validity End Date | `{TD.validityEndDate}` | Validity end date is populated |
| 27 | In the "Verification Period" dropdown, select the Accrual Period | `{TD.verificationPeriod}` | Verification period is selected |
| 28 | In the "Material Scope" section, click the "Add Material" button | — | First material input row appears in the Material Scope section |
| 29 | In the "Material Number" field of the first row, enter the first Material ID | `{TD.materialId1}` | Material ID 1 is entered |
| 30 | Press Enter to confirm the first Material entry | — | SAP validates the material; Material description `{TD.materialDescription1}` is auto-populated |
| 31 | Click the "Add Material" button again | — | Second material input row appears |
| 32 | In the "Material Number" field of the second row, enter the second Material ID | `{TD.materialId2}` | Material ID 2 is entered |
| 33 | Press Enter to confirm the second Material entry | — | SAP validates the material; Material description `{TD.materialDescription2}` is auto-populated |
| 34 | Click the "Save" button in the toolbar | — | SAP saves the rebate agreement; a success message is displayed |
| 35 | Observe the success message and note the generated Rebate Agreement Number | — | A success message is displayed containing the newly generated Rebate Agreement Number; agreement status is "Draft" |
| 36 | Verify that both materials are listed in the Material Scope section | — | Both materials `{TD.materialId1}` and `{TD.materialId2}` are displayed in the Material Scope list |
| 37 | Click the "Activate" button in the toolbar | — | SAP activates the rebate agreement |
| 38 | Observe the activation confirmation message | — | A success message is displayed; agreement status changes to "Active" |
| 39 | Navigate back to the "Maintain Rebate Agreements" list | — | Rebate agreement list is displayed |
| 40 | Search for the newly created rebate agreement using the number noted in step 35 | — | The created rebate agreement appears in the list with status "Active"; material scope shows multiple materials |
| 41 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 42 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 43 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Rebate Agreement Number is generated by SAP and displayed in the confirmation message
- The rebate agreement is persisted in SAP with status "Active"
- All header organizational data and rebate conditions are correctly stored
- Material scope includes both materials `{TD.materialId1}` and `{TD.materialId2}`
- The activated rebate agreement appears in the list with multiple materials in scope
- Eligible sales transactions for either material will automatically accrue rebate amounts

---

### Post-conditions

- SAP Rebate Agreement document exists with the generated agreement number
- Agreement status is "Active"
- Material scope includes multiple materials (2 materials added)
- Rebate accrual applies to sales transactions involving either material
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
