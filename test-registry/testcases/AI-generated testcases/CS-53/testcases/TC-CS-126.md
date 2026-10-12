# TC-CS-126: Review and approve batch record with out-of-spec result and documented approved deviation

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberWithDeviation}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberWithDeviation}` exists, is linked to Process Order `{TD.processOrderNumberWithDeviation}`, and has at least one out-of-specification in-process control result |
| P5 | In-Process Controls | At least one in-process control result for batch `{TD.batchNumberWithDeviation}` is recorded as out-of-specification |
| P6 | Deviation | Quality Notification (deviation) `{TD.deviationReference}` exists, is linked to the out-of-spec result, and has status "Approved" |
| P7 | Configuration | SAP QM module is configured with inspection plans and quality notification workflow; SAP ArchiveLink or DMS is configured for batch record archiving |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberWithDeviation}` | Process order number with out-of-spec result in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumberWithDeviation}` | Batch number with out-of-spec result linked to process order — entered by the user | Valid |
| Deviation Reference | `{TD.deviationReference}` | Approved quality notification number linked to out-of-spec result — auto-populated | Valid |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |
| Material Description | `{TD.materialDescriptionDeviation}` | Auto-populated material description from batch master | Valid |
| Plant | `{TD.plantDeviation}` | Auto-populated plant from batch master | Valid |
| Out-of-Spec Result | `{TD.outOfSpecResult}` | Auto-populated out-of-specification in-process control result | Valid |

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
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberWithDeviation}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberWithDeviation}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that Material Description is displayed | `{TD.materialDescriptionDeviation}` | Material description auto-populated from batch master is visible |
| 14 | Verify that Plant is displayed | `{TD.plantDeviation}` | Plant code auto-populated from batch master is visible |
| 15 | Verify that the "Component Consumption" section displays consumed materials | — | Component consumption data from process order confirmations is displayed in structured format |
| 16 | Verify that the "In-Process Control Results" section displays all inspection results | `{TD.outOfSpecResult}` | All in-process control results are displayed; at least one result shows "Out of Spec" or "Fail" status |
| 17 | Verify that the "Deviations" section lists the approved deviation | `{TD.deviationReference}` | Deviation `{TD.deviationReference}` is listed with status "Approved" and linked to the out-of-spec result |
| 18 | Verify that the "Operation Confirmations" section displays completed operations | — | All process order operations are listed with confirmation status "Complete" |
| 19 | Click the "Approve" button in the batch record toolbar | — | Electronic signature dialog appears prompting for password authentication |
| 20 | In the "Password" field of the signature dialog, enter the signature password | `{TD.signaturePassword}` | Password is entered (masked) |
| 21 | Click the "Confirm" button in the signature dialog | — | SAP processes the electronic signature; batch record approval begins |
| 22 | Observe the on-screen confirmation response | — | Success message is displayed: "Batch record approved successfully" or similar confirmation text |
| 23 | Verify that the batch record status changes to "APPROVED" | — | Batch record status field displays "APPROVED" |
| 24 | Verify that "Reviewed By" field displays the current user ID | `{ENV.SAP_USERNAME}` | "Reviewed By" field shows the logged-in user's ID |
| 25 | Verify that "Signed On" timestamp is displayed in UTC format | — | Timestamp is visible showing current date and time in UTC format (e.g., 2026-08-24T14:30:00Z) |
| 26 | Note the EBR Document Number or Archive Reference displayed | — | A unique EBR document number or archive object ID is displayed (e.g., EBR-2026-00002) |
| 27 | Navigate back to the batch record list or close the record | — | Batch record list is displayed; approved batch record appears with "APPROVED" status |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch record for batch `{TD.batchNumberWithDeviation}` is successfully approved despite out-of-spec result because documented deviation `{TD.deviationReference}` is approved
- System verifies that out-of-spec result has approved deviation before allowing approval
- Electronic signature is recorded with timestamp in UTC format, user ID matching `{ENV.SAP_USERNAME}`, and complies with 21 CFR Part 11 requirements
- Batch record status changes to "APPROVED"
- A unique EBR document number is generated and displayed
- All batch record data including the deviation linkage is compiled correctly
- Batch is eligible for transfer to Unrestricted-Use stock
- Batch record is archived in SAP ArchiveLink or DMS and retrievable for regulatory inspection

---

### Post-conditions

- Batch record exists with status "APPROVED"
- Electronic signature audit trail entry is created in SAP Change Documents (CDHDR/CDPOS) with user ID, timestamp, and action
- Deviation `{TD.deviationReference}` remains linked to batch record and visible in archived record
- Batch `{TD.batchNumberWithDeviation}` status allows stock transfer to Unrestricted-Use
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
