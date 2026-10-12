# TC-CS-134: Missing Root Cause field when documenting deviation

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation CAPA Field Validation — Root Cause
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and manage Quality Notifications (QM02, QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Deviation Creation Context | User is in the process of creating or editing a Quality Notification (Deviation) |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Root Cause (Missing) | — | Root Cause field is intentionally left empty | Invalid (mandatory field) |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text | Valid |
| Corrective Action | `{TD.correctiveAction}` | Corrective action text | Valid |
| Preventive Action | `{TD.preventiveAction}` | Preventive action text | Valid |

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
| 7 | Navigate to a Quality Notification (Deviation) creation or edit screen (via "Create Quality Notification" or by opening an existing deviation) | — | Quality Notification form is displayed |
| 8 | Leave the Root Cause field EMPTY (do NOT enter any root cause code or description) | — | Root Cause field remains blank |
| 9 | In the Impact Assessment field, enter the impact assessment text | `{TD.impactAssessment}` | Impact Assessment text is entered |
| 10 | In the Corrective Action field, enter the corrective action text | `{TD.correctiveAction}` | Corrective Action text is entered |
| 11 | In the Preventive Action field, enter the preventive action text | `{TD.preventiveAction}` | Preventive Action text is entered |
| 12 | Attempt to click the "Save" button | — | System validates mandatory fields before saving |
| 13 | Observe the system response | — | System displays a validation error message: "Root Cause is mandatory" or "Please enter a root cause" |
| 14 | Verify that the Root Cause field is highlighted as a mandatory field error | — | Root Cause field is highlighted in red or marked with an asterisk (*) and error indicator |
| 15 | Verify that the deviation is NOT saved | — | No success message is displayed; form remains in edit mode |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents deviation save when Root Cause field is empty
- Validation error message is displayed: "Root Cause is mandatory"
- Root Cause field is highlighted as a mandatory field error
- Form remains in edit mode; deviation is not saved

---

### Post-conditions

- Deviation is not saved
- Root Cause field is still empty
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
