# TC-CS-133: Missing Material Number Field

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Mandatory Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P4 | Master Data | MRP controller `{TD.mrpController}` is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.emptyValue}` | Material Number field left empty — not entered by the user | Invalid (Missing) |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Error Message | `{TD.errorMessageMissingMaterial}` | Expected error message pattern (e.g., "Material is required", "Enter Material Number") | Expected Error |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the "Stock/Requirements List" application |
| 8 | Click the "Stock/Requirements List" application name from the search results | — | Stock/Requirements List application opens with search criteria fields displayed |
| 9 | Leave the "Material" field empty (do not enter any value) | `{TD.emptyValue}` | Material field remains empty |
| 10 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 11 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 12 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 13 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 14 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 15 | Click the "Run MRP" or "Execute" button to attempt MRP execution | — | SAP begins validation of the input fields |
| 16 | Observe the system response | — | SAP displays an error message and prevents MRP execution |
| 17 | Verify that an error message is displayed highlighting the Material field as mandatory | `{TD.errorMessageMissingMaterial}` | Error message states that the Material field is required (e.g., "Material is required", "Enter Material Number", "Material cannot be empty") |
| 18 | Verify that the Material field is visually highlighted or marked as mandatory | — | Material field is highlighted with a red border, error icon, or mandatory field indicator |
| 19 | Verify that MRP execution does not proceed | — | No MRP processing occurs; no planned orders are generated |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents MRP execution when the Material Number field is left empty
- An error message is displayed indicating that the Material field is mandatory
- The Material field is visually highlighted as requiring input
- No planned orders are generated, and no MRP processing occurs
- The system enforces mandatory field validation to ensure data integrity

---

### Post-conditions

- No planned orders are created
- Error message is displayed in the application
- Material field remains empty and highlighted
- No changes are made to the Stock/Requirements List
- System state remains consistent; no partial or incomplete MRP processing occurs

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
