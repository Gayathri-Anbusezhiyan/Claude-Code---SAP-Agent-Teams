# TC-CS-201: Perform physical inventory count with multiple batches in same storage location and verify variance calculation per batch

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active in the system |
| P4 | Master Data | Storage Location `{TD.storageLocation}` exists, is active, and is assigned to plant `{TD.plant}` |
| P5 | Master Data | Material `{TD.materialId}` is created, batch-managed, and configured for plant `{TD.plant}` |
| P6 | Master Data | Batch `{TD.batchNumber1}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity `{TD.bookQuantity1}` |
| P7 | Master Data | Batch `{TD.batchNumber2}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity `{TD.bookQuantity2}` |
| P8 | Master Data | Batch `{TD.batchNumber3}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity `{TD.bookQuantity3}` |
| P9 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` |
| P10 | Configuration | Physical inventory process is configured for the plant and storage location |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code for cold-chain storage — entered by the user | Valid |
| Batch Number 1 | `{TD.batchNumber1}` | First batch identification number — verified in count document | Valid |
| Batch Number 2 | `{TD.batchNumber2}` | Second batch identification number — verified in count document | Valid |
| Batch Number 3 | `{TD.batchNumber3}` | Third batch identification number — verified in count document | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity 1 | `{TD.bookQuantity1}` | System book inventory quantity for batch 1 (auto-displayed) | Valid |
| Book Quantity 2 | `{TD.bookQuantity2}` | System book inventory quantity for batch 2 (auto-displayed) | Valid |
| Book Quantity 3 | `{TD.bookQuantity3}` | System book inventory quantity for batch 3 (auto-displayed) | Valid |
| Counted Quantity 1 | `{TD.countedQuantity1}` | Physical counted quantity for batch 1 — entered by the user | Valid (within tolerance) |
| Counted Quantity 2 | `{TD.countedQuantity2}` | Physical counted quantity for batch 2 — entered by the user | Valid (within tolerance) |
| Counted Quantity 3 | `{TD.countedQuantity3}` | Physical counted quantity for batch 3 — entered by the user | Valid (within tolerance) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount 1 | `{TD.varianceAmount1}` | System-calculated difference for batch 1 (counted - book) | Valid |
| Variance Amount 2 | `{TD.varianceAmount2}` | System-calculated difference for batch 2 (counted - book) | Valid |
| Variance Amount 3 | `{TD.varianceAmount3}` | System-calculated difference for batch 3 (counted - book) | Valid |
| Variance Percentage 1 | `{TD.variancePercentage1}` | System-calculated variance percentage for batch 1 | Valid (within tolerance) |
| Variance Percentage 2 | `{TD.variancePercentage2}` | System-calculated variance percentage for batch 2 | Valid (within tolerance) |
| Variance Percentage 3 | `{TD.variancePercentage3}` | System-calculated variance percentage for batch 3 | Valid (within tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Physical Inventory" | — | Search results appear listing the "Manage Physical Inventory" application |
| 8 | Click "Manage Physical Inventory" from the search results | — | Manage Physical Inventory application opens displaying the count document list |
| 9 | Click the "Create" button in the application toolbar | — | New physical inventory count document creation form opens |
| 10 | In the "Plant:*" field, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 11 | Press Enter to confirm the plant entry | — | SAP validates the plant; plant description is auto-populated |
| 12 | In the "Storage Location:*" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered into the field |
| 13 | Press Enter to confirm the storage location entry | — | SAP validates the storage location; storage location description is auto-populated |
| 14 | Leave the "Batch" field empty (to include all batches in the storage location) | — | Batch field remains empty; all batches in the storage location will be included in the count document |
| 15 | Click the "Generate" or "Create Count Document" button | — | System generates the count document and displays all inventory items for all batches in the storage location |
| 16 | Verify that material `{TD.materialId}` appears with batch `{TD.batchNumber1}` and book quantity | `{TD.materialId}`, `{TD.batchNumber1}`, `{TD.bookQuantity1}` | First material row appears with material description `{TD.materialDesc}`, batch `{TD.batchNumber1}`, book inventory `{TD.bookQuantity1}`, and unit of measure `{TD.uom}` |
| 17 | Verify that material `{TD.materialId}` appears with batch `{TD.batchNumber2}` and book quantity | `{TD.materialId}`, `{TD.batchNumber2}`, `{TD.bookQuantity2}` | Second material row appears with material description `{TD.materialDesc}`, batch `{TD.batchNumber2}`, book inventory `{TD.bookQuantity2}`, and unit of measure `{TD.uom}` |
| 18 | Verify that material `{TD.materialId}` appears with batch `{TD.batchNumber3}` and book quantity | `{TD.materialId}`, `{TD.batchNumber3}`, `{TD.bookQuantity3}` | Third material row appears with material description `{TD.materialDesc}`, batch `{TD.batchNumber3}`, book inventory `{TD.bookQuantity3}`, and unit of measure `{TD.uom}` |
| 19 | In the "Counted Quantity" field for batch 1 row, enter the counted quantity | `{TD.countedQuantity1}` | Counted quantity is entered for batch 1 |
| 20 | Press Enter to confirm the counted quantity entry for batch 1 | — | System calculates and displays the variance amount `{TD.varianceAmount1}` and variance percentage `{TD.variancePercentage1}` for batch 1 |
| 21 | Verify that the variance percentage for batch 1 is within the tolerance threshold | `{TD.variancePercentage1}`, `{TD.toleranceThreshold}` | Variance percentage `{TD.variancePercentage1}` for batch 1 is displayed and is within the tolerance threshold `{TD.toleranceThreshold}` |
| 22 | In the "Counted Quantity" field for batch 2 row, enter the counted quantity | `{TD.countedQuantity2}` | Counted quantity is entered for batch 2 |
| 23 | Press Enter to confirm the counted quantity entry for batch 2 | — | System calculates and displays the variance amount `{TD.varianceAmount2}` and variance percentage `{TD.variancePercentage2}` for batch 2 |
| 24 | Verify that the variance percentage for batch 2 is within the tolerance threshold | `{TD.variancePercentage2}`, `{TD.toleranceThreshold}` | Variance percentage `{TD.variancePercentage2}` for batch 2 is displayed and is within the tolerance threshold `{TD.toleranceThreshold}` |
| 25 | In the "Counted Quantity" field for batch 3 row, enter the counted quantity | `{TD.countedQuantity3}` | Counted quantity is entered for batch 3 |
| 26 | Press Enter to confirm the counted quantity entry for batch 3 | — | System calculates and displays the variance amount `{TD.varianceAmount3}` and variance percentage `{TD.variancePercentage3}` for batch 3 |
| 27 | Verify that the variance percentage for batch 3 is within the tolerance threshold | `{TD.variancePercentage3}`, `{TD.toleranceThreshold}` | Variance percentage `{TD.variancePercentage3}` for batch 3 is displayed and is within the tolerance threshold `{TD.toleranceThreshold}` |
| 28 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting |
| 29 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been posted with a generated document number |
| 30 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 31 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 32 | Search for the newly posted document using the document number noted in step 30 | — | The posted document appears in the list with status "POSTED" |
| 33 | Click the document number to open the document details | — | Document details screen opens displaying header and all item rows |
| 34 | Verify that all three batch items are displayed with correct counted quantities and variances | `{TD.batchNumber1}`, `{TD.batchNumber2}`, `{TD.batchNumber3}`, `{TD.countedQuantity1}`, `{TD.countedQuantity2}`, `{TD.countedQuantity3}`, `{TD.varianceAmount1}`, `{TD.varianceAmount2}`, `{TD.varianceAmount3}` | All three batch rows are displayed with material `{TD.materialId}`, counted quantities, and calculated variances per batch; each batch variance is independently calculated and displayed |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is posted successfully with status "POSTED"
- All three batches (`{TD.batchNumber1}`, `{TD.batchNumber2}`, `{TD.batchNumber3}`) for material `{TD.materialId}` are counted and recorded
- Variance is calculated independently for each batch and all variances are within tolerance
- Each batch row displays counted quantity, variance amount, and variance percentage
- Complete audit trail is maintained for all three batch counts
- The document is visible in the "Manage Physical Inventory" list and can be retrieved

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "POSTED"
- Inventory adjustments have been applied to the system stock for all three batches
- Each batch variance is independently calculated and stored
- Audit trail is complete for all batch items with user ID and timestamp
- No application-level errors or critical warnings remain outstanding

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
