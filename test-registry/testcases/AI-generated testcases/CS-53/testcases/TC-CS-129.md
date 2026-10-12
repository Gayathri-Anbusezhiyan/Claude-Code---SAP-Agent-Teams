# TC-CS-129: Attempt to approve batch record with missing mandatory in-process control result

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
| P3 | Process Order | Process Order `{TD.processOrderNumberIncomplete}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberIncomplete}` exists, is linked to Process Order `{TD.processOrderNumberIncomplete}` |
| P5 | In-Process Controls | At least one mandatory in-process control result for batch `{TD.batchNumberIncomplete}` is MISSING (not recorded in SAP QM inspection lot) |
| P6 | Configuration | SAP QM module is configured with mandatory inspection characteristics; system validation prevents approval of incomplete batch records |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIncomplete}` | Process order number with missing in-process control result in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumberIncomplete}` | Batch number with missing mandatory in-process control result — entered by the user | Valid |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |
| Missing Control Result | `{TD.missingControlCharacteristic}` | Characteristic name of the missing mandatory in-process control result | Invalid (missing) |

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
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberIncomplete}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberIncomplete}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that the "Component Consumption" section displays consumed materials | — | Component consumption data from process order confirmations is displayed |
| 14 | Verify that the "In-Process Control Results" section displays inspection results | — | Some in-process control results are displayed; at least one mandatory characteristic is missing or shows "Not Recorded" status |
| 15 | Verify that a warning or error indicator is visible for the missing control result | `{TD.missingControlCharacteristic}` | System displays a warning or error indicator (e.g., red icon, missing data badge) next to the characteristic name `{TD.missingControlCharacteristic}` |
| 16 | Verify that the "Deviations" section shows no approved deviation linked to the missing result | — | No deviation is listed for the missing control result |
| 17 | Click the "Approve" button in the batch record toolbar | — | System validation is triggered |
| 18 | Observe the on-screen error response | — | Error message is displayed: "Batch record cannot be approved. Mandatory in-process control result is missing" or similar validation error text |
| 19 | Verify that the batch record status remains unchanged | — | Batch record status remains "PENDING" or "IN REVIEW"; status does NOT change to "APPROVED" |
| 20 | Verify that no electronic signature dialog appears | — | Electronic signature dialog does NOT appear; approval action is blocked by the validation |
| 21 | Verify that the "Approve" button remains enabled or the error message instructs corrective action | — | System indicates that the batch record is incomplete and cannot be approved until the missing result is recorded |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents approval of batch record for batch `{TD.batchNumberIncomplete}` due to missing mandatory in-process control result
- Error message clearly indicates that the batch record is incomplete and identifies the missing characteristic
- Batch record status remains "PENDING" or "IN REVIEW"; status does NOT change to "APPROVED"
- No electronic signature is recorded
- No EBR document number is generated
- Batch is NOT eligible for transfer to Unrestricted-Use stock
- System enforces GMP regulatory requirement that all mandatory in-process controls must be recorded before batch approval

---

### Post-conditions

- Batch record remains in incomplete state with status "PENDING" or "IN REVIEW"
- No electronic signature audit trail entry is created
- Batch `{TD.batchNumberIncomplete}` status does NOT allow stock transfer to Unrestricted-Use
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
