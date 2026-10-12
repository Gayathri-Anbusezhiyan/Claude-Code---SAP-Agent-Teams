# TC-CS-138: Missing Disposition Decision at deviation closure

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Disposition Validation at Closure
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and manage Quality Notifications (QM02, QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Deviation Exists | A Quality Notification (Deviation) has been created with complete CAPA documentation (Root Cause, Impact Assessment, Corrective Action, Preventive Action) and status "OUTSTANDING" |
| P4 | Disposition Missing | The Disposition Decision field has NOT been selected at the time of attempting closure |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Deviation Number | `{TD.deviationNumber}` | Quality Notification number with status OUTSTANDING | Valid |
| Disposition Decision (Missing) | — | Disposition decision field is intentionally left empty at closure | Invalid (mandatory field at closure) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Quality Notifications" | — | Search results appear listing the "Manage Quality Notifications" application |
| 8 | Click the "Manage Quality Notifications" application from the search results | — | Application opens showing the notification list |
| 9 | Filter for Deviation Number and open the deviation details | `{TD.deviationNumber}` | Deviation details page opens |
| 10 | Verify that all CAPA fields are populated (Root Cause, Impact Assessment, Corrective Action, Preventive Action) | — | All CAPA fields are complete |
| 11 | Verify that the Disposition Decision field is EMPTY | — | Disposition Decision field is blank |
| 12 | Attempt to click the "Close Deviation" button | — | System validates mandatory fields before closure |
| 13 | Observe the system response | — | System displays a validation error message: "Disposition Decision is mandatory" or "Please select a disposition before closing" |
| 14 | Verify that the Disposition Decision field is highlighted as a mandatory field error | — | Disposition Decision field is highlighted in red or marked with an error indicator |
| 15 | Verify that the deviation status remains "OUTSTANDING" (not closed) | — | Deviation status is unchanged |
| 16 | Verify that the deviation is NOT closed | — | No success message is displayed; deviation remains open |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents deviation closure when Disposition Decision field is empty
- Validation error message is displayed: "Disposition Decision is mandatory"
- Disposition Decision field is highlighted as a mandatory field error
- Deviation status remains "OUTSTANDING" (not closed)

---

### Post-conditions

- Deviation status remains "OUTSTANDING"
- Disposition Decision field is still empty
- Deviation record is not closed
- No application-level errors remain outstanding

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
