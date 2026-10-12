# TC-CS-025: Attempt to Submit Customer Master with Customer Name Field Empty

**User Story:**          [CS-43] Create A New Customer Master Record With A Designated Credit Limit And
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Customer Master Data Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Master Data Specialist with SAP authorization to create customer master records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Organizational Data | Sales Organization `{TD.salesOrganization}` exists, is active, and configured with Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` |
| P4 | Financial Data | Company Code `{TD.companyCode}` is active and linked to Credit Control Area |
| P5 | Configuration | Customer Account Group `{TD.customerAccountGroup}` is configured; Customer Name is a mandatory field per SAP configuration |
| P6 | Test Scenario | Customer Name field will be intentionally left EMPTY to test mandatory field validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.emptyValue}` | Customer name field — intentionally left EMPTY | Empty (Invalid) |
| Credit Limit | `{TD.creditLimit}` | Maximum credit amount — entered by the user | Valid |
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
| 11 | Intentionally skip the "Name 1" or "Customer Name" field and leave it EMPTY | `{TD.emptyValue}` | Customer Name field remains blank |
| 12 | In the "Country" field, enter the country key | `{TD.country}` | Country key is entered |
| 13 | Navigate to the "Sales Area" section and enter the Sales Organization | `{TD.salesOrganization}` | Sales Organization is entered |
| 14 | Press Enter to confirm the Sales Organization entry | — | SAP validates the sales organization |
| 15 | In the "Distribution Channel" field, enter the distribution channel | `{TD.distributionChannel}` | Distribution Channel is entered |
| 16 | Press Enter to confirm the Distribution Channel entry | — | SAP validates the distribution channel |
| 17 | In the "Division" field, enter the division | `{TD.division}` | Division is entered |
| 18 | Press Enter to confirm the Division entry | — | SAP validates the sales area |
| 19 | Navigate to the "Company Code" section and enter the company code | `{TD.companyCode}` | Company Code is entered |
| 20 | Press Enter to confirm the Company Code entry | — | SAP validates the company code; Credit Control Area is auto-populated |
| 21 | Navigate to the "Credit Management" section and enter the credit limit | `{TD.creditLimit}` | Credit limit amount is entered |
| 22 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 23 | Navigate to the "Regulatory License Classification" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected |
| 24 | Attempt to click the "Save" or "Create" button | — | SAP highlights the Customer Name field as mandatory and prevents submission; a validation error message is displayed indicating "Customer Name is a required field" or "Enter a value for Customer Name"; the Customer Name field is visually indicated as required (typically with red border or asterisk) |
| 25 | Observe the final state | — | Customer master record is NOT created; error message clearly identifies the missing mandatory field; user remains on the creation form with Customer Name field highlighted |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Customer Master record is NOT created
- SAP highlights the Customer Name field as mandatory and prevents submission
- A validation error message is displayed indicating that Customer Name is a required field
- The Customer Name field is visually indicated as required (red border, asterisk, or error icon)
- User is prompted to fill the missing Customer Name field before proceeding
- System enforces data completeness by preventing creation with missing mandatory fields

---

### Post-conditions

- No Customer Master record is created in SAP
- No customer number is generated
- SAP database remains unchanged
- Validation error is clearly communicated to the user

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
