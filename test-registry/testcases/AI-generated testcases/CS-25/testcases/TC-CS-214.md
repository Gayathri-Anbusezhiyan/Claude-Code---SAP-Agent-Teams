# TC-CS-214: Perform batch-specific physical inventory count with minimum counted quantity boundary (zero stock count)

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active in the system |
| P4 | Master Data | Storage Location `{TD.storageLocation}` exists, is active, and is assigned to plant `{TD.plant}` |
| P5 | Master Data | Material `{TD.materialId}` is created, batch-managed, and configured for plant `{TD.plant}` |
| P6 | Master Data | Batch `{TD.batchNumber}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity 0 (zero stock) |
| P7 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` |
| P8 | Configuration | Physical inventory process is configured for the plant and storage location |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantityZero}` | System book inventory quantity (0 - zero stock) | Valid (boundary: minimum) |
| Counted Quantity | `{TD.countedQuantityZero}` | Physical counted quantity (0 - zero stock) — entered by the user | Valid (boundary: minimum) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount | `{TD.varianceAmountZero}` | System-calculated difference (0) | Valid |
| Variance Percentage | `{TD.variancePercentageZero}` | System-calculated variance percentage (0%) | Valid |
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
| 14 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered into the field |
| 15 | Press Enter to confirm the batch entry | — | SAP validates the batch; batch details are displayed |
| 16 | Click the "Generate" or "Create Count Document" button | — | System generates the count document and displays inventory items for counting |
| 17 | Verify that the material `{TD.materialId}` is displayed in the count document with zero book quantity | `{TD.materialId}`, `{TD.bookQuantityZero}` | Material row appears with material description, batch, book inventory quantity 0 (zero), and unit of measure |
| 18 | In the "Counted Quantity" field for the material row, enter zero as the counted quantity | `{TD.countedQuantityZero}` | Counted quantity 0 is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount 0 and variance percentage 0%; zero-to-zero count is accepted as valid |
| 20 | Verify that the variance is zero | `{TD.varianceAmountZero}`, `{TD.variancePercentageZero}` | Variance amount is 0; variance percentage is 0%; no approval fields are required |
| 21 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been posted with a generated document number |
| 23 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 24 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 25 | Search for the newly posted document using the document number noted in step 23 | — | The posted document appears in the list with status "POSTED" |
| 26 | Click the document number to open the document details | — | Document details screen opens displaying header and item information |
| 27 | Verify the zero-count information in the document | — | Document displays material, batch, book quantity 0, counted quantity 0, variance 0, confirming that zero stock count is successfully recorded |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is posted successfully with status "POSTED"
- Material, batch, book quantity 0, counted quantity 0, and variance 0 are correctly stored
- System accepts zero as a valid minimum boundary value for counted quantity
- Zero-to-zero count is successfully posted without requiring approval
- Complete audit trail is maintained

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "POSTED"
- No inventory adjustment was applied (both book and counted quantities are zero)
- Audit trail is complete with user ID and timestamp
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
