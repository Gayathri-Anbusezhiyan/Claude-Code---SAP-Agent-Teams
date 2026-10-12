# TC-CS-101: Create GMP-Regulated API Material Master with Complete Mandatory Fields

**User Story:**          [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             GMP-Regulated Material Master Creation
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
| P1 | User Role | User has the role of Material Master Data Specialist with SAP authorization to create Material Master records in MM module |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | GMP-regulated material type `{TD.materialType}` is configured in the SAP system with GMP flag enabled |
| P4 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Configuration | QM module is activated; QM inspection type `{TD.qmInspectionType}` is configured and available for assignment |
| P6 | Configuration | Material numbering range is configured (internal or external numbering) |

---

### Test Data

**Dataset Reference:** `testdata/CS-30/CS-30-testdata.json` — Dataset ID: `TD-CS-030-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Type | `{TD.materialType}` | GMP-regulated material type code — selected by user | Valid |
| Material Description | `{TD.materialDescription}` | Material description text — entered by user | Valid |
| Base Unit of Measure | `{TD.baseUoM}` | Base unit code (e.g., KG, L, PC) — selected by user | Valid |
| Batch Management Indicator | `{TD.batchIndicator}` | Checkbox value (TRUE) — set by user | Valid |
| Total Shelf Life | `{TD.totalShelfLife}` | Shelf life in days — entered by user | Valid |
| Min Remaining Shelf Life | `{TD.minRemainingShelfLife}` | Minimum remaining shelf life in days — entered by user | Valid |
| Plant | `{TD.plant}` | Plant code — selected by user | Valid |
| QM Inspection Type | `{TD.qmInspectionType}` | Quality Management inspection type code — selected by user | Valid |

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
| 7 | Click the search icon in the top-right shell bar | — | Search input field appears |
| 8 | Type "Manage Material Master" in the search field | — | Search results appear listing the "Manage Material Master" application |
| 9 | Click the "Manage Material Master" application from the search results | — | The Manage Material Master application opens |
| 10 | Click the "Create" button in the application toolbar | — | Material Master creation form opens with General Data view |
| 11 | In the "Material Type" field, select the material type | `{TD.materialType}` | Material type is populated; form displays GMP-relevant fields |
| 12 | In the "Material Description" field, enter the material description | `{TD.materialDescription}` | Material description is entered |
| 13 | In the "Base Unit of Measure" field, select the unit | `{TD.baseUoM}` | Base unit of measure is populated |
| 14 | Locate the "Batch Management" checkbox and check it | `{TD.batchIndicator}` | Batch Management checkbox is checked (enabled) |
| 15 | Navigate to the "Plant Data / Storage" view by clicking the corresponding tab or section | — | Plant Data / Storage view is displayed |
| 16 | In the "Plant" field, enter or select the plant code | `{TD.plant}` | Plant code is populated; company code `{TD.companyCode}` is auto-populated |
| 17 | In the "Total Shelf Life" field, enter the shelf life value in days | `{TD.totalShelfLife}` | Total Shelf Life value is entered |
| 18 | In the "Minimum Remaining Shelf Life" field, enter the minimum shelf life value in days | `{TD.minRemainingShelfLife}` | Minimum Remaining Shelf Life value is entered |
| 19 | Navigate to the "Quality Management" view by clicking the corresponding tab or section | — | Quality Management view is displayed |
| 20 | In the "QM Inspection Type" field, select the inspection type | `{TD.qmInspectionType}` | QM Inspection Type is populated |
| 21 | Click the "Save" button in the application toolbar | — | SAP validates all mandatory fields and saves the material record |
| 22 | Observe the success message displayed on screen | — | A success message is displayed containing the generated material number (e.g., "Material {MaterialNumber} saved successfully") |
| 23 | Note the material number from the success message | — | Material number is captured for verification |
| 24 | Verify that the material status allows procurement release | — | Material status indicator shows "Released for Procurement" or equivalent status |
| 25 | Navigate to the "Display Changes" or change history function (via Environment menu or object menu) | — | Change log history screen is displayed |
| 26 | Verify that a change log entry exists for the material creation | — | Change log displays: creation date, created by user, and initial field values including batch management indicator, shelf-life parameters, and QM inspection type |
| 27 | Return to the material list view | — | Material list is displayed |
| 28 | Search for the newly created material using the material number noted in step 23 | — | The created material appears in the list with correct material type and description |
| 29 | Click the User Profile icon in the top-right of the Fiori shell bar | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Master record is generated by SAP with a system-generated material number
- All mandatory GMP fields are correctly stored: Batch Management Indicator (enabled), Total Shelf Life, Minimum Remaining Shelf Life, QM Inspection Type
- Material status is "Released for Procurement" indicating all mandatory fields are complete
- Company Code and other organizational fields are auto-populated correctly based on plant assignment
- Change log entry is created capturing the initial material creation with all regulatory-relevant field values
- The material appears in the Manage Material Master list and can be viewed

---

### Post-conditions

- SAP Material Master record exists with the generated material number
- Material is released for procurement (AC-5 verified)
- Batch management is enabled for the material (AC-2 verified)
- Shelf-life parameters (total and minimum remaining) are recorded on Plant Data/Storage view (AC-3 verified)
- QM inspection type is assigned to the material (AC-4 verified)
- Change log contains initial creation record with all field values (AC-6 verified)
- No application-level errors or critical warnings remain outstanding

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
