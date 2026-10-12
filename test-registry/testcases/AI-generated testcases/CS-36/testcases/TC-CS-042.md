# TC-CS-042: Attempt to Place SD Block with Material Number Field Empty

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage batch master data and place quality blocks |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumber}` exists in SAP for some batch-managed material |
| P4 | Configuration | Plant `{TD.plant}` is configured and active in the SAP organizational structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.emptyValue}` | Material field left empty — no value entered | Invalid (mandatory field) |
| Batch Number | `{TD.batchNumber}` | Existing batch number — entered by the user | Valid |
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
| 9 | Leave the Material field empty (do not enter any value) | `{TD.emptyValue}` | Material field remains blank |
| 10 | In the Batch field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 11 | Press Enter to confirm the Batch entry | — | SAP attempts to validate the batch without a material number |
| 12 | Observe the system response to the missing material number | — | SAP highlights the Material field as mandatory; system displays validation message: "Material number is required" or "Please enter a material number" |
| 13 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 14 | Attempt to search for the batch or proceed with batch operations | — | System prevents batch search; batch cannot be uniquely identified without material number |
| 15 | Attempt to proceed with SD block placement without entering a material number | — | SD block placement function is disabled or not accessible |
| 16 | Verify that the SD block cannot be applied without a material number | — | System prevents SD block placement; mandatory field validation is enforced |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP enforces mandatory field validation for the Material field
- The Material field is highlighted as required when left empty
- A clear validation message is displayed indicating that the Material field must be filled
- Batch cannot be searched or loaded without a material number (batch numbers are not unique across all materials)
- SD block placement function is disabled or blocked until a valid material number is entered
- System prevents the SD block from being placed without a material number
- No SD block action is executed

---

### Post-conditions

- No SD block is placed (as the material number is missing)
- Mandatory field validation is functioning correctly
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
