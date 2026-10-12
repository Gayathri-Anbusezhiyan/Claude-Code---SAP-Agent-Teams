# TC-CS-030: Create Customer Master with Minimum Valid Credit Limit

**User Story:**          [CS-43] Create A New Customer Master Record With A Designated Credit Limit And
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Customer Master Data Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Master Data Specialist with SAP authorization to create customer master records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Organizational Data | Sales Organization `{TD.salesOrganization}` exists, is active, and configured with Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` |
| P4 | Financial Data | Company Code `{TD.companyCode}` is active and linked to Credit Control Area |
| P5 | Configuration | Customer Account Group `{TD.customerAccountGroup}` is configured with external number range |
| P6 | Boundary Definition | Minimum valid credit limit is the smallest non-zero positive value (typically 0.01 per currency decimal places) — verify system handling of lower boundary |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.minCreditLimit}` | Minimum valid credit limit amount (boundary test) — entered by the user | Boundary (lower) |
| Currency | `{TD.currency}` | Currency code for credit limit — entered by the user | Valid |
| Regulatory License | `{TD.regulatoryLicense}` | Valid license classification code | Valid |
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
| 10 | In the "Account Group" dropdown, select the customer account group | `{TD.customerAccountGroup}` | Account group is selected; appropriate fields become visible |
| 11 | In the "Name 1" or "Customer Name" field, enter the customer name | `{TD.customerName}` | Customer name is entered into the field |
| 12 | In the "Country" field, enter the country key | `{TD.country}` | Country key is entered |
| 13 | Navigate to the "Sales Area" section and enter the Sales Organization | `{TD.salesOrganization}` | Sales Organization is entered |
| 14 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization |
| 15 | In the "Distribution Channel" field, enter the distribution channel | `{TD.distributionChannel}` | Distribution Channel is entered |
| 16 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 17 | In the "Division" field, enter the division | `{TD.division}` | Division is entered |
| 18 | Press Enter to confirm the Division entry | — | SAP validates the sales area |
| 19 | Navigate to the "Company Code" section and enter the company code | `{TD.companyCode}` | Company Code is entered |
| 20 | Press Enter to confirm the Company Code entry | — | SAP validates the company code; Credit Control Area is auto-populated |
| 21 | Navigate to the "Credit Management" section and enter the minimum valid credit limit | `{TD.minCreditLimit}` | Minimum credit limit value (e.g., 0.01) is entered in the credit limit field |
| 22 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 23 | Press Enter to confirm the credit limit and currency | — | SAP processes the minimum credit limit value; credit limit is formatted according to currency settings (e.g., 0.01 USD displayed correctly with 2 decimal places); no validation errors are displayed |
| 24 | Verify that the credit limit is displayed correctly with proper currency formatting | `{TD.minCreditLimit}` | Credit limit field shows the minimum value with correct decimal places and currency symbol; no truncation or rounding to zero |
| 25 | Navigate to the "Regulatory License Classification" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected |
| 26 | Click the "Save" or "Create" button | — | SAP begins processing the customer master creation with minimum credit limit |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated customer number; no errors or warnings about credit limit being too small |
| 28 | Note the customer number from the success message | — | Customer number is displayed in standard format |
| 29 | Navigate back to the business partner list | — | Business partner list is displayed |
| 30 | Search for the newly created customer using the customer number | — | The created customer appears in the list |
| 31 | Open the customer record and verify the credit limit value | `{TD.minCreditLimit}` | Credit limit is correctly stored and displayed with the minimum value; no rounding to zero or loss of decimal precision |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Customer Master record is successfully created with minimum valid credit limit
- Customer number is generated and displayed
- Credit limit field correctly stores and displays the minimum non-zero boundary value without rounding to zero or losing decimal precision
- Currency formatting is correctly applied to the small credit limit value (e.g., 0.01 displayed as "0.01 USD" not "0 USD")
- Customer is available for sales transactions with minimal credit exposure configured
- System accepts the smallest non-zero credit limit value per currency configuration

---

### Post-conditions

- Customer Master exists with minimum valid credit limit configured
- Credit limit value is stored accurately in SAP database without data loss or rounding
- Credit management system can enforce credit checks using the minimum limit
- No application-level errors or critical warnings remain outstanding

---

### Actual Result

_[To be completed during test execution — verify exact credit limit value stored and displayed without rounding to zero]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution; note if any rounding, precision loss, or formatting issues occur]_

---
