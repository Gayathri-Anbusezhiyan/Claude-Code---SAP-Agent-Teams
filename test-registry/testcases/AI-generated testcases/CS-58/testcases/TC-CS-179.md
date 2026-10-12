# TC-CS-179: Record Particle Count at Exact Lower Boundary (0 particles/m³)

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least one operation flagged as environmentally controlled |
| P4 | Master Data | Operation `{TD.operationNumber}` is configured with environmental monitoring step including particle count characteristic |
| P5 | Configuration | Acceptable range for particle count is defined (0 to `{TD.particleCountMax}`) |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCountMin}` | Particle count at exact lower boundary (0) — entered by the user | Valid (boundary) |
| Temperature | `{TD.temperature}` | Temperature reading in range (°C) — entered by the user | Valid |
| Humidity | `{TD.humidity}` | Humidity reading in range (%) — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click "Confirm Process Order" from the search results | — | "Confirm Process Order" Fiori app opens |
| 9 | In the "Process Order" field, enter the Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the Process Order; Process Order description and material are auto-populated |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the Operation; Operation description and work center are auto-populated |
| 13 | Verify that the environmental monitoring input section is displayed with acceptable range indicators | `{TD.particleCountMin}` to `{TD.particleCountMax}` | Environmental monitoring fields are visible; acceptable range for particle count is displayed (e.g., 0 to 3520) |
| 14 | In the "Particle Count" field, enter the lower boundary value | `{TD.particleCountMin}` | Particle count value (0) is entered |
| 15 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed; no out-of-range flag or warning is displayed |
| 16 | In the "Temperature" field, enter the temperature value | `{TD.temperature}` | Temperature value is entered |
| 17 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 18 | In the "Humidity" field, enter the humidity value | `{TD.humidity}` | Humidity value is entered |
| 19 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 20 | Verify that no out-of-range flags or warnings are displayed for any field | — | All fields show as accepted; no out-of-range indicators are present |
| 21 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number; no warnings or deviation notifications are present |
| 23 | Note the Confirmation Number from the success message | — | Confirmation Number is displayed |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Confirmation Number is generated and the confirmation is persisted in SAP
- The particle count value at the lower boundary (0) is accepted without any out-of-range flags
- No deviation records are created
- The confirmation is successful and all environmental readings are recorded

---

### Post-conditions

- SAP Process Order confirmation exists with the generated Confirmation Number
- Environmental readings including particle count at lower boundary (0) are recorded
- No deviation records are created in the QM module
- No application-level errors remain outstanding

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
