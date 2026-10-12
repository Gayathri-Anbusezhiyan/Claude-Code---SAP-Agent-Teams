# TC-CS-132: Material Lot-Sizing Rule Not Satisfied - Quantity Below Minimum Batch Size

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Lot-Sizing Rule Enforcement
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs and view lot-sizing rule enforcement |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning |
| P4 | Master Data | Material `{TD.materialNumber}` has a minimum lot size `{TD.minimumLotSize}` configured in material master MRP 1 view |
| P5 | Master Data | Material `{TD.materialNumber}` has a lot-sizing procedure configured (e.g., lot-for-lot, fixed lot size) |
| P6 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P7 | Transactional Data | Net requirements for material `{TD.materialNumber}` are below the minimum lot size configured in material master |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Minimum Lot Size | `{TD.minimumLotSize}` | Minimum batch size from material master — verified in results | Valid |
| Net Requirements Below Min | `{TD.netRequirementsBelowMin}` | Calculated net requirements below minimum lot size — verified in results | Valid |
| Planned Order Quantity Rounded | `{TD.plannedOrderQuantityRounded}` | Expected planned order quantity (rounded up to minimum lot size) — verified in results | Auto-populated |
| Warning Message | `{TD.warningMessageLotSize}` | Expected warning message pattern (e.g., "Quantity below minimum lot size", "Lot size adjusted") | Expected Warning |

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
| 18 | Verify that net requirements are calculated and displayed | `{TD.netRequirementsBelowMin}` | Net requirements are shown, and they are below the minimum lot size `{TD.minimumLotSize}` |
| 19 | Verify that a planned order has been generated | — | Planned order entry is visible in the Stock/Requirements List |
| 20 | Select or expand the planned order entry | — | Planned order details are displayed |
| 21 | Verify the planned order quantity | `{TD.plannedOrderQuantityRounded}` | Planned order quantity is equal to or greater than the minimum lot size (SAP rounds up the quantity to meet the minimum batch size) |
| 22 | Verify that the lot-sizing rule enforcement is applied | `{TD.minimumLotSize}` | Planned order quantity meets or exceeds the minimum lot size configured in material master |
| 23 | Navigate to the "MRP Messages" or "Exception Messages" section | — | Messages section is displayed |
| 24 | Verify that a warning or informational message is displayed regarding lot-sizing adjustment | `{TD.warningMessageLotSize}` | Warning message indicates that the quantity was below the minimum lot size and was adjusted (e.g., "Quantity below minimum lot size", "Lot size adjusted to minimum") |
| 25 | Verify that the warning message does NOT prevent planned order generation | — | Planned order is successfully created despite the warning; lot-sizing rule is enforced by adjusting the quantity |
| 26 | Note the planned order number | — | Planned order number is displayed (10-digit SAP-generated number) |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes and generates a planned order for material `{TD.materialNumber}` at plant `{TD.plant}`
- Net requirements are below the minimum lot size configured in material master
- SAP enforces the lot-sizing rule by rounding up the planned order quantity to meet the minimum batch size
- A warning or informational message is displayed indicating the lot-sizing adjustment
- The planned order is successfully created with the adjusted quantity, ensuring compliance with batch size rules
- The system prevents production of non-compliant batch sizes, maintaining GMP (Good Manufacturing Practice) compliance

---

### Post-conditions

- Planned order exists in SAP with quantity equal to or greater than the minimum lot size
- Net requirements are covered by the planned order (with potential overproduction due to minimum lot size enforcement)
- Warning message is visible in the MRP result indicating lot-sizing adjustment
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
