# TC-CS-023: Attempt to Create Return Order with Non-existent Material ID

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
| P4 | Invalid Data | Material ID `{TD.invalidMaterialId}` does NOT exist in the SAP material master (MARA) or is not configured for sales organization `{TD.salesOrganization}` |
| P5 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.invalidMaterialId}` | Non-existent material number — entered by the user | Invalid |
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
| 9 | In the "Sold-to Party:*" header field, enter the valid Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated; sales organization and distribution channel are auto-filled |
| 11 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 12 | In the "Material" field of the new line item, enter the invalid Material ID | `{TD.invalidMaterialId}` | Invalid Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP displays an error message indicating the material does not exist or is not valid for the sales organization; material description and unit of measure fields remain blank |
| 14 | Observe the error message or validation indicator | — | Error message clearly states the material ID is invalid or not found; the message may read: "Material `{TD.invalidMaterialId}` does not exist" or "Material not valid for sales organization `{TD.salesOrganization}`" |
| 15 | Attempt to enter quantity in the "Quantity" field | `{TD.returnQuantity}` | Quantity may be entered, but the line item cannot be validated due to invalid material |
| 16 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission; error message highlights the Material field as invalid; submission is prevented |
| 17 | Observe the final system response | — | Return Order is NOT created; error message persists; user is prompted to correct the material ID |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating the material does not exist or is not valid for the sales organization
- Material details (description, unit of measure) are NOT auto-populated
- Return Order document is NOT created
- Error message clearly communicates the validation failure to the user
- System prevents submission and requires correction of the material ID

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
