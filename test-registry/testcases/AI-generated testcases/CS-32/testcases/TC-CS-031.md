# TC-CS-031: Access Manage Stock Fiori App and View Batch Stock Data

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to view stock and batch master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` in plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is active and configured for batch management |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Batch Number | `{TD.batchNumber}` | Batch identification number | Valid |
| Plant | `{TD.plant}` | Plant code where batch stock is stored | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the Manage Stock application |
| 8 | Click "Manage Stock" from the search results | — | Manage Stock application opens displaying the stock overview list |
| 9 | In the Material filter field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the filter field |
| 10 | Press Enter to apply the material filter | — | Filter is applied; stock records for the material are displayed |
| 11 | In the Batch filter field, enter the Batch Number | `{TD.batchNumber}` | Batch number is entered into the filter field |
| 12 | Press Enter to apply the batch filter | — | Filter is applied; stock record for the specific batch is displayed |
| 13 | Verify the batch stock data is visible in the list | — | Batch stock record displays: Material `{TD.materialId}`, Batch `{TD.batchNumber}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Stock Quantity, Stock Type, and Expiration Date (SLED) |
| 14 | Verify the Expiration Date (SLED) field is populated | — | SLED field shows the batch expiration date in SAP date format (DD.MM.YYYY or YYYY-MM-DD) |
| 15 | Verify the Stock Type field indicates the current stock status | — | Stock Type field displays "Unrestricted-Use" or "Blocked" or "Quality Inspection" |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Manage Stock Fiori application is accessible to the Warehouse Operator role
- Batch stock data for the specified material and batch is visible in the list
- All key batch information fields are displayed: Material, Batch, Plant, Storage Location, Stock Quantity, Stock Type, and Expiration Date (SLED)
- The application supports filtering by Material and Batch for targeted batch stock lookup

---

### Post-conditions

- User is signed out of SAP
- No changes have been made to batch stock data or master data
- Manage Stock application remains accessible for future test executions

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
