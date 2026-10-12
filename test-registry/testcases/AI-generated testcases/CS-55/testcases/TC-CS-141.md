# TC-CS-141: Impact Assessment text at minimum length (10 characters)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation CAPA Text Field Boundary — Impact Assessment Minimum
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
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

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text | Valid |
| Impact Assessment (Min Length) | `{TD.impactAssessmentMinLength}` | Impact assessment text exactly 10 characters | Valid (boundary lower) |
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
| 7 | Navigate to a Quality Notification (Deviation) creation or edit screen | — | Quality Notification form is displayed |
| 8 | In the Root Cause section, select the Root Cause Code and enter description | `{TD.rootCauseCode}`, `{TD.rootCauseDescription}` | Root Cause is entered |
| 9 | In the Impact Assessment field, enter exactly 10 characters | `{TD.impactAssessmentMinLength}` | Impact Assessment text is entered with exactly 10 characters (e.g., "No impact.") |
| 10 | Verify the character count (if displayed) shows 10 characters | — | Character count displays 10 |
| 11 | In the Corrective Action field, enter the corrective action text | `{TD.correctiveAction}` | Corrective Action text is entered |
| 12 | In the Preventive Action field, enter the preventive action text | `{TD.preventiveAction}` | Preventive Action text is entered |
| 13 | Click the "Save" button | — | System validates the field length |
| 14 | Observe the system response | — | System ACCEPTS the 10-character Impact Assessment (minimum valid length); success message is displayed |
| 15 | Verify that the deviation is saved successfully | — | Deviation is saved; Deviation Number is generated |
| 16 | Verify that the Impact Assessment field displays the 10-character text correctly | `{TD.impactAssessmentMinLength}` | Impact Assessment displays the exact 10-character text entered |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System accepts Impact Assessment text with exactly 10 characters (minimum valid length)
- Deviation is saved successfully
- Impact Assessment field stores and displays the 10-character text correctly

---

### Post-conditions

- Deviation is saved with Impact Assessment containing exactly 10 characters
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
