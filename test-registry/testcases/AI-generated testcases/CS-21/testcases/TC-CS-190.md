# TC-CS-190: Record Return Delivery with Full Batch Quantity (Complete Return)

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderFullQty}` exists with goods receipt posted and batch `{TD.batchFullQty}` in Blocked or QI Stock |
| P4 | Master Data | Batch `{TD.batchFullQty}` has an exact available quantity of `{TD.returnQuantityFull}` (full batch return scenario) |
| P5 | Configuration | System allows full batch returns (return quantity = total available batch quantity) |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderFullQty}` | Valid PO with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchFullQty}` | Valid batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialFullQty}` | Valid material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityFull}` | Exact available batch quantity (full return) — entered by the user | Valid (boundary upper) |
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
| 11 | Enter Purchase Order | `{TD.purchaseOrderFullQty}` | PO is entered |
| 12 | Press Enter | — | Vendor information is auto-populated |
| 13 | Enter Material | `{TD.materialFullQty}` | Material is entered |
| 14 | Press Enter | — | Material details are auto-populated |
| 15 | Enter Batch | `{TD.batchFullQty}` | Batch is entered |
| 16 | Press Enter | — | Batch details are auto-populated; available quantity is displayed |
| 17 | Note the available batch quantity displayed by SAP | — | Available quantity is recorded (e.g., 50 KG) |
| 18 | Enter return quantity equal to the full available batch quantity | `{TD.returnQuantityFull}` | Full available quantity is entered (e.g., 50 KG) |
| 19 | Select rejection reason | `{TD.rejectionReasonStandard}` | Rejection reason is selected |
| 20 | Click "Post" | — | SAP processes the return delivery posting |
| 21 | Observe success message | — | Success message is displayed with Material Document number |
| 22 | Note Material Document number | — | Document number is recorded |
| 23 | Navigate to stock overview | — | Stock overview application opens |
| 24 | Search for batch and material | `{TD.batchFullQty}`, `{TD.materialFullQty}` | Batch stock quantity in Blocked or QI Stock is now ZERO (0) — full batch returned |
| 25 | Verify that the batch no longer appears in active stock or shows zero quantity | — | Batch quantity in restricted stock is zero; full return completed |
| 26 | Return to Launchpad | — | Launchpad is displayed |
| 27 | Click User Profile icon | — | Profile menu appears |
| 28 | Click "Sign Out" | — | Sign out dialog appears |
| 29 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP accepts the full batch quantity for the return delivery (return quantity = available quantity)
- Material Document is created successfully
- Batch stock quantity in Blocked or QI Stock is reduced to ZERO (0)
- The system correctly handles full batch returns (upper boundary scenario)

---

### Post-conditions

- SAP Material Document exists with movement type 122
- Batch `{TD.batchFullQty}` quantity in restricted stock is now zero (full return completed)
- Document status is "Posted"

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
