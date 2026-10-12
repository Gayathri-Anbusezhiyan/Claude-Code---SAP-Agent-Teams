# TC-CS-188: Verify Deviation Record Automatically Created in QM Module for Out-of-Range Reading

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) and view Quality Notifications (authorization object QM_QMEL) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least one operation flagged as environmentally controlled |
| P4 | Master Data | Operation `{TD.operationNumber}` is configured with environmental monitoring step |
| P5 | Configuration | Acceptable range specifications are defined for environmental parameters |
| P6 | Configuration | QM module integration is active for automatic deviation record creation |
| P7 | Configuration | Deviation record linkage configuration is active (automatic trigger on out-of-range readings) |
| P8 | Test Data | At least one environmental reading value is intentionally set to be out-of-range |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCountOutOfRangeHigh}` | Particle count reading above acceptable maximum — entered by the user | Invalid (out-of-range) |
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
| 13 | In the "Particle Count" field, enter the out-of-range particle count value | `{TD.particleCountOutOfRangeHigh}` | Particle count value is entered |
| 14 | Press Enter to confirm the Particle Count entry | — | SAP accepts the entry; an out-of-range indicator or warning flag is displayed |
| 15 | In the "Temperature" field, enter the temperature value | `{TD.temperature}` | Temperature value is entered |
| 16 | Press Enter to confirm the Temperature entry | — | Temperature is confirmed |
| 17 | In the "Humidity" field, enter the humidity value | `{TD.humidity}` | Humidity value is entered |
| 18 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 19 | Click the "Confirm" button in the application toolbar | — | SAP processes the confirmation despite the out-of-range reading |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed containing the Confirmation Number; a notification indicates that a deviation record has been automatically created |
| 21 | Note the Confirmation Number from the success message | — | Confirmation Number is displayed |
| 22 | Note the Deviation Record Number if displayed in the notification | — | Deviation Record Number is displayed or referenced |
| 23 | Navigate to the Quality Management application or Quality Notifications list | — | Quality Management application opens |
| 24 | Search for quality notifications or deviation records linked to Process Order `{TD.processOrderNumber}` | `{TD.processOrderNumber}` | Search results display the deviation records linked to the Process Order |
| 25 | Identify the deviation record created for the out-of-range particle count reading | — | Deviation record is visible in the list with a reference to the Process Order and operation |
| 26 | Click the deviation record to open its details | — | Deviation record details page is displayed |
| 27 | Verify that the deviation record contains the Process Order number | `{TD.processOrderNumber}` | Process Order number is displayed in the deviation record header or linked object section |
| 28 | Verify that the deviation record contains the Operation number | `{TD.operationNumber}` | Operation number is displayed in the deviation record linked object section |
| 29 | Verify that the deviation record contains the out-of-range particle count value | `{TD.particleCountOutOfRangeHigh}` | Particle count value is displayed in the deviation record description or defect details |
| 30 | Verify that the deviation record contains a timestamp matching the confirmation timestamp | — | Timestamp is displayed and matches the time of the confirmation (within a few minutes) |
| 31 | Verify that the deviation record is in open or active status requiring investigation | — | Deviation record status is "Open", "In Process", or similar (not "Completed" or "Closed") |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Confirmation Number is generated for the Process Order confirmation
- A unique Deviation Record Number is automatically created in the QM module
- The deviation record is linked to the Process Order and operation
- The deviation record contains the out-of-range particle count value, the Process Order number, the operation number, and the timestamp
- The deviation record is in open/active status requiring investigation
- The integration between PP (Process Order Confirmation) and QM (Deviation Management) modules is working correctly

---

### Post-conditions

- SAP Process Order confirmation exists with the generated Confirmation Number
- Environmental readings including the out-of-range particle count are recorded
- A deviation record exists in the QM module with open/active status
- The deviation record is linked to the Process Order and operation
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
