# TC-CS-212: Attempt to post count with variance exceeding tolerance with missing Reason Code field

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
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
| P7 | Configuration | Tolerance threshold is configured in SAP (transaction OMCO) with percentage `{TD.toleranceThreshold}` |
| P8 | Configuration | Supervisor approval workflow is configured for variances exceeding tolerance threshold |
| P9 | Configuration | Reason for Difference field is mandatory when variance exceeds tolerance |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material number — verified in count document | Valid |
| Book Quantity | `{TD.bookQuantity}` | System book inventory quantity (auto-displayed) | Valid |
| Counted Quantity | `{TD.countedQuantityHighVariance}` | Physical counted quantity exceeding tolerance — entered by the user | Valid (exceeds tolerance) |
| Variance Percentage | `{TD.variancePercentageHigh}` | System-calculated variance percentage | Valid (exceeds tolerance) |
| Tolerance Threshold | `{TD.toleranceThreshold}` | Configured tolerance limit (%) | Valid |
| Reason Code | `{TD.emptyValue}` | Reason for Difference field left empty | Missing (mandatory field) |

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
| 18 | In the "Counted Quantity" field for the material row, enter the counted quantity that exceeds tolerance | `{TD.countedQuantityHighVariance}` | Counted quantity is entered into the field |
| 19 | Press Enter to confirm the counted quantity entry | — | System calculates and displays the variance amount and variance percentage exceeding tolerance; "Reason for Difference" and "Approver" fields become mandatory and are highlighted |
| 20 | Verify that the variance percentage exceeds the tolerance threshold | `{TD.variancePercentageHigh}`, `{TD.toleranceThreshold}` | Variance percentage exceeds the tolerance threshold; mandatory fields are highlighted |
| 21 | Leave the "Reason for Difference" field empty | `{TD.emptyValue}` | Reason for Difference field remains empty |
| 22 | Click the "Post" button in the toolbar | — | SAP validates mandatory fields and displays an error message indicating that Reason for Difference is required |
| 23 | Verify that the error message is displayed | — | Error message is displayed with text indicating "Reason for Difference is required" or "Please enter reason code" or similar validation error; the Reason for Difference field is highlighted as mandatory |
| 24 | Verify that the count document is NOT posted | — | Count document is NOT posted; user remains on the document screen with validation error displayed |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays a validation error message indicating that Reason for Difference is a mandatory field when variance exceeds tolerance
- The Reason for Difference field is highlighted as mandatory
- Count document is NOT posted
- System prevents document posting without required Reason for Difference field

---

### Post-conditions

- Physical inventory document is not posted (remains in draft or count status)
- No inventory adjustment is applied
- User remains on the document screen with validation error displayed
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

**Note:** This test case is similar to TC-CS-206 (NEG-04) but categorized as ERROR scenario focusing specifically on the mandatory field validation when variance exceeds tolerance.
