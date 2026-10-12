# TC-CS-169: Identify Batch Approaching Customer Ship Date, Record Release Disposition, and Verify Stock Status Updated to Unrestricted

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Release Disposition with Stock Status Update
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition (Release, Reject, Rework) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberPriority}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberPriority}` is linked to a sales order with customer ship date `{TD.customerShipDateApproaching}` within the next 7 days |
| P5 | Configuration | Stock status update workflow is configured to automatically change batch stock status to "Unrestricted" upon Release disposition |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberPriority}` | Batch approaching customer ship date — highlighted in dashboard | Valid |
| Customer Ship Date | `{TD.customerShipDateApproaching}` | Ship date within 7 days — triggers priority highlight | Valid |
| Disposition | `{TD.dispositionRelease}` | Final disposition decision: "Release" | Valid |
| Disposition Comments | `{TD.dispositionComments}` | Optional QA comments — entered by QA Manager | Valid |
| Stock Status Before | `{TD.stockStatusBeforeRelease}` | Quality Inspection — initial stock status | Valid |
| Stock Status After | `{TD.stockStatusAfterRelease}` | Unrestricted — expected stock status after Release | Valid |

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
| 9 | Locate the batch row with Batch Number and verify it is visually highlighted or flagged | `{TD.batchNumberPriority}` | Batch `{TD.batchNumberPriority}` is displayed with a visual indicator (color highlight, icon, or flag) indicating it is approaching customer ship date |
| 10 | Verify the Customer Ship Date column displays the approaching ship date | `{TD.customerShipDateApproaching}` | Ship date `{TD.customerShipDateApproaching}` is displayed (within next 7 days from current date) |
| 11 | Verify the current Stock Status is "Quality Inspection" | `{TD.stockStatusBeforeRelease}` | Stock Status column shows `{TD.stockStatusBeforeRelease}` (Quality Inspection) |
| 12 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberPriority}` | Batch row is selected (checkbox checked or row highlighted) |
| 13 | Click the "Record Disposition" or "Release" button in the toolbar | — | Disposition dialog or form opens |
| 14 | In the Disposition dialog, select "Release" from the Disposition dropdown or radio button group | `{TD.dispositionRelease}` | "Release" option is selected |
| 15 | In the Comments field, enter QA disposition comments | `{TD.dispositionComments}` | Comments are entered (optional) |
| 16 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP processes the disposition; confirmation message appears |
| 17 | Verify the confirmation message indicates the disposition was successfully recorded | — | Success message is displayed: "Disposition recorded successfully" or equivalent |
| 18 | Verify the batch row Stock Status has been updated to "Unrestricted" | `{TD.stockStatusAfterRelease}` | Stock Status column now shows `{TD.stockStatusAfterRelease}` (Unrestricted) |
| 19 | Verify the batch no longer appears in the Quality Inspection list (or status is updated to Released) | — | Batch `{TD.batchNumberPriority}` either disappears from the QI list or status column shows "Released" |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch approaching customer ship date is correctly highlighted in the dashboard to flag release priority
- QA Manager successfully records Release disposition directly from the dashboard
- SAP automatically updates the batch stock status from "Quality Inspection" to "Unrestricted" upon Release disposition
- The released batch becomes available for Sales & Distribution fulfillment operations

---

### Post-conditions

- Batch `{TD.batchNumberPriority}` has been released with disposition "Release"
- Stock status for batch `{TD.batchNumberPriority}` is "Unrestricted" in SAP MM
- Disposition timestamp and user ID are recorded in the batch audit trail
- Batch is available for picking in Sales & Distribution (SD module)

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
