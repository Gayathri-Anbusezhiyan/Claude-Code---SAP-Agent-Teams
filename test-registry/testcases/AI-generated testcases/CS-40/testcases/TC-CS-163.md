# TC-CS-163: Attempt ATP Check with Non-existent Customer

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to perform ATP checks and create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.invalidCustomerId}` does NOT exist in SAP |
| P4 | Configuration | Sales Organization `{TD.salesOrg}` is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID (Invalid) | `{TD.invalidCustomerId}` | Non-existent customer account number | Invalid |
| Material ID | `{TD.materialId}` | Batch-managed material master number | Valid |
| Requested Quantity | `{TD.requestedQuantity}` | Order quantity requested | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the "Manage Sales Orders" application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-to Party:*" header field, enter the invalid Customer ID | `{TD.invalidCustomerId}` | Invalid Customer ID is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP attempts to validate the customer; an error message is displayed indicating the customer does not exist; customer name is NOT auto-populated |
| 12 | Verify the error message content | — | Error message states that the customer does not exist, is not found, or is not valid for the sales organization |
| 13 | Attempt to populate the Items section | — | Items section may be disabled or entry is allowed but ATP check cannot proceed without valid customer |
| 14 | Attempt to click the "Save" button in the toolbar | — | SAP displays a blocking error preventing save; Sales Order cannot be created with invalid customer |
| 15 | Verify that no ATP check is triggered | — | No ATP status indicator appears; ATP check cannot execute without valid customer master data |
| 16 | Observe the final system response | — | Sales Order is NOT created; error is clearly communicated to user; system prevents submission with non-existent customer |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating the customer does not exist
- Customer name is NOT auto-populated
- ATP check is NOT triggered because valid customer master data is required
- Sales Order is NOT created
- System prevents submission with non-existent customer
- Error is clearly communicated to the user

---

### Post-conditions

- No Sales Order document is created
- No ATP check is performed
- No application-level critical errors remain outstanding (validation error messages are expected)

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
