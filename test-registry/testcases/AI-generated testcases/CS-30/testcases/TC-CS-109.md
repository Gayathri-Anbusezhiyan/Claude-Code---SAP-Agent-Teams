# TC-CS-109: Create Material with Total Shelf Life at Minimum Boundary (1 Day)

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

**Dataset Reference:** `testdata/CS-30/CS-30-testdata.json` — Dataset ID: `TD-CS-030-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Type | `{TD.materialType}` | GMP-regulated material type code — selected by user | Valid |
| Material Description | `{TD.materialDescription}` | Material description text — entered by user | Valid |
| Base Unit of Measure | `{TD.baseUoM}` | Base unit code (e.g., KG, L, PC) — selected by user | Valid |
| Batch Management Indicator | `{TD.batchIndicator}` | Checkbox value (TRUE) — set by user | Valid |
| Total Shelf Life | `{TD.minTotalShelfLife}` | Minimum boundary value: 1 day | Valid (boundary) |
| Min Remaining Shelf Life | `{TD.minRemainingShelfLifeForMinTotal}` | Must be less than Total Shelf Life (e.g., 0 days or omitted if 0 invalid) | Valid |
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
| 17 | In the "Total Shelf Life" field, enter the minimum boundary value | `{TD.minTotalShelfLife}` | Total Shelf Life value of 1 day is entered |
| 18 | In the "Minimum Remaining Shelf Life" field, enter a valid value less than Total Shelf Life | `{TD.minRemainingShelfLifeForMinTotal}` | Minimum Remaining Shelf Life value is entered (must be less than 1 day; if 0 is invalid, leave empty or omit based on SAP validation) |
| 19 | Navigate to the "Quality Management" view by clicking the corresponding tab or section | — | Quality Management view is displayed |
| 20 | In the "QM Inspection Type" field, select the inspection type | `{TD.qmInspectionType}` | QM Inspection Type is populated |
| 21 | Click the "Save" button in the application toolbar | — | SAP validates all fields and accepts the minimum boundary value for Total Shelf Life |
| 22 | Observe the success message displayed on screen | — | A success message is displayed containing the generated material number; material is saved successfully |
| 23 | Note the material number from the success message | — | Material number is captured |
| 24 | Verify that Total Shelf Life is stored as 1 day | — | Material record displays Total Shelf Life = 1 day on Plant Data/Storage view |
| 25 | Verify SLED calculation (if batch record created or displayed) | — | If applicable, verify that SAP calculates Shelf Life Expiration Date correctly based on 1-day Total Shelf Life |
| 26 | Click the User Profile icon in the top-right of the Fiori shell bar | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP system accepts the minimum boundary value (1 day) for Total Shelf Life
- Material Master record is successfully created with a system-generated material number
- Total Shelf Life field is correctly stored as 1 day
- No validation errors are displayed for the boundary value
- Material is released for procurement (assuming all other mandatory fields are complete)
- SLED calculation (Shelf Life Expiration Date) logic correctly handles the 1-day shelf life
- AC-3 boundary validation is confirmed — system accepts minimum valid value

---

### Post-conditions

- SAP Material Master record exists with the generated material number
- Total Shelf Life is stored as 1 day on Plant Data/Storage view
- Material is valid and can be used in procurement and inventory processes
- Boundary value validation for Total Shelf Life (lower boundary) is successfully verified

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
