# TC-CS-017: Verify Goods-Receipted Purchase Order Line Item Field is Locked in Edit Mode

**User Story:**          [CS-3] View and Modify an Existing Purchase Order
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchase Order Display and Modification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer or Buyer with SAP authorization to display and change Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Goods-Receipted PO | Purchase Order `{TD.grPoNumber}` exists in SAP with at least one line item that has had a full or partial Goods Receipt posted against it — this line item's quantity field is expected to be locked |
| P4 | Edit Authorization | The user has authorization to switch the PO to edit mode |
| P5 | Test Data Setup | `{TD.grPoNumber}` must be set up in advance in the test system with a confirmed GR posting against at least one line item |

---

### Test Data

**Dataset Reference:** `testdata/CS-3/CS-3-testdata.json` — Dataset ID: `TD-CS-003-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| GR PO Number | `{TD.grPoNumber}` | PO number for a Purchase Order that has at least one goods-receipted line item — entered in the search filter | Valid PO, but with restricted edit fields due to GR posting |

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
| 7 | Click the search icon and type "Manage Purchase Orders" | — | Search results appear |
| 8 | Click "Manage Purchase Orders" from the search results | — | The Manage Purchase Orders list opens |
| 9 | Enter the goods-receipted PO number in the search/filter bar | `{TD.grPoNumber}` | PO number is entered |
| 10 | Press Enter to confirm the search | — | The matching PO is displayed in the list |
| 11 | Click on the PO to open it | — | The PO opens in display mode |
| 12 | Click the "Edit" button in the PO toolbar | — | The PO switches to edit mode |
| 13 | Locate the line item that has a goods receipt posted against it | — | The GR-posted line item is visible in the Items section |
| 14 | Attempt to click on the "Order Quantity" field of the goods-receipted line item | — | The Order Quantity field is either: (a) not editable (locked/greyed out), OR (b) shows a lock icon or indicator |
| 15 | Observe whether a tooltip, message, or indicator explains why the field is locked | — | SAP displays a relevant explanation — e.g., a tooltip stating the field cannot be changed because a goods receipt has been posted, or the field appears visually locked with an indicator |
| 16 | Verify that the locked field cannot be changed — no input is accepted | — | Any attempt to type into the locked field has no effect; the value remains unchanged |
| 17 | Verify that other non-GR fields on the same PO (if any exist on other line items) are still editable | — | Non-receipted line item fields remain editable in edit mode |
| 18 | Click "Cancel" or navigate away without saving | — | The PO reverts to display mode without any changes |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The PO with a goods-receipted line item is opened and switched to edit mode successfully
- The Order Quantity field (and other quantity-related fields) on the GR-posted line item are locked and cannot be modified
- SAP displays a relevant explanation for the locked state (tooltip, message, or visual indicator)
- No changes are saved to the PO during this test
- SAP processing-status business rules are confirmed to be enforced correctly

---

### Post-conditions

- No changes are made to the PO `{TD.grPoNumber}` during this test
- The goods receipt remains posted; the PO state is unchanged

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
