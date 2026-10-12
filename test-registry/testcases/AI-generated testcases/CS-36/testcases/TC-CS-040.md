# TC-CS-040: Attempt to Place SD Block on Material That Is Not Batch-Managed

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
| P3 | Master Data | Material `{TD.nonBatchManagedMaterial}` exists in SAP, is active, but is NOT configured as batch-managed (MARC-XCHPF is blank or not set) |
| P4 | Configuration | Plant `{TD.plant}` is configured and active in the SAP organizational structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.nonBatchManagedMaterial}` | Material master number NOT configured as batch-managed — entered by the user | Valid (but non-batch-managed) |
| Batch Number | `{TD.anyBatchNumber}` | Any batch number — entered by the user | N/A (not applicable for non-batch-managed material) |
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
| 9 | In the Material field, enter the non-batch-managed Material Number | `{TD.nonBatchManagedMaterial}` | Material Number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP attempts to validate the material |
| 11 | Observe the system response to the non-batch-managed material | — | SAP displays an error or warning message: "Material `{TD.nonBatchManagedMaterial}` is not batch-managed. Batch operations are not permitted." |
| 12 | Verify that the Batch field is disabled or not accessible | — | Batch field is greyed out, disabled, or does not appear (as material is not batch-managed) |
| 13 | Attempt to enter a Batch Number (if field is accessible) | `{TD.anyBatchNumber}` | System rejects the batch entry or displays an error |
| 14 | Attempt to proceed with SD block placement | — | SD block placement function is disabled or not accessible for non-batch-managed materials |
| 15 | Verify that the SD block cannot be applied | — | System prevents SD block placement; error message indicates material must be batch-managed |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates that the material is not configured as batch-managed
- A clear error message is displayed indicating that batch operations are not applicable to this material
- Batch field is disabled or inaccessible for non-batch-managed materials
- SD block placement function is not accessible or disabled
- System prevents the SD block from being placed on a non-batch-managed material
- The user is informed that only batch-managed materials can have batch-level SD blocks applied

---

### Post-conditions

- No SD block is placed (as the material is not batch-managed)
- System validation correctly identifies non-batch-managed materials
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
