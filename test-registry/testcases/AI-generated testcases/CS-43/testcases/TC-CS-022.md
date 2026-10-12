# TC-CS-022: Attempt to Create Customer Master with Invalid Regulatory License Classification

**User Story:**          [CS-43] Create A New Customer Master Record With A Designated Credit Limit And
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Customer Master Data Management
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
| P1 | User Role | User has the role of Customer Master Data Specialist with SAP authorization to create customer master records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Organizational Data | Sales Organization `{TD.salesOrganization}` exists, is active, and configured with Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` |
| P4 | Financial Data | Company Code `{TD.companyCode}` is active and linked to Credit Control Area `{TD.creditControlArea}` |
| P5 | Invalid Data | Regulatory License Classification value `{TD.invalidRegulatoryLicense}` does NOT exist in SAP configuration |
| P6 | Configuration | Regulatory License Classification field is configured with predefined values only — free-text entry is NOT permitted |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.creditLimit}` | Maximum credit amount — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for credit limit — entered by the user | Valid |
| Regulatory License | `{TD.invalidRegulatoryLicense}` | Invalid/non-existent license classification code | Invalid |
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
| 21 | Navigate to the "Credit Management" section and enter the credit limit | `{TD.creditLimit}` | Credit limit amount is entered |
| 22 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered and validated |
| 23 | Press Enter to confirm the credit limit and currency | — | Credit limit is formatted according to currency settings |
| 24 | Navigate to the "Regulatory License Classification" field and attempt to enter or select the invalid license value | `{TD.invalidRegulatoryLicense}` | Attempt is made to enter invalid license classification |
| 25 | Press Enter to confirm or attempt to save | — | SAP displays a validation error message indicating that the regulatory license classification is invalid or does not exist in the system; the field is highlighted as containing invalid data |
| 26 | Attempt to click the "Save" or "Create" button | — | SAP prevents submission; error message remains visible indicating the Regulatory License Classification field contains invalid data |
| 27 | Observe the final state | — | Customer master record is NOT created; user remains on the creation form with the validation error displayed |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Customer Master record is NOT created
- SAP displays a clear validation error message indicating that the Regulatory License Classification value is invalid or does not exist
- The Regulatory License Classification field is highlighted or marked as containing invalid data
- User is unable to save the customer master record until a valid license classification is provided
- System enforces data integrity by preventing creation with invalid regulatory compliance data

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
