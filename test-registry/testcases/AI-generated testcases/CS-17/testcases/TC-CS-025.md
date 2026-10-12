# TC-CS-025: Select non-approved vendor and verify error message displayed

**User Story:**          [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Source List Management (Approved Vendor List) — Error Message Verification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase orders and view source lists |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, is configured for plant `{TD.plant}`, and is restricted by an active source list with approved vendors |
| P4 | Master Data | Vendor `{TD.nonApprovedVendorId}` exists, is active, but is NOT present on the source list for material `{TD.materialId}` and plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and assigned to purchasing organization `{TD.purchasingOrg}` and company code `{TD.companyCode}` |
| P6 | Source List Configuration | Source list is configured to display warning/error message when non-approved vendor is selected for restricted material |

---

### Test Data

**Dataset Reference:** `testdata/CS-17/CS-17-testdata.json` — Dataset ID: `TD-CS-017-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP-critical raw material (source list restricted) — entered by the user | Valid |
| Non-Approved Vendor ID | `{TD.nonApprovedVendorId}` | Vendor NOT on the approved source list — entered by the user | Valid entity, invalid for this material |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing the "Manage Purchase Orders" application |
| 8 | Click "Manage Purchase Orders" from the search results | — | "Manage Purchase Orders" application opens with the PO list view |
| 9 | Click the "Create PO" button in the application toolbar | — | New purchase order creation form opens in edit mode |
| 10 | In the "Supplier" field, enter the non-approved Vendor ID | `{TD.nonApprovedVendorId}` | Non-approved Vendor ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the vendor; vendor name `{TD.nonApprovedVendorName}` is auto-populated |
| 12 | In the "Items" section, click the "Create" button to add a line item | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field of the line item, enter the source list restricted Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material and triggers source list validation |
| 15 | Observe the error or warning message displayed by SAP | — | An error or warning message is displayed identifying the material as requiring vendor qualification |
| 16 | Verify that the error message clearly states the vendor is not approved in the source list | — | Error message content includes reference to source list restriction and non-approved vendor status |
| 17 | Verify that the error message identifies the specific material and vendor involved | — | Error message displays the material ID `{TD.materialId}` and vendor ID `{TD.nonApprovedVendorId}` |
| 18 | Attempt to proceed with PO creation by entering remaining fields (quantity, price) | — | System may allow field entry but will block final submission |
| 19 | Verify that the error message remains visible and persistent | — | Error message continues to be displayed in the message area or as a highlighted validation error |
| 20 | Click the "Cancel" or "Discard" button to exit the PO creation without saving | — | Confirmation dialog appears asking to discard changes |
| 21 | Confirm the discard action | — | PO creation form is closed; user returns to the PO list view |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays a clear and specific error or warning message when a non-approved vendor is selected for a source list restricted material
- The error message identifies the material as requiring vendor qualification
- The error message references the source list restriction and indicates the vendor is not approved
- The error message displays the specific material and vendor identifiers involved
- No Purchase Order is created; the PO remains in draft/edit mode

---

### Post-conditions

- No SAP Purchase Order document exists for this transaction
- The error message was displayed and can be recorded for validation
- The non-approved vendor is not permitted to be used for the source list restricted material
- No application-level errors or critical system warnings remain outstanding

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
