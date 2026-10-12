# TC-CS-072: Block Batch Used in Active Process Order and Verify Notification to Production Planning

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has unrestricted stock quantity greater than 0 |
| P5 | Master Data | Production Order (Process Order) `{TD.productionOrderNumber}` exists in status "Released" or "In Process" and requires batch `{TD.batchNumber}` of material `{TD.materialNumber}` as a component |
| P6 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P7 | Configuration | Reason code `{TD.reasonCode}` is configured in SAP Customizing for batch hold operations |
| P8 | Configuration | SAP notification system is configured to send alerts to Production Planning when a batch used in an active process order is placed on hold |
| P9 | Pre-condition State | Batch `{TD.batchNumber}` is currently allocated or reserved for production order `{TD.productionOrderNumber}` |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch allocated to active production order — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Stock Type | `{TD.stockTypeBlocked}` | Target stock status: "Blocked Stock" — selected by the user | Valid |
| Reason Code | `{TD.reasonCode}` | Reason for blocking the batch — entered by the user | Valid |
| Production Order Number | `{TD.productionOrderNumber}` | Active production order number consuming the batch — referenced for verification | Valid |

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
| 7 | Verify that the batch is allocated to an active production order (pre-condition check) | `{TD.productionOrderNumber}`, `{TD.batchNumber}` | Navigate to "Manage Production Orders" app, search for production order `{TD.productionOrderNumber}`, and verify that batch `{TD.batchNumber}` is listed as a component or reserved for the order |
| 8 | Return to the Fiori Launchpad home page | — | Fiori home page is displayed |
| 9 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the "Manage Stock" application |
| 10 | Click "Manage Stock" from the search results | — | Manage Stock application opens displaying stock overview |
| 11 | In the Material filter field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the filter field |
| 12 | Press Enter to confirm the Material entry | — | Material filter is applied |
| 13 | In the Batch filter field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the filter field |
| 14 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 15 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 16 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 17 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock details including material description `{TD.materialDescription}`, current stock quantity, and current stock status "Unrestricted-Use" |
| 18 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 19 | Click the "Change Stock" button or "Edit" button in the toolbar | — | Batch stock details screen opens in edit mode showing current stock status and available stock |
| 20 | In the "Stock Type" dropdown field, select the stock type | `{TD.stockTypeBlocked}` (Blocked Stock) | Stock Type dropdown displays "Blocked Stock" as the selected option |
| 21 | In the "Reason for Block" field, enter the reason code | `{TD.reasonCode}` | Reason code is entered into the field |
| 22 | Press Enter to confirm the reason code entry | — | Reason code is confirmed |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the stock status change transaction |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed indicating the batch stock status has been changed to "Blocked Stock" |
| 25 | Note the material document number from the success message | — | Material document number is displayed (format: 10-digit numeric starting with 49) |
| 26 | Verify that SAP triggers a notification to Production Planning | — | Check SAP notification system (e.g., "Manage Notifications" app, workflow inbox, or email) for a notification indicating that batch `{TD.batchNumber}` used in production order `{TD.productionOrderNumber}` has been placed on hold |
| 27 | Manually verify the notification content | `{TD.productionOrderNumber}`, `{TD.batchNumber}`, `{TD.materialNumber}`, `{TD.reasonCode}` | Notification includes: production order number, affected batch number, material number, reason for hold, and timestamp |
| 28 | Navigate to "Manage Production Orders" app to verify order status | `{TD.productionOrderNumber}` | Production order `{TD.productionOrderNumber}` may show a warning or status indicator that a required batch is on hold |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The batch `{TD.batchNumber}` of material `{TD.materialNumber}` in plant `{TD.plant}` is successfully changed from "Unrestricted-Use" status to "Blocked Stock" status
- A unique material document number is generated by SAP and displayed in the confirmation message
- The system logs the reason code `{TD.reasonCode}`, the user who initiated the hold, and the timestamp of the change
- A notification is automatically generated and sent to Production Planning (via SAP notification system, workflow inbox, or email) indicating that batch `{TD.batchNumber}` used in active production order `{TD.productionOrderNumber}` has been placed on hold
- The notification contains sufficient detail for Production Planning to take corrective action (reschedule, substitute material, or wait for hold release)
- Production order `{TD.productionOrderNumber}` may display a warning or status indicator about the affected batch

---

### Post-conditions

- SAP batch `{TD.batchNumber}` stock status is "Blocked Stock" for plant `{TD.plant}` and storage location `{TD.storageLocation}`
- Material document exists with the generated document number documenting the stock status change
- The batch is now logically unavailable for any goods issue transactions, including consumption by production order `{TD.productionOrderNumber}`
- A notification exists in SAP notification system addressed to Production Planning with details of the hold
- Production order `{TD.productionOrderNumber}` is flagged or shows a warning about the blocked batch component
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

### Notes

This is an integration test case requiring:
1. Manual setup of an active production order in SAP PP (Production Planning) module
2. Allocation of the test batch to the production order as a component
3. Manual verification of SAP notification delivery (workflow inbox, email, or notification app)
4. Cross-module coordination between MM (Inventory Management) and PP (Production Planning)

This test case is flagged as Automation Candidate: NO due to:
- Requirement for manual production order setup and batch allocation in PP module
- Need for manual verification of notification delivery across multiple channels
- Complexity of cross-module orchestration that exceeds standard Playwright automation scope

---

### AC Traceability

This test case covers the following Acceptance Criteria:
- **AC-6:** A notification is sent to Production Planning when a batch used in an active process order is placed on hold
