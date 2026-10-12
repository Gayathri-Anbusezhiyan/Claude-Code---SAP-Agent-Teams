# TC-CS-192: Attempt Return Delivery with Zero Quantity

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderZeroQty}` exists with goods receipt posted and batch `{TD.batchZeroQty}` in Blocked or QI Stock |
| P4 | Business Rule | System must reject return deliveries with zero (0) quantity |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderZeroQty}` | Valid PO with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchZeroQty}` | Valid batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialZeroQty}` | Valid material number — entered by the user | Valid |
| Return Quantity | 0 | Zero quantity — entered by the user | Invalid (zero boundary) |
| Rejection Reason Code | `{TD.rejectionReasonStandard}` | Valid rejection reason code — selected by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page is displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen is displayed |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password is entered |
| 5 | Click "Continue" | — | Fiori Launchpad is displayed |
| 6 | Close pop-up if present | — | Pop-up is dismissed |
| 7 | Search for "Post Goods Movement" | — | Search results appear |
| 8 | Click "Post Goods Movement" | — | Application opens |
| 9 | Enter movement type | 122 | Movement type 122 is entered |
| 10 | Press Enter | — | Movement type is confirmed |
| 11 | Enter Purchase Order | `{TD.purchaseOrderZeroQty}` | PO is entered |
| 12 | Press Enter | — | Vendor information is auto-populated |
| 13 | Enter Material | `{TD.materialZeroQty}` | Material is entered |
| 14 | Press Enter | — | Material details are auto-populated |
| 15 | Enter Batch | `{TD.batchZeroQty}` | Batch is entered |
| 16 | Press Enter | — | Batch details are auto-populated |
| 17 | Enter zero (0) in the Quantity field | 0 | Zero value is entered |
| 18 | Select rejection reason | `{TD.rejectionReasonStandard}` | Rejection reason is selected |
| 19 | Click "Post" | — | SAP validates the quantity value |
| 20 | Observe error message | — | SAP displays error: "Quantity must be greater than 0" or "Enter a valid quantity" or "Zero quantity is not allowed" |
| 21 | Verify Quantity field is highlighted | — | Quantity field is highlighted in red or marked with error indicator |
| 22 | Verify no Material Document is created | — | No document number is generated; transaction is NOT posted |
| 23 | Clear form | — | Form is cleared |
| 24 | Click User Profile icon | — | Profile menu appears |
| 25 | Click "Sign Out" | — | Sign out dialog appears |
| 26 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP detects that the return quantity is zero (0)
- SAP displays a clear error message indicating quantity must be greater than zero
- The system prevents posting return deliveries with zero quantity
- No Material Document is created; transaction is rejected

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- Transaction is rejected due to zero quantity

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
