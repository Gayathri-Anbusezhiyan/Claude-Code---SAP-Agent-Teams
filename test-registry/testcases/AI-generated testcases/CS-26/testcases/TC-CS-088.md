# TC-CS-088: Attempt Batch Traceability Search without Entering Batch Number

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
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
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Scenario | User intends to search by batch number but leaves the Batch field empty |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.emptyBatch}` | Empty/blank batch field — no value entered | Invalid (missing mandatory) |

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
| 9 | Leave the "Batch" search field empty (do not enter any value) | `{TD.emptyBatch}` | Batch field remains blank |
| 10 | Leave all other search fields (Material, Vendor Batch) empty as well | — | All search criteria fields are empty |
| 11 | Click the "Go" or "Execute" button to attempt running the traceability query | — | SAP validates the search criteria |
| 12 | Observe the system response | — | SAP displays an error or information message indicating that at least one search criterion must be entered |
| 13 | Verify that the error message clearly states that the Batch field or another search field is required | — | Error or information message indicates "Enter at least one search criterion" or "Batch, Material, or Vendor Batch is required" |
| 14 | Verify that no batch traceability results are displayed | — | Results table is not populated; no query is executed |
| 15 | Verify that the Batch field is highlighted or marked as requiring input | — | Batch field or search criteria area is visually highlighted or marked with a validation indicator |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the search criteria before executing the query
- A clear error or information message is displayed indicating that at least one search criterion (Batch, Material, or Vendor Batch) is required
- The Batch field or search criteria area is visually highlighted as requiring input
- No batch traceability query is executed
- No results are displayed
- The system prevents the user from running an empty search without proper validation

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
