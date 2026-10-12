# TC-CS-029: Attempt to Create Billing Document with Invalid Delivery Reference Format

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ERROR  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Delivery Number | `{TD.deliveryNumberInvalidFormat}` | Delivery reference with invalid format (e.g., alphabetic or special characters) | Invalid (wrong format) |
| Billing Type | `{TD.billingType}` | Billing document type (F2) | Valid |
| Billing Date | `{TD.billingDate}` | Billing date | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Billing Document" | — | Search results appear listing the Create Billing Document application |
| 8 | Click "Create Billing Document" from the search results | — | Create Billing Document application opens (VF01) |
| 9 | In the "Billing Type" field, enter the billing type | `{TD.billingType}` | Billing type is entered (F2) |
| 10 | Press Enter to confirm the billing type | — | Billing type is confirmed; additional fields become available |
| 11 | In the "Billing Date" field, enter the billing date | `{TD.billingDate}` | Billing date is entered |
| 12 | In the "Delivery" reference field section, enter the invalid delivery number format | `{TD.deliveryNumberInvalidFormat}` | Delivery number with invalid format is entered (e.g., "INVALID123" or "ABC@#$") |
| 13 | Press Enter to confirm the delivery entry | — | SAP attempts to validate the delivery number format |
| 14 | Observe the system validation response | — | System detects invalid delivery number format and displays a format validation error |
| 15 | Verify error message is displayed | — | System displays an error message indicating "Invalid delivery number format" or "Delivery must be numeric"; submission is blocked |
| 16 | Verify that delivery details are NOT auto-populated | — | No sold-to party, material, batch, or other delivery data is displayed |
| 17 | Verify that no billing document number is generated | — | No billing document number appears; the billing process cannot proceed |
| 18 | Attempt to click "Save" button (if available) | — | Save button is either disabled or clicking it produces the same format validation error |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No billing document is created
- SAP displays a clear error message indicating the delivery number format is invalid
- The system enforces proper delivery number format validation (typically 10-digit numeric)
- User is informed that a correctly formatted delivery document number must be provided
- No incomplete or partial billing document is persisted in the system

---

### Post-conditions

- No billing document exists in SAP
- No data corruption or unintended system state change occurs
- User is returned to the billing document creation form with the format validation error clearly indicated

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
