# TC-CS-160: Attempt to Access Stock/Requirements List App Without Authorization

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Authorization Check for Stock/Requirements List Access
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has a role that does NOT include SAP authorization object for Stock/Requirements List (e.g., a role with limited read-only access or no production planning authorizations) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available for the unauthorized user |
| P3 | Configuration | Authorization checks are active and enforced in the SAP system for the Stock/Requirements List application |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Unauthorized User Email | `{TD.unauthorizedUserEmail}` | Email of user without Stock/Requirements List authorization | Valid user, Invalid authorization |
| Unauthorized User Password | `{TD.unauthorizedUserPassword}` | Password for the unauthorized user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the unauthorized user email address in the email field | `{TD.unauthorizedUserEmail}` | Unauthorized user email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the unauthorized user password in the password field | `{TD.unauthorizedUserPassword}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page (login succeeds but with limited authorizations) |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is displayed |
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear; "Stock/Requirements List" may or may not be listed depending on role-based app catalog filtering |
| 8 | If the app appears in search results, click "Stock/Requirements List" | — | SAP attempts to launch the application |
| 9 | Observe the authorization error message or access denied notification | — | An error message is displayed indicating the user is not authorized to access this application; typical message: "You are not authorized to use this application" or "Missing authorization for object [object name]" |
| 10 | Verify the error message specifies the authorization object or app restriction | — | Error message clearly states the authorization failure; user is prevented from accessing the Stock/Requirements List |
| 11 | Verify the application does not open; no reservation or stock data is displayed | — | Application access is blocked; no sensitive production planning data is visible to the unauthorized user |
| 12 | If the app does NOT appear in search results (filtered by role), verify the user cannot access the app via direct URL navigation | — | App is not listed in the user's app catalog; attempting direct navigation (if possible) results in an authorization error |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The unauthorized user is prevented from accessing the Stock/Requirements List application
- An authorization error message is displayed clearly indicating the user lacks the required authorization
- No reservation data, stock data, or production planning information is visible to the unauthorized user
- The SAP system enforces role-based access control (RBAC) and segregation of duties (SOD)
- The unauthorized user cannot bypass the authorization check via search, direct URL, or any other method

---

### Post-conditions

- Authorization check is enforced; unauthorized access is blocked
- No data breach or unauthorized data access occurs
- User is signed out successfully

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
