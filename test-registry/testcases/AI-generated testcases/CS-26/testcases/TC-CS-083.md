# TC-CS-083: Search Batch Traceability Report by Vendor Batch Reference

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
| P3 | Master Data | Vendor batch reference `{TD.vendorBatchRef}` exists in SAP batch master and is maintained at goods receipt |
| P4 | Transactional Data | Vendor batch reference `{TD.vendorBatchRef}` is associated with internal batch `{TD.batchNumberVendor}` |
| P5 | Transactional Data | Batch `{TD.batchNumberVendor}` has recorded goods movements |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor Batch Reference | `{TD.vendorBatchRef}` | Vendor batch number used for batch search — entered by the user | Valid |
| Batch Number | `{TD.batchNumberVendor}` | Internal SAP batch number linked to the vendor batch — verified in results | Valid |
| Material Number | `{TD.materialNumberVendor}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.materialDescVendor}` | Material description — verified in results | Auto-populated |
| Base UoM | `{TD.baseUoMVendor}` | Base unit of measure — verified in results | Auto-populated |
| Plant | `{TD.plantVendor}` | Plant code where batch movements occurred — verified in results | Valid |
| Goods Receipt Date | `{TD.grDateVendor}` | Date of goods receipt movement | Valid |
| Goods Receipt Quantity | `{TD.grQuantityVendor}` | Quantity received | Valid |
| Movement Type | `{TD.movementTypeGRVendor}` | Movement type code for goods receipt (101) | Valid |

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
| 9 | In the "Vendor Batch" search field, enter the vendor batch reference | `{TD.vendorBatchRef}` | Vendor batch reference value is entered into the field |
| 10 | Press Enter to confirm the Vendor Batch entry | — | SAP accepts the vendor batch reference input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search by vendor batch reference |
| 12 | Verify that the results screen displays the vendor batch reference | `{TD.vendorBatchRef}` | Vendor batch reference is displayed in the results header or filter criteria section |
| 13 | Verify that the internal SAP batch number is displayed | `{TD.batchNumberVendor}` | Internal batch number linked to the vendor batch is visible |
| 14 | Verify that the material number and description are displayed | `{TD.materialNumberVendor}`, `{TD.materialDescVendor}` | Material number and description are visible in the results |
| 15 | Verify that the base unit of measure is displayed | `{TD.baseUoMVendor}` | Base UoM is visible in the results |
| 16 | Locate the "Goods Receipt" movement entry in the results table | — | Goods receipt movement row is visible with movement type `{TD.movementTypeGRVendor}` |
| 17 | Verify the goods receipt date and quantity | `{TD.grDateVendor}`, `{TD.grQuantityVendor}` | Date and quantity match the expected goods receipt values |
| 18 | Verify that the plant code is displayed for movements | `{TD.plantVendor}` | Plant code matches the expected value |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully using vendor batch reference as the search criterion
- The internal SAP batch number linked to the vendor batch reference is displayed
- All goods movements associated with the batch are displayed with correct dates, quantities, and movement types
- Material number, description, and base UoM are correctly displayed
- All verification steps pass with no errors or missing data

---

### Post-conditions

- Batch traceability data retrieved by vendor batch reference is accurate and complete
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
