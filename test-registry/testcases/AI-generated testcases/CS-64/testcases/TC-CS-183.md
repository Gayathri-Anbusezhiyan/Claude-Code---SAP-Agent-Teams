# TC-CS-183: Verify Rejected Batch Is Excluded from Sales & Distribution Available-to-Promise (ATP)

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM) → Material Management (MM) → Sales & Distribution (SD)
**Feature:**             Batch Release Dashboard — Integration with SD (Rejected Batch Exclusion)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition, and authorization to access SD applications for verification |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberRejectedSD}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberRejectedSD}` is linked to a material `{TD.materialForRejectedSD}` configured for sales and distribution |
| P5 | Master Data | A sales order `{TD.salesOrderNumberForRejected}` exists with line item for material `{TD.materialForRejectedSD}` |
| P6 | Configuration | Stock status update workflow is configured to automatically change batch stock status to "Blocked" upon Reject disposition, excluding it from SD ATP |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberRejectedSD}` | Batch to be rejected and verified excluded from SD | Valid |
| Material ID | `{TD.materialForRejectedSD}` | Material linked to batch and sales order | Valid |
| Sales Order Number | `{TD.salesOrderNumberForRejected}` | Sales order with line item for material | Valid |
| Disposition | `{TD.dispositionRejectSD}` | Reject disposition | Valid |
| Stock Status After | `{TD.stockStatusBlocked}` | Blocked — excluded from SD picking | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Release" | — | Search results appear listing the Batch Release analytical Fiori app |
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens displaying the batch list |
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberRejectedSD}` | Batch `{TD.batchNumberRejectedSD}` is displayed in the dashboard table |
| 10 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberRejectedSD}` | Batch row is selected |
| 11 | Click the "Record Disposition" or "Reject" button in the toolbar | — | Disposition dialog opens |
| 12 | In the Disposition dialog, select "Reject" | `{TD.dispositionRejectSD}` | "Reject" option is selected |
| 13 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP processes the disposition; confirmation message appears |
| 14 | Verify the confirmation message indicates the disposition was successfully recorded | — | Success message is displayed: "Disposition recorded successfully" or equivalent |
| 15 | Verify the batch Stock Status has been updated to "Blocked" | `{TD.stockStatusBlocked}` | Stock Status column shows `{TD.stockStatusBlocked}` (Blocked) |
| 16 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 17 | Click the search icon and type "Manage Sales Orders" or equivalent SD app name | — | Search results appear listing the Sales & Distribution sales order management app |
| 18 | Click the sales order management app from the search results | — | Sales order list is displayed |
| 19 | Search for Sales Order | `{TD.salesOrderNumberForRejected}` | Sales order `{TD.salesOrderNumberForRejected}` is displayed in the list |
| 20 | Click the sales order number to open the sales order details | `{TD.salesOrderNumberForRejected}` | Sales order detail screen opens |
| 21 | Navigate to the line item for Material | `{TD.materialForRejectedSD}` | Line item for material `{TD.materialForRejectedSD}` is visible |
| 22 | Attempt to view available batches for picking / allocation | — | Batch selection or ATP view is opened |
| 23 | Verify the rejected batch `{TD.batchNumberRejectedSD}` is NOT listed in the available batches | `{TD.batchNumberRejectedSD}` | Batch `{TD.batchNumberRejectedSD}` does NOT appear in the available-to-promise (ATP) or batch selection list |
| 24 | Verify only batches with "Unrestricted" stock status are available for picking | — | Only unrestricted batches are displayed; blocked batches are excluded from selection |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Rejected batch stock status is automatically updated to "Blocked" in SAP MM upon Reject disposition
- The rejected batch is excluded from Sales & Distribution (SD) available-to-promise (ATP) and cannot be allocated to sales orders
- The integration between QM → MM → SD correctly enforces that rejected batches are not available for fulfillment

---

### Post-conditions

- Batch `{TD.batchNumberRejectedSD}` has been rejected with stock status "Blocked"
- Batch `{TD.batchNumberRejectedSD}` is NOT available for allocation to any sales order in SD
- Cross-module integration (QM → MM → SD) is verified as correctly excluding rejected batches from fulfillment

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
