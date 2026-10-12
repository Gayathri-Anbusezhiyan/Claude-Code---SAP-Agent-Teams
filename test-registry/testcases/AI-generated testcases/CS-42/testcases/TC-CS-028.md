# TC-CS-028: Attempt to Submit Billing Document with Billing Type Field Empty

**User Story:**          [CS-42] Generate A Billing Document Only After The Delivery's Batch And Quality Release Status Is Confirmed  
**Epic:**                N/A — no epic assigned  
**Module:**              Sales & Distribution (SD)  
**Feature:**             Billing Document Creation with Batch and Quality Management Validation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ERROR  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM  

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Billing Specialist with SAP authorization to create billing documents (VF01) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Delivery | Delivery document `{TD.deliveryNumber}` exists with goods issue posted and all batch/quality prerequisites met |

---

### Test Data

**Dataset Reference:** `testdata/CS-42/CS-42-testdata.json` — Dataset ID: `TD-CS-042-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Billing Type | `{TD.emptyValue}` | Billing Type field left empty (blank) | Invalid (mandatory field) |
| Delivery Number | `{TD.deliveryNumber}` | Valid delivery document number | Valid |
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
| 9 | Leave the "Billing Type" field empty (do not enter any value) | `{TD.emptyValue}` | Billing Type field remains blank |
| 10 | In the "Billing Date" field, enter the billing date | `{TD.billingDate}` | Billing date is entered |
| 11 | In the "Delivery" reference field section, enter the delivery number | `{TD.deliveryNumber}` | Delivery number is entered |
| 12 | Press Enter to confirm the delivery entry | — | SAP may validate delivery but Billing Type is still missing |
| 13 | Attempt to click the "Save" button in the toolbar | — | SAP performs mandatory field validation before processing |
| 14 | Observe the system validation response | — | System highlights the Billing Type field as mandatory and displays a validation error |
| 15 | Verify error message is displayed | — | System displays an error message indicating "Enter a billing type" or "Billing Type is a required field"; submission is blocked |
| 16 | Verify that the Billing Type field is visually indicated as required | — | Billing Type field is highlighted in red or with an error indicator; field label shows mandatory marker (asterisk) |
| 17 | Verify that no billing document number is generated | — | No billing document number appears; the billing process cannot proceed |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No billing document is created
- SAP displays a clear error message indicating the Billing Type field is mandatory
- The Billing Type field is visually highlighted as requiring input
- User is prevented from submitting the form until the mandatory field is filled
- No incomplete or partial billing document is persisted in the system

---

### Post-conditions

- No billing document exists in SAP
- Delivery `{TD.deliveryNumber}` remains unbilled
- No data corruption or unintended system state change occurs
- User is returned to the billing document creation form with the error clearly indicated

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
