# TC-CS-136: Minimum Batch Size Boundary - Quantity Exactly Equals Minimum Lot Size

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Lot-Sizing Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning |
| P4 | Master Data | Material `{TD.materialNumber}` has a minimum lot size `{TD.minimumLotSize}` configured in material master MRP 1 view |
| P5 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P6 | Transactional Data | Net requirements for material `{TD.materialNumber}` are exactly equal to the minimum lot size configured in material master |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Minimum Lot Size | `{TD.minimumLotSize}` | Minimum batch size from material master — verified in results | Valid (Boundary) |
| Net Requirements Min | `{TD.netRequirementsMin}` | Net requirements exactly equal to minimum lot size — verified in results | Valid (Boundary) |
| Planned Order Quantity Min | `{TD.plannedOrderQuantityMin}` | Expected planned order quantity (equal to minimum lot size) — verified in results | Valid (Boundary) |

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
| 18 | Verify that net requirements are calculated and displayed | `{TD.netRequirementsMin}` | Net requirements are exactly equal to the minimum lot size `{TD.minimumLotSize}` |
| 19 | Verify that a planned order has been generated | — | Planned order entry is visible in the Stock/Requirements List |
| 20 | Select or expand the planned order entry | — | Planned order details are displayed |
| 21 | Verify the planned order quantity | `{TD.plannedOrderQuantityMin}` | Planned order quantity is exactly equal to the minimum lot size (no rounding up required) |
| 22 | Verify that the lot-sizing rule is satisfied at the boundary | `{TD.minimumLotSize}` | Planned order quantity equals the minimum lot size; lot-sizing boundary validation passes |
| 23 | Verify that no warning or error messages are displayed regarding lot sizing | — | No lot-sizing adjustment warnings are present; boundary condition is accepted |
| 24 | Note the planned order number | — | Planned order number is displayed (10-digit SAP-generated number) |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for material `{TD.materialNumber}` at plant `{TD.plant}`
- Net requirements are exactly equal to the minimum lot size configured in material master
- Planned order is generated with quantity exactly equal to the minimum lot size
- No lot-sizing adjustments or warnings are displayed (boundary condition is accepted)
- The system correctly handles the lower boundary case where net requirements precisely match the minimum batch size

---

### Post-conditions

- Planned order exists in SAP with quantity equal to the minimum lot size
- Net requirements are fully covered by the planned order (no overproduction)
- No warning or error messages are present
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
