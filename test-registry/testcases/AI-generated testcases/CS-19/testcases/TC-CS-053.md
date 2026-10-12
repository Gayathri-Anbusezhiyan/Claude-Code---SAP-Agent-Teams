# TC-CS-053: Place Batch on Quality Hold with Blocked Stock Status

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
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
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed (batch management flag is active in material master) |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has unrestricted stock quantity greater than 0 |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Configuration | Reason code `{TD.reasonCode}` is configured in SAP Customizing for batch hold operations |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch with unrestricted stock — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Stock Type | `{TD.stockTypeBlocked}` | Target stock status: "Blocked Stock" — selected by the user | Valid |
| Reason Code | `{TD.reasonCode}` | Reason for blocking the batch (e.g., "Deviation Investigation") — entered by the user | Valid |

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
| 15 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock details including material description `{TD.materialDescription}`, current stock quantity, and current stock status "Unrestricted-Use" |
| 16 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 17 | Click the "Change Stock" button or "Edit" button in the toolbar | — | Batch stock details screen opens in edit mode showing current stock status and available stock |
| 18 | In the "Stock Type" dropdown field, select the stock type | `{TD.stockTypeBlocked}` (Blocked Stock) | Stock Type dropdown displays "Blocked Stock" as the selected option |
| 19 | In the "Reason for Block" field, enter the reason code | `{TD.reasonCode}` | Reason code is entered into the field |
| 20 | Press Enter to confirm the reason code entry | — | Reason code is confirmed |
| 21 | Click the "Save" button in the toolbar | — | SAP begins processing the stock status change transaction |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed indicating the batch stock status has been changed to "Blocked Stock" |
| 23 | Note the material document number from the success message or transaction log | — | Material document number is displayed (format: 10-digit numeric starting with 49) |
| 24 | Navigate back to the Manage Stock list view | — | Stock list is displayed |
| 25 | Search for the batch using the Material Number, Batch Number, and Plant filters (steps 9-15) | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.plant}` | The batch appears in the list with updated stock status "Blocked Stock" |
| 26 | Click on the batch row to view details | — | Batch details screen opens showing stock status "Blocked Stock", reason code `{TD.reasonCode}`, changed by user `{ENV.SAP_USERNAME}`, and timestamp |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The batch `{TD.batchNumber}` of material `{TD.materialNumber}` in plant `{TD.plant}` is successfully changed from "Unrestricted-Use" status to "Blocked Stock" status
- A unique material document number is generated by SAP and displayed in the confirmation message
- The system logs the reason code `{TD.reasonCode}`, the user who initiated the hold `{ENV.SAP_USERNAME}`, and the timestamp of the change
- The batch appears in the Manage Stock list with status "Blocked Stock"
- The change history log contains the old status (Unrestricted-Use), new status (Blocked Stock), user ID, timestamp, and reason code

---

### Post-conditions

- SAP batch `{TD.batchNumber}` stock status is "Blocked Stock" for plant `{TD.plant}` and storage location `{TD.storageLocation}`
- Material document exists with the generated document number documenting the stock status change
- The batch is now logically unavailable for any goods issue transactions (goods issue for production orders, sales orders, or stock transfers)
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
- **AC-1:** The user can access the "Manage Stock" or "Batch Where-Used List" Fiori app
- **AC-2:** The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection"
- **AC-3:** Once blocked, the system prevents any goods issue transaction against that batch (verified implicitly by status change)
- **AC-4:** The system logs the reason code and the user who initiated the hold, along with a timestamp
