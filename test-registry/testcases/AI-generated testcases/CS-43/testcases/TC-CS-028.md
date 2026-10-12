# TC-CS-028: Create Customer Master with Zero Credit Limit

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
| P6 | Business Rule | Zero credit limit represents a COD (Cash on Delivery) or prepayment-only customer scenario — verify system behaviour per business configuration |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.zeroCreditLimit}` | Zero credit limit amount (boundary test) — entered by the user | Boundary (0) |
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
| 21 | Navigate to the "Credit Management" section and enter zero as the credit limit | `{TD.zeroCreditLimit}` | Zero value (0 or 0.00) is entered in the credit limit field |
| 22 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 23 | Press Enter to confirm the credit limit and currency | — | SAP processes the zero credit limit value; behaviour depends on business configuration: EITHER credit limit is accepted as valid (COD customer scenario) OR SAP displays a validation warning/error indicating credit limit must be greater than zero |
| 24 | Navigate to the "Regulatory License Classification" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected |
| 25 | Attempt to click the "Save" or "Create" button | — | SAP processes the submission; behaviour depends on tenant configuration: EITHER customer is successfully created with zero credit limit (COD scenario) OR submission is blocked with validation error |
| 26 | Observe the on-screen response | — | EITHER success message displays with generated customer number (zero credit accepted) OR error message displays indicating credit limit must be greater than zero (zero credit rejected) |
| 27 | If customer was created, note the customer number and navigate back to business partner list | — | If successful, customer number is displayed; list is accessible |
| 28 | If customer was created, search for the newly created customer | — | If successful, customer appears in list with zero credit limit recorded |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

**Outcome depends on SAP tenant business configuration:**

**Scenario A (Zero credit accepted):**
- Customer Master record is successfully created with zero credit limit
- Customer number is generated and displayed
- Customer represents a COD (Cash on Delivery) or prepayment-only customer
- Future sales orders to this customer will require payment before delivery or block credit-based orders

**Scenario B (Zero credit rejected):**
- Customer Master record is NOT created
- SAP displays validation error: "Credit limit must be greater than zero" or equivalent
- System enforces minimum non-zero credit limit requirement per business rule
- User must enter a positive credit limit value to proceed

---

### Post-conditions

**If Scenario A (accepted):**
- Customer Master exists with zero credit limit
- Credit management rules enforce COD or prepayment for this customer

**If Scenario B (rejected):**
- No Customer Master record created
- No customer number generated
- User must provide non-zero credit limit

---

### Actual Result

_[To be completed during test execution — document which scenario occurred and record the exact SAP response]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution; note which scenario (A or B) was observed]_

---
