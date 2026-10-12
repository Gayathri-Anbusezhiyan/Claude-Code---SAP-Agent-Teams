# TC-CS-068: Attempt to Block Batch for Material Not Batch-Managed

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Plant Manager with SAP authorization to manage batch stock and change stock status |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumberNonBatch}` exists, is active, but is NOT batch-managed (batch management flag is inactive in material master) |
| P4 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumberNonBatch}` and storage location `{TD.storageLocation}` exists in the plant |
| P5 | Configuration | Reason code `{TD.reasonCode}` is configured in SAP Customizing for batch hold operations |
| P6 | Pre-condition State | Material is NOT batch-managed; batch status change should not be applicable |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-018`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumberNonBatch}` | Material NOT batch-managed — entered by the user | Valid (exists but not batch-managed) |
| Batch Number | `{TD.batchNumber}` | Batch number — entered by the user | Invalid (not applicable for non-batch material) |
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
| 9 | In the Material filter field, enter the non-batch-managed Material Number | `{TD.materialNumberNonBatch}` | Material Number is entered into the filter field |
| 10 | Press Enter to confirm the Material entry | — | Material filter is applied; SAP may show that the material is not batch-managed |
| 11 | Attempt to enter a Batch Number in the Batch filter field | `{TD.batchNumber}` | Batch Number is entered into the filter field |
| 12 | Press Enter to confirm the Batch entry | — | SAP may display an error or warning that the material is not batch-managed |
| 13 | In the Plant filter field, enter the Plant code | `{TD.plant}` | Plant code is entered into the filter field |
| 14 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 15 | Click the "Go" button to execute the search | — | Either no results are displayed, or stock is displayed without batch information; an error message may appear stating "Material is not batch-managed" |
| 16 | Observe the on-screen response | — | An error or informational message is displayed indicating that batch status change is not applicable for non-batch-managed materials |
| 17 | Verify that no batch status change option is available | — | "Change Stock" button for batch status is either disabled or not applicable |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents batch status change operations on materials that are not batch-managed
- An error or informational message is displayed clearly stating that the material is not batch-managed and batch status change is not applicable
- No batch stock status change transaction can be initiated for non-batch-managed materials
- The system enforces the business rule that only batch-managed materials can have batch-level stock status changes

---

### Post-conditions

- No material document is created
- No batch stock status change occurs
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
- **AC-2:** The user can select a specific batch and change its stock status to "Blocked" or "Quality Inspection" (testing validation: material must be batch-managed)
