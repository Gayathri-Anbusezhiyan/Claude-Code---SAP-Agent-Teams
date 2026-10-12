# TC-CS-087: Attempt Batch Traceability Search for Batch with Zero Goods Movements

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.zeroMovementBatch}` exists in SAP batch master (MCHA) and is associated with material `{TD.zeroMovementMaterial}` |
| P4 | Transactional Data | Batch `{TD.zeroMovementBatch}` has been created but has NO recorded goods movements (zero transactions in MSEG) |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.zeroMovementBatch}` | Batch master number with zero movements — entered by the user | Valid batch, but no movements |
| Material Number | `{TD.zeroMovementMaterial}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.zeroMovementMaterialDesc}` | Material description — verified in results | Auto-populated |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Where-Used List" | — | Search results appear listing the "Batch Where-Used List" application |
| 8 | Click the "Batch Where-Used List" application name from the search results | — | Batch Where-Used List application opens with search criteria fields displayed |
| 9 | In the "Batch" search field, enter the batch number with zero movements | `{TD.zeroMovementBatch}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Observe the system response | — | SAP displays the batch number and material details but shows no goods movements or displays "No movements found" message |
| 13 | Verify that the batch number is displayed in the results header | `{TD.zeroMovementBatch}` | Batch number is visible in the results |
| 14 | Verify that the material number and description are displayed | `{TD.zeroMovementMaterial}`, `{TD.zeroMovementMaterialDesc}` | Material number and description are visible |
| 15 | Verify that the goods movements section is empty or displays "No data found" / "No movements" message | — | Movements table is empty or displays an information message indicating no movements exist for this batch |
| 16 | Verify that no downstream linkage information is displayed | — | Process order and delivery linkage sections are empty or not displayed |
| 17 | Verify that export options are either disabled or generate an empty report | — | Export buttons may be disabled, or if enabled, the exported file contains batch header information but no movement data |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP successfully retrieves the batch record from the batch master
- Batch number, material number, and material description are displayed
- The goods movements section is empty or displays an information message indicating no movements exist
- No downstream linkage information is displayed (no process orders or deliveries)
- The system gracefully handles the zero-movement scenario without errors
- Export functionality is either disabled or produces an empty movements report

---

### Post-conditions

- System displays accurate information reflecting the true state of the batch (exists but has no movements)
- No application-level errors or critical warnings remain outstanding
- User session is terminated cleanly

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
