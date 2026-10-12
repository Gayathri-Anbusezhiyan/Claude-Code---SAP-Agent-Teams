# TC-CS-029: Create Customer Master with Maximum Credit Limit

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
| P6 | Boundary Definition | Maximum credit limit is system-defined (typically 999999999.99 or per SAP data type limits) — verify system handling of upper boundary |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.maxCreditLimit}` | Maximum allowed credit limit amount (boundary test) — entered by the user | Boundary (upper) |
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
| 21 | Navigate to the "Credit Management" section and enter the maximum credit limit | `{TD.maxCreditLimit}` | Maximum credit limit value (e.g., 999999999.99) is entered in the credit limit field |
| 22 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 23 | Press Enter to confirm the credit limit and currency | — | SAP processes the maximum credit limit value; credit limit is formatted according to currency settings without overflow or truncation; no validation errors are displayed |
| 24 | Verify that the credit limit is displayed correctly with proper currency formatting | `{TD.maxCreditLimit}` | Credit limit field shows the full maximum value with correct decimal places and currency symbol; no truncation or scientific notation |
| 25 | Navigate to the "Regulatory License Classification" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected |
| 26 | Click the "Save" or "Create" button | — | SAP begins processing the customer master creation with maximum credit limit |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated customer number; no errors or warnings about credit limit magnitude |
| 28 | Note the customer number from the success message | — | Customer number is displayed in standard format |
| 29 | Navigate back to the business partner list | — | Business partner list is displayed |
| 30 | Search for the newly created customer using the customer number | — | The created customer appears in the list |
| 31 | Open the customer record and verify the credit limit value | `{TD.maxCreditLimit}` | Credit limit is correctly stored and displayed with the full maximum value; no truncation, rounding, or overflow errors |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Customer Master record is successfully created with maximum credit limit
- Customer number is generated and displayed
- Credit limit field correctly stores and displays the maximum boundary value without overflow, truncation, or rounding errors
- Currency formatting is correctly applied to the large credit limit value
- Customer is available for sales transactions with the maximum credit exposure configured
- System handles extreme credit limit values without data integrity issues

---

### Post-conditions

- Customer Master exists with maximum credit limit configured
- Credit limit value is stored accurately in SAP database without data loss
- Credit management system can enforce credit checks using the maximum limit
- No application-level errors or critical warnings remain outstanding

---

### Actual Result

_[To be completed during test execution — verify exact credit limit value stored and displayed]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution; note if any truncation, overflow, or formatting issues occur]_

---
