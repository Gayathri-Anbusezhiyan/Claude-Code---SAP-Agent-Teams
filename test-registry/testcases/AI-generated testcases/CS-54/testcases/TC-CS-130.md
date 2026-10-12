# TC-CS-130: Planned Order Affected by Raw Material Shortage

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Exception Flagging - Material Shortage
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
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning with a BOM (Bill of Materials) |
| P4 | Master Data | BOM for material `{TD.materialNumber}` includes raw material component `{TD.rawMaterialId}` |
| P5 | Master Data | Raw material `{TD.rawMaterialId}` is configured for MRP planning |
| P6 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P7 | Transactional Data | Current stock level for raw material `{TD.rawMaterialId}` is insufficient (below net requirements or zero) |
| P8 | Transactional Data | No scheduled receipts or purchase orders exist for raw material `{TD.rawMaterialId}` to cover the shortage |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Raw Material ID | `{TD.rawMaterialId}` | Raw material component ID in BOM — verified in exception message | Valid |
| Raw Material Description | `{TD.rawMaterialDesc}` | Raw material description — verified in exception message | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Current Stock Raw Material | `{TD.currentStockRawMaterial}` | Current stock level of raw material (insufficient or zero) — verified in results | Valid |
| Required Quantity Raw Material | `{TD.requiredQuantityRawMaterial}` | Required quantity of raw material for planned order — verified in results | Auto-populated |
| Shortage Quantity | `{TD.shortageQuantity}` | Calculated shortage quantity (required - available) — verified in exception message | Auto-populated |
| Exception Code | `{TD.exceptionCodeShortage}` | Exception code for shortage (e.g., "10") — verified in results | Expected Exception |
| Exception Message | `{TD.exceptionMessageShortage}` | Expected exception message pattern (e.g., "Material shortage", "Insufficient stock") | Expected Exception |

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
| 21 | Verify that an exception message is flagged for raw material shortage | `{TD.exceptionCodeShortage}`, `{TD.exceptionMessageShortage}` | Exception message indicates a material shortage for the planned order (e.g., exception code "10" with message "Material shortage" or "Insufficient stock") |
| 22 | Verify that the exception message identifies the specific raw material with shortage | `{TD.rawMaterialId}`, `{TD.rawMaterialDesc}` | Exception message shows the raw material ID and description |
| 23 | Verify that the shortage quantity is displayed or calculated | `{TD.shortageQuantity}` | Shortage quantity (required quantity minus available stock) is shown in the exception message or MRP result |
| 24 | Verify that the current stock level of the raw material is below requirements | `{TD.currentStockRawMaterial}`, `{TD.requiredQuantityRawMaterial}` | Current stock is insufficient to cover the required quantity for the planned order |
| 25 | Verify that the exception flag is visually indicated (icon, color, or status indicator) | — | Planned order is marked with an exception icon or warning indicator |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes and generates a planned order for material `{TD.materialNumber}` at plant `{TD.plant}`
- The planned order is flagged with an exception message indicating a raw material shortage for component `{TD.rawMaterialId}`
- Exception message displays the shortage quantity and identifies the specific raw material causing the constraint
- The system alerts the planner to the material shortage so corrective action (procurement, rescheduling) can be taken before production
- The exception flagging mechanism prevents production delays by detecting shortages during the planning phase

---

### Post-conditions

- Planned order exists in SAP with an exception flag for raw material shortage
- Exception message is visible in the MRP result or Stock/Requirements List
- Planner is informed of the shortage and can initiate procurement or adjust the production schedule
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
