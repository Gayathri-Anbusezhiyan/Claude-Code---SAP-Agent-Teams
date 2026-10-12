# TC-CS-039: Attempt to Place SD Block on Non-Existent Batch

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage batch master data and place quality blocks |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.invalidBatchNumber}` does NOT exist in SAP for material `{TD.materialNumber}` |
| P5 | Configuration | Plant `{TD.plant}` is configured and active in the SAP organizational structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material master number — entered by the user | Valid |
| Batch Number | `{TD.invalidBatchNumber}` | Non-existent batch number — entered by the user | Invalid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |

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
| 11 | In the Batch field, enter the invalid Batch Number | `{TD.invalidBatchNumber}` | Invalid Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP attempts to validate the batch |
| 13 | Observe the system response to the invalid batch number | — | SAP displays an error message: "Batch `{TD.invalidBatchNumber}` does not exist for material `{TD.materialNumber}`" or "Batch not found" |
| 14 | Verify that batch details are NOT loaded | — | Batch master record is not displayed; batch information fields remain empty |
| 15 | Attempt to proceed with SD block placement | — | SD block placement function is disabled or not accessible |
| 16 | Verify that the SD block cannot be applied | — | System prevents SD block placement; error message indicates batch validation failed |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates that the batch does not exist in the system
- A clear error message is displayed indicating that the batch number is invalid or does not exist
- Batch details are not loaded or displayed
- SD block placement function is not accessible or disabled
- System prevents the SD block from being placed on a non-existent batch
- The user is informed that the batch must exist before a block can be applied

---

### Post-conditions

- No SD block is placed (as the batch does not exist)
- System validation correctly identifies invalid batch numbers
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
