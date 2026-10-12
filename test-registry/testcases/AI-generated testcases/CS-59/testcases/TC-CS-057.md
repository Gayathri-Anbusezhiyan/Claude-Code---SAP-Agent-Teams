# TC-CS-057: Attempt rework order creation with missing Batch Number field

**User Story:**          [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning + Quality Management (PP + QM)
**Feature:**             Rework Order Creation for Failed Batches
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to create rework process orders (authorization object PP_ORDER) and access quality management data (authorization object QM_INSP) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` with batch management active |
| P4 | Configuration | Order Type `{TD.orderType}` is configured in SAP as a rework order type (e.g., ZRW1) with appropriate control parameters |
| P5 | Configuration | Rework Procedure/Recipe `{TD.reworkProcedure}` is maintained in recipe management and approved for use |
| P6 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Test Intent | Batch Number field will be intentionally left blank to test mandatory field validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-59/CS-59-testdata.json` — Dataset ID: `TD-CS-059-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Order Type | `{TD.orderType}` | Order type code designated for rework orders — selected by the user | Valid |
| Batch Number | `{TD.emptyValue}` | Batch Number field left blank/empty — NOT entered by the user | Invalid — Missing Mandatory Field |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Rework quantity in base UoM — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Rework Procedure | `{TD.reworkProcedure}` | Approved rework recipe/master recipe code — selected by the user | Valid |
| Rework Justification | `{TD.reworkJustification}` | Free text documenting the approved rework reason — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Process Order" | — | Search results appear listing the "Create Process Order" application |
| 8 | Click "Create Process Order" from the search results | — | Create Process Order application opens in creation mode |
| 9 | In the "Order Type" field, enter or select the rework order type | `{TD.orderType}` | Order type value is entered into the field |
| 10 | Press Enter to confirm the Order Type entry | — | SAP validates the order type; order type-specific fields and controls are displayed |
| 11 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` and unit of measure `{TD.uom}` are auto-populated |
| 13 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 14 | Press Enter to confirm the Plant entry | — | SAP validates the plant; company code `{TD.companyCode}` and MRP controller `{TD.productionScheduler}` are auto-populated |
| 15 | Leave the "Batch" field blank (do not enter any value) | `{TD.emptyValue}` | Batch field remains empty |
| 16 | In the "Quantity" field, enter the rework quantity | `{TD.quantity}` | Quantity is populated |
| 17 | In the "Recipe" or "Master Recipe" field, enter or select the approved rework procedure | `{TD.reworkProcedure}` | Rework procedure code is entered or selected |
| 18 | In the "Rework Justification" or "Long Text" field, enter the rework justification text | `{TD.reworkJustification}` | Rework justification text is entered |
| 19 | Click the "Save" or "Create" button (primary action) in the toolbar | — | SAP performs mandatory field validation before processing order creation |
| 20 | Observe the system response | — | System displays an error message indicating that the Batch Number field is mandatory and must be filled |
| 21 | Verify that the error message is specific and highlights the Batch Number field | — | Error message reads similar to: "Batch Number is required" or "Enter Batch" or "Mandatory field Batch is empty" |
| 22 | Verify that the Batch Number field is visually highlighted as missing | — | The Batch Number field is marked with a red border, asterisk, or other visual indicator showing it is mandatory and unfilled |
| 23 | Verify that no rework order is created in the system | — | No success message is displayed; no rework order number is generated |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents rework order creation when the Batch Number field is left blank
- System displays a specific error message indicating that Batch Number is a mandatory field and must be provided
- The Batch Number field is visually highlighted as missing (red border, asterisk, or similar indicator)
- No rework order number is generated
- The mandatory field validation enforces data integrity and regulatory traceability requirements (rework orders must be linked to specific batches)
- User is informed of the validation failure and no data is persisted

---

### Post-conditions

- No SAP Rework Order document is created
- No changes are made to any master data or transactional data
- No batch genealogy records are created
- No QM inspection lots are created
- No application-level errors or system inconsistencies remain

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
