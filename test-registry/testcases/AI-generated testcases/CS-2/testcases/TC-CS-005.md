# TC-CS-005: Attempt to Submit PO with Supplier Field Empty

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation — Mandatory Field Validation
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
| P3 | Master Data | Material `{TD.materialId}` exists and is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | (EMPTY) | Supplier field left blank — mandatory field | Invalid |
| Material ID | `{TD.materialId}` | Valid material master number — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Valid quantity — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Valid price — entered by the user | Valid |
| Plant | `{TD.plant}` | Valid plant code — entered by the user | Valid |

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
| 10 | **DO NOT enter any value in the "Supplier:*" field** — leave it empty | — | Supplier field remains empty |
| 11 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears |
| 12 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered; material description is auto-populated |
| 13 | Press Enter to confirm the Material entry | — | Material is confirmed |
| 14 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated |
| 15 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 16 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated |
| 17 | Press Enter to confirm the price entry | — | Price is confirmed |
| 18 | Verify the Plant field | `{TD.plant}` | If empty, enter the plant code; otherwise note the auto-populated value |
| 19 | Click the "Order" button (primary submit action) in the footer toolbar | — | SAP validates the PO form before submission |
| 20 | Observe the validation error | — | A validation error dialog or message appears: "Supplier is mandatory" or "Please enter a Supplier" or similar error indicating the mandatory field is missing |
| 21 | Verify that the error message is displayed in the Messages section or a dialog box | — | Error message is clearly visible with a reference to the missing Supplier field |
| 22 | Verify that the PO is NOT submitted | — | The form remains in edit/draft mode; the Order button did not process the submission |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system validates the mandatory "Supplier" field and rejects the submission
- A clear error message is displayed: "Supplier is mandatory" or "Please enter a Supplier" (or equivalent)
- No Purchase Order is created
- The form remains in draft mode with all entered line item data intact (allowing the user to correct and resubmit)

---

### Post-conditions

- No PO is created in the system
- The system remains in draft/edit mode on the Create PO form
- The user can enter a valid Supplier ID and resubmit, or sign out without saving

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
