# TC-CS-063: Missing Work Center ID

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
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
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to create Work Center Master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active |
| P4 | Configuration | System mandatory field validation is enabled for Work Center ID |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Intentionally left blank or not entered | Invalid (missing) |
| Plant | `{TD.plant}` | Plant code where Work Center is located — entered by the user | Valid |
| Work Center Category | `{TD.workCenterCategory}` | Category code (e.g., 0001 for Machine) — selected by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Work Centers" | — | Search results appear listing the "Manage Work Centers" application |
| 8 | Click "Manage Work Centers" from the search results | — | Manage Work Centers application opens with the list view |
| 9 | Click the "Create" button in the application toolbar | — | New Work Center creation form opens in edit mode |
| 10 | Leave the "Work Center" field blank (do not enter any value) | — | Work Center ID field remains empty |
| 11 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; organizational data is auto-populated |
| 13 | In the "Category" dropdown, select the Work Center Category | `{TD.workCenterCategory}` | Work Center Category is selected; category-specific fields appear |
| 14 | Attempt to click the "Save" button in the toolbar | — | SAP validates mandatory fields before saving |
| 15 | Observe the on-screen validation response | — | An error message is displayed: "Work Center ID is a mandatory field. Please enter a value." or similar validation error |
| 16 | Verify that the Work Center ID field is highlighted or flagged as invalid | — | Work Center ID field is highlighted in red or displays an error icon |
| 17 | Verify that the Work Center is NOT created | — | No Work Center creation success message is displayed; form remains in edit mode with validation errors |
| 18 | Click the "Cancel" or "Discard" button to exit the creation form | — | Creation form is closed; no Work Center record is created |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validation logic prevents creation of Work Center without a Work Center ID (mandatory field)
- Error message is displayed: "Work Center ID is a mandatory field. Please enter a value." or similar validation error
- No Work Center is created in the system
- No system log entry is created for Work Center creation (validation failure prevents creation)
- Data integrity is maintained: Work Center ID is enforced as mandatory

---

### Post-conditions

- No Work Center Master record is created (no ID assigned)
- System validation rules remain enforced for mandatory fields

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
