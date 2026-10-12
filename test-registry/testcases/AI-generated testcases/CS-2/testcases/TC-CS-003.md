# TC-CS-003: Attempt to Create PO with Non-existent Supplier ID

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation — Negative Test
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
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Data | A non-existent Supplier ID `{TD.supplierId_invalid}` is available for testing (should not exist in the SAP system) |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID (invalid) | `{TD.supplierId_invalid}` | Non-existent vendor account number — entered by the user | Invalid |
| Material ID | `{TD.materialId}` | Valid material master number — for reference only | Valid |
| Order Quantity | `{TD.quantity}` | Valid quantity — for reference only | Valid |
| Net Order Price | `{TD.price}` | Valid price — for reference only | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If a Guided Tour / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear |
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens showing the list of existing POs |
| 9 | Click the "Create" button in the application toolbar | — | New Purchase Order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the non-existent Supplier ID | `{TD.supplierId_invalid}` | Invalid Supplier ID is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validation is triggered; the system validates the supplier ID against the master data |
| 12 | Observe the validation error message | — | An error message is displayed: "Supplier [ID] does not exist" or similar validation error indicating the supplier is not found in the system |
| 13 | Verify that the Supplier name field remains empty (not populated) | — | The Supplier name field does NOT show any auto-populated value; the field remains blank or shows an error state |
| 14 | Verify that Purchasing Organisation and Purchasing Group fields are empty | — | These fields remain empty or show error state (not auto-populated because the supplier does not exist) |
| 15 | Attempt to click the "Create" button below the Items section | — | Either: (a) Create button is disabled/grayed out, or (b) user can click but the system prevents creation due to missing supplier |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system validates the Supplier ID and rejects it as non-existent
- No Purchase Order is created; the system remains on the Create PO form
- A clear error message is displayed: "Supplier [ID] does not exist" (or equivalent)
- The supplier-dependent fields (Supplier name, Purchasing Org, Purchasing Group) remain empty
- The user can correct the error or discard the draft

---

### Post-conditions

- No PO is created in the system
- The system remains in draft/edit mode on the Create PO form
- The user can re-enter a valid Supplier ID and proceed, or sign out without saving

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
