# TC-CS-168: Record Environmental Readings for Multiple Operations Within Same Process Order

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least two operations (`{TD.operationNumber1}` and `{TD.operationNumber2}`) flagged as environmentally controlled |
| P4 | Master Data | Both operations are configured with environmental monitoring step (particle count, temperature, humidity characteristics enabled) |
| P5 | Configuration | Acceptable range specifications are defined and active for both operations |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with multiple environmental monitoring operations — entered by the user | Valid |
| Operation Number 1 | `{TD.operationNumber1}` | First environmentally controlled operation — entered by the user | Valid |
| Particle Count 1 | `{TD.particleCount1}` | Particle count for operation 1 (in range) — entered by the user | Valid |
| Temperature 1 | `{TD.temperature1}` | Temperature for operation 1 (in range) — entered by the user | Valid |
| Humidity 1 | `{TD.humidity1}` | Humidity for operation 1 (in range) — entered by the user | Valid |
| Operation Number 2 | `{TD.operationNumber2}` | Second environmentally controlled operation — entered by the user | Valid |
| Particle Count 2 | `{TD.particleCount2}` | Particle count for operation 2 (different from operation 1) — entered by the user | Valid |
| Temperature 2 | `{TD.temperature2}` | Temperature for operation 2 (different from operation 1) — entered by the user | Valid |
| Humidity 2 | `{TD.humidity2}` | Humidity for operation 2 (different from operation 1) — entered by the user | Valid |

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
| 11 | In the "Operation" field, enter the first Operation number | `{TD.operationNumber1}` | Operation number 1 is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the Operation; Operation description and work center are auto-populated |
| 13 | Verify that the environmental monitoring input section is displayed | — | Environmental monitoring fields are visible for operation 1 |
| 14 | In the "Particle Count" field, enter the particle count value for operation 1 | `{TD.particleCount1}` | Particle count value is entered |
| 15 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed |
| 16 | In the "Temperature" field, enter the temperature value for operation 1 | `{TD.temperature1}` | Temperature value is entered |
| 17 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 18 | In the "Humidity" field, enter the humidity value for operation 1 | `{TD.humidity1}` | Humidity value is entered |
| 19 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 20 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation for operation 1 |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number for operation 1 |
| 22 | Note the Confirmation Number for operation 1 | — | Confirmation Number for operation 1 is displayed |
| 23 | Navigate back to the Process Order confirmation entry screen | — | Confirmation entry screen is displayed |
| 24 | In the "Process Order" field, enter the same Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the field |
| 25 | Press Enter to confirm the Process Order entry | — | SAP validates the Process Order |
| 26 | In the "Operation" field, enter the second Operation number | `{TD.operationNumber2}` | Operation number 2 is entered into the field |
| 27 | Press Enter to confirm the Operation entry | — | SAP validates the Operation; Operation description and work center are auto-populated |
| 28 | Verify that the environmental monitoring input section is displayed with fresh/empty fields | — | Environmental monitoring fields are visible for operation 2; fields are empty and independent of operation 1 values |
| 29 | In the "Particle Count" field, enter the particle count value for operation 2 | `{TD.particleCount2}` | Particle count value is entered |
| 30 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed |
| 31 | In the "Temperature" field, enter the temperature value for operation 2 | `{TD.temperature2}` | Temperature value is entered |
| 32 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 33 | In the "Humidity" field, enter the humidity value for operation 2 | `{TD.humidity2}` | Humidity value is entered |
| 34 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 35 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation for operation 2 |
| 36 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number for operation 2 (different from operation 1) |
| 37 | Note the Confirmation Number for operation 2 | — | Confirmation Number for operation 2 is displayed and is different from operation 1 |
| 38 | Navigate to the Electronic Batch Record (EBR) application | — | EBR application opens |
| 39 | Search for the Process Order `{TD.processOrderNumber}` in the EBR system | `{TD.processOrderNumber}` | Process Order batch record is displayed |
| 40 | Verify that environmental readings for both operations are included in the EBR | `{TD.operationNumber1}`, `{TD.operationNumber2}` | Both operations' readings are visible with correct values independently recorded |
| 41 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 42 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 43 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two unique Confirmation Numbers are generated (one for each operation)
- Both confirmations are persisted in SAP independently
- All environmental readings for operation 1 are stored against `{TD.operationNumber1}`
- All environmental readings for operation 2 are stored against `{TD.operationNumber2}`
- The Electronic Batch Record contains separate entries for both operations with their respective readings
- No cross-contamination of readings between operations occurs

---

### Post-conditions

- Two SAP Process Order confirmations exist with distinct Confirmation Numbers
- Environmental readings for operation 1 are recorded against `{TD.operationNumber1}`
- Environmental readings for operation 2 are recorded against `{TD.operationNumber2}`
- Electronic Batch Record contains both sets of environmental monitoring data
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
