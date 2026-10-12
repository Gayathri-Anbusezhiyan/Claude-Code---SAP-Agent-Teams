# TC-CS-175: Attempt Confirmation with Missing Temperature Field

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
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
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is active (status "In Process"), and has at least one operation flagged as environmentally controlled |
| P4 | Master Data | Operation `{TD.operationNumber}` is configured with environmental monitoring step including temperature characteristic (mandatory) |
| P5 | Configuration | Temperature field is configured as mandatory for the operation |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Active Process Order with environmental monitoring enabled — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Operation flagged as environmentally controlled — entered by the user | Valid |
| Particle Count | `{TD.particleCount}` | Particle count reading in range — entered by the user | Valid |
| Temperature | — | Temperature field is intentionally left empty | Missing (mandatory) |
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
| 13 | Verify that the environmental monitoring input section is displayed with mandatory field indicators | — | Environmental monitoring fields are visible; Temperature field shows a mandatory indicator (e.g., asterisk "*") |
| 14 | In the "Particle Count" field, enter the particle count value | `{TD.particleCount}` | Particle count value is entered |
| 15 | Press Enter to confirm the Particle Count entry | — | Particle count is confirmed |
| 16 | Leave the "Temperature" field empty (do not enter any value) | — | Temperature field remains empty |
| 17 | In the "Humidity" field, enter the humidity value | `{TD.humidity}` | Humidity value is entered |
| 18 | Press Enter to confirm the Humidity entry | — | Humidity is confirmed |
| 19 | Click the "Confirm" button in the application toolbar | — | SAP validates the form; an error message is displayed indicating that the Temperature field is mandatory and must be filled (e.g., "Temperature is required" or "Enter a value for Temperature") |
| 20 | Verify that the Temperature field is highlighted as missing or invalid | — | Temperature field is highlighted (e.g., red border, error icon) indicating that the field is mandatory and empty |
| 21 | Verify that the confirmation is not submitted and the form remains in edit mode | — | The confirmation is not created; the form remains in edit mode; no Confirmation Number is generated |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system displays an error message indicating that the Temperature field is mandatory
- The Temperature field is highlighted as missing or invalid
- The confirmation is not submitted; no Confirmation Number is generated
- The form remains in edit mode allowing the user to correct the error
- No environmental readings are recorded

---

### Post-conditions

- No confirmation is created for the Process Order operation
- No environmental monitoring data is recorded
- No deviation records are created
- The form remains in edit mode with the error highlighted
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
