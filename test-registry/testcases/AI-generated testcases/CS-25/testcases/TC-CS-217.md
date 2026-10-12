# TC-CS-217: Perform batch-specific physical inventory count with variance exactly one unit above tolerance threshold (exceeding)

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active in the system |
| P4 | Master Data | Storage Location `{TD.storageLocation}` exists, is active, and is assigned to plant `{TD.plant}` |
| P5 | Master Data | Material `{TD.materialId}` is created, batch-managed, and configured for plant `{TD.plant}` |
| P6 | Master Data | Batch `{TD.batchNumber}` exists in batch master (MCHA) and is assigned to material `{TD.materialId}` and storage location `{TD.storageLocation}` with book inventory quantity `{TD.bookQuantity}` |
| P7 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` (e.g., 5%) |
| P8 | Configuration | Supervisor approval workflow is configured for variances exceeding tolerance threshold |
| P9 | Master Data | Supervisor user `{TD.supervisorId}` is available as an approver in the system |
| P10 | Master Data | Variance reason code `{TD.reasonCode}` is configured and available for selection |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantity}` | System book inventory quantity (auto-displayed) | Valid |
| Counted Quantity | `{TD.countedQuantityAboveTolerance}` | Physical counted quantity with variance exactly one unit above tolerance threshold — entered by the user | Valid (boundary: above tolerance) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount | `{TD.varianceAmountAboveTolerance}` | System-calculated difference (counted - book) | Valid |
| Variance Percentage | `{TD.variancePercentageAboveTolerance}` | System-calculated variance percentage (slightly above tolerance, e.g., 5.1%) | Valid (boundary: above tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%, e.g., 5%) | Valid |
| Reason Code | `{TD.reasonCode}` | Documented reason for variance — entered by the user | Valid |
| Supervisor Approval | `{TD.supervisorId}` | Supervisor user ID for approval — entered by the user | Valid |

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
| 17 | Verify that the material `{TD.materialId}` is displayed in the count document with book quantity | `{TD.materialId}`, `{TD.bookQuantity}` | Material row appears with material description, batch, book inventory quantity, and unit of measure |
| 18 | In the "Counted Quantity" field for the material row, enter the counted quantity that produces variance exactly one unit (or minimal increment) above tolerance threshold | `{TD.countedQuantityAboveTolerance}` | Counted quantity is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount and variance percentage slightly above tolerance threshold |
| 20 | Verify that the variance percentage exceeds the tolerance threshold | `{TD.variancePercentageAboveTolerance}`, `{TD.toleranceThreshold}` | Variance percentage is above the tolerance threshold (e.g., 5.1% when tolerance is 5%); "Reason for Difference" and "Approver" fields become mandatory and are highlighted |
| 21 | In the "Reason for Difference" field, select or enter the reason code | `{TD.reasonCode}` | Reason code is selected; reason code description is auto-populated |
| 22 | In the "Approver" field, enter the supervisor user ID | `{TD.supervisorId}` | Supervisor ID is entered into the field |
| 23 | Press Enter to confirm the supervisor ID entry | — | SAP validates the supervisor ID; supervisor name is auto-populated |
| 24 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting with approval workflow |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been submitted for approval with a generated document number |
| 26 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 27 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 28 | Search for the newly submitted document using the document number noted in step 26 | — | The submitted document appears in the list with status "PENDING APPROVAL" or "APPROVED" |
| 29 | Click the document number to open the document details | — | Document details screen opens displaying header and item information |
| 30 | Verify that the variance is above tolerance threshold and approval was required | `{TD.variancePercentageAboveTolerance}` | Document displays variance percentage above tolerance threshold; reason code and approver details are recorded; system correctly identified that variance exceeds tolerance by even a minimal increment |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is submitted for approval successfully with status "PENDING APPROVAL" or "APPROVED"
- Material, batch, counted quantity, and variance above tolerance threshold are correctly stored
- Variance is exactly one unit (or minimal increment) above tolerance threshold; reason code and supervisor approval are required and recorded
- System correctly identifies that any variance exceeding tolerance (even by a minimal amount) triggers approval workflow
- Complete audit trail is maintained

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "PENDING APPROVAL" or "APPROVED"
- Inventory adjustment is pending or applied to the system stock based on approval workflow
- Variance above tolerance threshold is successfully handled with approval requirement
- Audit trail is complete with user ID, timestamp, reason code, and approver information
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

**Note:** This test case validates the boundary condition where variance percentage is exactly one unit (or minimal increment) above the tolerance threshold. The expected behavior is that even a minimal exceedance triggers the approval workflow. This confirms the system correctly distinguishes between "at tolerance" (TC-CS-216) and "above tolerance" (this test case).
