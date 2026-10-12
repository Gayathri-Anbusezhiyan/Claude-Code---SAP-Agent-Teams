# TC-CS-131: Attempt to access Review Batch Records app without QA authorization

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
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
| P1 | User Role | User does NOT have QA Reviewer authorization in SAP; user has a different role (e.g., Production Operator, Warehouse Clerk) without batch record approval permissions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available for the unauthorized user |
| P3 | Authorization Configuration | SAP authorization objects for batch record review and approval are configured; "Review Batch Records" app is restricted to QA Reviewer role |
| P4 | Unauthorized User Credentials | Test user credentials `{ENV.SAP_USERNAME_UNAUTHORIZED}` and `{ENV.SAP_PASSWORD_UNAUTHORIZED}` are available for a user without QA authorization |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Unauthorized Username | `{ENV.SAP_USERNAME_UNAUTHORIZED}` | Email or username of user without QA Reviewer authorization — entered by the user | Valid (but unauthorized) |
| Unauthorized Password | `{ENV.SAP_PASSWORD_UNAUTHORIZED}` | Password of user without QA Reviewer authorization — entered by the user | Valid (but unauthorized) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the unauthorized user email address in the email field | `{ENV.SAP_USERNAME_UNAUTHORIZED}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the unauthorized user password in the password field | `{ENV.SAP_PASSWORD_UNAUTHORIZED}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear; "Review Batch Records" application may or may not be listed depending on authorization configuration |
| 8 | Observe if "Review Batch Records" appears in the search results | — | "Review Batch Records" application does NOT appear in search results (if authorization check is enforced at search level) OR application appears but is grayed out or inaccessible |
| 9 | If "Review Batch Records" appears in search results, click on it | — | One of the following occurs: (a) Application does NOT open; authorization error is displayed, OR (b) Application opens but displays authorization error before showing any batch record data |
| 10 | Observe the authorization error message | — | Error message is displayed: "You do not have authorization to access this application" or "Authorization check failed for object [object name]" or similar authorization error text |
| 11 | Verify that no batch record data is displayed or accessible | — | No batch record selection screen or batch record data is visible; user cannot view or approve batch records |
| 12 | Verify that no "Approve" or batch record management functions are available | — | No functional buttons or actions for batch record review or approval are accessible |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- User without QA Reviewer authorization cannot access the "Review Batch Records" application
- System enforces role-based access control (RBAC) and displays an authorization error message
- No batch record data is visible or accessible to the unauthorized user
- No batch record approval or review functions are available
- System maintains audit trail integrity by preventing unauthorized users from signing batch records
- Authorization check complies with 21 CFR Part 11 requirement for secure, user-authenticated signatures

---

### Post-conditions

- No batch record data is accessed or viewed by the unauthorized user
- Audit log entry may be created for the failed authorization attempt (if configured)
- System security and access control remain intact
- No application-level errors or critical warnings remain outstanding

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
