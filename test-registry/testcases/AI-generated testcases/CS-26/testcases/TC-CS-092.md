# TC-CS-092: Verify Batch Traceability Report with Delivery Linkage Integration

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
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) and view delivery details (SD Sales and Distribution) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberDel}` exists in SAP batch master (MCHA) and is associated with material `{TD.materialNumberDel}` |
| P4 | Transactional Data | Batch `{TD.batchNumberDel}` has been issued to a delivery document `{TD.deliveryNumberInt}` with movement type 601 or 261 (goods issue for delivery) |
| P5 | Integration Data | Delivery document `{TD.deliveryNumberInt}` exists in SAP Sales and Distribution (SD) module and references batch `{TD.batchNumberDel}` in the batch split |
| P6 | Transactional Data | Delivery document `{TD.deliveryNumberInt}` is linked to sales order `{TD.salesOrderNumber}` and customer `{TD.customerNumber}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberDel}` | Batch master number issued to delivery — entered by the user | Valid |
| Material Number | `{TD.materialNumberDel}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.materialDescDel}` | Material description — verified in results | Auto-populated |
| Delivery Number | `{TD.deliveryNumberInt}` | Delivery document that consumed the batch — verified in downstream linkage | Valid |
| Sales Order Number | `{TD.salesOrderNumber}` | Sales order linked to the delivery — verified in downstream linkage | Valid |
| Customer Number | `{TD.customerNumber}` | Customer account number for the sales order — verified in downstream linkage | Valid |
| Issue Date | `{TD.issueDateDel}` | Date of goods issue movement for the delivery | Valid |
| Issue Quantity | `{TD.issueQuantityDel}` | Quantity issued to the delivery | Valid |
| Movement Type | `{TD.movementTypeIssueDel}` | Movement type code for goods issue (601 or 261) | Valid |
| Plant | `{TD.plantDel}` | Plant code where the delivery was issued — verified in results | Valid |

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
| 9 | In the "Batch" search field, enter the batch number issued to the delivery | `{TD.batchNumberDel}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Verify that the results screen displays the batch number and material details | `{TD.batchNumberDel}`, `{TD.materialNumberDel}`, `{TD.materialDescDel}` | Batch number, material number, and description are visible in the results |
| 13 | Locate the goods issue movement entry in the results table | `{TD.movementTypeIssueDel}` | Goods issue movement row is visible with movement type 601 or 261 |
| 14 | Verify the issue date and quantity for the delivery | `{TD.issueDateDel}`, `{TD.issueQuantityDel}` | Date and quantity match the expected issue values |
| 15 | Locate the downstream linkage section or expand delivery details | — | Downstream linkage information is visible (may be a separate section or expandable row) |
| 16 | Verify that the delivery number is displayed in the downstream linkage section | `{TD.deliveryNumberInt}` | Delivery document number that consumed the batch is visible and may be clickable |
| 17 | Verify that the sales order number is displayed in the downstream linkage section | `{TD.salesOrderNumber}` | Sales order number linked to the delivery is visible |
| 18 | Verify that the customer number is displayed in the downstream linkage section | `{TD.customerNumber}` | Customer account number is visible |
| 19 | Verify that the plant code is displayed for the delivery issue | `{TD.plantDel}` | Plant code matches the expected value |
| 20 | If the delivery number is a clickable link, click it to navigate to the delivery details | `{TD.deliveryNumberInt}` | Navigation occurs to the delivery document detail screen (or a new tab/window opens with delivery information) |
| 21 | Verify that the delivery detail screen displays the batch assignment | `{TD.batchNumberDel}` | Batch number is visible in the delivery's item list or batch split section |
| 22 | Navigate back to the Batch Where-Used List results (if navigated away) | — | Batch Where-Used List results are displayed again |
| 23 | Verify that the complete traceability chain is visible: raw material batch → goods issue movement → delivery → sales order → customer | — | All elements of the traceability chain are present and correctly linked |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully
- All goods movements including goods issue for the delivery are displayed
- Downstream linkage to the delivery document is correctly displayed with delivery number
- Sales order and customer information are visible in the downstream linkage section
- Navigation to the delivery detail screen (if available) confirms the batch assignment
- The complete traceability chain from raw material batch to customer delivery is verifiable
- All verification steps pass with no errors or missing integration data

---

### Post-conditions

- Batch traceability report data including delivery linkage is retrieved and displayed accurately from SAP
- Integration between MM (Batch Management) and SD (Sales and Distribution) modules is verified
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
