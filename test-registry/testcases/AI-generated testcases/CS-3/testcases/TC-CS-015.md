# TC-CS-015: Verify Purchase Order Fields are Read-Only in Display Mode

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
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to display Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing PO | Purchase Order `{TD.poNumber}` exists in SAP and can be opened in the Manage Purchase Orders application |
| P4 | Mode | The PO is opened in display mode (no Edit button has been clicked) |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing 10-digit purchase order number — opened in display mode | Valid (used to access the PO) |

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
| 9 | Enter the PO number in the search/filter bar | `{TD.poNumber}` | PO number is entered |
| 10 | Press Enter to confirm the search | — | The matching PO is displayed in the list |
| 11 | Click on the PO to open it | — | The PO opens in display mode (no active edit state) |
| 12 | Verify the PO is in display mode (no edit mode indicator; fields appear as text labels, not input boxes) | — | PO is in read-only display mode |
| 13 | Attempt to click on the "Order Quantity" field of a line item in the Items section | — | The field does not become an editable input box; clicking has no edit effect; the value remains displayed as text |
| 14 | Attempt to click on the "Net Price" field of a line item | — | The field does not become editable; no input cursor appears |
| 15 | Attempt to click on the "Supplier" field in the PO header | — | The Supplier field does not become editable; it remains a read-only display value |
| 16 | Verify that no "Save" button is present in the toolbar (since no edit is active) | — | The toolbar does not show a "Save" button; only navigation and display actions are available |
| 17 | Verify the overall display is strictly read-only with no inline edit controls visible | — | All fields are displayed as labels/text; no input controls (text boxes, dropdowns, or steppers) are active |
| 18 | Navigate back to the PO list | — | The Manage Purchase Orders list is displayed |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The PO is opened in display mode without clicking the "Edit" button
- Clicking on any field (Order Quantity, Net Price, Supplier) does not activate an edit state
- No "Save" action is available in display mode
- The PO data remains unmodified after all interaction attempts
- The read-only enforcement is confirmed as working correctly

---

### Post-conditions

- No changes are made to the PO during this test
- PO `{TD.poNumber}` remains unchanged

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
