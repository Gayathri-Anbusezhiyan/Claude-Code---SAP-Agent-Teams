# TC-CS-103: Attempt to Create GMP Material Without QM Inspection Type

**User Story:**          [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             GMP-Regulated Material Master Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Master Data Specialist with SAP authorization to create Material Master records in MM module |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | GMP-regulated material type `{TD.materialType}` is configured in the SAP system with GMP flag enabled |
| P4 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Configuration | QM module is activated in the SAP system |
| P6 | Test Condition | QM Inspection Type will be intentionally left empty to trigger validation error |

---

### Test Data

**Dataset Reference:** `testdata/CS-30/CS-30-testdata.json` — Dataset ID: `TD-CS-030-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Type | `{TD.materialType}` | GMP-regulated material type code — selected by user | Valid |
| Material Description | `{TD.materialDescription}` | Material description text — entered by user | Valid |
| Base Unit of Measure | `{TD.baseUoM}` | Base unit code (e.g., KG, L, PC) — selected by user | Valid |
| Batch Management Indicator | `{TD.batchIndicator}` | Checkbox value (TRUE) — set by user | Valid |
| Total Shelf Life | `{TD.totalShelfLife}` | Shelf life in days — entered by user | Valid |
| Min Remaining Shelf Life | `{TD.minRemainingShelfLife}` | Minimum remaining shelf life in days — entered by user | Valid |
| Plant | `{TD.plant}` | Plant code — selected by user | Valid |
| QM Inspection Type | `{TD.qmInspectionTypeEmpty}` | QM Inspection Type — intentionally left empty | Invalid |

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
| 16 | In the "Plant" field, enter or select the plant code | `{TD.plant}` | Plant code is populated; company code is auto-populated |
| 17 | In the "Total Shelf Life" field, enter the shelf life value in days | `{TD.totalShelfLife}` | Total Shelf Life value is entered |
| 18 | In the "Minimum Remaining Shelf Life" field, enter the minimum shelf life value in days | `{TD.minRemainingShelfLife}` | Minimum Remaining Shelf Life value is entered |
| 19 | Navigate to the "Quality Management" view by clicking the corresponding tab or section | — | Quality Management view is displayed |
| 20 | Leave the "QM Inspection Type" field empty (do NOT select any value) | `{TD.qmInspectionTypeEmpty}` | QM Inspection Type field remains empty |
| 21 | Click the "Save" button in the application toolbar | — | SAP validates mandatory fields and detects missing QM Inspection Type |
| 22 | Observe the error message displayed on screen | — | An error message is displayed indicating "QM Inspection Type is required for GMP-relevant materials" or similar validation message; material is NOT saved |
| 23 | Verify that the material record was NOT created | — | No material number is generated; form remains in edit mode with validation error highlighted |
| 24 | Click the User Profile icon in the top-right of the Fiori shell bar | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP system rejects the material creation attempt due to missing QM Inspection Type
- An error message is displayed clearly indicating that QM inspection type assignment is mandatory for GMP-relevant materials
- No material number is generated
- Material record is NOT persisted in the SAP database
- User is prevented from releasing the material for procurement (AC-5 validated)
- The mandatory business rule for GMP materials requiring QM assignment (AC-4) is correctly enforced by the system

---

### Post-conditions

- No new Material Master record exists in SAP
- System validation correctly enforces GMP regulatory requirement for QM inspection type assignment
- Error message is logged (if applicable) in SAP application log
- No partial or incomplete material record is created

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
