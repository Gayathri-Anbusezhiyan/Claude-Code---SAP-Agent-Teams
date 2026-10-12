# TC-CS-060: Attempt to Block Batch with Zero Stock Quantity

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumberZeroStock}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, but has zero stock quantity (no available stock) |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Configuration | Reason code `{TD.reasonCode}` is configured in SAP Customizing for batch hold operations |
| P7 | Pre-condition State | Batch `{TD.batchNumberZeroStock}` has current stock quantity of zero (0) in the specified plant and storage location |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-010`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberZeroStock}` | Existing batch with zero stock — entered by the user | Valid (batch exists, but stock = 0) |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Stock Type | `{TD.stockTypeBlocked}` | Target stock status: "Blocked Stock" — selected by the user | Valid |
| Reason Code | `{TD.reasonCode}` | Reason for blocking the batch — entered by the user | Valid |

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
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumberZeroStock}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Either no results are displayed (batch with zero stock not shown), or batch is displayed with stock quantity showing 0 |
| 16 | If the batch is displayed, select the batch row from the results list | — | The batch row is highlighted/selected; stock quantity is shown as 0 |
| 17 | Attempt to click the "Change Stock" button or "Edit" button in the toolbar | — | Either the button is disabled/grayed out, or the stock change screen opens showing zero available stock |
| 18 | If the stock change screen opens, attempt to select the Stock Type | `{TD.stockTypeBlocked}` (Blocked Stock) | Stock Type dropdown may display the option, but SAP should prevent the action |
| 19 | In the "Reason for Block" field, enter the reason code | `{TD.reasonCode}` | Reason code is entered into the field |
| 20 | Press Enter to confirm the reason code entry | — | Reason code is confirmed |
| 21 | Click the "Save" button to attempt the stock status change | — | SAP begins validation processing |
| 22 | Observe the on-screen response | — | An error message is displayed indicating that stock status change cannot be performed on a batch with zero stock; message text includes "No stock available to block" or "Stock quantity is zero" |
| 23 | Verify that no material document number is generated | — | No material document number is displayed; the transaction is not posted |
| 24 | Close the error message dialog if applicable | — | Error dialog is dismissed |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the batch status change transaction from being posted on a batch with zero stock
- An error message is displayed clearly stating that stock status cannot be changed for a batch with zero stock quantity
- No material document number is generated
- Batch `{TD.batchNumberZeroStock}` remains with its current status (Unrestricted-Use or other); no status change occurs
- The system enforces the business rule that only batches with available stock can be blocked

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumberZeroStock}` stock status remains unchanged
- Stock quantity remains zero
- Audit log does NOT contain a stock status change transaction for the zero-stock batch
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
- **AC-2:** The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection" (testing the negative case: batch with zero stock cannot be blocked)
