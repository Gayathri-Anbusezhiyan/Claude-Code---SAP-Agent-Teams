# TC-CS-215: Perform batch-specific physical inventory count with maximum counted quantity boundary

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
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
| P7 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` |
| P8 | Configuration | Physical inventory process is configured for the plant and storage location |
| P9 | Configuration | Supervisor approval workflow is configured for variances exceeding tolerance threshold |
| P10 | Master Data | Supervisor user `{TD.supervisorId}` is available as an approver in the system |
| P11 | Master Data | Variance reason code `{TD.reasonCode}` is configured and available for selection |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantity}` | System book inventory quantity (auto-displayed) | Valid |
| Counted Quantity | `{TD.maxCountedQuantity}` | Maximum system-allowed counted quantity (boundary: 999999999.999) — entered by the user | Valid (boundary: maximum) |
| Unit of Measure | `{TD.uom}` | UoM (auto-populated from material master) | Valid |
| Variance Amount | `{TD.varianceAmountMax}` | System-calculated difference (counted - book) | Valid |
| Variance Percentage | `{TD.variancePercentageMax}` | System-calculated variance percentage (very high) | Valid (exceeds tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%) | Valid |
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
| 18 | In the "Counted Quantity" field for the material row, enter the maximum system-allowed counted quantity | `{TD.maxCountedQuantity}` | Maximum counted quantity value (999999999.999 or system maximum) is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount and variance percentage; system accepts the maximum boundary value |
| 20 | Verify that the variance percentage exceeds the tolerance threshold | `{TD.variancePercentageMax}`, `{TD.toleranceThreshold}` | Variance percentage is very high and exceeds the tolerance threshold; "Reason for Difference" and "Approver" fields become mandatory and are highlighted |
| 21 | In the "Reason for Difference" field, select or enter the reason code | `{TD.reasonCode}` | Reason code is selected; reason code description is auto-populated |
| 22 | In the "Approver" field, enter the supervisor user ID | `{TD.supervisorId}` | Supervisor ID is entered into the field |
| 23 | Press Enter to confirm the supervisor ID entry | — | SAP validates the supervisor ID; supervisor name is auto-populated |
| 24 | Click the "Post" button in the toolbar | — | SAP begins processing the count document posting with approval workflow |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the physical inventory document has been submitted for approval with a generated document number |
| 26 | Note the physical inventory document number from the success message | — | Physical inventory document number is displayed (10-digit numeric format) |
| 27 | Navigate to the "Manage Physical Inventory" list view | — | List of physical inventory documents is displayed |
| 28 | Search for the newly submitted document using the document number noted in step 26 | — | The submitted document appears in the list with status "PENDING APPROVAL" or "APPROVED" |
| 29 | Click the document number to open the document details | — | Document details screen opens displaying header and item information with maximum counted quantity |
| 30 | Verify that the maximum counted quantity is correctly stored | `{TD.maxCountedQuantity}`, `{TD.varianceAmountMax}` | Document displays counted quantity at maximum boundary value; variance is calculated correctly; reason code and approver details are recorded |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Physical Inventory Document number is generated by SAP and displayed in the confirmation message
- The document is submitted for approval successfully with status "PENDING APPROVAL" or "APPROVED"
- Material, batch, counted quantity at maximum boundary (999999999.999), and variance are correctly stored
- System accepts the maximum system-allowed value as a valid upper boundary for counted quantity
- Variance exceeds tolerance; reason code and supervisor approval are recorded
- Complete audit trail is maintained

---

### Post-conditions

- Physical Inventory Document exists with the generated document number and status "PENDING APPROVAL" or "APPROVED"
- Inventory adjustment is pending or applied to the system stock based on approval workflow
- Maximum boundary value is successfully validated and stored
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

**Note:** The maximum counted quantity value (999999999.999) may vary depending on SAP system configuration and material master UoM decimal places. This test case verifies that the system accepts the maximum configured boundary value.
