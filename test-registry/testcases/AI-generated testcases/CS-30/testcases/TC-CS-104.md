# TC-CS-104: Attempt to Release Material for Procurement with Incomplete GMP Fields

**User Story:**          [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             GMP-Regulated Material Master Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Master Data Specialist with SAP authorization to create and release Material Master records in MM module |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | GMP-regulated material type `{TD.materialType}` is configured in the SAP system with GMP flag enabled |
| P4 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Configuration | QM module is activated; QM inspection type `{TD.qmInspectionType}` is configured and available for assignment |
| P6 | Test Condition | Total Shelf Life will be intentionally left empty to create incomplete GMP material record |

---

### Test Data

**Dataset Reference:** `testdata/CS-30/CS-30-testdata.json` — Dataset ID: `TD-CS-030-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Type | `{TD.materialType}` | GMP-regulated material type code — selected by user | Valid |
| Material Description | `{TD.materialDescription}` | Material description text — entered by user | Valid |
| Base Unit of Measure | `{TD.baseUoM}` | Base unit code (e.g., KG, L, PC) — selected by user | Valid |
| Batch Management Indicator | `{TD.batchIndicator}` | Checkbox value (TRUE) — set by user | Valid |
| Total Shelf Life | `{TD.totalShelfLifeEmpty}` | Intentionally left empty | Invalid |
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
| 16 | In the "Plant" field, enter or select the plant code | `{TD.plant}` | Plant code is populated; company code is auto-populated |
| 17 | Leave the "Total Shelf Life" field empty (do NOT enter any value) | `{TD.totalShelfLifeEmpty}` | Total Shelf Life field remains empty |
| 18 | In the "Minimum Remaining Shelf Life" field, enter the minimum shelf life value in days | `{TD.minRemainingShelfLife}` | Minimum Remaining Shelf Life value is entered |
| 19 | Navigate to the "Quality Management" view by clicking the corresponding tab or section | — | Quality Management view is displayed |
| 20 | In the "QM Inspection Type" field, select the inspection type | `{TD.qmInspectionType}` | QM Inspection Type is populated |
| 21 | Click the "Save" button in the application toolbar | — | SAP validates mandatory fields and detects missing Total Shelf Life |
| 22 | Observe the error message displayed on screen | — | An error message is displayed indicating "Total Shelf Life is required" or similar validation message; material is NOT saved OR material is saved in incomplete status |
| 23 | If material is saved, attempt to release the material for procurement by clicking "Release" or equivalent action | — | System blocks the release action and displays error: "Material cannot be released for procurement until all mandatory GMP fields are completed" |
| 24 | Verify that the material status remains unreleased or blocked | — | Material status indicator shows "Not Released" or "Blocked" — procurement release is NOT allowed |
| 25 | Click the User Profile icon in the top-right of the Fiori shell bar | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP system correctly enforces the business rule that GMP materials cannot be released for procurement until all mandatory fields are completed (AC-5 validated)
- System either:
  - (Option 1) Prevents saving the material entirely and displays mandatory field error, OR
  - (Option 2) Saves the material in an incomplete/unreleased status and blocks procurement release action
- If material is saved, material status indicator clearly shows "Not Released" or equivalent
- Procurement release button is disabled or displays error when clicked
- Error message clearly states that all mandatory GMP fields must be completed before procurement release
- No procurement transactions (e.g., Purchase Order creation) can reference this material until it is fully completed and released

---

### Post-conditions

- Material Master record may exist in SAP but in unreleased/incomplete status (if system allows partial save)
- Material status is NOT "Released for Procurement"
- System validation correctly enforces GMP procurement release control rule (AC-5)
- Material cannot be used in procurement processes until all mandatory fields are completed

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
