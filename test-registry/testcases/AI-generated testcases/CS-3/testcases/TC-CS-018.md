# TC-CS-018: Modify Purchase Order Quantity to Minimum Valid Value (Boundary Lower)

**User Story:**          [CS-3] View and Modify an Existing Purchase Order
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Order Display and Modification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to display and change Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing PO | Purchase Order `{TD.poNumber}` exists in SAP with an Open line item where no full goods receipt has been posted |
| P4 | Edit Authorization | The user has authorization to switch the PO to edit mode and save changes |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing PO number with an editable line item | Valid |
| Minimum Quantity | `{TD.minQuantity}` | Minimum valid order quantity = 1 (lower boundary value) | Valid — boundary lower |

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
| 9 | Enter the PO number in the search/filter bar | `{TD.poNumber}` | PO number is entered |
| 10 | Press Enter to confirm the search | — | The matching PO is listed |
| 11 | Click on the PO to open it | — | The PO opens in display mode |
| 12 | Click the "Edit" button in the PO toolbar | — | The PO switches to edit mode |
| 13 | Locate the Order Quantity field on the first line item | — | Order Quantity field is visible and editable in the Items section |
| 14 | Clear the current quantity value and enter the minimum valid quantity | `{TD.minQuantity}` | The minimum quantity value (1) is entered |
| 15 | Press Enter to confirm the quantity entry | — | The quantity is confirmed; the line item net value is recalculated |
| 16 | Verify no validation error or warning is shown for the minimum quantity | — | SAP accepts the value without error; no mandatory field warning or rejection message is shown |
| 17 | Click the "Save" button in the toolbar | — | SAP begins saving the changes |
| 18 | Observe the confirmation response | — | A success message is displayed confirming the PO has been changed |
| 19 | Verify the Order Quantity field now shows the minimum quantity value | `{TD.minQuantity}` | The quantity field shows the value 1 (the minimum boundary) |
| 20 | Navigate back to the PO list | — | The Manage Purchase Orders list is displayed |
| 21 | Click the User Profile icon | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out |

---

### Expected Final Result

- The minimum valid quantity (1) is accepted by SAP without validation errors
- The PO is saved successfully with quantity = `{TD.minQuantity}`
- A success confirmation message is displayed
- The boundary lower value is confirmed as valid by the system

---

### Post-conditions

- PO `{TD.poNumber}` has its line item quantity updated to `{TD.minQuantity}` (value: 1)
- Change is persisted in SAP

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
