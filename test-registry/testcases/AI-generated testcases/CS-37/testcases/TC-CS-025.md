# TC-CS-025: Attempt to Submit Return Order with Customer Field Empty

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
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization |
| P4 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |
| P5 | Validation | Customer field is mandatory for Return Order creation — system enforces this rule |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.emptyValue}` | Customer field intentionally left blank — not entered by the user | Invalid (Empty) |
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
| 9 | Leave the "Sold-to Party:*" header field empty (do not enter any value) | `{TD.emptyValue}` | Customer field remains blank; the asterisk (*) indicates the field is mandatory |
| 10 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row may appear, or system may prevent item creation until customer is entered |
| 11 | If item row is created, in the "Material" field of the new line item, enter the valid Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 12 | If Material entry is allowed, press Enter to confirm the Material entry | — | Material may validate, but Return Order cannot be created without customer |
| 13 | If quantity entry is allowed, in the "Quantity" field, enter the return quantity | `{TD.returnQuantity}` | Return quantity may be entered |
| 14 | If return reason entry is allowed, in the "Reason for Rejection" field, enter the return reason code | `{TD.returnReasonCode}` | Return reason code may be entered |
| 15 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission; the Customer field is highlighted as mandatory; a validation message is displayed |
| 16 | Observe the error message or validation indicator | — | Error message clearly states the Customer field is mandatory and must be filled; the message may read: "Customer is a mandatory field" or "Enter Sold-to Party"; the Customer field is visually indicated as required (red border or similar) |
| 17 | Observe the final system response | — | Return Order is NOT created; submission is blocked; user is prompted to fill the Customer field |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System highlights the Customer field as mandatory and prevents submission
- A validation error message is displayed indicating the Customer field must be filled
- Return Order document is NOT created
- User is clearly prompted to correct the missing mandatory field
- All other field entries (if allowed) remain intact

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
