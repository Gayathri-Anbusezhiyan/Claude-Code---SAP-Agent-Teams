# TC-CS-023: Attempt to Create Customer Master with Non-Existent Sales Organization

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
| P3 | Invalid Data | Sales Organization `{TD.invalidSalesOrganization}` does NOT exist in SAP configuration |
| P4 | Valid Data | Distribution Channel `{TD.distributionChannel}` and Division `{TD.division}` exist and are active |
| P5 | Financial Data | Company Code `{TD.companyCode}` is active and linked to Credit Control Area |
| P6 | Configuration | Customer Account Group `{TD.customerAccountGroup}` is configured with external number range |

---

### Test Data

**Dataset Reference:** `testdata/CS-43/CS-43-testdata.json` — Dataset ID: `TD-CS-043-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer Name | `{TD.customerName}` | Customer business name — entered by the user | Valid |
| Credit Limit | `{TD.creditLimit}` | Maximum credit amount — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for credit limit — entered by the user | Valid |
| Regulatory License | `{TD.regulatoryLicense}` | Valid license classification code | Valid |
| Sales Organization | `{TD.invalidSalesOrganization}` | Non-existent sales organization code | Invalid |
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
| 13 | Navigate to the "Sales Area" section and enter the invalid Sales Organization | `{TD.invalidSalesOrganization}` | Invalid Sales Organization code is entered |
| 14 | Press Enter to confirm the Sales Organization entry | — | SAP attempts to validate the sales organization; an error message is displayed indicating the Sales Organization does not exist or is not valid; the field is highlighted as containing invalid data |
| 15 | Attempt to proceed by entering the Distribution Channel | `{TD.distributionChannel}` | Distribution Channel may be entered but sales area validation remains failed |
| 16 | Attempt to enter the Division | `{TD.division}` | Division may be entered but sales area combination cannot be validated due to invalid Sales Organization |
| 17 | Navigate to the "Company Code" section and enter the company code | `{TD.companyCode}` | Company Code is entered |
| 18 | Navigate to the "Credit Management" section and enter the credit limit | `{TD.creditLimit}` | Credit limit amount is entered |
| 19 | In the "Currency" field, enter the currency code | `{TD.currency}` | Currency code is entered |
| 20 | Navigate to the "Regulatory License Classification" field and select the license value | `{TD.regulatoryLicense}` | Regulatory license classification is selected |
| 21 | Attempt to click the "Save" or "Create" button | — | SAP prevents submission; validation error remains visible indicating the Sales Organization field contains invalid or non-existent data |
| 22 | Observe the final state | — | Customer master record is NOT created; error message clearly states that the Sales Organization does not exist or is invalid; user remains on the creation form |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Customer Master record is NOT created
- SAP displays a clear validation error message indicating that the Sales Organization does not exist or is not valid
- The Sales Organization field is highlighted or marked as containing invalid data
- User is unable to save the customer master record until a valid Sales Organization is provided
- System enforces organizational data integrity by preventing creation with invalid sales area

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
