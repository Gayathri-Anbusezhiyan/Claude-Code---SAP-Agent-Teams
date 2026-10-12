# TC-CS-030: Attempt to create source list with invalid Material ID (non-existent)

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Entity Validation
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
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create and maintain source lists |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material ID `{TD.invalidMaterialId}` does NOT exist in the SAP material master (MARA) |
| P4 | Master Data | Vendor `{TD.vendorId}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.invalidMaterialId}` | Non-existent material master number — entered by the user | Invalid (does not exist) |
| Vendor ID | `{TD.vendorId}` | Approved vendor account number — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Approval validity start date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Approval expiry date — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Source Lists" | — | Search results appear listing the "Manage Source Lists" application |
| 8 | Click "Manage Source Lists" from the search results | — | "Manage Source Lists" application opens with the source list table view |
| 9 | Click the "Create" button in the application toolbar | — | New source list creation form opens in edit mode |
| 10 | In the "Material" field, enter the invalid Material ID | `{TD.invalidMaterialId}` | Invalid Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP attempts validation and displays an error message indicating the Material does not exist |
| 12 | Observe the error message | — | Error message states the Material ID is not found or does not exist in the material master |
| 13 | Verify that the material description field remains empty | — | No material description is auto-populated; the Material field is marked with an error indicator |
| 14 | Attempt to proceed by entering remaining fields | — | System may allow entry but will not complete save with invalid material |
| 15 | In the "Vendor" field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered into the field |
| 16 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated |
| 17 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 18 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 19 | In the "Valid From" date field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is populated |
| 20 | In the "Valid To" date field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is populated |
| 21 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected |
| 22 | Attempt to click the "Save" button in the toolbar | — | SAP prevents submission due to invalid Material ID and displays a validation error |
| 23 | Observe the final error message | — | Error message indicates the Material ID is invalid and the source list cannot be created |
| 24 | Verify that the source list record is not created | — | No success message is displayed; the form remains in edit mode with the validation error |
| 25 | Click the "Cancel" or "Discard" button to exit without saving | — | Confirmation dialog appears asking to discard changes |
| 26 | Confirm the discard action | — | Source list creation form is closed; user returns to the source list table view |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No source list record is created by SAP
- SAP displays an error message indicating the Material ID does not exist or is invalid
- The Material field is marked with a validation error indicator
- No material description is auto-populated
- The "Save" button action is blocked or does not complete
- The form remains in edit mode with the validation error displayed

---

### Post-conditions

- No SAP source list record exists for this transaction
- The Material validation error was triggered and displayed
- No application-level errors or critical system warnings remain outstanding

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
