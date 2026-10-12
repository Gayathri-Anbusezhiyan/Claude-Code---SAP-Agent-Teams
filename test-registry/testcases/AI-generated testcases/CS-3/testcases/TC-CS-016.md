# TC-CS-016: Attempt to Switch Purchase Order to Edit Mode Without Edit Authorization

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
| P1 | User Role | User has a SAP role that grants display-only access to Purchase Orders — the role does NOT include the authorization object for changing POs (MM activity 02 is NOT assigned) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for a display-only user are available |
| P3 | Existing PO | Purchase Order `{TD.poNumber}` exists in SAP and is in an Open status |
| P4 | Authorization Absence | The test user specifically lacks Change PO authorization — this pre-condition must be verified in the test SAP system before execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing PO number — opened to attempt edit mode switch | Valid |
| Display-Only Username | `{ENV.SAP_USERNAME_DISPLAY_ONLY}` | SAP user with display-only PO authorization (no change access) | Valid credential — restricted role |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the display-only user email address | `{ENV.SAP_USERNAME_DISPLAY_ONLY}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the password for the display-only user | `{ENV.SAP_PASSWORD_DISPLAY_ONLY}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad |
| 6 | If a Guided Tour or Welcome pop-up appears, dismiss it | — | Pop-up is dismissed; Fiori home page is visible |
| 7 | Click the search icon and type "Manage Purchase Orders" | — | Search results appear listing "Manage Purchase Orders" |
| 8 | Click "Manage Purchase Orders" from the search results | — | The Manage Purchase Orders list page opens |
| 9 | Enter the PO number in the search/filter bar | `{TD.poNumber}` | PO number is entered |
| 10 | Press Enter to confirm the search | — | The matching PO is listed |
| 11 | Click on the PO to open it | — | The PO opens in display mode |
| 12 | Observe whether an "Edit" button is present in the PO toolbar | — | Either: (a) No "Edit" button is visible for this user (role-based button visibility), OR (b) An "Edit" button is present but disabled |
| 13 | If an "Edit" button is visible, attempt to click it | — | Either: (a) The button is not clickable/is disabled, OR (b) Clicking produces an authorization error message indicating insufficient permissions to change the PO |
| 14 | Verify that the PO remains in display mode and no fields become editable | — | PO stays in read-only display mode; no fields become editable inputs |
| 15 | Verify that the user is not able to modify any PO field | — | No modifications can be made; the PO is strictly read-only for this user |
| 16 | Navigate back to the PO list | — | The Manage Purchase Orders list is displayed |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A display-only user cannot switch the PO to edit mode
- Either the "Edit" button is hidden/disabled, or an authorization error message is displayed when it is clicked
- The PO remains in read-only mode throughout; no fields become editable
- SAP authorization controls prevent unauthorized modifications to the PO

---

### Post-conditions

- No changes are made to the PO during this test
- SAP authorization model is confirmed to be working correctly for display-only roles

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
