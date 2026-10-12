# TC-CS-167: Record Environmental Readings with All In-Range Values for Active Process Order

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least one operation flagged as environmentally controlled |
| P4 | Master Data | Operation `{TD.operationNumber}` within Process Order `{TD.processOrderNumber}` is configured with environmental monitoring step (particle count, temperature, humidity characteristics enabled) |
| P5 | Configuration | Acceptable range specifications are defined and active for particle count (0 to `{TD.particleCountMax}`), temperature (`{TD.temperatureMin}` to `{TD.temperatureMax}`), and humidity (`{TD.humidityMin}` to `{TD.humidityMax}`) |
| P6 | Configuration | QM module integration is active for automatic deviation record creation |
| P7 | Configuration | Electronic Batch Record (EBR) compilation service is active and linked to Process Order confirmations |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCount}` | Particle count reading in range (particles/m³) — entered by the user | Valid |
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
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the Process Order; Process Order description `{TD.processOrderDescription}`, Material `{TD.material}`, and Batch `{TD.batch}` are auto-populated |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the Operation; Operation description `{TD.operationShortText}` and Work Center `{TD.productionSuite}` are auto-populated |
| 13 | Verify that the environmental monitoring input section is displayed with Particle Count, Temperature, and Humidity fields | — | Environmental monitoring fields are visible with labels and acceptable range indicators (Min/Max values displayed) |
| 14 | Verify the acceptable ranges displayed for all three parameters | `{TD.particleCountMin}` to `{TD.particleCountMax}`, `{TD.temperatureMin}` to `{TD.temperatureMax}`, `{TD.humidityMin}` to `{TD.humidityMax}` | Acceptable range values are correctly displayed next to each field |
| 15 | In the "Particle Count" field, enter the particle count value | `{TD.particleCount}` | Particle count value is entered |
| 16 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed; no out-of-range flag or warning is displayed |
| 17 | In the "Temperature" field, enter the temperature value | `{TD.temperature}` | Temperature value is entered |
| 18 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed; no out-of-range flag or warning is displayed |
| 19 | In the "Humidity" field, enter the humidity value | `{TD.humidity}` | Humidity value is entered |
| 20 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed; no out-of-range flag or warning is displayed |
| 21 | Click the "Confirm" button in the application toolbar | — | SAP begins processing the confirmation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated Confirmation Number |
| 23 | Note the Confirmation Number from the success message | — | Confirmation Number is displayed (10-digit numeric format) |
| 24 | Verify that no out-of-range flag or deviation indicator is displayed | — | No out-of-range flags or deviation warnings are present; all readings show as accepted |
| 25 | Navigate to the Electronic Batch Record (EBR) application or document viewer | — | EBR application opens |
| 26 | Search for the Process Order `{TD.processOrderNumber}` in the EBR system | `{TD.processOrderNumber}` | Process Order batch record is displayed |
| 27 | Verify that the environmental monitoring readings are included in the EBR | `{TD.particleCount}`, `{TD.temperature}`, `{TD.humidity}`, `{TD.operationNumber}` | All three environmental readings are visible in the EBR with correct values, operation reference, and timestamp |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Confirmation Number is generated by SAP and displayed in the confirmation message
- The confirmation is persisted in SAP with status "Confirmed"
- All environmental monitoring readings (particle count, temperature, humidity) are correctly stored against the Process Order operation
- No out-of-range flags are displayed; no deviation records are triggered
- The Electronic Batch Record (EBR) includes all environmental readings with timestamp and operation reference
- The confirmation can be viewed in the Process Order history

---

### Post-conditions

- SAP Process Order confirmation exists with the generated Confirmation Number
- Environmental readings (particle count, temperature, humidity) are recorded against the specified operation
- No deviation records are created in the QM module
- Electronic Batch Record contains all environmental monitoring data for the operation
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
