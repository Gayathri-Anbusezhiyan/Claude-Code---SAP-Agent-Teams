# TC-CS-200: Perform batch-specific physical inventory count with variance exceeding tolerance requiring reason code and supervisor approval

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
| P8 | Configuration | Supervisor approval workflow is configured for variances exceeding tolerance threshold |
| P9 | Master Data | Supervisor user `{TD.supervisorId}` is available as an approver in the system |
| P10 | Master Data | Variance reason code `{TD.reasonCode}` is configured and available for selection |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code for cold-chain storage — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantity}` | System book inventory quantity (auto-displayed) | Valid |
| Counted Quantity | `{TD.countedQuantityHighVariance}` | Physical counted quantity — entered by the user | Valid (exceeds tolerance) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount | `{TD.varianceAmountHigh}` | System-calculated difference (counted - book) | Valid |
| Variance Percentage | `{TD.variancePercentageHigh}` | System-calculated variance percentage | Valid (exceeds tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%) | Valid |
| Reason Code | `{TD.reasonCode}` | Documented reason for variance — entered by the user | Valid |
| Supervisor Approval | `{TD.supervisorId}` | Supervisor user ID for approval — entered by the user | Valid |
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
| 18 | In the "Counted Quantity" field for the material row, enter the counted quantity that exceeds tolerance | `{TD.countedQuantityHighVariance}` | Counted quantity is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount `{TD.varianceAmountHigh}` and variance percentage `{TD.variancePercentageHigh}` |
| 20 | Verify that the variance percentage exceeds the tolerance threshold | `{TD.variancePercentageHigh}`, `{TD.toleranceThreshold}` | Variance percentage `{TD.variancePercentageHigh}` is displayed and exceeds the tolerance threshold `{TD.toleranceThreshold}`; "Reason for Difference" and "Approver" fields become mandatory and are highlighted |
| 21 | In the "Reason for Difference" field, select or enter the reason code | `{TD.reasonCode}` | Reason code `{TD.reasonCode}` is selected; reason code description is auto-populated |
| 22 | In the "Approver" field, enter the supervisor user ID | `{TD.supervisorId}` | Supervisor ID `{TD.supervisorId}` is entered into the field |
| 23 | Press Enter to confirm the supervisor ID entry | — | SAP validates the supervisor ID; supervisor name `{TD.supervisorName}` is auto-populated |
| 24 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting with approval workflow |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been submitted for approval with a generated document number |
| 26 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 27 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 28 | Search for the newly submitted document using the document number noted in step 26 | — | The submitted document appears in the list with status "PENDING APPROVAL" or "APPROVED" (depending on workflow configuration) |
| 29 | Click the document number to open the document details | — | Document details screen opens displaying header and item information |
| 30 | Verify the approval information in the document | — | Document displays reason code `{TD.reasonCode}`, approver `{TD.supervisorId}` with name `{TD.supervisorName}`, counted quantity `{TD.countedQuantityHighVariance}`, variance `{TD.varianceAmountHigh}`, and approval status |
| 31 | Navigate to the "Count History" or audit log section | — | Count history is displayed with complete audit trail including user ID, timestamp, original book quantity, counted quantity, variance, reason code, approver details, and approval confirmation |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is submitted for approval successfully with status "PENDING APPROVAL" or "APPROVED"
- Material `{TD.materialId}`, batch `{TD.batchNumber}`, counted quantity `{TD.countedQuantityHighVariance}`, and variance `{TD.varianceAmountHigh}` are correctly stored
- Variance exceeds tolerance threshold; reason code `{TD.reasonCode}` and supervisor approval `{TD.supervisorId}` are recorded
- Complete audit trail is maintained showing user ID, timestamp, count details, reason code, approver details, and approval confirmation
- The document is visible in the "Manage Physical Inventory" list and can be retrieved

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "PENDING APPROVAL" or "APPROVED"
- Inventory adjustment is pending or applied to the system stock for batch `{TD.batchNumber}` based on approval workflow
- Reason code and supervisor approval details are immutably recorded in the document
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
