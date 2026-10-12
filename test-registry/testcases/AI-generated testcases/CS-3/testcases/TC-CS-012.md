# TC-CS-012: View Purchase Order Details in Display Mode

**User Story:**          [CS-3] View and Modify an Existing Purchase Order
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Order Display and Modification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to display Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing PO | Purchase Order `{TD.poNumber}` exists in SAP with status Open or Partially Delivered; it has at least one line item with material, quantity, price, plant, and a delivery date |
| P4 | Master Data | Supplier assigned to the PO is active in the vendor master |
| P5 | Access | User has display access to the "Manage Purchase Orders" Fiori application |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing 10-digit purchase order number starting with 45 — entered in the search filter | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If a Guided Tour or Welcome pop-up appears, dismiss it (click "Leave Tour" or equivalent) | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing "Manage Purchase Orders" |
| 8 | Click "Manage Purchase Orders" from the search results | — | The Manage Purchase Orders list page opens |
| 9 | In the search/filter bar at the top of the list, enter the PO number | `{TD.poNumber}` | The PO number is entered into the filter field |
| 10 | Press Enter to confirm the search | — | The list refreshes and displays the matching Purchase Order |
| 11 | Verify the PO appears in the list with the correct PO number | `{TD.poNumber}` | Purchase Order `{TD.poNumber}` is listed with supplier, status, and creation date visible |
| 12 | Click on the PO number to open the Purchase Order | — | The Purchase Order opens; it is in display (read-only) mode by default |
| 13 | Verify the PO header area displays the supplier name | — | Supplier name is visible in the header |
| 14 | Verify the PO header displays Purchasing Organization and Company Code | — | Purchasing Org and Company Code fields are visible and populated |
| 15 | Verify all line item details are visible: material description, order quantity, net price, plant, and delivery date | — | All line item fields display their current values |
| 16 | Verify the overall PO status is shown | — | PO status (e.g., Open, Sent) is displayed |
| 17 | Attempt to click directly on the "Order Quantity" field of a line item | — | The field does not become editable; the value remains read-only; no input cursor appears |
| 18 | Attempt to click directly on the "Net Price" field of a line item | — | The field does not become editable; the value remains read-only |
| 19 | Verify no "Save" or "Order" action button is present in the toolbar in this mode | — | The toolbar shows only read-only actions (e.g., "Edit" button if authorized, navigation arrows); no direct save button is present |
| 20 | Click the back arrow or "Manage Purchase Orders" breadcrumb to return to the list | — | The PO list page is displayed |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Purchase Order `{TD.poNumber}` is opened successfully in display (read-only) mode
- All PO header details (supplier, purchasing org, company code, currency) are visible
- All line item details (material, quantity, price, plant, delivery date, status) are visible
- No fields are editable — all interaction attempts confirm the read-only state
- User is signed out cleanly after viewing

---

### Post-conditions

- No changes are made to the PO — the document is unchanged after this test
- PO `{TD.poNumber}` remains in its original status

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
