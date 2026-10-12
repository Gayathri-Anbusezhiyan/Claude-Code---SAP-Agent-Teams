# TC-CS-026: Attempt to create source list with missing Material field

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Field Validation
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
| P3 | Master Data | Vendor `{TD.vendorId}` exists, is active, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | — | **MISSING** — not entered by the user | Missing (mandatory field) |
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
| 10 | Leave the "Material" field empty (do not enter any value) | — | Material field remains empty |
| 11 | In the "Vendor" field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered into the field |
| 12 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated |
| 13 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 14 | Press Enter to confirm the Plant entry | — | SAP validates the plant; purchasing organization `{TD.purchasingOrg}` is auto-populated |
| 15 | In the "Valid From" date field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is populated |
| 16 | In the "Valid To" date field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is populated |
| 17 | Select or check the "Fixed Vendor" / "Source List" indicator checkbox | — | The indicator is marked/selected |
| 18 | Attempt to click the "Save" button in the toolbar | — | SAP prevents submission and displays a validation error |
| 19 | Observe the error message and field highlighting | — | The "Material" field is highlighted as mandatory; an error message indicates the Material field is required |
| 20 | Verify that the source list record is not created | — | No success message is displayed; the form remains in edit mode with the validation error |
| 21 | Click the "Cancel" or "Discard" button to exit without saving | — | Confirmation dialog appears asking to discard changes |
| 22 | Confirm the discard action | — | Source list creation form is closed; user returns to the source list table view |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- No source list record is created by SAP
- SAP displays a validation error message indicating the "Material" field is mandatory
- The "Material" field is highlighted or marked with a validation indicator
- The "Save" button action is blocked or does not complete
- The form remains in edit mode with the validation error displayed

---

### Post-conditions

- No SAP source list record exists for this transaction
- The validation error was triggered and displayed
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
