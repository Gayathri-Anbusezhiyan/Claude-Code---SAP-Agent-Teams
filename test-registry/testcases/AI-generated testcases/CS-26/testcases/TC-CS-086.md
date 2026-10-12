# TC-CS-086: Attempt Batch Traceability Search with Non-Batch-Managed Material

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
| P3 | Master Data | Material `{TD.nonBatchManagedMaterial}` exists in SAP material master but is NOT configured with batch management enabled (MARA-XCHPF is not set) |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-Batch-Managed Material | `{TD.nonBatchManagedMaterial}` | Material number without batch management enabled — entered by the user | Invalid for batch search |
| Material Description | `{TD.nonBatchMaterialDesc}` | Material description — may be auto-populated | Auto-populated |

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
| 9 | In the "Material" search field, enter the non-batch-managed material number | `{TD.nonBatchManagedMaterial}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.nonBatchMaterialDesc}` may be auto-populated |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Observe the system response | — | SAP displays an error message or information message indicating that the material is not batch-managed or no batch data exists |
| 13 | Verify that the error message clearly states the material is not configured for batch management | `{TD.nonBatchManagedMaterial}` | Error or information message references the material number and states that batch management is not enabled or no batches are found |
| 14 | Verify that no batch traceability results are displayed | — | Results table is empty or displays "No data found" message |
| 15 | Verify that the system does not generate any report or export options | — | Export buttons are disabled or no report data is available for export |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the material number and detects that batch management is not enabled for this material
- A clear error or information message is displayed indicating the material is not batch-managed or no batch data exists
- No batch traceability data is displayed in the results
- No export functionality is available (buttons disabled or no data to export)
- The system gracefully handles the invalid search criteria without application errors

---

### Post-conditions

- No batch traceability report is generated
- System state remains consistent with no data corruption
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
