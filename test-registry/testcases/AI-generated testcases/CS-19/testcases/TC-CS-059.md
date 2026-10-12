# TC-CS-059: Unauthorized User Attempts to Release Batch Hold

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Plant Manager or another role WITHOUT QA authorization to release batch holds (unauthorized user) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has stock with status "Blocked Stock" or "Quality Inspection Stock" |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Authorization | User does NOT have the required SAP authorization to release batch holds (QA Manager role missing) |
| P7 | Pre-condition State | Batch `{TD.batchNumber}` is currently blocked (stock status: Blocked Stock or Quality Inspection) |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-009`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberBlocked}` | Existing batch with Blocked Stock status — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| New Stock Type | `{TD.stockTypeUnrestricted}` | Target stock status: "Unrestricted-Use" — selected by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the unauthorized user email address in the email field | `{ENV.SAP_USERNAME}` (unauthorized user credentials) | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the "Manage Stock" application |
| 8 | Click "Manage Stock" from the search results | — | Manage Stock application opens displaying stock overview |
| 9 | In the Material filter field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the filter field |
| 10 | Press Enter to confirm the Material entry | — | Material filter is applied |
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumberBlocked}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | Batch filter is applied |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Stock list displays the selected batch with current stock status "Blocked Stock" or "Quality Inspection Stock" |
| 16 | Select the batch row from the results list | — | The batch row is highlighted/selected |
| 17 | Click the "Change Stock" or "Release Hold" button in the toolbar | — | Either the button is disabled/grayed out, or the stock change screen opens |
| 18 | If the stock change screen opens, attempt to change the Stock Type to Unrestricted-Use | `{TD.stockTypeUnrestricted}` | Stock Type dropdown displays "Unrestricted-Use" as the selected option |
| 19 | Click the "Save" button to attempt releasing the batch hold | — | SAP begins authorization validation processing |
| 20 | Observe the on-screen response | — | An error message is displayed indicating insufficient authorization; message text includes "No authorization to release batch hold" or "Missing authorization object" |
| 21 | Verify that the batch status remains unchanged | — | Batch status remains "Blocked Stock" or "Quality Inspection Stock"; no material document is generated |
| 22 | Close the error message dialog if applicable | — | Error dialog is dismissed |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the unauthorized user from releasing the batch hold
- An authorization error message is displayed clearly stating that the user lacks the required authorization to release batch holds
- No material document number is generated
- Batch `{TD.batchNumberBlocked}` remains with status "Blocked Stock" or "Quality Inspection Stock"; no status change occurs
- The system enforces role-based authorization control ensuring only authorized QA users can release batch holds

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumberBlocked}` stock status remains "Blocked Stock" or "Quality Inspection Stock"
- No stock status change occurs for the batch
- Audit log does NOT contain a stock status change transaction initiated by the unauthorized user
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
- **AC-5:** The system allows an authorized QA user to release the hold once the investigation is closed, restoring the batch to Unrestricted-Use stock (testing the negative case: unauthorized user cannot release)
