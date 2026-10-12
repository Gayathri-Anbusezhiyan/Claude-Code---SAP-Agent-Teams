# TC-CS-186: Attempt Return Delivery with Missing Rejection Reason Code

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderValidERR}` exists with goods receipt posted and batch `{TD.batchValidERR}` in Blocked or QI Stock |
| P4 | Configuration | "Reason for Movement" (Rejection Reason Code) is configured as a MANDATORY field for movement type 122 |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderValidERR}` | Valid PO with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchValidERR}` | Valid batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialValidERR}` | Valid material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityStandard}` | Standard return quantity — entered by the user | Valid |
| Rejection Reason Code | (empty) | Left EMPTY to test mandatory field validation | Invalid (missing) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click "Continue" | — | Password entry screen is displayed |
| 4 | Enter the user password | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click "Continue" | — | SAP authenticates the user and displays the Fiori Launchpad |
| 6 | If a pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Click the search icon and type "Post Goods Movement" | — | Search results appear |
| 8 | Click "Post Goods Movement" | — | Application opens |
| 9 | Enter movement type | 122 | Movement type 122 is entered |
| 10 | Press Enter | — | Movement type is confirmed |
| 11 | Enter Purchase Order number | `{TD.purchaseOrderValidERR}` | PO is entered |
| 12 | Press Enter | — | Vendor information is auto-populated |
| 13 | Enter Material number | `{TD.materialValidERR}` | Material is entered |
| 14 | Press Enter | — | Material details are auto-populated |
| 15 | Enter Batch number | `{TD.batchValidERR}` | Batch is entered |
| 16 | Press Enter | — | Batch details are auto-populated; stock type (S or X) is displayed |
| 17 | Enter return quantity | `{TD.returnQuantityStandard}` | Quantity is entered |
| 18 | Leave the "Reason for Movement" dropdown EMPTY (do NOT select any value) | (empty) | Reason for Movement field remains empty |
| 19 | Click the "Post" button | — | SAP validates mandatory fields |
| 20 | Observe the error message | — | SAP displays error: "Reason for Movement is required" or "Please enter a reason for movement" or "Mandatory field missing" |
| 21 | Verify that the Reason for Movement field is highlighted | — | Field is highlighted in red or marked with an error indicator |
| 22 | Verify that no Material Document is created | — | No document number is generated; transaction is NOT posted |
| 23 | Close the form | — | Form is closed |
| 24 | Click the User Profile icon | — | Profile menu appears |
| 25 | Click "Sign Out" | — | Sign out dialog appears |
| 26 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP enforces the mandatory field rule for "Reason for Movement" (Rejection Reason Code)
- SAP displays a clear error message indicating the field is required
- The "Reason for Movement" field is highlighted as mandatory
- No Material Document is created; the return delivery transaction is NOT posted

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to missing mandatory field

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
