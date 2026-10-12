# TC-CS-059: Attempt rework order creation with missing Rework Justification field

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
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialId}` at plant `{TD.plant}` with available quantity greater than zero |
| P5 | Configuration | Order Type `{TD.orderType}` is configured in SAP as a rework order type (e.g., ZRW1) with appropriate control parameters |
| P6 | Configuration | Rework Procedure/Recipe `{TD.reworkProcedure}` is maintained in recipe management and approved for use |
| P7 | Quality Management | Batch `{TD.batchNumber}` has a documented QA disposition with status approving rework (Usage Decision = "Rework Approved") |
| P8 | Configuration | Plant `{TD.plant}` is active and assigned to company code `{TD.companyCode}` |
| P9 | Test Intent | Rework Justification field will be intentionally left blank to test mandatory field validation for regulatory batch record documentation |

---

### Test Data

**Dataset Reference:** `testdata/CS-59/CS-59-testdata.json` — Dataset ID: `TD-CS-059-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Order Type | `{TD.orderType}` | Order type code designated for rework orders — selected by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Original batch that failed final inspection and has QA disposition approving rework — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number for the batch — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Rework quantity in base UoM — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Rework Procedure | `{TD.reworkProcedure}` | Approved rework recipe/master recipe code — selected by the user | Valid |
| Rework Justification | `{TD.emptyValue}` | Rework Justification field left blank/empty — NOT entered by the user | Invalid — Missing Mandatory Field |

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
| 15 | In the "Batch" field (header or operations section), enter the Batch Number | `{TD.batchNumber}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch status `{TD.originalBatchStatus}` and QA disposition status `{TD.qaDispositionStatus}` are retrieved |
| 17 | In the "Quantity" field, enter the rework quantity | `{TD.quantity}` | Quantity is populated |
| 18 | In the "Recipe" or "Master Recipe" field, enter or select the approved rework procedure | `{TD.reworkProcedure}` | Rework procedure code is entered or selected |
| 19 | Press Enter to confirm the Recipe entry | — | SAP validates the recipe; recipe description and operations are loaded |
| 20 | Leave the "Rework Justification" or "Long Text" field blank (do not enter any text) | `{TD.emptyValue}` | Rework Justification field remains empty |
| 21 | Click the "Save" or "Create" button (primary action) in the toolbar | — | SAP performs mandatory field validation before processing order creation |
| 22 | Observe the system response | — | System displays an error message indicating that the Rework Justification field is mandatory and must be filled for regulatory compliance |
| 23 | Verify that the error message is specific and highlights the Rework Justification field | — | Error message reads similar to: "Rework Justification is required" or "Enter rework reason text" or "Mandatory field Rework Justification is empty" or "Batch record documentation required for rework orders" |
| 24 | Verify that the Rework Justification field is visually highlighted as missing | — | The Rework Justification or Long Text field is marked with a red border, asterisk, or other visual indicator showing it is mandatory and unfilled |
| 25 | Verify that no rework order is created in the system | — | No success message is displayed; no rework order number is generated |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents rework order creation when the Rework Justification field is left blank
- System displays a specific error message indicating that Rework Justification is a mandatory field and must be provided to meet regulatory batch record documentation requirements
- The Rework Justification field is visually highlighted as missing (red border, asterisk, or similar indicator)
- No rework order number is generated
- The mandatory field validation enforces regulatory compliance requirements per FDA 21 CFR Part 11, cGMP, and ISO 13485 (batch records for reworked batches must document the original failure and the approved rework justification for audit purposes)
- User is informed of the validation failure and no data is persisted

---

### Post-conditions

- No SAP Rework Order document is created
- Batch `{TD.batchNumber}` remains unchanged in the system
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
