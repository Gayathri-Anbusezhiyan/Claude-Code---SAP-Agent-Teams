# TC-CS-022: Attempt to Create Return Order with Non-existent Customer ID

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
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
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Return Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Invalid Data | Customer ID `{TD.invalidCustomerId}` does NOT exist in the SAP customer master (KNA1) |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.invalidCustomerId}` | Non-existent customer account number — entered by the user | Invalid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantity}` | Quantity of returned goods — entered by the user | Valid |
| Return Reason Code | `{TD.returnReasonCode}` | Reason for rejection code — selected by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Return Order" | — | Search results appear listing the Return Order creation application |
| 8 | Click the "Create Return Order" application name from the search results | — | Return Order creation form opens in edit mode |
| 9 | In the "Sold-to Party:*" header field, enter the invalid Customer ID | `{TD.invalidCustomerId}` | Invalid Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP displays an error message indicating the customer does not exist or is not valid; customer name field remains blank; organizational fields (sales organization, distribution channel) are NOT auto-populated |
| 11 | Observe the error message or validation indicator | — | Error message clearly states the customer ID is invalid or not found; the message may read: "Customer `{TD.invalidCustomerId}` does not exist" or "Invalid customer account" |
| 12 | Attempt to proceed to the Items section | — | System prevents proceeding or displays validation errors preventing document creation |
| 13 | If the Items section is accessible, enter valid Material ID in the "Material" field | `{TD.materialId}` | Material ID is entered |
| 14 | Press Enter to confirm the Material entry | — | Material may validate successfully, but the Return Order cannot be created due to invalid customer |
| 15 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission; error message highlights the Customer field as invalid; submission is prevented |
| 16 | Observe the final system response | — | Return Order is NOT created; error message persists; user is prompted to correct the customer ID |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating the customer does not exist or is invalid
- Customer details (name, organizational data) are NOT auto-populated
- Return Order document is NOT created
- Error message clearly communicates the validation failure to the user
- System prevents submission and requires correction of the customer ID

---

### Post-conditions

- No Return Order document is created in SAP
- No document number is generated
- No credit processing is initiated
- System state remains unchanged; no data is persisted

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
