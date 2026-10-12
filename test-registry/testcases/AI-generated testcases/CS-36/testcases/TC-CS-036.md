# TC-CS-036: Place SD Block on Valid Batch for Batch-Managed Material

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage batch master data and place quality blocks |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` in plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is configured and active in the SAP organizational structure |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material master number — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch number for the material — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where the batch is stored — entered by the user | Valid |

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
| 15 | Verify that batch status is displayed and the batch record is accessible | — | Batch master record is displayed with current status `{TD.batchStatus}` |
| 16 | Locate and click the function to place a Sales & Distribution block on the batch | — | SD block placement dialog or form opens |
| 17 | Confirm the SD block placement action | — | System processes the SD block request |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed: "Sales & Distribution block placed on batch `{TD.batchNumber}` for material `{TD.materialNumber}`" |
| 19 | Verify that the batch status now shows SD block active | — | Batch status indicator shows SD block is active; batch is flagged as restricted for sales and distribution |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Sales & Distribution block is successfully placed on batch `{TD.batchNumber}` for material `{TD.materialNumber}`
- Confirmation message clearly indicates the SD block has been applied
- Batch status in SAP master data (MCHA) reflects the SD block status
- Batch is now restricted from being used in new sales orders or deliveries
- All block placement actions are logged with timestamp and user ID (audit trail)

---

### Post-conditions

- Batch `{TD.batchNumber}` for material `{TD.materialNumber}` has an active Sales & Distribution block
- The batch cannot be selected or used in sales order or delivery creation transactions
- SD block status is visible in batch master data and batch information screens
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
