# TC-CS-004: Attempt to Create PO with Non-existent Material Number

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
| P3 | Master Data | Supplier `{TD.supplierId}` exists and is active |
| P4 | Data | A non-existent Material ID `{TD.materialId_invalid}` is available for testing (should not exist in the SAP system) |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Valid vendor account number — entered by the user | Valid |
| Material ID (invalid) | `{TD.materialId_invalid}` | Non-existent material master number — entered by the user | Invalid |
| Order Quantity | `{TD.quantity}` | Numeric quantity — for reference only | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure — for reference only | Valid |

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
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Purchase Order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter a valid Supplier ID | `{TD.supplierId}` | Valid Supplier ID is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated; Purchasing Organisation `{TD.purchasingOrg}` and Purchasing Group `{TD.purchasingGroup}` are auto-populated |
| 12 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field of the line item, enter the non-existent Material ID | `{TD.materialId_invalid}` | Invalid Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validation is triggered; the system validates the material ID against the master data |
| 15 | Observe the validation error message | — | An error message is displayed: "Material [ID] does not exist" or similar validation error indicating the material is not found in the system |
| 16 | Verify that the Material Description and UoM fields remain empty (not populated) | — | These fields do NOT show any auto-populated values; they remain blank or show an error state |
| 17 | Verify that the line item is not confirmed | — | The system does not accept the invalid material; the line item cannot proceed to the next field |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system validates the Material ID and rejects it as non-existent
- No line item is created; the line item row remains in error state or is removed
- A clear error message is displayed: "Material [ID] does not exist" (or equivalent)
- The material-dependent fields (Material Description, UoM) remain empty
- The user can correct the error by entering a valid material ID or discard the draft

---

### Post-conditions

- No PO is created in the system (draft remains incomplete)
- The system remains in draft/edit mode on the Create PO form
- The user can re-enter a valid Material ID and proceed, or sign out without saving

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
