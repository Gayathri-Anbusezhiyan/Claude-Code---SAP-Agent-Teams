# TC-CS-199: Perform batch-specific physical inventory count with variance within tolerance and verify audit trail

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active in the system |
| P4 | Master Data | Storage Location `{TD.storageLocation}` exists, is active, and is assigned to plant `{TD.plant}` |
| P5 | Master Data | Material `{TD.materialId}` is created, batch-managed, and configured for plant `{TD.plant}` |
| P6 | Master Data | Batch `{TD.batchNumber}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity `{TD.bookQuantity}` |
| P7 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` |
| P8 | Configuration | Physical inventory process is configured for the plant and storage location |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code for cold-chain storage — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantity}` | System book inventory quantity (auto-displayed) | Valid |
| Counted Quantity | `{TD.countedQuantity}` | Physical counted quantity — entered by the user | Valid (within tolerance) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount | `{TD.varianceAmount}` | System-calculated difference (counted - book) | Valid |
| Variance Percentage | `{TD.variancePercentage}` | System-calculated variance percentage | Valid (within tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%) | Valid |
| Storage Bin | `{TD.storageBin}` | Storage bin within the storage location (optional) | Valid |

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
| 14 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered into the field |
| 15 | Press Enter to confirm the batch entry | — | SAP validates the batch; batch details are displayed |
| 16 | Click the "Generate" or "Create Count Document" button | — | System generates the count document and displays inventory items for counting |
| 17 | Verify that the material `{TD.materialId}` is displayed in the count document with book quantity | `{TD.materialId}`, `{TD.bookQuantity}` | Material row appears with material description `{TD.materialDesc}`, batch `{TD.batchNumber}`, book inventory `{TD.bookQuantity}`, and unit of measure `{TD.uom}` |
| 18 | In the "Counted Quantity" field for the material row, enter the counted quantity | `{TD.countedQuantity}` | Counted quantity is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount `{TD.varianceAmount}` and variance percentage `{TD.variancePercentage}` |
| 20 | Verify that the variance percentage is within the tolerance threshold | `{TD.variancePercentage}`, `{TD.toleranceThreshold}` | Variance percentage `{TD.variancePercentage}` is displayed and is less than or equal to the tolerance threshold `{TD.toleranceThreshold}`; no approval fields are required |
| 21 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been posted with a generated document number |
| 23 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 24 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 25 | Search for the newly posted document using the document number noted in step 23 | — | The posted document appears in the list with status "POSTED" |
| 26 | Click the document number to open the document details | — | Document details screen opens displaying header and item information |
| 27 | Verify the audit trail information in the document | — | Document displays user ID `{ENV.SAP_USERNAME}`, posting timestamp, counted quantity `{TD.countedQuantity}`, variance `{TD.varianceAmount}`, and audit log is available |
| 28 | Navigate to the "Count History" or audit log section | — | Count history is displayed with complete audit trail including user ID, timestamp, original book quantity, counted quantity, variance, and posting confirmation |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is posted successfully with status "POSTED"
- Material `{TD.materialId}`, batch `{TD.batchNumber}`, counted quantity `{TD.countedQuantity}`, and variance `{TD.varianceAmount}` are correctly stored
- Variance is within tolerance threshold; no approval was required
- Complete audit trail is maintained showing user ID, timestamp, count details, and posting confirmation
- The document is visible in the "Manage Physical Inventory" list and can be retrieved

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "POSTED"
- Inventory adjustment has been applied to the system stock for batch `{TD.batchNumber}`
- Audit trail is complete and immutably recorded with user ID and timestamp
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
