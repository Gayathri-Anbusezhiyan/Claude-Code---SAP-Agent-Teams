# TC-CS-070: Available Capacity Equals 1 Minute (Minimum Valid)

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

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Unique Work Center identifier — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located — entered by the user | Valid |
| Work Center Category | `{TD.workCenterCategory}` | Category code (e.g., 0001 for Machine) — selected by the user | Valid |
| Equipment Number | `{TD.equipmentNumber}` | Equipment Master record number — entered by the user | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Next calibration due date — entered by the user | Valid (future date) |
| Available Capacity | `{TD.availableCapacity}` | 1 minute (minimum valid capacity) — entered by the user | Valid (boundary) |
| Capacity Unit | `{TD.capacityUnit}` | MIN (minutes) — selected by the user | Valid |

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
| 18 | In the "Next Calibration Due" field, enter the calibration expiration date | `{TD.calibrationExpirationDate}` | Calibration expiration date is entered (future date) |
| 19 | Press Enter to confirm the calibration date entry | — | Date is confirmed; calibration status indicator shows "Valid" |
| 20 | Navigate to the "Capacity" tab or section | — | Capacity fields are displayed |
| 21 | In the "Available Capacity" field, enter 1 (one) | `{TD.availableCapacity}` | Capacity value "1" is entered (minimum valid capacity) |
| 22 | In the "Capacity Unit" dropdown, select "MIN" (minutes) | `{TD.capacityUnit}` | Capacity unit "MIN" is selected |
| 23 | Click the "Save" button in the toolbar | — | SAP processes the Work Center creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.workCenterId}` created successfully" |
| 25 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 26 | Search for the newly created Work Center using the Work Center ID | `{TD.workCenterId}` | The created Work Center appears in the list with Available Capacity "1 MIN" |
| 27 | Open the Work Center record by clicking on the Work Center ID | — | Work Center detail view is displayed with available capacity = 1 MIN |
| 28 | Verify the "Capacity Planning Eligible" indicator or status | — | Indicator shows "Yes" or equivalent — Work Center is included in capacity planning (1 minute is valid capacity) |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Work Center `{TD.workCenterId}` is successfully created with available capacity = 1 minute (minimum valid boundary)
- Calibration Status indicator displays "Valid"
- Work Center is flagged as eligible for capacity planning (1 minute capacity is valid)
- System accepts 1 minute as a valid available capacity (lower boundary test passed)
- Capacity planning engine can assign operations to this Work Center (up to 1 minute of work)
- System log entry is created recording the Work Center creation with minimum capacity (audit trail)

---

### Post-conditions

- SAP Work Center Master record exists with ID `{TD.workCenterId}` and available capacity = 1 MIN
- Work Center status is "Active" and "Capacity Planning Eligible"
- Process Orders with operations requiring ≤ 1 minute can be scheduled to this Work Center

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
