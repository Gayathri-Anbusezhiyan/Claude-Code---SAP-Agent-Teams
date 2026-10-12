# TC-CS-140: Batch record with zero deviations (all in-spec) — boundary lower

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberZeroDeviations}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberZeroDeviations}` exists, is linked to Process Order `{TD.processOrderNumberZeroDeviations}`, and has all in-process control results recorded |
| P5 | In-Process Controls | All mandatory in-process control results for batch `{TD.batchNumberZeroDeviations}` are complete and within specification limits (all in-spec) |
| P6 | Deviations | Zero quality notifications (deviations) exist for batch `{TD.batchNumberZeroDeviations}`; no out-of-spec results recorded |
| P7 | Boundary Condition | This test verifies the lower boundary for deviation count (minimum = 0) |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberZeroDeviations}` | Process order number in TECO status with zero deviations — entered by the user | Valid |
| Batch Number | `{TD.batchNumberZeroDeviations}` | Batch number with zero deviations — entered by the user | Valid |
| Deviation Count | `{TD.deviationCount}` | Number of deviations (boundary value = 0) — auto-populated | Valid (boundary lower) |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |

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
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberZeroDeviations}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberZeroDeviations}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that the "Component Consumption" section displays consumed materials | — | Component consumption data from process order confirmations is displayed in structured format |
| 14 | Verify that the "In-Process Control Results" section displays all inspection results | — | All mandatory in-process control results are displayed; all results show "In Spec" or "Pass" status |
| 15 | Verify that the "Deviations" section shows zero deviations | `{TD.deviationCount}` | No deviations are listed; section indicates "No Deviations" or "0 Deviations" or is empty |
| 16 | Verify that the system does NOT display any error or warning for zero deviations | — | No validation error or warning is displayed; zero deviations is a valid and acceptable state |
| 17 | Verify that the "Operation Confirmations" section displays completed operations | — | All process order operations are listed with confirmation status "Complete" |
| 18 | Click the "Approve" button in the batch record toolbar | — | Electronic signature dialog appears prompting for password authentication |
| 19 | In the "Password" field of the signature dialog, enter the signature password | `{TD.signaturePassword}` | Password is entered (masked) |
| 20 | Click the "Confirm" button in the signature dialog | — | SAP processes the electronic signature; batch record approval begins |
| 21 | Observe the on-screen confirmation response | — | Success message is displayed: "Batch record approved successfully" or similar confirmation text |
| 22 | Verify that the batch record status changes to "APPROVED" | — | Batch record status field displays "APPROVED" |
| 23 | Verify that "Reviewed By" field displays the current user ID | `{ENV.SAP_USERNAME}` | "Reviewed By" field shows the logged-in user's ID |
| 24 | Verify that "Signed On" timestamp is displayed in UTC format | — | Timestamp is visible showing current date and time in UTC format (e.g., 2026-08-24T14:30:00Z) |
| 25 | Note the EBR Document Number or Archive Reference displayed | — | A unique EBR document number or archive object ID is displayed |
| 26 | Navigate back to the batch record list or close the record | — | Batch record list is displayed; approved batch record appears with "APPROVED" status |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch record for batch `{TD.batchNumberZeroDeviations}` is successfully approved with zero deviations
- System correctly handles the boundary condition of zero deviations (lower boundary)
- No validation error or warning is displayed for zero deviations; this is a valid state when all in-process controls are in-spec
- Electronic signature is recorded with timestamp in UTC format, user ID matching `{ENV.SAP_USERNAME}`, and complies with 21 CFR Part 11 requirements
- Batch record status changes to "APPROVED"
- A unique EBR document number is generated and displayed
- Batch is eligible for transfer to Unrestricted-Use stock
- Batch record is archived in SAP ArchiveLink or DMS and retrievable for regulatory inspection

---

### Post-conditions

- Batch record exists with status "APPROVED" and zero deviations recorded
- Electronic signature audit trail entry is created in SAP Change Documents (CDHDR/CDPOS) with user ID, timestamp, and action
- Batch `{TD.batchNumberZeroDeviations}` status allows stock transfer to Unrestricted-Use
- Archived batch record is retrievable via EBR document number or archive reference
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
