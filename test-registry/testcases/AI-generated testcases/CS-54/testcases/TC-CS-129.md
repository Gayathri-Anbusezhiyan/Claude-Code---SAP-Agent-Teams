# TC-CS-129: Attempt MRP Run with Material Not Configured for MRP Planning

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Run Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumberNotMRP}` exists in SAP material master but is NOT configured for MRP planning (MRP Type = ND or blank) |
| P4 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number Not MRP | `{TD.materialNumberNotMRP}` | Material number not configured for MRP planning — entered by the user | Invalid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Error Message | `{TD.errorMessageNotConfigured}` | Expected error message pattern (e.g., "Material not configured for MRP", "MRP Type ND") | Expected Error |

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
| 9 | In the "Material" field, enter the material number not configured for MRP | `{TD.materialNumberNotMRP}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is displayed |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 13 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 14 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 15 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 16 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP validation and processing |
| 17 | Observe the system response | — | An error message or warning is displayed indicating that the material is not configured for MRP planning |
| 18 | Verify that the error message contains information about MRP configuration | `{TD.errorMessageNotConfigured}` | Error message states that the material is not configured for MRP (e.g., "MRP Type ND", "Material excluded from MRP", "MRP planning not active for material") |
| 19 | Verify that no planned orders are generated | — | No planned order entries are created in the Stock/Requirements List |
| 20 | Verify that the MRP run does not complete successfully | — | MRP run status shows error or warning; transaction is not completed |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run fails validation for material `{TD.materialNumberNotMRP}` at plant `{TD.plant}`
- SAP displays an error message indicating that the material is not configured for MRP planning
- No planned orders are generated for the invalid material
- The system prevents MRP execution for materials without proper MRP configuration
- The error message guides the planner to check material master MRP configuration (MRP Type field)

---

### Post-conditions

- No planned orders are created for material `{TD.materialNumberNotMRP}`
- Error message is displayed in the application message log or error dialog
- No changes are made to the Stock/Requirements List for the invalid material
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
