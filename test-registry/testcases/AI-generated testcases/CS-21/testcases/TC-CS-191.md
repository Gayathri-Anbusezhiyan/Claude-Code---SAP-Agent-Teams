# TC-CS-191: Attempt Return Delivery with Quantity Exceeding Available Batch Stock

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderOverQty}` exists with goods receipt posted and batch `{TD.batchOverQty}` in Blocked or QI Stock |
| P4 | Master Data | Batch `{TD.batchOverQty}` has a known available quantity (e.g., 50 KG) that is LESS than `{TD.returnQuantityOver}` (over-return attempt, e.g., 9999 KG) |
| P5 | Business Rule | System must reject return deliveries where return quantity exceeds available batch stock |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderOverQty}` | Valid PO with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchOverQty}` | Valid batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialOverQty}` | Valid material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityOver}` | Quantity exceeding available stock (e.g., 9999 KG when available = 50 KG) — entered by the user | Invalid (exceeds upper boundary) |
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
| 11 | Enter Purchase Order | `{TD.purchaseOrderOverQty}` | PO is entered |
| 12 | Press Enter | — | Vendor information is auto-populated |
| 13 | Enter Material | `{TD.materialOverQty}` | Material is entered |
| 14 | Press Enter | — | Material details are auto-populated |
| 15 | Enter Batch | `{TD.batchOverQty}` | Batch is entered |
| 16 | Press Enter | — | Batch details are auto-populated; available quantity is displayed (e.g., 50 KG) |
| 17 | Note the available batch quantity displayed | — | Available quantity is recorded (e.g., 50 KG) |
| 18 | Enter return quantity EXCEEDING the available batch quantity | `{TD.returnQuantityOver}` | Over-return quantity is entered (e.g., 9999 KG when available = 50 KG) |
| 19 | Select rejection reason | `{TD.rejectionReasonStandard}` | Rejection reason is selected |
| 20 | Click "Post" | — | SAP validates the return quantity against available stock |
| 21 | Observe error message | — | SAP displays error: "Quantity exceeds available stock" or "Return quantity cannot exceed available batch quantity" or "Insufficient stock for batch `{TD.batchOverQty}`" |
| 22 | Verify Quantity field is highlighted | — | Quantity field is highlighted in red or marked with error indicator |
| 23 | Verify no Material Document is created | — | No document number is generated; transaction is NOT posted |
| 24 | Clear form | — | Form is cleared |
| 25 | Click User Profile icon | — | Profile menu appears |
| 26 | Click "Sign Out" | — | Sign out dialog appears |
| 27 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP detects that the return quantity exceeds the available batch stock
- SAP displays a clear error message indicating quantity exceeds available stock
- The system prevents over-return transactions to maintain inventory accuracy
- No Material Document is created; transaction is rejected

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- Batch stock remains unchanged
- Transaction is rejected due to over-return attempt

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
