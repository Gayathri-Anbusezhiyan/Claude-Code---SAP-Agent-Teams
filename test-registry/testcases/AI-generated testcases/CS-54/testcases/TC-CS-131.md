# TC-CS-131: Planned Order Affected by Shelf-Life Constraint

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Exception Flagging - Shelf-Life Constraint
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs and view exception messages |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning with a BOM |
| P4 | Master Data | BOM for material `{TD.materialNumber}` includes raw material component `{TD.rawMaterialShelfLife}` |
| P5 | Master Data | Raw material `{TD.rawMaterialShelfLife}` is configured with shelf-life management (remaining shelf life min/max, expiry date) in material master |
| P6 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P7 | Transactional Data | Available stock of raw material `{TD.rawMaterialShelfLife}` has remaining shelf life below the minimum required threshold or is near expiry |
| P8 | Transactional Data | Planned order start date would consume raw material beyond its acceptable remaining shelf life |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Raw Material Shelf-Life | `{TD.rawMaterialShelfLife}` | Raw material component ID with shelf-life constraint — verified in exception message | Valid |
| Raw Material Description | `{TD.rawMaterialDescShelfLife}` | Raw material description — verified in exception message | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Remaining Shelf Life | `{TD.remainingShelfLife}` | Remaining shelf life in days for the raw material — verified in exception message | Valid |
| Minimum Shelf Life | `{TD.minimumShelfLife}` | Minimum required remaining shelf life in days — verified in exception message | Valid |
| Expiry Date | `{TD.expiryDate}` | Expiry date of the raw material batch — verified in exception message | Valid |
| Exception Code | `{TD.exceptionCodeShelfLife}` | Exception code for shelf-life constraint (e.g., "15") — verified in results | Expected Exception |
| Exception Message | `{TD.exceptionMessageShelfLife}` | Expected exception message pattern (e.g., "Shelf-life constraint", "Expiry date issue") | Expected Exception |

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
| 9 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is displayed |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 13 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 14 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 15 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 16 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP processing; a progress indicator is displayed |
| 17 | Wait for MRP processing to complete | — | MRP execution completes; results screen is displayed |
| 18 | Verify that a planned order has been generated for the finished product | `{TD.materialNumber}` | Planned order entry is visible in the Stock/Requirements List |
| 19 | Select or expand the planned order entry | — | Planned order details are displayed |
| 20 | Navigate to the "Exception Messages" or "MRP Messages" section for the planned order | — | Exception messages section is displayed |
| 21 | Verify that an exception message is flagged for shelf-life constraint | `{TD.exceptionCodeShelfLife}`, `{TD.exceptionMessageShelfLife}` | Exception message indicates a shelf-life constraint for the planned order (e.g., exception code "15" with message "Shelf-life constraint" or "Expiry date issue") |
| 22 | Verify that the exception message identifies the specific raw material with shelf-life constraint | `{TD.rawMaterialShelfLife}`, `{TD.rawMaterialDescShelfLife}` | Exception message shows the raw material ID and description |
| 23 | Verify that the remaining shelf life is displayed or referenced | `{TD.remainingShelfLife}` | Remaining shelf life in days is shown in the exception message or MRP result |
| 24 | Verify that the minimum required shelf life is displayed or referenced | `{TD.minimumShelfLife}` | Minimum shelf life requirement is shown, indicating the constraint threshold |
| 25 | Verify that the expiry date of the raw material batch is displayed or referenced | `{TD.expiryDate}` | Expiry date is shown, indicating when the material will expire |
| 26 | Verify that the exception flag is visually indicated (icon, color, or status indicator) | — | Planned order is marked with an exception icon or warning indicator |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes and generates a planned order for material `{TD.materialNumber}` at plant `{TD.plant}`
- The planned order is flagged with an exception message indicating a shelf-life constraint for raw material component `{TD.rawMaterialShelfLife}`
- Exception message displays the remaining shelf life, minimum shelf life requirement, and expiry date
- The system alerts the planner to the shelf-life constraint so corrective action (procurement of fresh material, rescheduling) can be taken before production
- The exception flagging mechanism prevents expired or near-expiry raw material usage, ensuring regulatory compliance and product quality

---

### Post-conditions

- Planned order exists in SAP with an exception flag for shelf-life constraint
- Exception message is visible in the MRP result or Stock/Requirements List
- Planner is informed of the shelf-life issue and can initiate procurement of fresh material or adjust the production schedule
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
