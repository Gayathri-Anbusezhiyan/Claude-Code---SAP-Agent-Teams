# TC-CS-014: Attempt to Open Purchase Order with Non-existent PO Number

**User Story:**          [CS-3] View and Modify an Existing Purchase Order
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Order Display and Modification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to access the Manage Purchase Orders application |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Invalid PO | Purchase Order `{TD.invalidPoNumber}` does NOT exist in SAP — it is a valid-format but non-existent PO number |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid PO Number | `{TD.invalidPoNumber}` | A 10-digit numeric PO number that does not correspond to any PO in SAP | Invalid — non-existent |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If a Guided Tour or Welcome pop-up appears, dismiss it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing "Manage Purchase Orders" |
| 8 | Click "Manage Purchase Orders" from the search results | — | The Manage Purchase Orders list page opens |
| 9 | In the search/filter bar, enter the invalid PO number | `{TD.invalidPoNumber}` | The non-existent PO number is entered into the filter field |
| 10 | Press Enter to confirm the search | — | The list refreshes |
| 11 | Observe the application response to the non-existent PO number | — | The list displays no results ("No data" or "0 items found") OR the system displays a clear error or informational message indicating the Purchase Order does not exist; no PO record is shown |
| 12 | Verify that no Purchase Order detail is opened | — | The application remains on the list page; no PO detail view is navigated to |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Entering a non-existent PO number results in no records being displayed
- A clear message or empty state indicator is shown (e.g., "No data found" or an error message)
- No PO detail page is accessible for the non-existent PO number
- The system handles the invalid input gracefully without crashing or showing a technical error

---

### Post-conditions

- No Purchase Order was accessed or modified
- SAP system state is unchanged

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
