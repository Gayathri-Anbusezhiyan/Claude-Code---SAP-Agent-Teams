# TC-CS-070: Block Batch with Maximum Stock Quantity

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumberMaxStock}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has maximum or very large stock quantity `{TD.maxStockQuantity}` |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Configuration | Reason code `{TD.reasonCode}` is configured in SAP Customizing for batch hold operations |
| P7 | Pre-condition State | Batch has a very large stock quantity (e.g., 999999999.999 UoM) in unrestricted status |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-020`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberMaxStock}` | Existing batch with maximum stock quantity — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Stock Type | `{TD.stockTypeBlocked}` | Target stock status: "Blocked Stock" — selected by the user | Valid |
| Reason Code | `{TD.reasonCode}` | Reason for blocking the batch — entered by the user | Valid |
| Max Stock Quantity | `{TD.maxStockQuantity}` | Maximum or very large stock quantity (e.g., 999999999.999 UoM) — displayed in stock details | Valid (boundary value: upper) |

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
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumberMaxStock}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock quantity showing a very large value `{TD.maxStockQuantity}` (e.g., 999999999.999) and current stock status "Unrestricted-Use" |
| 16 | Verify that the stock quantity displayed is the maximum or very large value | `{TD.maxStockQuantity}` | Stock quantity field shows the large value (e.g., 999999999.999) |
| 17 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 18 | Click the "Change Stock" button or "Edit" button in the toolbar | — | Batch stock details screen opens in edit mode showing current stock status and maximum available stock quantity |
| 19 | In the "Stock Type" dropdown field, select the stock type | `{TD.stockTypeBlocked}` (Blocked Stock) | Stock Type dropdown displays "Blocked Stock" as the selected option |
| 20 | In the "Reason for Block" field, enter the reason code | `{TD.reasonCode}` | Reason code is entered into the field |
| 21 | Press Enter to confirm the reason code entry | — | Reason code is confirmed |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the stock status change transaction |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed indicating the batch stock status has been changed to "Blocked Stock" |
| 24 | Note the material document number from the success message | — | Material document number is displayed (format: 10-digit numeric starting with 49) |
| 25 | Navigate back to the Manage Stock list view | — | Stock list is displayed |
| 26 | Search for the batch using the Material Number, Batch Number, and Plant filters (steps 9-15) | `{TD.materialNumber}`, `{TD.batchNumberMaxStock}`, `{TD.plant}` | The batch appears in the list with updated stock status "Blocked Stock" and large quantity `{TD.maxStockQuantity}` |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The batch `{TD.batchNumberMaxStock}` of material `{TD.materialNumber}` in plant `{TD.plant}` is successfully changed from "Unrestricted-Use" status to "Blocked Stock" status even with maximum/large stock quantity
- A unique material document number is generated by SAP and displayed in the confirmation message
- The system logs the reason code `{TD.reasonCode}`, the user who initiated the hold, and the timestamp of the change
- The batch appears in the Manage Stock list with status "Blocked Stock" and the large quantity value
- The system correctly handles the upper boundary edge case for stock quantity without performance degradation or overflow issues

---

### Post-conditions

- SAP batch `{TD.batchNumberMaxStock}` stock status is "Blocked Stock" for plant `{TD.plant}` and storage location `{TD.storageLocation}`
- Material document exists with the generated document number documenting the stock status change
- Stock quantity remains at the large value (maximum quantity)
- The batch is now logically unavailable for any goods issue transactions
- Audit trail entry exists in batch change history with user, timestamp, old status, new status, and reason code
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
- **AC-2:** The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection" (testing boundary condition: maximum stock quantity)
- **AC-3:** Once blocked, the system prevents any goods issue transaction against that batch (boundary condition: maximum stock)
