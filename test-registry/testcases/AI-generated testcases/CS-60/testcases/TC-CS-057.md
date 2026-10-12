# TC-CS-057: Mark Work Center as Out of Service and Verify Automatic Exclusion from Capacity Planning

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to change Work Center status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.existingWorkCenterId}` exists in Plant `{TD.plant}` with active status and valid calibration |
| P4 | Configuration | Work Center is currently flagged as "Capacity Planning Eligible" (available for Process Order scheduling) |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Existing Work Center ID | `{TD.existingWorkCenterId}` | Work Center to be marked out of service | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| Out of Service Status | `{TD.outOfServiceStatus}` | Status code for out-of-service (e.g., "Maintenance") | Valid |

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
| 9 | In the Work Center search filter field, enter the existing Work Center ID | `{TD.existingWorkCenterId}` | Work Center ID is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Work Center appears in the list |
| 11 | Click on the Work Center ID in the list to open the record | `{TD.existingWorkCenterId}` | Work Center detail view opens in display mode |
| 12 | Verify the current status shows "Active" or "Available" | — | Work Center status is "Active"; Capacity Planning Eligible indicator shows "Yes" |
| 13 | Click the "Edit" button in the toolbar | — | Work Center record switches to edit mode |
| 14 | Navigate to the "Status" or "General Data" tab or section | — | Status fields are displayed |
| 15 | Change the Work Center status to "Out of Service" or select the maintenance status | `{TD.outOfServiceStatus}` | Out of Service status is selected |
| 16 | If a reason code or maintenance note field is displayed, enter a reason | — | Reason code or note is entered (e.g., "Equipment undergoing calibration maintenance") |
| 17 | Click the "Save" button in the toolbar | — | SAP processes the Work Center status update |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.existingWorkCenterId}` status updated successfully" |
| 19 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 20 | Search for the updated Work Center using the Work Center ID | `{TD.existingWorkCenterId}` | The updated Work Center appears in the list with status "Out of Service" or maintenance status indicator |
| 21 | Open the Work Center record again by clicking on the Work Center ID | — | Work Center detail view is displayed |
| 22 | Verify the "Capacity Planning Eligible" indicator | — | Indicator shows "No" or equivalent — Work Center is excluded from capacity planning |
| 23 | Verify the available capacity is zero or unavailable | — | Available capacity field shows "0" or is grayed out |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Work Center `{TD.existingWorkCenterId}` status is successfully changed to "Out of Service" or maintenance status
- Work Center is automatically excluded from capacity planning (Capacity Planning Eligible = No)
- Available capacity is reduced to zero or marked unavailable
- Process Order scheduling engine will NOT assign new operations to this Work Center
- System log entry is created recording the status change and capacity exclusion (audit trail)

---

### Post-conditions

- SAP Work Center Master record `{TD.existingWorkCenterId}` has status "Out of Service" or maintenance status
- Work Center is flagged as "Not Capacity Planning Eligible"
- No new Process Orders can be scheduled to this Work Center until status is changed back to "Active" and requalified

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
