# TC-CS-025: Attempt to Create Sales Order for Non-existent Customer

**User Story:**          [CS-44] User Story SD-012
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order Creation with Credit Limit Check
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer ID `{TD.invalidCustomerId}` does NOT exist in the SAP customer master (KNA1) |
| P4 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and properly configured |

---

### Test Data

**Dataset Reference:** `testdata/CS-44/CS-44-testdata.json` — Dataset ID: `TD-CS-044-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.invalidCustomerId}` | Non-existent Sold-To Party account number — entered by the user | Invalid |
| Sales Organization | `{TD.salesOrganization}` | Sales organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the Manage Sales Orders application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-To Party:*" field, enter the invalid Customer ID | `{TD.invalidCustomerId}` | Invalid Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP attempts to validate the customer; validation fails |
| 12 | Observe the on-screen response | — | An error message is displayed indicating that the customer does not exist; customer name is NOT auto-populated; Sold-To Party field is highlighted as invalid |
| 13 | Verify that the error message specifically references the non-existent customer | — | Message text includes "customer not found" or "customer does not exist" or "enter a valid customer" or similar language |
| 14 | Verify that the Sales Organization, Distribution Channel, and Division fields are NOT populated or remain empty | — | Organizational fields remain unpopulated or show default values without valid customer context |
| 15 | Attempt to proceed to the Items section | — | Items section may be disabled or inaccessible; or items can be added but order submission will be blocked due to invalid customer |
| 16 | Verify that the "Save" button is either disabled or that clicking it results in a validation error | — | Save button is disabled OR clicking Save results in an error message preventing order creation due to invalid customer |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Sales Order is NOT created; no document number is generated
- SAP displays an error message indicating that the customer does not exist in the customer master
- Customer details (name, credit data, organizational data) are NOT auto-populated
- The Sold-To Party field is highlighted or marked as invalid
- The system prevents order creation due to the invalid customer ID
- The user is clearly informed that the customer must exist and be valid before order creation can proceed

---

### Post-conditions

- No SAP Sales Order document is created
- No document number is generated
- The error message has been displayed referencing the non-existent customer
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
