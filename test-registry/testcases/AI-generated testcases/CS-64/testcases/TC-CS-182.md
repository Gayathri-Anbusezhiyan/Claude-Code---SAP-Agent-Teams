# TC-CS-182: Verify Released Batch Becomes Available in Sales & Distribution for Sales Order Picking

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM) → Material Management (MM) → Sales & Distribution (SD)
**Feature:**             Batch Release Dashboard — Integration with SD (Released Batch Availability)
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
| P3 | Master Data | Batch `{TD.batchNumberForSD}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberForSD}` is linked to a material `{TD.materialForSD}` configured for sales and distribution |
| P5 | Master Data | A sales order `{TD.salesOrderNumber}` exists with line item for material `{TD.materialForSD}` awaiting batch allocation |
| P6 | Configuration | Stock status update workflow is configured to automatically change batch stock status to "Unrestricted" upon Release disposition, making it available in SD for picking |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberForSD}` | Batch to be released and verified in SD | Valid |
| Material ID | `{TD.materialForSD}` | Material linked to batch and sales order | Valid |
| Sales Order Number | `{TD.salesOrderNumber}` | Sales order awaiting batch allocation | Valid |
| Disposition | `{TD.dispositionReleaseSD}` | Release disposition | Valid |
| Stock Status After | `{TD.stockStatusUnrestricted}` | Unrestricted — available for SD picking | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberForSD}` | Batch `{TD.batchNumberForSD}` is displayed in the dashboard table |
| 10 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberForSD}` | Batch row is selected |
| 11 | Click the "Record Disposition" or "Release" button in the toolbar | — | Disposition dialog opens |
| 12 | In the Disposition dialog, select "Release" | `{TD.dispositionReleaseSD}` | "Release" option is selected |
| 13 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP processes the disposition; confirmation message appears |
| 14 | Verify the confirmation message indicates the disposition was successfully recorded | — | Success message is displayed: "Disposition recorded successfully" or equivalent |
| 15 | Verify the batch Stock Status has been updated to "Unrestricted" | `{TD.stockStatusUnrestricted}` | Stock Status column shows `{TD.stockStatusUnrestricted}` (Unrestricted) |
| 16 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 17 | Click the search icon and type "Manage Sales Orders" or equivalent SD app name | — | Search results appear listing the Sales & Distribution sales order management app |
| 18 | Click the sales order management app from the search results | — | Sales order list is displayed |
| 19 | Search for Sales Order | `{TD.salesOrderNumber}` | Sales order `{TD.salesOrderNumber}` is displayed in the list |
| 20 | Click the sales order number to open the sales order details | `{TD.salesOrderNumber}` | Sales order detail screen opens |
| 21 | Navigate to the line item for Material | `{TD.materialForSD}` | Line item for material `{TD.materialForSD}` is visible |
| 22 | Verify the batch `{TD.batchNumberForSD}` is now available for picking / allocation | `{TD.batchNumberForSD}` | Batch `{TD.batchNumberForSD}` appears in the available-to-promise (ATP) or batch selection list for the line item |
| 23 | Verify the batch stock status is "Unrestricted" in the SD batch selection view | `{TD.stockStatusUnrestricted}` | Batch stock status shows "Unrestricted" and is selectable for picking |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Released batch stock status is automatically updated to "Unrestricted" in SAP MM upon Release disposition
- The released batch becomes immediately available in Sales & Distribution (SD) for sales order picking and allocation
- The integration between QM → MM → SD is functioning correctly; batch availability propagates across modules without manual intervention

---

### Post-conditions

- Batch `{TD.batchNumberForSD}` has been released with stock status "Unrestricted"
- Batch `{TD.batchNumberForSD}` is available for allocation to sales order `{TD.salesOrderNumber}` in SD
- Cross-module integration (QM → MM → SD) is verified as functioning correctly

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
