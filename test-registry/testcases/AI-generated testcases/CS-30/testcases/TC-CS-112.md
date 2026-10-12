# TC-CS-112: Create Material with Minimum Remaining Shelf Life at Maximum Valid Boundary (Total - 1 Day)

**User Story:**          [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             GMP-Regulated Material Master Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Master Data Specialist with SAP authorization to create Material Master records in MM module |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | GMP-regulated material type `{TD.materialType}` is configured in the SAP system with GMP flag enabled |
| P4 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Configuration | QM module is activated; QM inspection type `{TD.qmInspectionType}` is configured and available for assignment |

---

### Test Data

**Dataset Reference:** `testdata/CS-30/CS-30-testdata.json` — Dataset ID: `TD-CS-030-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Type | `{TD.materialType}` | GMP-regulated material type code — selected by user | Valid |
| Material Description | `{TD.materialDescription}` | Material description text — entered by user | Valid |
| Base Unit of Measure | `{TD.baseUoM}` | Base unit code (e.g., KG, L, PC) — selected by user | Valid |
| Batch Management Indicator | `{TD.batchIndicator}` | Checkbox value (TRUE) — set by user | Valid |
| Total Shelf Life | `{TD.totalShelfLifeForEdge}` | Standard value (e.g., 365 days) | Valid |
| Min Remaining Shelf Life | `{TD.maxMinRemainingShelfLife}` | Maximum valid boundary: Total Shelf Life - 1 (e.g., 364 days if Total = 365) | Valid (boundary) |
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
| 11 | In the "Material Type" field, select the material type | `{TD.materialType}` | Material type is populated |
| 12 | In the "Material Description" field, enter the material description | `{TD.materialDescription}` | Material description is entered |
| 13 | In the "Base Unit of Measure" field, select the unit | `{TD.baseUoM}` | Base unit of measure is populated |
| 14 | Locate the "Batch Management" checkbox and check it | `{TD.batchIndicator}` | Batch Management checkbox is checked |
| 15 | Navigate to the "Plant Data / Storage" view by clicking the corresponding tab or section | — | Plant Data / Storage view is displayed |
| 16 | In the "Plant" field, enter or select the plant code | `{TD.plant}` | Plant code is populated |
| 17 | In the "Total Shelf Life" field, enter the total shelf life value | `{TD.totalShelfLifeForEdge}` | Total Shelf Life value is entered (e.g., 365 days) |
| 18 | In the "Minimum Remaining Shelf Life" field, enter the maximum valid boundary value (Total - 1) | `{TD.maxMinRemainingShelfLife}` | Minimum Remaining Shelf Life value is entered (e.g., 364 days if Total = 365) |
| 19 | Navigate to the "Quality Management" view by clicking the corresponding tab or section | — | Quality Management view is displayed |
| 20 | In the "QM Inspection Type" field, select the inspection type | `{TD.qmInspectionType}` | QM Inspection Type is populated |
| 21 | Click the "Save" button in the application toolbar | — | SAP validates all fields and accepts the maximum valid boundary value for Minimum Remaining Shelf Life |
| 22 | Observe the success message displayed on screen | — | A success message is displayed containing the generated material number; material is saved successfully |
| 23 | Note the material number from the success message | — | Material number is captured |
| 24 | Verify that Minimum Remaining Shelf Life is stored correctly | — | Material record displays Minimum Remaining Shelf Life = Total Shelf Life - 1 day on Plant Data/Storage view |
| 25 | Click the User Profile icon in the top-right of the Fiori shell bar | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP system accepts the maximum valid boundary value (Total Shelf Life - 1 day) for Minimum Remaining Shelf Life
- Material Master record is successfully created with a system-generated material number
- Minimum Remaining Shelf Life field is correctly stored
- No validation errors are displayed for the boundary value
- Material is released for procurement
- AC-3 boundary validation is confirmed — system accepts maximum valid value (less than Total Shelf Life by 1 day)

---

### Post-conditions

- SAP Material Master record exists with the generated material number
- Minimum Remaining Shelf Life is stored correctly on Plant Data/Storage view
- Material is valid and can be used in procurement and inventory processes
- Boundary value validation for Minimum Remaining Shelf Life (upper valid boundary) is successfully verified

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
