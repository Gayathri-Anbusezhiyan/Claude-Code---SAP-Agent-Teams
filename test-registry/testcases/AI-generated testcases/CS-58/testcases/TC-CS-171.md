# TC-CS-171: Attempt to Record Humidity Above Acceptable Range

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
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
| P4 | Master Data | Operation `{TD.operationNumber}` is configured with environmental monitoring step including humidity characteristic |
| P5 | Configuration | Acceptable range for humidity is defined (`{TD.humidityMin}` to `{TD.humidityMax}`) |
| P6 | Configuration | QM module integration is active for automatic deviation record creation |
| P7 | Test Data | Humidity value `{TD.humidityOutOfRangeHigh}` exceeds the acceptable maximum `{TD.humidityMax}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCount}` | Particle count reading in range — entered by the user | Valid |
| Temperature | `{TD.temperature}` | Temperature reading in range (°C) — entered by the user | Valid |
| Humidity | `{TD.humidityOutOfRangeHigh}` | Humidity reading above acceptable maximum (e.g., 75.0% when max is 60.0%) — entered by the user | Invalid (out-of-range) |

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
| 13 | Verify that the environmental monitoring input section is displayed with acceptable range indicators | `{TD.humidityMin}` to `{TD.humidityMax}` | Environmental monitoring fields are visible; acceptable range for humidity is displayed (e.g., 30.0% to 60.0%) |
| 14 | In the "Particle Count" field, enter the particle count value | `{TD.particleCount}` | Particle count value is entered |
| 15 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed |
| 16 | In the "Temperature" field, enter the temperature value | `{TD.temperature}` | Temperature value is entered |
| 17 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 18 | In the "Humidity" field, enter the out-of-range humidity value | `{TD.humidityOutOfRangeHigh}` | Humidity value is entered |
| 19 | Press Enter to confirm the Humidity entry | — | SAP accepts the entry; an out-of-range indicator or warning flag is displayed next to the Humidity field (e.g., red color, warning icon, or message) |
| 20 | Verify that the out-of-range flag remains visible for the Humidity field | — | Out-of-range indicator is still displayed for Humidity; the system allows the user to proceed but flags the issue |
| 21 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation despite the out-of-range reading |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number; an additional warning or notification indicates that an out-of-range reading was recorded |
| 23 | Note the Confirmation Number from the success message | — | Confirmation Number is displayed |
| 24 | Verify that a deviation record notification is displayed or referenced | — | System displays a notification or reference indicating that a deviation record has been automatically created and linked to the Process Order and operation |
| 25 | Navigate to the Quality Management (QM) application or notification list | — | QM application opens |
| 26 | Search for deviation records linked to Process Order `{TD.processOrderNumber}` and operation `{TD.operationNumber}` | `{TD.processOrderNumber}`, `{TD.operationNumber}` | A deviation record is displayed in the list |
| 27 | Open the deviation record | — | Deviation record details are displayed |
| 28 | Verify that the deviation record contains the out-of-range humidity value and references the Process Order and operation | `{TD.humidityOutOfRangeHigh}`, `{TD.processOrderNumber}`, `{TD.operationNumber}` | Deviation record shows the out-of-range humidity value, the Process Order number, the operation number, and the timestamp of the confirmation |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Confirmation Number is generated and the confirmation is persisted in SAP
- The out-of-range humidity reading is saved against the Process Order operation
- An out-of-range flag or indicator is displayed in the UI for the Humidity field
- A deviation record is automatically created in the QM module and linked to the Process Order and operation
- The deviation record contains the out-of-range humidity value, Process Order number, operation number, and timestamp

---

### Post-conditions

- SAP Process Order confirmation exists with the generated Confirmation Number
- Environmental readings including the out-of-range humidity are recorded
- A deviation record exists in the QM module linked to the Process Order and operation
- The deviation record is in open/active status requiring investigation
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
