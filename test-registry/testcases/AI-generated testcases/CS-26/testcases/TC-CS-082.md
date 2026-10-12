# TC-CS-082: Search Batch Traceability Report by Material Number

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumberSearch}` exists in SAP material master and is configured with batch management enabled |
| P4 | Transactional Data | Material `{TD.materialNumberSearch}` has at least one batch with recorded goods movements |
| P5 | Transactional Data | Expected batches associated with the material include `{TD.batchNumber1}` and `{TD.batchNumber2}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumberSearch}` | Material master number used for batch search — entered by the user | Valid |
| Material Description | `{TD.materialDescSearch}` | Material description — verified in results | Auto-populated |
| Base UoM | `{TD.baseUoMSearch}` | Base unit of measure — verified in results | Auto-populated |
| Batch Number 1 | `{TD.batchNumber1}` | First batch associated with the material — verified in results | Valid |
| Batch Number 2 | `{TD.batchNumber2}` | Second batch associated with the material — verified in results | Valid |
| Plant | `{TD.plantSearch}` | Plant code where batch movements occurred — verified in results | Valid |
| Goods Receipt Quantity | `{TD.grQuantitySearch}` | Sample goods receipt quantity for verification | Valid |
| Movement Type | `{TD.movementTypeGRSearch}` | Movement type code for goods receipt (101) | Valid |

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
| 9 | In the "Material" search field, enter the material number | `{TD.materialNumberSearch}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescSearch}` is auto-populated |
| 11 | Verify that the base unit of measure is auto-populated | `{TD.baseUoMSearch}` | Base UoM is displayed in the material field or adjacent field |
| 12 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search by material number |
| 13 | Verify that the results screen displays the material number and description | `{TD.materialNumberSearch}`, `{TD.materialDescSearch}` | Material number and description are visible in the results header or filter criteria section |
| 14 | Verify that multiple batch numbers associated with the material are displayed | `{TD.batchNumber1}`, `{TD.batchNumber2}` | At least two batch numbers are visible in the results table |
| 15 | Verify that each batch entry shows goods movements | — | Each batch row displays associated movements (goods receipt, transfer, consumption, or issue) |
| 16 | Select or expand the first batch entry | `{TD.batchNumber1}` | First batch's detailed movement list is displayed |
| 17 | Verify that movement details include dates, quantities, and movement types | `{TD.grQuantitySearch}`, `{TD.movementTypeGRSearch}` | Movement entries show dates, quantities, and movement type codes |
| 18 | Verify that the plant code is displayed for movements | `{TD.plantSearch}` | Plant code matches the expected value |
| 19 | Return to the batch list view (if expanded view was opened) | — | Batch list view is displayed again |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully using material number as the search criterion
- All batches associated with the material are displayed in the results
- Each batch entry shows associated goods movements with dates, quantities, and movement types
- Material description and base UoM are correctly auto-populated and displayed
- All verification steps pass with no errors or missing data

---

### Post-conditions

- Batch traceability data retrieved by material number is accurate and complete
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
