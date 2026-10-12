# TC-CS-008: Attempt to Submit PO with Net Order Price Field Empty

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
| P3 | Master Data | Supplier `{TD.supplierId}` exists; Material `{TD.materialId}` exists |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Valid vendor account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid material master number — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Valid quantity — entered by the user | Valid |
| Net Order Price | (EMPTY) | Net Order Price field left blank — mandatory field | Invalid |
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
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.supplierId}` | Valid Supplier ID is entered; supplier name is auto-populated |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates and confirms the supplier |
| 12 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears |
| 13 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered; material description is auto-populated |
| 14 | Press Enter to confirm the Material entry | — | Material is confirmed |
| 15 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 17 | **DO NOT enter any value in the "Net Order Price" field** — leave it empty | — | Net Order Price field remains empty |
| 18 | Press Tab or move to the next field | — | The system may trigger validation on blur/Tab |
| 19 | Verify the Plant field | `{TD.plant}` | If empty, enter the plant code; otherwise note the auto-populated value |
| 20 | Click the "Order" button (primary submit action) in the footer toolbar | — | SAP validates the PO form before submission |
| 21 | Observe the validation error | — | A validation error dialog or message appears: "Net Order Price is mandatory" or "Please enter a price" or similar error |
| 22 | Verify that the error message is displayed in the Messages section or a dialog box | — | Error message is clearly visible with a reference to the missing Net Order Price field |
| 23 | Verify that the PO is NOT submitted | — | The form remains in edit/draft mode; the Order button did not process the submission |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system validates the mandatory "Net Order Price" field and rejects the submission
- A clear error message is displayed: "Net Order Price is mandatory" or "Please enter a price" (or equivalent)
- No Purchase Order is created
- The form remains in draft mode with all entered data intact

---

### Post-conditions

- No PO is created in the system
- The system remains in draft/edit mode on the Create PO form
- The user can enter a valid Net Order Price and resubmit, or sign out without saving

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
