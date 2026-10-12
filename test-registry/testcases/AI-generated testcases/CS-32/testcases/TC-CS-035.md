# TC-CS-035: Authorized User Completes REWORK Disposition and Batch is Removed from Blocked Stock

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA/QM Authorized User with SAP authorization to complete batch disposition actions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.blockedBatchNumber}` exists for material `{TD.materialId}` in "Blocked" stock type with blocked stock quantity `{TD.blockedStockQuantity}` in plant `{TD.plant}` and blocked storage location `{TD.blockedStorageLocation}` |
| P5 | Pre-requisite | Batch `{TD.blockedBatchNumber}` has been identified as expired and automatically moved to blocked stock (result of AC-2, AC-3) |
| P6 | Configuration | Disposition functionality is enabled and configured in SAP for batch management |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Blocked Batch Number | `{TD.blockedBatchNumber}` | Batch currently in blocked stock type | Valid |
| Plant | `{TD.plant}` | Plant code where batch is stored | Valid |
| Blocked Storage Location | `{TD.blockedStorageLocation}` | Blocked storage location code | Valid |
| Blocked Stock Quantity | `{TD.blockedStockQuantity}` | Current blocked stock quantity | Valid |
| Disposition Action | `{TD.dispositionActionRework}` | Disposition action type | Valid (REWORK) |
| Disposition User | `{TD.dispositionUser}` | Authorized user completing disposition | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Disposition" or "Manage Batches" | — | Search results appear listing the batch disposition or batch management application |
| 8 | Click the batch disposition application from the search results | — | Batch disposition application opens displaying the list of batches pending disposition |
| 9 | In the Material filter field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 10 | In the Batch filter field, enter the Blocked Batch Number | `{TD.blockedBatchNumber}` | Batch number is entered |
| 11 | Press Enter to apply filters and click "Go" | — | Batch record is displayed showing Material `{TD.materialId}`, Batch `{TD.blockedBatchNumber}`, Stock Type "Blocked", and Quantity `{TD.blockedStockQuantity}` |
| 12 | Select the batch record by clicking the row | — | Batch record is selected; disposition options become available |
| 13 | Click the "Disposition" button or "Process Disposition" action | — | Disposition dialog or form opens |
| 14 | In the Disposition Action field, select "REWORK" | `{TD.dispositionActionRework}` | "REWORK" option is selected from the dropdown or radio button group |
| 15 | If a Reason Code field is present, enter a valid reason code | `{TD.dispositionReasonCode}` | Reason code is entered (e.g., "REPROCESS", "REPACKAGE") |
| 16 | If a Comments field is present, enter disposition comments | `{TD.dispositionComments}` | Comments are entered (e.g., "Batch expired on {TD.expiredDate}; approved for rework and repackaging") |
| 17 | Click the "Submit" or "Complete Disposition" button | — | SAP processes the disposition action |
| 18 | Observe the on-screen confirmation message | — | A success message is displayed: "Disposition completed for Batch {TD.blockedBatchNumber}" or similar |
| 19 | Navigate back to the Manage Stock application | — | Manage Stock application opens |
| 20 | Search for Material `{TD.materialId}` and Batch `{TD.blockedBatchNumber}` | — | Batch stock record is displayed |
| 21 | Verify the blocked stock quantity is now zero or the batch is removed from the list | — | Blocked stock quantity for the batch is 0, or the batch no longer appears in active stock records |
| 22 | Navigate to the batch disposition audit report (transaction or Fiori app) | — | Audit report screen is displayed |
| 23 | Search for disposition records for Batch `{TD.blockedBatchNumber}` | — | Disposition record is displayed showing: Material `{TD.materialId}`, Batch `{TD.blockedBatchNumber}`, Disposition Action "REWORK", Disposition Date (today), User `{TD.dispositionUser}` |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The authorized QA/QM user successfully completes the REWORK disposition action for expired batch `{TD.blockedBatchNumber}`
- The system removes the batch from blocked stock (blocked stock quantity becomes zero)
- A disposition record is created in the audit report with: Batch ID, Material ID, Disposition Action (REWORK), Disposition Date, Disposition User, and Comments
- The batch can no longer be used for production or shipment until rework is completed (GMP compliance is enforced)
- The disposition record is available for regulatory audit

---

### Post-conditions

- Batch `{TD.blockedBatchNumber}` is removed from blocked stock
- Blocked stock quantity for the batch is zero
- A disposition audit record exists in SAP with action "REWORK" and timestamp
- The batch status is updated to reflect disposition completion
- No further disposition actions are required for this batch

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
