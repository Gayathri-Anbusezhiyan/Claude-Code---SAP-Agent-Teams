# TC-CS-067: Calibration Expiration Date Equals Today (Minimum Valid Boundary)

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to create Work Center Master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active |
| P4 | Master Data | Equipment `{TD.equipmentNumber}` exists in Equipment Master (PM module) with active status |
| P5 | Configuration | Work Center Category `{TD.workCenterCategory}` is configured and available for selection |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Unique Work Center identifier — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located — entered by the user | Valid |
| Work Center Category | `{TD.workCenterCategory}` | Category code (e.g., 0001 for Machine) — selected by the user | Valid |
| Equipment Number | `{TD.equipmentNumber}` | Equipment Master record number — entered by the user | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Today's date (minimum valid boundary) — entered by the user | Valid (boundary) |

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
| 10 | In the "Work Center" field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID value is entered into the field |
| 11 | Press Enter to confirm the Work Center ID entry | — | Work Center ID is confirmed; cursor moves to next field |
| 12 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; organizational data is auto-populated |
| 14 | In the "Category" dropdown, select the Work Center Category | `{TD.workCenterCategory}` | Work Center Category is selected; category-specific fields appear |
| 15 | In the "Equipment" field, enter the Equipment Number | `{TD.equipmentNumber}` | Equipment Number is entered into the field |
| 16 | Press Enter to confirm the Equipment Number entry | — | SAP validates the equipment; Equipment Description is auto-populated |
| 17 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed |
| 18 | In the "Next Calibration Due" field, enter today's date | `{TD.calibrationExpirationDate}` | Today's date is entered (minimum valid boundary) |
| 19 | Press Enter to confirm the calibration date entry | — | Date is confirmed; calibration status indicator shows "Valid" (date is today, not in the past) |
| 20 | Click the "Save" button in the toolbar | — | SAP processes the Work Center creation |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.workCenterId}` created successfully" |
| 22 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 23 | Search for the newly created Work Center using the Work Center ID | `{TD.workCenterId}` | The created Work Center appears in the list with Calibration Status "Valid" or "Expires Today" |
| 24 | Open the Work Center record by clicking on the Work Center ID | — | Work Center detail view is displayed with calibration expiration date = today's date |
| 25 | Verify the "Capacity Planning Eligible" indicator or status | — | Indicator shows "Yes" or equivalent — Work Center is included in capacity planning (today is still valid) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Work Center `{TD.workCenterId}` is successfully created with calibration expiration date equal to today's date (minimum valid boundary)
- Calibration Status indicator displays "Valid" or "Expires Today" (today is the last valid day, not past)
- Work Center is flagged as eligible for capacity planning (boundary date is still valid)
- System accepts today's date as a valid calibration expiration date (lower boundary test passed)
- System log entry is created recording the Work Center creation with boundary date (audit trail)

---

### Post-conditions

- SAP Work Center Master record exists with ID `{TD.workCenterId}` and calibration expiration date = today
- Work Center status is "Active" and "Capacity Planning Eligible"
- After midnight (next day), calibration status will change to "Expired" and Work Center will be excluded from capacity planning

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
