# TC-CS-043: Verify QM Batch Status Change Triggers SD Block Automatically

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage batch status in QM module and view batch master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` in plant `{TD.plant}` with an unrestricted quality status (no blocks active) |
| P5 | Configuration | QM-SD integration is configured; batch status changes in QM module automatically propagate SD blocks to SD module |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material master number — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch with unrestricted status — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Quality Status | `{TD.restrictedQualityStatus}` | Restricted quality status code that triggers SD block — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up or Guided Tour dialog appears, dismiss it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Batch" | — | Search results appear listing batch management applications |
| 8 | Click "Manage Batch" from the search results | — | Manage Batch application opens |
| 9 | In the Material field, enter the Material Number | `{TD.materialNumber}` | Material Number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated |
| 11 | In the Batch field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch details are loaded and displayed |
| 13 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered and batch information is filtered for the specified plant |
| 14 | Press Enter to confirm the Plant entry | — | Batch record is loaded for the material-batch-plant combination |
| 15 | Verify the current batch quality status | — | Current quality status shows unrestricted status (e.g., "Released" or "Unrestricted Use") with no SD block active |
| 16 | Navigate to the batch quality status change function or QM module | — | Batch quality status change form or QM batch management screen opens |
| 17 | Change the batch quality status to a restricted status that triggers SD block | `{TD.restrictedQualityStatus}` | Restricted quality status (e.g., "Quality Hold", "Blocked", "Recalled") is entered |
| 18 | Save or confirm the quality status change | — | SAP processes the status change; confirmation message is displayed |
| 19 | Observe the system response indicating SD block propagation | — | System displays message: "Quality status changed; Sales & Distribution block automatically applied to batch `{TD.batchNumber}`" |
| 20 | Navigate back to the Manage Batch screen to verify SD block status | — | Batch master data screen is displayed |
| 21 | Verify that the SD block is now active on the batch | — | SD block status indicator shows active; batch is flagged as restricted for sales and distribution |
| 22 | Verify that the batch status change timestamp and user ID are logged | — | Audit log shows the status change action with timestamp `{TD.blockTimestamp}` and user ID |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch quality status is successfully changed from unrestricted to restricted status in QM module
- QM-SD integration automatically triggers an SD block on the batch when quality status changes to restricted
- SD block is visible in batch master data and SD module without requiring manual placement
- Confirmation message explicitly states that the SD block has been automatically applied
- Batch status change and SD block placement are logged in the audit trail with timestamp and user ID
- Cross-module integration between QM and SD is functioning correctly

---

### Post-conditions

- Batch `{TD.batchNumber}` for material `{TD.materialNumber}` has an active Sales & Distribution block
- Batch quality status is set to restricted status
- SD block was applied automatically by the QM-SD integration mechanism
- Audit trail records the status change and SD block placement
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

### Notes for Automation

This integration test case is marked as PARTIAL automation candidate due to:
- Requires QM module access and configuration knowledge
- Depends on QM-SD integration settings in SAP system
- May require specific quality status codes configured in the test environment
- Batch status change function navigation may vary based on SAP Fiori app versions
- Verification of cross-module propagation requires checking data in multiple SAP modules

---
