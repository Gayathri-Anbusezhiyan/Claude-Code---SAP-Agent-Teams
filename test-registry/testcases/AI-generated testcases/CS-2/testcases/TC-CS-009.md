# TC-CS-009: Create PO with Minimum Valid Order Quantity (Boundary Lower)

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation — Boundary Testing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create Purchase Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.supplierId}` exists; Material `{TD.materialId}` exists and allows minimum order quantity of 1 |
| P4 | SAP Configuration | System is configured to accept minimum order quantity of 1; no minimum order quantity rule that would prevent this |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Valid vendor account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid material master number — entered by the user | Valid |
| Order Quantity | `{TD.quantity_min}` | Minimum valid order quantity (typically 1) — boundary testing | Valid |
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
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.supplierId}` | Valid Supplier ID is entered; supplier name is auto-populated |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates and confirms the supplier |
| 12 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears |
| 13 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered; material description is auto-populated |
| 14 | Press Enter to confirm the Material entry | — | Material is confirmed |
| 15 | In the "Order Quantity" field, enter the minimum valid quantity | `{TD.quantity_min}` | **Boundary value** — minimum quantity (e.g., 1) is entered |
| 16 | Press Enter to confirm the quantity entry | — | System accepts the minimum quantity without error |
| 17 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated |
| 18 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 19 | Verify the Plant field | `{TD.plant}` | If empty, enter the plant code; otherwise note the auto-populated value |
| 20 | Click the "Order" button (primary submit action) in the footer toolbar | — | SAP processes the PO submission with minimum quantity |
| 21 | Verify that the PO is created successfully | — | A success message is displayed; PO number is generated |
| 22 | Navigate back to the Manage Purchase Orders application list | — | Purchase Orders list is displayed |
| 23 | Locate the newly created PO in the list | — | The created PO appears in the list; verify the line item shows quantity = `{TD.quantity_min}` (e.g., 1) |
| 24 | Verify the PO status | — | PO status is "Sent" or "Open"; document is persisted in the system |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A Purchase Order is created successfully with the minimum valid order quantity (e.g., quantity = 1)
- The system accepts the boundary value without error or warning
- The PO is persisted with the minimum quantity in the line item
- The PO appears in the list and can be viewed
- No business rule violations or warnings are triggered

---

### Post-conditions

- SAP Purchase Order exists with the generated PO number and minimum quantity
- PO status is "Sent" or "Open"
- Line item shows the minimum quantity value (e.g., 1) correctly stored
- No error logs or warnings in SAP system

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

### Automation Notes

**Automation Candidate Status: PARTIAL** — This test requires manual validation of minimum order quantity business rules specific to the supplier and material configuration in your SAP system. The minimum quantity value (1) may vary depending on SAP customization and material master settings. Before automating, ensure that:
- The material `{TD.materialId}` is configured to allow order quantity of 1
- There is no blanket order or purchasing info record that enforces a higher minimum
- The supplier has no minimum order quantity contract rule that conflicts with quantity 1

---
