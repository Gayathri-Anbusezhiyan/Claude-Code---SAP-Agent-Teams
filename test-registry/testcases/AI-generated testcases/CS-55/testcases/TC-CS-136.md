# TC-CS-136: Missing Corrective Action field when documenting deviation

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation CAPA Field Validation — Corrective Action
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

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text | Valid |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text | Valid |
| Corrective Action (Missing) | — | Corrective Action field is intentionally left empty | Invalid (mandatory field) |
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
| 7 | Navigate to a Quality Notification (Deviation) creation or edit screen | — | Quality Notification form is displayed |
| 8 | In the Root Cause section, select the Root Cause Code | `{TD.rootCauseCode}` | Root Cause Code is selected |
| 9 | Enter the Root Cause Description | `{TD.rootCauseDescription}` | Root Cause Description text is entered |
| 10 | In the Impact Assessment field, enter the impact assessment text | `{TD.impactAssessment}` | Impact Assessment text is entered |
| 11 | Leave the Corrective Action field EMPTY (do NOT enter any corrective action text) | — | Corrective Action field remains blank |
| 12 | In the Preventive Action field, enter the preventive action text | `{TD.preventiveAction}` | Preventive Action text is entered |
| 13 | Attempt to click the "Save" button | — | System validates mandatory fields before saving |
| 14 | Observe the system response | — | System displays a validation error message: "Corrective Action is mandatory" or "Please enter a corrective action" |
| 15 | Verify that the Corrective Action field is highlighted as a mandatory field error | — | Corrective Action field is highlighted in red or marked with an asterisk (*) and error indicator |
| 16 | Verify that the deviation is NOT saved | — | No success message is displayed; form remains in edit mode |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents deviation save when Corrective Action field is empty
- Validation error message is displayed: "Corrective Action is mandatory"
- Corrective Action field is highlighted as a mandatory field error
- Form remains in edit mode; deviation is not saved

---

### Post-conditions

- Deviation is not saved
- Corrective Action field is still empty
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
