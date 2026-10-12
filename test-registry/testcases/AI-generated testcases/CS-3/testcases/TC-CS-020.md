# TC-CS-020: Attempt to Search for Purchase Order with Invalid PO Number Format

**User Story:**          [CS-3] View and Modify an Existing Purchase Order
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Order Display and Modification
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
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to access the Manage Purchase Orders application |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Invalid Format | `{TD.invalidPoFormat}` is a string in an invalid PO format — e.g., alphanumeric text ("INVALID"), special characters, or a number with fewer than 10 digits |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid PO Format | `{TD.invalidPoFormat}` | An alphanumeric or incorrectly formatted PO number — e.g., non-numeric characters or too few digits | Invalid — format boundary |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad |
| 6 | If a Guided Tour or Welcome pop-up appears, dismiss it | — | Pop-up is dismissed; Fiori home page is visible |
| 7 | Click the search icon and type "Manage Purchase Orders" | — | Search results appear |
| 8 | Click "Manage Purchase Orders" from the search results | — | The Manage Purchase Orders list opens |
| 9 | In the search/filter bar, enter the invalid format PO number | `{TD.invalidPoFormat}` | The invalid-format value is entered |
| 10 | Press Enter to confirm the search | — | SAP evaluates the input |
| 11 | Observe the system response to the invalid PO format | — | Either: (a) SAP displays a format validation message (e.g., "Enter a valid purchase order number"), OR (b) The list returns no results with an explanatory message, OR (c) The field rejects non-numeric input at entry time |
| 12 | Verify that no PO is opened or displayed for the invalid format input | — | No PO detail page is shown; the application remains on the list page (possibly empty or showing a message) |
| 13 | Clear the invalid value from the filter bar | — | The filter is cleared |
| 14 | Click the User Profile icon | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out |

---

### Expected Final Result

- An invalid-format PO number (non-numeric, too short, or containing special characters) is handled gracefully by the system
- SAP either prevents the entry of invalid characters, displays a format validation message, or returns no results with an informational message
- No PO is incorrectly opened for an invalid-format input
- The application remains stable and does not crash or show an unhandled technical error

---

### Post-conditions

- No PO data was accessed or modified
- SAP system remains stable after the invalid input test

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
