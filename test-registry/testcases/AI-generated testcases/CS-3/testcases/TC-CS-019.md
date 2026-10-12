# TC-CS-019: Attempt to Set Purchase Order Quantity to Zero (Boundary Zero — Invalid)

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
| P4 | Edit Authorization | The user has authorization to switch the PO to edit mode |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Existing PO number with an editable line item | Valid |
| Zero Quantity | `{TD.zeroQuantity}` | Order quantity of 0 — the zero boundary value (expected to be invalid) | Invalid — zero boundary |

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
| 13 | Locate the Order Quantity field on the first line item | — | Order Quantity field is visible and editable |
| 14 | Clear the current quantity value and enter zero | `{TD.zeroQuantity}` | Zero (0) is entered in the Order Quantity field |
| 15 | Press Enter to confirm the quantity entry | — | SAP evaluates the zero quantity entry |
| 16 | Observe the system response to the zero quantity | — | SAP displays a validation error or warning message indicating that the order quantity must be greater than zero; the quantity field is highlighted as invalid |
| 17 | Verify that the "Save" action is either: (a) blocked by the validation, OR (b) if clicked, results in an error preventing the save | — | The zero quantity is rejected; the PO cannot be saved with quantity = 0 |
| 18 | Click "Cancel" or navigate away without saving to restore the PO to its original state | — | The edit is cancelled; the PO reverts to display mode with the original quantity |
| 19 | Click the User Profile icon | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP rejects a quantity of zero with a clear validation error message
- The message indicates that the order quantity must be greater than zero (or a positive value is required)
- The PO cannot be saved with a zero quantity — submission is blocked
- The PO quantity remains at its original value after the cancelled edit

---

### Post-conditions

- PO `{TD.poNumber}` is unchanged — quantity was not saved as zero
- The zero-boundary invalid input is confirmed to be rejected by SAP

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
