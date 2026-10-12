# TC-CS-189: Record Return Delivery with Minimum UoM Precision Return Quantity

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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderMinQty}` exists with goods receipt posted and batch `{TD.batchMinQty}` in Blocked or QI Stock |
| P4 | Master Data | Batch `{TD.batchMinQty}` has available quantity >= `{TD.returnQuantityMin}` (minimum UoM precision value, e.g., 0.001 KG) |
| P5 | Configuration | Material UoM is configured to allow decimal precision of at least 3 decimal places (e.g., 0.001 KG) |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderMinQty}` | Valid PO with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchMinQty}` | Valid batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialMinQty}` | Valid material configured for decimal precision — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityMin}` | Minimum UoM precision (e.g., 0.001 KG) — entered by the user | Valid (boundary lower) |
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
| 11 | Enter Purchase Order | `{TD.purchaseOrderMinQty}` | PO is entered |
| 12 | Press Enter | — | Vendor information is auto-populated |
| 13 | Enter Material | `{TD.materialMinQty}` | Material is entered |
| 14 | Press Enter | — | Material details are auto-populated; UoM with decimal precision is displayed |
| 15 | Enter Batch | `{TD.batchMinQty}` | Batch is entered |
| 16 | Press Enter | — | Batch details are auto-populated; stock type is displayed |
| 17 | Enter minimum return quantity | `{TD.returnQuantityMin}` | Minimum UoM precision quantity (e.g., 0.001 KG) is entered |
| 18 | Verify quantity field accepts decimal precision | — | Quantity field accepts and displays the minimum precision value (e.g., 0.001) |
| 19 | Select rejection reason | `{TD.rejectionReasonStandard}` | Rejection reason is selected |
| 20 | Click "Post" | — | SAP processes the return delivery posting |
| 21 | Observe success message | — | Success message is displayed with Material Document number |
| 22 | Note Material Document number | — | Document number is recorded (10-digit format) |
| 23 | Verify quantity value in success message or document | — | Quantity displayed matches the minimum precision value entered (e.g., 0.001 KG) |
| 24 | Navigate to stock overview | — | Stock overview application opens |
| 25 | Search for batch and material | `{TD.batchMinQty}`, `{TD.materialMinQty}` | Stock quantity is reduced by the minimum precision amount (e.g., 0.001 KG) |
| 26 | Return to Launchpad | — | Launchpad is displayed |
| 27 | Click User Profile icon | — | Profile menu appears |
| 28 | Click "Sign Out" | — | Sign out dialog appears |
| 29 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP accepts the minimum UoM precision quantity (e.g., 0.001 KG) for the return delivery
- Material Document is created successfully with the minimum precision quantity
- Stock is reduced by the minimum precision amount
- The system correctly handles decimal precision at the lower boundary

---

### Post-conditions

- SAP Material Document exists with movement type 122 and minimum precision quantity
- Batch stock is reduced by the minimum precision amount
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
