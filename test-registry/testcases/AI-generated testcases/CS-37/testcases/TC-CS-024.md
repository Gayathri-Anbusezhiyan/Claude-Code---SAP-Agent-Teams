# TC-CS-024: Attempt to Create Return Order with Non-existent Quality Notification Number

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Invalid Data | Quality Notification number `{TD.invalidQualityNotification}` does NOT exist in the SAP QM module |
| P6 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantity}` | Quantity of returned goods — entered by the user | Valid |
| Return Reason Code | `{TD.returnReasonCode}` | Reason for rejection code — selected by the user | Valid |
| Quality Notification | `{TD.invalidQualityNotification}` | Non-existent QM notification number — entered by the user | Invalid |

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
| 14 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantity}` | Return quantity is populated in the line item |
| 15 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 16 | In the "Reason for Rejection" field, select or enter the return reason code | `{TD.returnReasonCode}` | Return reason code is populated in the line item |
| 17 | Press Enter to confirm the return reason entry | — | Return reason is confirmed |
| 18 | In the "Quality Notification" field (header or item level), enter the invalid Quality Notification number | `{TD.invalidQualityNotification}` | Invalid Quality Notification number is entered into the field |
| 19 | Press Enter to confirm the Quality Notification entry | — | SAP displays an error message indicating the Quality Notification does not exist or is not valid; QM notification details are NOT populated |
| 20 | Observe the error message or validation indicator | — | Error message clearly states the Quality Notification number is invalid or not found; the message may read: "Quality Notification `{TD.invalidQualityNotification}` does not exist" or "Invalid notification number" |
| 21 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission; error message highlights the Quality Notification field as invalid; submission is prevented |
| 22 | Observe the final system response | — | Return Order is NOT created; error message persists; user is prompted to correct the Quality Notification number |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating the Quality Notification does not exist or is not valid
- Quality Notification details are NOT populated
- Return Order document is NOT created
- Error message clearly communicates the validation failure to the user
- System prevents submission and requires correction of the Quality Notification number

---

### Post-conditions

- No Return Order document is created in SAP
- No document number is generated
- No credit processing is initiated
- No QM integration link is established
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
