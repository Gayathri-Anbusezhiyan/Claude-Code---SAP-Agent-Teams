# TC-CS-065: Attempt to Block Batch with Missing Reason Code

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
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
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has unrestricted stock quantity greater than 0 |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Pre-condition State | Reason Code field will be left empty during the transaction |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-015`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch with unrestricted stock — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Stock Type | `{TD.stockTypeBlocked}` | Target stock status: "Blocked Stock" — selected by the user | Valid |
| Reason Code | `{TD.emptyValue}` | Reason Code field — left empty by the user | Invalid (missing mandatory field) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the "Manage Stock" application |
| 8 | Click "Manage Stock" from the search results | — | Manage Stock application opens displaying stock overview |
| 9 | In the Material filter field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the filter field |
| 10 | Press Enter to confirm the Material entry | — | Material filter is applied |
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock details |
| 16 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 17 | Click the "Change Stock" button or "Edit" button in the toolbar | — | Batch stock details screen opens in edit mode showing current stock status and available stock |
| 18 | In the "Stock Type" dropdown field, select the stock type | `{TD.stockTypeBlocked}` (Blocked Stock) | Stock Type dropdown displays "Blocked Stock" as the selected option |
| 19 | Leave the "Reason for Block" field empty | `{TD.emptyValue}` (no value entered) | Reason for Block field remains empty |
| 20 | Click the "Save" button in the toolbar | — | SAP begins validation processing |
| 21 | Observe the on-screen response | — | An error message is displayed indicating that Reason Code is a mandatory field; message text includes "Enter Reason Code" or "Reason for Block is required" |
| 22 | Verify that the Reason for Block field is highlighted as mandatory | — | Reason for Block field is highlighted in red or marked with an error indicator |
| 23 | Verify that no material document number is generated | — | No material document number is displayed; the transaction is not posted |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the stock status change transaction from being posted without a Reason Code
- An error message is displayed clearly stating that Reason Code is a mandatory field (regulatory compliance requirement for audit trail)
- The Reason for Block field is highlighted as mandatory (red border or error indicator)
- No material document number is generated
- No stock status change transaction can be completed without entering the Reason Code

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumber}` stock status remains unchanged (Unrestricted-Use)
- Audit log does NOT contain any transaction attempt
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

### AC Traceability

This test case covers the following Acceptance Criteria:
- **AC-4:** The system logs the reason code and the user who initiated the hold, along with a timestamp (testing mandatory field validation: Reason Code)
