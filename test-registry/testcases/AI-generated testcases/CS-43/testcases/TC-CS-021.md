# TC-CS-021: Create Customer Master with Valid Credit Limit and Regulatory License

**User Story:**          [CS-43] Create A New Customer Master Record With A Designated Credit Limit And
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Customer Master Data Management
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
| P1 | User Role | User has the role of Customer Master Data Specialist with SAP authorization to create customer master records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Organizational Data | Sales Organization `{TD.salesOrganization}` exists, is active, and configured with Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` |
| P4 | Financial Data | Company Code `{TD.companyCode}` is active and linked to Credit Control Area `{TD.creditControlArea}` |
| P5 | Configuration | Customer Account Group `{TD.customerAccountGroup}` is configured with external number range for customer number generation |
| P6 | Master Data | Regulatory License Classification values are predefined in SAP configuration and accessible via dropdown |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.creditLimit}` | Maximum credit amount — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for credit limit — entered by the user | Valid |
| Regulatory License | `{TD.regulatoryLicense}` | License classification code — selected from predefined dropdown | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Company Code | `{TD.companyCode}` | Company code — entered by the user | Valid |
| Country | `{TD.country}` | Country key for customer location — entered by the user | Valid |
| Customer Account Group | `{TD.customerAccountGroup}` | Account group for customer type — selected from dropdown | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Maintain Business Partner" | — | Search results appear listing the "Maintain Business Partner" application |
| 8 | Click the "Maintain Business Partner" application from the search results | — | Application opens displaying the business partner management interface |
| 9 | Click the "Create" button in the application toolbar | — | Customer master creation form opens in edit mode with empty fields |
| 10 | In the "Account Group" dropdown, select the customer account group | `{TD.customerAccountGroup}` | Account group is selected; appropriate fields become visible based on account group configuration |
| 11 | In the "Name 1" or "Customer Name" field, enter the customer name | `{TD.customerName}` | Customer name is entered into the field |
| 12 | In the "Country" field, enter the country key | `{TD.country}` | Country key is entered; country-specific fields are configured |
| 13 | Navigate to the "Sales Area" section and enter the Sales Organization | `{TD.salesOrganization}` | Sales Organization is entered |
| 14 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization; related fields become editable |
| 15 | In the "Distribution Channel" field, enter the distribution channel | `{TD.distributionChannel}` | Distribution Channel is entered |
| 16 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 17 | In the "Division" field, enter the division | `{TD.division}` | Division is entered; sales area combination is validated |
| 18 | Press Enter to confirm the Division entry | — | SAP validates the complete sales area; no validation errors are displayed |
| 19 | Navigate to the "Company Code" section and enter the company code | `{TD.companyCode}` | Company Code is entered |
| 20 | Press Enter to confirm the Company Code entry | — | SAP validates the company code; Credit Control Area `{TD.creditControlArea}` is auto-populated based on company code assignment |
| 21 | Verify that the Credit Control Area field is populated | `{TD.creditControlArea}` | Credit Control Area field shows the expected value auto-defaulted from company code configuration |
| 22 | Navigate to the "Credit Management" section and enter the credit limit | `{TD.creditLimit}` | Credit limit amount is entered |
| 23 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 24 | Press Enter to confirm the credit limit and currency | — | Credit limit is formatted according to currency settings; no validation errors |
| 25 | Navigate to the "Regulatory License Classification" or "Trade License" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected from the dropdown |
| 26 | Press Enter to confirm the license selection | — | License value is confirmed; no validation errors |
| 27 | Click the "Save" or "Create" button (primary submit action) in the toolbar | — | SAP begins processing the customer master creation |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated customer number |
| 29 | Note the customer number from the success message or the header area | — | Customer number is displayed in standard format (typically 10-digit alphanumeric) |
| 30 | Navigate back to the business partner list or search interface | — | Business partner list is displayed |
| 31 | Search for the newly created customer using the customer number noted in step 29 | — | The created customer appears in the list with status "Active" or equivalent |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Customer Master record is created with the system-generated customer number
- Customer status is "Active" and available for sales order processing
- All header data (Customer Name, Country, Credit Limit, Currency, Regulatory License) is correctly stored
- Sales area data (Sales Organization, Distribution Channel, Division) is correctly stored
- Company code and credit control area are correctly assigned
- The created customer appears in the "Maintain Business Partner" list and can be viewed

---

### Post-conditions

- Customer Master record exists in SAP with the generated customer number
- Customer is active and available for sales transactions
- Credit limit is enforced for future sales orders to this customer
- Regulatory license classification is recorded and available for compliance reporting
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
