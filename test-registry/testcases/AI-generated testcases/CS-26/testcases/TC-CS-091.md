# TC-CS-091: Verify Batch Traceability Report with Process Order Linkage Integration

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) and view process order details (PP Production Planning) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberPO}` exists in SAP batch master (MCHA) and is associated with material `{TD.materialNumberPO}` |
| P4 | Transactional Data | Batch `{TD.batchNumberPO}` has been consumed by process order `{TD.processOrderNumberInt}` with movement type 261 (goods issue for production) |
| P5 | Integration Data | Process order `{TD.processOrderNumberInt}` exists in SAP Production Planning (PP) module and references batch `{TD.batchNumberPO}` in the batch assignment |
| P6 | Transactional Data | Process order `{TD.processOrderNumberInt}` produces finished or semi-finished goods `{TD.finishedGoodsNumber}` using the raw material batch |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberPO}` | Batch master number consumed by process order — entered by the user | Valid |
| Material Number | `{TD.materialNumberPO}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.materialDescPO}` | Material description — verified in results | Auto-populated |
| Process Order Number | `{TD.processOrderNumberInt}` | Process order that consumed the batch — verified in downstream linkage | Valid |
| Finished Goods Number | `{TD.finishedGoodsNumber}` | Finished or semi-finished goods produced by the process order — verified in downstream linkage | Valid |
| Consumption Date | `{TD.consumptionDatePO}` | Date of consumption movement for the process order | Valid |
| Consumption Quantity | `{TD.consumptionQuantityPO}` | Quantity consumed by the process order | Valid |
| Movement Type | `{TD.movementTypeConsumptionPO}` | Movement type code for consumption (261) | Valid |
| Plant | `{TD.plantPO}` | Plant code where the process order was executed — verified in results | Valid |

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
| 9 | In the "Batch" search field, enter the batch number consumed by the process order | `{TD.batchNumberPO}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Verify that the results screen displays the batch number and material details | `{TD.batchNumberPO}`, `{TD.materialNumberPO}`, `{TD.materialDescPO}` | Batch number, material number, and description are visible in the results |
| 13 | Locate the consumption movement entry in the results table | `{TD.movementTypeConsumptionPO}` | Consumption movement row is visible with movement type 261 |
| 14 | Verify the consumption date and quantity for the process order | `{TD.consumptionDatePO}`, `{TD.consumptionQuantityPO}` | Date and quantity match the expected consumption values |
| 15 | Locate the downstream linkage section or expand process order details | — | Downstream linkage information is visible (may be a separate section or expandable row) |
| 16 | Verify that the process order number is displayed in the downstream linkage section | `{TD.processOrderNumberInt}` | Process order number that consumed the batch is visible and clickable |
| 17 | Verify that the finished goods number produced by the process order is displayed | `{TD.finishedGoodsNumber}` | Finished goods material number is visible in the downstream linkage section |
| 18 | Verify that the plant code is displayed for the process order | `{TD.plantPO}` | Plant code matches the expected value |
| 19 | If the process order number is a clickable link, click it to navigate to the process order details | `{TD.processOrderNumberInt}` | Navigation occurs to the process order detail screen (or a new tab/window opens with process order information) |
| 20 | Verify that the process order detail screen displays the batch assignment | `{TD.batchNumberPO}` | Batch number is visible in the process order's material component list or batch assignment section |
| 21 | Navigate back to the Batch Where-Used List results (if navigated away) | — | Batch Where-Used List results are displayed again |
| 22 | Verify that the complete traceability chain is visible: raw material batch → consumption movement → process order → finished goods | — | All elements of the traceability chain are present and correctly linked |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully
- All goods movements including consumption for the process order are displayed
- Downstream linkage to the process order is correctly displayed with process order number
- Finished goods produced by the process order are visible in the downstream linkage section
- Navigation to the process order detail screen (if available) confirms the batch assignment
- The complete traceability chain from raw material batch to finished goods is verifiable
- All verification steps pass with no errors or missing integration data

---

### Post-conditions

- Batch traceability report data including process order linkage is retrieved and displayed accurately from SAP
- Integration between MM (Batch Management) and PP (Production Planning) modules is verified
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
