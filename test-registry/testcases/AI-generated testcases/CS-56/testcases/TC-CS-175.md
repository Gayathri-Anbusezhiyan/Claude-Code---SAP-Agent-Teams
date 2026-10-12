# TC-CS-175: Access Batch Information Cockpit without required authorization

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has an SAP account but does NOT have authorization to access the Batch Information Cockpit or view batch genealogy data (lacks required authorization objects) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for unauthorized user are available |
| P3 | Configuration | SAP authorization checks are active for the Batch Information Cockpit application |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Unauthorized User Email | `{TD.unauthorizedUserEmail}` | Email address of user without Batch Information Cockpit authorization — entered by user | Valid (user exists but lacks authorization) |
| Unauthorized User Password | `{TD.unauthorizedUserPassword}` | Password for unauthorized user — entered by user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the unauthorized user email address in the email field | `{TD.unauthorizedUserEmail}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the unauthorized user password in the password field | `{TD.unauthorizedUserPassword}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is visible |
| 7 | Click the search icon (top-right shell bar) and type "Batch Information Cockpit" | — | Search results appear OR no results are displayed if the unauthorized user does not have visibility to the application |
| 8 | If search results show the application, click "Batch Information Cockpit" | — | SAP attempts to open the application |
| 9 | Observe the system response | — | SAP displays an authorization error message or access denied notification (e.g., "You are not authorized to access this application", "Authorization missing", or "Access denied") |
| 10 | Verify that the authorization error message is clear and specific | — | Message indicates that the user lacks the required authorization to access the Batch Information Cockpit or view batch genealogy data |
| 11 | Verify that the application does not open | — | No Batch Information Cockpit search criteria screen is displayed; user remains on the Fiori Launchpad or sees an error page |
| 12 | If search results do NOT show the application (no tiles or search results), verify that the application is not accessible | — | Application is not listed in the user's available applications, confirming that authorization restrictions prevent visibility |
| 13 | Verify that the system does not crash or display technical errors | — | Application remains stable; only authorization-related messages are shown |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the user does not have authorization to access the Batch Information Cockpit
- A clear authorization error message is displayed to the user OR the application is not visible in the user's app list
- The application does not open for the unauthorized user
- No batch genealogy data is accessible
- The system remains stable and secure; sensitive batch data is protected from unauthorized access

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- User session is terminated after sign-out

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

**Note:** This test case requires a dedicated test user account without Batch Information Cockpit authorization. Automation is PARTIAL because creating and maintaining unauthorized test users may require manual setup and periodic re-validation.
