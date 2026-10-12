# TC-CS-211: Attempt to create count document with missing Batch Number field

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active in the system |
| P4 | Master Data | Storage Location `{TD.storageLocation}` exists, is active, and is assigned to plant `{TD.plant}` |
| P5 | Configuration | Physical inventory process is configured for the plant and storage location |
| P6 | Configuration | Batch-specific inventory counting is required (batch field is mandatory for this scenario) |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Batch Number | `{TD.emptyValue}` | Batch field left empty | Missing (mandatory field for batch-specific count) |

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
| 14 | Leave the "Batch" field empty | `{TD.emptyValue}` | Batch field remains empty (for batch-specific count scenario, this is treated as missing mandatory field) |
| 15 | Click the "Generate" or "Create Count Document" button | — | SAP validates fields; depending on configuration, system either generates document for all batches OR displays error if batch is mandatory for this scenario |
| 16 | Verify the system behavior | — | If batch is mandatory for this scenario: error message is displayed indicating "Batch is required for batch-specific count"; if batch is optional: document is generated for all batches in storage location (see TC-CS-201 for multiple batch scenario) |
| 17 | If error is displayed, verify that the Batch field is highlighted as mandatory | — | Batch field is highlighted as mandatory; count document is NOT created |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- For batch-specific count scenario: SAP displays a validation error message or warning indicating that Batch field is recommended or required
- The Batch field is highlighted or flagged
- System behavior depends on configuration: either rejects document creation OR generates document for all batches
- For this test case (ERR scenario), we expect validation error preventing batch-specific count without batch number

---

### Post-conditions

- If validation fails: no physical inventory document is created; user remains on the creation screen with validation error displayed
- If validation passes: document is created for all batches (alternative path scenario)
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

**Note:** This test case verifies the mandatory nature of the Batch field for batch-specific inventory counts. If the SAP configuration allows creating count documents without specifying a batch (generating a count for all batches), this test case may not fail as expected and the scenario becomes an alternative path (see TC-CS-201).
