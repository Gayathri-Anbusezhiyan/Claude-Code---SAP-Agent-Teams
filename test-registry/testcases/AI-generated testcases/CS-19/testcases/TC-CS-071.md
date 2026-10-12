# TC-CS-071: Release Hold on Batch That Was Never Blocked

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager or authorized user with SAP authorization to release batch holds |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumberUnrestricted}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has stock with status "Unrestricted-Use" (has NEVER been blocked) |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Pre-condition State | Batch is currently in "Unrestricted-Use" status and has never been placed on hold |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberUnrestricted}` | Existing batch with Unrestricted-Use status (never blocked) — entered by the user | Valid (but not blocked) |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| New Stock Type | `{TD.stockTypeUnrestricted}` | Target stock status: "Unrestricted-Use" — selected by the user | Valid (but no state change) |

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
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumberUnrestricted}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock status "Unrestricted-Use" |
| 16 | Verify that the current stock status is "Unrestricted-Use" | — | Stock status field shows "Unrestricted-Use" (batch has never been blocked) |
| 17 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 18 | Click the "Change Stock" or "Release Hold" button in the toolbar | — | Either the button is disabled/not applicable, or the stock change screen opens showing current status as Unrestricted-Use |
| 19 | If the stock change screen opens, verify that the Stock Type dropdown shows "Unrestricted-Use" as current status | — | Stock Type dropdown shows "Unrestricted-Use" selected; no change is needed |
| 20 | Attempt to click the "Save" button without making any change | — | SAP may display a message indicating no changes were made, or the button may be disabled |
| 21 | Observe the on-screen response | — | Either an informational message is displayed stating "No changes to save" or "Batch is already in Unrestricted-Use status", or the Save action is prevented |
| 22 | Verify that no material document number is generated | — | No material document number is displayed; no transaction is posted |
| 23 | Verify that the batch status remains unchanged | — | Batch status remains "Unrestricted-Use" |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents or ignores the release hold operation on a batch that is already in "Unrestricted-Use" status and has never been blocked
- Either an informational message is displayed stating that the batch is already unrestricted, or the Save button is disabled/not applicable
- No material document number is generated (no state change occurred)
- Batch `{TD.batchNumberUnrestricted}` remains with status "Unrestricted-Use"
- The system correctly handles the edge case of attempting to release a hold on a batch that was never blocked

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumberUnrestricted}` stock status remains "Unrestricted-Use"
- No stock status change occurs
- Audit log does NOT contain a stock status change transaction (or contains a "no change" log entry)
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
- **AC-5:** The system allows an authorized QA user to release the hold once the investigation is closed, restoring the batch to Unrestricted-Use stock (testing edge case: batch already in Unrestricted-Use status)
