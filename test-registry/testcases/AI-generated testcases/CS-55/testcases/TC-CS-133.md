# TC-CS-133: Attempt to close deviation without disposition decision

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Disposition Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and manage Quality Notifications (QM02, QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with active production operations |
| P4 | Deviation Exists | A Quality Notification (Deviation) `{TD.deviationNumber}` has been created against operation `{TD.operationNumber}` of process order `{TD.processOrder}` with status "OUTSTANDING" (open) |
| P5 | CAPA Documentation Complete | The deviation record has been populated with Root Cause, Impact Assessment, Corrective Action, and Preventive Action fields (CAPA documentation is complete) |
| P6 | Disposition Missing | The Disposition Decision field has NOT been selected (disposition is missing) |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Deviation Number | `{TD.deviationNumber}` | Quality Notification number with status OUTSTANDING | Valid (open deviation) |
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text | Valid |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text | Valid |
| Corrective Action | `{TD.correctiveAction}` | Corrective action text | Valid |
| Preventive Action | `{TD.preventiveAction}` | Preventive action text | Valid |
| Disposition Decision (Missing) | — | Disposition decision field is intentionally left empty | Invalid (mandatory field at closure) |

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
| 9 | Filter for Deviation Number `{TD.deviationNumber}` and click "Go" | `{TD.deviationNumber}` | The deviation is displayed in the list |
| 10 | Click the Deviation Number link to open the deviation details | `{TD.deviationNumber}` | Deviation details page opens in edit mode |
| 11 | Verify that the deviation status is "OUTSTANDING" | — | Status displays "OUTSTANDING" |
| 12 | Verify that the Root Cause field is populated | `{TD.rootCauseCode}`, `{TD.rootCauseDescription}` | Root Cause is displayed with code and description |
| 13 | Verify that the Impact Assessment field is populated | `{TD.impactAssessment}` | Impact Assessment text is displayed |
| 14 | Verify that the Corrective Action field is populated | `{TD.correctiveAction}` | Corrective Action text is displayed |
| 15 | Verify that the Preventive Action field is populated | `{TD.preventiveAction}` | Preventive Action text is displayed |
| 16 | Leave the Disposition Decision field EMPTY (do NOT select any disposition option) | — | Disposition Decision field remains blank |
| 17 | Attempt to click the "Close Deviation" button | — | System validates mandatory fields before processing the closure |
| 18 | Observe the system response | — | System displays a validation error message: "Disposition Decision is mandatory" or "Please select a disposition before closing the deviation" |
| 19 | Verify that the Disposition Decision field is highlighted as a mandatory field error | — | Disposition Decision field is highlighted in red or marked with an error indicator |
| 20 | Verify that the deviation status remains "OUTSTANDING" (not closed) | — | Deviation status is unchanged; still displays "OUTSTANDING" |
| 21 | Verify that the deviation is NOT closed | — | No success message is displayed; deviation remains open |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents deviation closure when Disposition Decision field is empty
- Validation error message is displayed: "Disposition Decision is mandatory" or "Please select a disposition before closing the deviation"
- Disposition Decision field is highlighted as a mandatory field error
- Deviation status remains "OUTSTANDING" (not closed)
- GMP compliance control is enforced: deviation cannot be closed without an approved disposition decision

---

### Post-conditions

- Deviation `{TD.deviationNumber}` status remains "OUTSTANDING"
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
