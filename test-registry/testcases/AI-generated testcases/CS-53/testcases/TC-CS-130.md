# TC-CS-130: Attempt to approve batch record with out-of-spec result and NO documented deviation

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
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
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberOutOfSpec}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberOutOfSpec}` exists, is linked to Process Order `{TD.processOrderNumberOutOfSpec}` |
| P5 | In-Process Controls | At least one in-process control result for batch `{TD.batchNumberOutOfSpec}` is recorded as out-of-specification |
| P6 | Deviation | NO quality notification (deviation) exists or is approved for the out-of-spec result |
| P7 | Configuration | SAP QM module is configured with inspection plans; system validation prevents approval of out-of-spec results without approved deviations |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberOutOfSpec}` | Process order number with out-of-spec result in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumberOutOfSpec}` | Batch number with out-of-spec result and no deviation — entered by the user | Valid |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |
| Out-of-Spec Result | `{TD.outOfSpecCharacteristic}` | Characteristic name of the out-of-specification in-process control result | Invalid (out-of-spec) |

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
| 7 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear listing the "Review Batch Records" application |
| 8 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection screen |
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberOutOfSpec}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberOutOfSpec}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that the "Component Consumption" section displays consumed materials | — | Component consumption data from process order confirmations is displayed |
| 14 | Verify that the "In-Process Control Results" section displays inspection results | `{TD.outOfSpecCharacteristic}` | All in-process control results are displayed; characteristic `{TD.outOfSpecCharacteristic}` shows "Out of Spec" or "Fail" status |
| 15 | Verify that an error or warning indicator is visible for the out-of-spec result | `{TD.outOfSpecCharacteristic}` | System displays an error or warning indicator (e.g., red icon, out-of-spec badge) next to the characteristic name `{TD.outOfSpecCharacteristic}` |
| 16 | Verify that the "Deviations" section shows no approved deviation linked to the out-of-spec result | — | No deviation is listed or linked to the out-of-spec result; section indicates "No Deviations" or is empty |
| 17 | Click the "Approve" button in the batch record toolbar | — | System validation is triggered |
| 18 | Observe the on-screen error response | — | Error message is displayed: "Batch record cannot be approved. Out-of-specification result exists without approved deviation" or similar validation error text |
| 19 | Verify that the batch record status remains unchanged | — | Batch record status remains "PENDING" or "IN REVIEW"; status does NOT change to "APPROVED" |
| 20 | Verify that no electronic signature dialog appears | — | Electronic signature dialog does NOT appear; approval action is blocked by the validation |
| 21 | Verify that the "Approve" button remains enabled or the error message instructs corrective action | — | System indicates that the batch record cannot be approved until the out-of-spec result is addressed with an approved deviation |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents approval of batch record for batch `{TD.batchNumberOutOfSpec}` due to out-of-specification result without approved deviation
- Error message clearly indicates that the batch record has an out-of-spec result and requires a documented, approved deviation before approval
- Batch record status remains "PENDING" or "IN REVIEW"; status does NOT change to "APPROVED"
- No electronic signature is recorded
- No EBR document number is generated
- Batch is NOT eligible for transfer to Unrestricted-Use stock
- System enforces GMP regulatory requirement that out-of-spec results must be addressed with approved deviations before batch approval

---

### Post-conditions

- Batch record remains in incomplete state with status "PENDING" or "IN REVIEW"
- No electronic signature audit trail entry is created
- Batch `{TD.batchNumberOutOfSpec}` status does NOT allow stock transfer to Unrestricted-Use
- No archived batch record is created
- Error validation log entry may be recorded for audit purposes
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
