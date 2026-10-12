# TC-CS-013: Modify Purchase Order Quantity in Edit Mode and Save Changes

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
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to display AND change Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing PO | Purchase Order `{TD.poNumber}` exists in SAP with status Open; it has at least one line item where no full goods receipt has been posted (fields are editable) |
| P4 | Edit Authorization | The user's SAP role includes the authorization object for changing POs (MM activity 02 — Change) |
| P5 | Configuration | Purchasing Organization is active and assigned to the company code |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing 10-digit purchase order number starting with 45 — entered in the search filter | Valid |
| Modified Quantity | `{TD.modifiedQuantity}` | New numeric quantity to set on the PO line item (greater than 0) — entered by the user in edit mode | Valid |

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
| 9 | In the search/filter bar, enter the PO number | `{TD.poNumber}` | The PO number is entered into the filter field |
| 10 | Press Enter to confirm the search | — | The list refreshes and displays the matching Purchase Order |
| 11 | Click on the PO number to open the Purchase Order | — | The Purchase Order opens in display (read-only) mode |
| 12 | Click the "Edit" button in the PO toolbar | — | The PO switches to edit mode; fields become editable; an edit indicator is visible |
| 13 | Verify the PO is now in edit mode (order quantity and other fields show input controls) | — | Line item fields (quantity, price, delivery date) are now editable |
| 14 | Locate the "Order Quantity" field on the first line item | — | The Order Quantity field is visible and active in the line items section |
| 15 | Clear the current value in the Order Quantity field and enter the new quantity | `{TD.modifiedQuantity}` | New quantity value is entered into the field |
| 16 | Press Enter to confirm the quantity entry | — | The quantity is confirmed; the line item total value is recalculated and updated |
| 17 | Click the "Save" button in the PO toolbar | — | SAP begins saving the changes to the Purchase Order |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed confirming the PO has been changed (message references the PO number) |
| 19 | Verify the PO is returned to display mode after saving | — | The PO displays in read-only mode with the updated quantity visible |
| 20 | Verify the Order Quantity field on the line item now shows the updated value | `{TD.modifiedQuantity}` | The quantity field reflects the new value `{TD.modifiedQuantity}` |
| 21 | Navigate back to the PO list | — | The Manage Purchase Orders list is displayed |
| 22 | Search for the PO using the PO number | `{TD.poNumber}` | The PO appears in the list |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- PO `{TD.poNumber}` is successfully opened in display mode then switched to edit mode
- Order quantity on line item 1 is updated to `{TD.modifiedQuantity}`
- A success confirmation message is displayed after saving (referencing the PO number)
- PO is returned to display mode with the new quantity persisted
- PO remains visible in the Manage Purchase Orders list

---

### Post-conditions

- PO `{TD.poNumber}` has its line item 1 quantity updated to `{TD.modifiedQuantity}` in SAP
- PO status remains Open/Sent (not affected by quantity change alone)
- The change is persisted and auditable in SAP

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
