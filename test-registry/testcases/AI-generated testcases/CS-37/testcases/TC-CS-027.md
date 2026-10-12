# TC-CS-027: Attempt to Submit Return Order with Quantity Field Empty

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |
| P6 | Validation | Quantity field is mandatory for Return Order line items — system enforces this rule |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number — entered by the user | Valid |
| Return Quantity | `{TD.emptyValue}` | Quantity field intentionally left blank — not entered by the user | Invalid (Empty) |
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
| 9 | In the "Sold-to Party:*" header field, enter the valid Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated; sales organization and distribution channel are auto-filled |
| 11 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 12 | In the "Material" field of the new line item, enter the valid Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 14 | Leave the "Quantity" field empty (do not enter any value) | `{TD.emptyValue}` | Quantity field remains blank |
| 15 | In the "Reason for Rejection" field, enter the return reason code | `{TD.returnReasonCode}` | Return reason code is entered |
| 16 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission; the Quantity field on the line item is highlighted as mandatory; a validation message is displayed |
| 17 | Observe the error message or validation indicator | — | Error message clearly states the Quantity field is mandatory and must be filled; the message may read: "Quantity is a mandatory field" or "Enter Quantity"; the Quantity field is visually indicated as required (red border or similar) |
| 18 | Observe the final system response | — | Return Order is NOT created; submission is blocked; user is prompted to fill the Quantity field on the line item |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System highlights the Quantity field on the line item as mandatory and prevents submission
- A validation error message is displayed indicating the Quantity field must be filled
- Return Order document is NOT created
- User is clearly prompted to correct the missing mandatory field
- Header data (Customer) and Material data remain intact

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
