# TC-CS-189: Verify Environmental Readings Appear in Compiled Electronic Batch Record (EBR)

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) and view Electronic Batch Records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least one operation flagged as environmentally controlled |
| P4 | Master Data | Operation `{TD.operationNumber}` is configured with environmental monitoring step |
| P5 | Configuration | Acceptable range specifications are defined for environmental parameters |
| P6 | Configuration | Electronic Batch Record (EBR) compilation service is active and linked to Process Order confirmations |
| P7 | Configuration | EBR is configured to include environmental monitoring data from Process Order confirmations |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCount}` | Particle count reading in range — entered by the user | Valid |
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
| 13 | In the "Particle Count" field, enter the particle count value | `{TD.particleCount}` | Particle count value is entered |
| 14 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed |
| 15 | In the "Temperature" field, enter the temperature value | `{TD.temperature}` | Temperature value is entered |
| 16 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 17 | In the "Humidity" field, enter the humidity value | `{TD.humidity}` | Humidity value is entered |
| 18 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 19 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number |
| 21 | Note the Confirmation Number from the success message | — | Confirmation Number is displayed |
| 22 | Navigate to the Electronic Batch Record (EBR) application or document viewer | — | EBR application or document viewer opens |
| 23 | Search for the Process Order `{TD.processOrderNumber}` in the EBR system | `{TD.processOrderNumber}` | Search results display the Process Order batch record |
| 24 | Click the Process Order batch record to open it | — | Process Order batch record is displayed with all associated data |
| 25 | Navigate to the section or tab containing operation confirmations or environmental monitoring data | — | Operation confirmations section or environmental monitoring data section is visible |
| 26 | Verify that the operation `{TD.operationNumber}` is listed in the batch record | `{TD.operationNumber}` | Operation number is displayed in the batch record with confirmation details |
| 27 | Verify that the particle count reading is included in the batch record | `{TD.particleCount}` | Particle count value is displayed in the environmental monitoring data section with the correct value |
| 28 | Verify that the temperature reading is included in the batch record | `{TD.temperature}` | Temperature value is displayed in the environmental monitoring data section with the correct value |
| 29 | Verify that the humidity reading is included in the batch record | `{TD.humidity}` | Humidity value is displayed in the environmental monitoring data section with the correct value |
| 30 | Verify that the timestamp of the confirmation is included in the batch record | — | Confirmation timestamp is displayed alongside the environmental readings |
| 31 | Verify that all three environmental readings are correctly aggregated and displayed in the EBR | — | All three environmental readings (particle count, temperature, humidity) are visible in a consolidated format with operation reference and timestamp |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Confirmation Number is generated for the Process Order confirmation
- The Electronic Batch Record (EBR) is accessible and contains the Process Order data
- All three environmental monitoring readings (particle count, temperature, humidity) are included in the EBR
- The EBR displays the operation number and confirmation timestamp alongside the readings
- The integration between PP (Process Order Confirmation) and the EBR system is working correctly
- The EBR data is correctly aggregated and complies with GMP requirements for batch record completeness

---

### Post-conditions

- SAP Process Order confirmation exists with the generated Confirmation Number
- Environmental readings are recorded against the Process Order operation
- The Electronic Batch Record contains all environmental monitoring data for the operation
- The EBR is complete and compliant with GMP requirements
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
